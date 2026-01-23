---
title: Vue2.0开发之——Vue组件-组件的基本使用(31)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: aa4f0a3f
date: 2022-12-06 15:59:26
---
## 一 概述

* Vue组件—组件化开发
* Vue组件—组件的三个组成部分
* Vue组件—示例

<!--more-->

### 二 Vue组件—组件化开发
### 2.1 什么是组件化开发

<font color=red>组件化开发</font>指的是：根据<font color=red>封装</font>的思想，<font color=red>把页面上可重用的 UI 结构封装为组件</font>，从而方便项目的开发和维护。

### 2.2 vue 中的组件化开发

* vue 是一个<font color=red>支持组件化开发</font>的前端框架。
* vue 中规定：<font color=red>组件的后缀名</font>是<font color=red>.vue</font>。之前接触到的 App.vue 文件本质上就是一个 vue 的组件。

## 三 Vue组件—组件的三个组成部分

每个 .vue 组件都由 3 部分构成，分别是：

* <font color=red>template</font> -> 组件的<font color=red>模板结构</font>
* <font color=red>script</font> -> 组件的 <font color=red>JavaScript 行为</font>
* <font color=red>style</font> -> 组件的<font color=red>样式</font>

其中，每个组件中必须包含 template 模板结构，而 script 行为和 style 样式是可选的组成部分。

### 3.1 template

vue 规定：每个组件对应的<font color=red>模板结构</font>，需要定义到<font color=red>\<template> 节点</font>中

```
<template>
	<!--当前组件的DOM结构，需要定义到template标签的内部-->
</template>
```

主意：

* template是vue提供的<font color=red>容器标签</font>，只起到<font color=red>包裹性质的作用</font>，它不会被渲染为真正的DOM元素
* template中只能包含唯一的根节点

###  3.2 script

vue 规定：开发者可以在 \<script> 节点中<font color=red>封装组件的 JavaScript 业务逻辑</font>
\<script > 节点的基本结构如下

```
<script>
  //今后，组件相关的data数据、methods方法等，都需要定义到meport default 所导出的对象中
</script>
```

**.vue 组件中的 data 必须是函数**

vue 规定：.vue 组件中的 data <font color=red>必须是一个函数</font>，<font color=red>不能</font>直接<font color=red>指向一个数据对象</font>。
因此在组件中定义 data 数据节点时，下面的方式是错误的

```
data:{ //组件中，不能直接让data指向一个数据对象(会报错)
	count:0
}
```

会导致<font color=red>多个组件实例</font>共用<font color=red>同一份数据</font>的问题，请参考官方给出的示例：

https://cn.vuejs.org/v2/guide/components.html#data-必须是一个函数

### 3.3  style

vue 规定：组件内的 \<style> 节点是<font color=red>可选的</font>，开发者可以在 \<style> 节点中<font color=red>编写样式美化当前组件的 UI 结构</font>
\<script > 节点的基本结构如下：

```
<style>
h1{
  font-weight:normal;
}
</style>
```

让 style 中支持 <font color=red>less 语法</font>

在 \<style> 标签上添加<font color=red> lang="less" </font>属性，即可使用 less 语法编写组件的样式

```
<sytle lang="less">
h1{
  font-weight:normal;
  span{
  	color:red;
  }
}
</style>
```

## 三  Vue组件—示例

### 3.1 template

```
<template>
  <div>
    <div class="test-box">
      <h3>这是用户自定义的 Test.vue --- {{ username }}</h3>
      <button @click="chagneName">修改用户名</button>
    </div>
    <div>123</div>
  </div>
</template>
```

### 3.2 script

```
<script>
// 默认导出。这是固定写法！
export default {
  // data 数据源
  // 注意：.vue 组件中的 data 不能像之前一样，不能指向对象。
  // 注意：组件中的 data 必须是一个函数
  data() {
    // 这个 return 出去的 { } 中，可以定义数据
    return {
      username: 'admin'
    }
  },
  methods: {
    chagneName() {
      // 在组件中， this 就表示当前组件的实例对象
      console.log(this)
      this.username = '哇哈哈'
    }
  },
  // 当前组件中的侦听器
  watch: {},
  // 当前组件中的计算属性
  computed: {},
  // 当前组件中的过滤器
  filters: {}
}
</script>
```

### 3.3 style

```
<style lang="less">
.test-box {
  background-color: pink;
  h3 {
    color: red;
  }
}
</style>
```

### 3.4 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-31-vue-component-sample.gif