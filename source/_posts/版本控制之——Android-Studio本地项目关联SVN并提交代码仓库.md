---
title: 版本控制之——Android Studio本地项目关联SVN并提交代码仓库
categories:
  - 开发
  - I-版本控制
  - SVN
tags:
  - SVN
abbrlink: 76563ff6
date: 2020-12-07 09:49:35
---
## 一 工具

* Android studio
* Tortoise SVN

<!--more-->

## 二 软件下载及配置
### 2.1 下载链接

* [Android studio下载链接][21]
* [Tortoise SVN下载链接][22]
### 2.2 软件安装及配置

#### SVN配置

安装过程中中，请选择`command line client tools`，不然没有bin目录下svn.exe文件

![][1]

#### Android 配置

项目下依次点击：File——>Settings——>Version Control——>Subversion，配置svn
![][2]

#### ignore忽略文件

```
.idea文件夹
.gradle文件夹
所有的build文件夹
所有的.iml文件
local.properties文件

Directory:.idea/
Directory:.gradle/
Directory:build/
Directory:app/build/
Mask:*.iml
File:local.properties
```

## 三 准备

### 3.1 SVN服务器项目

* 浏览器中使用SVN服务器路径、用户名、密码登录到SVN，现有项目查看
	![][3]
	
* 本地创建要提交到服务器的项目文件夹，并同步到服务器
  ![][4]
### 3.2 Enable SVN集成

* 打开Andrioid Studio：VCS——>Enable Version Control Integration，选择Subversion版本控制工具
  ![][5]

## 四 关联本地项目

* copy服务器端要上传的项目地址
  ![][6]

* 点击Android Studio下部的SVN Repositories，从copy服务器的项目地址关联
  ![][7]
  
* 在关联的地址上，右键checkout到本地项目
  ![][8]
  
* 从打开的文件夹中，选择项目
  ![][9]

* 选择commit文件
	![][10]

* 查看SVN服务端的最新代码文件
  ![][11]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/svn-command-line-install.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/svn-android-studio-absolute-path.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/svn-service-project-view.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/svn-local-folder-create.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/svn-vcs-subversion-choice.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/svn-service-project-copy.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/svn-android-studio-location-repository-relate.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/svn-android-studio-checkout.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/svn-checkout-destination.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/svn-commit-choice.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/svn-finish.png

[21]:https://developer.android.google.cn/studio
[22]:https://tortoisesvn.net/