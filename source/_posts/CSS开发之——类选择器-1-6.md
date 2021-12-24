---
title: CSS开发之——类选择器(1.6)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: f523b746
date: 2020-09-11 22:36:46
---
## 一 概述

在CSS中，类选择器以一个点号显示：

```
.center {text-align: center}
```

在上面的例子中，所有拥有center类的HTML元素均为居中

<!--more-->

## 二 说明

### 2.1 实例

在下面的HTML代码中，h1和p元素都有center类。这意味着两者都将准守".center"选择器中的规则

```
<h1 class="center">
This heading will be center-aligned
</h1>

<p class="center">
This paragraph will also be center-aligned.
</p>
```

<font color="red">注意：</font>类名的第一个字符不能使用数字！它无法在Mozilla或Firefox中起作用

### 2.2 和id一样，class也可被用作派生选择器

```
.fancy td {
	color: #f60;
	background: #666;
	}
```

在上面这个例子中，类名为fancy的更大的元素内部的表格单元都会以灰色背景显示橙色文字。（名为fancy的更大的元素可能是一个表格或者一个div）

### 2.3 元素也可以基于它们的类而被选择

```
td.fancy{
	  color:#f60;
	  background:#666;
}
```

在上面的例子中，类名为fancy的表格单元将是带有灰色背景的橙色

```
<td class="fancy">
```

你可以将类fancy分配给任何一个表格元素任意多的次数。那些以fancy标注的单元格都会是带有灰色背景的橙色。那些没有被分配名为fancy的类的单元格不会受这条规则的影响。还有一点值得注意，class为fancy的段落也不会是带有灰色背景的橙色，当然，任何其他被标注为fancy的元素也不会受这条规则的影响。这都是由于我们书写这条规则的方式，这个效果被限制于被标注为fancy的表格单元(即使用td元素来选择fancy类)