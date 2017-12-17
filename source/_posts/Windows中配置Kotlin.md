---
title: Windows中配置Kotlin
date: 2017-12-17 20:40:31
categories: [Kotlin]
tags: [Kotlin配置]
---

# 前言
本文主要介绍Windows环境下Kotlin的配置，使用到的软件   

- Java
- Kotlin Compiler
<!--more-->
# 配置

## 安装并配置Java
- 下载安装JDK   
[JDK官网][1]，下载和安装比较简单，省略
- 检查JDK
打开CMD，输入“java -version”，查看当前版本
![java-version][2]
## 安装并配置kotlin
- [下载Kotlin Compiler][3]
![][4]
- 解压并配置环境变量
添加Kotlin_home指向compiler解压目录，并添加到path中
![][5]
![][6]
- 检查kotlin是否生效
![kotlin-version][7]



[1]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[2]: http://p13wlhfa8.bkt.clouddn.com/jdk-version.png
[3]: https://kotlinlang.org/
[4]: http://p13wlhfa8.bkt.clouddn.com/kotlin-compiler.png
[5]: http://p13wlhfa8.bkt.clouddn.com/kotlin-home.png
[6]: http://p13wlhfa8.bkt.clouddn.com/kotlin-home-bin.png
[7]: http://p13wlhfa8.bkt.clouddn.com/kotliln-version.png