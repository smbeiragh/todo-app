/**
 * Created by sajjad on 3/14/18.
 */

'use strict';

const base = require('./webpack.config.base');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cwd = path.resolve(__dirname);

const clientBase = base[0];
const serverBase = base[1];

const clientDevConf = {
  mode: 'production',
  output: {
    path: path.join(cwd, 'public', 'assets', 'dist'),
    publicPath: '/assets/dist/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: clientBase.module.rules.concat([
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff2?)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ])
  },
  plugins: clientBase.plugins.concat([
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  ])
};

const serverDevConf = {
  mode: 'development', // keep source-map
  optimization: {
    nodeEnv: false
  }
};

module.exports = [
  Object.assign({}, clientBase, clientDevConf),
  Object.assign({}, serverBase, serverDevConf)
];
