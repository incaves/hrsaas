/**
 * 工资的路由规则
 */
import Layout from '@/layout'
export default {
  path: '/salarys', // 路径
  name: 'salarys',
  component: Layout, // 一级路由组件
  children: [
    {
      // 不但要显示Layout还要显示salarys
      path: '', // 如果什么都不写 /salarys 展示 salarys这个组件
      component: () => import('@/views/salarys'),
      meta: {
        title: '工资',
        icon: 'money'
      }
    }
  ]
}

