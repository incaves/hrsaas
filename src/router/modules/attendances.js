/**
 * 考勤的路由规则
 */
import Layout from '@/layout'
export default {
  path: '/attendances', // 路径
  name: 'attendances',
  component: Layout, // 一级路由组件
  children: [
    {
      // 不但要显示Layout还要显示attendances
      path: '', // 如果什么都不写 /attendances 展示 attendances这个组件
      component: () => import('@/views/attendances'),
      meta: {
        title: '考勤',
        icon: 'skill'
      }
    }
  ]
}

