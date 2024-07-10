---
title: Mac系统开发之——Android studio
categories:
  - 系统
  - Mac
tags:
  - Android studio
abbrlink: e02b7f97
date: 2020-02-09 11:45:01
---
## 一 概述

本文介绍在Mac系统下安装Android studio，并进行相关配置(请事先已安装并配置好Java)    
<!--more-->

## 二 软件下载

* 打开android官网，进行下载[android studio下载地址][1]
![][2]

## 三 软件安装

* 到下载中找到已下载的Android studio，双击运行
![][3]
* 进入安装向导
![][4]
* 选择ui主题
![][5]
* 选择安装模式(标准模式和自定义模式)，本文选择自定义模式，并选择安装位置(稍后配置用)
![][6]
* 确定后，进行安装
![][7]

## 四 软件配置

* 进入当前用户目录

  `cd ~/`

* 创建.bash_profile文件(如果没有.bash_profile)

  `touch .bash_profile`

* 之前以上两步后的结果文件(使用command+shift+. 显示隐藏文件)
  ![][8]

* 打开.bash_profile文件对android进行配置
  ```
  # android
   export ANDROID_HOME=/Users/zxc/Library/Android/sdk 
   export PATH=$ANDROID_HOME:$PATH
   export PATH=$ANDROID_HOME/tools:$PATH
   export PATH=$ANDROID_HOME/platform-tools:$PATH
  ```

* 打开终端，输入`adb version`查看是否生效
![][9]


[1]: https://developer.android.google.cn/studio
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-studio-download.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-studio-install-open.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-studio-install-wards-next.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-studio-ui-theme.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-studio-sdk-location.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-studio-install-progress.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-config-bash-profile.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-install-adb-version.png



