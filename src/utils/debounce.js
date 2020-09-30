/**
 * 防抖函数
 * 在事件被触发delay秒后再执行回调函数，如果在这n秒内又被触发，则重新计时延迟时间
 * 可用于：1)文本输入搜索联想;2)文本输入验证
 * @author SodaZheng
 * @created 2019/09/23 09:45:27
 */
// 延迟执行函数
var debounce = function (fn, delay) {
  var timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      fn.apply(this, args)
    }, delay)
  }
}
var debounceRightNow = function (fn, delay) {
  var timeout
  var callNow
  return (...args) => {
    callNow = !timeout
    timeout = setTimeout(function () {
      timeout = null
    }, delay)
    callNow && fn.apply(this, args)
  }
}

export default {debounce, debounceRightNow}
