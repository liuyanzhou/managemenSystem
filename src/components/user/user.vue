<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑 -->
      <mybread leavel1="用户管理" leavel2="用户列表"></mybread> 
    </div>

    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24">
        <el-input
          clearable
          placeholder="请输入内容"
          class="input-with-select homt-input"
          v-model="inputVal"
          @clear="clearTogetData"
        >
          <el-button slot="append" icon="el-icon-search" @click="Searchuser"></el-button>
        </el-input>
        <el-button type="success" plain @click="Adduser">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" class="home-table">
      <el-table-column label="#" width="100" type="index"></el-table-column>
      <el-table-column label="姓名" width="100" prop="username"></el-table-column>
      <el-table-column label="邮箱" width="180" prop="email"></el-table-column>
      <el-table-column label="电话" width="200" prop="mobile"></el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="list">{{ list.row.create_time | fmtDate }}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="150">
        <el-switch
          slot-scope="scope"
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="handleStatus(scope.row)"
        ></el-switch>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            @click="showEditUser(scope.row.id)"
            circle
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteUser(scope.row.id)"
          ></el-button>
          <el-button
           size="mini" 
           plain type="success" 
           icon="el-icon-check" 
           @click="editRol(scope.row.id)"
           circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      :current-page="pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <!-- 添加用户 -->

    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户 -->

    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleEditRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{currentRolUsername}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="currentRol" >
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option
             v-for="(item,i) in roleList" 
             :key="i"  
             :label="item.roleName" 
             :value="item.id">
             </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEditRol = false">取 消</el-button>
        <el-button type="primary" @click="roleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { async } from "q";
export default {
  data() {
    return {
      // 获取搜索框的内容
      inputVal: "",
      // 获取表格数据
      list: [],
      // 设置发送获取用户信息的值
      query: "",
      // 这是设置获取用户数据的页数
      pagenum: 1,
      // 这是设置获取一页页数展示的数量的个数的默认值
      pagesize: 2,
      // 这是设置获取到用户总共数据的默认值
      total: -1,
      // 这是添加用户的对话框的信息
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 设置打开添加用户的对话框默认不打开
      dialogFormVisibleAdd: false,
      // 设置打开编辑用户的对话框默认不打开
      dialogFormVisibleEdit: false,
      // 设置编辑的时候获取到的当前用户的默认id值
      currentId: -1,
      // 设置打开分配角色的对话框默认不打开
      dialogFormVisibleEditRol: false,
      // 设置分配角色的el-select 中的v-model
      currentRol: -1,
      // 设置角色编辑的名字
      currentRolUsername:'',
      // 角色的列表
      roleList:[]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取用户的数据
    getList() {
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      this.$http
        .get(
          `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
        )
        .then(res => {
          const {
            data,
            meta: { msg, status }
          } = res.data;
          const { users, total } = data;
          if (status === 200) {
            //  this.list=data
            // create_time: 1486720211;
            // email: "adsfad@qq.com";
            // id: 500;
            // mg_state: true;
            // mobile: "12345678";
            // role_name: "主管";
            // username: "admin";

            // 在这里我将存取用户所有信息的数据交给list让它去渲染用户界面的信息
            this.list = users;
            this.total = total;
            // this.$message.success(msg);
          } else {
            this.$message.warning(msg);
          }
        });
    },
    // 点击分页处理逻辑的函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.pagenum = 1;
      this.getList();
    },
    // 设置当前页的函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getList();
    },
    // 点击搜索按钮搜索数据的函数
    Searchuser() {
      this.query = this.inputVal;
      this.getList();
    },
    // 点击搜索框x的字体图标的函数
    clearTogetData() {
      this.query = "";
      this.getList();
    },
    // 点击添加用户按钮显示对话框的处理函数
    Adduser() {
      // 点开的时候先清除所有的this.form的信息(因为先点编辑在点添加的时候 this.form 里面会有点击编辑的时候存在的数据)
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = "";
        }
      }

      this.dialogFormVisibleAdd = true;
    },
    // 添加用户里面的确定按钮 发送添加
    sureAdd() {
      this.dialogFormVisibleAdd = false;
      this.$http.post("users", this.form).then(res => {
        // console.log(res)
        const {
          meta: { msg, status }
        } = res.data;

        if (status === 201) {
          this.getList();
          this.$message.success(msg);
        } else {
          this.$message.warning(msg);
        }

        // 将添加用户的对话框的信息清空
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = "";
          }
        }
      });
    },
    // 删除用户处理函数
    deleteUser(id) {
      this.$confirm("确定删除改用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${id}`);
          const {
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.pagenum = 1;
            this.getList();
            this.$message({
              type: "success",
              message: "删除成功"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点开编辑按钮 - 显示
    async showEditUser(id) {
      this.dialogFormVisibleEdit = true;
      this.currentId = id;

      const res = await this.$http.get(`users/${id}`);
      this.form = res.data.data;
    },
    // 编辑 - 修改
    async editUser() {
      const res = await this.$http.put(`users/${this.currentId}`, this.form);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success("更新成功!");
        this.dialogFormVisibleEdit = false;
      }
    },
    // 改变用户状态
    async handleStatus(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success("用户状态成功!");
      }
    },
    // 显示分配角色的页面
    async editRol(id){
      this.dialogFormVisibleEditRol = true

      //获取角色数据
      const res = await this.$http.get('roles')
      this.roleList = res.data.data
      const res1 = await this.$http.get(`users/${id}`)
      this.currentRol = res1.data.data.rid
      this.currentRolUsername= res1.data.data.username
     this.currentRolId = res1.data.data.id


    },
    // 编辑角色数据
    async roleEdit(){
       const res = await this.$http.put(`users/${this.currentRolId}/role`,{
         rid:this.currentRol
       })
       const {meta:{msg,status}} = res.data
       if(status===200) {
         this.$message.success('角色权限更新成功!')
         this.dialogFormVisibleEditRol =false
       } 
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