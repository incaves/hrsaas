<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form
      :model="formData"
      :rules="rules"
      label-width="120px"
      ref="addEmployee"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <!-- 遍历只能遍历组件的数据 -->
          <el-option
            v-for="item in Emplpyees.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="getDepartments"
        />
        <!-- 树形 -->
        <el-tree
          :data="treeData"
          :props="{ label: 'name' }"
          default-expand-all
          v-loading="loading"
          v-if="showTree"
          @node-click="selectNode"
        ></el-tree>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
// 组织架构树形数据
import { getDepartments } from "@/api/departments";
import { addEmployee } from "@/api/employees";
// 转换成树形的
import { tranListToTreeData } from "@/utils";
// 可枚举的属性(正式或不正式展示到页面上)
import Emplpyees from "@/api/constant/employees";
export default {
  name: "AddEmployee",
  props: {
    showDialog: {
      type: Boolean,
      default: false, // 默认
    },
  },
  data() {
    return {
      // 数据
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      //   表单检验
      rules: {
        username: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "用户姓名为1-4位",
          },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        timeOfEntry: [{ required: true, message: "入职时间", trigger: "blur" }],
      },
      treeData: [], //接收树形结构
      showTree: false, // 默认不显示树形数据
      loading: false, // 进度条
      Emplpyees: Emplpyees, // 正式 或 不正式 下拉
    };
  },
  methods: {
    // 员工的部门表单应该是个树形 el-tree 需要树形
    async getDepartments() {
      this.showTree = true;
      this.loading = true;
      const { depts } = await getDepartments();
      this.treeData = tranListToTreeData(depts, ""); // 转换成树形
      this.loading = false;
    },
    // 点击树形的某个选项 赋值到表单上
    // node 是点击的某个项
    selectNode(node) {
      this.formData.departmentName = node.name;
      this.showTree = false; // 关闭树形
    },
    // 点击了确定
    async btnOk() {
      try {
        await this.$refs.addEmployee.validate();
        // 校验成功才能进入下方
        await addEmployee(this.formData); // 新增员工
        // $parent 是父组件的实例(this)
        this.$parent.getEmployeeList(); // 更新数据
        this.$parent.showDialog = false; // 关闭弹层
        this.$message.success("添加成功");
      } catch (error) {
        console.log(error);
      }
    },
    // 点击了取消(右上角按钮)
    btnCancel() {
      // 重置原来的数据
      this.formData = {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      };
      this.$refs.addEmployee.resetFields(); // 重置校验结果
      // 常规方式($parent也可以)
      this.$emit("update:showDialog", false); //修改成false
      // update:showDialog 这样写的话(父组件需要使用sync修饰符)
    },
  },
};
</script>

<style></style>
