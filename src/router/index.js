import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'

Vue.use(Router)
var router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home, redirect:'/welcome', children:[
      {path: '/welcome', component:Welcome}
    ] },
    
  ]
})
// })

// 给路由设置导航守卫
// 在守卫中对 token 进行监听,有token就让执行,否则跳转到登录页
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  // 请求 非login 就判断token
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }

  next()
})

export default router
