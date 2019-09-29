import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入组件
import login from '@/components/login/login'
import home from '@/components/home/home'
import user from '@/components/user/user'

export default new Router({
  routes: [
      {
         path:'/', 
         component:home, 
         name:'home',
         children:[
           {path:'user',component:user,name:'user'}
         ]
     },
      { path:'/login',component:login, name:'login'}
     
  ]
})
