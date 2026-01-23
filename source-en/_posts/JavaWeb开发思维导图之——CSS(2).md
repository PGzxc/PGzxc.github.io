---
title: JavaWeb开发思维导图之——CSS(2)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 88da3ada
date: 2024-10-25 09:08:47
---
## 一 概述

* CSS快速入门
* CSS基本语法
* CSS案例

<!--more-->

## 二 内容详情

### 2.1 CSS快速入门

1-CSS介绍

* 层叠样式表
* 渲染解析页面元素

2-组成

* 选择器：标签、class、id
* 样式声明：格式(属性名:属性值)、示例(h1{color:red;})

3-css入门案例-字体居中，字体红色

4-浏览器开发者工具(鼠标右键—>检查)

### 2.2 CSS基本语法

1-引入方式

* 内联样式(通过style属性控制)
* 内部样式(在\<head>通过\<style>标签控制)
* 外部样式(在\<head>通过\<link>标签引入独立css)

2-注释

* 说明：解释说明程序
* 格式：/\*注释内\*/
* 特点(注释不显示)

3-选择器

* 基本选择器: 元素选择器(标签)-div{}、类选择器(.class)-.center{}、id选择器(#)-#username{}
* 属性选择器(根据指定属性匹配元素)：[type=text]{}
* 伪类选择器: 未访问状态(标签名:link)-a:link{}、已访问状态(标签名:visited)-a:visited{}、鼠标悬浮状态(标签名:hover)-a:hover、已选中状态(标签名:active)-a:active
* 组合选择器: 后代选择器(符号(空格))-示例-.center li{}、分组选择器(同时匹配多个元素)-示例(div,span,p{})

### 2.3 css案例

* 说明：利用现有知识编写案例：头条页面、登录页面

## 三 思维导图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-css-2.png