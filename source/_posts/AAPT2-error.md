---
title: AAPT2 error
date: 2017-12-14 03:28:44
categories: [Android]
tags: [Lambda]
---
# 问题
今天使用Android Studio 3.0.1 编译运行时项目报错了   
Error:Gradle: com.android.tools.aapt2.Aapt2Exception: AAPT2 error: check logs for details   
![AAPT2][1]
<!--more-->
# 解决
Google官方给出了解释
![][2]
在gradle3.0.1中AAPT2是默认打开的，在项目的gradle.properties中添加android.enableAapt2=false，sync后就编译通过了。   
# 结果
![result][3]




[1]: http://p0wl8650k.bkt.clouddn.com/AAPT2_error.png
[2]: http://p0wl8650k.bkt.clouddn.com/gradle_3_0.png
[3]: http://p0wl8650k.bkt.clouddn.com/aapt2_result.png