---
title: CSS开发之——属性选择器(1.7)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: a14815cc
date: 2020-09-11 22:37:55
---
## 一 对带有指定属性的HTML元素设置样式

可以为拥有指定属性的HTML元素设置样式，而不仅限于class和id属性

**注释：**只有规定了!DOCTYPE时，IE7和IE8才支持属性选择器。在IE6及更低的版本中，不支持属性选择

<!--more-->

## 二 属性选择器

下面的例子为带有title属性的所有元素设置样式：

```
[title]
{
  color:red;
}
```

## 三 属性和值选择器

下面的例子为title="W3School"的所有元素设置样式：

```
[title="W3School"]
{
	border:5px solid blue;
}
```

## 四 属性和值选择器-多个值

下面的例子为包含指定值的title属性的所有元素设置样式。适用于由空格分隔的属性值：

```
[title~=hello]{color:red;}
```

下面的例子为带有包含指定值的lang属性的所有元素设置样式。适用于由连字符分隔的属性值：

```
[lang|en]{color:red;}
```

## 五 设置表单的样式

属性选择器在为不带有class或Id的表单设置样式时特别有用：

```
input[type="text"]
{
  width:150px;
  display:block;
  margin-bottom:10px;
  background-color:yellow;
  font-family: Verdana, Arial;
}

input[type="button"]
{
  width:120px;
  margin-left:35px;
  display:block;
  font-family: Verdana, Arial;
}
```

## 六 CSS 选择器参考手册

|     **选择器**      |                         **描述**                         |
| :-----------------: | :------------------------------------------------------: |
|     [attribute]     |                用于选取带有指定属性的元素                |
|  [attribute=value]  |              用于选取带有指定属性和值的元素              |
| [attribute~=value]  |            用于选取属性值中包含指定词汇的元素            |
| [attribute\|=value] | 用于选取带有以指定值开头的属性的元素，该值必须是整个单词 |
| [attribute^=value]  |             匹配属性值以指定值开头的每个元素             |
| [attribute$=value]  |             匹配属性值以指定值结尾的每个元素             |
| [attribute*=value]  |             匹配属性值中包含指定值的每个元素             |

