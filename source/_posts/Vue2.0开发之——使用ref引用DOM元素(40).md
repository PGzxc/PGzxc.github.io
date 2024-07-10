---
title: Vue2.0开发之——使用ref引用DOM元素(40)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: ac79c0de
date: 2023-02-25 17:52:03
---
## 一 概述

* 什么是ref引用
* ref引用示例

<!--more-->

## 二 什么是ref引用

* ref用来辅助开发者在<font color=red>不依赖于jQuery的情况下</font>，获取DOM元素或组件的引用
* 每个vue的组件实例上，都包含一个<font color=red>$refs对象</font>，里面存储着对应的DOM元素或组件的应用
* 默认情况下，<font color=red>组件的$refs指向一个空对象</font>

## 三 ref引用示例

### 3.1 打印this内容

模板内容

```
<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <button @click="showThis">打印this</button>
    <hr>
    <div class="box">
    </div>
  </div>
</template>
```

代码逻辑

```
export default {
  methods:{
    showThis(){
      console.log(this)
    }
  },
}
```

打印内容this.refs

![][1]

### 3.2 带DOM元素的内容打印

模板内容(给h1添加ref)

```
<h1 ref="myh1">App 根组件</h1>
```

打印内容this.refs
![][2]

### 3.3 通过ref改变DOM内容

代码逻辑

```
methods:{
    showThis(){
      //console.log(this)
      this.$refs.myh1.style.color='red'
    }
  },
```

内容显示
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/web2.0-40-ref-vuecomponent-print-null.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/web2.0-40-ref-vuecomponent-print-h1.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/web2.0-40-ref-vuecomponent-change-dom.gif