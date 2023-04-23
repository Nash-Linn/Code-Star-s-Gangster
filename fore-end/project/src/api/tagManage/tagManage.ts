import request from '@/utils/request'

//获取标签分类
export function tagType() {
  return request({
    url: '/tagManage/tagType',
    method: 'get',
  })
}

//获取分类下的标签
export function tag(id:number) {
  return request({
    url:`/tagManage/tag/${id}`,
    method: 'get',
  })
}
//添加标签
export function addTag(data:{ isNewType: boolean; tagType: any; tag: string }) {
  return request({
    url:`/tagManage/addTag`,
    method: 'post',
    data
  })
}
