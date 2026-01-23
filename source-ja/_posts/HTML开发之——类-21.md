---
title: HTML开发之——类(21)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 703d06dc
date: 2020-08-26 22:33:41
---
## 一 概述

* 对HTML进行分类(设置类)，使我们能够为元素的类定义CSS样式。
* 为相同的类设置相同的样式或者为不同的类设置不同的样式.

<!--more-->

## 二 实例

```
<!DOCTYPE html>
<html>
<head>
<style>
.cities {
    background-color:black;
    color:white;
    margin:20px;
    padding:20px;
} 
</style>
</head>
<body>
<div class="cities">
<h2>London</h2>
<p>
London is the capital city of England. 
It is the most populous city in the United Kingdom, 
with a metropolitan area of over 13 million inhabitants.
</p>
</div> 
</body>
</html>
```

## 三 分类块级元素

HTML\<div>元素是块级元素。它能够用作其他HTML元素的容器

设置\<div>元素的类，使我们能够为相同的\<div>元素设置相同的类

```
<!DOCTYPE html>
<html>
<head>
<style>
.cities {
    background-color:black;
    color:white;
    margin:20px;
    padding:20px;
} 
</style>
</head>

<body>

<div class="cities">
<h2>London</h2>
<p>London is the capital city of England. 
It is the most populous city in the United Kingdom, 
with a metropolitan area of over 13 million inhabitants.</p>
</div>

<div class="cities">
<h2>Paris</h2>
<p>Paris is the capital and most populous city of France.</p>
</div>

<div class="cities">
<h2>Tokyo</h2>
<p>Tokyo is the capital of Japan, the center of the Greater Tokyo Area,
and the most populous metropolitan area in the world.</p>
</div>
</body>
</html>
```

## 四 分类行内元素

HTML\<span>元素是行内元素，能够用作文本的容器

设置\<span>元素的类，能够为相同的\<span>元素设置形同的样式

```
<!DOCTYPE html>
<html>
<head>
<style>
  span.red {color:red;}
</style>
</head>
<body>
<h1>My <span class="red">Important</span> Heading</h1>
</body>
</html>
```

