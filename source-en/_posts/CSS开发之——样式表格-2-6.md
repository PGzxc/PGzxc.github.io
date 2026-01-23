---
title: CSS开发之——样式表格(2.6)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: 3c0beaa
date: 2020-09-24 21:43:11
---
## 一 概述

CSS表格属性可以帮组你极大地改善表格的外观

<!--more-->

## 二 表格边框

如需在CSS中设置表格边框，请使用border属性

下面的例子为table、th以及td设置了蓝色边框：

```
table, th, td
{
  border: 1px solid blue;
}
```

请注意，上例中的表格具有双线条边框。这是由于table、th以及td元素都有独立的边框。

如果需要把表格显示为单线条边框，请使用border-collapse属性

## 三 折叠边框

border-collapse属性设置是否将表格边框折叠为单一边框：

```
table
{
  border-collapse:collapse;
}
table,th, td
{
  border: 1px solid black;
}
```

## 四 表格的宽度和高度

通过width和height属性定义表格的宽度和高度。

下面的例子将表格宽度设置为100%，同时将th元素的高度设置为50px

```
table{ width:100%;}
th{ height:50px;}
```

## 五 表格文本对齐

text-align和vertical-align属性设置表格中文本的对齐方式

text-align属性设置水平对齐方式，比如左对齐、右对齐或者居中：

```
td{ text-align:right;}
```

vertical-align属性设置垂直对齐方式，比如顶部对齐、底部对齐或者居中对齐

```
td
{
  height:50px;
  vertical-align:bottom;
}
```

## 六 表格内边距

如需控制表格中内容与边距的距离，请为td和th元素设置padding属性：

```
td{padding:15px;}
```

## 七 表格颜色

下面的例子设置边框的颜色，以及th元素的文本和背景颜色：

```
table, td, th
{
  border:1px solid green;
}
th
{
  background-color:green;
  color:white;
}
```

## 八 CSS Table属性

|      属性       |                描述                |
| :-------------: | :--------------------------------: |
| border-collapse | 设置是否把表格边框合并为单一的边框 |
| border-spacing  |      设置分割单元格边框的距离      |
|  caption-side   |         设置表格标题的位置         |
|   empty-cells   |    设置是否显示表格中的空单元格    |
|  table-layout   |     设置显示单元、行和列的算法     |

