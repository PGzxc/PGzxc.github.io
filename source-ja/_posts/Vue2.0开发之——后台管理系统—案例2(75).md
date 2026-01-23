---
title: Vue2.0开发之——后台管理系统—案例2(75)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 7bd5d586
date: 2023-03-31 09:00:05
---
## 一 概述

* 实现后台主页的基础布局
* 退出登录并控制访问权限
* 实现子路由的嵌套展示

<!--more-->

## 二 实现后台主页的基础布局

### 2.1 index.js中导入Home组件，并配置路由

```
import Home from '@/components/MyHome.vue'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home },
  ]
})
```

### 2.2 Home组件布局

导入需要的头部组件和左侧组件

```
// 头部区域组件
import MyHeader from './subcomponents/MyHeader.vue'
// 左侧边栏组件
import MyAside from './subcomponents/MyAside.vue'
```

注册组件

```
 components: {
    MyHeader,
    MyAside
  }
```

界面布局

```
<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <MyHeader></MyHeader>

    <!-- 页面主体区域 -->
    <div class="home-main-box">
      <!-- 左侧边栏 -->
      <MyAside></MyAside>
      <!-- 右侧内容主体区域 -->
      <div class="home-main-body">
        主体内容
      </div>
    </div>
  </div>
</template>
```

效果图
![][1]

## 三 退出登录并控制访问权限

### 3.1 Header组件设置退出登录事件

退出登录按钮

```
<button type="button" class="btn btn-light" @click="logout">退出登录</button>
```

退出登录方法

```
logout() {
      // 1. 清空 token
      localStorage.removeItem('token')
      // 2. 跳转到登录页面
      this.$router.push('/login')
    }
```

### 3.2 index.js设置导航守卫

退出登录后，输入`http://localhost:8080/#/home`，仍可进入后台，需要设置前置守卫

```
// 全局前置守卫
router.beforeEach(function(to, from, next) {
    if (to.path === '/home') {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  })
```

## 四 实现子路由的嵌套展示

### 4.1 MyAside左侧组件设置router-link

```
<ul class="user-select-none menu">
     <li class="menu-item">
        <router-link to="/home/users">用户管理</router-link>
     </li>
     <li class="menu-item">
        <router-link to="/home/rights">权限管理</router-link>
     </li>
     <li class="menu-item">
        <router-link to="/home/goods">商品管理</router-link>
     </li>
     <li class="menu-item">
        <router-link to="/home/orders">订单管理</router-link>
     </li>
     <li class="menu-item">
        <router-link to="/home/settings">系统设置</router-link>
     </li>
</ul>
```

### 4.2 index.js中设置左侧跳转的路由规则

导入组件

```
import Users from '@/components/menus/MyUsers.vue'
import Rights from '@/components/menus/MyRights.vue'
import Goods from '@/components/menus/MyGoods.vue'
import Orders from '@/components/menus/MyOrders.vue'
import Settings from '@/components/menus/MySettings.vue'
```

设置路由规则

```
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: 'users', component: Users },
        { path: 'rights', component: Rights },
        { path: 'goods', component: Goods },
        { path: 'orders', component: Orders },
        { path: 'settings', component: Settings }
      ]
    }
  ]
})
```

### 4.3 MyHome.vue右侧主窗体区域设置router-view

```
<div class="home-main-body">
      <router-view></router-view>
</div>
```

### 4.4 效果图

![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-75-service-manager-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-75-service-manager-tab-switch.gif
