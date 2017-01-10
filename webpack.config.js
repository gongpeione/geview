const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.resolve(__dirname, './src');
const distDir = path.resolve(__dirname, './dist');

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js'
});
const hotReplacement = new webpack.HotModuleReplacementPlugin();
const extract = new ExtractTextPlugin('css/[name]/style.css');
const htmlPlugin = new HtmlWebpackPlugin({
    title: 'Geeku',
    template: path.resolve(__dirname, './index.html'),
    inject: 'body',
    hash: true,
    minify: {
        collapseWhitespace: true
    }
});

module.exports = {
    entry: {
        'src': srcDir,
        // 'bacic': path.resolve(srcDir, './basic')
    },
    output: {
        path: distDir,
        publicPath: '',
        filename: 'index.js',
        chunckFileName: '[id].bundle.js'
    },
    module: {
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         loaders: ['eslint'],
        //         exclude: /node_modules/
        //     }
        // ],
        loaders: [
            // {
            //     test: /\.html$/,
            //     loader: 'file?name=[name].[ext]'
            // },
            {
                test: /\.js$/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0&cacheDirectory'],
                exclude: /node_modules/
            },
            {
                test: /\.css$|\.scss$/,
                loader: extract.extract('css?minimize!postcss!sass-loader')
                // loaders: ['style', 'css?minimize&-autoprefixer', 'postcss']
            }
        ]
    },
    plugins: [ commonsPlugin, extract, htmlPlugin ],
    // watch: true,

    postcss: function () {
        return [
            autoprefixer({
                remove: false,
                browsers: ['ie >= 9', '> 1% in CN'],
            }),
            precss
        ];
    },
    eslint: {
        // configFile: path.resolve(__dirname, './.eslintrc'), 
        failOnWarning: true, 
        failOnError: true, 
        cache: true, 
    },

    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true,
        port: 2333
    },
    devtool: "#source-map",
}