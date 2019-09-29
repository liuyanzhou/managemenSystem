// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入element组件
import ElementUI from 'element-ui'
import $http from '@/plugins/http'


// 导入css
// element的css
import './assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

// 使用
Vue.use(ElementUI)
Vue.use($http)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
