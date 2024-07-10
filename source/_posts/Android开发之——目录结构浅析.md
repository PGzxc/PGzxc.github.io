---
title: Android开发之——目录结构浅析
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 目录结构
abbrlink: ac8bb24
date: 2017-11-17 15:32:57
---

## 一 概述

对于从Eclipe转向As的开发者和Android新手来说，明白Eclipse和As的区别，熟悉AS的目录结构，十分必要！  
下面将Eclipse和AS对对比区别
<!--more-->

## 二 AS与Eclipse的区别    

### 2.1 AS  

- 基于Gradle的构建支持
- 构建程序界面更方便
- 打印信息更详细
- 智能识别更强大
- 布局实时预览 

### 2.2  Eclipse 

- 基于ant的构建支持 
- 创建项目更简单
- 项目体积比较小
- 配置文件无需更新
- 多项目管理很方便 


## 三 Eclipse目录结构浅析  

![Eclipse目录][0]  

主要介绍在入门阶段需要知道的几个文件夹：

- src目录：存放项目的源代码。比如MainActivity.java或者是需要自己构建的各种java文件；  

- gen目录：自动生成的文件；其中R类存放资源文件的唯一ID，我们通过R.java可以很快的查找到需要的资源。编程过程中一般通过R.id.xx来访问资源；
- Android版本：该项目支持的jar包以及打包时需要的mate-info目录。开始阶段不用太关注；
- assets目录：提供res目录存放资源文件外，也可以存放其他一些不会再R.java中自动生成id的文件。可以通过AssetManager类来访问这些文件；
- bin目录：开发时不用关心此目录。bin目录是编译之后的字节码存放目录，包括将程序打包成的apk包(安装应用程序包);
- libs目录：文件的支持文件；
- res目录：res资源目录；向此目录添加资源时会被R.java自动记录；drawable存放应用程序需要的图片文件；其中在drawable添加后缀的文件夹，是不同质量的图片；  

		layout是屏幕的布局目录；可以存放不同的布局结构和控件；
		menu文件；菜单资源文件必须放在res/menu目录中。菜单资源文件必须使用<menu>标签作为根节点；  
		values参数值目录；可以在其中的strings.xml中存放各种文字，不同类型的数据，就是一些资源描述性文件；
- AndroidMainfest.xml文件是Android程序中必须的文件，是项目的总配置文件。记录应用中所使用的各种组件；列出了应用程序所提供的功能，可以指向应用程序中使用到的服务权限；
- 剩下的文件主要存放一些版本信息


## 四 As的目录结构   

![AS目录结构][1]  

- .gradle:Gradle编译系统，版本由wrapper指定
- .idea：Android Studio IDE所需要的文件
- build：代码编译后生成的文件存放的位置
- gradle：wapper的jar和配置文件所在的位置
- .gitignore：git使用的ignore文件
- build.gradle：gradle编译的相关配置文件(相当于Makefile)
- gradle.properties：gradle相关的全局属性设置
- gradlew：unix下的gradle wrapper可执行文件 
- gradlew.bat：windows下的gradle wrapper可执行文件
- loca.properties：本地属性设置(key设置，Android sdk位置等属性)，这个文件是
不推荐上传到VCS中去的
- settings.gradle：和设置相关的gradle脚本  
  这些事外部文件相关的一些文件的介绍；我们来看app模块里的文件  
  ![app模块][2]  
  这是app模块下的文件结构  
  
- build:编译后的文件存在的位置(包括最终生成的apk也在这里面)
- libs：依赖的库所在的位置(jar和arr)
- src：源代码所在的目录
- src/main:主要代码所在的位置(src/androidTest)就是测试代码所在的位置了
- src/main/assets:android中附带的一些文件
- src/main/java：最重要的，我们的java代码所在的位置 
- src/main/jniLibs：jni的一些动态库所在的默认位置(.so文件)
- src/main/res：android资源文件所在的位置
- src/main/AndroidMainfest.xml：AndroidMainfest项目配置文件 
- build.gradle：和这个项目有关的gradle配置，相当于这个项目的makefile，一些项目的依赖就在这里面；
- proguard.pro：代码混淆配置文件；



[0]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/struct-eclipse.png
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/struct-android.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-src.png
