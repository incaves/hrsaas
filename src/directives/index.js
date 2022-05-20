// 处理头像失效的问题
export const imageerror = {
  // 指令对象
  // 会在当前的DOM元素插入搭配节点之后执行
  inserted(dom, options) {
    // dom 表示当前指令的DOM对象 <img />
    // 当图片有地址 但是地址没有加载成功的时候
    // 会报错 会触发图片一个事件 = onerror() - 加载图片错误时触发
    // options 传入的变量 v-imagerror="图片的变量地址" data(){img:'a.png'} = option.value
    dom.onerror = function() {
      // 如果触发这个事件 给他一个默认的图片
      dom.src = options.value
    }
  }
}
