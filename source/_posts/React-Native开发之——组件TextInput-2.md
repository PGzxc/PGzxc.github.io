---
title: React Native开发之——组件TextInput(2)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件TextInput
abbrlink: c1b7cd17
date: 2018-03-04 16:26:28
---
# 前言 
前片文章已经简单介绍了组件TextInput的基本用法，本文将继续介绍其他属性的用法，内容如下：  

- maxLength属性
- multiline属性
- placeholder和placeholderTextColor属性
- secureTextEntry属性
- selectTextOnFocus和selectionColor属性

<!--more-->

# TextInput
## maxLength
### 概念
maxLength，用于限定输入TextInput的字符的个数，类型值为number
### 使用 
![][1]
### 效果 
如下图，设置maxlength为5，输入第6个字符时，不进入TextInput内  
![][2]
## multiline属性
### 概念
multiline，用于限定TextInput是否可以输入多行文本，默认值为false
### 使用 
![][3] 
### 效果
![][4]
## placeholder和placeholderTextColor属性
### 概念 
用于在输入文本输入前将呈现的字符串和字符串颜色
### 使用
![][5]  
### 效果
![][6]
## secureTextEntry属性
### 概念
如果为真，文本输入会模糊输入的文本，这样敏感的文本如密码保持安全。默认值为false。
### 使用
![][7]
### 效果 
![][8]
## selectTextOnFocus和selectionColor属性
### 概念
selectTextOnFocus和selectionColor，用于设置获取焦点时，选中文本，并设置选中文本的颜色
### 使用
![][9]
### 效果 
![][10]  
# 其他 
参考： [RN_TextInput][11]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-maxlength-code.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-maxlength.gif
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-multiline-code.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-multiline-look.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-placeholder.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-placeholder.gif
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-securetextentry.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-securetextentry.gif
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-selectonfocus.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-selectTextOnFocus.gif
[11]: https://github.com/PGzxc/RN_TextInput