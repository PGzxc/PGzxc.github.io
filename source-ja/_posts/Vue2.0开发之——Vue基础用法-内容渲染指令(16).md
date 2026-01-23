---
title: Vue2.0开发之——Vue基础用法-内容渲染指令(16)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 813b84ae
date: 2022-11-08 10:26:27
---
## 一 概述

* 指令的概念
* 内容渲染指令介绍

<!--more-->

## 二 指令的概念

指令(Directives)是vue为开发者提供的模板语法，用于辅助开发者渲染页面的基本结构

vue中的指令按照不同的用途，可以分为如下6大类

1. 内容渲染指令
2. 属性绑定指令
3. 事件绑定指令
4. 双向绑定指令
5. 条件渲染指令
6. 列表渲染指令

## 三 内容渲染指令介绍

内容渲染指令用于辅助开发者渲染DOM元素的文本内容。常用的内容渲染指令有如下3个：

* v-text
* 插值表达式
* v-html

### 3.1 v-text

#### 代码

```
<body>
    <div id="app">
        <p v-text="username"></p>
        <p v-text="gender">性别：</p>
    </div>
</body>
```

#### 效果图
![][1]

#### 缺点 
会覆盖元素内默认的内容

### 3.2 插值表达式语法

#### 插值表达式语法说明

vue提供的插值表达式语法，专门用来解决v-text会覆盖默认文本内容的问题。这种{ {} }语法的专业名称是插值表达式(英文名为：Mustache)

#### 代码

```
<div id="app">
    <p>姓名：{{username}}</p>
    <p>性别：{{gender}}</p>
</div>
```

#### 效果图
![][2]

### 3.3 v-html

#### 语法说明

<font color=red>v-text</font>指令和<font color=red>插值表达式</font>只能渲染<font color=red>纯文本内容</font>。如果要把<font color=red>包含HTML标签的字符串</font>渲染为页面的HTML元素。则需要用到v-html这个指令。

#### 代码

```
<div id="app">
     <p v-html="info"></p>
</div>
```

#### 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-16-v-text.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-16-mustache.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-16-v-html.png