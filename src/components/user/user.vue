<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24">
        <el-input placeholder="请输入内容" class="input-with-select homt-input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" class="home-table">
      <el-table-column label="#" width="100"  type="index"></el-table-column>
      <el-table-column label="姓名" width="100" prop="username"></el-table-column>
      <el-table-column label="邮箱" width="180" prop="email"></el-table-column>
      <el-table-column label="电话" width="200" prop="mobile"></el-table-column>
      <el-table-column label="创建日期" >
          <template slot-scope="list">
              {{ list.row.create_time | fmtDate }}
          </template>
      </el-table-column>
      <el-table-column label="用户状态" prop="mg_state"></el-table-column>

      <el-table-column label="操作" width="180"></el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      query: "",
      pagenum: 1,
      pagesize: 2
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      this.$http
        .get(
          `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
        )
        .then(res => {
          const {
            data,
            meta: { msg, status }
          } = res.data          
            const users = data.users

          if (status === 200) {
            //  this.list=data
            // create_time: 1486720211;
            // email: "adsfad@qq.com";
            // id: 500;
            // mg_state: true;
            // mobile: "12345678";
            // role_name: "主管";
            // username: "admin";

            this.list=users
             this.$message.success(msg)
          } else {
             this.$message.warming(msg)
          }
        });
    }
  }
};
</script>

<style>
.homt-input {
  width: 300px;
}

.home-table {
  margin-top: 20px;
}
</style>