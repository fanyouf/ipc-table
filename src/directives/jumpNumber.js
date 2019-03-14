/**
 * 跳动的数值
 * 
 * 默认1秒内跳转完成。 这个时间是可以设置的：
 *   <h1 v-jumpNumber="yourTime">1000</h1>
 *   yourTime以秒为单位。
 * 
 * 由于最小步长是1，动画部分只对整数有效，你设置的总时长可能因为值过小而失效。
 * 
 * 支持的格式如下：
 * 负数
 * 百分号
 * 浮点数
 * 整数
 * 金额计数法 123,000
 *
 * eg:  
  <h1 v-jumpNumber>60.00%</h1>
  <h1 v-jumpNumber>0.00%</h1>
  <h1 v-jumpNumber="1">100</h1>
  <span v-jumpNumber>100%</span>
  <h1 v-jumpNumber="2">1000.21%</h1>
  <h1 ><span v-jumpNumber>12,000.21%</span></h1>
  <h1 v-jumpNumber>-1,21,000.21%</h1>
  <h1 v-jumpNumber>-1000.21</h1>
  <h1 v-jumpNumber>-1000a.21</h1>
 */
const jumpNumber = {
    bind: function(el, binding, vnode) {
      let step = 50
      if (!isNaN(binding.value)) {
        let totalTime = parseInt(binding.value)
        if (totalTime > 0) {
          step = (binding.value * 1000) / 20
        }
      }
      el.initNumber = function(vnode) {
        if (!vnode.children[0]) {
          return false
        }
        if (!vnode.children[0].text) {
          return false
        }
        let initText = vnode.children[0].text.trim()
        if ('' === initText) {
          return false
        }
  
        let percentPlaceHold = ''
        let fractional = ''
        let intNumber = 0
        let sign = ''
  
        let str = initText
  
        str = vnode.children[0].text.replace(/\,/g, '')
        // 多个 - 号
        if (str.replace(/[^%]/g, '').length > 1) {
          return false
        }
        if (str.replace(/[^-]/g, '').length > 1) {
          return false
        }
  
        if (str.replace(/[^.]/g, '').length > 1) {
          return false
        }
  
        if (isNaN(str.replace(/[%,]/g, ''))) {
          return false
        }
  
        if (str.indexOf('-') > -1) {
          if (str.indexOf('-') !== 0) {
            return false
          } else {
            sign = '-'
            str = str.replace('-', '')
          }
        }
  
        if (str.indexOf('%') > -1) {
          if (str.substr(-1) !== '%') {
            return false
          } else {
            percentPlaceHold = '%'
            str = str.replace('%', '')
          }
        }
        if (str.replace(/[^.]/g, '').length === 1) {
          let arr = str.split('.')
          intNumber = parseInt(arr[0])
          fractional = '.' + arr[1]
        } else {
          intNumber = parseInt(str)
        }
        // console.info(initText, intNumber, percentPlaceHold, fractional)
  
        return { intNumber, percentPlaceHold, fractional, initText, sign }
      }
  
      el.jump = function(vnode) {
        let rs = el.initNumber(vnode)
        if (!rs) {
          console.warn('jumpNumber必须是数值，而得到的是' + vnode.children[0].text)
          return false
        }
        let { intNumber, percentPlaceHold, fractional, initText, sign } = rs
        if (intNumber === 0) {
          return
        }
        el.targetData = intNumber
        el.startData = 0
        el.innerHTML = el.startData + fractional + percentPlaceHold
  
        let dt = Math.ceil((el.targetData - el.startData) / step)
        el.timerId = setInterval(function() {
          el.startData += dt
  
          if (el.startData > el.targetData) {
            el.innerHTML = initText
            clearInterval(el.timerId)
          } else {
            el.innerHTML = sign + el.startData + fractional + percentPlaceHold
          }
        }, 20)
      }
      el.jump(vnode)
    },
    unbind: function(el, binding) {
      if (el.timerId) {
        clearInterval(el.timerId)
      }
      el.initNumber = null
      el.jump = null
    },
    update: function(el, binding, vnode) {
      if (el.timerId) {
        clearInterval(el.timerId)
      }
      el.jump(vnode)
    }
  }

  export default jumpNumber;