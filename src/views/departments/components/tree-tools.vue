<template>
  <!-- 插槽 有多少节点就循环多少次 -->
  <!-- data是循环的每个对象 -->
  <!-- slot-scope="{ data }" 可以删掉 在传递时定义-->
  <el-row type="flex" justify="space-between" align="middle" style="height:40px; width: 100%">
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <!-- 右侧内容 -->
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <span>操作<i class="el-icon-arrow-down" /></span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <!-- 给头部静态组件添加一个props用于区分 -->
              <!-- 传递的是true !isRoot = false 就是不显示 -->
              <el-dropdown-item v-if="!isRoot" command="edit">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <div />
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    // 传入的数据对象(插槽使用)
    treeNode: {
      type: Object,
      required: true// 比填
    },
    // 因为树形结构和头部内容一样
    // 但是头部时一个下拉 而底部是三个下拉
    isRoot: {
      type: Boolean,
      default: false // 默认为false
    }
  },
  methods: {
    // 点击编辑 删除 新增时触发(element的事件)
    operateDepts(type) {
      if (type === 'add') {
        // 添加子部门
        // 点击触发自定义事件(告诉父组件展示弹层)
        // 并把当前的部门传递 需要当前点击的部门下 添加子部门
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑子部门
      } else {
        //  删除操作
        this.$confirm('确定要删除该部门吗').then(() => {
          // 如果点击了确定就会进入then
          return delDepartments(this.treeNode.id) // 返回promise对象
        }).then(() => {
          //  如果删除成功了  就会进入这里
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>

<style>

</style>
