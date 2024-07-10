---
title: IOS开发之——版本控制- SVN(01)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 版本控制
abbrlink: a058b4f3
date: 2022-03-24 22:27:36
---
## 一 概述

Xcoce默认的版本控制工具是Git，本文使用第三方工具Cornerstone演示SVN进行版本控制

* Cornerstone安装及介绍
* SVN版本控制演示

<!--more-->

## 二 Cornerstone安装及介绍

### 2.1 软件地址

软件地址：https://cornerstone.assembla.com

说明：收费软件，文本试用7天

![][1]

### 2.2 软件说明
![][2]

#### 顶部按钮

* Check out：检出
* New Folder：新建文件夹
* Tag：创建Tag标签
* Branch：创建Branch分支
* Revert：还原
* Update：更新(从代码仓库拉取)
* Commit：提交代码
* Merge：合并分支
* Import：导入
* Export：导出
* Shelve：搁置，停止
* Un Shelve：取消搁置

#### 底部按钮

* Add Working Copy：添加工作空间copy
* Add Repository：添加代码仓库

## 三 SVN版本控制演示

### 3.1 SVN仓库地址

```
https://192.168.1.8/svn/app/
```
![][3]

### 3.2 初始化仓库

点击`Add Repository`按钮，弹出仓库类型选择框
![][4]

选中HTTP Server，并分别输入：Protocol(协议)、Server(服务器ip地址)、Port(端口号)、Path(路径)及账号信息(用户名及密码)

![][5]

连接成功后，Cornerstone界面显示如下所示

![][6]

### 3.3 添加项目

Cornerstone中在trunk上右键选择import

![][7]

在打开的对话框中，选择进行SVN版本控制的项目

![][8]

执行提交操作时，填写LOG Message信息

![][9]

提交完成后，SVN trunk下的代码结构
![][10]

### 3.4 将SVN服务器端项目拉取到本地

Cornerstone中点击`Check Out`，选择本地输出文件位置

![][11]

拉取本地仓库后Cornerstone视图如下所示

![][12]

### 3.5 修改项目代码并更新到服务器

Xcode中打开项目，并在ViewController.m中添加了如下代码

```
NSLog(@"修改了代码");
```

Cornerstone中显示变化的代码，并标记为M(modify)

![][13]

点击Cornerstone中的Commit按钮，执行提交修改代码操作

![][14]

### 3.6 其他操作

* Tag：创建Tag标签
* Branch：创建分支等




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-cornerstone-page.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-cornerstone-open-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-repository-view.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-repository-type-select.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-repository-service-add.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-repository-add-success.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-repository-trunk-import.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-repository-trunk-import-select.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-repository-trunk-import-msg.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-repository-trunk-app.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-check-local-repo.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-local-repo-view.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-local-repo-change.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-01-local-repo-change-commit.png

