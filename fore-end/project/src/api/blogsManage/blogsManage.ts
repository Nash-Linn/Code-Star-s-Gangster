import request from '@/utils/request'

export function create(data:any) {
  return request({
    url: '/blogsManage/create',
    method: 'post',
    data,
  })
}


export function getList(params:any) {
  return request({
    url: '/blogsManage/getList',
    method: 'get',
    params,
  })
}