---
title: Vue2.0开发之——后台管理系统—案例3(76)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 6d98aff5
date: 2023-03-31 09:01:55
---
## 一 概述

* 点击进入用户详情页
* 路由path的注意点
* 如何控制页面的权限

<!--more-->

## 二 点击进入用户详情页

### 2.1 MyUsers.vue用户详情页设置

用户列表数据

```
userlist: [
        { id: 1, name: '嬴政', age: 18, position: '始皇帝' },
        { id: 2, name: '李斯', age: 35, position: '丞相' },
        { id: 3, name: '吕不韦', age: 50, position: '商人' },
        { id: 4, name: '赵姬', age: 48, position: '王太后' }
      ]
```

用户数据渲染

```
<tr v-for="item in userlist" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.position }}</td>
        <td>
            <a href="#" @click.prevent="gotoDetail(item.id)">详情</a>
         </td>
</tr>
```

跳转用户详情

```
gotoDetail(id) {
      //   /home/userinfo/1
      //   /home/userinfo/2
      //   /home/userinfo/3
      this.$router.push('/home/userinfo/' + id)
    }
```

### 2.2 index.js导入用户详情页，并设置路由规则

```
import UserDetail from '@/components/user/MyUserDetail.vue'

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
        { path: 'settings', component: Settings },
        { path: 'userinfo/:id', component: UserDetail, props: true }
      ]
    }
  ]
})
```

### 2.3 MyUserDetail.vue设置用户返回

```
<template>
  <div>
    <button type="button" class="btn btn-light btn-sm" @click="$router.back()">后退</button>
    <h4 class="text-center">用户详情 --- {{ id }}</h4>
  </div>
</template>

<script>
export default {
  name: 'MyUserDetail',
  props: ['id']
}
</script>
```

### 2.4 效果图

![][1]

## 三 路由path的注意点

### 3.1 问题说明

初次登录后，未选择任何左侧标签，右侧内容区域未显示内容

### 3.2 解决办法

home路由规则设置redirect

```
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/home/users',
      children: [
        { path: 'users', component: Users },
        { path: 'rights', component: Rights },
        { path: 'goods', component: Goods },
        { path: 'orders', component: Orders },
        { path: 'settings', component: Settings },
        { path: 'userinfo/:id', component: UserDetail, props: true }
      ]
    }
  ]
})
```

## 四 如何控制页面的权限

### 4.1 问题说明

* 退出后，home页面设置了全局前置守卫，未登录跳转到login登录页面
* home页面的其他标签，也具有同样的效果
* 将具有同样规则的路径，定义到一个数组中，逐一判断

### 4.2 设置数组pathArr.js

```
export default ['/home', '/home/users', '/home/rights']
```

### 4.3 index.js中前置守卫

```
router.beforeEach(function(to, from, next) {
  if (pathArr.indexOf(to.path) !== -1) {
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



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-76-service-manager-userinfo-jump.gif

