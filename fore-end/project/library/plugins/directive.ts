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



  // 监听元素大小变化的指令
    const map = new WeakMap()
    const ob = new ResizeObserver((entries) => {
        for (const entry of entries) {
            // 获取dom元素的回调
            const handler = map.get(entry.target)
            //存在回调函数
            if (handler) {
                // 将监听的值给回调函数
                handler({
                    width: entry.borderBoxSize[0].inlineSize,
                    height: entry.borderBoxSize[0].blockSize
                })
            }
        }
    })

    const Resize = {
        mounted(el:any, binding:any) {
            //将dom与回调的关系塞入map
            map.set(el, binding.value)
            //监听el元素的变化
            ob.observe(el)
        },
        unmounted(el:any) {
            //取消监听
            ob.unobserve(el)
        }
    }

    app.directive('dom-resize',Resize);
}
