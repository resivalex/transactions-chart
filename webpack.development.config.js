const path = require('path')

const genConfig = require('./webpack.config')

module.exports = {
  ...genConfig({ isDev: true }),
  mode: 'development',
  devServer: {
    hot: false,
    contentBase: path.resolve(__dirname, 'build'),
    host: '0.0.0.0',
    port: 80
  }
}
