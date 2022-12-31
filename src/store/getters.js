
const getters = {
  roles: state => state.user.roles,
  age: state => state.user.age,
  avatar: state => state.user.avatar,
  sex: state => state.user.sex,
  token: state => state.user.token,
  permission: state => state.user.permission,
  btnPermission: state => state.user.btnPermission,

  // app
  isCollapse: state => state.app.isCollapse
}

export default getters