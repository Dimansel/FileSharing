/* eslint-disable */
const webpackMerge = require('webpack-merge');
const common = require('./webpack/common');
const envConfig = require(`./webpack/${process.env.NODE_ENV}.js`);

module.exports = webpackMerge(common, envConfig);
