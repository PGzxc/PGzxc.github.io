---
title: IOS开发之——更换Storyboard
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: b0dfabd
date: 2021-10-24 09:02:45
---
## 一 概述

* 新建项目的默认面板为`Main.storyboard`，用于向界面中添加控件并显示
* 向项目中添加新的storyboard，并替换`Main.storyboard`

<!--more-->

## 二 添加新的Storyboard

* 在`Main.storyboard`上右键，选择New File
  ![][1]
* 在User Interface 分类下，选择`Storyboard`，并点击Next按钮
  ![][2]
* 在弹出的对话框中重命名Storyboard
  ![][3]
* 新建后的`AA.storyboard`和`Main.storyboard`位置关系如下图
  ![][4]

### 三 AA.storyboard设置

### 3.1 新建的AA.storyboard(没有左箭头标志—Storyboard Entry Point)

![][5]

### 3.2 如何设置

#### 在`Show the Attributes Inspector`界面下，勾选`Is Initial View Controller`
![][6]
#### `Show the File Inspector`界面下，点击Localization下的`Localization`按钮

点击前
![][7]
点击后
![][8]

#### 给界面设置颜色(以区分Main.storyboard)
![][9]

## 三 默认Main.storyboard替换为新建的Storyboard

### 3.1 位置一(项目—>Targets—>General—>Deployment Info)

将`Main Interface`处的`Main`替换为`AA.storyboard`
![][10]

### 3.2 位置二(Info.plist中将Storyboard Name对应的Main修改为AA)
![][11]

## 四 修改完成后，效果图
![][12]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-right-new-file.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-user-interface-new.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-named-storyboard.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-main-new-relation.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-new-view.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-new-init-view-controller.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-new-localization-before.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-new-localization-after.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-new-background.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-main-interface-replace.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-info-plist-modify.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-new-monitor-view.png