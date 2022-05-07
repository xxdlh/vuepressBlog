---
title: axios 简单封装type1
date: 2022-03-01
tags:
 - axios
categories:
 - frontEnd
---

#### commen.js
``` js
import axios from 'axios'

// axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/api/' : 'http://szjjcyxh.supertest.top/'
axios.defaults.baseURL = process.env.VUE_APP_BASE_API

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

export default function (url, method, options) {
  const token = cookie.getCookie('token')
  const tokenHead = cookie.getCookie('tokenHead')
  axios.defaults.headers['Authorization'] = token && tokenHead ? tokenHead + ' ' + token : ''

  if (options !== undefined) {
    var { params = {}, data = {} } = options
  } else {
    params = data = {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      data: data
    }).then(
      res => {
        // API正常返回(status=20x), 是否错误通过有无error判断
        const errMsg = res.data.msg || res.data.message || res.data.error || '未知错误，请刷新重试'
        switch (res.data.code) {
          case 200:
            // 登录成功，携带请求头
            if (changeHead === 'LOGIN') {
              const tokenHead = res.data.data.tokenHead.trim()
              const str = tokenHead + ' ' + res.data.data.token
              axios.defaults.headers['Authorization'] = str
              cookie.setCookie('tokenHead', res.data.data.tokenHead.trim(), 43200000)
              cookie.setCookie('token', res.data.data.token, 43200000)
            }
            resolve(res.data.data)
            break
          case 400:
            // message.error(errMsg) //提示组件
            reject(res.data)
            break
          case 401://(403、404、500...)
            // message.error(errMsg)
            // 判断401 ...
            reject(res.data)
            break
          default:
            resolve(res.data)
            break
        }
      },
      res => {
        // API请求异常，一般为Server error 或 network error
        //... 错误情况判断
        const errMsg = '服务端或网络出错，请刷新重试'
        reject(res)
      }
    )
  })
}
```


#### index.js
``` js
import ajax from './commen'

const currencyApi = {
  getNavigation(params) {
    return ajax('/api/getNavigation', 'GET', { params })
  },
  register(data) {
    return ajax('tenant-service/registered', 'POST', { data })
  },
  //...
}

export default {
  ...currencyApi,
}

```