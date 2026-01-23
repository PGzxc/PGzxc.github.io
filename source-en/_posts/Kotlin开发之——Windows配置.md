---
title: Kotlin开发之——Windows配置
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 配置
abbrlink: 5824f311
date: 2017-12-17 20:40:31
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
# 运行kotlin
## 新建一个Kotlint文件
![][8]
## 进入文件目录生成jar文件

	kotlinc KotlinDemo.kt -include-runtime -d KotlinDemo.jar
注：指令解释

-  kotlinc： 编译指令，类似于java中的javac
- KotlinDemo.kt：当前要编译的kt文件
- -include-runtime： 引入kotlin libary，使的输出的jar文件是是自包含且可以运行的
- -d：输出目录，没指定为当前目录
- KotlinDemo.jar：生成jar文件

![jar][9]
## 查看输出结果
![][10]
## kotlin的build过程
![][11]


[1]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jdk-version.png
[3]: https://kotlinlang.org/
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-compiler.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-home.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-home-bin.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotliln-version.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-compiler-pro.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-compiler-jar.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-compiler-jar-run.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-build-process.png