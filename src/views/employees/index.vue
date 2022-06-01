<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 自定义组件 :show-before 负责控制前面插槽的显示与隐藏 -->
      <page-tools :show-before="true">
        <!-- 前面插槽 -->
        <span slot="before">共{{ this.page.total }}条记录</span>
        <!-- 后面插槽 -->
        <template slot="after">
          <el-button size="small" type="warning">Excel导入</el-button>
          <el-button size="small" type="danger">Excel导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border v-loading="loading" :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              <!-- 格式化事件 -->
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable>
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :current-page="page.page"
            :page-size="page.size"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 新建员工的弹出层 -->
    <AddEmployee :showDialog.sync="showDialog"></AddEmployee>
  </div>
</template>
<script>
import { getEmployeeList, delEmployee } from "@/api/employees";
import EmployeeEnum from "@/api/constant/employees"; // 引入员工的枚举对象
import AddEmployee from "./components/add-employee.vue";
export default {
  name: "employees",
  data() {
    return {
      list: [], // 数据列表
      page: {
        page: 1, // 当前页
        size: 10, // 每页显示多少条
        total: 0, //总数
      },
      loading: false, // 显示遮罩层
      showDialog: false, // 新增员工的弹出层 默认关闭 false
    };
  },
  created() {
    this.getEmployeeList();
  },
  methods: {
    // 获取数据列表
    async getEmployeeList() {
      this.loading = true;
      const { total, rows } = await getEmployeeList(this.page);
      this.page.total = total; // 总数
      this.list = rows; // 数据项
      this.loading = false;
    },
    // 更新分页数据
    changePage(newPage) {
      // newPage是点击的页数
      this.page.page = newPage;
      this.getEmployeeList();
    },
    // 根据枚举的属性 来格式化内容
    // row 当前行的数据  clunmn当前列的属性(一般都是1)  cellValue单元格数据
    formatEmployment(row, column, cellValue, index) {
      // 根据枚举的属性去找1所对应的值
      const obj = EmployeeEnum.hireType.find((item) => {
        return item.id === cellValue;
      });
      return obj ? obj.value : "未知";
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm("确定删除该员工?");
        await delEmployee(id);
        this.getEmployeeList();
        this.$message.success("删除员工成功");
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    AddEmployee,
  },
};
</script>

<style></style>
