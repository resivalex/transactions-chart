const path = require('path')

const config = require('./webpack.config')

module.exports = {
  ...config,
  mode: 'development',
  devServer: {
    hot: false,
    contentBase: path.resolve(__dirname, 'build'),
    host: '0.0.0.0',
    port: 8282
  }
}
