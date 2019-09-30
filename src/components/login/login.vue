<template>
  <div class="login-wrap ">
    <el-form label-position="top" label-width="80px" :model="formData" class="login-from">
              <h3>用户登录</h3>
      <el-form-item label="用户名">
        <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click.prevent="loginTo">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods:{
    //   登录功能的函数
      async loginTo(){
          // es6写法
        // 使用async 和 await的es6写法
        const res = await this.$http.post('login',this.formData)
            console.log(res)
            // 1.发送登录请求
            const data = res.data
            const {meta:{status,msg}} = data
            const {token} = data.data
            if(status ===200) {
            
            // 如果登录成功就存入tokenlocaStrog
            localStorage.setItem('token',token)

            // 2，如果成功就跳转到home组件中

            this.$router.push({name:'home'})

            // 3.提示
              this.$message.success(msg)
              
            }else {
              this.$$message.error(msg)
            }











        // 常规写法
        // this.$http.post('login',this.formData).then((res) => {
        //     console.log(res)
        //     // 1.发送登录请求
        //     const data = res.data
        //     const {meta:{status,msg}} = data
        //     const {token} = data.data
        //     if(status ===200) {
            
        //     // 如果登录成功就存入tokenlocaStrog
        //     localStorage.setItem('token',token)

        //     // 2，如果成功就跳转到home组件中

        //     this.$router.push({name:'home'})

        //     // 3.提示
        //       this.$message.success(msg)
              
        //     }else {
        //       this.$$message.error(msg)
        //     }
        // })
      }
  }
};
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.login-wrap h3 {
    font-size: 24px;
    text-align: center;
    margin: 0;
}

.login-from {
  width: 400px;
  background-color: #fff;
  height: 300px;
  border-radius: 5px;
  padding: 30px; 
}

.login-btn {
    width: 100%;
}
</style>