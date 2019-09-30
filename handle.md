
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

####　往user的vue中加入了面包屑和搜索按钮和表格和分页组件

#### 渲染表格的内容
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

#### 导入状态的开关和操作的按钮
