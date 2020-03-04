import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  nprogress.start()
  const token = store.getters['user/getToken']
  if (token) {
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    } else {
      const userInfo = store.getters['user/getUser']
      if (!userInfo) {
        store.dispatch('user/get_UserInfo').then((res) => {
          const roles = res.data.data.roles
          store.dispatch('permission/generateRoutes', roles).then(routes => {
            router.addRoutes(routes)
            next({
              ...to,
              replace: true
            })
          }).catch(() => {})
        }).catch(() => {
          store.dispatch('user/remove_Token')
          next('/login')
        })
      } else {
        next()
      }
    }
  } else {
    // 免登录白名单,直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})
