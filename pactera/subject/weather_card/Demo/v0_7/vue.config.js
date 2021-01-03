const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir);
}

module.exports = {
    runtimeCompiler: true,
    devServer:{
      host: 'localhost',
      port: '80',
      proxy: {
          '/v7':{
              target: 'https://devapi.qweather.com',
              // ws: true,
              changeOrigin: true,
              port: '8801'
              // ,pathRewrite: {
              //     '^/v7':'/v7'
              // }
          }
          ,'/v2':{
              target: 'https://devapi.qweather.com',
              changeOrigin: true,
              port: '8802'
              // ,pathRewrite: {
              //     '^/v2':'/v2'
              // }
          }
      }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@':resolve('src')
            }
        }
    }
}
