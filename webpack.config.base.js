/**
 * Created by sajjad on 3/14/18.
 */

'use strict';

const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ManifestPlugin = require('webpack-manifest-plugin');

const cwd = path.resolve(__dirname);

const client = {
  name: 'client',
  context: cwd,
  entry: { main: [(path.join(cwd, 'src', 'client.tsx'))] },
  output: {
    path: path.join(cwd, 'public', 'assets', 'dist'),
    publicPath: '/assets/dist/',
    filename: '[name].js'
  },
  plugins: [
    new ManifestPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css', '.scss' ]
  }
};

const server = {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  context: cwd,
  entry: { server: [(path.join(cwd, 'src', 'server', 'index.ts'))] },
  output: {
    path: path.resolve(path.join(cwd, 'dist')),
    publicPath: '/assets/dist/',
    filename: 'server.bundle.js'
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.(css|less|scss)$/, 'node-noop'),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  module: {
    rules: client.module.rules
  },
  node: {
    __dirname: true,
    __filename: true
  },
  externals: [nodeExternals({
    whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
  })],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css', '.scss' ]
  }
};

module.exports = [client, server];
