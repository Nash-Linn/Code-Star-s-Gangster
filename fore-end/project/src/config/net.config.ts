const baseURL:string =  evnFunc()
// 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
const contentType = 'application/json;charset=UTF-8'
// 最长请求时间
const requestTimeout = 20000
// 操作正常code，支持String、Array、int多种类型
const successCode = [200, 0, '200', '0']
// 数据状态的字段名称
const statusName = 'code'
// 状态信息的字段名称
const messageName = 'msg'

function evnFunc():string {
  const evn:string = 'dev'
  let baseUrl:string
  switch (evn) {
    case 'dev':
        baseUrl = 'http://localhost:8080/' 
      break
    case 'produce':
      baseUrl = 'http://101.34.111.220:8080/' 
      break
    default:
      baseUrl = 'http://localhost:8080/' 
      break
  }
  return baseUrl
}



export {
  baseURL,
  contentType,
  requestTimeout,
  successCode,
  statusName,
  messageName,
}