---
title: HTML开发之——图像(17)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: b22170b1
date: 2020-08-26 22:18:26
---
## 一 概述

通过使用HTML，可以在文档中显示图像，本文主要介绍：

* 图像标签(\<img>)和源属性(Src)
* 替换文本属性(Alt)

<!--more-->

## 二 图像属性

### 2.1 图像标签(\<img>)和源属性(Src)

#### 2.1.1 说明

* 在HTML中，图像由\<img>标签定义
* \<img>是空标签，意思是说，它只包含属性，并且没有闭合标签
* 要在页面上显示图像，你需要使用源属性(src)。src指"source"。源属性的值是图像的URL的地址

#### 2.1.2 定义图像的语法

```
<img src="url"/>
```

* URL指存储图像的位置。如果名为"boat.gif"的图像位于`www.w3school.com.cn`的images目录中，那么其URL为`http://www.w3school.com.cn/images/boat.gif`
* 浏览器将图像显示在文档中图像标签出现的地方。如果你将图像标签置于两个段落之间，那么浏览器会首先显示第一个段落，然后显示图片，最后显示第二段

### 2.2 替换文本属性(Alt)

alt属性用来为图像定义一串预备的可替换的文本。替换文本属性的值是用户定义的

```
<img src="boat.gif" alt="Big Boat">
```

在浏览器无法载入图像时，替换文本属性告诉它们失去的信息。此时，浏览器将显示这个替代性的文本而不是图像。为页面上的图像都加上替换文本属性是个好习惯，这样有助于更好的显示信息，并且对于那些使用纯文本浏览器的人来说是非常有用的

### 2.3 基本的注意事项—有用的提示

假如某个HTML文件包含是个图像，那么为了正确显示这个页面，需要加载11个文件。加载图像是需要时间的，所以我们的建议是：慎用图片

## 三 图像标签

|  标签   |           描述           |
| :-----: | :----------------------: |
| \<img>  |         定义图像         |
| \<map>  |       定义图像地图       |
| \<area> | 定义图像地图中可点击区域 |

## 四 实例

### 4.1 背景图片

本例演示如何向HTML页面添加背景图片

```
<html>
<body background="/i/eg_background.jpg">
<h3>图像背景</h3>
<p>gif 和 jpg 文件均可用作 HTML 背景。</p>
<p>如果图像小于页面，图像会进行重复。</p>
</body>
</html>
```

### 4.2 排列图片

本例演示如何在文字中排列图像

```
<html>
<body>
<h2>未设置对齐方式的图像：</h2>
<p>图像 <img src ="/i/eg_cute.gif"> 在文本中</p>
<h2>已设置对齐方式的图像：</h2>
<p>图像 <img src="/i/eg_cute.gif" align="bottom"> 在文本中</p>
<p>图像 <img src ="/i/eg_cute.gif" align="middle"> 在文本中</p>
<p>图像 <img src ="/i/eg_cute.gif" align="top"> 在文本中</p>
<p>请注意，bottom 对齐方式是默认的对齐方式。</p>
</body>
</html>
```

### 4.3 浮动图片

```
<html>
<body>
<p>
<img src ="/i/eg_cute.gif" align ="left"> 
带有图像的一个段落。图像的 align 属性设置为 "left"。图像将浮动到文本的左侧。
</p>
<p>
<img src ="/i/eg_cute.gif" align ="right"> 
带有图像的一个段落。图像的 align 属性设置为 "right"。图像将浮动到文本的右侧。
</p>
</body>
</html>
```

### 4.4 调整图片尺寸

本例演示如何将图片调整到不同的尺寸

```
<html>
<body>
<img src="/i/eg_mouse.jpg" width="50" height="50">
<br />
<img src="/i/eg_mouse.jpg" width="100" height="100">
<br />
<img src="/i/eg_mouse.jpg" width="200" height="200">
<p>通过改变 img 标签的 "height" 和 "width" 属性的值，您可以放大或缩小图像。</p>
</body>
</html>
```

### 4.5 为图片显示替换文本

本例演示如何为图片显示替换文本。在浏览器无法载入图像时，替换文本属性告诉读者失去的信息。为页面上的图片都加上替换文本属性是个好习惯

```
<html>
<body>
<p>仅支持文本的浏览器无法显示图像，仅仅能够显示在图像的 "alt" 属性中指定的文本。在这里，"alt" 的文本是“向左转”。</p>
<p>请注意，如果您把鼠标指针移动到图像上，大多数浏览器会显示 "alt" 文本。</p>
<img src="/i/eg_goleft.gif" alt="向左转" />
<p>如果无法显示图像，将显示 "alt" 属性中的文本：</p>
<img src="/i/eg_goleft123.gif" alt="向左转" />
</body>
</html>
```

### 4.6 制作图像链接

本例演示如何将图像作为一个链接使用

```
<html>
<body>
<p>
您也可以把图像作为链接来使用：
<a href="/example/html/lastpage.html">
<img border="0" src="/i/eg_buttonnext.gif" />
</a>
</p>
</body>
</html>
```

