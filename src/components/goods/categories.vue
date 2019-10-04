<template>
<el-card class="card-box">
  <mybread leavel1='商品管理' leavel2='商品分类'></mybread>
  <el-row class="row-add">
        <el-col :span="24">
          <el-button @click="handleShowAddDialog" type="success" plain>添加分类</el-button>
        </el-col>
  </el-row>
  <!-- 表格 -->
  <el-table
      height="450px"
      :data="list"
      style="width: 100%">

      <!-- <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column> -->
      <!--
        treeKey 绑定到id 给每个节点设置一个唯一值
        parentKey 绑定到父id属性 区分父子节点
        levelKey 绑定到层级的属性
        childKey 绑定到储存子元素的属性
       -->
      <!-- <el-tree-grid
      prop="cat_name"
      label="分类名称"
      treeKey="cat_id"
      parentKey="cat_pid"
      levelKey="cat_level"
      childKey="children"
      :indentSize="30">
      </el-tree-grid> -->

      <el-tree-grid
      prop="cat_name"
      label="分类名称"
      treeKey="cat_id"
      parentKey="cat_pid"
      levelKey="cat_level"
      childKey="children"
      :indentSize="30">

      >
        
      </el-tree-grid>


      <el-table-column
        prop="cat_level"
        label="级别"
        width="180">
        <!-- 级别 -->
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button  @click="handleOpenEdit(scope.row)" plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button  @click="handleDelete(scope.row.cat_id)" plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加商品的对话框 -->
    <el-dialog title="添加商品分类" :visible.sync="addDialogFormVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="分类">
          <!-- 这里不用自带的下拉框, 找el-ui中的级联选择器 -->
          <el-cascader
            clearable
            change-on-select
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions"
            :props="defaultProps"
          >
          </el-cascader>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">确 定</el-button>
    </div>
</el-dialog>

    <!-- 添加修改分类的对话框 -->
    <el-dialog title="修改商品分类" :visible.sync="editDialogFormVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit">确 定</el-button>
    </div>
</el-dialog>

</el-card>
</template>

<script>
const ElTreeGrid = require('element-tree-grid')
export default {
  data () {
    return {
      list: [],
      pagenum: 1,
      pagesize: 5,
      total: 0,
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      form: {
        cat_pid: -1,
        cat_name: '',
        cat_level: 0
      },
      // 绑定层级下拉框
      selectedOptions: [],
      // 层级下拉框中的数据
      options: [],
      // 层级下拉框中的配置
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 点击编辑对话框的确定按钮, 发送编辑分类的网络请求
    async handleEdit () {
      const res = await this.$http.put(`categories/${this.form.cat_id}`, this.form)
      const { meta } = res.data
      if (meta.status === 200) {
        this.editDialogFormVisible = false
        this.$message.success(meta.msg)
        this.loadData()
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 点击编辑按钮,弹出编辑对话框
    handleOpenEdit (cat) {
      this.form.cat_name = cat.cat_name
      this.form.cat_id = cat.cat_id
      console.log(this.form)
      this.editDialogFormVisible = true
    },
    // 点击删除按钮,弹出删除提示框,发送删除请求
    async handleDelete (catId) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除的网络请求
        const { data: resData } = await this.$http.delete(`categories/${catId}`)
        if (resData.meta.status === 200) {
          this.$message.success('删除成功')
          this.loadData()
        } else {
          this.$message.error(resData.meta.msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 点击对话框的确定按钮, 添加商品分类信息
    async handleAdd () {
      // cat_level cat_pid
      // 分类的父id
      // 如果级联下拉框 没有选择 cat_pid=0
      // 如果级联下拉框 选中一级 cat_pid=selecetdOptions[0]
      // 如果级联下拉框 选中耳机 cat_pid=selectedOptions[1]
      if (this.selectedOptions.length === 0) {
        this.form.cat_pid = 0
        this.form.cat_level = 0
      } else if (this.selectedOptions.length === 1) {
        this.form.cat_pid = this.selectedOptions[0]
        this.form.cat_level = 1
      } else if (this.selectedOptions.length === 2) {
        this.form.cat_pid = this.selectedOptions[1]
        this.form.cat_level = 2
      }
      // 发送请求 返回201 则添加
      const { data: resData } = await this.$http.post(`categories`, this.form)
      if (resData.meta.status === 201) {
        this.$message.success('添加成功')
        this.loadData()
        this.addDialogFormVisible = false
      } else {
        this.$message.error(resData.meta.msg)
      }
    },
    async handleShowAddDialog () {
      // 点击添加按钮, 显示对话框
      this.addDialogFormVisible = true
      const res = await this.$http.get(`categories?type=2`)

       this.options = res.data.data
    
    },
    async loadData () {
      const { data: resData } = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const {data: { result, total }} = resData
      this.list = result
      this.total = total
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.loadData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadData()
      console.log(`当前页: ${val}`)
    }
  },
  components: {
    ElTreeGrid
  }
}
</script>

<style>
.row-add{
  margin-top: 10px;
}
</style>
