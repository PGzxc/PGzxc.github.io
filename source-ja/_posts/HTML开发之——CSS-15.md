---
title: HTML开发之——CSS(15)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: e6dbbc6b
date: 2020-08-26 22:11:46
---
## 一 概述

本文介绍HTML中的CSS样式，包含：

* 外部样式表
* 内部样式表
* 内联样式

<!--more-->

## 二 如何使用样式

当浏览器读到一个样式表，它就会按照这个样式表来对文档进行格式化。有以下三种方式来插入样式表：

### 2.1 外部样式表

当样式需要被应用到很多页面的时候，外部样式表将是理想的选择。使用外部样式表，你就可以通过更改一个文件来改变整个站点的外观

```
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```

### 2.2 内部样式表

当单个文件需要特别样式时，就可以使用内部样式表。你可以在head部分通过\<style>标签定义内部样式表

```
<head>
<style type="text/css">
body {background-color: red}
p {margin-left: 20px}
</style>
</head>
```

### 2.3 内联样式

当特殊的样式需要应用到个别元素时，就可以使用内联样式。使用内联样式的方法是在相关的标签中使用样式属性。样式属性可以包含任何CSS属性。一下实例显示出如何改变段落的颜色和左外边距

```
<p style="color: red; margin-left: 20px">
This is a paragraph
</p>
```

## 三 样式属性

|    标签     |                            描述                            |
| :---------: | :--------------------------------------------------------: |
|  \<style>   |                        定义样式定义                        |
|   \<link>   |                        定义资源引用                        |
|   \<div>    |                 定义文档中的节或区域(块级)                 |
|   \<span>   |                   定义文档中的小块或区域                   |
|   \<font>   | 规定文本的字体、字体尺寸、字体颜色。不赞成使用。请使用样式 |
| \<basefont> |            定义基准字体。不赞成使用。请使用样式            |
|  \<center>  |         对文本进行水平居中。不赞成使用。请使用样式         |

## 四 实例

### 4.1 HTML中的样式

本例样式如何使用添加到\<head>部分的样式信息对HTML进行格式化

```
<html>
<head>
<style type="text/css">
h1 {color: red}
p {color: blue}
</style>
</head>
<body>
<h1>header 1</h1>
<p>A paragraph.</p>
</body>
</html>
```

### 4.2 没有下划线的链接

本例演示如何使用样式属性做一个没有下划线的链接

```
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<a href="http://www.baidu.com" style="text-decoration:none">这是一个链接!</a>
</body>
</html>
```

### 4.3 链接到一个外部样式表

本例演示如何\<link>标签链接到一个外部样式表

```
<html>
<head>
<link rel="stylesheet" type="text/css" href="../html/csstest1.css">
</head>
<body>
<h1>我通过外部样式表进行格式化。</h1>
<p>我也一样！</p>
</body>
</html>
```

```
h1{color:green;border:1px solid black}
p{color:red;border:1px solid black;background-color:#EFE7D6}
```
