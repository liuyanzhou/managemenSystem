import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解决导航菜单的点击报错行为
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 导入组件
import login from '@/components/login/login'
import home from '@/components/home/home'
import user from '@/components/user/user'
import rightList from '@/components/rights/rightList'
import role from '@/components/rights/role'

export default new Router({
  routes: [
      {
         path:'/', 
         component:home, 
         name:'home',
         children:[
           {path:'/user',component:user,name:'user'},
           {path:'/rightList',component: rightList,name: 'rightList'},
           {path:'/role',component: role,name: 'role'}

         ]
     },
      { path:'/login',component:login, name:'login'}
     
  ]
})
