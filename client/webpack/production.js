/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonPaths = require('./utils/paths');
const { style } = require('./utils/rules');

module.exports = {
/* eslint-enable */
    mode : 'production',

    devtool : 'source-map',

    output : {
        filename      : `${commonPaths.jsFolder}/[name].[hash].js`,
        path          : commonPaths.outputPath,
        chunkFilename : '[name].[chunkhash].js'
    },

    module : { rules: [ style(MiniCssExtractPlugin) ] },

    plugins : [
        new CleanWebpackPlugin([ commonPaths.outputPath.split('/').pop() ], {
            root : commonPaths.root
        }),
        new MiniCssExtractPlugin({
            filename      : `${commonPaths.cssFolder}/[name].css`,
            chunkFilename : '[id].css'
        })
    ]
};
