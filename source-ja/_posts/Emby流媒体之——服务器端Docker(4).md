---
title: Emby流媒体之——服务器端Docker(4)
categories:
  - 开发
  - J-NAS
  - Emby
tags:
  - Emby
abbrlink: '7e804580'
date: 2024-08-28 08:24:34
---
## 一 概述

* Emby安装环境
* Docker服务器选择
* Docker安装Emby开心版

<!--more-->

## 二 Emby安装环境

* 系统：Windows11专业版 23H2
* Docker version： 27.0.3, build 7d4bcd8(docker -v)

## 三 Docker服务器选择

|      |        Emby官网        |       Emby开心版        |
| :--: | :--------------------: | :---------------------: |
| 特点 | 官方正版(没有高级功能) |         破解版          |
| 网址 |     [官网下载][00]     | [zishou/embyserver][01] |
| 图片 |         ![][1]         |         ![][2]          |

## 四 Docker安装Emby开心版

### 4.1 安装Docker版 Emby

1-打开Docker Desktop，搜索`lovechen/embyserver`

![][3]

2-找到`lovechen/embyserver`后，点击右侧的`Pull`拉取

![][4]

### 4.2 查看安装镜像

1-点击左侧的`Images`，查看下载镜像

![][5]

### 4.3 安装Emby

1-点击图示图标，打开运行设置

![][6]

2-打开设置对话框，设置容器(Volumes的`I\`为硬盘根路径，`I`为硬盘标签)

![][7]

3-切换到`Container`标签，查看emby容器(点击Port下的图示在网页中查看)

![][8]

4-打开后初始化设置，进入主页后

![][9]

## 五 参考


* [Emby官网—docker下载](https://emby.media/download.html)
* [Emby开心版-zishuo/embyserver](https://hub.docker.com/r/zishuo/embyserver#installation)
* [Emby开心版—lovechen/embyserver](https://hub.docker.com/r/lovechen/embyserver)
* [知乎—群晖nas如何安装emby](https://zhuanlan.zhihu.com/p/622800596)

[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-4-docker-site-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-4-docker-zishuo-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-4-docker-search-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-4-docker-emby-pull-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-4-docker-emby-images-list-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-4-docker-run-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-4-docker-container-setting-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-4-docker-container-run-8.png
[9]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-4-docker-webui-9.png


[00]:https://emby.media/download.html
[01]:https://hub.docker.com/r/zishuo/embyserver#installation
[02]:https://hub.docker.com/r/lovechen/embyserver