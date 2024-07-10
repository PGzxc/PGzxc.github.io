---
title: Vue2.0开发之——路由—动态路由(71)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 150eebe1
date: 2023-03-29 21:57:03
---
## 一 概述

* 什么是动态路由匹配
* 动态路由的概念
* 动态路由基本用法
* query和fullPath

<!--more-->

## 二 什么是动态路由匹配

思考：有如下 3 个路由链接

```
<router-link to="/movie/1">电影1</router-link>
<router-link to="/movie/2">电影2</router-link>
<router-link to="/movie/3">电影3</router-link>
```

定义如下 3 个路由规则，是否可行???

```
{ path: '/movie/1', component: Movie }
{ path: '/movie/2', component: Movie }
{ path: '/movie/3', component: Movie }
```

缺点：路由规则的<font color=red>复用性差</font>

## 三 动态路由的概念及示例

### 3.1 动态路由的概念

* 动态路由指的是：把 Hash 地址中<font color=red>可变的部分</font>定义为参数项，从而<font color=red>提高路由规则的复用性</font>。
* 在 vue-router 中使用<font color=red>英文的冒号</font>（:）来定义路由的参数项。示例代码如下

### 3.2 动态路由的动态参数

```
//路由中的动态参数以:进行声明，冒号后面的是动态参数的名称
{ path: '/movie/:id', component: Movie }

//将以下3个路由规则，合并成一个，提高了路由规则的复用性
{ path: '/movie/1', component: Movie }
{ path: '/movie/2', component: Movie }
{ path: '/movie/3', component: Movie }
```

### 3.3 动态路由的示例

**App.vue中添加电影1、电影2、电影3**

```
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <router-link to="/home">首页</router-link>
    <router-link to="/movie/1">电影1</router-link>
    <router-link to="/movie/2">电影2</router-link>
    <router-link to="/movie/3">电影3</router-link>
    <router-link to="/about">关于</router-link>
    <hr />

    <router-view></router-view>
  </div>
</template>
```

**index.js中动态路由配置**

```
{ path: '/movie/:mid', component: Movie }
```

## 四 动态路由基本用法

### 4.1 $route.params 参数对象

在<font color=red>动态路由</font>渲染出来的组件中，可以使用 this.<font color=red>$route.params </font>对象访问到<font color=red>动态匹配的参数值</font>

**Moive.vue中添加按钮打印this**

```
<template>
  <div class="movie-container">
    <h3>Movie 组件---{{ this.$route.params.mid }}</h3>
    <button @click="showThis">打印this</button>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  methods: {
    showThis () {
      console.log(this)
    }
  }
}
</script>
```

**打印结果**

![][1]
说明：

* 路由参数对象位于VueComponent—>route路径下
* route—>params—>mid与配置动态路由时参数相同
* 通过`this.$route.params.mid`获取mid的值，this可以省略
* route：路由的参数对象，router：路由的导航对象

### 4.2 使用 props 接收路由参数

<font color=red>为了简化路由参数的获取形式</font>，vue-router 允许在<font color=red>路由规则</font>中<font color=red>开启props 传参</font>

**index.js**中为Movie开启路由传参

```
{ path: '/movie/:mid', component: Movie, props: true }
```

**Movie.vue中接受参数并显示**

```
<template>
  <div class="movie-container">
    <h3>Movie 组件---{{ this.$route.params.mid }}--{{ mid }}</h3>
    <button @click="showThis">打印this</button>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  props: ['mid'],
  methods: {
    showThis () {
      console.log(this)
    }
  }
}
</script>
```

说明：

* 在Movie中通过props接收参数，并设置参数名为mid
* 在H3组件中通过mid显示接收参数

## 五 query和fullPath

### 5.1 给电影2设置参数并查看结果

```
<router-link to="/movie/2?name=zs&age=20">电影2</router-link>
```

打印结果

![][2]

### 5.2 query和fullPath说明

以下面的地址为例：

```
http://localhost:8080/#/movie/2?name=zs&age=20
```

说明：

* 在hash地址中，/后面的参数项，叫做“路径参数”，如`/move/2`。在路由“参数对象”中，需要使用`this.$route.params`来访问路径参数
* 在hash地址中，`?`后面的参数项，叫做“查询参数”，在路由“参数对象”中，需要使用`this.$route.query`来访问查询参数
* `movie/2`是path的值
* `/movie/2?name=zs&age=20`是fullPath的值



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-71-route-dynamic-print-this.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-71-route-dynamic-path.png

