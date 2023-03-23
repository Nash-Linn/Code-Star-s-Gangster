import { useUserStore } from '@/stores/modules/user'
import axios from 'axios'
import {
  baseURL,
  contentType,
  messageName,
  requestTimeout,
  statusName,
  successCode,
} from '@/config/index'
import qs from 'qs'
import { isArray } from '@/utils/validate'
import { refreshToken } from '@/api/user'


// 操作正常Code数组
const codeVerificationArray = isArray(successCode)
  ? [...successCode]
  : [...[successCode]]

interface CODE_MESSAGE {
  [propName:number]:string
}

const CODE_MESSAGE:CODE_MESSAGE = {
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '令牌过期',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}

/**
 * 刷新刷新令牌
 * @param config 过期请求配置
 * @returns {any} 返回结果
 */
let refreshToking = false
let requests:Function[] = []

const tryRefreshToken = async (config:any) => {
  if (!refreshToking) {
    refreshToking = true
    try {
      const {
        data: { token },
      } = await refreshToken()
      if (token) {
        const { setToken } = useUserStore()
        setToken(token)
        // 已经刷新了token，将所有队列中的请求进行重试
        requests.forEach((cb) => cb(token))
        requests = []
        return instance(requestConf(config))
      }
    } catch (error) {
      console.error('refreshToken error =>', error)
    } finally {
      refreshToking = false
    }
  } else {
    return new Promise((resolve) => {
      // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
      requests.push(() => {
        resolve(instance(requestConf(config)))
      })
    })
  }
}



/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

/**
 * axios请求拦截器配置
 * @param config
 * @returns {any}
 */
const requestConf = (config:any) => {
  const userStore = useUserStore()
  const { token } = userStore
 
  if (token) config.headers['Authorization'] = `Bearer ${token}`

  if (
    config.data &&
    config.headers['Content-Type'] ===
      'application/x-www-form-urlencoded;charset=UTF-8'
  ){
    config.data = qs.stringify(config.data)
  }
  return config
}
/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(requestConf, (error) => {
  return Promise.reject(error)
})


/**
 * axios响应拦截器
 * @param config 请求配置
 * @param data response数据
 * @param status HTTP status
 * @param statusText HTTP status text
 * @returns {Promise<*|*>}
 */

interface HandleDataConf{
  config:any
  data:any
  status:any
  statusText:any
}

const handleData = async ({ config, data, status, statusText }:HandleDataConf) => {
  // 若data.code存在，覆盖默认code
  let code:number = data && data[statusName] ? data[statusName] : status
  // 若code属于操作正常code，则status修改为200
  if (codeVerificationArray.indexOf(data[statusName]) + 1) code = 200
  switch (code) {
    case 200:
      return data
    case 401:
      return await tryRefreshToken(config)
    case 402:
      break
    case 403:
      break
  }
  // 异常处理
  // 若data.msg存在，覆盖默认提醒消息
  const errMsg = `${
    data && data[messageName]
      ? data[messageName]
      : CODE_MESSAGE[code]
      ? CODE_MESSAGE[code]
      : statusText
  }`
  //可写错误弹窗等
  return Promise.reject(data)
}

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => handleData(response),
  (error) => {
    const { response } = error
    if (response === undefined) {
      return {}
    } else return handleData(response)
  }
)

export default instance