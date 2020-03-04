import http from '@/utils/http'

const SessionTokenName = 'token'
const SessionRefreshTokenName = 'refresh'

const state = {
  accessToken: sessionStorage.getItem(SessionTokenName) ? sessionStorage.getItem(SessionTokenName) : null,
  refreshToken: sessionStorage.getItem(SessionRefreshTokenName) ? sessionStorage.getItem(SessionRefreshTokenName) : null,
  userInfo: null
}

const getters = {
  getUser: state => state.userInfo,
  getToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken
}

const mutations = {
  SET_TOKEN(state, data) {
    state.accessToken = data.token
    state.refreshToken = data.refreshToken
  },
  REMOVE_TOKEN(state) {
    state.accessToken = null
    state.refreshToken = null
    state.userInfo = null
  },
  SET_USERINFO(state, data) {
    state.userInfo = data
  }
}

const actions = {
  refresh_Token({
    commit,
    state
  }) {
    const refreshToken = state.refreshToken
    const token = state.accessToken
    http.post('auth/RefreshToken', {
      token,
      refreshToken
    }).then(res => {
      commit('SET_TOKEN', res.data.data)
    }).catch(() => {
      commit('REMOVE_TOKEN')
    })
  },
  remove_Token({
    commit
  }) {
    sessionStorage.removeItem(SessionTokenName)
    sessionStorage.removeItem(SessionRefreshTokenName)
    commit('REMOVE_TOKEN')
  },
  get_UserInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      http.get('admin/GetAdminInfo').then(res => {
        if (res.data.code === 200) {
          const userInfo = res.data.data
          commit('SET_USERINFO', userInfo)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  signIn({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      http
        .post('auth/Login', data)
        .then(res => {
          const body = res.data
          if (body.code === 200) {
            const accessToken = body.data
            sessionStorage.setItem(SessionTokenName, accessToken.token)
            sessionStorage.setItem(SessionRefreshTokenName, accessToken.refreshToken)
            commit('SET_TOKEN', accessToken)
          }
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      http.get('/auth/logout').then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
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
