---
title: CSS开发之——高级语法(1.3)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: 516b114d
date: 2020-09-11 22:32:27
---
## 一 选择器的分组

你i对选择器进行分组，这样，被分组的选择器就可以分享相同的声明。用逗号将需要分组的选择器分开。在下面的例子中，我们对所有的标题元素进行了 分组。所有的标题元素都是绿色的

```
h1,h2,h3,h4,h5,h6{
 color:green;
}
```

<!--more-->

## 二 继承及其问题

根据CSS，子元素从父元素继承属性。但是它并不总是按此方式工作。看看下面的这条规则：

```
body{
	font-family:Verdana,sans-serif;
}
```

根据上面这条规则，站点的body元素将使用Verdana字体(假如访问者的系统中存在该字体的话)

通过CSS继承，子元素将继承最高元素(在本例中是body)所拥有的属性(这些子元素诸如p,td,ul,ol,ui,dl,dt和dd)。不需要另外的规则，所有body的子元素都应该显示Verdana字体，子元素的子元素也一样。并且在大部分的现代浏览器中，也确实是这样的。

但是在按个浏览器大战的血腥年代里，这种情况就未必会发生，那时候对标准的支持并不是企业的优先选择。比方说，Netscape 4就不支持继承，它不仅忽略继承，而且也忽略应用于body元素的规则。IE/Windows直到IE6还存在相关的问题，在表格内的字体样式会被忽略。我们又该如何是好呢？

## 三 友善地对待Netscape 4

幸运地是，你可以通过使用我们称为"Be Kind to Netscape 4"的冗余法则来处理旧式浏览器无法理解继承的问题。

```
body
{
	font-family:Verdana,sans-serif;
}
p,td,ul,ol,li,dl,dt,dd
{
	font-family:Verdana,sans-serif;
}
```

4.0浏览器无法理解继承，不过我们可以理解组选择器。这么做虽然会浪费一些用户的带宽，但是如果需要对Netscape 4用户进行支持，就不得不这么做。

## 四 继承是一个诅咒吗？

如果 不希望"Verdana,sans-serif"字体被所有的子元素继承，又该怎么做呢？比方说，你希望段落的字体是Times。没问题，创建一个针对p的特殊规则，这样它就会拜托父元素的规则：

```
body
{
	font-family:Verdana,sans-serif;
}
td,ul,ol,ul,li,dl,dt,dd
{
	font-family:Verdana,sans-serif;
}
p
{
	font-family:Times,"Times New Roman",serif;
}
```

