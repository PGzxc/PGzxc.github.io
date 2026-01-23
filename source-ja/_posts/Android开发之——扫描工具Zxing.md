---
title: Android开发之——扫描工具Zxing
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Zxing
abbrlink: 5fa29d1d
date: 2018-07-04 13:55:20
---
# 前言
二维码可以集成文本、网址、名片、文件、图片、音视频、微信、小程序等众多的功能，极大的方便了信息的传输与推广。在Android中使用Zxing二维码工具，zxing项目是谷歌推出的用来识别多种格式条形码的开源项目，本文将介绍Zxing项目、如何运行官方、自定义功能等。


<!--more-->

# Zxing介绍
## 官方下载地址
Github下载地址：[https://github.com/zxing/zxing][1]
## 项目介绍
### 目录结构
1. Android:可运行的Android客户端
2. core:核心图像解码库和测试代码
3. android-core:与android相关的代码及其他Android应用程序
4. javase：JavaSE的客户端代码   

![][2]

本文主要使用Android 客户端及依赖文件core和android-core

###  运行Zxing
#### 将项目下载到本地后，解压 
解压后，看到项目为Eclipse项目结构(目前大多数使用Android Studio开发)，本文以Intellij和Eclipse为例进行讲解
![][3]
#### 将项目导入到Intellij
##### File->New->Project from Existing Source
![][4] 
##### 定位到项目所在路径，并确定
![][5] 
##### 配置项目
添加一个Android项目，并保存 
![][6] 

##### 待项目引入环境配置后，运行
![][7]

#### 将项目导入到Eclipse
##### 将zxing中的Android导入到Eclipses中
![][8]  
##### 下载android-core和core jar包
如果不适用android-core libary和 core  library ，可以从maven官网下载jar包适用，本文采用这种方式    

![][9]
![][10]  
##### 项目路径下新建libs，并将上述jar包导入
![][11]  

##### 运行项目 
![][12]  

### 项目分析 
#### 核心代码分析
##### CaptureActivity
ZXing暴露的调用Activity。在handleDecode方法中对扫码成功后的动作作处理。  
##### ViewfinderView
ZXing扫码窗口的绘制，原始的ZXing使用这种方式去绘制，在上面提供的开源库中，作者将扫描框的绘制直接抽取到了XML文件中，这样修改起来更加方便了。
##### CameraConfigurationManager
修改横竖屏、处理变形效果的核心类。

在public void setDesiredCameraParameters(Camera camera, boolean safeMode)方法中（读取配置设置相机的对焦模式、闪光灯模式等等），可以将扫描改为竖屏
##### DecodeHandler
Xing解码的核心类
#### CaptureActivityHandler
当DecodeHandler.decode完成解码后，系统会向CaptureActivityHandler发消息。如果编码成功则调用CaptureActivity.handleDecode方法对扫描到的结果进行分类处理。

#### 代码改造 

Github上Zxing三方库比较多，如果有适合自己的项目可以不用改造，拿来用就是了，但是如果不适用，就要自己动手改造了， 当然Zxing官方也在一直升级，我们可以使用官方提供的实例改造，也可以在第三方库的基础上改造。

# 常用第三方库
## [android-zxingLibrary][13]  
几行代码快速集成二维码扫描功能，目前start比较高的，功能也比较完善   

1. 支持对图片Bitmap的扫描功能
2. 支持对UI的定制化操作
3. 支持对条形码的扫描功能
4. 支持生成二维码操作
5. 支持控制闪光灯开关

## [zxing-android-embedded][14]



[1]: https://github.com/zxing/zxing
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/zxing-struct.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/zxing-android-struct.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/zxing-intellij-new.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/zxing-intellij-pom.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/zxing-intellij-app.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/zxing-intellij-run.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/zxing-eclipse-import.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/zxing-eclipse-android-core.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/zxing-eclipse-core.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/zxing-eclipse-libs.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/zxing-run.png
[13]: https://github.com/yipianfengye/android-zxingLibrary
[14]: https://github.com/journeyapps/zxing-android-embedded