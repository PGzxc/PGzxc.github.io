---
title: Flutter开发之——Windows搭建Flutter环境配置(1)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - 环境配置
abbrlink: f3b0a54d
date: 2018-05-29 18:16:47
---
## 一 概述
```
Flutter是Google的一款跨平台开发语言，你可能知道另外一种跨平台开发语言React Native，
作为两款跨平台开发语言，他们有什么区别，哪个更好一些呢，这里暂时不做评价 ,
Flutter 作为Google极力推荐的跨平台开发工具，天生具备MD(材料设计)特性，
目前尚未成熟，但前景是远大的。
```

<!--more-->

## 二 环境配置

### 2.1 下载并配置Git
1、下载Git：打开[Git官网][3]，下载对应的软件

![][4] 
2、安装并配置：运行软件，下一步，并按下图所示添加到path中  

![][5]  
3、验证配置：打开CMD，输入git --version

![][6]  

### 2.2 下载并配置Flutter
1、下载Flutter

```
途径1：官网下载SDK
```

![][7] 

```
途径2：Github上搜索Flutter，在GitBash中执行git clone
```

![][8]    
![][9]  

2、配置环境变量
![][10] 

3、运行 flutter_console.bat，输入flutter doctor 命令 

```
说明：   

1. 其中带X的表示需要安装的东西
2. 其中带v的表示已经安装的东西 
```

![][11] 

## 三 开发工具配置

### 3.1 电脑中已安装了开发工具： 

```
1. android Studio
2. Vs Code
3. IntelliJ 
```

### 3.2 android licenses
再做工具配置之前，我们先解决第一个提示：    

	! Some Android licenses not accepted.  To resolve this, run: flutter doctor --android-licenses

输入“flutter doctor --android-licenses”并回车，如果需要确认，请输入“y”  
![][12]    
### 3.3 android studio 开发配置 
1、异常

```
解决完上面的licenses之后，重新输入flutter doctor检测，结果如下： 
```

![][13] 
2、解决

```
原因是android studio开发工具未安装flutter插件，
依次打开 File——>Setting——>Plguins——>安装flutter(默认安装Dart插件)，安装后重启生效
```

![][14]  
![][15]  
### 3.4 android studio开发flutter  
1、File——>New Flutter Project 
![][17] 
2、选择类型(本次选择Application)
![][18]  
3、设置应用信息
![][19] 
4、设置应用包名
![][20]  

### 3.5 VS 开发配置
1、异常
再次运行 flutter doctor 检测,  android studio开发工具的错误已经消失，VS Code的错误仍然存在
![][21]  
2、解决 

```
安装VS Code 插件 flutter和Dart  
```

![][22]  
3、使用VS 开发Flutter
3-1、新建 Flutter 项目
依次点击：查看——>命令面板——>输入Flutter——>选择Flutter:New Project

![][23]  
3-2、 输入应用名称
![][24] 
3-3、选择存放位置
![][25]  
3-4、项目初始化完毕 
![][26]  

3-5、 按F5项目调试
![][27] 
3-6、运行效果图
![][28]  



[1]: https://www.zhihu.com/question/50156415
[2]: https://www.git-scm.com/download/
[3]: https://www.git-scm.com/download/
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-git-download.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-git-config.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-git-version.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-sdk.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-github.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-git-clone.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-path.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-doctor.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-doctor-licence.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-docotr-as.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/as-flutter-plug.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/as-dart-plug.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/as-flutter-application.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/as-flutter.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/as-flutter-new.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/as-flutter-application.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/as-flutter-package.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/as-flutter-down.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/vs-flutter-plugin.png
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/vs-new-flutter.png
[24]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/vs-flutter-new.png
[25]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/vs-flutter-filder.png
[26]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/vs-flutter-done.png
[27]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/vs-flutter-f5.png
[28]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/vs-flutter-run.png