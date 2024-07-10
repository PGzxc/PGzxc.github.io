---
title: Vue2.0开发之——Vue组件-注册全局组件(33)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 6aed814e
date: 2022-12-09 08:35:51
---
## 一 概述

* 通过 components 注册的是私有子组件
* 注册全局组件

<!--more-->

## 二 通过 components 注册的是私有子组件

### 2.1 组件A、F、C关系图

![][1]

### 2.2 私有子组件

* 在<font color=red>组件 A</font> 的 components 节点下，注册了<font color=red>组件 F</font>
* 则组件 F 只能用在组件 A 中；不能被用在<font color=red>组件 C</font> 中

### 2.3 请大家思考两个问题：

* ① 为什么 F 不能用在组件 C 中？
* ① 为什么 F 不能用在组件 C 中？

## 三 注册全局组件

### 3.1 注册全局组件

在 vue 项目的 main.js 入口文件中，通过 Vue.component() 方法，可以注册全局组件

```
import Count from './components/Count.vue'
//import Count from '@/components/Count.Vue'

Vue.component('MyCount',Count)
```

说明：

* Count：为导入需要全局注册的组件
* vue.component有两个参数：
  * 第一个参数：字符串格式，表示组件的“注册名称”
  * 第二个参数：需要被全局注册的那个组件

### 3.2 使用全局注册组件

#### Left.vue中使用

```
<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <hr />
    <MyCount></MyCount>
  </div>
</template>
```

#### Right.vue中使用

```
<template>
  <div class="right-container">
    <h3>Right 组件</h3>
    <hr />

    <MyCount></MyCount>
  </div>
</template>
```

### 3.3 效果图
![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-33-components-private-ac.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-33-component-whole-preview.png