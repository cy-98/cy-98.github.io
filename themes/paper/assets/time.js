function countTime(second) {
  let y = null
  let d = null
  let h = null
  let m = null
  let s = null

  var leftTime = second;
  //定义变量 d,h,m,s保存倒计时的时间
  if (leftTime >= 0) {
    y = Math.floor(leftTime / 60 / 60 / 24 / 36);
    d = Math.floor(leftTime / 60 / 60 / 24);
    h = Math.floor(leftTime / 60 / 60 % 24);
    m = Math.floor(leftTime / 60 % 60);
    s = Math.floor(leftTime % 60);
  }
  return { y, d, h, m, s }
}

function timeFmt(value) {
  if (value.y) return [-value.y, 'year']
  if (value.d) return [-value.d, 'day']
  if (value.h) return [-value.h, 'hour']
  if (value.s) return [-value.s, 'second']
  return [0, 'second']
}

const a = document.querySelectorAll('time[data-type=""create_timestamp]')
console.log(a);