<template>
  <div class="container">
    <!-- 顶部 -->
    <el-container class="el-contain">
      <el-header class="home-top">
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <img src="../../assets/images/logo.png" alt />
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">
              <h3 class="home-title">欢迎来到后台管理系统</h3>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <a href="#" class="home-loginOut" @click.prevent="loginOut">退出</a>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- 左划菜单 -->
      <el-container>
        <el-aside width="200px" class="home-slide">
          <el-menu
            :unique-opened="true"
            :router="true"
            default-active="2"
            class="el-menu-vertical-demo"
          >
            <!-- 1 -->
            <el-submenu :index="''+i" v-for="(item1,i) in meauList" :key="i">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item1.authName }}</span>
              </template>
              <el-menu-item :index="item2.path" v-for="(item2,i) in item1.children" :key="i">
                <i class="el-icon-s-order"></i>
                <span>{{ item2.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="home-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      meauList:[]
    }
  },
  created(){
    this.getMeauList()
  },
  methods: {
    loginOut() {
      // 清除token的登录标识
      localStorage.clear();
      //    转发
      this.$router.push({ name: "login" });
      //    提醒
      this.$message.success("退出成功!");
    },
    async getMeauList() {
      const res = await this.$http.get("menus");
      // console.log(res)
      this.meauList=res.data.data
    }
  }
};
</script>

<style>
.container,
.el-contain {
  height: 100%;
}
.container .home-top {
  height: 100%;
  background-color: #b3c0d1;
}

.container .home-title {
  text-align: center;
}

.container .home-loginOut {
  display: block;
  line-height: 60px;
  text-align: center;
  text-decoration: none;
}

.container .home-slide {
  background-color: #fff;
  height: 100%;
}

.container .home-main {
  background-color: #e9eef3;
}
</style>