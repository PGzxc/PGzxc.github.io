---
title: React Native开发之——组件TextInput(3)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件TextInput
abbrlink: d8acfc56
date: 2018-03-04 17:19:35
---
# 前言 
前两节已经讲了TextInput的大部分属性，本文将继续介绍TextInput的属性，内容如下：  

- editable、value和defaultValue
- onChange和onChangeText
- 获取文本输入 

<!--more-->

# TextInpupt
## editable、value和defaultValue
### 概念 

- editable:用于说明TextInput是否可编辑
- value：TextInput的值
- defaultValue：TextInput的默认值 

### 使用 
![][1]  
### 效果图
![][2]  
## onChange和onChangeText
### 概念 

- onChange：当TextInput的文本发生变化时回调
- onChangeText：当TextInput的文本发生变化时回调，能够获取TextInput的变化

### 使用
![][3]  
### 效果图 
![][4]
## 获取文本输入 
### 概念
当TextInput内容变化时，获取TextInput中的内容
### 实战 
![][5]
### 效果图 
![][6]

# 其他 
参考： [RN_TextInput][7]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/rn-textinput-editable.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/rn-textinput-editable-look.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/rn-textinput-onchange.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/rn-textinput-onchange.gif
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/rn-textinput-statechange.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/rn-textinput-statechange.gif
[7]: https://github.com/PGzxc/RN_TextInput

