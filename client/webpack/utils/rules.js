/* eslint-disable */
const commonPaths = require('./paths');

module.exports = {
/* eslint-enable */

    // STYLE
    style : MiniCssExtractPlugin => ({
        test : /\.(css|scss|sass)$/,
        use  : [
            MiniCssExtractPlugin ? MiniCssExtractPlugin.loader : 'style-loader',
            {
                loader  : 'css-loader',
                options : {
                    sourceMap      : !!MiniCssExtractPlugin,
                    modules        : true,
                    camelCase      : true,
                    localIdentName : '[local]___[hash:base64:5]'
                }
            },
            'sass-loader'
        ]
    }),

    // ESLINT
    eslint : () => ({
        enforce : 'pre',
        test    : /\.(js|jsx)$/,
        loader  : 'eslint-loader',
        exclude : /(node_modules)/,
        options : { emitWarning: process.env.NODE_ENV !== 'production' }
    }),

    // JAVASCRIPT
    js : () => ({
        test    : /\.(js|jsx)$/,
        loader  : 'babel-loader',
        exclude : /(node_modules)/
    }),

    // IMAGES
    images : () => ({
        test : /\.(png|jpg|gif|svg)$/,
        use  : [
            {
                loader  : 'file-loader',
                options : {
                    outputPath : commonPaths.imagesFolder
                }
            }
        ]
    }),

    // FONTS
    fonts : () => ({
        test : /\.(woff2|ttf|woff|eot)$/,
        use  : [
            {
                loader  : 'file-loader',
                options : {
                    outputPath : commonPaths.fontsFolder
                }
            }
        ]
    })
};

