export  function setup(app:any) {
    //点击元素外部
  const vClickOutside = {
    mounted(el:any, binding:any) {
        function eventHandler(e:any) {
            if (el.contains(e.target)) {
                return false
            }
            // 如果绑定的参数是函数，正常情况也应该是函数，执行
            if (binding.value && typeof binding.value === 'function') {
                binding.value(e)
            }
        }
        // 用于销毁前注销事件监听
        el.__click_outside__ = eventHandler
        // 添加事件监听
        document.addEventListener('click', eventHandler)
    },
    beforeUnmount(el:any) {
        // 移除事件监听
        document.removeEventListener('click', el.__click_outside__)
        // 删除无用属性
        delete el.__click_outside__
    }
  }

  app.directive('click-outside', vClickOutside)



  //滚动到底加载更多
  const dropDownLoadmore = {
    mounted(el:any, binding:any) {
        const SELECTWRAP_DOM = el;
        SELECTWRAP_DOM.addEventListener('scroll', function() {
            const condition =
            SELECTWRAP_DOM.scrollHeight - SELECTWRAP_DOM.scrollTop <= SELECTWRAP_DOM.clientHeight + 1 ;
            if (condition) {
                binding.value();
            }
        });
    }
   }
  app.directive('drop-down-loadmore',dropDownLoadmore);

}
