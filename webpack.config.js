const webpack = require('webpack');

module.exports = {
    // other webpack configuration options...

    plugins: [
        new webpack.ProvidePlugin({
            fs: 'browserfs/dist/shims/fs.js' // Provide the 'fs' module using the browserfs polyfill
        })
    ]
};