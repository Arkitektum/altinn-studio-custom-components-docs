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
const siteUrl = process.env.SITE_URL || "https://arkitektum.github.io/altinn-studio-custom-components-docs/";

const siteName = "Altinn Studio Custom Components";

const siteDescription =
    "Komponentgalleri for Altinn Studio: alle data- og layoutkomponenter i @arkitektum/altinn-studio-custom-components med eksempeldata, markup og tekstressurser.";

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
        })
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
