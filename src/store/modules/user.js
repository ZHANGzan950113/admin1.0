import { getInfo, getPermission, login } from '@/api/user';
import { setToken } from '@/utils/auth';
const state = {
  token: localStorage.getItem('token'),
  name: '',
  avatar: '',
  roles: [],
  permission: [],
  btnPermission: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_AGE: (state, age) => {
    state.age = age
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_PERMISSION: (state,permission) => {
    state.permission = permission
  },
  SET_BTN_PERMISSION: (state,btnPermission) => {
    state.btnPermission = btnPermission
  },
}
const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        // 存储token
        localStorage.setItem('token', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(res => {
        if(res.code === 200) {
          const {name, age, avatar, role, id,phone}  =  res.data
          commit('SET_NAME',name)
          commit('SET_AGE',age)
          commit('SET_AVATAR',avatar)
          commit('SET_NAME',role)
          commit('SET_ROLES',role)
          commit('SET_ID',id)
          commit('SET_PHONE',phone)
          
          if(!role || role.length <= 0) {
            reject('未添加权限, 请联系管理员添加')
          }else {
            resolve(role)
          }
        }else {
          reject('无法请求个人信息')
        }
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  getPermission({commit},role) {
    return new Promise((resolve,reject) => {
      getPermission({id:role}).then(res => {
        if(res.code === 200) {

          let data = JSON.parse(JSON.stringify(res.data))
          filterMenu(data)
          commit('SET_PERMISSION',data)
          resolve(res.data)
        }
      }).catch(() => {
        reject('请求失败, 请重新登录')
      })
    })
  },

  getBtnPermission({commit}, btn) {
    commit('SET_BTN_PERMISSION',btn)
  },
  
  // 退出登录
  logout({ commit }) {
    localStorage.removeItem('token')
    commit("SET_TOKEN", null)
  },
  // reset token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      localStorage.removeItem('token')
      resolve()
    })
  }
}



function filterMenu(menu = {}) {
  menu.forEach(item => {
    if(item.children && item.children[0].meta.type !==3) {
      filterMenu(item.children)
    } else if(item.children && item.children[0].meta.type ==3) {
      delete item.children
    }
  });
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}