/* eslint-disable */
const webpack = require('webpack');

const commonPaths = require('./utils/paths');
const { style } = require('./utils/rules');

module.exports = {
    /* eslint-enable */
    mode : 'development',

    output : {
        filename      : '[name].js',
        path          : commonPaths.outputPath,
        chunkFilename : '[name].js'
    },

    module : { rules: [ style() ] },

    devServer : {
        host        : 'localhost',
        port        : 3000,
        contentBase : commonPaths.outputPath,
        compress    : true,
        hot         : true,
        open        : true
    },

    plugins : [ new webpack.HotModuleReplacementPlugin() ]
};
