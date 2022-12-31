
const state = {
  isCollapse: false
}
const mutations = {
  TOGGLE_SIDEBAR:(state) => {
    state.isCollapse = !state.isCollapse
    console.log(state.isCollapse)
  }
}
const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}