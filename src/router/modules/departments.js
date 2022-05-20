/**
 * 员工的路由规则
 */
import Layout from '@/layout'
export default {
  path: '/departments', // 路径
  name: 'departments',
  component: Layout, // 一级路由组件
  children: [
    {
      // 不但要显示Layout还要显示departments
      path: '', // 如果什么都不写 /departments 展示 departments这个组件
      component: () => import('@/views/departments'),
      meta: {
        title: '组织架构',
        icon: 'tree'
      }
    }
  ]
}

