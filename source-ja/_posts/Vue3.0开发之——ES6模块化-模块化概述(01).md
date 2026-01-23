---
title: Vue3.0开发之——ES6模块化-模块化概述(01)
categories:
  - 开发
  - C-前端开发
  - Vue3
tags:
  - Vue3
abbrlink: caa9ac5a
date: 2023-04-05 11:36:40
---
## 一 概述

* node.js中如何实现模块化
* 前端模块化规范的分类
* 什么是ES6模块化
* 在node.js中体验ES6模块化

<!--more-->

## 二 node.js中如何实现模块化

### 2.1 CommonJS的模块化规范

node.js 遵循了 <font color=red>CommonJS</font> 的模块化规范。其中

* 导入其它模块使用<font color=red>require()</font> 方法
* 模块对外共享成员使用<font color=red>module.exports</font> 对象

### 2.2 模块化的好处

大家都遵守同样的模块化规范写代码，降低了沟通的成本，极大方便了各个模块之间的相互调用，利人利己

## 三 前端模块化规范的分类

### 3.1 ES6之前的模块化规范

在 <font color=red>ES6 模块化规范</font>诞生之前，JavaScript 社区已经尝试并提出了 <font color=red>AMD</font>、<font color=red>CMD</font>、<font color=red>CommonJS</font> 等模块化规范

### 3.2 ES6之前的模块化存在的问题

但是，这些由社区提出的模块化标准，还是存在一定的<font color=red>差异性</font>与<font color=red>局限性</font>、并不是浏览器与服务器<font color=red>通用的模块化标准</font>，例如

* AMD 和 CMD 适用于<font color=red>浏览器端</font>的 Javascript 模块化
* CommonJS 适用于<font color=red>服务器端</font>的 Javascript 模块化

太多的模块化规范给开发者增加了学习的难度与开发的成本。因此，大一统的ES6 模块化规范诞生了！

## 四 什么是ES6模块化

### 4.1 ES6模块化规范

* <font color=red>ES6 模块化规范</font>是<font color=red>浏览器端</font>与<font color=red>服务器端</font>通用的模块化开发规范。
* 它的出现极大的降低了前端开发者的模块化学习成本，开发者不需再额外学习 AMD、CMD 或 CommonJS 等模块化规范

### 4.2 ES6 模块化规范中定义

* 每个 js 文件都是一个独立的模块
* 导入其它模块成员使用<font color=red> import</font> 关键字
* 向外共享模块成员使用 <font color=red>export</font> 关键字

## 五 在node.js中体验ES6模块化

### 5.1 体验ES6模块化配置

node.js 中<font color=red>默认仅支持 CommonJS 模块化规范</font>，若想基于 node.js 体验与学习 ES6 的模块化语法，可以按照如下两个步骤进行配置：

* 确保安装了 <font color=red>v14.15.1</font> 或更高版本的 node.js
* 在 package.json 的根节点中添加 <font color=red>"type": "module"</font> 节点

### 5.2 操作步骤

1-打开终端，执行如下指令，生成package.json

```
npm init -y
```

![][1]

2-package.json 的根节点中添加 <font color=red>"type": "module"</font> 节点
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-01-es6-npm-init.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-01-es6-package-type.png