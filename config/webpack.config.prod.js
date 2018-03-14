const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isServer = process.env.BUILD_TYPE === "server";
const rootPath = path.join(__dirname, "../");
const srcPath = path.join(__dirname, "../src");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const prodConfig = {
    context: path.join(rootPath, "./src"),
    entry: {
        client: "./index.js",
        // vendors: [
        //     "react",
        //     "react-dom",
        //     "react-loadable",
        //     "react-redux",
        //     "redux",
        //     "react-router-dom",
        //     "react-router-redux",
        //     "redux-thunk"
        // ]
    },
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(rootPath, "./dist/assets"),
        publicPath: "/assets/",
        chunkFilename: "[name]-[hash:8].js"
        // libraryTarget: isServer?'commonjs2':'umd',
    },
    resolve: {
        extensions: [".js", ".jsx", ".css", ".less", ".scss", ".png", ".jpg"],
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
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", //style-loader将css chunk 插入到html中
                    use: [
                        {
                            loader: "css-loader", //css-loader 是处理css文件中的url(),require()等
                            options: {
                                sourceMap: true, //是否生成css的sourceMap, 主要用来方便调试
                                compact: true, // 压缩代码
                                // modules: true, //是否支持css-modules  若为true则样式文件里样式名加密
                                camelCase: true, //是否支持 -(中缸线)写法的class,id名称
                                importLoaders: 1 // 是否支持css import方法
                            }
                        },
                        {
                            loader: "postcss-loader", //postCSS加载模块,可以使用postCSS的插件模块
                            options: {
                                compact: true,
                                plugins: () => [
                                    precss(),
                                    autoprefixer({
                                        browsers: ["last 3 version", "ie >= 10"]
                                    })
                                    // postcsseasysprites({imagePath: '../img', spritePath: './assets/dist/img'})
                                ],
                                sourceMap: true,
                            }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                compact: true,
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
                            "transform-runtime",
                            "add-module-exports",
                            "babel-plugin-transform-decorators-legacy",
                            ["import", { libraryName: "antd", style: true }]
                        ],
                        cacheDirectory: true, //使用缓存机制，减少打包时间
                        compact: true
                    }
                }
            },
            {
                test: /\.(svg|woff2?|ttf|eot|jpg|jpeg|png|gif)(\?.*)?$/i,
                exclude: /node_modules/,
                include: path.resolve(rootPath, "src"),
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 50000, // 小于50k转为base64
                        name: "img/[sha512:hash:base64:7].[ext]"
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["./dist"], { root: rootPath }),
        new ManifestPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: "css/style.[hash].css",
            allChunks: true  //是否分开打包
        }),
        new CopyWebpackPlugin([
            { from: "favicon.ico", to: rootPath + "./dist" },
            { from: rootPath + "src/assets/img", to: rootPath + "./dist/assets/img" }
        ]),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            title: "服务端渲染",
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: "./index.ejs"
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ["vendors", "manifest"],
        //     minChunks: 2
        // }),
        new ReactLoadablePlugin({
            filename: path.join(rootPath, "./dist/react-loadable.json")
        })
    ]
};
module.exports = prodConfig;
