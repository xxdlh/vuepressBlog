---
title: axios 简单封装type2
date: 2022-03-01
tags:
 - axios
categories:
 - frontEnd
---

##### commen.js
``` js
import axios from 'axios'
import vm from '../main'
import { Toast } from 'vant'

/* 全局默认配置 */
var http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
  timeout: 10000
})

/* 请求拦截器 */
http.interceptors.request.use(
  config => {
    let whiteList = ['/jlb/loginComp', '/login']
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    if (whiteList.indexOf(config.url) < 0) {
      if (localStorage.getItem('token')) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
      }
    }

    // 接口没返回时显示loadin
    if (config.loading === true) {
      vm.$loading.hide()
      vm.$loading.show()
    }
    return config
  },
  error => {
    vm.$loading.hide()
    return Promise.reject(error)
  }
)
/* 响应拦截器 */
http.interceptors.response.use(
  res => {
    vm.$loading.hide()
    if (res.data.code == 500) {
      Toast(res.data.msg);
    }
    return res.data;
  },
  error => {
    vm.$loading.hide()
    return Promise.reject(error)
  }
)

export default http
```


##### index.js
``` js
import ajax from './commen'

const otherApi = {
  queryAreaTree(params) {
    return ajax({
      url: "/base/area/tree",
      method: "get",
      params
    })
  },
  uploadFile(data) {
    return ajax({
      url: '/common/upload',
      method: "post",
      data
      // headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded'
      // },
      // data: qs.stringify(data)
    })
  }
}

export default {
  ...otherApi
}

```