import axios from 'axios'

const myhttpServer = {}

myhttpServer.install = function (Vue, options) {
    axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
    // 4. 添加实例方法
    Vue.prototype.$http = axios
  }

  export default myhttpServer