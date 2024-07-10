---
title: Android开发之——卸载系统应用
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 系统应用
abbrlink: 58fbebe
date: 2019-08-21 22:30:27
---

## 一 前言

我们都知道一般预置的 APP 是不能卸载的，需要有 root 权限，今天分享一个命令，帮你卸载那些你想卸载又不能卸载的系统预置的 APP  

	adb shell pm uninstall [-k] [--user USER_ID] 包名  

<!--more-->

## 二 adb 卸载参数说明

* -k    卸载应用且保留数据与缓存，如果不加 -k 则全部删除。
* -user 指定用户 id，Android 系统支持多个用户，默认用户只有一个，id=0。

可以用这个命令，user 和 debug 版本都可以用，所有应用都能卸载掉

## 三 实例说明

### 3.1 打开要卸载的应用，使用指令查看当前程序的包名

	adb shell dumpsys window | grep mCurrentFocus

![][1]

查看Google地图的包名是：`com.google.android.apps.maps`

### 3.2 卸载系统应用  

	adb shell pm uninstall -k --user 0 [要卸载程序的包名]   

![][2]    

程序返回success后，说明程序已经卸载  


参考：[Android 黑科技之卸载系统应用][3]

[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/adb-shell-dumpsys-current.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/adb-shell-uninstall-system-app.png
[3]:https://dwz.cn/Ryd8n3kT


