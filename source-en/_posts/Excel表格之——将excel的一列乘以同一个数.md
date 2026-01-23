---
title: Excel表格之——将excel的一列乘以同一个数
categories:
  - 文档
  - Excel
tags:
  - Excel
abbrlink: b0fef4d3
date: 2021-02-01 14:31:47
---
## 一 说明

下表中A1列有4个数，如何让A1中的数据同时乘以2放到B列中

![][1]

<!--more-->

## 二 功能实现

### 2.1 过程分析

* 计算公式(B=A*2)，即将A中每列的值乘以2放到对应的B中
* 先计算B1(=A1*2)
* 拖动B1向下，计算其他的值

### 2.2 过程
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-excel/excel-multi-target.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-excel/excel-mutipy-2.gif