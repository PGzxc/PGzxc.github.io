---
title: Flutter开发之——环境配置
date: 2018-05-29 18:16:47
categories: [开发,移动开发,Flutter]
tags: [环境配置]
---
# 前言
Flutter是Google的一款跨平台开发语言，你可能知道另外一种跨平台开发语言React Native，作为两款跨平台开发语言，他们有什么区别，哪个更好一些呢，这里暂时不做评价，知乎上有人做了对比：[如何评价 Google 的 Fuchsia、Android、iOS 跨平台应用框架 Flutter？][1] ,Flutter 作为Google极力推荐的跨平台开发工具，天生具备MD(材料设计)特性，目前尚未成熟，但前景是远大的。值得我们学习。

<!--more-->

# 环境配置

## 下载并配置Git
### 下载Git
打开[Git官网][3]，下载对应的软件
![][4] 
### 安装并配置
运行软件，下一步，并按下图所示添加到path中   
![][5]  
### 验证配置
打开CMD，输入git --version  
![][6]  

## 下载并配置Flutter
### 下载Flutter
#### 官网下载SDK
![][7] 
#### Github上搜索Flutter，在GitBash中执行git clone
![][8]    
![][9]  
### 配置环境变量
![][10] 
### 运行 flutter_console.bat，输入flutter doctor 命令 
说明：   
 
1. 其中带X的表示需要安装的东西
2. 其中带v的表示已经安装的东西 

![][11] 

电脑中已安装了开发工具：  

1. android Studio
2. Vs Code
3. IntelliJ 

下面将分情况讲述 

# 开发工具配置
## android licenses
再做工具配置之前，我们先解决第一个提示：    

	! Some Android licenses not accepted.  To resolve this, run: flutter doctor --android-licenses

输入“flutter doctor --android-licenses”并回车，如果需要确认，请输入“y”  
![][12]    
## android studio 开发配置 
### 异常
解决完上面的licenses之后，重新输入flutter doctor检测，结果如下：  
![][13]  
### 解决
原因是android studio开发工具未安装flutter插件，依次打开 File——>Setting——>Plguins——>安装flutter(默认安装Dart插件)，安装后重启生效
![][14]  
![][15]  
### android studio开发flutter  
#### File——>New Flutter Project 
![][17] 
#### 选择类型(本次选择Application)
![][18]  
#### 设置应用信息
![][19] 
#### 设置应用包名
![][20]  
## VS 开发配置
### 异常
再次运行 flutter doctor 检测,  android studio开发工具的错误已经消失，VS Code的错误仍然存在
![][21]  
### 解决 
#### 安装VS Code 插件 flutter和Dart  
![][22]  
### 使用VS 开发Flutter
#### 新建 Flutter 项目
依次点击：查看——>命令面板——>输入Flutter——>选择Flutter:New Project

![][23]  
#### 输入应用名称
![][24] 
#### 选择存放位置
![][25]  
#### 项目初始化完毕 
![][26]  

#### 按F5项目调试
![][27] 
#### 运行效果图
![][28]  



[1]: https://www.zhihu.com/question/50156415
[2]: https://www.git-scm.com/download/
[3]: https://www.git-scm.com/download/
[4]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/flutter-git-download.png
[5]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/flutter-git-config.png
[6]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/flutter-git-version.png
[7]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/flutter-sdk.png
[8]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/flutter-github.png 
[9]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/flutter-git-clone.png
[10]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/flutter-path.png
[11]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/flutter-doctor.png
[12]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/flutter-doctor-licence.png
[13]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/flutter-docotr-as.png
[14]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/as-flutter-plug.png
[15]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/as-dart-plug.png
[16]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/as-flutter-application.png
[17]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/as-flutter.png
[18]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/as-flutter-new.png
[19]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/as-flutter-application.png
[20]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/as-flutter-package.png
[21]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/as-flutter-down.png
[22]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/vs-flutter-plugin.png
[23]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/vs-new-flutter.png
[24]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/vs-flutter-new.png
[25]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/vs-flutter-filder.png
[26]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/vs-flutter-done.png
[27]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/vs-flutter-f5.png
[28]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/vs-flutter-run.png