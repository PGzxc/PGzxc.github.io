---
title: IOS开发之——版本控制-Git(02)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 版本控制
abbrlink: 20ef71e8
date: 2022-03-25 20:21:57
---
## 一 概述

* Git服务器端创建代码仓库和开发人员账户
* Xcode使用Git配置
* Xcode进行Git版本管理

<!--more-->

## 二 Git服务器端创建代码仓库和开发人员账户

Git服务器端使用的是GitStack

### 2.1 输入名字，创建代码仓库

![][1]

创建仓库之后的界面，如下图
![][2]

### 2.2 创建管理账户，并关联仓库

![][3]

## 三 Xcode使用Git配置

### 3.1 将Git仓库clone到本地

Git服务器端仓库地址

```
http://192.168.1.8/AppGit.git
```

在代码创建位置，打开终端，执行如下指令(第一次需要输入用户名和密码)，执行完毕后文件夹下有个.git隐藏文件

```
git clone http://192.168.1.8/AppGit.git
```

![][4]

打开Xcode，在之前的位置创建一个App项目

![][5]

创建完成后，显示添加(A)和修改(M)标志

![][6]

### 3.2 Xcode中Git配置

依次点击：Source Control——>Commit——>Commit时，显示如下信息

![][7]

点击Fix..，在打开的Source Control中，配置Git下的Author Name和Email(任意，服务器端使用的是 用户名和密码)

![][8]

## 四 Xcode进行Git版本管理

### 4.1 本地仓库提交到Git远程服务器端 

依次点击：Source Control——>Commit——>输入初始化信息，并提交

![][9]

提交后，Git服务器端代码视图

![][10]

### 4.2 创建分支

点击左侧的：Show the Source control Navigator，切换到版本管理按钮

![][11]

在Branches上右键，New Branch from..，创建Branch分支

![][12]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-gitstack-create-repo.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-gitstack-repo-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-gitstack-add-user.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-xcode-git-clone.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-xcode-create-app.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-xcode-app-open-view.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-xcode-commit-noauthor.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-xcode-sourcegit-author.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-xcode-commit-push.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-gitstack-commit-view.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-xcode-show-repository.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-versionc-02-xcode-branch-create.png

