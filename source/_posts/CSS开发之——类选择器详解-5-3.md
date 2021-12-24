---
title: CSS开发之——类选择器详解(5.3)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: '8e927761'
date: 2020-09-25 21:41:32
---
## 一 概述

类选择器允许以一种独立于文档元素的方式来指定样式。

<!--more-->

## 二 CSS类选择器

类选择器允许以一种独立于文档元素的方式来指定样式。

该选择器可以单独使用，也可以与其他元素结合使用。

<font color="orange">提示：</font>只有适当地标记文档后，才能使用这些选择器，所以使用这两种选择器通常需要先做一些构想和计划。

要应用样式而不考虑具体设计的元素，最常用的方法就是使用类选择器

### 2.1 修改HTML代码

在使用类选择器之前，需要修改具体的文档标记，以便类选择器正常工作。

为了将类选择器的样式与元素关联，必须将class指定为一个适当的值。请看下面的HTML代码：

```
<h1 class="important">
This heading is very important.
</h1>

<p class="important">
This paragraph is very important.
</p>
```

在上面的代码中，两个元素的class都指定为import：第一个标题(h1元素)，第二个段落(p元素)。

### 2.2 语法

然后我们使用以下语法向这些归类的元素应用样式，即类名前有一个点好(.)然后结合统配选择器：

```
*.important {color:red;}
```

如果你希望选择所有类名相同的元素，可以在类选择器中忽略统配选择器，这没有任何不好的影响：

```
.important {color:red;}
```

### 2.3 结合元素选择器

类选择器可以结合元素选择器来使用。

例如，你可能希望只有段落显示为红色文本：

```
p.important {color:red;}
```

选择器现在回匹配class属性包含import的所有p元素，但是其他任何类型的元素都不匹配，不论是否有此class属性。选择器p.important解析为：”其class属性值为important的所有段落“。因为h1元素不是段落，这个规则的选择器与之不匹配，因此h1元素不会变成红色文本。

如果你确实希望为h1元素指定不同的样式，可以使用选择器h1.import：

```
p.important {color:red;}
h1.important {color:blue;}
```

## 三 多类选择器

在上一节中，我们处理了class值中包含一个词的情况。在HTML中，一个class值中可能包含一个词列表，各个词之间用空格分隔。例如，如果希望将一个特定的元素同时标记为重要(important)和警告(warning)，就可以写作：

```
<p class="important warning">
This paragraph is a very important warning.
</p>
```

这两个词的顺序无关紧要，写成warning important也可以。

我们假设class为import的所有元素都是粗体，而class为warning的所有元素为斜体，class中同时包含import和warning的所有元素还有一个银色的背景。就可以写作：

```
.important {font-weight:bold;}
.warning {font-style:italic;}
.important.warning {background:silver;}
```

通过把两个类选择器链接在一起，尽可以选择同时包含这些类名的元素(类名的顺序不限)。

如果一个多类选择器包含类名列表中没有的一个类名，匹配就会失败。请看下面的规则：

```
.important.urgent {background:silver;}
```

不出所料，这个选择器只匹配class属性中包含词import和urgent的p元素。因此，如果一个p元素的class属性中只有词important和warning，将不能匹配。不过，它能匹配以下元素：

```
<p class="important urgent warning">
This paragraph is a very important and urgent warning.
</p>
```

<font color="red">重要提示：</font>在 IE7 之前的版本中，不同平台的 Internet Explorer 都不能正确地处理多类选择器。