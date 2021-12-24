---
title: HTML开发之——文档类型(34)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: e9735b10
date: 2020-08-28 23:04:00
---
## 一 概述

\<!DOCTYPE>声明帮助浏览器正确地显示网页

<!--more-->

## 二 <!DOCTYPE> 声明

Web 世界中存在许多不同的文档。只有了解文档的类型，浏览器才能正确地显示文档 

HTML 也有多个不同的版本，只有完全明白页面中使用的确切 HTML 版本，浏览器才能完全正确地显示出 HTML 页面。这就是 <!DOCTYPE> 的用处

\<!DOCTYPE> 不是 HTML 标签。它为浏览器提供一项信息（声明），即 HTML 是用什么版本编写的  

<font color="orange">提示：</font> W3School 即将升级为最新的 HTML5 文档类型 

## 三 实例

 带有 HTML5 DOCTYPE 的 HTML 文档 

```
<!DOCTYPE html>
<html>
<head>
<title>Title of the document</title>
</head>
<body>
The content of the document......
</body>
</html>
```

## 四 HTML 版本

|   版本    | **年份** |
| :-------: | :------: |
|   HTML    |   1991   |
|   HTML+   |   1993   |
| HTML 2.0  |   1995   |
| HTML 3.2  |   1997   |
| HTML 4.01 |   1999   |
| XHTML 1.0 |   2000   |
|   HTML5   |   2012   |
|  XHTML5   |   2013   |

## 五  常用的声明

### 5.1 HTML5

```
<!DOCTYPE html>
```

### 5.2 HTML 4.01

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
```

### 5.3 XHTML 1.0

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

