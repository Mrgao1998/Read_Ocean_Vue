/**
 * 节流函数
 * 规定在一个单位时间内，只能触发一次函数。如果这个函数单位时间内多次被触发，只有一次生效
 * 可用于：1)鼠标点击;2)监听滚动scroll;3)窗口resize;4)mousemove拖拽
 * @author SodaZheng
 * @created 2019/09/23 10:01:02
 */
var throttle = function (fn, delay) {
  var timeout = null
  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        fn.apply(this, args)
        clearTimeout(timeout)
        timeout = null
      }, delay)
    }
  }
}
export default throttle
