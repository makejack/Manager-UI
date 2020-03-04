import {
  asyncRoutesMap
} from '@/router'

function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const temp = {
      ...route
    }
    if (hasPermission(temp, roles)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, roles)
      }
      res.push(temp)
    }
  })
  return res
}

const state = {
  accessedRoutes: []
}

const getters = {
  permissionRoutes: state => state.accessedRoutes
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.accessedRoutes = routes
  }
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutesMap || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutesMap, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
