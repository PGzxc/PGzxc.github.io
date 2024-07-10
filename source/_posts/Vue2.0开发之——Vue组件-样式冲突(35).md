---
title: Vue2.0开发之——Vue组件-样式冲突(35)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 5a7eb9f9
date: 2022-12-16 08:37:31
---
## 一 概述

* scoped的使用及底层原理
* 使用deep修改子组件中的样式

<!--more-->

## 二 scoped的使用及底层原理

### 2.1 组件之间的样式冲突问题(修改Left.vue中的h3属性，Right也被修改)

![][1]

默认情况下，<font color=red>写在 .vue 组件中的样式会全局生效</font>，因此很容易造成<font color=red>多个组件之间的样式冲突问题</font>

导致组件之间样式冲突的根本原因是:

* 单页面应用程序中，所有组件的 DOM 结构，都是基于<font color=red>唯一的 index.html 页面</font>进行呈现的
* 每个组件中的样式，都会影响<font color=red>整个 index.html 页面</font>中的 DOM 元素

### 2.2 如何解决组件样式冲突的问题

为每个组件<font color=red>分配唯一的自定义属性</font>，在编写组件样式时，通过<font color=red>属性选择器</font>来控制<font color=red>样式的作用域</font>

#### Left.vue

布局代码

```
<template>
  <div class="left-container" data-v-001>
    <h3 data-v-001>Left 组件</h3>
    <hr data-v-001/>

    <MyCount :init="9" data-v-001></MyCount>
  </div>
</template>
```

样式文件修改

```
h3[data-v-001] {
  color: red;
}
```

#### Right.vue

```
<template>
  <div class="right-container" data-v-002>
    <h3 data-v-002>Right 组件</h3>
    <hr data-v-002 />

    <MyCount :init="6" data-v-002></MyCount>
  </div>
</template>
```

#### 效果图(只修改Left的h3颜色)

![][2]

### 2.3 style 节点的 scoped 属性

为了提高开发效率和开发体验，vue 为 <font color=red>style 节点</font>提供了 <font color=red>scoped</font> 属性，从而防止组件之间的样式冲突问题：

布局代码

```
<template>
  <div class="left-container">
    <h3 >Left 组件</h3>
    <hr/>

    <MyCount :init="9"></MyCount>
  </div>
</template>
```

样式文件

```
<style lang="less" scoped >
h3 {
  color: red;
}
</style>
```

效果图同2

![][2]

## 三 使用deep修改子组件中的样式

### 3.1 冲突现象

在Left.vue中设置如下代码(给h5设置背景颜色)，没有生效，现象同2

```
h5 {
  color: pink;
}
```

![][2]

### 3.2  /deep/ 样式穿透

如果给当前组件的 style 节点添加了 scoped 属性，则<font color=red>当前组件的样式对其子组件是不生效的</font>。如果想让某些样 式对子组件生效，可以使用<font color=red> /deep/ 深度选择器</font>

样式文件添加/deep/

```
/deep/ h5 {
  color: pink;
}
```

效果图
![][3]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-35-conflict-left-all-show.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-35-confict-data-v-value.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-35-conflict-deep-efect.png

