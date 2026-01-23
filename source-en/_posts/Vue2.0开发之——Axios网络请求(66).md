---
title: Vue2.0开发之——Axios网络请求(66)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 22be0e77
date: 2023-03-28 19:12:36
---
## 一 概述

* Axios的基本用法并存在的问题
* 把axios挂载到Vue的原型上并配置请求根路径
* 把axios挂载到Vue原型上的缺点

<!--more-->

## 二 Axios的基本用法并存在的问题

### 2.1 安装axios依赖

```
npm install axios -S   
```

### 2.2 Axios执行网络请求代码

#### App.vue

```
<template>
  <div>
    <h1>App跟组件</h1>
    <hr>
    <div class="box">
      <Left></Left>
      <Right></Right>
    </div>

  </div>
</template>

<script>
import Left from '@/components/Left.vue'
import Right from '@/components/Right.vue'

export default {
  components: {
    Left,
    Right
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
}
</style>
```

#### Left.vue

```
<template>
  <div class="left-container">
    <h3>Left组件</h3>
    <button @click="getInfo">发起Get请求</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    async getInfo () {
      const { data: res } = await axios.get('http://www.liulongbin.top:3006/api/get')
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.left-container {
  background-color: orange;
  min-height: 200px;
  flex: 1;
}
</style>
```

#### Right.vue

```
<template>
  <div class="right-container">
    <h3>Right组件</h3>
    <button @click="postInfo">发起Post请求</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    async postInfo () {
      const { data: res } = await axios.post('http://www.liulongbin.top:3006/api/post', { name: 'zs', age: 20 })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.right-container {
  background-color: skyblue;
  min-height: 200px;
  flex: 1;
}
</style>
```

### 2.3 界面效果及响应
![][1]

### 2.4 存在的问题

* 每个组件(Left、Right)都需要导入axios，然后发起请求
* 发起请求的都是完整的路径地址

## 三 把axios挂载到Vue的原型上并配置请求根路径

### 3.1 将axios挂载到Vue中(main.js)

在main.js中添加一个变量到 Vue.prototype。这样 $appName 就在所有的 Vue 实例中可用了，甚至在实例被创建之前就可以

```
import axios from 'axios'
Vue.prototype.$http = axios
```

### 3.2 使用Vue.prototype在每个Vue组件中发起请求

#### Left.vue

```
async getInfo () {
      const { data: res } = await this.$http.get('http://www.liulongbin.top:3006/api/get')
      console.log(res)
    }
```

#### Right.vue

```
async postInfo () {
      const { data: res } = await this.$http.post('http://www.liulongbin.top:3006/api/post', { name: 'zs', age: 20 })
      console.log(res)
    }
```

### 3.3 axios配置请求全路径

main.js中设置axios配置请求全路径

```
axios.defaults.baseURL = 'http://www.liulongbin.top:3006'
```

Left.vue中请求简写

```
async getInfo () {
      const { data: res } = await this.$http.get('/api/get')
      console.log(res)
    }
```

Right.vue中请求简写

```
async postInfo () {
      const { data: res } = await this.$http.post('/api/post', { name: 'zs', age: 20 })
      console.log(res)
    }
```

## 四 把axios挂载到Vue原型上的缺点

在每个vue组件中要发起请求，直接调用this.$http.xxx，但是，把axios挂载到vue原型上，有一个缺点：不利于API接口的复用
![][2]


## 五 参考

* [CSDN—安装依赖时报错：npm ERR! code ERESOLVE npm](https://blog.csdn.net/yh_31/article/details/127440247)
* [CSDN—“Component name “XXX“ should always be multi-word](https://blog.csdn.net/dxnn520/article/details/125252353)
* [CSDN—Vue中 Vue.prototype 详解及使用](https://blog.csdn.net/ZYS10000/article/details/107233453/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-66-axios-get-post-request.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-66-axios-get-post-request-question.png

