---
title: Vue2.0开发之——组件数据共享-Eventbus(39)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 62dfb34e
date: 2023-01-13 08:11:26
---
## 一 概述

* 兄弟组件之间数据共享的方案—EventBus
* EventBus的使用步骤
* EventBus的使用示例

<!--more-->

## 二 兄弟组件之间数据共享的方案—EventBus

在 vue2.x 中，兄弟组件之间数据共享的方案是EventBus。
![][1]

## 三 EventBus的使用步骤

*  创建 <font color=red>eventBus.js</font> 模块，并向外共享一个 <font color=red>Vue 的实例对象</font>
* 在数据<font color=red>发送方</font>，调用 <font color=red>bus.$emit</font>('事件名称', 要发送的数据) 方法<font color=red>触发自定义事件</font>
* 在数据<font color=red>接收方</font>，调用 <font color=red>bus.$on</font>('事件名称', 事件处理函数) 方法注册一个<font color=red>自定义事件</font>

## 四 EventBus的使用示例

### 4.1 创建Eventbus.js

```
import Vue from 'vue'

export default new Vue()
```

### 4.2 数据发送方Left.vue

```
// 1. 导入 eventBus.js 模块
import bus from './eventBus.js'
export default {
  props: ['msg', 'user'],
  data() {
    return {
      str: `黑云压城城欲摧，渚青沙白鸟飞回。借问酒家何处是，半江瑟瑟半江红！`
    }
  },
  methods: {
    send() {
      // 2. 通过 eventBus 来发送数据
      bus.$emit('share', this.str)
    }
  }
}
```

布局内容

```
<button @click="send">把好诗发给 Right</button>
```

### 4.3 数据接收方Right.vue

```
// 1. 导入 eventBus.js 模块
import bus from './eventBus.js'

export default {
  data() {
    return {
      // 子组件自己的数据，将来希望把 count 值传给父组件
      count: 0,
      msgFromLeft: ''
    }
  },
  created() {
    // 2. 为 bus 绑定自定义事件
    bus.$on('share', val => {
      console.log('在 Right 组件中定义的 share 被触发了！', val)
      this.msgFromLeft = val
    })
  },
  methods: {
    add() {
      // 让子组件的 count 值自增 +1
      this.count += 1
      // 把自增的结果，传给父组件
      this.$emit('numchange', this.count)
    }
  }
}
```

布局内容

```
<template>
  <div class="right-container">
    <h3>Right 组件 --- {{ count }}</h3>
    <button @click="add">+1</button>
    <hr />
    <p>{{ msgFromLeft }}</p>
  </div>
</template>
```

### 4.4 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-39-relates-components-eventbus.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-39-relates-eventbus-sample.gif