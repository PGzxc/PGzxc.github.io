---
title: Vue2.0开发之——Vue基础用法-使用JavaScript表达式(18)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: e7abb2e3
date: 2022-11-10 22:05:22
---
## 一 概述

在vue提供的模板渲染语法中，除了支持绑定简单的数据外，还支持JavaScript表达式的运算

```
{ {number+1} }
{ {ok?'YES':'NO'} }
{ {message.split('').reverse().join('')} }
<div v-bind:id="'list-'+id"></div>
```

<!--more-->

## 二 JavaScript表达式

### 2.1 { {number+1} }

代码

```
<div id="app">
     <div>1+2的结果是：{ {1+2} }</div>
</div>
```

效果图

![][1]

### 2.2 { {ok?'YES':'NO'} }

代码

```
<div id="app">
      <div>{ {ok?'YES':'NO'} }</div>
</div>
const vm = new Vue({
    el:'#app',
    data:{
        ok:true,
    }
   })
```

效果图
![][2]

### 2.3 { {message.split('').reverse().join('')} }

代码

```
<div id="app">
     <div>{ {tips} }反转的结果是：{ {tips.split('').reverse().join('')} }</div>
</div>
```

效果图
![][3]

### 2.4 \<div v-bind:id="'list-'+id">\</div>

代码

```
<div id="app">
     <div v-bind:title="'box'+index">这是一个div</div>
 </div>
const vm = new Vue({
    el:'#app',
    data:{
        ok:true,
        tips:'请输入用户名',
        index:3,
    }
   })
```

效果图

![][4]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-18-add-func.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-18-ok-no.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-18-reverse.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-18-div-add.png