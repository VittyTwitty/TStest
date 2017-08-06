const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');



module.exports = {
    context: path.resolve(__dirname, 'app'),
    devServer: {
        contentBase: path.resolve(__dirname, 'app'),
    },
    entry: {
        index: './ts/app.ts'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist/'),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{ loader: 'css-loader', options: { modules: true } },]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [require('autoprefixer')];
                                },
                            },
                        },
                        'sass-loader']
                })
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                // use: ['file-loader'],
                use: [{
                    loader: 'file-loader',
                    query: {
                        useRelativePath: process.env.NODE_ENV === "production"
                    }
                }],
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin("css/styles.css"),
        new CopyWebpackPlugin([
            { from: 'assets/**/*' },
        ]),
        new HtmlWebpackPlugin({
            title: 'tsApp',
            template: 'index.html',
        })
    ]
}