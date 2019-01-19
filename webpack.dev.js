var path = require("path")
var webpack = require("webpack")

module.exports = {
	"entry": "./src/components/Index.jsx",
	"output": {
		"path": path.join(__dirname, "./dist"),
		"filename": "index.js"
	},
	"plugins": [
		new webpack.ProvidePlugin({
			"$": "jquery",
			"jQuery": "jquery",
			"jquery": "jquery"
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		})
	],
	"resolve": {
		"extensions": [".js", ".jsx"],
		"alias": {
			"root": path.join(__dirname, ""),
			"appRoot": path.join(__dirname, "/src")
		}
	},
	"module": {
		"rules": [
			{
				"test": /\.scss$/,
				"use": [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				"test": /\.jsx?$/,
				"loader": "babel-loader",
				"include": [path.join(__dirname, "/src"), path.join(__dirname, "node_modules/reflux-core")],
				"options": {
					"presets": ["react", "es2015", "stage-1", "stage-2"]
				}
			},
			{
				"test": /\.(woff2?|png|jpe?g|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				"use": [{
					"loader": "file-loader",
					"options": {
						"name": "[name].[ext]",
						"outputPath": "assets/"
					}
				}]
			},
			{
				"test": /\.html$/,
				"loader": "file-loader",
				"options": {
					"name": "[name].[ext]"
				}
			}
		]
	},
	"watch": true,
	"watchOptions": {
		"ignored": /node_modules/
	},
	"externals": {
		"webpack-config": JSON.stringify({
			"ServerURL": "http://localhost:9000/php"
		})
	}
}
