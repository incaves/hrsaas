/**
 * 权限的路由规则
 */
import Layout from '@/layout'
export default {
  path: '/permission', // 路径
  name: 'permission',
  component: Layout, // 一级路由组件
  children: [
    {
      // 不但要显示Layout还要显示permission
      path: '', // 如果什么都不写 /permission 展示 permission这个组件
      component: () => import('@/views/permission'),
      meta: {
        title: '权限',
        icon: 'lock'
      }
    }
  ]
}

