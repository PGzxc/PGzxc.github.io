---
title: IOS开发之——入门概述
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - 基础
abbrlink: 3b6fd622
date: 2018-07-09 11:10:33
---
## 一 Android、iOS系统架构对比
- android是基于Linux内核设计的，在Linux内核上面运行了一个Java虚拟机，虚拟机再运行软件。像是在一个系统上面又套了一个系统，所以占内存较大、运行速度略低
- iOS是基于UNIX的，直接与底层硬件通信。系统底层、应用框架、应用软件都是采用C/C++或者Objective-C写的，所以有很高的运行效率

<!--more-->


## 二 准备阶段
开发iOS应用，需要专门的硬件设备、开发工具、特定语言的支持，下面将逐一介绍这些知识点；

### 2.1 硬件
1. mac笔记本或一体机
2. 真机调试设备（可选）
3. 调试及发布证书（可选）

### 2.2  软件
1. Xcode

### 2.3  技能(知识点)
1. Object-c
2. Swift
3. C
4. C++

##  三 开发
###  3.1 官网地址
[官网: https://developer.apple.com/][8]   
[中文官网: https://developer.apple.com/cn/][9]

### 3.2 开发工具
#### Xcode 安装
打开AppStore,在输入框内输入Xcode，找到对应软件并安装
![][1]

#### Xcode介绍
![][2]  
playground是苹果公司2014年WWDC(苹果开发者大会)随Swift一起推出的，可以实现一边写代码，一边预览效果(实时预览代码的效果)的工具

##### 左面版

* Get started with a playground：创建playground项目
* create a new Xcode project：创建iPhone、iPad、mac、watch、TV应用
* clone an existing project：克隆已经存在的项目

##### 右面版
已经打开过的项目

### 3.3 开发阶段

#### 创建playground应用
依次选择：File——>New——>playground 创建playground应用，运行如下：  
![][3]  

#### 新建项目
##### 选择要创建的类型
![][4]  

##### app配置
1. Product Name:应用的名字
2. organization Name:组织名称
3. organization identifier:一般为公司反向域名
4. language:object-c 、swift
![][5]

##### 保存位置
选择应用保存的位置  
![][6] 

##### 项目目录介绍
进入应用后，如下图所示： 分为4大类 
![][7]

###### iosApp
开发ISO的项目目录；  

1. xxx.h:声明头文件
2. xxx.m:头文件对应的方法实现
3. main.storyboard: 布局面板

###### iosAppTests
测试相关文件
###### iOSAppUiTests
UI测试相关
###### Products
工程配置信息



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ios-xcode-search.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ios-xcode-main.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ios-playground-create.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ios-single-view.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/icon-project-config.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ios-app-create-position.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ios-project-iosapp.png

[8]: https://developer.apple.com/
[9]: https://developer.apple.com/cn/