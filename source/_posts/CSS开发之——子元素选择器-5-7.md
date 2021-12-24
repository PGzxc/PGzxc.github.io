---
title: CSS开发之——子元素选择器(5.7)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: ab526d43
date: 2020-09-25 21:46:26
---
## 一 概述

**与后代选择器相比，子元素选择器（Child selectors）只能选择作为某元素子元素的元素。**

<!--more-->

## 二 选择子元素

如果您不希望选择任意的后代元素，而是希望缩小范围，只选择某个元素的子元素，请使用子元素选择器（Child selector）。

例如，如果您希望选择只作为 h1 元素子元素的 strong 元素，可以这样写：

```
h1 > strong {color:red;}
```

这个规则会把第一个 h1 下面的两个 strong 元素变为红色，但是第二个 h1 中的 strong 不受影响：

```
<h1>This is <strong>very</strong> <strong>very</strong> important.</h1>
<h1>This is <em>really <strong>very</strong></em> important.</h1>
```

## 三  语法解释

您应该已经注意到了，子选择器使用了大于号（子结合符）。

子结合符两边可以有空白符，这是可选的。因此，以下写法都没有问题：

```
h1 > strong
h1> strong
h1 >strong
h1>strong
```

如果从右向左读，选择器 h1 > strong 可以解释为“选择作为 h1 元素子元素的所有 strong 元素”。

## 四 结合后代选择器和子选择器

请看下面这个选择器：

```
table.company td > p
```

上面的选择器会选择作为 td 元素子元素的所有 p 元素，这个 td 元素本身从 table 元素继承，该 table 元素有一个包含 company 的 class 属性。