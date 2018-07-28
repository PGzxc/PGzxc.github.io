---
title: React Native开发之——Flex布局
date: 2018-03-03 21:20:44
categories: [开发,移动开发,React Native]
tags: [Flex布局]
---
# 前言 
React中引入了flexbox概念,flexbox是属于web前端领域CSS的一种布局方案，是2009年W3C提出了一种新的布局方案，可以简便、完整、响应式地实现各种页面布局。你可以简单的理解为flexbox是CSS领域类似Android中 LinearLayout的一种布局，但是要比 LinearLayout要强大的多。

本文主要讲述Flex布局，包含以下几个：  

- flexDirection
- flexWrap
- justifyContent
- alignItems
- flex

<!--more-->

# Flex布局
## Flex布局概念 
![][1]   
图是W3C Flexbox布局模型：

flexbox由伸缩容器和伸缩项目组成；任何一个元素都可以指定flexbox布局，伸缩容器的子元素可以称为伸缩项目；伸缩项目使用伸缩布局模型来排版；在默认情况下，伸缩容器由两根轴组成：主轴(main axis)和交叉轴(cross axis)，主轴的开始位置叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end；伸缩项目在主轴上占据的空间叫做main size，在交叉轴上占据的空间叫做cross size；   
 
React Native目前版本为0.54， 本文所用属性位于APIs->Layout Props下  
![][0]
## flexDirection
### 属性说明
flexDirection控制主轴的方向，它有四个值：  

- 'row'
- 'row-reverse'
- 'column'
- 'column-reverse'

![][2]
### 代码 
![][3]
### 效果图 
![][4] ![][5] 

## flexWrap
### 属性说明
flexWrap控制当子view到达末尾时是否绕行，它有两个值(默认是nowrap)：  

- wrap
- nowrap

![][9]
### 代码
增加到12个Text
![][6]
### 效果 
#### flexWrap=nowrap时，如下：   
![][7]  
#### flexWrap=wrap时，如下:   
![][8]  
## justifyContent
### 属性说明 
justifyContent，用来定义伸缩项目沿主轴线的对其方式：，它有以下6个值：  

- flex-start
- flex-end
- center
- space-between
- space-around
- space-evenly

![][10]
### 代码 
![][11]
### 效果图 
![][12]  
## alignItems
### 属性说明
alignItems，用来定义交叉轴的对其方式：，它有以下5个值：

- flex-start
- flex-end
- center
- stretch
- baseline

![][13] 
### 代码
![][14]
### 效果图
![][15]  
## flex  
### 属性说明 
flex(数值型的属性值)：类似于Android中的layout-weight，用于收缩项目向右尽可能扩展。  
![][16] 
### 代码 
![][17]
### 效果 
![][18]

# 其他
参考： [RNFlex][19]




[0]: http://p4ykqh02p.bkt.clouddn.com/react-native-flex-props.png
[1]: http://p4ykqh02p.bkt.clouddn.com/react-native-flex-layouts.png
[2]: http://p4ykqh02p.bkt.clouddn.com/react-native-flex-layout-flexdirection.png
[3]: http://p4ykqh02p.bkt.clouddn.com/react-native-flex-code-column.png
[4]: http://p4ykqh02p.bkt.clouddn.com/react-native-flex-look-column.png
[5]: http://p4ykqh02p.bkt.clouddn.com/react-native-flex-look-row.png
[6]: http://p4ykqh02p.bkt.clouddn.com/react-native-flex-code-flex-wrap.png
[7]: http://p4ykqh02p.bkt.clouddn.com/react-native-layout-flexwrap-no.png
[8]: http://p4ykqh02p.bkt.clouddn.com/react-native-layout-flexwrap-yes.png
[9]: http://p4ykqh02p.bkt.clouddn.com/react-native-prop-flexwrap.png
[10]: http://p4ykqh02p.bkt.clouddn.com/react-native-prop-justifyContent.png
[11]: http://p4ykqh02p.bkt.clouddn.com/react-native-flex-code-justifycontent.png
[12]: http://p4ykqh02p.bkt.clouddn.com/react-native-flex-look-justifycontent.png
[13]: http://p4ykqh02p.bkt.clouddn.com/react-native-prop-alignitems.png
[14]: http://p4ykqh02p.bkt.clouddn.com/react-native-layout-algnitems-code.png
[15]: http://p4ykqh02p.bkt.clouddn.com/react-native-algnitems-look.png
[16]: http://p4ykqh02p.bkt.clouddn.com/react-native-prop-flex.png
[17]: http://p4ykqh02p.bkt.clouddn.com/react-native-layout-flex-code.png
[18]: http://p4ykqh02p.bkt.clouddn.com/react-native-flex-look.png
[19]: https://github.com/PGzxc/RNFlex