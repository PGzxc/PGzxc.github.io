---
title: Vue2.0开发之——路由—路由的基本用法1(68)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 4138bb1f
date: 2023-03-29 15:50:22
---
## 一 概述

* vue-router介绍
* 安装和配置路由
* 路由注意事项

<!--more-->

## 二 vue-router介绍

### 2.1 是vue-router什么

<font color=red>vue-router</font> 是 vue.js 官方给出的<font color=red>路由解决方案</font>。它只能结合 vue 项目进行使用，能够轻松的管理 SPA 项目
中组件的切换。

### 2.2 vue-router 的官方文档地址

vue-router 的官方文档地址：https://router.vuejs.org/zh/

## 三 安装和配置路由

### 3.1 vue-router的安装和配置的步骤

1.  安装 vue-router 包
2. <font color=red>创建路由模块</font>
3. 导入并挂载路由模块
4.  声明<font color=red>路由链接</font>和<font color=red>占位符</font>

### 2.2 在项目中安装vue-router

在 vue2 的项目中，安装 vue-router 的命令如下

```
npm install vue-router@3.5.2
```

### 3.3 创建路由模块

在 <font color=red>src</font> 源代码目录下，新建<font color=red>router/index.js</font> 路由模块，并初始化如下的代码

```
// 1.导入Vue和VueRoute的包
import Vue from 'vue'
import VueRouter from 'vue-router'

// 2.调用Vue.use()函数，把VueRouter安装为Vue的插件
Vue.use(VueRouter)

// 3.创建路由的实例对象
const router = new VueRouter()
// 4. 向外共享路由的实例对象
export default router
```

### 3.4 导入并挂载路由模块

在 src/<font color=red>main.js </font>入口文件中，导入并挂载路由模块。示例代码如下：

```
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
```

## 四 路由注意事项

### 4.1 main.js导入路由时，只指明路由路径，省略index.js

省略前

```
import router from '@/router/index.js'
```

省略后

```
import router from '@/router/'
```

原因：

在进行模块化导入的时候，如果给定的是文件夹，则默认导入这个文件夹下，名字叫做index.js的文件。如果名字不叫index.js，会出现以下错误

```
ERROR
Cannot find module '@/router/'
    at webpackMissingModule (webpack-internal:///./src/main.js:4:50)
    at eval (webpack-internal:///./src/main.js:4:134)
    at ./src/main.js (http://localhost:8080/js/app.js:331:1)
    at __webpack_require__ (http://localhost:8080/js/app.js:444:33)
    at http://localhost:8080/js/app.js:1565:109
    at __webpack_require__.O (http://localhost:8080/js/app.js:490:23)
    at http://localhost:8080/js/app.js:1566:53
    at http://localhost:8080/js/app.js:1568:12
```

图示

![][1]

### 4.2 挂载router时，如果名字相同可省略

省略前

```
import router from '@/router'

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
```

省略后

```
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
```

## 五 参考

* [Vue Router官网—介绍](https://router.vuejs.org/zh/introduction.html)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-68-route-index-name-error.png


