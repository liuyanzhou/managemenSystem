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
import users from '@/components/user/user'
import rights from '@/components/rights/rightList'
import roles from '@/components/rights/role'
import goodsList from '@/components/goods/goodslist'
import goodsAdd from '@/components/goods/goodsAdd'
import goodsparams from '@/components/goods/goodsparams'
import categories from '@/components/goods/categories'
import orders from '@/components/orders/orders'
import reports from '@/components/reports/reports'

const router = new Router({
  routes: [
    {
      path: '/',
      component: home,
      name: 'home',
      children: [
        { path: '/users', component: users, name: 'users' },
        { path: '/rights', component: rights, name: 'rights' },
        { path: '/roles', component: roles, name: 'roles' },
        { path: '/goods', component: goodsList, name: 'goods' },
        { path: '/goodsAdd', component: goodsAdd, name: 'goodsAdd' },
        { path: '/params', component: goodsparams, name: 'params' },
        { path: '/categories', component: categories, name: 'categories' },
        { path: '/orders', component: orders, name: 'orders' },
        { path: '/reports', component: reports, name: 'reports' }



      ]
    },
    { path: '/login', component: login, name: 'login' }

  ]
})

router.beforeEach((to, from, next) => {

  if (to.path === '/login') {
    next()
  } else {
    // 取token
    const token = localStorage.getItem("token");
    if (!token) {
      // 没有就跳到login
      router.push({ name: "login" });
      return
    }
    next()
  }
})


export default router