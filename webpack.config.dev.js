var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3100'
  },
  devServer: {
    port:3100,
    contentBase: './src',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }]
      },
      {
        test: /\.less$/,
        use: [{
            loader: 'style-loader'
        }, {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
        }]
      },
      {
        'exclude': '/node_modules/',
        'include': path.join(__dirname, 'src'),
        'use': [
          {
            'loader': 'source-map-loader'
          },
          {
            'loader': 'babel-loader', 'options': {
              sourceMap: true,
              'presets': ['react', 'es2015', 'stage-2'],
              'plugins': [
                'transform-object-rest-spread',
                'transform-decorators-legacy',
                'transform-class-properties'
              ]
            },
          }
        ],

        'test': /\.js?$/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: __dirname + '/src/images', to: __dirname + '/../public/images' },
      { from: __dirname + '/src/libs', to: __dirname + '/../public/libs' },
      { from: __dirname + '/src/index.html', to: __dirname + '/../public/index.html' },
    ]),
    new webpack.SourceMapDevToolPlugin({
      filename: 'bundle.js.map'
    })
  ]
};
