import * as path from 'path';
import * as express from 'express';

const router = express.Router();
const webpack = require('webpack');
const webpackConfig = require('./../../webpack.config.dev');

const compiler = webpack(webpackConfig[0]);

// webpack dev server as middleware
router.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig[0].output.publicPath
}));

// webpack hot replacement middleware
router.use(require('webpack-hot-middleware')(compiler));

export default router;
