---
title: HTML开发之——框架(24)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: bfdbf583
date: 2020-08-27 22:09:50
---
## 一 概述

通过使用框架，你可以在同一个浏览器窗口中显示不止一个页面，本文介绍的框架：

* 垂直框架
* 水平框架

<!--more-->

## 二 概念

### 2.1 框架

通过使用框架，你可以在同一个浏览器窗口显示不止一个页面。每份HTML文档称为一个框架，并且每个框架都独立于其他的框架

使用框架的坏处：

* 开发人员必须同时跟踪更多的HTML文档
* 很难打印整张页面

### 2.2 框架结构标签(\<frameset>)

* 框架结构标签(\<frameset>)定义如何将窗口分割为框架
* 每个frameset定义了一系列行或列
* rows/columns的值规定了每行或每列占据屏幕的面积

注：frameset标签也被某些文章和书籍译为框架集

### 2.3 框架标签(Frame)

Frame标签定义了放置在每个框架中的HTML文档

在下面的这个例子中，我们设置了一个两列的框架集。第一列被设置为占据浏览器窗口的25%。第二列被设置为占据浏览器窗口的75%。HTML文档"frame_a.html"被置于第一个列中，而HTML文档"frame_b.html"被置于第二个列中：

```
<frameset cols="25%,75%">
   <frame src="frame_a.htm">
   <frame src="frame_b.htm">
</frameset>
```

### 2.4 基本的注意事项

假如一个框架有可见框，用户可以拖动边框来改变它的大小。为了避免这种情况发生，可以在\<frame>标签中加入：`noresize="noresize"`

为支持框架的浏览器添加\<noframes>标签

<font color="red">重要提示：</font>不能将\<body>\</body>标签与\<frameset>\</frameset>标签同时使用！不过，假如你添加包含一段文本的\<noframes>标签，就必须将这段文字嵌套于\<body>\</body>标签内。

## 三 实例

### 3.1 实例一 垂直框架

```
<html>
<frameset cols="25%,50%,25%">
  <frame src="/example/html/frame_a.html">
  <frame src="/example/html/frame_b.html">
  <frame src="/example/html/frame_c.html">
</frameset>
</html>
```

### 3.2 水平框架

```
<html>
<frameset rows="25%,50%,25%">
  <frame src="/example/html/frame_a.html">
  <frame src="/example/html/frame_b.html">
  <frame src="/example/html/frame_c.html">
</frameset>
</html>
```

