const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        '@': resolve('src'),
      },
    },
  },
}