const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const rootPath = path.join(__dirname, "../");
const autoprefixer = require("autoprefixer");
const srcPath = path.join(__dirname, "../src");
const precss = require("precss");
const devConfig = {
    context: path.join(rootPath, "./src"),
    entry: {
        client: "./index.js",
        vendors: [
            "react",
            "react-dom",
            "react-loadable",
            "react-redux",
            "redux",
            "react-router-dom",
            "react-router-redux",
            "redux-thunk"
        ]
    },
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(rootPath, "./dist/client"),
        publicPath: "/",
        chunkFilename: "[name]-[hash:8].js"
    },
    resolve: {
        extensions: [".js", ".jsx", "css", "less", "scss", "png", "jpg"],
        modules: [path.resolve(rootPath, "src"), "node_modules"],
        alias: {
            // 别名配置，方便开发中引入组件
            actions: srcPath + "/actions/",
            common: srcPath + "/common/",
            component: srcPath + "/component/",
            reducers: srcPath + "/reducers/",
            store: srcPath + "/store/",
            styles: srcPath + "/styles/"
        }
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                // exclude: path.resolve(__dirname, './node_modules'),
                // include: path.resolve(rootPath, "src"),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", //style-loader 将css插入到页面的style标签
                    use: [
                        {
                            loader: "css-loader", //css-loader 是处理css文件中的url(),require()等
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: () => [
                                    precss(),
                                    autoprefixer({
                                        browsers: ["last 3 version", "ie >= 10"]
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: path.resolve(__dirname, './node_modules'),
                include: path.resolve(rootPath, "src"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react", "es2015", "stage-0"],
                        plugins: [
                            "transform-runtime", // 运行时转换es6语法
                            "add-module-exports",
                            "babel-plugin-transform-decorators-legacy", // es7装饰器
                            ["import", { libraryName: "antd", style: true }]
                        ],
                        cacheDirectory: true,
                        compact: true
                    }
                }
            },
            {
                test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 1024,
                        name: "img/[sha512:hash:base64:7].[ext]"
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: "./src/",
        historyApiFallback: true,
        hot: true,
        disableHostCheck: true,
        port: "3002",
        publicPath: "/",
        noInfo: false,
        stats: {
            colors: true
        }
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin([{ from: "favicon.ico" }]),
        new webpack.HotModuleReplacementPlugin(),
        new ProgressBarPlugin({ summary: false }),
        new ExtractTextPlugin({ filename: "style.[hash].css" }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(
                process.env.NODE_ENV || "development"
            )
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendors"],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: "开发模式",
            filename: "index.html",
            template: "./index.ejs"
        })
    ]
};

module.exports = devConfig;
