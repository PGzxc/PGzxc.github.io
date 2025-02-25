---
title: JavaWeb开发思维导图之——JQuery选择器(64)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 5bf483de
date: 2025-02-25 08:43:51
---
## 一 概述

* 基本选择器
* 层级选择器
* 属性选择器
* 过滤选择器
* 表单选择器

<!--more-->

## 二 内容详情

### 2.1 基本选择器

1-概念

* 1-选择器: 类似于CSS的选择器，可以帮助我们获取元素
* 2-例如: id选择器、类选择器、元素选择器、属性选择器等
* 3-jQuery中选择器语法: $()

2-基本选择器

* 1-元素选择器：根据元素名称获取元素对象们
* 2-id选择器：根据id属性获取元素对象
* 3-类选择器：根据class属性值获取元素对象们

### 2.2 层级选择器

1-后代选择器

* 1-说明: A下的所有B(包括B的子级)
* 2-语法: $("A B") 
* 3-示例: let spans1=$("div span")

2-子选择器

* 1-说明: A下的所有B(不包括B的子级)
* 2-语法: $("A>B") 
* 3-示例: let spans2=$("div>span")

3-兄弟选择器

* 1-说明: A相邻的下一个B
* 2-语法: $("A+B") 
* 3-示例: let ps1=$("div+p")

4-兄弟选择器

* 1-说明: A相邻的所有B
* 2-语法: $("A~B") 
* 3-示例: let ps2=$("div~p")

### 2.3 属性选择器

1-属性名选择器

* 1-说明: 根据指定属性名获取元素对象们
* 2-语法: $("A[属性名]") 
* 3-示例: let in1=$("input[type]")

2-属性值选择器

* 1-说明: 根据指定属性名和属性值获取元素对象们
* 2-语法: $("A[属性名=属性值]") 
* 3-示例: let in2=$("input[type='password']")

### 2.4 过滤选择器

1-首元素选择器

* 1-作用: 获取选择的元素中的第一个元素
* 2-语法: $("A:first") 
* 3-示例: let div1=$("div:first")

2-尾元素选择器

* 1-作用: 获取选择的元素中的最后一个元素
* 2-语法: $("A:last") 
* 3-示例: let div4=$("div:last")

3-非元素选择器

* 1-作用: 不包括指定内容的元素
* 2-语法: $("A:not(B)") 
* 3-示例: let divs1=$("div:not(#div2)")

4-偶数选择器

* 1-作用: 偶数从0开始计数
* 2-语法: $("A:event)") 
* 3-示例: let divs2=$("div:even")

5-奇数选择器

* 1-作用: 奇数，从0开始计数
* 2-语法: $("A:odd)") 
* 3-示例: let div3=$("div:odd")

6-等于索引选择器

* 1-作用: 指定索引元素
* 2-语法: $("A:eq(index)") 
* 3-示例: let div3=$("div:eq(2)")

7-大于索引选择器

* 1-作用: 大于指定索引元素
* 2-语法: $("A:gt(index)") 
* 3-示例: let divs4=$("div:gt(1)")

8-小于索引选择器

* 1-作用: 小于指定索引元素
* 2-语法: $("A:lt(index)") 
* 3-示例: let divs5=$("div:lt(2)")

### 2.5 表单选择器

1-可用元素选择器

* 1-作用: 获得可用元素
* 2-语法: $("A:enabled") 
* 3-示例: let ins1=$("input:enabled")

2-不可用元素选择器

* 1-作用: 获得不可用元素
* 2-语法: $("A:disabled") 
* 3-示例: let ins2=$("inut:disabled")

3-单选/复选框被选中的元素

* 1-作用: 获得单选/复选框选中的元素
* 2-语法: $("A:checked") 
* 3-示例: let ins3=$("input:checked")

4-下拉框被选中的元素

* 1-作用: 获得下拉框选中的元素
* 2-语法: $("A:selected") 
* 3-示例: let select=$("select option:selected")

## 三 思维导图

![javaweb-xmind-jquery-selector-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-jquery-selector-3.png