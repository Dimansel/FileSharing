/* eslint-disable */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const commonPaths = require('./utils/paths');
const { eslint, js, images, fonts } = require('./utils/rules');

module.exports = {
    /* eslint-enable */
    entry   : commonPaths.entryPath,
    module  : { rules: [ eslint(), js(), images(), fonts() ] },
    resolve : {
        modules    : [ 'src', 'node_modules' ],
        extensions : [ '*', '.js', '.jsx', '.css', '.scss' ]
    },
    plugins : [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({ template: commonPaths.templatePath }),
        new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'async' })
    ]
};
