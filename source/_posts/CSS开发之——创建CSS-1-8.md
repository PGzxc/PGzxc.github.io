---
title: CSS开发之——创建CSS(1.8)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: c6aa8fb3
date: 2020-09-11 22:38:41
---
## 一 如何插入样式表

当读到一个样式表时，浏览器会根据它来格式化HTML文档。插入样式表的方法有3中：

* 外部样式表
* 内部样式表
* 内联样式表

<!--more-->

## 二 插入样式表的三种方式

### 2.1 外部样式表

当样式需要应用于很多页面时，外部样式表将是理想的选择。在使用外部样式表的情况下，你可以通过改变一个文件来改变整个站点的外观。每个页面使用\<link>标签链接到样式表。\<link>标签在(文档的)头部：

```
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css"/>
</head>
```

浏览器 从文件mystyle.css中读到样式声明，并根据它类格式文档。

外部样式可以在任何文本编辑器中进行编辑。文件不能包含任何的html标签。样式表应该以.css扩展名进行保存。下面是一个样式表文件的例子：

```
hr{color:sienna;}
p{margin-left:20px;}
body{background-image:url("images/back40.gif");}
```

不要在属性值与单位之间留有空格。假如你使用"margin-left:20 px"而不是"margin-left:20px"，它尽在IE6中有效，但是在Mozilla/Firefox或Netscape中却无法正常工作。

### 2.2 内部样式表

当单个文档需要特殊的样式时，就应该使用内部样式表。你可以使用\<style>标签在文档头部定义内部样式表，就像这样：

```
<head>
<style type="text/css">
	hr{color:sienna;}
	p{margin-left:20px;}
	body{background-image:url("images/back40.gif");}
</style>
</head>
```

### 2.3 内联样式

由于要讲表现和内容混杂在一起，内联样式会损失掉样式表的许多优势。请慎用这种方法，例如当样式仅需要在一个元素上应用一次时。

要使用内联样式，你需要在相关的标签内使用样式(style)属性。Style属性可以包含任何CSS属性。本例展示如何改变段落的颜色和左外边距：

```
<p style="color:sienna;margin-left:20px">
This is a paragraph
</p>
```

## 三 多重样式

如果某些属性在不同的样式表中被同样的选择器定义，那么属性值将从更具体的样式表中被继承过来

例如，外部样式表拥有针对h3选择器的三个属性：

```
h3{
  color:red;
  text-align:left;
  font-size:8pt;
}
```

而内部样式表拥有真滴h3选择器的两个属性：

```
h3{
	text-align:right;
	font-size:20pt;
}
```

假如拥有内部样式表的这个页面同时与外部样式表链接，那么h3得到的样式是：

```
color:red;
text-align:right;
font-size:20pt;
```

即颜色属性将被继承于外部样式表，而文字排列(text-alignment)和字体尺寸(font-size)会被内部样式表终端规则取代