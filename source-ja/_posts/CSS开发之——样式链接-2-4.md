---
title: CSS开发之——样式链接(2.4)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: f8ff7b84
date: 2020-09-24 21:41:46
---
## 一 概述

我们能够以不同的方法为链接设置样式，本文介绍：

* 设置链接样式
* 常见的链接样式

<!--more-->

## 二 设置链接的样式

能够设置链接样式的CSS属性有很多种(例如：color,font-family,background等等)

链接的特殊性在于能够根据它们所处的状态来设置他们的样式。

链接的四种状态：

* a:link——普通的、未被访问的链接
* a:visited——用户已访问的链接
* a:hover——鼠标指针位于链接的上方
* a:active——链接被点击的时刻

```
a:link {color:#FF0000;}		/* 未被访问的链接 */
a:visited {color:#00FF00;}	/* 已被访问的链接 */
a:hover {color:#FF00FF;}	/* 鼠标指针移动到链接上 */
a:active {color:#0000FF;}	/* 正在被点击的链接 */
```

当为链接的不同状态设置样式时，请按照以下次序规则：

* a:hover必须位于a:link和a:visited之后
* a:active必须位于a:hover之后

## 三 常见的链接样式

在上面的例子中，链接根据其状态改变颜色，让我们看看其他几种常见的设置链接样式的方法：

### 3.1 文本修饰

text-decoration属性大多用于去掉连接中的下划线

```
a:link {text-decoration:none;}
a:visited {text-decoration:none;}
a:hover {text-decoration:underline;}
a:active {text-decoration:underline;}
```

### 3.2 背景色

background-color属性规定链接的背景色

```
a:link {background-color:#B2FF99;}
a:visited {background-color:#FFFF85;}
a:hover {background-color:#FF704D;}
a:active {background-color:#FF704D;}
```
