<template>
  <el-card>
    <!-- 面包屑 -->
    <mybread leavel1="商品管理" leavel2="分类参数"></mybread>

    <!-- 级联选择器 -->
    <el-cascader
      class="goodsparams-xz"
      expand-trigger="hover"
      v-model="selectOption"
      :show-all-levels="false"
      :options="options"
      :props="defaultprams"
      @change="handleChange"
    ></el-cascader>

    <!-- 表格 -->
    <el-tabs v-model="active" type="card" @tab-click="handleClick" class="goodsparams-tabs">
      <el-tab-pane label="动态参数" name="1">
        <el-button type="primary" class="goodsparams-btn">添加参数</el-button>

        <!-- 表格 -->
        <el-table :data="arrCheack" style="width: 100%">
          <el-table-column type="expand" label="#" width="80px">
            <template slot-scope="scope">
              <!-- tag -->
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,tag)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name" width="300px"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
              <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">配置管理</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: "1",
      // 表格动态参数
      arrCheack: [],
      // 级联选择器数据
      selectOption: [],
      options: [],
      defaultprams: {
        children: "children",
        value: "cat_id",
        label: "cat_name"
      },
      //   tag 参数
      inputVisible: false,
      inputValue: ""
    };
  },
  created() {
    this.getJieJi();
  },
  methods: {
    async getJieJi() {
      const res = await this.$http.get("categories?type=3");
      const { data } = res.data;
      this.options = data;
    },
    // 级联选择器点击的处理函数
    async handleChange() {
      // 判断点击的tabs的时候级联是否选择了没有就提示
      if (this.selectOption.length !== 3) {
        this.$message.warning("请选择分类级别");
        return;
      }

      const res = await this.$http.get(
        `categories/${this.selectOption[2]}/attributes?sel=many`
      );

      const { data } = res.data;

      data.forEach(item => {
        item.attr_vals = item.attr_vals.split(",");
      });

      this.arrCheack = data;
    },
    // tabs点击触发
    handleClick() {},
    // tag 函数
    
    // 点击el-tag的x号删除参数的函数
    async handleClose(scope,tag) {
    scope.attr_vals.splice(scope.attr_vals.indexOf(tag), 1);
    
    // attr_name
    // attr_sel
    // attr_vals

    const obj = {
        attr_name:scope.attr_name,
        attr_sel:scope.attr_sel,
        attr_vals:scope.attr_vals.join(',')
    }
    // 点击x删除参数
    const res = await this.$http.put(`categories/${this.selectOption[2]}/attributes/${scope.attr_id}`,obj)

    },

    // 显示input输入框
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // 按回车 和 离开焦点的时候 添加数据
    async handleInputConfirm(scope) {
      let inputValue = this.inputValue;
      if (inputValue) {
        scope.attr_vals.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";

    const obj = {
        attr_name: scope.attr_name,
        attr_sel:  "many",
        attr_vals:scope.attr_vals.join(',')
    }
    

    const res = await this.$http.put(`categories/${this.selectOption[2]}/attributes/${scope.attr_id}`, obj)
      
    }
  }
};
</script>

<style>
.goodsparams-xz,
.goodsparams-tabs,
.goodsparams-btn {
  margin-top: 20px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>