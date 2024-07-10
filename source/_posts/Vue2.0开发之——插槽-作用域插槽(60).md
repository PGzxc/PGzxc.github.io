---
title: Vue2.0开发之——插槽-作用域插槽(60)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: e5086dd4
date: 2023-03-23 13:55:59
---
## 一 概述

* 作用域插槽概念
* 作用域插槽的基本用法
* 解构插槽Prop

<!--more-->

## 2.1 作用域插槽概念

* 在封装组件的过程中，可以为预留的 \<slot> 插槽绑定 props 数据
* 这种<font color=red>带有 props 数据的 \<slot></font> 叫做“<font color=red>作用域插槽</font>”

## 三 作用域插槽的基本用法

可以使用 v-slot: 的形式，接收作用域插槽对外提供的数据

### 3.1 Article.vue中，给conent定义内容

```
<div class="content-box">
     <slot name="content" msg="hello vue.js"></slot>
</div>
```

### 3.2 App.vue中接收内容

```
<template #content="scope">
        <p>豫章故郡，洪都信服</p>
        <p>星分翼轸，地接衡庐</p>
        <p>襟三江而带五湖，控蛮荆而引瓯越</p>
        <p>{{ scope.msg }}</p>
</template>
```

说明：`#content`是`v-slot:`的简写形式

### 3.3 效果图—打印msg内容

![][1]

## 四 解构插槽Prop

### 4.1 一般定义传值的过程

Article.vue中定义数据

```
export default {
  name: 'Article',
  data() {
    return {
      // 用户的信息对象
      userinfo: {
        name: 'zs',
        age: 20
      }
    }
  }
}
```

Article.vue中传递数据对象

```
<div class="content-box">
      <slot name="content" msg="hello vue.js" :user="userinfo"></slot>
 </div>
```

App.vue中接收数据对象

```
<template #content="scope">
        <p>豫章故郡，洪都信服</p>
        <p>星分翼轸，地接衡庐</p>
        <p>襟三江而带五湖，控蛮荆而引瓯越</p>
        <p>{{ scope }}</p>
</template>
```

效果图

![][2]

### 4.2 解构赋值

```
<template #content="{msg,user}">
        <p>豫章故郡，洪都信服</p>
        <p>星分翼轸，地接衡庐</p>
        <p>襟三江而带五湖，控蛮荆而引瓯越</p>
        <p>{{ msg }}</p>
        <p>用户名：{{ user.name}} ，用户年龄：{{ user.age }} </p>
</template>
```

解构赋值效果图
![][3]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-60-solt-scope-msg.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-60-solt-scope-user.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-60-solt-scope-user-xigou.png

