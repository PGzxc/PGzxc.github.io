---
title: IOS开发之——QQ主流框架
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: c4b086f1
date: 2020-12-02 00:17:20
---
## 一 概述

本文搭建QQ主流框架程序，包含以下功能：

* 底部有：消息、联系人、动态、设置四个按钮，通过按钮切换对应的界面
* 每个界面有界面布局和按钮
  - 联系人界面：UISegmentedControl切换和添加联系人按钮跳转到联系人添加界面
  - 动态、设置页面：分组

<!--more-->

## 二 QQ主流框架(Main.storyboard)

### 2.1 界面拖拽布局

* 移除旧的布局(xcode自动生成)
* 添加一个TabBarController作为主程序界面
* 依次添加4个Navigation Controller(消息、联系人、动态、设置)

### 2.2 连线

* 在TabBarController上右键view controllers，分别连接到消息、联系人、动态、设置四个Navigation Controller上

### 2.3 设置Navigation Controller上的文字和图片

* 点击消息(Navigation Controller)，在右侧设置显示的问题和图片
* 同理，设置其他三个Navigation Controller

![][1]

## 三 界面详情

### 3.1 消息

* 点击Navigation Item设置Title为消息
* 添加Bar Button Item，并修改显示的图片

### 3.2 联系人

#### 3.2.1 界面修改

* 添加Segmented Control，并设置Segments为2；Segments-0为分组，Segments-1为全部
* 添加Bar Button Item，并修改图标为添加联系人

#### 3.2.2 Segmented事件

* 新建ContactTableViewController，并关联联系人控制器

* ContactTableViewController中添加Segmented事件方法

  ```
  - (IBAction)valueChange:(UISegmentedControl *)sender
  {
      NSLog(@"%d",sender.selectedSegmentIndex);
  }
  ```

#### 3.2.3 添加联系人跳转

* 点击添加联系人Bar Button Item，show关联到添加联系人界面

### 3.3 动态、设置(分组)

* 点击TabView，Content下拉选择Static Cells
* Style下拉选择Grouped
* 点击Grouped中的单元格，Style下拉选择Basic，Accessory下拉选择Disclosure Indicator(右箭头)，同时设置显示文字(好友动态)和对应图片
* 同理设置其他分组

## 四 效果图

![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-qq-struct-navigation-controller-text-image.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-qq-struct-preview.gif