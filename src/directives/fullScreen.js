let imgFullScreenOff =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAdhwAAHYcBj+XxZQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANwSURBVHic7ZtNa9RAGMf/z8wT8OTqV7FgtR56EEGxfgNPItSbIoLeLCgIHtSD6NGP4S4i1IMviPhNrG210LppHg/dgWyal5nMZLdZ5ge5JDOZ+f8ym8ySCXCcgSYeJUgulBzrJQy+qImHAE43lR1o4m+aWDTx9iJImITfmWT6ghoJ+fCyCBIK4aVOQln4XkuoCF8qoS682Xb6JKEh/LQETTxqKJgfCcvzDteEZXizDZEgOaeJf1lWONEjwTH8XwavAsBCSHAMv8vglakTdCFBgR97B1P8srFM2ytfJKQEVvxUEx96ZAcAaGKpkxAsvCGABGLFrybH0xACchKo0/ABJJBW+nXu2L9QAooSOgvfVgKDL2ml3xX2H4QUYCQweCVUeKo6MJFwPiMZAThj0dcMgCrsOziU9JRF3Uo0sZTsTgGwRfU/JLiWIv1cVaDY4SnGGH9XQpcBbFk0Vnauss6HwCb8Hglu1IUHGgQAwBjjn0roCuwkFMla1AnBHgmup0g/NRVsFAB4SehqBNSxR4I1m/CApQCgtYRZCzDhN20rWAsAjiSQYA32Q3uWAlISXHUJDzgKAECi5JZDvVneA1iU3ETDk62IiwDSSr+B0G2HOrP9CQita6XfwkGCtQBW/BxCd1y75FjeH6H1smlzFVYCWPEzETxo050WdbwRwV1W/AIWEhonFKz4iQgelRzaBdDwb09+N52/K0RwjxUjzdL7mNOFiEQikUgkEolEIpFIJNJTFPih5Tu40s23fZ+2Q6xPAOAnwbftuYc3tJXg2+6JCG9oI8G3zRMT3uAqwbe9rsO7vhmCBm0C2HetNwP2NWjoWslJQIJkKSN5D8Br0UNHnMpInFe5WwuYhP8A4Kxz12bHICMZukiwEtCT8AYnCY0CehbeYC2hVkCCZDkj+Qi78N4rwhywactIqF3gXSkgd8MbWDS2o4RWK94hBkUEG0poBXYrVQZtboxIkCxp4i3L5+/UMvriPMEx3zGqnvOO6xjtP/rwCV8mIZSAsklOcAkhwhclhBBQN8MLJiFBsqyJt0OENzB4o21wl3N49z3klZ8XrUfCIoQ3tJKgF+yjKcefwwg4+mzu6yKEN1iOhB/ITfDqJPQqvKFBwlR4Q5mEXoY3VEgoDW/IS+h1eENBQm14g/l8vvfhDZMb4wgl/2v+A0ILF0chJ5oAAAAAAElFTkSuQmCC'
  
  let imgFullScreenOn =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMASURBVHic7Zu7bhNBFIa/WAmiiFuQ6KDE6RGXByDCAlGQpKPjFZCdl0CiArkwLQUFClKUJ4ihhg4q4ldI4iCZYjwo3uys53JmPGv2k0aydj1nz//vrL1zZhfgBnAATICpRxsDPdKzPzu2T84TlOabzD74BCm2nahy59kTyvkA/M98sQ1iKi4wEMp50gI2hJL6KRTHhl9CcTZAxsljYFMoKRvawEgi97XZh0V8AL4Y9p0AX4E/flq8WQfuAbcM+58AL20C2Th1DjwLyzcp28Apdtqsh0tdTHAR72RAHUxwFW80YIgSazKhm0aPE12qcx4a9pVufAE8xuxmbiOh6syfA09RmpwMgHqYYCMePA2AvE2wFQ8BBkCeJriIh0ADIC8TXMWDgAGQhwk+4qHCgLI59f2KBJZpgq94gIclfX6DKmZc3niMus+uYtF/boz7hNBjrnN1AvVa79xBzbF72M/qUpogdaxNoI/SarrMnUhxOYQM+yTENCF78ZoYJtRGvKbqOj0DOg6xtmZ9Uv7IilA1Et44xHlriCF+5luSwYBD4Dnq7BWZOsQp++4E9cv92SOv5HSZH8KnwF2H/h3mR9IZkYb9WoygMzrAK5SA98CPxP0bGhoaGhoaGhoaKoh5K7yFupUFeAd8T9x/qZRNhlzrAUkmQzEwVXJC6wFRSu7S9YBt4BNwvWRfaD3gGvCRPBZkS1lUEnOtB9SqJBajgJnDMpwVMau32ZuQonSdxIQ91HJRH/UQog11XBprox6yHgC7emO/EHDE6i6Ofiv060H58viDikDLXLEJuRwelfQZYwhmWjnNYbnK14TgJ0RyEK/xMSHIgJzEa1xN8DYgR/EaFxO8DMhZvMbWBGcD6iBeY2OCkwFD/vOHpU0ttzNfpGokmNrKiNe4mrBS4jXWJki8NDVGzR9W+qWpRW2E/SxSgjZXJza+TSTIFDWrTMW+VN4t4EIoqTtCcWy4LRTnogUcCQU7FIpjg1TOR6BeIQ95ff6ES09dJ6Q3O7ZPzv9en/8Lb68yHWGfqBQAAAAASUVORK5CYII='
  
  function fullScreenStart(el) {
    el.style.display = 'flex'
    el.__div.style.margin = 'auto 2em'
    el.__div.style.flex = '1 1 auto'
  
    el.__status = 'expand'
    el.__button.title = '取消全屏'
    el.__button.style.backgroundImage = `url(${imgFullScreenOff})`
  }
  function fullscreenExit(el) {
    el.style.display = 'inherit'
    el.__div.style.cssText = 'position:relative'
    el.__status = 'normal'
    el.__button.title = '全屏'
    el.__button.style.backgroundImage = `url(${imgFullScreenOn})`
  }
  function fullScreenSetButtonPosition(el, button) {
    let positionStr = el.dataset ? el.dataset.fullscreenIconPosition || 'right-top' : 'right-top'
  
    switch (positionStr) {
      case 'right-top':
        button.style.top = '0.5em'
        button.style.right = '0.5em'
        button.style.bottom = 'auto'
        button.style.left = 'auto'
        break
      case 'right-bottom':
        button.style.top = 'auto'
        button.style.right = '0.5em'
        button.style.bottom = '0.5em'
        button.style.left = 'auto'
        break
      case 'left-bottom':
        button.style.top = 'auto'
        button.style.right = 'auto'
        button.style.bottom = '0.5em'
        button.style.left = '0.5em'
        break
      case 'left-top':
        button.style.top = '0.5em'
        button.style.right = 'auto'
        button.style.bottom = 'auto'
        button.style.left = '0.5em'
        break
  
      default:
        break
    }
  }
  function fullScreenInit(el) {
    el.__status = 'normal'
    console.info(el.dataset)
  
    let __div = document.createElement('div')
    __div.style.position = 'relative'
  
    let button = document.createElement('div')
    button.style.position = 'absolute'
    button.style.zIndex = 100
    button.style.width = '18px'
    button.style.height = '18px'
    button.className = el.dataset.fullscreenIconClassname || ''
    fullScreenSetButtonPosition(el, button)
    button.title = '全屏'
    // button.src = imgFullScreenOn
    button.style.backgroundImage = `url(${imgFullScreenOn})`
    button.style.backgroundSize = 'contain'
    button.style.cursor = 'pointer'
  
    __div.appendChild(button)
  
    el.childNodes.forEach(item => {
      __div.appendChild(item)
    })
  
    el.appendChild(__div)
  
    el.__button = button
    el.__div = __div
  
    button.onclick = function() {
      if (el.__status === 'normal') {
        if (el.requestFullscreen) {
          el.requestFullscreen()
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen()
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen()
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen()
        } else {
          return
        }
        fullScreenStart(el)
      } else if (el.__status === 'expand') {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (el.msExitFullscreen) {
          document.msExitFullscreen()
        } else {
          return
        }
        fullscreenExit(el)
      }
    }
  }
  
  function fullScreenDestory(el) {
    el.__button.onclick = null
    el.__button = null
  
    el.__div.childNodes.forEach(item => {
      el.appendChild(item)
    })
  
    el.removeChild(el.__div)
    el.__div = null
  
    delete el.__div
  }
  
  /***
   * v-fullScreen 指令
   * 全屏指令。
   * 
   * eg:
    <div style="background-color:#fff" data-fullScreen-icon-classname="yourButClass" data-fullScreen-icon-position="right-bottom" v-fullScreen>
    </div>
   * 
   * 要点：
   * 1. 待全屏的元素要设置背景色。不然的话，全屏之后，就是黑色背景了。
   * 2. data-fullScreen-icon-classname="yourButClass" . 设置全屏按钮的class。指令中自带一个base64格式的小图标，如果你对大小，颜色，或者其他默认样式不满意的话，可以设置自己的样式来覆盖。注意要加上 !important.
   *   .yourButClass{width:2em !important;}
   * 3. data-fullScreen-icon-position="right-bottom" . 设置全屏按钮的大概位置： 四个角。
   */
  const fullScreen = {
    bind: function(el, binding, vnode) {
      fullScreenInit(el)
    },
    unbind: function(el, binding) {
      fullScreenDestory(el)
    },
    update: function(el, binding, vnode) {}
  }
  export default  fullScreen
  