import request from '@/utils/request'

export function create(data:any) {
  return request({
    url: '/users/create',
    method: 'post',
    data,
  })
}

export  function login(data:any) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}