/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liusm
 * @Date: 2020-04-01 09:42:49
 * @LastEditors: liusm
 * @LastEditTime: 2020-04-14 11:54:31
 */

const path = require('path');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');


const config = {
    entry: {
        main: './main.js',
        storage: './script/storage.js'
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
    plugins: [
        new UglifyJsPlugin()
    ],
    devServer: {
        contentBase:path.resolve(__dirname,'dist'),
        host:'127.0.0.1',
        compress:true,
        port:8899
    }
}

module.exports = config;