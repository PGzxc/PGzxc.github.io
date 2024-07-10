---
title: Vue2.0开发之——路由—导航守卫(73)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 250b1150
date: 2023-03-30 11:54:03
---
## 一 概述

* 什么是导航守卫
* 导航守卫的基本用法
* next函数的三种调用方式
* 控制访问权限示例

<!--more-->

## 二 什么是导航守卫

<font color=red>导航守卫</font>可以<font color=red>控制路由的访问权限</font>。示意图如下：

![][1]

## 三 导航守卫的基本用法

### 3.1 全局前置守卫

* 假如现在我们想要在某一个应用程序主页面点击对应路由链接跳转到后台的管理系统
* 那么这时<font color=red>路由守卫</font>就起到了一个检测的作用
* 路由守卫的名字起的很形象，它其实就是充当了一个'保安'的职责
* 只有你登录成功了，在localStorage本地存储中的token有值，守卫才会让你进入后台的管理系统
* 如果没有路由守卫-不能控制访问权限的话，任何人点击路由链接就会跳转到后台管理系统了，而最常使用的路由守卫就是全局前置守卫了 ---相当于一个'门神'

### 3.2 设置导航跳转

每次发生路由的<font color=red>导航跳转</font>时，都会触发<font color=red>全局前置守卫</font>。因此，在全局前置守卫中，程序员可以对每个路由进行<font color=red>访问权限</font>的控制

**index.js中设置如下**

```
//创建路由实例对象
const router = new VueRouter({...})
//调用路由实例对象的beforeEach方法，即可声明"全局前置守卫"
//每次发生路由导航跳转的时候，都会自动触发function这个"回调函数"
router.beforeEach(function () {})
```

### 3.3 守卫方法的 3 个形参

<font color=red>全局前置守卫</font>的回调函数中接收 3 个形参，格式为：

```
router.beforeEach(function (to, from, next) {
 next()
//to是将要访问的路由的信息对象
//from是将要离开的路由的信息对象
//next是一个函数，调用next()表示放行，允许这次路由导航

})
```

## 四 next函数的三种调用方式

考示意图，分析 next 函数的 3 种调用方式最终导致的结果

![][2]

示例图示说明：

* 当前用户<font color=red>拥有</font>后台主页的访问权限，直接放行：next()
* 当前用户<font color=red>没有</font>后台主页的访问权限，<font color=red>强制其跳转到登录页面</font>：next('<font color=red>/login</font>')
* 当前用户<font color=red>没有</font>后台主页的访问权限，<font color=red>不允许跳转到后台主页</font>：next(<font color=red>false</font>)

## 五  控制访问权限示例

### 5.1 新建Main.vue后台主页

```
<template>
    <div>
        <h3>Main后台主页，未登录不允许访问！</h3>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped></style>
```

### 5.2 新建Login.vue登录页面

```
<template>
    <div>
        <h3>Login登录页面</h3>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped></style>
```

### 5.3 index.js中路由配置

```
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/main', component: Main },
    { path: '/login', component: Login },
    { path: '/movie/:mid', component: Movie, props: true },
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

### 5.4 Home.vue中新建点击跳转Main后台页面按钮

```
<router-link to="/main">访问后台主页</router-link>
```

### 5.5 beforeEach守卫方法

逻辑分析：

```
1 要拿到用户将要访问的hash地址
2 判断hash地址是否等于/main
2.1如果等于/main，证明需要登录之后，才能访问成功
2.2 如果不等于/main，则不需要登录，直接放行next()
3 如果访问的地址是/main。则需要读取localStorage中的token值
3.1如果有token，则放行
3.2 如果没有token，则强制跳转到/login登录页
```

根据逻辑分析代码如下

```
router.beforeEach(function (to, from, next) {
  if (to.path === '/main') {
    // 要访问后台主页，需要判断是否有token
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      // 没有登录，强制跳转登录页
      next('/login')
    }
  } else {
    next()
  }
})
```

### 5.6 效果图

没有token时，跳转登录页

![][3]

有token时，跳转Main主页
![][4]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-73-route-nav-login-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-73-route-nav-next-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-73-route-nav-login-token-no.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-73-route-nav-login-token-yes.png