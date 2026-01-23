---
title: Android开发之——版本兼容性问题
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 版本兼容
  - 适配
abbrlink: 8f6c6f34
date: 2017-11-15 17:06:39
---

## 一 概述

Android系统中向下兼容性比较差，实际开发和测试中会遇到版本兼容性的问题，本题的成文参考了网上的部分教程和个人在开发中的实例，进行归纳和总结而成。

* 版本兼容问题
* 做兼容性处理先要明白几个概念 
* 针对API的变更引起的问题如何做兼容性处理呢？ 

<!--more-->

## 二 版本兼容问题

### 2.1 版本兼容性：  
Android系统中向下兼容性比较差，但是一个应用APP经过处理还是可以在各个版本间运行的。向下兼容性不好，不同版本的系统其API版本也不同，自然有些接口也不同，旧的平台也使用不了新的API，这就是Android的版本兼容性问题;

### 2.2 我们先看一个实例  

![兼容问题展示][1] 

说明：如图所示：当我们在build.gradle中设置minSdkVersion=8时，调用上述API时会出现如图提示，无法运行在低于API8的手机上，这就是Android版本兼容性问题的体现；

### 2.3 Android 平台版本支持的API级别

下表列出了各 Android 平台版本支持的API级别。 如需了解有关运行各版本的设备的相对数量的信息，请参阅[“平台版本”信息中心页面][3]。 

![api-version][4]

说明：Android版本更新，新的版本会引入一些新的特性和方法，新的方法带来很多便利，但是对系统版本有要求，无法再低版本手机上运行，如果未做兼容性处理，强行运行，会导致Crash。  

## 三 做兼容性处理先要明白几个概念 
### 3.1 build.gradle中的几个概念
Android build.gradle中compileSdkVersion，minSdkVersion，targetSdkVersion，maxSdkVersion信息你弄明白了么！
![默认配置][5] 

### 3.2 几个概念说明
新建一个项目工程时，系统都会默认为我们配置上面的参数，compileSdkVersion，minSdkVersion，targetSdkVersion，为什么设置这些参数，有什么作用，你都知道么！  

#### compileSdkVersion  
compileSdkVersion 26：指target=android-26，也就是{Sdk}\platforms\android-26\android.jar编译项目
![compilesdk][6]
在项目工程的External Libraries下可以看到引用了Android-26  
![target26][7] 
如果compileSdkVersion 修改为27，相应的也会做修改  
![target27][8]
一般情况下，设置compileSdkVersion为最新的API即可，这也是项目默认的行为
#### minSdkVersion  
minSdkVersion 15，指app最小支持版本为API15(Android 4.0)，低于Android 4.0的手机无法安装此类应用，当设置minSdkVersion 15时，已经完全覆盖100%的设备  
![][9] 
并且google官方给出了其他版本对应的比例 
![其他版本][10]
minSdkVersion不仅在安装时起作用，在项目构建时也会起作用。如图，在minSdkVersion 8 调用API 9中的方法时给出提示
![min-error][11]

### targetSdkVersion  
targetSdkVersion 26，指当前应用已在API26(Android 8.0)经过测试，无需系统开启兼容模式保证程序正常运行。这个值一般和最新的API值相同。  

![targetsdk][12]
当设置targetSdkVersion 26时会有如图提示，意思是没有设置为最新的API Level值，打开SDK manager看到最新的API Level为 27，将targetSdkVersion设置为27便兼容了最新的API   
![max-sdk][13] 

#### maxSdkVersion  
maxSdkVersion 26 标明App最高应用版本为API 26(Android 8.0)，高于Android 8.0的手机无法安装此类应用。如果系统升级后，高于maxSdkVersion ，应用将会被卸载。所以官方文档，不推荐使用这个属性。

## 四 针对API的变更引起的问题如何做兼容性处理呢？  
### 4.1 在程序运行时对应用所运行的平台进行判断，旧平台使用旧的API，新平台使用新的API  
使用高于minSdkVersion API Level的方法时，可以看到如下三条提示    
![提示解决][14]    

#### 使用TargetApi注解标注  
注：targetApi，只屏蔽某一新API才能使用的方法报的Android lint错误，如图path.getTotalSpace，如果你在此方法中引入了另一个高于minSdkVersion的api时，此方法仍会报错！  
![target-api][15]  
#### 使用SuppressLint注解标注  
注：屏蔽一切新API才能使用新方法才报的Android lint错误  
![][16]  
#### 使用build.Version.SDK_INT运行时判断，分别处理    
![sdk-int][17]  
总结：1和2虽然未提示错误，但问题依然存在，我们一般结合1,3使用

### 4.2 用反射的方式调用高版本中的新功能接口进行调用  
如果是基于低版本SDK开发，那么新版本中的新接口肯定编译不通过，这时候可以考虑反射的方式先去查找这个方法是否存在，如果有就代表用户的手机支持该调用方法，如果没有则采用低版本的处理方式(借用网上的一段话)	  
![反射][18]
### 4.3 分离代码
别在不同的SDK上编译运行，最后classLoader加载高版本中的相关类接口。此方法如同二，可以将高版本中的API接口封装后再高版本中的SDK编译成jar包，供低版本中动态加载(借用网上的一段话)
### 4.4 使用官方提供的support类库，如support-v4,support-v7,support-v13等  
![supports][19]









[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-version-problem-show.png
[2]: https://developer.android.google.cn/guide/topics/manifest/uses-sdk-element.html#provisional
[3]: https://developer.android.google.cn/about/dashboards/index.html
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-api-version.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/version-default.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-compilesdk.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-target-26.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-target-27.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-api-15.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-other-version.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-min-error.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-targetsdk.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-max-sdk.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-resolve-promte.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-target-api.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-suppresslint.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-build-sdk-int.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-flect.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-supprots.png







