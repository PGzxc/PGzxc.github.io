---
title: Vue2.0开发之——Vue组件-使用组件的三个步骤(32)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: d3d57326
date: 2022-12-08 08:32:46
---
## 一 概述

* 组件之间的父子关系
* 使用组件的三个步骤
* 使用组件示例

<!--more-->

## 二 组件之间的父子关系

![][1]

说明：

* 组件在被封装好之后，<font color=red>彼此之间是相互独立的</font>，不存在父子关系
* 在<font color=red>使用组件</font>的时候，<font color=red>根据彼此的嵌套关系</font>，形成了父子关系、兄弟关系

## 三 使用组件的三个步骤

### 3.1 步骤1：使用 import 语法导入需要的组件

```
import Left from '@/components/Left.vue'
```

### 3.2 步骤2：使用 components 节点注册组件

```
export default {
  components: {
    Left,
  }
}
```

### 3.3  步骤3：以标签形式使用刚才注册的组件

```
<div class="box">
     <Left></Left>
</div>
```

## 四 使用组件示例

### 4.1 在src/components目录下如下组件文件

```
left.vue
right.vue
```

### 4.2 在App.vue中使用Left.vue和Right.vue

1-srcipt中导入

```
<script>
// 1. 导入需要使用的 .vue 组件
import Left from '@/components/Left.vue'
import Right from '@/components/Right.vue'
import Test from '@/components/Test.vue'

export default {
  // 2. 注册组件
  components: {
    Left,
    Right,
  }
}
</script>
```

2-布局文件中使用

```
<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <div class="box">
      <Left></Left>
      <Right></Right>
    </div>
  </div>
</template>
```

### 4.3 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-32-component-relate.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-32-component-left-right.png