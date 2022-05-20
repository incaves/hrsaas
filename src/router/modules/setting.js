/**
 * 公司设置的路由规则
 */
import Layout from '@/layout'
export default {
  path: '/setting', // 路径
  name: 'setting',
  component: Layout, // 一级路由组件
  children: [
    {
      // 不但要显示Layout还要显示setting
      path: '', // 如果什么都不写 /setting 展示setting这个组件
      component: () => import('@/views/setting'),
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }
  ]
}

