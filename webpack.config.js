const path = require("path");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],      
      }
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3005,
    publicPath: "http://localhost:3005/dist/",
    hotOnly: true,
    historyApiFallback: true
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [
          {from:'public/'} 
        ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('1.0'),
      BROWSER_SUPPORTS_HTML5: true,            
      'process.env.NODE_ENV': 'production',
      'process.env.REACT_APP_BACKEND_API': process.env.REACT_APP_BACKEND_API,      
      'process.env.GOOGLE_CLIENT_ID': process.env.GOOGLE_CLIENT_ID,      
      'process.env.APP_NAME': process.env.APP_NAME,      
    })           
  ],
};
