---
title: OS开发之——第一个IOS应用
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - 基础
abbrlink: 32c5b02a
date: 2018-07-09 15:56:02
---

## 概述
* 上一篇介绍了IOS入门相关的知识点，本文介绍第一个IOS小应用——加法计算器
* 鉴于iOS开发语言，本文提供Object-C、Swift两种方式。   

<!--more-->

## 二 窗口介绍
### 2.1 文件导航区

#### show the project navigator(项目文件)
![][1]  

1. 项目源码文件
2. 测试相关
3. UI测试相关
4. Products(配置文件)

#### show the source control navigator(版本控制)
![][2]  

1. Branches(分支)
2. Tags(标签)
3. Remotes(远程)

#### show the symbol navigator(符号导航)
![][3] 
#### show the find navigator(查找导航)
定位到此栏会出现搜索框，输入内容，可搜索内容
![][4]
#### show the issue navigator(错误信息导航)
此栏下会显示错误及警告信息 
![][5]
#### show the test navigator(测试导航)
此栏下显示测试及UI测试信息
![][6]
#### show the debug navigator(Debug导航)
此栏下显示Debug调试信息
![][7]
#### show the breakPoint navigator(断点导航)
此栏下显示Debug断点调试信息
![][8]
#### show the report navigator(报告导航)
此栏下显示运行及调试日志
![][9]

### 2.2 显示隐藏窗口
该区域用于控制窗口的显示和隐藏   
![][10]

* show the stander editor：标准编辑器
* show the Assistant editor：助理编辑器
* show the version editor：版本控制编辑器
* hide or show the navigator：显示或隐藏导航(最左侧的窗口)
* hide or show the debug area：显示或隐藏Debug区域(窗口下方)
* hide or show the Utilities：显示或隐藏公共组件(窗口最右侧)

### 2.3 公共组件
![][11]

## 三 预备知识
###  3.1 开发步骤
1. 新建项目
2. 搭建UI界面
3. 监听按钮点击事件
4. 获取文本框内容
5. 将结果显示在文本标签中

### 3.2 搭建UI界面
Main.storyboard文件就可以修改UI界面，左边的箭头表明：程序一启动就会显示箭头所指的界面
### 3.3  显示控件
#### UIView
1. 屏幕上能看得见摸得着的东西就是UIView，比如屏幕上的按钮、文字、图片
2. 一般翻译叫做：视图\控件\组件
3. UIButton、UILabel、UITextField都继承自UIView
4. 每一个UIView都是一个容器，能容纳其他UIView

#### UILabel – 文本标签
文本标签的作用是显示一串固定的文字
#### UIButton
按钮的作用是：监听用户的点击事件，在用户点击后做出响应
#### UITextField – 文本输入框
文本输入框可以弹出键盘，让用户输入文本内容

### 3.4  UIViewController
1. UIViewController负责管理这个UIView
2. UIViewController就是UIView的大管家，负责创建、显示、销毁UIView，负责监听UIView内部的事件，负责处理UIView与用户的交互
3. UIViewController内部有个UIView属性，就是它负责管理的UIView对象 ：
@property(nonatomic,retain) UIView *view;

###  3.5 IBAction和IBOutlet
#### IBAction
1. 从返回值角度上看，作用相当于void
2. 只有返回值声明为IBAction的方法，才能跟storyboard中的控件进行连线

#### IBOutlet
1. 只有声明为IBOutlet的属性，才能跟storyboard中的控件进行连线


## 四 开发

### 4.1 Object-C下开发实例
#### 创建项目时，选择Object-c语言
![][12]
#### 布局及代码逻辑
![][13]  
![][14]
#### 运行调试
![][15]

### 4.2 Swift下开发实例
#### 创建项目时，选择Swift语言
![][16]
#### 布局及代码逻辑
![][17]
#### 运行调试
![][18]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-navigator-project.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-navigator-version.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-navigator-symbol.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-navigator-search.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-navigator-error.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-navigator-test.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-navigator-debug.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-navigator-breakpoint.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-navigator-report.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-show-hidden-area.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-component.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-project-object-c.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-project-h-file.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-project-h-file.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-object-run.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-project-swift.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-swift-project-code.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-swift-run.png
