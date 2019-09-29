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
              <a href="#" class="home-loginOut">退出</a>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- 左划菜单 -->
      <el-container>
        <el-aside width="200px" class="home-slide">
          <el-menu
          unique-opened="true"
           default-active="2" class="el-menu-vertical-demo">
            <!-- 1 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-s-order"></i>
                <span>用户列表</span>
              </el-menu-item>
            </el-submenu>
            <!-- 2 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-s-order"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-s-order"></i>
                <span>权限列表</span>
              </el-menu-item>
            </el-submenu>
            <!-- 3 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-s-order"></i>
                <span>商品列表</span>
              </el-menu-item>
                <el-menu-item index="1-1">
                <i class="el-icon-s-order"></i>
                <span>分类参数</span>
              </el-menu-item>
                <el-menu-item index="1-1">
                <i class="el-icon-s-order"></i>
                <span>商品分类</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-s-order"></i>
                <span></span>
              </el-menu-item>
            </el-submenu>
            <!-- 4 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-s-order"></i>
                <span>订单列表</span>
              </el-menu-item>
            </el-submenu>
            <!-- 5 -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-s-order"></i>
                <span>数据报表</span>
              </el-menu-item>

            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="home-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script></script>

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
}

.container .home-slide {
  background-color: #d3dce6;
}

.container .home-main {
  background-color: #e9eef3;
}
</style>