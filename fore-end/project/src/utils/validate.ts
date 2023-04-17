/**
 * @description 判断是否是数组
 * @param arg
 */
export function isArray(arg:any) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @description 判断是否为空
 * @param value
 * @returns {boolean}
 */
export function isBlank(value:any) {
  return (
    value === null ||
    false ||
    value === '' ||
    value.trim() === '' ||
    value.toLocaleLowerCase().trim() === 'null'
  )
}

/**
 * @description 判断是否为空
 * @param value
 * @returns {boolean}
 */
export function isEmpty(any:any) {
  if (any) {
    if (any instanceof Array) {
      return any.length == 0
    }
    if (any instanceof Object) {
      return Object.keys(any).length == 0
    }
    return false
  }

  return true
}