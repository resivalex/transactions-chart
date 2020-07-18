module.exports = {
  plugins: ['@babel/proposal-class-properties', '@babel/plugin-syntax-dynamic-import'],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8', 'ie >= 11']
        }
      }
    ]
  ]
}
