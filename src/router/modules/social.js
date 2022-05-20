/**
 * 社保的路由规则
 */
import Layout from '@/layout'
export default {
  path: '/social', // 路径
  name: 'social',
  component: Layout, // 一级路由组件
  children: [
    {
      // 不但要显示Layout还要显示social
      path: '', // 如果什么都不写 /social 展示 social这个组件
      component: () => import('@/views/social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }
  ]
}

