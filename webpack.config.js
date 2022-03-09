const path = require("path");
const { merge } = require("webpack-merge");

const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = {
    entry: {
        popup: "./src/js/popup.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [ 
            {
                test: /\.js$/,
                loader: "babel-loader",         
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: /node_modules/
            }
        ]
    },
    
};

const development = {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/manifest.json",
                    transform: (content, _) => 
                        Buffer.from(JSON.stringify({
                            description: process.env.npm_package_description,
                            version: process.env.npm_package_version,
                            content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
                            ...JSON.parse(content.toString())
                        }))
                },
                {
                    from: "src/imgs/",
                    to: "imgs/",
                    noErrorOnMissing: true
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "popup.html"),
            filename: "popup.html",
            chunks: ["popup"]
        })
    ]
};

const production = {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/manifest.json",
                    transform: (content, _) => 
                        Buffer.from(JSON.stringify({
                            description: process.env.npm_package_description,
                            version: process.env.npm_package_version,
                            ...JSON.parse(content.toString())
                        }))
                },
                {
                    from: "src/imgs/",
                    to: "imgs/",
                    noErrorOnMissing: true
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "popup.html"),
            filename: "popup.html",
            chunks: ["popup"]
        })
    ]
};

module.exports = (_, argv) => 
    merge(common, (argv.mode === "development") ? development : production);
