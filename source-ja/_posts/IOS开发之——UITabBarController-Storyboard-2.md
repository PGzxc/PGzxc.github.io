---
title: IOS开发之——UITabBarController-Storyboard(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: b85fd741
date: 2020-10-21 23:35:12
---
## 一 概述

上一篇文章介绍如何通过代码创建UITabBarController，本文主要介绍

* 如何使用Storyboard创建UITabBarController
* 如何添加ViewController
* 给BarItem设置Badge,Title,Image,Selected Image

<!--more-->

## 二 如何通过storyboard创建UITabBarController

* 新创建一个项目，并将Main.storyboard中默认的ViewController删除
  ![][1]
  
* 点击Xcode右上方的“+”，从下拉组件中，选择TabBarController(默认带两个Controller)
  ![][2]
  
* 将页面缩放到指定大小，另外添加2个ViewController
  ![][3]
  
* 在UITabBarController上右键，找到右方的“+”号，链接到另外的两个ViewController上
	![][4]
	
* 确认项目右侧的“Is Initial VIew Controller”是否勾选
  ![][5]
  
* 点击ViewController中的BarItem分别设置Badge,Title,Image,Selected Image

  ```
  Badge:消息数
  Title:标题
  Image:未选中时图片
  Selected Image：选中时图片
  ```
  ![][6]

## 三 效果图
![][7]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitabbar-viewcontroller-delete-mainstory-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitabbar-viewcontroller-add-tabbar.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tabbar-viewcontroller-add-controller.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tabbar-viewcontroller-connect-viewcontroller.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tabbar-viewcontroller-isinitial-select.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tabbar-viewcontroller-baritem-setting.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitabbar-viewcontroller-storyboard-view.gif
