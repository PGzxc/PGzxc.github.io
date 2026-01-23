---
title: JavaWeb开发思维导图之——JavaScript基础DOM(55)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: c351406c
date: 2025-02-14 15:50:28
---
## 一 概述

* DOM介绍
* DOM操作

<!--more-->

## 二 内容详情

### 2.1 DOM介绍

1-概念

* Doument Object Model缩写,文档对象模型
* 将HTML文档的各组成部分，封装为对象。借助对象对文档进行增删改查

2-DOM抽取

* Document：文档对象
* Element: 元素对象
* Attribute: 属性对象
* Text: 文本对象

### 2.2 DOM操作

1-元素获取操作

* 1-getElementById(id属性值)//根据id获取一个元素
* 2-getElementsByTagName(标签名称)//根据标签名称获得多个元素
* 3-getElementsByName(name属性值)//根据name属性获得多个元素
* 4-getElementsByClassName(class属性值)//根据class属性值获得多个元素
* 5-子元素对象.parentElemet属性//获取当前元素的父元素

2-元素的增删改查

* 1-createElement(标签名)//创建一个新元素
* 2-appendChild(子元素)//将指定子元素添加到父元素中
* 3-removeChild(子元素)//用父元素删除指定子元素
* 4-replaceChild(新元素，旧元素)//用新元素替换子元素

3-属性操作

* 1-setAttribute(属性名,属性值)//设置值
* 2-getAttribute(属性名)//根据属性名获取属性值
* 3-removeAttrbute(属性名)//根据属性名移除指定的属性
* 4-style属性//为元素添加样式
* 5-className=类名//通过classname指定样式

4-Text文本操作

* 1-innerText: 添加文本内容，不解析标签
* 2-innerHTML: 添加文本内容，解析标签

## 三 思维导图

![javaweb-xmind-javascript-dom-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-javascript-dom-3.png