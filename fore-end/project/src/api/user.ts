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
    showBackError:true
  })
}

export  function getUserInfo() {
  return request({
    url: '/auth/profile',
    method: 'get',
  })
}

