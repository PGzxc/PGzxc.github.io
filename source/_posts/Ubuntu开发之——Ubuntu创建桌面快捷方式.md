---
title: Ubuntu开发之——Ubuntu创建桌面快捷方式
categories:
  - 系统
  - Ubuntu
tags:
  - Ubuntu
abbrlink: 59fd7563
date: 2021-01-14 13:14:47
---
## 一 概述

Linux系统中，软件安装完成后，默认是没有桌面快捷方式的，本文以Android Studio为例介绍

* 如何创建软件对应的启动快捷方式
* 把软件的快捷方式添加到收藏夹
* 把软件的快捷方式添加到桌面

<!--more-->

## 二 如何创建软件对应的启动快捷方式

### 2.1 软件的安装路径

```
/home/pgzxc/software/android-studio
```

### 2.2 创建软件快捷方式

ubuntu 的快捷方式都在/usr/share/applications/路径下创建Android studio 的快捷方式
命令如下(没有则创建，已有则打开)

```
sudo gedit /usr/share/applications/Studio.desktop
```

添加如下命令到Studio.desktop文本中

```
[Desktop Entry]
Name=Studio
Exec=/home/pgzxc/software/android-studio/bin/studio.sh
Icon=/home/pgzxc/software/android-studio/bin/studio.png
Terminal=false
X-MultipleArgs=false
Type=Application
Encoding=UTF-8
Categories=Application;
StartupNotify=false
```

![][1]
注意：

* Exec:后面的换成自己的软件启动路径
* Icon：后面的换成自己的软件图标路径
* 各行结束之后不要有空格(不然格式有误)

### 2.3 查看快捷图标

上述步骤操作后，按图示查看快捷方式
![][2]

## 三 把软件的快捷方式添加到收藏夹

### 3.1 收藏夹说明

收藏夹位于Linux左侧状态栏，便于快速启动应用

### 3.2 将快捷应用添加到收藏栏
![][3]

## 四 把软件的快捷方式添加到桌面

依次点击：其他位置—>计算机—>usr—>share—>applications，找到Android Studio快捷方式存在的位置
![][4]

将应用的快捷方式拖放到桌面文件夹内
![][5]

修改桌面快捷方式的启动和属性
![][6]

  ```
  桌面图标：右键——>允许启动
  		属性
		   权限-->允许读写和作为执行文件
  		   打开方式——>运行软件
  ```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/linux-desktop-studio-desktop-edit.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/linux-desktop-android-desktop-view.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/linux-desktop-android-add-collect.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/linux-desktop-as-position.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/linux-desktop-as-to-desktop.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/linux-desktop-as-shorcut.gif