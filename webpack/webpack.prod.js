const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default


let prodConfig = merge(baseConfig, {
  plugins: [
    // 没用，jquery还是未压缩版，命令行-p有用
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '../')
    }),

    new ImageminPlugin({
      gifsicle: {
        test: /\.gif$/,
        optimizationLevel: 3
      }
    })
  ]
})

module.exports = prodConfig;