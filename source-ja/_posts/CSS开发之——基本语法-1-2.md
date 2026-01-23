---
title: CSS开发之——基本语法(1.2)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: 27041f66
date: 2020-09-11 22:31:02
---
## 一 CSS语法

CSS规则由两个主要的部分构成：选择器，以及一条或多条声明。

```
selector {declaration1;declaration2;... declarationN}
```

选择器通常是您需要改变样式的HTML元素

<!--more-->

## 二 语法说明

### 2.1 基础语法

每条声明由一个属性和一个值组成。

属性(property)是您希望设置的样式属性(style attribute)。每个属性有一个值。属性和值被冒号分开。

```
selector {property}
```

下面这行代码的作用是将h1元素内的文字颜色定义为红色，同时将字体大小设置为14像素

在这个例子中，h1是选择器，color和font-size是属性，red和14px是值

```
h1{color:red;font-size:14px;}
```
下面的示意图为你展示了上面这段代码的结构：
![][1]

<font color='orange'>提示：</font>请使用花括号来包围声明

### 2.2  值的不同写法和单位

除了英文单词red，我们还可以使用十六进制的颜色值#ff0000

```
p{color:#ff0000;}
```

为了节约字节，我们可以使用CSS的缩写形式：

```
p{color:#f00;}
```

我们还可以通过两种方法使用RGB值：

```
p{color:rgb(255,0,0);}
p{color:rgb(100%,0%,0%);}
```

请注意，当使用RGB百分比时，即使当值为0时也要写百分比符号。但是在其他的情况下不需要这么做了。比如说，当尺寸为0像素时，0之后不需要使用px单位，因为0就是0，无论单位是什么

### 2.3 记得写引号

<font color="orange">提示：</font>如果值为若干单词，则要给值加引号

```
p{font-family:"sans serif";}
```

### 2.4 多重声明

<font color="orange">提示：</font>如果要定义不止一个声明，则需要用分号将每个声明分开。下面的例子展示出如何定义一个红色文字的居中段落。最后一条规则是不需要加分号的，因为分号在英文中是一个分割符号，不是结束符号。然而大多数有经验的设计师会在每条声明的末尾都加上分号，这么做的好处是，当你从现有的规则中增减声明时，会尽可能地减少出错的可能性。就像这样：

```
p{text-align:center;color:red;}
```

你应该在每行只描述一个属性，这样就可以增强样式定义的可读性，就像这样：

```
p{
	text-align:center;
	color:black;
	font-family:arial;
}
```

### 2.5 空格和大小写

大多数样式表包含不止一条规则，而大多数规则包含不止一个声明。多重声明和空格的使用使得样式表更容易被编辑：

```
body{
	color:#000;
	blackground:#fff;
	margin:0;
	padding:0;
	font-family:Georgia,Palatino,serif;
}
```

是否包含空格不会影响CSS在浏览器的工作效果，同样，与XHTML不同，CSS对大小写不敏感。不过存在一个例外：如果涉及到与HTML文档一起工作的话， class和id名称对大小写是敏感的



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ct_css_selector.gif