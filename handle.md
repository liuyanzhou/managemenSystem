## 1.项目的准备

## 加入fix代码
     在package的代码中加入
   1.  "lintfix": "eslint --ext .js,.vue src --fix",
   2. 运行 npm run lintfix 代码

## 2.关闭 lintfix 插件
> 在build的webpack.base.json中查找 .(config.dev.useEslint ? [createLintingRule()] : []),注释

## 3.准备好git版本

## 4.项目中的登录组件login  要先设置好分支
> git checkout -b 分支的名字
> git branch 查看有哪些分支
> 注意 
 1.我们每做好一个小功能都要 git commit 一次  

 ## 5.写入登录组件
 > 1.导入element的from的组件代码段
 > 2.修改代码段
 > 3.注册点击登录的组件事件

 ## 6.修改axios为Vue的插件
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

## 7.发送登录请求
> 1.获取username和password的值发送到对应的接口上
> 2.成功就跳转到home的组件
> 3.提醒

## 8.画home的组件
> 1.已经布局容器
> 2.使用layout布局给头部写好内容
> 3.在slide中 使用meau菜单导航组件
> 4.改装meau组件为所要的组件的样子

## 9.做了登录的剩下的逻辑业务
> 1.当登录成功的时候就往locaStrage里存入token的值
> 2.在home组件的beforecreate的函数中获取locastrage的token值 
> 3.判断这个token值是否存在 没有就跳转到login组件

## 10.做了退出功能的业务逻辑
> 1.清除localStorage的记录
> 2.跳转到登录组件
> 3.提示