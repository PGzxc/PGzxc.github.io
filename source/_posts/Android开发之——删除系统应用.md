---
title: Android开发之——删除系统应用
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 3ab473fa
date: 2020-12-18 14:51:32
---
## 一 概述

默认情况下(无Root)，系统的内置应用，是无法删除的(如下图)，那么此种情况下，如何删除系统应用呢？
<!--more-->
![][1]

## 二 卸载系统应用

### 2.1 查询要卸载的系统应用包名

* 查看系统应用下要卸载的应用(华为视频)如`com.huawei.himovie`

### 2.2 通过指令删除应用

```
cmd命令下执行
adb shell
pm uninstall -k --user 0 com.huawei.himovie
```
![][2]
### 2.3 通过软件(ES文件管理器)删除应用
![][3]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-system-app-delete-no.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-system-app-adb-delete.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-es-com.huawei.himovie.png

