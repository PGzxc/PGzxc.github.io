---
title: Android开发之——混淆中遇到的问题及解决办法
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 混淆
abbrlink: 5577dd10
date: 2019-08-21 22:35:05
---
## 一 前言
项目开发完成后，一般要通过混淆优化之后，才能正式上线的，一是减少app的大小；二是防止app被反编译。

<!--more-->
开启混淆后，由于依赖、环境等因素的影响，可能会遇到各种各样的问题。本文主要记录了在混淆中遇到的错误及解决办法。   



## 二 异常信息及解决办法

### 2.1 Warning: there were 97 unresolved references to classes or interfaces.
     
#### 2.1.1 现象  

		Warning: there were 97 unresolved references to classes or interfaces.
         You may need to add missing library jars or update their versions.
         If your code works fine without the missing classes, you can suppress
         the warnings with '-dontwarn' options.

![][1]

#### 2.1.2 解决办法

* 通过指令将异常保存   

		gradlew build --stacktrace > logs.txt 2>logErrors.txt

	![][2]
* 根据logErrors.txt中的警告信息，添加keep 和download文件  
	![][3]


### 2.2 混淆后，raw中部分文件大小变为0

#### 2.2.1 现象
![][4]
#### 2.2.2 解决办法

* res/raw下面配置keep.xml文件，指定要keep的文件  

		<?xml version="1.0" encoding="utf-8"?>
		<resources xmlns:tools="http://schemas.android.com/tools"
    		tools:keep="@raw/sw*" />
其中 sw为文件的头文件前面几个字母，保证res/raw中的文件不被混淆时忽略
  


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-proguard-warning-unresolved.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-proguard-warning-detail.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-proguard-warning-resolve.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-proguard-dummy-size-0.png

