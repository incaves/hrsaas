/**
 * 员工的路由规则
 */
import Layout from '@/layout'
export default {
  path: '/employees', // 路径
  name: 'employees',
  component: Layout, // 一级路由组件
  children: [
    {
      // 不但要显示Layout还要显示employees
      path: '', // 如果什么都不写 /employees 展示 employees这个组件
      component: () => import('@/views/employees'),
      meta: {
        title: '员工管理',
        icon: 'people'
      }
    }
  ]
}
