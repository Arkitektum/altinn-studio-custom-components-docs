const path = require("node:path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Canonical location of the published site.
 *
 * Used for the canonical link and the Open Graph URL, so both point at one address no matter which host serves the
 * files. Override with SITE_URL when publishing somewhere else, such as a custom domain.
 */
const siteUrl = (process.env.SITE_URL || "https://arkitektum.github.io/altinn-studio-custom-components-docs/").replace(/\/?$/, "/");

const siteName = "Altinn Studio Custom Components";

const siteDescription =
    "Komponentgalleri for Altinn Studio: alle data- og layoutkomponenter i @arkitektum/altinn-studio-custom-components med eksempeldata, markup og tekstressurser.";

/**
 * Emits robots.txt and sitemap.xml next to the built site.
 *
 * Written as a small plugin rather than copying static files, because both need the canonical site URL and the sitemap
 * needs a build date, so they have to be generated.
 *
 * Worth knowing about robots.txt: crawlers only read it from a domain root. On the default github.io project path the
 * file is served from a subdirectory, where nothing looks for it, so it only takes effect behind a custom domain. The
 * sitemap has no such limitation, since it can be submitted directly in Search Console and only lists URLs below its
 * own path.
 *
 * The sitemap deliberately lists just the one page. The per-component `#component-<tagName>` anchors are fragments of
 * that same URL, and a sitemap that lists fragments is invalid.
 */
class SeoFilesPlugin {
    apply(compiler) {
        const { RawSource } = compiler.webpack.sources;
        const { Compilation } = compiler.webpack;

        compiler.hooks.thisCompilation.tap("SeoFilesPlugin", (compilation) => {
            compilation.hooks.processAssets.tap({ name: "SeoFilesPlugin", stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL }, () => {
                const lastModified = new Date().toISOString().slice(0, 10);

                compilation.emitAsset(
                    "robots.txt",
                    new RawSource(["User-agent: *", "Allow: /", "", `Sitemap: ${siteUrl}sitemap.xml`, ""].join("\n"))
                );

                compilation.emitAsset(
                    "sitemap.xml",
                    new RawSource(
                        [
                            '<?xml version="1.0" encoding="UTF-8"?>',
                            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                            "    <url>",
                            `        <loc>${siteUrl}</loc>`,
                            `        <lastmod>${lastModified}</lastmod>`,
                            "    </url>",
                            "</urlset>",
                            ""
                        ].join("\n")
                    )
                );
            });
        });
    }
}

/**
 * Runs the built bundle once at build time and writes the resulting DOM into index.html.
 *
 * Without this the shipped page is an empty `<div id="component-docs-container">` plus an empty `<aside id="sidebar">`,
 * because every component section, heading, code sample and sidebar link is created by JavaScript on load. Crawlers
 * that do not execute JavaScript therefore see a page with no content and no internal links.
 *
 * The real bundle is executed rather than the rendering logic being duplicated, so the markup cannot drift from what
 * the client produces. `initCustomComponents` in the components package early-returns when it cannot read an org and
 * app from the URL path, which is the case both here and on the published site, so nothing is fetched during the build.
 *
 * The client still loads the same bundle and renders again on top of the prerendered markup, which is why
 * `renderResults` and `renderSidebar` both clear their containers first.
 *
 * Failure is reported as a warning rather than an error: a client-rendered page still works, so a broken prerender
 * should not block a deploy.
 *
 * @param {string} html - The emitted index.html.
 * @param {string} script - The emitted bundle.
 * @returns {Promise<string>} The prerendered document.
 */
async function prerenderDocument(html, script) {
    // Required lazily so a missing jsdom degrades to a warning instead of breaking config loading.
    const { JSDOM, VirtualConsole } = require("jsdom");

    // Swallow page output: initCustomComponents logs that it cannot find an Altinn app in the URL, which is expected.
    const dom = new JSDOM(html, {
        url: siteUrl,
        runScripts: "outside-only",
        pretendToBeVisual: true,
        virtualConsole: new VirtualConsole()
    });

    try {
        dom.window.eval(script);
        dom.window.dispatchEvent(new dom.window.Event("load"));
        // The load handler is async, so let its microtasks settle before serialising.
        await new Promise((resolve) => setTimeout(resolve, 0));
        return `<!doctype html>\n${dom.window.document.documentElement.outerHTML}\n`;
    } finally {
        dom.window.close();
    }
}

class PrerenderPlugin {
    apply(compiler) {
        const { Compilation, WebpackError } = compiler.webpack;
        const { RawSource } = compiler.webpack.sources;

        // Only for real builds: prerendering every incremental rebuild would slow the dev server down for no gain.
        if (compiler.options.mode !== "production") {
            return;
        }

        compiler.hooks.thisCompilation.tap("PrerenderPlugin", (compilation) => {
            compilation.hooks.processAssets.tapPromise({ name: "PrerenderPlugin", stage: Compilation.PROCESS_ASSETS_STAGE_REPORT }, async () => {
                const htmlAsset = compilation.getAsset("index.html");
                const scriptAsset = compilation.getAsset("main.js");
                if (!htmlAsset || !scriptAsset) {
                    return;
                }
                try {
                    const prerendered = await prerenderDocument(htmlAsset.source.source().toString(), scriptAsset.source.source().toString());
                    compilation.updateAsset("index.html", new RawSource(prerendered));
                } catch (error) {
                    compilation.warnings.push(
                        new WebpackError(`PrerenderPlugin: shipping the client-rendered page because prerendering failed: ${error.message}`)
                    );
                }
            });
        });
    }
}

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "docs")
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: "body",
            favicon: "./src/assets/favicon.svg",
            templateParameters: {
                siteUrl,
                siteName,
                siteDescription
            }
        }),
        new SeoFilesPlugin(),
        new PrerenderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext][query]"
                }
            },
            {
                test: /\.svg$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/svg/[name][ext][query]"
                }
            }
        ]
    },
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()]
    },
    performance: {
        maxAssetSize: 512000,
        maxEntrypointSize: 512000
    },
    devServer: {
        compress: true,
        port: 9000
    }
};
