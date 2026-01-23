---
title: CSS开发之——样式背景(2.1)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: 608db89b
date: 2020-09-24 21:38:26
---
## 一 概述

* CSS允许应用纯色作为背景，也允许使用背景图像创建相当复杂的效果
* CSS在这方面的能力远在HTML之上

<!--more-->

## 二 背景色

可以使用background-color属性为元素设置背景色。这个属性接受任何合法的颜色值

这条规则把元素的背景设置为灰色

```
p{background-color:gray;}
```

如果你希望背景色从元素中的文本向外少有延伸，只需增加一些内边距：

```
p{background-color:gray;padding:20px;}
```

可以为所有元素设置背景色，这包括body一直到em和a等行内元素

background-color不能继承，其默认值是transparent。transparent有"透明"之意。也就是说，如果一个元素没有指定背景色，那么背景就是透明的，这样其祖先元素的背景才能可见

## 三 背景图像

要把图像放入背景，需要使用background-image属性。background-image属性的默认值是none，表示背景上没有放置任何图像

如果需要设置一个背景图像，必须为这个属性设置一个URL值：

```
body{background-image:url(/i/eg_bg_04.gif);}
```

大多数背景都应用到了body元素，不过并不仅限于此

下面例子为一个段落应用了一个背景，而不会对文档的其他部分应用背景：

```
p.flower{background-image:url(/i/eg_bg_03.gif);}
```

您甚至可以为行内元素设置背景图像，下面的例子为一个链接设置了背景图像

```
a.radio{background-image:url(/i/eg_bg_07.gif);}
```

理论上讲，设置可以向textareas和select等替换元素的背景应用图像，不过并不是所有用户代理都能很好地处理这种情况。

另外还要补充一点，background-image也不能继承。事实上，所有背景属性都不能继承

## 四 背景重复

如果需要在页面上对背景图像进行平铺，可以使用background-repeat属性。

属性值repeat导致图像在水平垂直方向上都平铺，就像以往背景图像的通用做法一样。repeat-x和repeat-y分别导致图像只在水平或垂直方向上重复，no-repeat则不允许图像在任何方向上平铺

默认地，背景图像将从一个元素的左上角开始。请看下面的例子：

```
body
{
	background-image:url(/i/eg_bg_03.gif);
	background-repeat:repeat-y;
}
```

## 五 背景定位

可以利用background-position属性改变图像在背景中的位置

下面的例子在body元素中将一个背景图像居中放置：

```
body
{
	background-image:url('i/eg_bg_03.gif');
	background-repeat:no-repeat;
	background-position:center;
}
```

为background-position属性提供值有很多方法。首先，可以使用一些关键字：top、bottom、left、right和center。通常，这些关键字会成对出现，不过也不总是这样。还可以使用长度值，如100px或5cm，最后也可以使用百分数值。不同类型的值对于背景图像的放置稍有差异。

## 六 关键字

图像放置位置最容易理解，其作用如其名称所表明的。例如，top right使图像放置在元素内边距区的右上角。

根据规范，位置关键字可以按任何顺序出现，只要保证不超过两个关键字-一个对应水平方向，另一个对象垂直方向

如果只出现一个关键字，则认为另一个关键字是center.

所以，如果希望每个段落的中部上方出现一个图像，只需声明如下：

```
p
{
	background-image:url('bgimage.gif');
	background-repeat:no-repeat;
	background-position:top
}
```

下面是等价的位置关键字：

| 单一关键字 |         等价的关键字         |
| :--------: | :--------------------------: |
|   center   |        center center         |
|    top     |  top center或center bottom   |
|   bottom   | bottom center或center bottom |
|   right    |  right center或center right  |
|    left    |   left center或center left   |

## 七 百分数值

百分数值的表现更为复杂。假设你希望用百分数值将图像在其元素中居中，这很容易：

```
body
{
	background-image:url('/i/eg_bg_03.gif');
	background-repeat:no-repeat;
	background-position:50% 50%;
}
```

这会导致图像适当放置，其中心与其元素的中心对齐。换句话说，百分数值同时应用于元素和图像。也就是说，图像中描述为50% 50%的点(中心点)与元素中描述为50% 50%的点(中心点)对齐

如果图像位于0% 0%，其左上角将放置在元素内边距区的左上角。如果图像位置是100% 100%，会使图像的右下角放在左边距的右下角

因此，如果你想把一个图像放在水平方向2/3、垂直方向1/3处，可以这样声明：

```
body
{
	background-image:url('i/eg_bg_03.gif');
	background-repeat:no-repeat;
	background-position:66% 33%;
}
```

如果只提供一个百分数值，所提供的这个值将用作水平值，垂直值将假设为50%。这一点与关键字类似

background-position的默认值是0% 0%，在功能上相当于top left。这就解释了背景图像为什么总是从元素内边距区的左上角开始平铺，除非你设置了不同的位置值

## 八 长度值

长度值解释的是元素内边距区左上角的偏移。便宜点是图像的左上角。

比如，如果设置值为50px 100px，图像的左上角将在元素内边距区左上角向右50像素、向下100像素的位置上：

```
body
{
	background-image:url('/i/eg_03.gif');
	background-repeat:no-repeat;
	background-position:50px 100px;
}
```

注意：这一点与百分数值不同，因为偏移只是从一个左上角到另一个左上角。也就是说，图像的左上角与background-position声明中的指定的点对齐

## 九 背景关联

如果文档比较长，那么文档向下滚动时，背景图像也会随之滚动。当文档滚动到超过图像的位置时，图像就会消失。

你可以通过background-attachment属性放置这种滚动。通过这个属性，可以声明图像相对于可视区是固定的(fixed)，因此不会受到滚动的影响：

```
body
{
	background-image:url('/i/eg_bg_02.gif');
	background-repeat:no-repeat;
	background-attachment:fixed;
}
```

background-attachment属性的默认值是scroll，也就是说，在默认情况下，背景会随文档滚动

## 十 CSS背景属性

|          属性          |                    描述                    |
| :--------------------: | :----------------------------------------: |
|       background       | 简写属性，作用是将背景属性设置在一个声明中 |
| background-attachement | 背景图像是否固定或者随着页面的其余部分滚动 |
|    background-color    |             设置元素的背景颜色             |
|    background-image    |              把图像设置为背景              |
|  background-position   |           设置背景图像的起始位置           |
|   background-repeat    |         设置背景图像是否及如何重复         |

