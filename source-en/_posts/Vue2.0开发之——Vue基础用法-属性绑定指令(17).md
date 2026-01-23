---
title: Vue2.0开发之——Vue基础用法-属性绑定指令(17)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 90cf7ee
date: 2022-11-09 11:03:45
---
## 一 概述

* 属性绑定指令介绍
* 属性绑定指令示例

<!--more-->

## 二 属性绑定指令介绍

* 如果需要为<font color=red>元素的属性</font>动态绑定<font color=red>属性值</font>，则需要用到<font color=red>v-bind</font>属性绑定指令。
* 用法示例：v-bind:placeholder="tips"
* v-bind可以省略，:placeholder="tips"

## 三 属性绑定指令示例

### 3.1 代码

```
<div id="app">
      <input type="text" v-bind:placeholder="tips">
      <hr>
      <img :src="photo" alt="" style="width: 100px;">
</div>
<script>
   const vm = new Vue({
    el:'#app',
    data:{
        tips:'请输入用户名',
        photo:'https://v2.vuejs.org/images/logo.svg'
    }
   })
</script>
```

### 3.2 效果图

![][1]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-17-v-bind-view.png