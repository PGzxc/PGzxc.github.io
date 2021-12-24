---
title: HTML开发之——布局(22)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: a346f310
date: 2020-08-27 22:06:13
---
## 一 概述

* 使用\<div>元素的HTML布局
* \<div>元素常用作布局工具，因为能够轻松地通过CSS对其进行定位

<!--more-->

## 二 HTML网站布局

HTML5语义元素：

| header  |      定义文档或节的页眉      |
| :-----: | :--------------------------: |
|   nav   |      定义导航链接的容器      |
| section |        定义文档中的节        |
| article |     定义独立的自包含文章     |
|  aside  | 定义内容之外的内容(比如侧栏) |
| footer  |      定义文档或节的页脚      |
| details |        定义额外的细节        |
| summary |    定义details元素的标题     |

## 三 实例

### 3.1 实例一 多列显示内容（就像杂志和报纸）

#### 3.1.1 代码

```
<body>
<div id="header">
<h1>City Gallery</h1>
</div>
<div id="nav">
London<br>
Paris<br>
Tokyo<br>
</div>
<div id="section">
<h1>London</h1>
<p>
London is the capital city of England. It is the most populous city in the United Kingdom,
with a metropolitan area of over 13 million inhabitants.
</p>
<p>
Standing on the River Thames, London has been a major settlement for two millennia,
its history going back to its founding by the Romans, who named it Londinium.
</p>
</div>
<div id="footer">
Copyright W3School.com.cn
</div>
</body>
```
#### 3.1.2 CSS文件

```
<style>
#header {
    background-color:black;
    color:white;
    text-align:center;
    padding:5px;
}
#nav {
    line-height:30px;
    background-color:#eeeeee;
    height:300px;
    width:100px;
    float:left;
    padding:5px; 
}
#section {
    width:350px;
    float:left;
    padding:10px; 
}
#footer {
    background-color:black;
    color:white;
    clear:both;
    text-align:center;
    padding:5px; 
}
</style>
```

### 3.2 实例二 使用表格的 HTML 布局

#### 3.2.1 说明

* \<table>元素不是作为布局工具而设计的
* \<table>元素的作用是显示表格化的数据
* 使用\<table>元素能够取得布局效果，因为能够通过CSS设置表格元素的样式

#### 3.2.2 代码

```
<body>
<table class="lamp">
<tr>
  <th>
    <img src="/images/lamp.jpg" alt="Note" style="height:32px;width:32px">
  </th>
  <td>
    The table element was not designed to be a layout tool.
  </td>
</tr>
</table>
</body>
```

#### 3.2.3 CSS文件

```
<style>
table.lamp {
    width:100%;
    border:1px solid #d4d4d4;
}
table.lamp th, td {
    padding:10px;
}
table.lamp td {
    width:40px;
}
</style>
```