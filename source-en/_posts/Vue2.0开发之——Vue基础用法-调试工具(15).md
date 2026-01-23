---
title: Vue2.0开发之——Vue基础用法-调试工具(15)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 26274b0
date: 2022-11-07 10:22:27
---
## 一 概述

* 安装vue-devtools调试工具
* 配置Chrome浏览器中的vue-devtools
* 使用vue-devtools调试vue页面

<!--more-->

## 二 安装vue-devtools调试工具

vue官方提供的vue-devtools调试工具，能够方便开发者对vue项目进行调试与开发

vue-devtools插件下载地址：https://devtools.vuejs.org/guide/installation.html
![][1]

## 三 配置Chrome浏览器中的vue-devtools

点击Chrome浏览器右上角的`┇`按钮，选择`更多工具`—>扩展程序—>Vue.js devtools，并勾选如下的两个选项
![][2]

## 四 使用vue-devtools调试vue页面

1-在调试页面，按`F12`键或右键—>检查，打开如下所示调试界面
![][3]

2-点击`Components`下的Root，页面中的元素高亮显示，同时数据项在右侧显示

![][4]

3-点击数据项的Edit Value，修改内容，页面内容同步修改

![][5]

## 五 参考

* [Vue Devtools][00]



[00]:https://devtools.vuejs.org/guide/installation.html

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-15-devtools-install-site.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-15-devtools-config.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-15-devtools-debug-open.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-15-devtools-debug-click-line.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-15-devtools-debug-eidt.png