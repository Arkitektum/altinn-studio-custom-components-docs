const path = require("node:path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
            inject: "body"
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
    devServer: {
        static: [
            {
                directory: path.join(__dirname, "public/docs")
            },
            {
                directory: path.join(__dirname, "src"),
                publicPath: "/src/"
            }
        ],
        compress: true,
        port: 9000
    }
};
