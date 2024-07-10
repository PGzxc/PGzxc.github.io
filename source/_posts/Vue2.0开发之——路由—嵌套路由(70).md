---
title: Vue2.0开发之——路由—嵌套路由(70)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 3be98181
date: 2023-03-29 17:03:59
---
## 一 概述

* 什么是嵌套路由
* 声明子级路由链接和占位符
* 声明嵌套路由的规则
* 默认子路由

<!--more-->

## 二 什么是嵌套路由

通过路由实现<font color=red>组件的嵌套展示</font>，叫做嵌套路由

|                       未嵌套                        |                           嵌套路由                           |
| :-------------------------------------------------: | :----------------------------------------------------------: |
|                       ![][1]                        |                            ![][2]                            |
| 点击<font color=red>父级路由链接</font>显示模板内容 | 1.模板内容中又有<font color=red>子级路由链接</font><br>2.点击<font color=red>子级路由链接</font>显示<font color=red>子级模板内容</font> |

## 三 声明子级路由链接和占位符

### 3.1 项目目录结构

![][3]

使用tree指令，查看项目目录结构

```
└─src
    ├─assets
    ├─components
    │  └─tabs
    └─router
```

### 3.2 Tab1&Tab2

tab1.vue

```
<template>
  <div class="tab1-container">
    <h5>Tab1 组件</h5>
  </div>
</template>

<script>
export default {
  name: 'Tab1'
}
</script>

<style lang="less" scoped>
.tab1-container {
  min-height: 150px;
  background-color: greenyellow;
}
</style>
```

tab2.vue

```
<template>
  <div class="tab2-container">
    <h5>Tab2 组件</h5>
  </div>
</template>

<script>
export default {
  name: 'Tab2'
}
</script>

<style lang="less" scoped>
.tab2-container {
  min-height: 150px;
  background-color: plum;
}
</style>
```

### 3.3 About中嵌套路由

```
<template>
  <div class="about-container">
    <h3>About 组件</h3>

    <!--子路由链接-->
    <router-link to="/about/tba1">tab1</router-link>
    <router-link to="/about/tba2">tab2</router-link>

    <hr>

    <!--子级路由占位符-->
    <router-view></router-view>
  </div>
</template>
```

## 四 声明嵌套路由的规则

### 4.1 通过 children 属性声明子路由规则

在 src/router/index.js 路由模块中，导入需要的组件，并使用 <font color=red>children 属性</font>声明子路由规则：

```
import Tab1 from '@/components/tabs/Tab1'
import Tab2 from '@/components/tabs/Tab2'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    {
      path: '/about',
      component: About,
      children: [
        { path: 'tab1', component: Tab1 },
        { path: 'tab2', component: Tab2 }
      ]
    }
  ]
})
```

### 4.2 效果图
![][4]

## 五 默认子路由

### 5.1 存在的问题

* 切换到About(关于)页面时，页面路径为`http://localhost:8080/#/about`
* 此时没有展示Tab1或Tab2的内容

### 5.2 通过redirect设置默认路由(跳转到Tab1)

```
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    {
      path: '/about',
      component: About,
      redirect: '/about/tab1',
      children: [
        { path: 'tab1', component: Tab1 },
        { path: 'tab2', component: Tab2 }
      ]
    }
  ]
})
```

说明：页面路径为：`http://localhost:8080/#/about/tab1`

### 5.3 默认子路由

子路由规则/默认子路由：如果children数组中，某个路由规则的path值为空字符串，则这条路由规则，叫做“默认子路由”

About.vue中设置

```
<template>
  <div class="about-container">
    <h3>About 组件</h3>

    <!--子路由链接-->
    <router-link to="/about/">tab1</router-link>
    <router-link to="/about/tab2">tab2</router-link>

    <hr>

    <!--子级路由占位符-->
    <router-view></router-view>
  </div>
</template>
```

index.js默认子路由

```
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    {
      path: '/about',
      component: About,
      children: [
        { path: '', component: Tab1 },
        { path: 'tab2', component: Tab2 }
      ]
    }
  ]
})
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-70-route-nest-no-sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-70-route-nest-yes-sample.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-70-route-project-struct.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-70-route-nest-tab-switch.gif
