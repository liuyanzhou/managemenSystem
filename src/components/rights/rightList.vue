<template>
  <el-card>
    <!-- 面包屑 -->
    <mybread leavel1="权限管理" leavel2="权限列表"></mybread>

    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="120"></el-table-column>
      <el-table-column prop="path" label="路径" width="200"></el-table-column>
      <el-table-column  label="层级" width="200">
          <template slot-scope="scope">
              <span v-if="scope.row.level==='0'">第一级</span>
              <span v-if="scope.row.level==='1'">第二级</span>
              <span v-if="scope.row.level==='2'">第三级</span>

            </template>  
      </el-table-column>
      
    </el-table>
  </el-card>
</template>

<script>
    export default {
        data(){
            return {
                tableData:[]
            }
        },
        created(){
            this.getRightList()
        },
        methods:{
           async getRightList(){
              const res = await  this.$http.get(`rights/list`)
              this.tableData = res.data.data 
            }
        }
    }
</script>

<style></style>