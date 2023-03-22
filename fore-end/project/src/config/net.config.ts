export default{
  baseURL: evnFunc(),
  // 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  // 最长请求时间
  requestTimeout: 20000,
  // 操作正常code，支持String、Array、int多种类型
  successCode: [200, 0, '200', '0'],
  // 数据状态的字段名称
  statusName: 'code',
  // 状态信息的字段名称
  messageName: 'msg',
}

function evnFunc() {
  const evn:string = 'dev'
  let baseUrl
  switch (evn) {
    case 'dev':
        baseUrl = 'http://localhost:8080/' 
      break
    case 'produce':
      break

  }
  return baseUrl
}