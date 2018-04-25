

const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const merge = require('webpack-merge')

const devConfig = merge(baseConfig, {
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    // hot: true,
    useLocalIp: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
  ]
  
})

module.exports = devConfig;