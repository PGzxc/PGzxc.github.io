---
title: Vue2.0开发之——路由—路由的基本用法2(69)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 1f83f08e
date: 2023-03-29 15:51:36
---
## 一 概述

* 路由模块中声明路由的对应关系
* 使用router-link替代a链接
* redirect重定向

<!--more-->

## 二 路由模块中声明路由的对应关系

### 2.1 App.vue中代码

在 src/App.vue 组件中，使用 vue-router 提供的<font color=red>\<router-view> </font>声明占位符：

```
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <a href="#/home">首页</a>
    <a href="#/movie">电影</a>
    <a href="#/about">关于</a>
    <hr />

    <router-view></router-view>
  </div>
</template>
```

### 2.2 index.js中声明路由的匹配规则

在 src/router/index.js 路由模块中，通过 routes 数组声明路由的匹配规则。示例代码如下

```
// 1.导入Vue和VueRoute的包
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Home from '@/components/Home.vue'
import Movie from '@/components/Movie.vue'
import About from '@/components/About.vue'

// 2.调用Vue.use()函数，把VueRouter安装为Vue的插件
Vue.use(VueRouter)

// 3.创建路由的实例对象
const router = new VueRouter({
  routes: [
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About }
  ]
})
// 4. 向外共享路由的实例对象
export default router
```

### 2.3 效果图
![][1]

说明：默认启动时，未指定默认路由，router-view不显示

## 三 使用router-link替代a链接

在 src/App.vue 组件中，使用 vue-router 提供的 <font color=red>\<router-link></font> 和 <font color=red>\<router-view> </font>声明路由链接和占位符：

### 3.1 router-link替代a链接

使用a标签时，代码如下

```
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <a href="#/home">首页</a>
    <a href="#/movie">电影</a>
    <a href="#/about">关于</a>
    <hr />

    <router-view></router-view>
  </div>
</template>
```

router-link替代a链接后，代码如下

```
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <router-link to="/home">首页</router-link>
    <router-link to="/movie">电影</router-link>
    <router-link to="/about">关于</router-link>
    <hr />

    <router-view></router-view>
  </div>
</template>
```

## 四 redirect重定向

### 4.1 重定向概念

* <font color=red>路由重定向</font>指的是：用户在访问<font color=red>地址 A</font> 的时候，<font color=red>强制用户跳转</font>到地址 C ，从而展示特定的组件页面。
* 通过路由规则的 <font color=red>redirect</font> 属性，指定一个新的路由地址，可以很方便地设置路由的重定向

### 4.2 重定向配置

```
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About }
  ]
})
```

说明：

* 未配置重定向redirect时，输入`http://localhost:8080/`，router-view未填充内容
* 配置重定向redirect时，输入`http://localhost:8080/`，自动跳转到`http://localhost:8080/#/home`

## 五 参考

* [was not found in ‘vue-router‘报错分析](https://blog.csdn.net/weixin_51992868/article/details/127239320)
* [npmjs—vue-router](https://www.npmjs.com/package/vue-router)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-69-route-switch-router-view.gif


