
const path = require('path');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');


const config = {
    entry: {
        storage: './main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins:[
        new UglifyJsPlugin()
    ]
}

module.exports = config;