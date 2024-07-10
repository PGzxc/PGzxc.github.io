---
title: OC开发之——xcode模版修改(30)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: eca096b0
date: 2020-04-09 22:59:38
---
## 一 概述

* 项目模板就是创建工程的时候选择的某一个条目, Xcode会根据选择的条目生成固定格式的项目
* 本文以xcode的Command Line Tool项目为例，介绍如何修改xcode模版

<!--more-->

## 二 Xcode模版修改

### 2.1 main.m模版修改

* 应用程序中,找到Xcode, 右键"显示包内容"

* 打开“/Applications/Xcode.app/Contents/Developer/Library/Xcode/Templates/Project Templates/Mac/Application/Command Line Tool.xctemplate“

  ![][1]

* 使用xcode打开文件夹下的TemplateInfo.plist
	![][2]
* 若修改模版的内容，使用“文本编辑器”打开，搜索“Hello,World"
	![][3]

### 2.2 修改类文件(.h文件和.m文件)

* 应用程序中,找到Xcode, 右键"显示包内容"

* 打开“/Applications/Xcode.app/Contents/Developer/Library/Xcode/Templates/File Templates/Source/Cocoa Class.xctemplate/NSObjectObjective-C”路径

  ```
  ___FILEBASENAME___.h——头文件了
  ___FILEBASENAME___.m——类实现
  ```

* \___FILEBASENAME\___.h

  ```
  //___FILEHEADER___
  
  ___IMPORTHEADER_cocoaSubclass___
  
  NS_ASSUME_NONNULL_BEGIN
  
  @interface ___FILEBASENAMEASIDENTIFIER___ : ___VARIABLE_cocoaSubclass___
  
  @end
  
  NS_ASSUME_NONNULL_END
  ```

* \___FILEBASENAME\___.m类实现文件

  ```
  //___FILEHEADER___
  
  #import "___FILEBASENAME___.h"
  
  @implementation ___FILEBASENAMEASIDENTIFIER___
  
  @end
  ```

  



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-command-line-template.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-command-line-templateinfo-xcode-open.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-command-line-template-modify.png