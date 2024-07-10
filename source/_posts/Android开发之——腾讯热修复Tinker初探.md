---
title: Android开发之——腾讯热修复Tinker初探
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 热修复
abbrlink: 15e207bb
date: 2017-12-27 09:38:14
---
## 一 概述

热补丁修复框架，极大的方便了开发者热修复自己线上App的出现的bug和漏洞。之前已经尝试了阿里热修复SopHix和美团热修复Robust，现在尝试集成腾讯的热修复Tinker。
<!--more-->

## 二 下载Tinker

### 2.1 下载地址

Tinker官方地址： [https://github.com/Tencent/tinker][1]
### 2.2  解压到本地
![][2]
本次所使用的为tinker-sample-android
### 2.3 将tinker-sample-android导入androiid studio
![][3]   
导入后，build项目时会出现一系列问题，下文将讲述如何解决这些问题
## 三 Tinker集成时问题
Tinker导入项目后，不能直接运行，需要稍作修改，下面的本人集成过程中出现的问题，如果你遇到的问题与我不同，欢迎留言。
### 3.1 tinkerId is not set!!!
#### 问题
![][4]
#### 解决
在app的build.gradle中搜索tinkerId，并将tinkerId=getTinkerIdValue()修改为tinkerId="TinkerSample"(内容可以是其他)
![][5]
### 3.2 Tinker does not support instant run mode   
#### 问题  
![][6]
#### 解决
依次打开File->setting->Build,Execution,Deployment->Instant Run，将Enable前的复选框去掉，并同步一下
![][7]
## 四 集成步骤
### 4.1 生成一个未修改之前的apk文件
- 点击右侧的Gradle，在展开的Gradle projects中选择app，并依次展开Tasks->build->assembleDebug   
![][8]
- 在assembleDebug上右键运行    
![][9]
- 在app/build/barApk下可以看到生成的apk文件    
![][10]
- 将此apk运行到手机上   
![][11]

### 4.2 修改代码或布局  
#### 在主项目中新增一个按钮
![][12]
### 4.3  生成patch
#### 在app下的build.gradle中配置如下  
![][13]
#### gradle里面执行下tinkerpatchdebug
- 点击Gradle，依次展开tiner-sample-android->Task->tinker，选择tinkerPatchDebug    
![][14]
- 右键运行    
![][15]
- 在app/build/outputs/tinkerPatch下可以看到patch补丁    
![][16]
- 将patch补丁包放到手机根目录下   
![][17]

### 4.4  修复
#### 点击load patch
![][18]
#### 点击Kill self并重启
新下的按钮是新增的，修复已生效     
![][19]

## 五 参考：  
[tinker-sample-android][20]


[1]: https://github.com/Tencent/tinker
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/tinker-unzip.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/tinker-sample.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/tinker-not-set.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/tinker-id.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/tinker-instant.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/tinker-instant-enable.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gradle-assem-debug.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gradle-assem-debug-run.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/build-barapk-debug.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/tinker-sample-run.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/tinker-add-new.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/tinker-debug-config.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/tinker-tinker-patch.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/tinker-tinker-patch-run.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/patch-signed.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/patch-signed-7zip.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/patch-success.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/patch-new.png
[20]: https://github.com/PGzxc/tinker-sample-android