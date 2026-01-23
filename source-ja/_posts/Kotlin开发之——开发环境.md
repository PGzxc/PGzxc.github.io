---
title: Kotlin开发之——开发环境
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 开发环境
abbrlink: 766ce094
date: 2017-12-18 08:08:32
---
# 前言
工欲善其事必先利其器，好的集成开发环境更有助于Kotlin的开发进度，本文主要介绍官网介绍的四个集成开发环境。

- Intellij IDEA
- Eclipse
- Compiler
- Android Studio
<!--more-->

# 集成环境开发Kotlin

## IDEA开发Kotlin
使用IDEA开发Kotlin不需要安装任何插件

- 下载并安装Intellij IDEA    
[去下载][1]，IDEA的安装破解比较简单，请自行百度
- 新建Kotlin-java 项目

	![][2]
- 设置Kotlin项目选项

	![][3]

注：    
Project SDK:设置生成的Kotllin目录位置，如没有，点击Finish时会自动生成    
Module name：module名称，会在Project名称后自动添加，如Content root所示
- 查看生成的Kotlin目录

![][4]
- 新建Kotlin文件  
![][5]
- 编译运行文件  
![][6]
- 查看运行结果  
![][7]

## Eclipse开发Kotlin
使用Eclipse开发Kotlin需要安装Kotlin插件

- 下载并安装Eclipse   
[去下载][8]，本文所用Eclipse为Oxygen 4.7.0，请以下载版本为准 
![eclipse][9]   
- 安装Kotlin插件
依次打开：Help->Eclipse Marketplace，在find输入框中输入kotlin并回车，找到kotlin插件并安装，安装后需重启生效
![][10]  
- 创建Kotlin项目
![][11]   
- 添加Kotlin源文件
![][12]  
- 编译并运行
![][13]  
## REPL交互式shell开发Kotlin
使用REPL交互式shell开发kotlin分为三种情况：   

- 命令行中使用REPL交互式shell
![][14]  
- IDEA中使用REPL交互式shell
选择：Tools->Kotlin->Kotlin REPL，打开REPL交互式shell
![][15]  
idea中REPL交互
![][16]  
- 在线REPL交互式shell
在kotlin官网点击try online或者打开[https://try.kotlinlang.org/][18]
![][17]    
输入要运行代码后，点击运行查看结果
![][19]  
## Android Studio开发Kotlin
本文所用AS3.0，默认已集成Kotlin插件，AS3.0以下，请自行搜索并安装kotlin插件

- 新建Kotlin项目     
新建项目时，请勾选"include kotlin support"
![][20]  
- AS3.0 Kotlin项目配置
项目build.gradle配置
kotlin当前版本
![][21]   
module下build.gradle配置
其中：    
"kotlin-android"为Android添加kotlin支持   
"kotlin-android-extensions"为Android简易开发扩展

	![][22]  
- 编辑项目，并运行  
	![][23]  



[1]: https://www.jetbrains.com/idea/
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-idea-new.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-idea-setting.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-idea-sample-content.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-idea-file.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-idea-run.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-idea-run-result.png
[8]: https://www.eclipse.org/downloads/
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/eclipse-download.png 
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/eclipse-kotlin-plug.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/eclipse-kotlin-new.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/eclipse-kotlin-source.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/eclipse-kotlin-run.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmd-kotlin-shell.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/idea-kotlin-shell.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/idea-kotlin-shell-run.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/try-kotlin-online.png
[18]: https://try.kotlinlang.org/
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-online-run.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/as3.0-kotlin-support.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/as3.0-kotlin-project-config.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/as3.0-kotlin-module-config.png
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/as3.0-kotlin-run.png