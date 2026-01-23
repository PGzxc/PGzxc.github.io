---
title: CPP学习之——Windows下Clion安装与配置
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - Clion
abbrlink: 3ae4f0a5
date: 2019-10-17 23:34:51
---
## 一 原料
* Windows
* Clion
* MinGW

<!--more-->
## 二 MinGW 安装及配置
* 参考Codeblocks中MinGW的配置

## 三 Clion下载，安装及设置(社区版)
* 进入Clion下载界面，点击Download进行下载
![][2]
* 选择软件的安装位置，点击进入下一步
![][3]
* 安装完成后，引导程序配置MinGW
![][4]
* setting 中配置文件的格式(UTF8)
![][5]
* 在Setting->Build,Execution->Toolschains中修改MinGW的配置
![][6]

## 四 新建项目及编译运行

* File->New Project->C++ Projcet(C++项目为例)
![][7]
* 创建完成后，项目结构图
![][8]
* 点击右上角运行项目
![][9]




[1]:http://www.jetbrains.com/clion/download/#section=windows
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-clion-download.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-clion-install-position.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-clion-mingw-config.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-clion-encodings-utf8.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-clion-toolschanins-change.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-clion-create-project.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-clion-project-preview.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-clion-build-run.png