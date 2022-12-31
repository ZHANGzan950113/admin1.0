import request from '@/utils/request'

export function permission(token) {
  return request({
    url:'/permission',
    method: 'get',
    params: { token }
  })
}