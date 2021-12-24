---
title: HMTL开发之——头部(29)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 1fd2cb76
date: 2020-08-28 22:55:15
---
## 一 HTML \<head>元素

\<head>元素是所有头部元素的容器。\<head>内的元素可包含脚本，指示浏览器在何处可以找到样式表，提示元信息，等等。以下标签都可以添加到head部分：\<title>、\<base>、\<link>、\<meta>、\<script>以及\<style>

<!--more-->

## 二 Head元素

### 2.1 HTML \<title>元素

\<title>标签定义文档的标题

title元素在所有HTML/XHTML文档中都是必需的

title元素能够：

* 定义浏览器工具栏中的标题
* 提供页面被添加到收藏夹时显示的标题
* 显示在搜索引擎结果中的页面标题

一个简化的HTML文档：

```
<!DOCTYPE html>
<html>
<head>
<title>Title of the document</title>
</head>
<body>
The content of the document......
</body>
</html>
```

### 2.2 HTML \<base>元素

\<base>标签为页面上的所有链接规定默认地址或默认目标(target)：

```
<head>
<base href="http://www.w3school.com.cn/images/" />
<base target="_blank" />
</head>
```

### 2.3 HTML \<link>元素

\<link>标签定义文档与外部资源之间的关系。

\<link>标签最常用于链接样式表：

```
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css" />
</head>
```

### 2.4 HTML \<style>元素

\<style>标签用于为HTML文档定义样式信息

您可以在style元素内规定HTML元素在浏览器中呈现的样式：

```
<head>
<style type="text/css">
body {background-color:yellow}
p {color:blue}
</style>
</head>
```

### 2.5 HTML \<meta>元素

元数据(metadata)是关于数据的信息。

\<meta>标签提供关于HTML文档的元数据。元数据不会显示在页面上，但是对于机器是可读的。

典型的情况是，meta元素被用于规定页面的描述、关键词、文档的作者、最后修改时间以及其他元数据

\<meta>标签始终位于head元素中

元数据可用于浏览器(如何显示内容或重新加载页面)，搜索引擎(关键词)，或其他web服务

#### 2.5.1 针对搜索引擎的关键词

一些搜索引起会利用meta元素的name和content属性来索引您的页面

下面的meta元素定义页面的描述：

```
<meta name="description" content="Free Web tutorials on HTML,CSS，XML"/>
```

下面的meta元素定义页面的关键词：

```
<meta name="keywords" content="HTML,CSS,XML"/>
```

name和content属性的作用是描述页面的内容

### 2.6 HTML\<script>元素

\<script>标签用于定义客户端脚本，比如JavaScript

## 三 HTML头部元素

|   标签    |                  描述                  |
| :-------: | :------------------------------------: |
|  \<head>  |           定义关于文档的信息           |
| \<title>  |              定义文档标题              |
|  \<base>  | 定义页面上所有链接的默认地址或默认目标 |
|  \<link>  |      定义文档与外部资源之间的关系      |
|  \<meta>  |        定义关于HTML文档的元数据        |
| \<script> |             定义客户端脚本             |
| \<style>  |           定义文档的样式信息           |
