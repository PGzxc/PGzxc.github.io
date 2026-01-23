---
title: Vue2.0开发之——路由—编程式导航API(72)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: c2c35c03
date: 2023-03-30 10:57:12
---
## 一 概述

* 声明式导航 & 编程式导航
* vue-router 中的编程式导航 API
* 编程式导航 API示例
* $router.go 的简化用法

<!--more-->

## 二 声明式导航 & 编程式导航

### 2.1 声明式导航

* 在浏览器中，<font color=red>点击链接</font>实现导航的方式，叫做<font color=red>声明式导航</font>
* 普通网页中点击 <font color=red>\<a> 链接</font>、vue 项目中点击 <font color=red>\<router-link> </font>都属于声明式导航

### 2.2 编程式导航

* 在浏览器中，<font color=red>调用 API 方法</font>实现导航的方式，叫做编程式导航
* 普通网页中调用<font color=red> location.href</font> 跳转到新页面的方式，属于编程式导航

## 三 vue-router 中的编程式导航 API

vue-router 提供了许多编程式导航的 API，其中最常用的导航 API 分别是

### 3.1 this.$router.push('hash 地址')

跳转到指定 hash 地址，并<font color=red>增加</font>一条历史记录

### 3.2 this.$router.replace('hash 地址')

跳转到指定的 hash 地址，并<font color=red>替换掉当前的</font>历史记录

### 3.3 this.$router.go(数值 n)

实现导航历史前进、后退

## 四 编程式导航 API示例

### 4.1 $router.push(首页页点击跳转电影1)

**Home.vue中代码**

```
<template>
  <div class="home-container">
    <h3>Home 组件</h3>
    <hr>
    <button @click="pushtoMovie1">跳转到"电影1"</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    pushtoMovie1 () {
      this.$router.push('/movie/1')
    }
  }
}
</script>
```

**效果图**

![][1]

**说明**

调用 this.$router.push() 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面

### 4.2 $router.replace

**Home.vue中代码**

```
<template>
  <div class="home-container">
    <h3>Home 组件</h3>
    <hr>
    <button @click="pushtoMovie1">跳转到"电影1"</button>
    <button @click="replacetoMovie1">通过replace跳转到"电影1"</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    pushtoMovie1 () {
      this.$router.push('/movie/1')
    },
    replacetoMovie1 () {
      this.$router.replace('/movie/1')
    }
  }
}
</script>
```

**效果图**

![][2]

**说明**

调用 this.$router.replace() 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。

push 和 replace 的区别：

* push 会<font color=red>增加一条历史记录</font>
* replace 不会增加历史记录，而是<font color=red>替换掉当前的历史记录</font>

### 4.3 $router.go

**Movie.vue中代码**

```
<template>
  <div class="movie-container">
    <h3>Movie 组件---{{ this.$route.params.mid }}--{{ mid }}</h3>
    <button @click="showThis">打印this</button>
    <button @click="goBack">后退</button>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  props: ['mid'],
  methods: {
    showThis () {
      console.log(this)
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
```

**效果图**
![][3]

## 五 $router.go 的简化用法

在实际开发中，一般只会前进和后退一层页面。因此 vue-router 提供了如下两个便捷方法

### 5.1 $router.back()

在历史记录中，<font color=red>后退</font>到上一个页面

### 5.2 $router.forward()

在历史记录中，<font color=red>前进</font>到下一个页面



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-72-route-push-movie-1.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-72-route-replace-movie-1.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-72-route-go-movie-1.gif
