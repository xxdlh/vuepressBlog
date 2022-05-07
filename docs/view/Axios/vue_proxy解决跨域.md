## 通过vue的proxy解决前端请求跨域问题

#### vue.config.js
``` js
module.exports = {
  devServer: {
    //...
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://192.168.110.160:8080`,//请求的域名
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
  }
  //...
}
```

#### axios 请求中设置的基础路径与config中一致
``` js
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
```

#### 分别在根目录创建名为(.env.development)和(.env.production)的文件，配置开发和生产环境下‘process.env.VUE_APP_BASE_API’对应值
``` js
//.env.development
NODE_ENV='development'
# must start with VUE_APP_
VUE_APP_BASE_API = '/dev-api'

//.env.production
NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_BASE_API = 'http://192.168.110.160:8080'
