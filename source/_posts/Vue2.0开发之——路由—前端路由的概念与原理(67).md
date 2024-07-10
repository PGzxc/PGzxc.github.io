---
title: Vue2.0开发之——路由—前端路由的概念与原理(67)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 3f68fdc6
date: 2023-03-29 08:22:04
---
## 一 概述

* 前端路由的概念
* 前端路由的工作方式
* 实现简易的前端路由

<!--more-->

## 二 前端路由的概念

### 2.1 什么是路由

路由（英文：router）就是<font color=red>对应关系</font>

### 2.2 SPA 与前端路由

* SPA(Single Page Web Application，SPA)指的是一个 web 网站只有唯一的一个 HTML 页面，<font color=red>所有组件的展示与切换</font>都在这唯一的一个页面内完成
* 此时，<font color=red>不同组件之间的切换</font>需要通过<font color=red>前端路由</font>来实现
* 结论：在 SPA 项目中，<font color=red>不同功能之间的切换</font>，要<font color=red>依赖于前端路由</font>来完成！

### 2.3 什么是前端路由

通俗易懂的概念：<font color=red>Hash 地址</font>与<font color=red>组件</font>之间的<font color=red>对应关系</font>。

## 三 前端路由的工作方式

### 3.1 前端路由的工作描述

1. 用户<font color=red>点击了</font>页面上的<font color=red>路由链接</font>
2. 导致了 <font color=red>URL 地址栏</font>中的 <font color=red>Hash 值</font>发生了变化
3. <font color=red>前端路由监听了到 Hash 地址的变化</font>
4. 前端路由把当前 <font color=red>Hash 地址对应的组件</font>渲染都浏览器中

### 3.2 前端路由的图示
![][1]

### 3.3 结论

结论：前端路由，指的是 <font color=red>Hash 地址</font>与<font color=red>组件之间</font>的<font color=red>对应关系</font>！

## 四 实现简易的前端路由

### 4.1 定义三个Vue组件(Home、Movie、About)

Home组件

```
<template>
  <div class="home-container">
    <h3>Home 组件</h3>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="less" scoped>
.home-container {
  min-height: 200px;
  background-color: pink;
  padding: 15px;
}
</style>
```

Movie组件

```
<template>
  <div class="movie-container">
    <h3>Movie 组件</h3>
  </div>
</template>

<script>
export default {
  name: 'Movie'
}
</script>

<style lang="less" scoped>
.movie-container {
  min-height: 200px;
  background-color: lightsalmon;
  padding: 15px;
}
</style>
```

About组件

```
<template>
  <div class="about-container">
    <h3>About 组件</h3>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="less" scoped>
.about-container {
  min-height: 200px;
  background-color: skyblue;
  padding: 15px;

  >a {
    margin-right: 10px;
  }
}
</style>
```

### 4.2 App.vue中导入组件并注册

导入组件

```
import Home from '@/components/Home.vue'
import Movie from '@/components/Movie.vue'
import About from '@/components/About.vue'
```

注册组件

```
components: {
    Home,
    Movie,
    About
  }
```

### 4.3 App.vue中界面

```
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <a href="#/home">首页</a>
    <a href="#/movie">电影</a>
    <a href="#/about">关于</a>
    <hr />

    <component :is="comName"></component>
  </div>
</template>
```

### 4.4 App.vue中切换路由

定义切换时组件名字

```
data () {
    return {
      comName: 'Home'
    }
  }
```

路由切换逻辑

```
created () {
    // 只要当前的 App 组件一被创建，就立即监听 window 对象的 onhashchange 事件
    window.onhashchange = () => {
      console.log('监听到了 hash 地址的变化', location.hash)
      switch (location.hash) {
        case '#/home':
          this.comName = 'Home'
          break
        case '#/movie':
          this.comName = 'Movie'
          break
        case '#/about':
          this.comName = 'About'
          break
      }
    }
  }
```

### 4.5 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-67-route-work-explain.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-67-route-switch-preview.gif

