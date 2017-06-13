/* eslint no-undef: 0 */
/* eslint no-underscore-dangle: 0 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'assets/bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 5000
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015', 'react'] }
				}],
			},
			{
				test: /\.less$/,
				exclude: [/node_modules/],
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader!less-loader',
				})
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				exclude: /node_modules/,
				loader: 'url-loader?limit=10000'
			},
			{
				test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'base64-font-loader'
			}
		]
	},
	plugins: [
        new ExtractTextPlugin('assets/styles.css')
	]
};
