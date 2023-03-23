import request from '@/utils/request'

export function create(data:{
  username:string
  usercode:string
  password:string
}) {
  return request({
    url: '/users/create',
    method: 'post',
    data,
  })
}

export  function login(data:{
  usercode:string
  password:string
}) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export  function getUserInfo() {
  return request({
    url: '/users/getUserInfo',
    method: 'get',
  })
}

export  function refreshToken() {
  return request({
    url: '/auth/refreshToken',
    method: 'get',
  })
}