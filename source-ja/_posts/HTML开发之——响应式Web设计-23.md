---
title: HTML开发之——响应式Web设计(23)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: be8b5052
date: 2020-08-27 22:08:02
---
## 一 什么是响应式Web设计

* RWD指的是响应式Web设计(Responsive Web Design)
* RWD能够以可变尺寸传递网页
* RWD对于平板和移动设备是必需的

<!--more-->

## 二 实例

### 2.1 实例一

```
<!DOCTYPE html>
<html lang="en-US">
<head>
<style>
.city {
float: left;
margin: 5px;
padding: 15px;
width: 300px;
height: 300px;
border: 1px solid black;
} 
</style>
</head>

<body>

<h1>W3School Demo</h1>
<h2>Resize this responsive page!</h2>
<br>

<div class="city">
<h2>London</h2>
<p>London is the capital city of England.</p>
<p>It is the most populous city in the United Kingdom,
with a metropolitan area of over 13 million inhabitants.</p>
</div>

<div class="city">
<h2>Paris</h2>
<p>Paris is the capital and most populous city of France.</p>
</div>

<div class="city">
<h2>Tokyo</h2>
<p>Tokyo is the capital of Japan, the center of the Greater Tokyo Area,
and the most populous metropolitan area in the world.</p>
</div>

</body>
</html>
```

### 2.2 实例二 使用 Bootstrap

#### 2.2.1 说明

* 另一个创建响应式设计的方法是使用现成的CSS框架
* Boostrap是最流行的开发响应式web的HTML，CSS和JS框架
* Boostrap帮助您开发在任何尺寸都外观出众的站点：显示器、笔记本电脑、平板电脑或手机

#### 2.2.2 代码

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" 
  href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
</head>

<body>

<div class="container">
<div class="jumbotron">
  <h1>W3School Demo</h1> 
  <p>Resize this responsive page!</p> 
</div>
</div>

<div class="container">
<div class="row">
  <div class="col-md-4">
    <h2>London</h2>
    <p>London is the capital city of England.</p>
    <p>It is the most populous city in the United Kingdom,
    with a metropolitan area of over 13 million inhabitants.</p>
  </div>
  <div class="col-md-4">
    <h2>Paris</h2>
    <p>Paris is the capital and most populous city of France.</p>
  </div>
  <div class="col-md-4">
    <h2>Tokyo</h2>
    <p>Tokyo is the capital of Japan, the center of the Greater Tokyo Area,
    and the most populous metropolitan area in the world.</p>
  </div>
</div>
</div>

</body>
</html>
```

