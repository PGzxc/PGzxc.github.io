---
title: Android开发之——反编译工具apktool
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 反编译
  - 安全
  - 工具
abbrlink: ad15ee8b
date: 2017-11-16 18:39:56
---
## 一 前言 
我们开发时，为防止自己的APP被破解使用了一系列措施，比如ProGuard，又比如第三方加密，如：爱加密，360加固等；同时，又有需求破解别人的APP，工欲善其事必先利其器，这个神器就是apktool，这篇简单介绍下如何使用apktool对apk文件进行反编译，拿到我们需要的信息；  
下面将介绍这款工具的下载及使用  
<!--more-->

## 二 下载及安装

### 2.1 查找官网 

[apktool官网][1]
![apktool官网][2]  

### 2.2 下载适合自己平台的工具  
这里以windows为例讲解  

![tools][3]  

### 2.3  安装 
- 点击windows下的第一个wrapper script链接，并将全部内容复制，保存到新建的apktool.bat文件内  
![apktool.bat][4]   
- 点击find newest here，下载最新的apktool.jar文件，如图，下载apktool_2.3.0.jar  
![][5]  
- 将下载的apktool_2.3.0.jar重新命名为apktool.jar  
- 将重命名后的apktool.jar和apktoo.bat文件一起放到电脑目录中，到此apktool配置到此完成
![][6]   

## 三 使用 

此处以反编译QQ为例讲解  

- 打开CMD窗口    
![][7]  
- 进入apktool工具存放目录  
![][8]  
- 执行apktool d xxx.apk指令，对apk进行反编译
![反编译][9]  
- 查看反编译后结果  
![][10]  
![][11]  
![][12]



[1]: https://ibotpeaches.github.io/Apktool/install/
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/apktool-web.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/apktool-tools.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/apktool-bat.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/apktool-download.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/apktool-colection.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmd-wind.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmd-into.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/apktool-use.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/apktool-res1.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/apktool-res2.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/apktool-res3.png