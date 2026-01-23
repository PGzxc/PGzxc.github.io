---
title: CSS开发之——框模型内边距(3.2)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: f5c30e1d
date: 2020-09-24 21:45:43
---
## 一 概述

元素的内边距在边框和内容区之间。控制该区域最简单的属性是padding属性。

CSS padding属性定义元素边框与元素内容之间的空白区域。

<!--more-->

## 二 CSS padding属性

CSS padding属性定义元素的内边距。padding属性接受长度值或百分比值，但不允许使用负值。

例如，如果你希望所有h1元素的各边都有10像素的内边距，只需要这样：

```
h1{padding:10px;}
```

你还可以按照上、右、下、左的顺序分别设置各边的内边距，各边均可以使用不同的单位或百分比值：

```
h1{padding:10px 0.25em 2ex 20%;}
```

## 三  单边内边距属性

也通过使用下面四个单独的属性，分别设置上、右、下、左内边距：

* padding-top
* padding-right
* padding-bottom
* padding-left

你也许已经想到了，下面的规则实现的效果与上面的简写规则完全相同的：

```
h1 {
  padding-top: 10px;
  padding-right: 0.25em;
  padding-bottom: 2ex;
  padding-left: 20%;
  }
```

## 四 内边距的百分比数值

前面提到过，可以为元素的内边距设置百分数值。百分数值是相对于其父元素的width计算的，这一点与外边距一样。所以，如果父元素的width改变，它们也会改变。

下面这条规则把段落的内边距设置为父元素width的10%：

```
p{padding:10%;}
```

例如：如果一个段落的父元素是div元素，那么它的内边距要根据div的width计算。

```
<div style="width: 200px;">
<p>This paragragh is contained within a DIV that has a width of 200 pixels.</p>
</div> 
```

<font color="red">注意：</font>上下内边距与左右内边距一致；即上下内边距的百分数会相对于父元素宽度设置，而不是相对于高度。

## 五 CSS内边距属性

|      属性      |                         描述                         |
| :------------: | :--------------------------------------------------: |
|    padding     | 简写属性。作用是在一个声明中设置元素的所有内边距属性 |
| padding-bottom |                  设置元素的下内边距                  |
|  padding-left  |                  设置元素的左内边距                  |
| padding-right  |                  设置元素的右内边距                  |
|  padding-top   |                  设置元素的上内边距                  |

