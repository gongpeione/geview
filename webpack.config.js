const path = require('path');
const webpack = require('webpack');

const srcDir = path.resolve(__dirname, './src');
const distDir = path.resolve(__dirname, './dist');

const hotReplacement = new webpack.HotModuleReplacementPlugin();

module.exports = {
    entry: {
        'src': srcDir,
    },
    output: {
        path: distDir,
        publicPath: '',
        filename: 'index.js'
    },
    module: {
    	loaders: [
		    {
		    	test: /\.tsx?$/,
			    exclude: /node_modules/,
			    use: [
				    {
					    loader: 'babel-loader'
				    },
				    {
					    loader: 'ts-loader'
				    }
			    ]
		    }
	    ]
        // loaders: [
        //     {
        //         test: /\.js$/,
        //         loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0&cacheDirectory'],
        //         exclude: /node_modules/
        //     },
        //     {
        //         test: /\.css$|\.scss$/,
        //         loader: extract.extract('css?minimize!postcss!sass-loader')
        //     }
        // ]
    },
    // plugins: [ commonsPlugin, extract, htmlPlugin ],
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
    // watch: true,

    // eslint: {
    //     configFile: path.resolve(__dirname, './.eslintrc'),
    //     failOnWarning: true,
    //     failOnError: true,
    //     cache: true,
    // },

    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        port: 2333
    },
    devtool: "#source-map",
}