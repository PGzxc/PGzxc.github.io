---
title: CSS开发之——伪类(5.9)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: '87047197'
date: 2020-09-25 21:48:37
---
## 一 概述

**CSS 伪类用于向某些选择器添加特殊的效果。**

<!--more-->

## 二 语法

伪类的语法：

```
selector : pseudo-class {property: value}
```

CSS 类也可与伪类搭配使用。

```
selector.class : pseudo-class {property: value}
```

## 三 锚伪类

在支持 CSS 的浏览器中，链接的不同状态都可以不同的方式显示，这些状态包括：活动状态，已被访问状态，未被访问状态，和鼠标悬停状态。

```
a:link {color: #FF0000}		/* 未访问的链接 */
a:visited {color: #00FF00}	/* 已访问的链接 */
a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
a:active {color: #0000FF}	/* 选定的链接 */
```

**提示：**在 CSS 定义中，a:hover 必须被置于 a:link 和 a:visited 之后，才是有效的。

**提示：**在 CSS 定义中，a:active 必须被置于 a:hover 之后，才是有效的。

**提示：**伪类名称对大小写不敏感。

## 四 伪类与 CSS 类

伪类可以与 CSS 类配合使用：

```
a.red : visited {color: #FF0000}

<a class="red" href="css_syntax.asp">CSS Syntax</a>
```

假如上面的例子中的链接被访问过，那么它将显示为红色。

## 五  CSS2 - :first-child 伪类

您可以使用 :first-child 伪类来选择元素的第一个子元素。这个特定伪类很容易遭到误解，所以有必要举例来说明。考虑以下标记：

```
<div>
<p>These are the necessary steps:</p>
<ul>
<li>Intert Key</li>
<li>Turn key <strong>clockwise</strong></li>
<li>Push accelerator</li>
</ul>
<p>Do <em>not</em> push the brake at the same time as the accelerator.</p>
</div>
```

在上面的例子中，作为第一个元素的元素包括第一个 p、第一个 li 和 strong 和 em 元素。

给定以下规则：

```
p:first-child {font-weight: bold;}
li:first-child {text-transform:uppercase;}
```

第一个规则将作为某元素第一个子元素的所有 p 元素设置为粗体。第二个规则将作为某个元素（在 HTML 中，这肯定是 ol 或 ul 元素）第一个子元素的所有 li 元素变成大写。

请访问该链接，来查看这个 [:first-child 实例](https://www.w3school.com.cn/tiy/t.asp?f=csse_first-child)的效果。

**提示：**最常见的错误是认为 p:first-child 之类的选择器会选择 p 元素的第一个子元素。

**注释：**必须声明 \[!DOCTYPE](https://www.w3school.com.cn/tags/tag_doctype.asp)，这样 :first-child 才能在 IE 中生效。

为了使您更透彻地理解 :first-child 伪类，我们另外提供了 3 个例子：

## 六 实例

### 例子 1 - 匹配第一个 \<p> 元素

在下面的例子中，选择器匹配作为任何元素的第一个子元素的 p 元素：

```
<html>
<head>
<style type="text/css">
p:first-child {
  color: red;
  } 
</style>
</head>

<body>
<p>some text</p>
<p>some text</p>
</body>
</html>
```

### 例子 2 - 匹配所有\ <p> 元素中的第一个 \<i> 元素

在下面的例子中，选择器匹配所有 \<p> 元素中的第一个\<i> 元素：

```
<html>
<head>
<style type="text/css">
p > i:first-child {
  font-weight:bold;
  } 
</style>
</head>

<body>
<p>some <i>text</i>. some <i>text</i>.</p>
<p>some <i>text</i>. some <i>text</i>.</p>
</body>
</html>
```

### 例子 3 - 匹配所有作为第一个子元素的 \<p> 元素中的所有\ <i> 元素

在下面的例子中，选择器匹配所有作为元素的第一个子元素的\ <p> 元素中的所有\ <i> 元素：

```
<html>
<head>
<style type="text/css">
p:first-child i {
  color:blue;
  } 
</style>
</head>

<body>
<p>some <i>text</i>. some <i>text</i>.</p>
<p>some <i>text</i>. some <i>text</i>.</p>
</body>
</html>
```

## 七 CSS2 - :lang 伪类

:lang 伪类使你有能力为不同的语言定义特殊的规则。在下面的例子中，:lang 类为属性值为 no 的 q 元素定义引号的类型：

```
<html>
<head>

<style type="text/css">
q:lang(no)
   {
   quotes: "~" "~"
   }
</style>

</head>

<body>
<p>文字<q lang="no">段落中的引用的文字</q>文字</p>
</body></html>
```

## 八 伪类

*W3C*："W3C" 列指示出该属性在哪个 CSS 版本中定义（CSS1 还是 CSS2）。

|                           **属性**                           |                 **描述**                 | **CSS** |
| :----------------------------------------------------------: | :--------------------------------------: | :-----: |
| [:active](https://www.w3school.com.cn/cssref/pr_pseudo_active.asp) |         向被激活的元素添加样式。         |    1    |
| [:focus](https://www.w3school.com.cn/cssref/pr_pseudo_focus.asp) |    向拥有键盘输入焦点的元素添加样式。    |    2    |
| [:hover](https://www.w3school.com.cn/cssref/pr_pseudo_hover.asp) | 当鼠标悬浮在元素上方时，向元素添加样式。 |    1    |
| [:link](https://www.w3school.com.cn/cssref/pr_pseudo_link.asp) |        向未被访问的链接添加样式。        |    1    |
| [:visited](https://www.w3school.com.cn/cssref/pr_pseudo_visited.asp) |        向已被访问的链接添加样式。        |    1    |
| [:first-child](https://www.w3school.com.cn/cssref/pr_pseudo_first-child.asp) |      向元素的第一个子元素添加样式。      |    2    |
| [:lang](https://www.w3school.com.cn/cssref/pr_pseudo_lang.asp) |   向带有指定 lang 属性的元素添加样式。   |    2    |

