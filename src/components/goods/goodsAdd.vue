<template>
  <el-card>
    <!-- 面包屑 -->
    <mybread leavel1="商品管理" leavel2="商品列表"></mybread>

    <!-- 提示框 -->
    <el-alert title="成功提示的文案" type="success" center show-icon class="goods-alter"></el-alert>

    <!-- 基本信息
        商品参数
        商品属性
        商品图片
    商品内容-->
    <!-- 步骤条 -->
    <el-steps :active="active*1" finish-status="success" simple style="margin-top: 20px">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- 标签页 -->
    <el-form label-position="top">
      <el-tabs v-model="active" @tab-click="toClick()" tab-position="left" style=" margin-top:20px">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>

          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>

          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>

          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
            <el-cascader
              expand-trigger="hover"
              v-model="selectOption"
              :options="options"
              :props="defaultprams"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="2" label="商品参数">
          {{arrCheack}}
          <el-form-item :label="item.attr_name" v-for="(item,i) in arrCheack" :key="i">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox border v-for="(item1,i) in item.attr_vals" :key="i" :label="item1"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <el-form-item v-for="(item,i) in arrproduct" :key="i" :label="item.attr_name">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <el-upload
              :headers="header"
              class="upload-demo"
              action="http://localhost:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
            <el-button type="primary"  @click="toAddPro()">添加商品</el-button>
          <quill-editor class="goods-editor"
            v-model="form.goods_introduce"></quill-editor>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
  <!-- goods_name 商品名称
    goods_cat 以为','分割的分类列表
    goods_price 价格
    goods_number 数量
    goods_weight 重量
    goods_introduce 介绍
    pics 上传的图片临时路径（对象）
    attrs 商品的参数（数组）-->
  <!-- <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
        
  </el-form-item>-->
</template>

<script>
import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      // 步骤页和tabs的联动属性值绑定
      active: "1",
      // 表单数据
      form: {
        goods_name: "",
        goods_cat:'',
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_introduce:'',
        goods_introduce :'',
        pics:[],
        attrs:[]

      },
      //   级连选择器
      selectOption: [],
      options: [],
      defaultprams: {
        children: "children",
        value: "cat_id",
        label: "cat_name"
      },
      // 复选框参数数据(动态)
      arrCheack: [],
      // 商品属性的数据(静态)
      arrproduct: [],
      // 图片的头部
      header: {
        Authorization: localStorage.getItem("token")
      }
    };
  },
  created() {
    // 获取级联选择器的数据函数
    this.getJieJi();
  },
  methods: {
    //   点击tabs触发的事件
    async toClick() {
      // 判断点击的tabs的时候级联是否选择了没有就提示
      if (this.selectOption.length !== 3) {
        this.$message.warning("请选择分类级别");
        return;
      }

      if (this.active === "2") {
        // 发送请求获取参数
        const res = await this.$http.get(
          `categories/${this.selectOption[2]}/attributes?sel=many`
        );

        const { data } = res.data;

        data.forEach(item => {
          item.attr_vals = item.attr_vals.split(",");
        });

        this.arrCheack = data;
      }

      if (this.active === "3") {
        const res = await this.$http.get(
          `categories/${this.selectOption[2]}/attributes?sel=only`
        );
        const { data } = res.data;
        this.arrproduct = data;
      }
    },
    handleChange() {},
    // 获取层级选择器的方法
    async getJieJi() {
      const res = await this.$http.get("categories?type=3");
      const { data } = res.data;
      this.options = data;
    },
    handleRemove(file, fileList) {

      const index = this.form.pics.findIndex(item=>{
        return item.pic === file.response.data.tmp_path
      })

      this.form.pics.splice(index,1)
    },
    handlePreview(file) {

    },
    handleSuccess(file) {

      this.form.pics.push({
          pic:file.data.tmp_path
      })

    },
    // 添加商品的函数
    async toAddPro(){
       this.form.goods_cat = this.selectOption.join(',')

      // 处理this.form.attr数据(动态和静态)
       const arr1 = this.arrCheack.map(item =>{
         return { attr_id:item.attr_id , attr_value:item.attr_vals }
       })

      // 静态
      const arr2 = this.arrproduct.map(item =>{
        return { attr_id:item.attr_id , attr_value: item.attr_vals}
      })
      
      // 拼接
      const arr3 = [...arr1,...arr2]
      this.form.attrs = arr3
      

      // 发送添加请求
      const res = await this.$http.post('goods',this.form)
   
      const {meta:{msg,status}} =res.data
      if(status===201){
        this.$message.success(msg)
        // 跳转
        this.$router.push({name:'goods'})
      } 


    }
  }
};
</script>

<style>
.goods-alter {
  margin-top: 20px;
}

.ql-editor {
    min-height: 300px;
}
.goods-editor{
    margin-top: 20px;
}
</style>