---
title: Vue2.0开发之——Vue基础用法-条件渲染指令(23)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 5d52cfab
date: 2022-11-19 10:49:26
---
## 一 概述

* 条件渲染指令—v-if和v-show
* v-else
* v-else-if

<!--more-->

## 二 条件渲染指令—v-if和v-show

### 2.1 条件渲染指令

条件渲染指令用来辅助开发者按需控制 DOM 的显示与隐藏。条件渲染指令有如下两个，分别是：

* v-if
* v-show

### 2.2 示例

布局代码

```
<div id="app">
      <p v-if="flag">这是被v-if控制的元素</p>
      <p v-show="flag">这是被v-show控制的元素</p>
</div>
```

数据代码

```
data:{
      flag:false
}
```

效果图

![][1]

### 2.3 v-if和v-show的区别

flag=false，布局隐藏时

![][2]

实现原理不同：

* v-if 指令会动态地创建或移除 DOM 元素，从而控制元素在页面上的显示与隐藏；
* v-show 指令会动态为元素添加或移除 style="display: none;" 样式，从而控制元素的显示与隐藏；

性能小号不同：

v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此：

* 如果需要非常频繁地切换，则使用 v-show 较好
*  如果在运行时条件很少改变，则使用 v-if 较好

## 三 v-else

v-if 可以单独使用，或配合 v-else 指令一起使用：

代码

```
<div id="app">
     <div v-if="Math.random()>0.5">
        随机数大于0.5
     </div> 
     <div v-else>
        随机数小于或等于0.5
     </div> 
</div>
```

注意：v-else 指令必须配合 v-if 指令一起使用，否则它将不会被识别！

## 四 v-else-if

v-else-if 指令，顾名思义，充当 v-if 的“else-if 块”，可以连续使用：

布局代码

```
<div id="app">
      <div v-if="type==='A'">优秀</div> 
      <div v-else-if="type==='B'">良好</div> 
      <div v-else-if="type==='C'">一般</div> 
      <div v-else>差</div> 
</div>
```

数据代码

```
data:{
      type:'A'
 }
```

效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-23-v-if-show-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-23-v-if-show-diff.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-23-v-else-if-sample.gif