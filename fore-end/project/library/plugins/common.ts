import mitt from 'mitt'
import _ from 'lodash'

export function setup(app:any){

  const _emitter = mitt()
  const $pub = (...args:any[]) => {
    _emitter.emit(_.head(args), args[1])
  }
  app.provide('$pub', $pub)
  
  const $sub = function () {
    Reflect.apply(_emitter.on, _emitter, _.toArray(arguments))
  }
  app.provide('$sub', $sub)
  
  app.provide('$unsub', function () {
    Reflect.apply(_emitter.off, _emitter, _.toArray(arguments))
  })
}