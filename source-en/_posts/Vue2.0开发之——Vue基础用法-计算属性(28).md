---
title: Vue2.0开发之——Vue基础用法-计算属性(28)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 7e50857d
date: 2022-11-29 09:18:57
---
## 一 概述

* 计算属性-概述
* 计算属性-默认方式
* 计算属性-改造

<!--more-->

## 二 计算属性-概述

### 2.1 什么是计算属性

* 计算属性指的是<font color=red>通过一系列运算</font>之后，最终得到一个属性值。
* <font color=red>这个动态计算出来的属性值</font>可以被模板结构或 methods 方法使用

计算属性示例代码

```
var vm = new Vue({
      el: '#app',
      data: {
        r: 0,
        g: 0,
        b: 0
      },
      methods: {
        show() {
          console.log(this.rgb)
        }
      },
      computed: {
        rgb() {
          return `rgb(${this.r}, ${this.g}, ${this.b})`
        }
      }
    });
```

### 2.2 计算属性的特点

* 虽然计算属性在<font color=red>声明的时候</font>被定义为<font color=red>方法</font>，但是计算属性的<font color=red>本质是一个属性</font>
* 计算属性会<font color=red>缓存计算的结果</font>，只有计算属性<font color=red>依赖的数据变化</font>时，才会重新进行运算

## 三 计算属性-默认方式

### 3.1 布局代码

```
 <div id="app">
    <div>
      <span>R：</span>
      <input type="text" v-model.number="r">
    </div>
    <div>
      <span>G：</span>
      <input type="text" v-model.number="g">
    </div>
    <div>
      <span>B：</span>
      <input type="text" v-model.number="b">
    </div>
    <hr>
    <div class="box" :style="{ backgroundColor: `rgb(${r}, ${g}, ${b})` }">
      {{ `rgb(${r}, ${g}, ${b})` }}
    </div>
    <button @click="show">按钮</button>
  </div>
```

### 3.2 vue代码

```
var vm = new Vue({
      el: '#app',
      data: {
        r: 0,
        g: 0,
        b: 0
      },
      methods: {
        show() {
          console.log(`rgb(${this.r}, ${this.g}, ${this.b})`)
        }
      },
    });
```

### 3.3 效果图

![][1]

## 四 计算属性-改造

### 4.1 布局代码

```
<body>
  <div id="app">
    <div>
      <span>R：</span>
      <input type="text" v-model.number="r">
    </div>
    <div>
      <span>G：</span>
      <input type="text" v-model.number="g">
    </div>
    <div>
      <span>B：</span>
      <input type="text" v-model.number="b">
    </div>
    <hr>
    <div class="box" :style="{ backgroundColor: rgb }">
      {{ rgb }}
    </div>
    <button @click="show">按钮</button>
  </div>
```

### 4.2 vue代码

```
var vm = new Vue({
      el: '#app',
      data: {
        r: 0,
        g: 0,
        b: 0
      },
      methods: {
        show() {
          console.log(this.rgb)
        }
      },
      computed: {
        rgb() {
          return `rgb(${this.r}, ${this.g}, ${this.b})`
        }
      }
 });
```

### 4.3 效果图

![][1]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-28-computer-normal-sample.gif