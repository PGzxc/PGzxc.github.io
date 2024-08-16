---
title: jellyfin流媒体之——服务器端Synology(3)
categories:
  - 开发
  - J-NAS
  - Jellyfin
tags:
  - Jellyfin
abbrlink: 41a8c0c
date: 2024-08-16 08:42:13
---
## 一 概述

* Container Manager安装及配置
* 下载jellyfin
* 创建jellyfin容器
* jellyfin教程

<!--more-->

## 二 Container Manager安装及配置

### 2.1 Container Manager安装

依次点击：套件中心—>所有套件—>开源—>Container Manager，进行安装

![][1]

### 2.2 Container Manager配置

1-打开Container Manager，点击左侧的`注册表`并点击设置

![][2]

2-弹出窗口选择`Docker Hub(V1)`，并点击`使用`

![][3]

3-切换源后会加载开源库，搜索`jellyfin`后进行下载
![][4]

## 三 创建jellyfin容器

1-点击左侧的`映像`，查看已下载映像(创建容器时会用到)

![][5]

2-切换到`容器`标签，在其页面点击`新增`

![][6]

3-打开的`常规设置`窗口，选择`映像`

![][7]

4-打开的`高级设置`窗口，设置`端口`、`存储空间`

![][8]

5-`摘要`窗口，确认无误后点击`完成`

![][9]

6-添加完成后，显示设置完成后的容器(点击可对其进行编辑，绿色表示容器已经启动可以访问)
![][10]

## 四 jellyfin教程

### 4.1 jellyfin设置向导

1-根据`Synlogy Assistant`检测ip地址，并在window端输入如下地址访问

```
http://192.168.1.9:8096 //输入后自动跳转到下面连接
http://192.168.1.9:8096/web/#/wizardstart.html
```

图示

![][11]

2-欢迎页面设置首选语言

![][12]

3-设置用户信息

![][13]

4-设置元数据语言

![][14]

### 4.2 jellyfin登录(设置完成后，跳转登录页面)

![][15]

### 4.3 设置显示语言

1-初次进入后，界面显示英文(点击右上角图标)

![][16]

2-跳转到设置页面，点击`Display`

![][17]

3-本地化页面，`Dislay Language`选择`汉语简体`
![][18]

4-设置保存后刷新，界面显示中文

![][19]

### 4.4 添加媒体库

1-主页面，点击`控制台`切换到服务器界面

![][20]

2-切换到`媒体库`，添加视频

![][21]

### 4.5 jellyfin效果图

![][22]

## 五 参考

* [Jellyfin官网—Synology](https://jellyfin.org/docs/general/installation/synology)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-container-install-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-register-setting-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-register-hub-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-register-download-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-ios-list-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-container-add-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-container-add-ios-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-container-add-up-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-container-add-finish-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-container-add-view-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-install-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-install-lan-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-install-userinfo-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-install-meta-14.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-install-login-15.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-en-show-16.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-setting-display-17.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-display-zh-18.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-display-zh-show-19.png
[20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-media-console-20.png
[21]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-media-add-21.png
[22]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-3-syn-web-media-effect-22.png