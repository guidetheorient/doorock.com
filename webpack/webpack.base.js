/*
 * @Author: guidetheorient 
 * @Date: 2018-04-23 13:18:35 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-25 15:12:36
 */

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpack = require('webpack');

const isDev = (process.env.NODE_ENV === 'development') ? true : false;

const devServer = require('webpack-dev-server');

const glob = require('glob');
const pureCSSPlugin = require('purifycss-webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin')


let cssExtract = new ExtractTextPlugin({
  filename: 'css/[name]_[contenthash:8].css'
})

let scssExtract = new ExtractTextPlugin({
  filename: 'css/[name]_[contenthash:8].css'
})

let providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jquery': 'jquery',
  'window.$': 'jquery'
})

function getHtmlConfig(name, title) {
  return {
    template: `./src/views/${name}.html`,
    title: title,
    filename: `views/${name}.html`,
    inject: true,
    favicon: './favicon.ico',
    cache: true,
    chunks(){
      let nameList = ['index'];
      if(nameList.includes(name)) {
        return ['jquery', 'common', 'wow', name]
      } else {
        return ['jquery', 'common', name]
      }
      return 
    }
  }
}
const config = {
  entry: {
    jquery: 'jquery',
    common: './src/pages/common/index.js',
    wow: './src/tool/wow.min.js',
    index: './src/pages/index/index.js',
  },
  resolve: {
    alias: {
      'tool': path.resolve(__dirname, '../src/tool'),
    }
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]_[hash].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|wow.min.js/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: '4096',
              name: '[name].[ext]',
              outputPath: 'assets',
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: cssExtract.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },{
            loader: 'postcss-loader',
          }]
        })
      },
      {
        test: /\.scss$/,
        use: scssExtract.extract({
          fallback: 'style-loader',
          use: [ {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          }, 'postcss-loader','sass-loader']
        })
      }
    ]
  },
  plugins: [
    cssExtract,
    scssExtract,

    providePlugin,

    new webpack.optimize.CommonsChunkPlugin({
      name: ['common', 'jquery', 'wow'],
      filename: 'assets/lib/[name].js',
      minChunks: 2
    }),
        
    new pureCSSPlugin({
      paths: glob.sync(path.join(__dirname, '../src/views/**/*.html')),
      purifyOptions: {
        // js中使用的要加入whitelist，防止被去掉
        whitelist: [
          '*fixed*',
          '*slideInDown*'
        ]
      }
    }),

    new htmlWebpackPlugin(getHtmlConfig('index', '首页')),

    new CopyWebpackPlugin([
      {
        from: './src/assets/img/photo02.gif',
        to: 'assets'
      }
    ]),
  ]
}

module.exports = config