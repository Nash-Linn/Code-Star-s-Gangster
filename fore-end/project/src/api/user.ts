import request from '@/utils/request'

export function register(data:any) {
  return request({
    url: '/users/register',
    method: 'post',
    data,
  })
}

export  function login(data:any) {
  return request({
    url: '/users/login',
    method: 'post',
    data,
  })
}