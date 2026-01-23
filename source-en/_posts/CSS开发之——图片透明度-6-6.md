---
title: CSS开发之——图片透明度(6.6)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: f0200077
date: 2020-09-27 22:08:40
---
## 一 概述

通过CSS创建透明图像是很容易的

CSS opacity属性是W3C CSS推荐标准的一部分

<!--more-->

## 二 实例

### 2.1 实例一 创建透明图像

定义透明效果的CSS3属性是opacity

首先，我们将展示如何通过CSS来创建透明图像
![][1]

带有透明度的相同图像：
![][2]
请看下面的CSS：

```
img
{
	opacity:0.4;
	filter:alpha(opacity=40); /* 针对 IE8 以及更早的版本 */
}
```

IE9，Firefox，Chrome，Opera和Safari使用属性opacity来设定透明度。opacity属性能够设置的值从0.0到1.0。值越小，越透明

IE8以及更早的版本使用滤镜filter:alpha(opacity=x)。x能够取得值从0到100.值越小，越透明

### 2.2 实例二 头像透明度-Hover效果

请把鼠标指针移动到图像上：

![][3]



CSS是这样的：

```
img
{
opacity:0.4;
filter:alpha(opacity=40); /* 针对 IE8 以及更早的版本 */
}
img:hover
{
opacity:1.0;
filter:alpha(opacity=100); /* 针对 IE8 以及更早的版本 */
}
```

第一个CSS代码块类似实例1中的代码。此外，我们已经设置了当鼠标指针位于图像上时的样式。在这个例子中，当指针移动到图像上时，我们希望图像是不透明的。

对应的CSS是：opacity=1

IE8以及更早的浏览器:filter:alpha(opacity=100)

当鼠标指针移出图像后，图像会再次透明

### 2.3 实例3-透明框中的文本

![][4]
源代码是这样的：

```
<!DOCTYPE html>
<html>
<head>
<style>
div.background
{
  width: 400px;
  height: 266px;
  background: url('/i/tulip_peach_blossom_w.jpg') no-repeat;
  border: 1px solid black;
}

div.transbox
{
  width: 338px;
  height: 204px;
  margin:30px;
  background-color: #ffffff;
  border: 1px solid black;
  /* for IE */
  filter:alpha(opacity=60);
  /* CSS3 standard */
  opacity:0.6;
}

div.transbox p
{
  margin: 30px 40px;
}
</style>
</head>

<body>

<div class="background">
<div class="transbox">
<p>
This is some text that is placed in the transparent box.
This is some text that is placed in the transparent box.
This is some text that is placed in the transparent box.
This is some text that is placed in the transparent box.
This is some text that is placed in the transparent box.
</p>
</div>
</div>

</body>
</html>
```

首先，我们创建一个div元素(class="background")，它有固定的高度和宽度、背景图像，以及边框。然后我们在第一个div内创建稍小的div(class="transbox")。“transbox”div有固定的宽度、背景色和边框-并且它是透明的。在透明div内部，我们在p元素中加入了一些文本。


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tulip_peach_blossom_w_s.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tulip_peach_blossom_w_s-hidden.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tulip_peach_blossom_w_s-animal.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tulip_peach_blossom_w_s-text.png