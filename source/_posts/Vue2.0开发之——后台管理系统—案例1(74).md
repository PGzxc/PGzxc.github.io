---
title: Vue2.0开发之——后台管理系统—案例1(74)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 256e9e17
date: 2023-03-31 08:58:36
---
## 一 概述

* 创建项目
* 安装和配置路由
* 基于路由渲染登录组件
* 模拟登录功能

<!--more-->

## 二 创建项目

执行如下指令，创建项目

```
vue create vue-demo
```

## 三 安装和配置路由

### 3.1 安装路由

```
npm install vue-router@3.5.2 -S
```

### 3.2 配置路由index.js

在src路径下新建router文件夹，并创建index.js，配置路由信息

```
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 导入样式
import './assets/css/bootstrap.css'
import './index.css'

const router = new VueRouter()

export default router
```

### 3.3 main.js中导入index.js，并设置router

```
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

```

## 四 基于路由渲染登录组件

### 4.1 导入基本的项目组件

![][1]

### 4.2 根据组件配置路由规则

```
// 导入需要的组件
import Login from '@/components/MyLogin.vue'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login }
  ]
})
```

### 4.3 App.vue中设置占位符

```
<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>
```

### 4.4 效果图
![][2]

## 五 模拟登录功能(Login.vue)

### 5.1 定义用户名和密码

```
data() {
    return {
      username: '',
      password: ''
    }
  }
```

### 5.2 绑定界面视图

用户名(密码类似)

```
<input
        type="text"
        class="form-control ml-2"
        id="username"
        placeholder="请输入登录名称"
        autocomplete="off"
        v-model.trim="username"
    />
```

### 5.3 模拟登录方法

```
methods: {
    reset() {
      this.username = ''
      this.password = ''
    },
    login() {
      if (this.username === 'admin' && this.password === 'root') {
        // 登录成功
        // 1. 存储 token
        localStorage.setItem('token', 'Bearer 123')
        // 2. 跳转到后台主页
        this.$router.push('/home')
      } else {
        // 登录失败
        localStorage.removeItem('token')
      }
    }
  }
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-74-service-manager-component-import.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-74-service-manager-component-login.png
