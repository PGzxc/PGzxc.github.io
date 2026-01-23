---
title: IOS开发之——网页-开发中出现的错误(02)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网页
abbrlink: ee82c5f
date: 2022-03-23 20:51:00
---
## 一 现象

已经导入了`#import "WebKit/WebKit.h"`运行时出现了如下异常

```
Thread 1: "Could not instantiate class named WKWebView because no class named WKWebView was found; the class needs to be defined in source code or linked in from a library (ensure the class is part of the correct target)"
```

<!--more-->

## 二 原因

* 无法初始化WKWebView，因为找不到WKWebView这个类
* 要想WKWebView这个类完成初始化，需要添加一个链接库

## 三 添加链接库

依次点击：Target(项目)——>Build Phases——>Link Binary With Libraries

![][1]输入web view,添加Webview framework
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-webview-02-target-buildphases.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-webview-02-framework-add.png

