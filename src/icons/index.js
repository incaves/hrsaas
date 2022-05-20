import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 注册全部SvgIcon组件
Vue.component('svg-icon', SvgIcon)
// 将所有svg目录下所有的.svg后缀全都引入到项目中
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
