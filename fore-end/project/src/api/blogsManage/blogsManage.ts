import request from '@/utils/request'

export function create(data:any) {
  return request({
    url: '/blogsManage/create',
    method: 'post',
    data,
  })
}

export function update(data:any) {
  return request({
    url: '/blogsManage/update',
    method: 'post',
    data,
  })
}

export function deleteBlog(params:any) {
  return request({
    url: '/blogsManage/delete',
    method: 'get',
    params,
  })
}


export function getList(params:any) {
  return request({
    url: '/blogsManage/getList',
    method: 'get',
    params,
  })
}

export function getMyBlogList(params:any) {
  return request({
    url: '/blogsManage/getMyBlogList',
    method: 'get',
    params,
  })
}

export function getBlogDetail(id:string) {
  return request({
    url: `/blogsManage/getBlogDetail/${id}`,
    method: 'get',
  })
}



