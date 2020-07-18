const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (options) => {
  const isDev = options['isDev']
  const helpers = { root: (...args) => path.resolve(__dirname, ...args) }

  return {
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    devServer: {
      hot: false
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        vue$: isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
        '@': helpers.root('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: [helpers.root('src')]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [helpers.root('src')]
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: isDev } }
          ]
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: isDev } },
            { loader: 'sass-loader', options: { sourceMap: isDev } }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  }
}
