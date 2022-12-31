import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function getUser() {
  return request({
    method: 'get',
    url: '/api/user'
  })
}
export function addUser(data) {
  return request({
    method: 'post',
    url: '/api/user/add',
    data
  })
}
export function editUser(data) {
  return request({
    method: 'post',
    url: '/api/user/edit',
    data
  })
}

export function delUser(id) {
  return request({
    method: 'post',
    url: '/api/user/del',
    data: {
      id
    }
  })
}

//权限路由获取 
export function getPermission(data) {
  return request({
    method: 'post',
    url: '/api/user/permission',
    data
  })
}
