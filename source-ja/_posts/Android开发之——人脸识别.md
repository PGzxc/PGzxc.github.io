---
title: Android开发之——人脸识别
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 人脸识别
abbrlink: 4c0809c0
date: 2018-01-09 10:48:10
---
# 前言 
人工智能时代快速来临，其中人脸识别是当前比较热门的技术，在国内也越来越多的运用，例如刷脸打卡、刷脸App，身份识别，人脸门禁等等。当前的人脸识别技术分为WEBAPI和SDK调用两种法方式，WEBAPI需要实时联网，SDK调用可以离线使用。  

Android作为一个比较广泛的平台，如何实现人脸识别功能呢？  

<!--more-->
# Android人脸识别 
Android实现人脸识别可以通过google原生自带或第三方提供，googel自带的只能识别静态图片，第三方提供的功能比较强大。  

## google官方自带 
google通过FaceDetector类实现人脸识别功能，查看[官方说明][1]：Identifies the faces of people in a Bitmap graphic object.  
![][2]
### 识别结果 
![][3]
## 第三方SDK提供 
### Opencv
opencv官方网站[https://opencv.org/][4]，Github地址是[https://github.com/opencv/opencv][5]，作为开发人员第一步是有一个可以运行的项目，里面有sample例子，依次打开opencv->sample->android，选择项目导入运行。 

### 虹软免费SDK  
官方地址[http://www.arcsoft.com.cn/index.html][6],跟一般SDK类似，需要注册才能使用，网上有很多教程，接入简单。  
参考：[Android人脸识别开发入门--基于虹软免费SDK实现][7]  
### Face++ 
官方地址：[https://www.faceplusplus.com.cn/][8]，好像是要收费的。接入请参考：[ANDROID使用FACE++架构包实现人脸识别][9]
### 科大讯飞人脸识别
官方地址：[http://www.xfyun.cn/services/face?type=face][10],科大讯飞的语音云技术一直是遥遥领先，人脸识别官方并没有提供具体的参考示例，可能还没开放。 






[1]: https://developer.android.google.cn/reference/android/media/FaceDetector.html 
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-facedetector.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-face-detector-result.png
[4]: https://opencv.org/
[5]: https://github.com/opencv/opencv
[6]: http://www.arcsoft.com.cn/index.html
[7]: https://www.jianshu.com/p/75733cff88a3
[8]: https://www.faceplusplus.com.cn/
[9]: http://www.bubblyyi.com/2016/09/13/android%E4%BD%BF%E7%94%A8face%E6%9E%B6%E6%9E%84%E5%8C%85%E5%AE%9E%E7%8E%B0%E4%BA%BA%E8%84%B8%E8%AF%86%E5%88%AB/
[10]: http://www.xfyun.cn/services/face?type=face
