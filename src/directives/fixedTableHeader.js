
const fixedTableHeader = {
    // 初始化指令
    bind(el, binding, vnode) {
      let tableRef = binding.value // el.draggable="true"
      if (el.style.height !== '') {
        return
      }
  
      setTimeout(() => {
        let headerRef = el.querySelector('.el-table__header-wrapper')
        let table__fixed = el.querySelector('.el-table__fixed')
        if(table__fixed){
          // TODO: 有固定列和多级表头时，不知如何处理。
          return
        }
        let headerFixedRef = el.querySelector('.el-table__fixed-header-wrapper')
  
        if (headerRef) {
          el.__handlerScroll__ = function(e) {
            let { top } = el.getBoundingClientRect()
            if (top < 0) {
              Object.assign(headerRef.style, { position: 'fixed', top: 0, zIndex: 1 })
              headerFixedRef && Object.assign(headerFixedRef.style, { position: 'fixed', top: 0, zIndex: 1 })
            } else {
              Object.assign(headerRef.style, { position: 'static', top: 0, zIndex: 'auto' })
              headerFixedRef && Object.assign(headerFixedRef.style, { position: 'static', top: 0, zIndex: 'auto' })
            }
          }
          document.addEventListener('scroll', el.__handlerScroll__)
        }
      })
    },
    update() {},
    unbind(el, binding) {
      // 解除事件监听
      document.removeEventListener('scroll', el.__handlerScroll__)
      delete el.__handlerScroll__
    }
  }

  export default fixedTableHeader