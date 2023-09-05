const path = require('path')

module.exports = {
  webpack: {
    alias: {
      // 配置别名
      '@': path.resolve(__dirname, 'src')

      // '@': path.join(__dirname, 'src')
    }
 
  }
}
