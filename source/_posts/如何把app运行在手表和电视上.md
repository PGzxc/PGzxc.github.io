---
title: 如何把app运行在手表和电视上
date: 2018-01-02 15:41:40
categories: [Android]
tags: [Watch]
---
# 前言
我们开发的App一般是运行在手机上的，你可能见过手表或电视上的Android应用程序，我们如果把一个Android应用程序运行到它们上面呢，这里我们对手表和电视软件安装进行一点的介绍！  
<!--more-->
  
# 配置  
如果把app安装到手表或者电视上需要进行额外的权限配置，uses-feature。    
app安装到手表或电视里，这里我们用自带的系统创建一个手表和电视进行模拟：  

## 手表权限配置
### 创建手表模拟器 
- 选择要创建的类型(这里我们选择Wear) 
![][1]
- 下载SDK   
![][2]
- 启动Wear  
![][3]
### 配置权限

		<uses-feature
        	android:name="android.hardware.type.watch"
        	android:required="true"/>  

![][4]
### 启动应用  
![][5]
## 电视权限配置  
### 创建TV模拟器
- 选择要创建的类型(这里选择TV)   
![][6]
- 下载SDK   
![][7]   
- 启动TV   
![][8]   
### 配置权限  

		<uses-feature
        	android:name="android.hardware.type.watch"
        	android:required="false"/>
![][9]
### 运行 
![][10]






[1]: http://p1x4ctsv8.bkt.clouddn.com/hardware-chose.png
[2]: http://p1x4ctsv8.bkt.clouddn.com/wear-download.png
[3]: http://p1x4ctsv8.bkt.clouddn.com/wear-start.png
[4]: http://p1x4ctsv8.bkt.clouddn.com/wear-config.png
[5]: http://p1x4ctsv8.bkt.clouddn.com/wear-git.gif
[6]: http://p1x4ctsv8.bkt.clouddn.com/TV-chose.png
[7]: http://p1x4ctsv8.bkt.clouddn.com/tv-download.png
[8]: http://p1x4ctsv8.bkt.clouddn.com/tv-start.png
[9]: http://p1x4ctsv8.bkt.clouddn.com/tv-config.png
[10]: http://p1x4ctsv8.bkt.clouddn.com/tv-gif.gif
