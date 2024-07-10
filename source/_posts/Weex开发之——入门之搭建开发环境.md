---
title: Weex开发之——入门之搭建开发环境
categories:
  - 开发
  - F-跨平台
  - Weex
tags:
  - 环境搭建
abbrlink: 8275d77a
date: 2018-02-10 09:02:38
---
# 前言
Weex 是一个使用 Web 开发体验来开发高性能原生应用的框架，并支持iOS、安卓、YunOS及Web等多端部署；Weex 已经于 2017-02-24 迁移至 Apache 基金会，项目地址：[https://github.com/alibaba/weex][1]  
<!--more-->
# 环境搭建
## 安装依赖
### 安装Node
本文所使用Node版本为8.9.4，软件地址：[https://nodejs.org/en/][2]，下载后直接运行安装，安装步骤较为简单，安装后，进入CMD，输入Node -v，查看当前Node版本。  
### 安装 weex-toolkit
直接安装可能会因为一系列因素导致安装失败，本次安装使用淘宝npm镜像。  

- 安装淘宝镜像

	![][3]
- 安装weex-toolkit
![][4]
- 查看当前Weex是否安装成功
![][5]
至此，环境部分已经部署完成。
# 创建项目
##  进入到要创建的目录，执行 weex create awesome-project命令
![][6]
## 查看当前可用指令
![][7]
## 执行npm start 查看Web显示效果
![][8]
## Web效果
![][9]
![][10]
## 在Android上显示
### 直接运行会出错
![][11]
### 安装Platform
![][12]
### 在Android的端显示
![][13] 
![][14]

参考：  
[搭建开发环境][15]

[1]: https://github.com/alibaba/weex
[2]: https://nodejs.org/en/
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-taobao.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-toolkit.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-usage.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-create-project.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-commands.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-npm-start.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-ready.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-runing.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-run-android-error.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-platform.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-run-android.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weex-success.png
[15]: http://weex.apache.org/cn/guide/set-up-env.html
