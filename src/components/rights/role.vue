<template>
  <el-card>
    <!-- 面包屑 -->
    <mybread leavel1="权限管理" leavel2="角色列表"></mybread>

    <!-- 添加用户 -->
    <el-button type="success" plain class="role-btn">添加用户</el-button>
    <!-- 列表 -->
    <el-table :data="list" style="width: 100%" class="home-table">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag closable @close="handleRol(scope.row,item1.id)">{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>

            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    closable
                    type="success"
                    @close="handleRol(scope.row,item2.id)"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    type="warning"
                    closable
                    v-for="(item3,i) in item2.children"
                    :key="i"
                    @close="handleRol(scope.row,item3.id)"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <!-- 当角色没有被分配到权限的时候显示 -->
          <el-row v-if="scope.row.children.length == '0'">
            <el-col :span="24">未分配权限</el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column label="#" width="100" type="index"></el-table-column>

      <el-table-column label="角色名称" width="180" prop="roleName"></el-table-column>

      <el-table-column label="角色描述" width="180" prop="roleDesc"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="showEditRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 设置角色的权限的模版 -->

    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleEditRole">
      <div slot="footer" class="dialog-footer">
        <!-- 角色权限节点 -->
        <!-- data => 绑定的是展示的数据
        show-checkbox => 是否显示选择框
        default-expand-all => 展示所有的树节点
        node-key="id" => 绑定每个树节点的唯一的id-->

        <el-tree
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          :default-checked-keys="arrRole"
          ref="tree"
          highlight-current
          :props="defaultProps"
        ></el-tree>

        <el-button @click="dialogFormVisibleEditRole = false">取 消</el-button>
        <el-button type="primary" @click="ToEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 存放角色列表的数据的数组
      list: [],
      dialogFormVisibleEditRole: false,
      // 数节点的数据
      data: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      // 当点击角色修改按钮时获取到的改角色有多少的权限的id存放的数组
      arrRole: [],
      // 记录当前的角色id
      currentRolId: -1
    };
  },
  created() {
    this.getRolList();
  },
  methods: {
    // 获取权限列表的数据
    async getRolList() {
      const res = await this.$http.get("roles");
      /* this,list 有以下属性
                children: (5) [{…}, {…}, {…}, {…}, {…}]
                id: 30
                roleDesc: "技术负责人"
                roleName: "主管" */

      this.list = res.data.data;
      // console.log(res);
    },
    // 根据角色id获取到角色对应的权限的数据
    async handleRol(role, rightId) {
      // authName: "商品管理";
      // children: Array(3);
      // id: 101;
      // path: "goods";
      // roles/:roleId/rights/:rightId
      // console.log(roleId,rightId)
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);

      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        // 重新更新数据
        role.children = res.data.data;
      }
    },
    async showEditRole(user) {
      var arr = [];
      // 记录没人角色的id
      this.currentRolId = user.id;
      // 遍历user其中的id为一个数组 为了去实现点击打开对话框就显示打√
      user.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            arr.push(item3.id);
          });
        });
      });

      this.arrRole = arr;
      const res = await this.$http.get("rights/tree");
      this.data = res.data.data;
      this.dialogFormVisibleEditRole = true;
    },
    // 添加角色权限
    async ToEdit() {

      // roles/:roleId/rights
      //   const arr1= this.$refs.tree.getCheckedKeys()
      //   const arr2= this.$refs.tree.getHalfCheckedKeys()
      //   const arr3 = [...arr1, ...arr2]
      // const res = await this.$http.post(`roles/${this.currentRolId}/rights`,{
      //   rids:arr3.join(',')
      // })

      // 获取被选这个权限的id
      let checkedKeys = this.$refs.tree.getCheckedKeys();
      // 获取半选中权限的节点的id
      let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      let newArray = [...checkedKeys, ...halfCheckedKeys];
      // console.log(newArray)
      const res = await this.$http.post(`roles/${this.currentRolId}/rights`, {
        rids: newArray.join(",")
      });

      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.dialogFormVisibleEditRole = false;
        this.getRolList();
        this.$message.success(msg)
      }


    }
  }
};
</script>

<style>
.role-btn {
  margin-top: 20px;
}
</style>