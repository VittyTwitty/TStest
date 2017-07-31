const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, 'app'),
    devServer: {
        contentBase: path.resolve(__dirname, 'app'), // New line
    },
    entry: {
        index: './js/index.js'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist/'),        
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