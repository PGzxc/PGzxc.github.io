---
title: Vue2.0开发之——Vue基础用法-侦听器(27)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 7012f1b0
date: 2022-11-25 09:13:20
---
## 一 概述

* 侦听器-判断用户名是否被暂用
* 侦听器-immediate选项
* 侦听器-deep选项

<!--more-->

## 二 侦听器-判断用户名是否被暂用

### 2.1 什么是watch侦听器

<font color=red>watch 侦听器</font>允许开发者监视数据的变化，从而<font color=red>针对数据的变化做特定的操作</font>

### 2.2 侦听器示例

布局代码

```
<div id="app">
    <input type="text" v-model="username">
</div>
```

vue代码

```
const vm = new Vue({
      el: '#app',
      data: {
        username: ''
      },
      // 所有的侦听器，都应该被定义到 watch 节点下
      watch: {
        // 新值在前，旧值在后
        username(newVal,oldVal){
          console.log(newVal,oldVal)
        }
      }
})
```

### 2.3 使用watch检测用户名是否可用

监听 username 值的变化，并使用 axios 发起 Ajax 请求，<font color=red>检测当前输入的用户名是否可用</font>

```
const vm = new Vue({
      el: '#app',
      data: {
        username: ''
      },
      watch: {
      async username(newVal) {
          if (newVal === '') return
          // 1. 调用 jQuery 中的 Ajax 发起请求，判断 newVal 是否被占用！！！
          $.get('https://www.escook.cn/api/finduser/' + newVal, function (result) {
            console.log(result)
          })
        }
      }
    })
```

## 三 侦听器-immediate选项

### 3.1 侦听器格式

* 方法格式的侦听器：无法在刚进入页面的时候，自动触发
* 对象格式的侦听器：可以通过**Immediate**选项，让侦听器自动触发

### 3.2 侦听器-immediate示例

```
const vm = new Vue({
      el: '#app',
      data: {
        username: 'admin'
      },
      watch: {
        username: {
          handler(newVal, oldVal) {
            console.log(newVal, oldVal)
          },
          // immediate 选项的默认值是 false
          immediate: true
        }
      }
 })
```

## 四 侦听器-deep选项

### 4.1 侦听器格式

* 方法格式的侦听器：如果侦听的是一个对象，如果对象中的属性发生了变化，不会触发侦听器
* 对象格式的侦听器：可以通过deep选项，让侦听器深度监听对象中每个属性的变化

### 4.2 侦听器-deep示例

布局代码

```
<div id="app">
    <input type="text" v-model="info.username">
</div>
```

vue代码

```
const vm = new Vue({
      el: '#app',
      data: {
        // 用户的信息对象
        info: {
          username: 'admin',
      },
      watch: {
         info: {
          handler(newVal) {
            console.log(newVal)
          },
          deep: true
        } 
      }
 })
```

### 4.2  监听对象单个属性的变化

如果<font color=red>只想监听对象中单个属性的变化</font>，则可以按照如下的方式定义 watch 侦听器

布局代码

```
<div id="app">
    <input type="text" v-model="info.username">
</div>
```

vue代码

```
const vm = new Vue({
      el: '#app',
      data: {
        // 用户的信息对象
        info: {
          username: 'admin',
        }
      },
      watch: {
        // 如果要侦听的是对象的子属性的变化，则必须包裹一层单引号
        'info.username'(newVal) {
          console.log(newVal)
        }
      }
    })
```

