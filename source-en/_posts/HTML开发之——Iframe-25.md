---
title: HTML开发之——Iframe(25)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 49f65bed
date: 2020-08-27 22:12:52
---
## 一 概述

Ifame用于在网页内显示网页，添加Iframe的语法：

```
<iframe src="URL"></iframe>
```

URL指向隔离页面的位置

<!--more-->

## 二 Iframe设置

### 2.1 Iframe-设置高度和宽度

* height和width属性用于规定iframe的高度和宽度
* 属性值的默认单位是像素，但也可以用百分比来设定(比如："80%")

实例

```
<iframe src="demo_iframe.htm" width="200" height="200"></iframe>
```

### 2.2 Iframe-删除边框

* frameborder属性规定是否显示iframe周围的边框
* 设置属性值为"0"就可以移除边框

实例：

```
<iframe src="demo_iframe.htm" frameborder="0"></iframe>
```

### 2.3 使用Iframe作为链接的目标

* iframe可用作链接的目标(target)
* 链接的target属性必须引用iframe的name属性

实例

```
<iframe src="demo_iframe.htm" name="iframe_a"></iframe>
<p><a href="http://www.w3school.com.cn" target="iframe_a">W3School.com.cn</a></p>
```

## 三 Iframe标签

|   标签    |          描述          |
| :-------: | :--------------------: |
| \<iframe> | 定义内联的子窗口(框架) |

