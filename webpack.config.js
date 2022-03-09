const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let config = {
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
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/manifest.json",
                    transform: (content, path) => 
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

module.exports = (_, argv) => {
    if (argv.mode === "development") {
        config.devtool = "eval-cheap-module-source-map";
    }
  
    if (argv.mode === "production") {
        //...
    }
  
    return config;
};