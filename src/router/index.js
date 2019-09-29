import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入组件
import login from '@/components/login/login'
import home from '@/components/home/home'

export default new Router({
  routes: [
      { path:'/', component:home, name:'home' },
      { path:'/login',component:login, name:'login'}
     
  ]
})
