// 发送请求

import axios from "axios"
import {
  Message
} from 'element-ui'

const Http = {}
Http.install = function (Vue) {

  axios.defaults.baseURL = "http://47.100.13.76:8081"

  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前,会先到这里
    // console.log(config)
    if (config.url !== "user/login") {
      const AUTH_TOKEN = localStorage.getItem("token")
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN
      config.headers.Authorization = AUTH_TOKEN
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log("拦截器----");

    // console.log(response);
    const {
      message,
      code
    } = response.data;
    // 统一处理所有非200和201的响应
    if (code !== 200 && code !== 201) {
      Message.warning(message);
    }

    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  // 4. 添加实例方法
  Vue.prototype.$http = axios
}

export default Http
