/* eslint-disable */
const path = require('path');

module.exports = {
/* eslint-enable */
    root         : path.resolve(__dirname, '../../'),
    outputPath   : path.resolve(__dirname, '../../', 'build'),
    entryPath    : path.resolve(__dirname, '../../', 'src/index.js'),
    templatePath : path.resolve(__dirname, '../../', 'src/index.html'),
    imagesFolder : 'assets/images',
    fontsFolder  : 'assets/fonts',
    cssFolder    : 'css',
    jsFolder     : 'js'
};
