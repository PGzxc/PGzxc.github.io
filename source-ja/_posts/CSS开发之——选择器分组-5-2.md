---
title: CSS开发之——选择器分组(5.2)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: c56d33ba
date: 2020-09-25 21:40:21
---
## 一 选择器分组

假设希望h2元素和段落都有灰色。为达到这个目的，最容易的做法是使用以下声明：

```
h2, p {color:gray;}
```

将h2和p选择器放在规则左边，然后用逗号分隔，就定义了一个规则。其右边的样式(color:gray)将应用这两个选择器所引用的元素。逗号告诉浏览器，规则中包含两个不同的选择器。如果没有这个逗号，那么规则的含义将完全不同。参见后代选择器。
<!--more-->
可以将任意多个选择器分组在一起，对此没有任何限制。

例如，如果你想把很多元素显示为灰色，可以使用类似如下的规则：

```
body, h2, p, table, th, td, pre, strong, em {color:gray;}
```

<font color="orange">提示：</font>通过分组，创作者可以将某些类型的样式“压缩”在一起，这样就可以得到更简洁的样式表。

一下的两组规则能得到同样的结果，不过可以很清楚地看出哪个写起来更容易：

```
/* no grouping */
h1 {color:blue;}
h2 {color:blue;}
h3 {color:blue;}
h4 {color:blue;}
h5 {color:blue;}
h6 {color:blue;}

/* grouping */
h1, h2, h3, h4, h5, h6 {color:blue;}
```

分组提供了一些有意思的选择。例如，下例中的所有规则分组都是等价的，每个组只是展示了对选择器和声明分组的不同方法：

```
/* group 1 */
h1 {color:silver; background:white;}
h2 {color:silver; background:gray;}
h3 {color:white; background:gray;}
h4 {color:silver; background:white;}
b {color:gray; background:white;}

/* group 2 */
h1, h2, h4 {color:silver;}
h2, h3 {background:gray;}
h1, h4, b {background:white;}
h3 {color:white;}
b {color:gray;}

/* group 3 */
h1, h4 {color:silver; background:white;}
h2 {color:silver;}
h3 {color:white;}
h2, h3 {background:gray;}
b {color:gray; background:white;}
```

## 二 通配符选择器

CSS2引入了一种新的简单选择器—通配符选择器(universal selector)，显示为一个星号(*)。该选择器可以与任何元素匹配，就像是一个通配符。

例如，下面的规则可以使文档中的每个元素都为红色：

```
* {color:red;}
```

这个声明等价于列出了文档中所有元素的一个分组选择器。利用统配选择器，只需敲一个键(仅一个星号)就能使文档中的所有元素的color属性指定为red。

## 三 声明分组

我们既可以对选择器进行分组，也可以对声明分组。

假设你希望所有h1元素都有红色背景，并使用28像素高的Verdana字体显示为蓝色文本，可以写以下样式：

```
h1 {font: 28px Verdana;}
h1 {color: blue;}
h1 {background: red;}
```

但是上面的这种做法的效率不高。尤其是当我们为一个有多个样式的元素创建这样一个列表时会很麻烦。相反，我们麽易将生命分组在一起：

```
h1 {font: 28px Verdana; color: white; background: black;}
```

这与前面的3行样式表的效果完全相同。

注意，对声明分组，一定要在各个声明的最后使用分号，这很重要。浏览器会忽略样式表中的空白符。只要加了分号，就可以毫无顾忌地采用以下格式建立样式：

```
h1 {
  font: 28px Verdana;
  color: blue;
  background: red;
  }
```

怎么样，上面这种写法的可读性是不是更强。

不过，如果忽略了第二个分号，用户代理就不会把这个样式表解释如下：

```
h1 {
  font: 28px Verdana;
  color: blue background: red;
  }
```

因为background对color来说不是一个合法值，而且由于只能为color指定一个关键字，所以用户代理会完全忽略这个color声明(background:black部分)。这样h1标题只会显示为蓝色，而没有红色背景，不过更有可能根本得不到蓝色的h1.相反，这些标题只会显示为默认颜色(通常是黑色)，而且根本没有背景色。font：28px Verdana声明仍能正常发挥作用，因为它确实正确地以一个分号结尾。

与选择器分组一样，声明分组也是一种便利的方法，可以缩短样式表，使之更清晰，也更易维护。

<font color="orange">提示：</font>在规则的最后一个声明后也加上分号是一个好习惯。在向规则增加另一个声明时，就不必担心忘记再插入一个分号。

## 四 结合选择器和声明的分组

我们可以在一个规则中结合选择器分组和声明分组，就可以使用很少的语句定义相对复杂的样式。

下面的规则为所有标题指定了一种复杂的样式：

```
h1, h2, h3, h4, h5, h6 {
  color:gray;
  background: white;
  padding: 10px;
  border: 1px solid black;
  font-family: Verdana;
  }
```

上面这条规则将所有标题的样式定义为带有白色背景的灰色文本，其内边距是10像素，并带有1像素的实心边框，文本字体是 Verdana。