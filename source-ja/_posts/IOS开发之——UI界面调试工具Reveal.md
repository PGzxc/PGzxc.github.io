---
title: IOS开发之——UI界面调试工具Reveal
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 4256eff7
date: 2020-05-10 23:19:50
---
## 一 概述

本文介绍一款IOS动态调试UI程序界面的工具Reveal，可在Debug模式下，为开发者提供强大的运行时视图调试，目前官方版本是 reveal 24 ，本软件为收费软件，使用期限为14天  

Reveal官网：[https://revealapp.com][21]

<!--more-->

## 二 软件下载及安装

* Reveal官方下载地址：[https://revealapp.com/download/][22]
* 安装过程：双击运行，按照说明操作

## 三 环境配置

* 刚打开Reveal后，界面如图所示(无设备连接)

  ![][1]
  
* 依次打开工具栏上的：Help——>Show Reveal Library in Finder——>IOS Library

  ![][2]
  
* 将IOS Library下的RevealServer.framework copy到项目根目录下

  ![][3]

* 点击项目，找到Build Settings，搜索`Framework Search Paths`添加或确认`$(inherited) $(SRCROOT)`

  ![][4]
  
* 同理，在Build Settings下搜索`Other Linker Flags`依次添加`-ObjC` `-weak_framework`  `RevealServer`

  ![][5]
  
* 同理，在Build Settings下搜索`Runpath Search Paths`，添加或确认`$(inherited) @executable_path/Frameworks`

  ![][6]
  
* 点击：项目—>TARGETS—>Build Phases，点击`+`号，选择`New Run Script Phase`

  ![][7]
  
* 在刚才添加到Run Script中填入下面的shell脚本

  ```
  export REVEAL_SERVER_FILENAME="RevealServer.framework"
  
   # Update this path to point to the location of RevealServer.framework in your project.
   export REVEAL_SERVER_PATH="${SRCROOT}/${REVEAL_SERVER_FILENAME}"
  
   # If configuration is not Debug, skip this script.
   [ "${CONFIGURATION}" != "Debug" ] && exit 0
  
   # If RevealServer.framework exists at the specified path, run code signing script.
   if [ -d "${REVEAL_SERVER_PATH}" ]; then
     "${REVEAL_SERVER_PATH}/Scripts/copy_and_codesign_revealserver.sh"
   else
     echo "Cannot find RevealServer.framework, so Reveal Server will not be started for your app."
   fi
  ```

  ![][8]
  
* 运行项目到模拟器上，控制台输出

  ```
   INFO: Reveal Server started (Protocol Version 50).
  ```

* 打开Reveal，界面上显示链接到项目，进行检测

  ![][9]
  
* Reveal打开项目后到界面如下图

  ![][10]

## 四 使用技巧

* 在模拟器操作后，刷新界面

  ![][11]
  
* 放大与缩小视图

  ![][12]

* 重置视图

  ![][13]

## 五 参考

* [Reveal使用][23]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-open-first.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-help-show-folder.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-copy-to-project.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-framework-search-path-config.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-other-linker-flags-config.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-buildsetting-runpath-search-path.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-buildphases-new-run-script.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-run-script-add-shell.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-choice-an-app-inspect.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-open-choice-app.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-refresh-view.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-big-small-view.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-reveal-reset-view.png



[21]:https://revealapp.com/
[22]:https://revealapp.com/download/
[23]:https://www.jianshu.com/p/257bdaaef74c