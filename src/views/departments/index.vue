<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 组织架构头部 -->
        <!-- 给头部静态组件添加一个props用于区分 -->
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 树形组件 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 通过插槽结构出数据 通过props属性把数据传递给子组件-->
          <!-- 删除部门的自定义事件 直接出发 获取数据的事件-->
          <TreeTools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" />
        </el-tree>
      </el-card>
    </div>
    <!-- 新增部门的弹层 并接收-->
    <AddDept :show-dialog="showDialog" />

  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept'
export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name'
      },
      // 组织架构头部需要的静态内容(接口传递)
      company: {},
      showDialog: false, // 默认不显示新增部门的弹窗
      node: null// 记录当前点击新增部门 是那个部门要添加
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获取数据
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人' } // 公司名称
      this.departs = tranListToTreeData(result.depts, '') // 需要转化树形结构
    },
    // 添加子部门的自定义事件
    addDepts(node) {
      this.showDialog = true // 弹出层
      this.node = node // 当前点击的部门
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
