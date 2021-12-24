---
title: HTML开发之——基础(4)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: cac6c740
date: 2020-08-21 21:41:33
---
## 一 概述

本文演示HTML中的四个基础案例

* 标题
* 段落
* 链接
* 图像

<!--more-->

## 二 标题

HTML 标题（Heading）是通过 \<h1> - \<h6> 等标签进行定义的。 

### 2.1 实例

```
<html>
<body>
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<h3>This is heading 3</h3>
<h4>This is heading 4</h4>
<h5>This is heading 5</h5>
<h6>This is heading 6</h6>
<p>请仅仅把标题标签用于标题文本。不要仅仅为了产生粗体文本而使用它们。请使用其它标签或 CSS 代替。</p>
</body>
</html>
```

## 三 HTML段落

HTML段落是通过\<p>标签进行自定义的

### 3.1 实例

```
<html>
<body>
<p>这是段落。</p>
<p>这是段落。</p>
<p>这是段落。</p>
<p>段落元素由 p 标签定义。</p> 
</body>
</html>
```

## 四 HTML 链接

HTML链接是通过\<a>标签进行定义的

### 4.1 实例

```
<html>
<body>
<a href="http://www.baidu.com">
This is a link</a>
</body>
</html>
```

**注释**：在href属性中指定链接的地址

## 五 HTML图像

HTML图像是通过\<img>标签进行自定义的

### 5.1 实例

```
<html>
<body>
<img src="chicken.png" width="300" height="120" />
</body>
</html>
```

**注释**：图像的名称和尺寸是以属性的形式提供的

