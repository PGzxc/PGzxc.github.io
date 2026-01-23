---
title: CSS开发之——id选择器(1.5)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: '84159'
date: 2020-09-11 22:35:47
---
## 一 概述

* id选择器可以为标有特定id的HTML元素制定特定的样式
* id选择器以"#"来定义

<!--more-->

## 二 说明

下面的两个Id选择器，第一个可以定义元素的颜色为红色，第二个定义元素的颜色为绿色

```
#red{color:red;}
#green{color:green;}
```

下面的HTML代码中，id属性为red的p元素显示为红色，而id属性为green的p元素显示为绿色

```
<p id="red">这个段落是红色。</p>
<p id="green">这个段落是绿色。</p>
```

<font color="red">注意：</font>id属性只能在每个HTML文档中出现一次

## 三 id选择器和派生选择器

### 3.1在现代布局中，id选择器常常用于建立派生选择器

```
#sidebar p{
		font-style:italic;
		text-align:right;
		margin-top:0.5em;
}
```

### 3.2 一个选择器，多种用法

即使被标注为sidbar的元素只能在文档中出现一次，这个id选择器作为派生选择器也可以被使用很多次：

```
#sidebar p{
		font-style:italic;
		text-align:right;
		margin-top:0.5em;
}
#sidebar h2{
		font-size:1em;
		font-weight:normal;
		font-style:italic;
		margin:0;
		line-height:1.5;
		text-align:right;
}
```

在这里，与页面中的其他p元素明显不同的是，sidebar内的p元素得到特殊的处理，同时，与页面中其他所有h2元素明显不同的是，sidebar中的h2元素得到了不同的特殊处理。

## 四 单独的选择器

### id选择器即使不被用来创建派生选择器，它也可以独立发挥作用：

```
#sidebar{
		border:1px dotted #000;
		padding:10px;
}
```

根据这条规则，id为sidebar的元素将拥有一个像素宽的黑色点状边框，同时周围会有10个像素宽的内边距(padding，内部空白)。老版本的Windows/IE浏览器可能会忽略这条规则，除非你特别地定义这个选择器所属的元素

```
div#sidebar{
		border:1px dotted #000;
		padding:10px;
}
```

