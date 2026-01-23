---
title: CSS开发之——ID选择器详解(5.4)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: a1c3dde9
date: 2020-09-25 21:42:58
---
## 一  概述

ID选择器允许以一种独立于文档元素的方式来指定样式。

<!--more-->

## 二 ID选择器

在某些方面，ID选择器类似于类选择器，不过也有一些重要差别。

### 2.1 语法

首先，ID选择器前面有一个#号-也称为棋盘号或井号

请看下面的规则：

```
*#intro {font-weight:bold;}
```

与i选择器一样，ID选择器中可以忽略通配选择器。前面的例子也可以写作：

```
#intro {font-weight:bold;}
```

这个选择器的效果是一样的。

第二个区别是ID选择器不引用class属性的值，毫无疑问，它要引用Id属性中的值。

以下是一个实际ID选择器的例子：

```
<p id="intro">This is a paragraph of introduction.</p>
```

### 2.2 类选择器还是ID选择器

在类选择器这一章中我们曾讲解过，可以为任意多个元素指定类。前一章中类名important被应用到p和h1元素，而且它还可以应用到更多元素。

#### 2.2.1 区别1：只能在文档中使用一次

与类不同，在一个HTML文档中，ID选择器会使用一次，而且仅一次。

#### 2.2.2 区别2：不能使用ID词列表

不同于类选择器，ID选择器不能结合使用，因为ID属性不允许有以空格分隔的词列表。

#### 2.2.3 区别3：ID能包含更多含义

类似于类，可以独立于元素来选择ID。有些情况下，你知道文档中出现某个特定ID值，但是并不知道它会出现在哪个元素上，所以你想声明独立的ID选择器。例如，您可能知道在一个给定的文档中会有一个 ID 值为 mostImportant 的元素。您不知道这个最重要的东西是一个段落、一个短语、一个列表项还是一个小节标题。您只知道每个文档都会有这么一个最重要的内容，它可能在任何元素中，而且只能出现一个。在这种情况下，可以编写如下规则：

```
#mostImportant {color:red; background:yellow;}
```

这个规则会与以下各个元素匹配（这些元素不能在同一个文档中同时出现，因为它们都有相同的 ID 值）：

```
<h1 id="mostImportant">This is important!</h1>
<em id="mostImportant">This is important!</em>
<ul id="mostImportant">This is important!</ul>
```

### 2.3 区分大小写

请注意，类选择器和 ID 选择器可能是区分大小写的。这取决于文档的语言。HTML 和 XHTML 将类和 ID 值定义为区分大小写，所以类和 ID 值的大小写必须与文档中的相应值匹配。

因此，对于以下的 CSS 和 HTML，元素不会变成粗体

```
#intro {font-weight:bold;}

<p id="Intro">This is a paragraph of introduction.</p>
```

由于字母 i 的大小写不同，所以选择器不会匹配上面的元素。