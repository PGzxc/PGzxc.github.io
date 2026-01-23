---
title: Android开发之——查看手机架构及APKPure安装应用
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 8dcc4284
date: 2025-08-06 09:55:18
---
## 一 概述

```
本文介绍以下内容：
 - 通过工具查看手机硬件和系统信息(影响安装兼容性)
 - 小米手机通过APKPure安装应用
```

<!--more-->

## 二 通过工具查看手机硬件和系统信息(影响安装兼容性)

### 2.1 推荐App

```
使用以下工具查看手机硬件和系统信息
1、Device Info HW: https://play.google.com/store/apps/details?id=ru.andr7e.deviceinfohw
2、Droid Hardware Info:https://play.google.com/store/apps/details?id=com.inkwired.droidinfo
```

### 2.2 可查看内容

```
-CPU 架构（armv7、arm64-v8a、x86 等）
-Android 系统版本（决定是否支持某些新特性）
-是否已开启“安装未知来源”权限
```

## 三 小米手机通过APKPure安装应用

### 3.1 小米手机通过APKPure安装应用时失败

```
您未关闭 MIUI 优化，可能会导致安装失败，建议您关闭 MIUI 优化
```

### 3.2 关闭MIUI优化

```
1、打开【设置】
2、搜索“开发者选项”或【我的设备】→【全部参数】→ 连续点击「MIUI版本」7次，进入开发者模式
3、返回设置主页，进入【其他设置】→【开发者选项】
4、找到【关闭MIUI优化】
```

### 3.3 操作演示

| 1-安装失败 | 2-关闭MIUI优化 | 3-重安装提示 | 4-更新安装完成 | 5-更新提示 |
| :--------: | :------------: | :----------: | :------------: | :--------: |
|   ![][1]   |     ![][2]     |    ![][3]    |     ![][4]     |   ![][5]   |



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-apkpure-install-error-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-apkpure-miui-close-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-apkpure-update-app-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-apkpure-install-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-apkpure-update-5.png