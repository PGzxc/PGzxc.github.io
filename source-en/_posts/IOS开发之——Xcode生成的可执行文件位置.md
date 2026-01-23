---
title: IOS开发之——Xcode生成的可执行文件位置
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 2014f043
date: 2020-06-04 23:30:12
---
## 一 概述

Xcode编译成功后生成了可执行文件，但是可执行文件并没有在当前项目目录下，那么默认生成的文件路径在哪里，是否可以修改？   

<!--more-->

## 二 查看默认可执行文件路径

* 依次点击：Xcode——>Preference——>Locations，打开Location对话框

  ![][1]
  
* 点击Derived Data下面的“右箭头”，打开编译后的文件存放目录

  ![][2]

* 依次点击：项目——>Build——>Products——>Debug-iphonesimulator，可以看到编译后的app文件

  ![][3]

## 三 指定生成文件目录

* 在Location对话框中，点击Advanced，Build Location选择“Custom"，点击Done确认

  ![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-locations-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-locations-folder-deriveddata.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-build-product-app.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-build-custom.png
