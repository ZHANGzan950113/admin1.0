import request from '@/utils/request'

export function getRole() {
  return request({
    url:'/api/role',
    method: 'get',
  })
}
export function addRole(data) {
  return request({
    url: '/api/role/add',
    method: 'post',
    data
  })
}

export function editRole(data) {
  return request({
    url: '/api/role/edit',
    method: 'post',
    data
  })
}

export function delRole(id) {
  return request({
    url: '/api/role/del',
    method: 'post',
    data: {
      id
    }
  })
}