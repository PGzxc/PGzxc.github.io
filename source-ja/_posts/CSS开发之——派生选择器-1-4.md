---
title: CSS开发之——派生选择器(1.4)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: f09eea43
date: 2020-09-11 22:34:02
---
## 一 派生选择器

通过依据元素在其位置的上下关系来定义样式，你可以使标记更加简洁

在CSS1中，通过这种方式来应用规则的选择器被称为上下文选择器(contextual selectors)，这是由于它们依赖于上下文关系来应用或避免某项规则。在CSS2中，它们被称为派生选择器，但是无论你如何称呼它们，它们的作用都是相同的。
<!--more-->
派生选择器允许你根据文档的上下文关系来确定某个标签的样式。通过合理地使用派生选择器，我们可以使HTML代码变得更加整洁

比方说，你希望列表中的strong元素变为斜体字，而不是通常的粗体字，可以这样定义一个派生选择器：

```
li strong{
	font-style:italic;
	font-weight:normal;
}
```

请注意标记为\<strong>的代码的上下文关系：

```
<p><strong>我是粗体字，不是斜体字，因为我不在列表当中，所以这个规则对我不起作用</strong></p>
<ol>
<li><strong>我是斜体字。这是因为 strong 元素位于 li 元素内。</strong></li>
<li>我是正常的字体。</li>
</ol>
```

在上面的例子中，只有li元素中的strong元素的样式为斜体字，无需为strong元素定义特别的class或id，代码更加简洁。

再看看下面的CSS规则：

```
strong {color: red;}
h2 {color: red;}
h2 strong {color: blue;}
```

下面是他施加影响的HTML：

```
<p>The strongly emphasized word in this paragraph is<strong>red</strong>.</p>
<h2>This subhead is also red.</h2>
<h2>The strongly emphasized word in this subhead is<strong>blue</strong>.</h2>
```

