
### 项目第一天

#### 1.项目的准备

#### 加入fix代码
     在package的代码中加入
   1.  "lintfix": "eslint --ext .js,.vue src --fix",
   2. 运行 npm run lintfix 代码

#### 2.关闭 lintfix 插件
> 在build的webpack.base.json中查找 .(config.dev.useEslint ? [createLintingRule()] : []),注释

#### 3.准备好git版本

#### 4.项目中的登录组件login  要先设置好分支
> git checkout -b 分支的名字
> git branch 查看有哪些分支
> 注意 
 1.我们每做好一个小功能都要 git commit 一次  

 #### 5.写入登录组件
 > 1.导入element的from的组件代码段
 > 2.修改代码段
 > 3.注册点击登录的组件事件

 #### 6.修改axios为Vue的插件
 > 1.建立plugins http.js 文件 在里面配置好
 ```js
 import axios from 'axios'

const myhttpServer = {}

myhttpServer.install = function (Vue, options) {
    axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
    // 4. 添加实例方法
    Vue.prototype.$http = axios
  }

  export default myhttpServer

  ```

> 2.在main中加入
```js 
  import $http from '@/plugins/http'
  Vue.use($http)
```

#### 7.发送登录请求
> 1.获取username和password的值发送到对应的接口上
> 2.成功就跳转到home的组件
> 3.提醒

#### 8.画home的组件
> 1.已经布局容器
> 2.使用layout布局给头部写好内容
> 3.在slide中 使用meau菜单导航组件
> 4.改装meau组件为所要的组件的样子

#### 9.做了登录的剩下的逻辑业务
> 1.当登录成功的时候就往locaStrage里存入token的值
> 2.在home组件的beforecreate的函数中获取locastrage的token值 
> 3.判断这个token值是否存在 没有就跳转到login组件

#### 10.做了退出功能的业务逻辑
> 1.清除localStorage的记录
> 2.跳转到登录组件
> 3.提示

#### 11.合并dev-login分支
> 1.先git commit -m 描述
> 2.切换到master主分直上  git checkout master
> 3.合并分枝 git merge dev-login
> 4.最后由主枝push到github

#### 12.新建dev-user
  1.git checkout -b dev-user
  
#### 13.开启导航菜单的router功能 
>  1.在:router="true"
>  2. 修改index的值 此时这里的index的值就router文件的path的值 
   注意: 在index的值可以加'/'也可以不加'/' vue会处理

#### 14. 在login组件中使用了es6的写法  
>   1. 在函数的前面加上asnyc  在异步操作的前面加上await  
>   2. 这个操作是等await后面的函数执行完才会执行下一步操作


### 项目第二天

####　1.往user的vue中加入了面包屑和搜索按钮和表格和分页组件

#### 2，渲染表格的内容
1. 发现表格多的数据是用 :data 绑定数据源的 用prop="数据的名称" 来做渲染的 
2. 发现时间的格式有问题 在main.js中使用mount的插件来定义时间格式化的过滤器
  2.1 发现如果要使用时间格式化的过滤器 那么就要加template的标签 例如 使用slot-scope 传入数据的源头 其实slot-scope会自动
      查找到数据源 其中list.row是找到数据源的每一个对象
```html
    <el-table-column label="创建日期" >
          <template slot-scope="list">
              {{ list.row.create_time | fmtDate }}
          </template>
      </el-table-column>
```

#### 3.导入状态的开关和操作的按钮

#### 4.给页面注册属性 @size-change="handleSizeChange"  @current-change="handleSizeChange"
其中 @size-change 是每页显示的条数改变的时候触发
    @current-change 是点击页数改变的时候触发
      :current-page 是显示当前的第几页数
       :page-sizes  是控制一页显示数的多少条的数据组
       :page-size  控制一页显示多少条  

在handleSizeChange与 handleSizeChange的函数中要写入发出请求的函数的条件 重新获取数据

#### 5.添加用户的对话框
```html
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
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
```
> 注意: 修改其中的值与下面将对话框对应的值清空的js代码(使用 forin 快速生成 其中 this.form.hasOwnProperty(key) 涉及到原型的概念 它是在问这个实例对象是否有这些key)
```js
  for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key]=  ''   
        }
      }
```

#### 6.点击删除用户
1.给界面添加comfire的代码判断
```js
     this.$confirm("确定删除改用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
        const res  = await this.$http.delete(`users/${id}`)
        const {meta:{msg,status}} =  res.data
        if(status===200){
          this.pagenum= 1
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功'
          })         
        }        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }); 
```
> 注意: 其中的.then是处理成功的处理函数 .catch 是处理取消的处理函数

#### 7.添加了编辑的界面



###  项目第三天

#### 1.显示编辑的数据
1.先通过接口users/:id 查询到编辑数据必要的信息
2.将信息显示到界面上(由于和添加用户的信息是同一个结构 所以 可以使用同一个data中绑定的数据)
3.在给确定的按钮添加提交事件(组件原生就有)
> 注意: 测试的时候由于先点编辑后点添加用户(由于使用同一个data的绑定数据就会导致编辑的数据滞留)所以在显示添加哟过户组件的时候必须清空data中绑定的数据

#### 2.改变用户状态
1. 从组件的switch发现 组件有一个change事件(是当switch 状态发生变化时的回调函数) 
> 注意: 当switch组件中v-model绑定了什么 change事件就改变什么(布尔值)
```html
       <el-switch
          slot-scope="scope"
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="handleStatus(scope.row)"
        ></el-switch>
```
2.在change绑定的事件中发送请求就ok了users/:uId/state/:type

#### 3.分配角色
1.先画好分配角色的模版
2.通过接口users/:id获取到用户的username显示到组件中的用户名 
> 注意: {{ data中的数据 }} 这种格式是支持的 而this.data的数据是在exprot default的其他数据中使用data数据时使用
> 注意:如果要在el中写入其他的html的标签　那么必须使用<template>包裹着 从外面传来的值也必须使用slot-scop="scop"来绑定
3.通过接口role 获取到所有的角色列表 将其存入一个data中的数组中去 然后在v层中遍历
```html
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
```
> 注意: 在遍历的时候要写入到组件的数据必须使用" : "来绑定属性 如上的:label="item.roleName"  :value="item.id"
>注意: 在el-select 和 el-option 有一个特性 当el-select上的v-model绑定的值和el-option撒谎那个的value如果是一样的话 el-select上面就会显示el-option的label值(原生的select和option也是这样子的属性)
4.通过接口"users/:id" 来获取到当前用户的角色 在渲染到v层中 在件其获得rid放到el-select上的v-model绑定的值上

#### 4.分配角色的编辑
1.由接口"users/:id/role"可知需要用户id和修改的rid 
2.获取到id 和 rid(其实都在上面的操作中加入了data中)
3.发送成功


#### 5.封装面包屑组件为全局组件
1. 在组件的模块中建立common的bread.vue放入面包屑的模版
2. 封装props:[] 里面有父组件传来的属性 
3. 到main.js中将bread注册为全局的组件
```js
import bread from './components/common/bread'
Vue.component(bread.name,bread)
```

> 注意: import 导出的是vue的'export default'对象所以组件名字可以在bread.vue中的name属性声明

#### 6.全局配置axios发送请求的请求头(使用axios的拦截器)
```js
 axios.interceptors.request.use(function (config) {
    
    // 判断该请求是不是login  注意: config.url 对应的是除了baseURL 的请求路径的值
    if(config.url !=='login'){
      const AUTH_TOKEN = localStorage.getItem("token");
      config.headers["Authorization"] = AUTH_TOKEN;
    }
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
```

#### 7.权限列表的数据显示
1.在components 中建立'rights'的'rightList.vue '
2.通过接口'rights/list '获取到权限列表的信息 在data中声明一个rightList的数组
3.将数据渲染到v层