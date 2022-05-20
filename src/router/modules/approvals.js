/**
 * 审批的路由规则
 */
import Layout from '@/layout'
export default {
  path: '/approvals', // 路径
  name: 'approvals',
  component: Layout, // 一级路由组件
  children: [
    {
      // 不但要显示Layout还要显示approvals
      path: '', // 如果什么都不写 /approvals 展示 approvals这个组件
      component: () => import('@/views/approvals'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }
  ]
}

