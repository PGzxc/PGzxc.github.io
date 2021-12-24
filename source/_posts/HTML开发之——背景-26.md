---
title: HTML开发之——背景(26)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: de16d414
date: 2020-08-27 22:13:40
---
## 一 概述

\<body>拥有两个配置背景的标签。背景可以是颜色或者图像：

* Bgcolor
* Background

<!--more-->

## 二 背景

\<body>拥有两个配置背景的标签。背景可以是颜色或者图像

### 2.1 背景颜色(Bgcolor)

背景颜色属性将背景设置为某种颜色。属性值可以是十六进制数、RGB值或颜色名

```
<body bgcolor="#000000">
<body bgcolor="rgb(0,0,0)">
<body bgcolor="black">
```

以上的代码均将背景颜色设置为黑色

### 2.2 背景(Background)

背景属性将背景设置为图像。属性值为图像的URL。如果图像尺寸小于浏览器窗口，那么图像将在整个浏览器窗口进行复制

```
<body background="clouds.gif">
<body background="http://www.w3school.com.cn/clouds.gif">
```

URL可以是相对地址，如第一行代码。也可以是绝对地址，如第二行代码

**提示**：如果你打算使用背景图片，你需要谨记以下几点：

* 背景图像是否增加了页面的加载时间。小贴士：图像文件不应超过10k
* 背景图像是否与页面中的其他图像搭配良好
* 背景图像是否与页面中的文字颜色搭配良好
* 图像在页面中平铺后，看上去还可以吗？
* 对文字的注意力被背景图像喧宾夺主了吗？

### 2.3 基本的注意事项

\<body>标签中的背景颜色(bgcolor)、背景(background)和文本(text)属性在最新的HTML标准(HTML 4和XHTML)中已经被废弃。W3C在他们的推荐标准中已删除这些属性

应用使用层叠样式表(CSS)来定义HTML元素的布局和显示属性



