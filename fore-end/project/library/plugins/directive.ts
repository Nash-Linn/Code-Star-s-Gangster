export default function setup(app) {
  const clickOutside = {
    // 初始化指令
    bind(el, binding, vnode) {
      function clickHandler(e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
          return false
        }
        // 判断指令中是否绑定了函数
        if (binding.expression) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
          // binding.value(e);
          // 这里进行了修改， 使用arg 传递函数名称， 使用value 传递 变量值
          // console.log("接收到 的arg为: " + funcName)
          // console.log("接收到的 value 为: " +  binding.value)

          const that = vnode.context
          that[binding.arg](binding.value)
        }
      }
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.__vueClickOutside__ = clickHandler
      document.addEventListener('click', clickHandler)
    },
    update() {},
    unbind(el, binding) {
      // 解除事件监听
      document.removeEventListener('click', el.__vueClickOutside__)
      delete el.__vueClickOutside__
    }
  }

  app.directive('click-outside', clickOutside)
}
