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
        new SeoFilesPlugin()
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
