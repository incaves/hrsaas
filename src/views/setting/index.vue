<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="list">
              <el-table-column
                align="center"
                label="序号"
                width="120"
                type="index"
              />
              <el-table-column
                label="角色名称"
                align="center"
                width="240"
                prop="name"
              />
              <el-table-column
                label="描述"
                align="center
              "
                prop="description"
              />
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(row.id)"
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
              <!-- 分页组件 -->
              <el-pagination
                layout="prev,pager,next"
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.name"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.companyAddress"
                />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.companyPhone"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.mailbox"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  v-model="formData.remarks"
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 编辑弹层组件 -->
    <el-dialog title="编辑弹层" :visible="showDialog" @close="btnCancel">
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyInfo,
  deleteRole,
  getRoleDetail,
  updateRole,
  addRole,
} from "@/api/setting";
import { mapGetters } from "vuex";
export default {
  name: "Setting",
  data() {
    return {
      list: [], // 数据
      page: {
        page: 1, // 当前第几页
        pagesize: 10, // 每页多少条
        total: 0, // 总数
      },
      formData: {}, // 公司信息
      showDialog: false, // 编辑弹层显示 | 隐藏
      // 专门接收新增或者编辑的编辑的表单数据
      roleForm: {
        name: "", // 角色名称
        description: "", // 角色描述
      },
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getRoleList(); // 获取角色列表
    this.getCompanyInfo();
  },
  methods: {
    async getRoleList() {
      // 接收数据
      let { total, rows } = await getRoleList(this.page);
      this.page.total = total;
      this.list = rows;
    },
    // 分页切换数据
    // newPage 参数是当前点击的页码
    changePage(newPage) {
      this.page.page = newPage; // 给到最新的page
      this.getRoleList(); // 获取最新数据
    },
    // 默认公司展示数据 根据公司id
    async getCompanyInfo() {
      let result = await getCompanyInfo(this.companyId);
      this.formData = result;
    },
    // 删除角色
    async deleteRole(id) {
      try {
        await this.$confirm("确认删除该角色?");
        // 点击了确定才能进入下方
        await deleteRole(id); // 删除角色
        this.getRoleList(); // 重新获取数据
        this.$message.success("删除角色成功");
      } catch (error) {
        console.log(error);
      }
    },
    // 点击编辑按钮
    async editRole(id) {
      let result = await getRoleDetail(id); // 读取数据
      this.roleForm = result;
      this.showDialog = true; //显示弹层
    },
    // 点击了确定
    async btnOK() {
      try {
        await this.$refs.roleForm.validate();
        // 上方返回的是一个Promise 等待校验成功 执行下方逻辑
        // roleForm 有id表示是修改数据 没有id表示新增数据
        if (this.roleForm.id) {
          await updateRole(this.roleForm); // 修改数据
        } else {
          // 新增角色
          await addRole(this.formData);
        }
        // 重新获取数据
        this.getRoleList();
        this.$message.success("修改成功");
        this.showDialog = false; // 关闭弹层
      } catch (error) {
        console.log(error);
      }
    },
    // 点击了取消
    btnCancel() {
      // 清空数据
      this.formData = {
        name: "",
        description: "",
      };
      // 移除校验
      this.$refs.roleForm.resetFields();
      this.showDialog = false;
    },
  },
  computed: {
    ...mapGetters(["companyId"]), //公司id
  },
};
</script>

<style></style>
