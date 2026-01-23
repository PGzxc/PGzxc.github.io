---
title: CSS开发之——框模型边框(3.3)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: 7c04a114
date: 2020-09-24 21:46:55
---
## 一 概述

元素的边框(border)是围绕元素内容和内边距的一条或多条线。

CSS border属性允许你规定元素边框的样式、宽度和颜色

<!--more-->

## 二 CSS边框

在HTML中，我们使用表格来创建文本周围的边框，但是通过使用CSS边框属性，我们可以创建出效果出色的边框，并且可以应用于任何元素。

元素外边距内就是元素的边框(border)。元素的边框就是围绕元素内容和内边距的一条或多条线。

每个边框有3个方面：宽度、样式以及颜色。

### 2.1 边框与背景

CSS规范指出，边框绘制在“元素的背景之上”。这很重要，因为有些边框是“间断的”(例如，电线边框或虚线框)，元素的背景应当出现在边框的可见部分之间。

CSS2指出背景只延伸到内边距，而不是边框。后来CSS2.1进行了更正：元素的背景是内容、内边距和边框区的背景。大多数浏览器都遵循CSS2.1定义，不过一些较老的浏览器可能会有不同的表现。

### 2.2 边框的样式

#### 2.2.1 概念

样式是边框最重要的一个方面，这不是因为样式控制着边框的显示(当然，样式确实控制着边框的显示)，而是因为如果没有样式，将根本没有边框

CSS的border-style属性定义了10个不同的非inherit样式，包括none

例如，你可以把一幅图片的边框定义为outset，使之看上去像是“凸起按钮”

```
a:link img{border-style:outset;}
```

#### 2.2.2 定义多种样式

你可以 一个边框定义多个样式，例如：

```
p.aside{border-style:solid dotted dashed double;}
```

上面这条规则为类名为aside的段落定义了四种边框样式：实线上边框、点线有边框、虚线下边框和一个双线左边框。

我们又看到了这里的值采用了top-right-bottom-left的顺序，讨论用多个值设置不同内边距时也见过这个顺序。

#### 2.2.3 定义单边样式

如果你希望为元素框的某一个边设置边框样式，而不是设置所有4个边的边框样式，可以使用下面的单边边框样式属性：

* border-top-style
* border-right-style
* border-bottom-style
* border-left-style

因此这两种方法是等价的：

```
p {border-style: solid solid solid none;}
p {border-style: solid; border-left-style: none;}
```

<font color="red">注意：</font>如果要使用第二种方法，必须把单边属性放在简写属性之后。因为如果把单边属性放在border-style之前，简写属性就会覆盖单边值none。

### 2.3 边框的宽度

#### 2.3.1 概念

你可以通过border-width属性为边框指定宽度。

为边框指定宽度有两种方法：可以指定长度值，比如2px或0.1em；或者使用3个关键字之一，它们分别是thin、medium(默认值)和thick

所以，我们可以这样设置边框的宽度：

```
p{border-style:solid;border-width:5px;}
```

或者：

```
p{border-style:solid;border-width:thick;}
```

#### 2.3.2 定义单边宽度

你可以按照top-right-bottom-left的顺序设置元素的各边边框：

```
p{border-style:solid;border-width:15px 5px 15px 5px;}
```

上面的例子也可以简写为(这样写法称为值复制)：

```
p{border-style:solid;border-width:15px 5px;}
```

你也可以通过下列属性分别设置边框各边的宽度：

* border-top-width
* border-right-width
* border-bottom-width
* border-left-width

因此，下面的规则与上面的例子是等价的：

```
p {
  border-style: solid;
  border-top-width: 15px;
  border-right-width: 5px;
  border-bottom-width: 15px;
  border-left-width: 5px;
  }
```

#### 2.3.3 没有边框

在前面的例子中，你已经看到，如果希望显示某种边框，就必须设置边框样式，比如solid或outset

那么如果把border-style设置为none会出现什么情况：

```
p{border-style:none;border-width:50px;}
```

尽管边框的宽度是50px，但是边框样式设置为none。在这种情况下，不仅边框的样式没有了，其宽度也会变成0.边框消失了，为什么呢？

这是哪位如果边框样式为none，即边框根本不存在，那么边框就不可能有宽度，因此边框宽度自动设置为0，而不论你原先定义的是什么。

记住这一点非常重要。事实上，忘记声明边框样式是一个常犯的错误。根据以下规则，所有h1元素都不会有任何边框，更不用说20像素了：

```
h1{border-width:20px;}
```

由于border-style的默认值是none，如果没有声明样式，就相当于border-style:none。因此，如果你希望边框出现，就必须声明一个边框样式。

### 2.4 边框的颜色

#### 2.4.1 概念

设置边框颜色非常简单。CSS使用一个简单的border-color属性，它一次可以接受最多4个颜色值。

可以使用任何类型的颜色值，例如可以是命名颜色，也可以是十六进制和RGB值：

```
p {
  border-style: solid;
  border-color: blue rgb(25%,35%,45%) #909090 red;
}
```

如果颜色值小于4个，值复制就会起作用。例如下面的规则声明了段落的上下边框是蓝色，左右边框是红色：

```
p {
  border-style: solid;
  border-color: blue red;
  }
```

**注释：**默认的边框颜色是元素本身的前景色。如果没有为边框声明颜色，它将与元素的文本颜色相同。另一方面，如果元素没有任何文本，假设它是一个表格，其中只包含图像，那么该表的边框颜色就是其父元素的文本颜色(因为color可以继承)。这个父元素很可能是body、div或另一个table。

#### 2.4.2 定义单边颜色

还有一些单边边框颜色属性。它们的原理与单边样式和宽度属性相同：

* border-top-color
* border-right-color
* border-bottom-color
* border-left-color

要为h1元素指定实线黑色边框，而右边框为实线红色，可以这样指定：

```
h1 {
  border-style: solid;
  border-color: black;
  border-right-color: red;
  }
```

#### 2.4.3 透明边框

如果边框没有样式，就没有宽度。不过有些情况下可能希望创建一个不可见的边框。

CSS2引入了边框颜色值transparent。这个值用于创建有宽度的不可见边框。

```
<a href="#">AAA</a>
<a href="#">BBB</a>
<a href="#">CCC</a>
```

我们为上面的链接定义了如下样式：

```
a:link, a:visited {
  border-style: solid;
  border-width: 5px;
  border-color: transparent;
  }
a:hover {border-color: gray;}
```

从某种意义上说，利用transparent，使用边框就像是额外的内边距一样；此外还有一个好处，就是能在你需要的时候使其可见。这种透明边框相当于内边距，因为元素的背景会延伸到边框区域(如果有可见背景的话)

<font color="red">重要实现：</font>在IE7之前，IE/WIN没有提供对transparent的支持。在以前的版本，IE会根据元素的color值来设置边框颜色。

## 三 CSS边框属性

|        属性         |                             描述                             |
| :-----------------: | :----------------------------------------------------------: |
|       border        |        简写属性，用于把针对四个边的属性设置在一个声明        |
|    border-style     |   用于设置元素所有边框的样式，或者单独地为各边设置边框样式   |
|    border-width     | 简写属性，用于为元素的所有边框设置宽度，或者单独地为各边边框设置宽度 |
|    border-color     | 简写属性，设置元素的所有边框中可见部分的颜色，或为4个边分别设置颜色 |
|    border-bottom    |       简写属性，用于把下边框的所有属性设置到一个声明中       |
| border-bottom-color |                    设置元素的下边框的颜色                    |
| border-bottom-style |                    设置元素的下边框的样式                    |
| border-bottom-width |                    设置元素的下边框的宽度                    |
|     border-left     |      简写属性，用于把左边边框的所有属性设置到一个声明中      |
|  border-left-color  |                    设置元素的左边框的颜色                    |
|  border-left-width  |                    设置元素的左边框的宽度                    |
|     border-top      |       简写属性，用于把上边框的所有属性设置到一个声明中       |
|  border-top-color   |                    设置元素的上边框的颜色                    |
|  border-top-style   |                    设置元素的上边看到样式                    |
|  border-top-width   |                    设置元素的上边框的宽度                    |

