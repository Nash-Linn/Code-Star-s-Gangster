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

export function alterPassword(data:{
  password:string
  newPassword:string
}) {
  return request({
    url: '/users/alterPassword',
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

export  function profile() {
  return request({
    url: '/auth/profile',
    method: 'get',
  })
}

export  function getUserInfo() {
  return request({
    url: '/users/getUserInfo',
    method: 'get',
  })
}

export  function updateUserInfo(data:{
  username:string
  intro?:string
}) {
  return request({
    url: '/users/updateUserInfo',
    method: 'post',
    data
  })
}


export  function updateAvatar(data:any) {
  return request({
    url: '/users/updateAvatar',
    method: 'post',
    data
  })
}

