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
import bread from './components/common/bread'
import moment from 'moment'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false

// 使用
Vue.use(ElementUI)
Vue.use($http)





// 全局过滤器
Vue.filter('fmtDate',(value)=>{
  return moment(value).format('YYYY-MM-DD hh:ss:mm')
} )

// 全局组件
Vue.component(bread.name,bread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
