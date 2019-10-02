import axios from 'axios'

const myhttpServer = {}

myhttpServer.install = function (Vue, options) {
  // 设置请求的url的前面标识
  axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"

  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    
    // 判断该请求是不是login  注意: config.url 对应的是除了baseURL 的请求路径的值
    if(config.url !=='login'){
      const AUTH_TOKEN = localStorage.getItem("token");
      config.headers["Authorization"] = AUTH_TOKEN;
    }
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });





  // 4. 添加实例方法
  Vue.prototype.$http = axios
}

export default myhttpServer