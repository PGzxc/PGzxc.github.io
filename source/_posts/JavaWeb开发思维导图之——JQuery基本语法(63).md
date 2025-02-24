---
title: JavaWeb开发思维导图之——JQuery基本语法(63)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: ea2e92b6
date: 2025-02-24 08:39:06
---
## 一 概述

* JS对象和jQuery对象转换
* 事件相关
* 遍历

<!--more-->

## 二 内容详情

### 2.1 JS对象和jQuery对象转换

1-概念

* js和jquery二者的API方法不能混用
* 若想使用对象的API,需要进行对象的转换

2-转换

* 1-js的dom对象转换为jquery对象: 1-语法: $(js的dom对象); 2-示例: let jq=$(jsDiv)
* 2-jquery对象转换为js对象: 1-语法 1-jQuery对象[索引]; 2-示例: let js =jqDiv[0]

### 2.2 事件相关

1-事件的使用

* 1-jQuery常用事件: 1-load 、2-submit、3-click
* 2-事件说明：在jquery中将事件封装成对应的方法。去掉了js中的.on语法
* 3-示例：单击事件: $("#btn").click(function(){})

2-事件的绑定和解绑

* 1-绑定事件
* 2-解绑事件

3-事件的切换

* 1-概念：给同一个对象绑定多个事件，多个事件有先后顺序关系
* 2-分类：1-单独定义、2-链式定义

### 2.3 遍历

* 1-传统方式
* 2-对象.each()方法
* 3-$.each()方法
* 4-for of语句

## 三 思维导图

![javaweb-xmind-jquery-basic-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-jquery-basic-2.png