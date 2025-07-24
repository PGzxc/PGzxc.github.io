---
title: React Native开发之——Flex布局(7)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - Flex布局
abbrlink: b531856b
date: 2018-03-03 21:20:44
---
## 一 概述
```
React中引入了flexbox概念,flexbox是属于web前端领域CSS的一种布局方案，
是2009年W3C提出了一种新的布局方案，可以简便、完整、响应式地实现各种页面布局。
你可以简单的理解为flexbox是CSS领域类似Android中 LinearLayout的一种布局，但是要比 LinearLayout要强大的多。

本文主要讲述Flex布局，包含以下几个：  

- flexDirection
- flexWrap
- justifyContent
- alignItems
- flex
```

<!--more-->

## 二 Flex布局
### 2.1 图是W3C Flexbox布局模型

| 1-W3C Flexbox布局模型 | 2-React Native目前版本为0.54 |
| :-------------------: | :--------------------------: |
|        ![][1]         |            ![][2]            |

### 2.2 简要介绍

```
flexbox由伸缩容器和伸缩项目组成；任何一个元素都可以指定flexbox布局，伸缩容器的子元素可以称为伸缩项目；
伸缩项目使用伸缩布局模型来排版；

在默认情况下，伸缩容器由两根轴组成：主轴(main axis)和交叉轴(cross axis)，
主轴的开始位置叫做main start，结束位置叫做main end；
交叉轴的开始位置叫做cross start，结束位置叫做cross end；
伸缩项目在主轴上占据的空间叫做main size，在交叉轴上占据的空间叫做cross size；   
```

## 三 属性介绍及演示

### 3.1 flexDirection

1、属性说明

```
flexDirection控制主轴的方向，它有四个值：  

- 'row'
- 'row-reverse'
- 'column'
- 'column-reverse'
```

2、图示

| 1-属性介绍 | 2-代码 | 3-效果 |
| :--------: | :----: | :----: |
|   ![][2]   | ![][3] | ![][4] |

### 3.2 flexWrap

1、属性说明

```
flexWrap控制当子view到达末尾时是否绕行，它有两个值(默认是nowrap)：  

- wrap
- nowrap
```

2、图示

| 1-属性介绍 | 2-代码 | 3-效果(nowrap) | 4-效果(wrap) |
| :--------: | :----: | :------------: | ------------ |
|   ![][9]   | ![][6] |     ![][7]     | ![][8]       |

### 3.3 justifyContent

1、属性说明

```
justifyContent，用来定义伸缩项目沿主轴线的对其方式：，它有以下6个值：  

- flex-start
- flex-end
- center
- space-between
- space-around
- space-evenly
```

2、图示

| 1-属性介绍 | 2-代码  | 3-效果  |
| :--------: | :-----: | :-----: |
|  ![][10]   | ![][11] | ![][12] |

### 3.4 alignItems

1、属性说明

```
alignItems，用来定义交叉轴的对其方式：，它有以下5个值：

- flex-start
- flex-end
- center
- stretch
- baseline
```

2、图示

| 1-属性介绍 | 2-代码  | 3-效果  |
| :--------: | :-----: | :-----: |
|  ![][13]   | ![][14] | ![][15] |

### 3.5 flex  

1、属性说明

```
flex(数值型的属性值)：类似于Android中的layout-weight，用于收缩项目向右尽可能扩展。  
```

2、图示

| 1-属性介绍 | 2-代码  | 3-效果  |
| :--------: | :-----: | :-----: |
|  ![][16]   | ![][17] | ![][18] |

## 四 参考
参考： [RNFlex](https://github.com/PGzxc/RNFlex)




[0]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-flex-props.png
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-flex-layouts.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-flex-layout-flexdirection.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-flex-code-column.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-flex-look-column.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-flex-look-row.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-flex-code-flex-wrap.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-layout-flexwrap-no.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-layout-flexwrap-yes.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-prop-flexwrap.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-prop-justifyContent.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-flex-code-justifycontent.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-flex-look-justifycontent.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-prop-alignitems.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-layout-algnitems-code.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-algnitems-look.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-prop-flex.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-layout-flex-code.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/react-native-flex-look.png
[19]: 