---
title: HTML开发之——列表(19)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 7846c1f
date: 2020-08-26 22:26:31
---
## 一 概述

HTML支持有序、无序和定义列表，顾本文介绍：

* 有序列表
* 无序列表
* 自定义列表

<!--more-->

## 二 概念

### 2.1 无序列表

无序列表是一个项目的列表，此列项目使用粗体圆点(典型的小黑圆圈)进行标记

无序列表始于\<ul>标签。每个列表项始于\<li>

```
<ul>
<li>Coffee</li>
<li>Milk</li>
</ul>
```

浏览器显示如下：

- Coffee
- Milk

列表项内部可以使用段落、换行符、图片、链接以及其他列表等等

### 2.2 有序列表

同样，有序列表也是一项项目，列表项目使用数字进行标记。

有序列表始于\<ol>标签。每个列表项始于\<li>标签

```
<ol>
<li>Coffee</li>
<li>Milk</li>
</ol>
```

浏览器显示如下：

1. Coffee
2. Milk

列表项内部可以使用段落、换行符、图片、链接以及其他列表等等

### 2.3 定义列表

自定义列表不仅仅是一列项目，而是项目及其注释的组合。

自定义列表以\<dl>标签开始。每个自定义列表项以\<dt>开始。每个自定义列表项的定义以\<dd>开始

```
<dl>
<dt>Coffee</dt>
<dd>Black hot drink</dd>
<dt>Milk</dt>
<dd>White cold drink</dd>
</dl>
```

浏览器显示如下：
Coffee
Black hot drink
Milk
White cold drink

定义列表的列表项内部可以使用段落、换行符、图片、链接以及其他列表等等

## 三 列表标签



|  标签   |          描述           |
| :-----: | :---------------------: |
|  \<ol>  |      定义有序列表       |
|  \<ul>  |      定义无序列表       |
|  \<li>  |       定义列表项        |
|  \<dl>  |      定义定义列表       |
|  \<dt>  |      定义定义项目       |
|  \<dd>  |     定义定义的描述      |
| \<dir>  | 已废弃。使用\<ul>代替它 |
| \<menu> | 已废弃。使用\<ul>代替它 |

