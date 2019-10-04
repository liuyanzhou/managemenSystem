
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
> 注意:如果要在el中写入其他的组件的标签　那么必须使用<template>包裹着 从外面传来的值也必须使用slot-scop="scop"来绑定
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

#### 8.角色列表的页面显示和数据渲染
1.在components 中建立'rights'的'role.vue'
2.在查阅element的文档可知道 要展开表格必须添加'type="extend"' 属性
3.渲染行列的数据表的时候 要优先想到使用"v-for" 来渲染行列
4.在循环中要在每次循环都要在el-row行中循环(除了最后一次循环),因为项目的循环要依靠上一次循环的数据找到当前循环所要的数据,
但最后一次循环中就可以只在所要的循环结构中使用
5.修改"el-tag"的样式 修改它的的type的值 在加上笑图标> 

#### 9.角色列表的权限列表的对话框的展示和渲染
1.先从element的对话框组件加入代码
2.在添加showEditRole() 方法 点击打开界面和通过接口"rights/tree"获取到树型结构的数据
3.在从element中获取到树节点的组件代码段 
>注意:   data => 绑定的是展示的数据
        show-checkbox => 是否显示选择框
        default-expand-all => 展示所有的树节点
        node-key="id" => 绑定每个树节点的唯一的id(来源与data绑定数据中的唯一的key名  )
        :props = "配置的选项" =>  defaultProps:{ children: 'children',  label: 'authName' }
        其中 children是指以data中那个数据为数据的转折树节点 而 label是指data中那个数据为显示的内容
```html
        <el-tree
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        ></el-tree>
```
        
#### 10.角色列表的权限列表对该角色已有的权限的渲染
1.showEditRole方法中加入遍历的数组,获取到的arr是该角色已有权限的id值在赋予default-checked-keys的tree属性
```js
    user.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            arr.push(item3.id);
          });
        });
      });
```
> 注意: arr为什么值pushitem3的id,因为如果push前面的数据的话渲染就会全打√

#### 11.对角色授予权限功能
1.roles/:roleId/rights 接口需要当前的角色id那么就要往前面的点开显示函数中获取到id并存放在data数据中
2.在通过tree组件的setCheckedKeys(打√的id) 和 getHalfCheckedKeys(打半√的id) 
> 注意: setCheckedKeys() 和getHalfCheckedKeys() 方法是要像dom元素那样被触发 但是我们vue不提倡我们操作dom那么我们就得给要操作的dom加入 ref属性, 获取时用"this.$refs.ref的属性名.get方法"

#### 12.处理路由守卫
1.因为在home.vue中判断token很麻烦(可能存在和home同级的组件,到那时就要多次判断token值),为了避免麻烦我们就使用路由守卫这个技术载
2.路由守卫时在路由配置生效前 先来到路由守卫进行判断
3.to -> 要去的路由配置 from-> 当前路由配置 next() 让to的路由配置继续生效
```js
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path === '/login') {
    next()
  } else {
    // 取token
    const token = localStorage.getItem("token");
    if (!token) {
      // 没有就跳到login
      router.push({ name: "login" });
      return
    }
    next()
  }
})
```


### 第三天项目开发

#### 1.加入goodsList的组件
1.在components的加入goodsList组件
2.在router的路由里配置好路由接口 goods

#### 2.加入goodsAdd组件
1.在components中加入goodsAdd的组件
2.在router中配置号路由规则

#### 3.在goodsAdd中加入步骤条和tabs标签页组件
1.加入步骤条  
  active => 设置当前激活步骤
  finish-status => 设置完成的状态
2.加入tabs标签页
  label => 显示标题的属性
#### 4.级联选择器
1.标签为  "el-pagination"
2.其中的属性
  expand-trigger="hover" => 设置你触发是点击还是鼠标移动
  v-model="selectOption" => 最终选择的label的value都会存放在这个位置
  :options="options"     => 绑定的数据来源
  :props="{ label:'label',value:'value',children:'children' }"  => 设置配置选项 label=> 标签显示的名字 value=>发送的唯一标识 children=>	指定选项的子选项为选项对象的某个属性值
  @change="handleChange" => 节点改变的时候就触发的事件
```html
 <el-cascader
  expand-trigger="hover"
  v-model="selectOption"
  :options="options"
  :props="defaultprams"
  @change="handleChange"
></el-cascader>
```

3.从接口文档(categories?type=3)中获取到级联数据,获取到的data在赋值给data中的级联数据的options属性去渲染

#### 5.如果基本信息中没有选择级联选择器就报提示
tab-click 在tabs组件中加入该事件(点击tabs就触发的事件)

#### 6.动态数据的展示与渲染
1. 发现动态渲染的checkbox的复选框 从element找到checkbox的组件 


2.数据接口是categories/:id/attributes?sel=many 获取动态数据 存在arrCheack
3.渲染

```html
<el-checkbox-group v-model="item.attr_vals">
    <el-checkbox border v-for="(item1,i) in item.attr_vals" :key="i" :label="item1"></el-checkbox>
  </el-checkbox-group>
```
> el-checkbox-group 中一定要有v-model并且要保证有值(这里的值是表示哪些打√) boder是控制是否有边框

#### 7.静态数据的展示和渲染
1.从接口categories/:id/attributes?sel=only 获取到数据存在arrproduct
2.使用表单控件来渲染数据
```html
<el-form-item v-for="(item,i) in arrproduct" :key="i"  :label="item.attr_name">
    <el-input v-model="item.attr_vals"> </el-input>
</el-form-item>
```

#### 8.上传图片
1. 使用element的上传照片的组件
```html
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
```
其中 header -> 是发送请求的设置请求头的属性 action->是上次照片的接口 on-preview是照片上之前的处理函数
on-remove -> 是照片移除的处理函数 on-success -> 是照片上传成功的处理函数

#### 9.富文本
1.下载 npm install vue-quill-editor --save
2.导入
```js
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
```
3.在goodsAdd组件中注册
```js
components: {
    quillEditor
  }
```
4.使用
```html
<quill-editor class="goods-editor"
 v-model="form.goods_introduce"></quill-editor>
```

#### 10.发送添加请求
1.处理添加的数据格式
2. 处理attrs =>是动态参数和静态参数的集合 arrCheack 和 arrproduct
```js
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
```
> 注意: 使用arr.map() 方法 会返回以return 为形式的数组
3.处理完form的所有数据之后发送接口post请求 (goods)


###  4.开发第四天

#### 1.布局分类参数的页面和数据渲染
1.建立路由 在router中加入 params的组件路由 
2.画出分类参数的界面
3.在表格的参数中动态的el-tag渲染
4.在级联选择器的点击下获取表格的数据
```js
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
```

#### 2.删除参数和添加参数
1.在点击el-tag的x函数中发送请求
```js
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
```
2.用el-tag的添加函数来发送添加参数的请求
```js
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
```

#### 3.引入categories组件
1.发现element的组件没有列表树的组件
2.安装element-tree-grid插件
 2.1npm install element-tree-grid --save
 2.2  var ElTreeGrid = require('element-tree-grid'); // 导包
      Vue.component(ElTreeGrid.name,ElTreeGrid); // 注册组件
3. element-tree-grid 的组件要基本配置4个属性
     treeKey 绑定到id 给每个节点设置一个唯一值
    parentKey 绑定到父id属性 区分父子节点
    levelKey 绑定到层级的属性
    childKey 绑定到储存子元素的属性


#### 4.引入order组件
1.导入城市数据接口
```js
import cityData from './city_data2017_element'
```

#### 5.数据报告
1. 路由配置 配置reports组件
2. 报表使用的是echart插件
先导入 
```js
import echarts from 'echarts'
```
在初始化
```js
export default {
  data() {
    return {
        option:{}
    };
  },
  mounted(){
      this.UserEchart()
  },
  methods: {
   async UserEchart() {
      // init
      const mychart = echarts.init(this.$refs.ecartsArea);

      // option
   const { data: { data } } = await this.$http.get(`reports/type/1`) 
      const optionEcharts = {
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      };
      this.option = { ...data, ...optionEcharts };

      //use
       mychart.setOption(this.option)
    }
  }
};
```