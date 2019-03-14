const drag = {
    currentNode: null,
  
    bind: (el, binding, vnode) => {
      el.handleDragStart = function(e) {
        e.target.classList.add('dragging')
        e.dataTransfer.effectAllowed = 'move'
        // Need to set to something or else drag doesn't start
        e.dataTransfer.setData('text', '*')
        vnode.context.$emit('dragStart')
        drag.currentNode = e.target
        console.info('handleDragStart', e.target.dataset.order)
      }
  
      el.handleDragOver = function(e) {
        if (e.preventDefault) {
          // allows dropping
          e.preventDefault()
        }
  
        e.dataTransfer.dropEffect = 'move'
        e.target.classList.add('drag-over')
        vnode.context.$emit('drag-over')
  
        return false
      }.bind(this)
  
      el.handleDragEnter = function(e) {
        vnode.context.$emit('drag-enter')
        e.target.classList.add('drag-enter')
      }.bind(this)
  
      el.handleDragLeave = function(e) {
        console.info('drag-leave', e.target, el)
        vnode.context.$emit('drag-leave')
        e.target.classList.remove('drag-enter', 'drag-over')
      }.bind(this)
  
      el.handleDrag = function() {
        vnode.context.$emit('drag')
      }.bind(this)
  
      el.handleDragEnd = function(e) {
        console.info('handleDragEnd', e.target, el)
        e.target.classList.remove('dragging', 'drag-over', 'drag-enter')
        // vnode.context.$emit('drag-end');
      }.bind(this)
  
      el.handleDrop = function(e) {
        e.preventDefault()
        if (e.stopPropagation) {
          // stops the browser from redirecting.
          e.stopPropagation()
        }
  
        // if(drag.currentNode.dataset.order > -1 && e.target.dataset.order > -1){
        //   [e.target.style.order,drag.currentNode.style.order] = [drag.currentNode.style.order,e.target.style.order]
        // }
  
        //console.info("handleDrop",vnode.context)
        e.target.classList.remove('dragging', 'drag-over', 'drag-enter')
  
        // Don't do anything if dropping the same column we're dragging.
        // vnode.context.$emit('drop',{start:drag.currentNode.dataset.order, end:e.target.dataset.order});
  
        binding.value(drag.currentNode.dataset.order, e.target.dataset.order)
  
        return false
      }.bind(drag)
  
      // setup the listeners
      el.setAttribute('draggable', 'true')
      el.addEventListener('dragstart', el.handleDragStart, false)
      el.addEventListener('dragenter', el.handleDragEnter, false)
      el.addEventListener('dragover', el.handleDragOver, false)
      el.addEventListener('drag', el.handleDrag, false)
      el.addEventListener('dragleave', el.handleDragLeave, false)
      el.addEventListener('dragend', el.handleDragEnd, false)
      el.addEventListener('drop', el.handleDrop, false)
    },
    unbind: function(el) {
      // shut er' down
      el.classList.remove('dragging', 'drag-over', 'drag-enter')
      el.removeAttribute('draggable')
      el.removeEventListener('dragstart', el.handleDragStart)
      el.removeEventListener('dragenter', el.handleDragEnter)
      el.removeEventListener('dragover', el.handleDragOver)
      el.removeEventListener('dragleave', el.handleDragLeave)
      el.removeEventListener('drag', el.handleDrag)
  
      delete el.handleDragStart
      delete el.handleDragEnter
      delete el.handleDragOver
      delete el.handleDragLeave
      delete el.handleDrag
    }
  }

  export default drag