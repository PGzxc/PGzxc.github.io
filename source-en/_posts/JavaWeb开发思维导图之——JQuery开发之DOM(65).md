---
title: JavaWeb开发思维导图之——JQuery开发之DOM(65)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: '88813538'
date: 2025-02-26 09:03:28
---
## 一 概述

* 操作文本
* 操作对象
* 操作样式
* 操作属性

<!--more-->

## 二 内容详情

### 2.1 操作文本

1-html()

* 1-作用: 获取标签的文本
* 2-语法: hml()
* 3-示例: let value=$("#div").html()

2-html(value)

* 1-作用: 设置标签的文本内容，解析标签
* 2-语法: hml()
* 3-示例: $("#div").html("我是div")

### 2.2 操作对象

* 1-$("元素")
* 2-append(element)
* 3-appendTo(element)
* 4-prepend(element)
* 5-prependTo(element)
* 6-before(element)
* 7-after(element)
* 8-remove(element)
* 9-empty()

### 2.3 操作样式

* 1-css(name)
* 2-css(name,value)
* 3-addClass(value)
* 4-removeClass(value)
* 5-toggleClass(value)

### 2.4 操作属性

1-attr(name,[value])

* 1-作用: 获得/设置属性的值
* 2-语法: attr(name,[value])
* 3-示例：$("#username").attr("id")

2-prop(name,[value])

* 1-作用: 获得/设置属性的值(checked,selected)
* 2-语法: prop(name,[value])
* 3-示例：$("#gender2").prop("checked",true)

## 三 思维导图

![javaweb-xmind-jquery-dom-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-jquery-dom-4.png