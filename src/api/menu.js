import request from '@/utils/request'

export function getMenu() {
  return request({
    url:'/api/menu',
    method: 'get',
  })
}
export function addMenu(data) {
  return request({
    url: '/api/menu/add',
    method: 'post',
    data
  })
}

export function editMenu(data) {
  return request({
    url: '/api/menu/edit',
    method: 'post',
    data
  })
}

export function delMenu(id) {
  return request({
    url: '/api/menu/del',
    method: 'post',
    data: {
      id
    }
  })
}