/**
 * Created by sajjad on 3/14/18.
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.config.base');
const nodeExternals = require('webpack-node-externals');

const clientBase = base[0];
const serverBase = base[1];

const clientDevConf = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    main: ([
      'webpack-hot-middleware/client?name=client'
    ]).concat(clientBase.entry.main)
  },
  plugins: clientBase.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]),
  module: {
    rules: clientBase.module.rules.concat([
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
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
  }
};

const serverDevConf = {
  mode: 'development',
  entry: {
    server: ([
      'webpack/hot/poll?1000'
    ]).concat(serverBase.entry.server)
  },
  plugins: serverBase.plugins.concat([
    new webpack.HotModuleReplacementPlugin({ quiet: true })
  ]),
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000', /\.(?!(?:jsx?|json)$).{1,5}$/i] // let include this in bundle
  })]
};

module.exports = [
  Object.assign({}, clientBase, clientDevConf),
  Object.assign({}, serverBase, serverDevConf)
];
