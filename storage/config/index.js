'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://115.159.209.160:8080/storage', // 你请求的第三方接口
        changeOrigin: true,// 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { // 路径重写，
          '^/api': '/'// 替换target中的请求地址
        }
      }
    },

    /*
    * ProxyTable模块中设置了‘/api’，target中设置服务器地址，也就是接口的开头那段地址，例如‘172.0.0.1’，
    * 然后我们在调用接口的时候，就可以全局使用‘/api’，这时候‘/api’的作用就相当于‘172.0.0.1’，比如接口的地址是‘172.0.0.1/user/info’，我们就可以使用‘/api/user/info’，
    * changeOrigin为true，本地就会虚拟一个服务替我们接受或转发请求，这样就不会有跨域的问题了。
    * pathRewrite这里的作用，相当于是替代‘/api’，如果接口中是没有api的，例如172.0.0.1/user/info 那就直接置空，
    * 如果接口中有api，例如 172.0.0.1/api/user/info 为了防止与上面配置的全局api搞混，那就得写成{‘^/api’:‘/api’}，这样在代理的时候就不会把接口中的api替换成172.0.0.1 ，可以理解为一个重定向或者重新赋值的功能。
    *
    *
    * */
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
