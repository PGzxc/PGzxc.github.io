---
title: CPP学习之——Windows下Eclipse安装与配置
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - Eclipse
abbrlink: 9cbfc72a
date: 2019-10-17 23:33:30
---
## 一 原料
* Windows
* Eclipse(for C/C++)
* MinGW

<!--more-->

## 二 MinGW的安装与配置
* 参考前面Dev-cpp的配置


## 三 Eclipse(for C/C++)下载
* 进入[Eclipse下载官网][1]，点击Download Packages下载页面
![][2]
* 在下载列表页面中，选择用于开发C/C++的集成工具
![][3]
* 也可以使用普通的Eclipse集成开发工具，在Help->Eclipse Marketplace中搜索C++插件安装
![][4]
* Windows->Preference->C/C++->Core Build Toolschains配置
![][5]

## 四 创建项目，编译并运行
* 依次点击File->New->C/C++ Project打开项目模板选择框(本例选择第一个C Managed Build)  
![][6]
* 设置项目创建时的相关信息  
![][7]
* 项目创建完成后，结果如下图，点击左上角的锤子，编译项目(没有事先编译，无法点击run运行)  
![][8]
* 编译完成，没有错误，点击run运行
![][9]




[1]: https://www.eclipse.org/downloads/
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-download-packages.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-c-download-select.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-marketplace-c-install.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-cpp-build-tools-config.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-new-project.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-c-select.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-create-preview.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-c-run.png
