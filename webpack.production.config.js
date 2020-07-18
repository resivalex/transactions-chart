const genConfig = require('./webpack.config')

module.exports = {
  ...genConfig({ isDev: false }),
  mode: 'production'
}
