import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  // 判断有无token
  if (store.getters.token) {
    // 有token
    // 去的是登陆页
    if (to.path === '/login') {
      next('/') // 跳转到主页 没必要登陆了
    } else {
      // 随意那里都可以去
      // 如果当前Vuex有用户资料的id 表示用户已经有资料了不需要获取了(避免重复获取)
      // 这个判断是没有用户id的情况下  才去去获取用户资料
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      // // 用户没有资料 获取完用户的资料 在放行
      next()
    }
  } else {
    // 没有token
    // 判断去的是不是白名单(不被权限控制的页面)
    // whiteList.indexOf(to.path) > -1 = true
    if (whiteList.indexOf(to.path) > -1) {
      // 去的地方在白名单
      next()
    } else {
      //  既没有token 跳到登陆
      next('/login')
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})

router.afterEach((to, from, next) => {
  NProgress.done() // 关闭进度条
})
