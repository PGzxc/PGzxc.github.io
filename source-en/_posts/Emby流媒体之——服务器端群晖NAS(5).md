---
title: Emby流媒体之——服务器端群晖NAS(5)
categories:
  - 开发
  - J-NAS
  - Emby
tags:
  - Emby
abbrlink: d0e9545c
date: 2024-08-29 08:47:31
---
## 一 概述

* 设备软硬件介绍
* Docker安装Emby
* 配置Emby

<!--more-->

## 二 设备软硬件介绍

1-软硬件环境介绍

* 硬件：Synology1821+
* DSM版本：DSM 7.2.1-69057 update5
* Docker： Container Manager 20.10.23-1437

2-图示

![][1]

## 三 Docker安装Emby

### 3.1 注册表设置

1-打开`Container Manager`，切换到`注册表`，查看右侧类库能否加载显示

![][2]

2-若不能正确显示，点击设置，对`注册表设置`进行选择和设置(选择->编辑)

注册表镜像

```
https://docker.m.daocloud.io
https://ghcr.io
https://dockerhub.timeweb.cloud
https://docker.agsv.top
https://docker.agsvpt.work
```

图示

![][3]

### 3.2 Docker下载emby

1-在注册表页面输入框中输入`embyserver`

![][4]

2-选择类库后弹出选择标签进行安装

![][5]

3-下载完成后，`映像`显示已下载的`映像`文件

![][6]

### 3.3 Docker安装emby

1-切换到容器标签，点击`新增`

![][7]

2-新增对话框中进行常规配置

![][8]

3-高级设置

端口设置(8096端口设置)

![][9]

存储空间设置

![][10]

环境设置(UID/GID由2改为0)

![][11]

## 四 配置Emby

1-打开浏览器，输入以下内容，打开引导页面

```
http://192.168.1.3:8096/
```

图示

![][12]

2-配置完成后，图示

![][13]

## 五 参考


* [Emby官网—docker下载](https://emby.media/download.html)
* [Emby开心版-zishuo/embyserver](https://hub.docker.com/r/zishuo/embyserver#installation)
* [Emby开心版—lovechen/embyserver](https://hub.docker.com/r/lovechen/embyserver)
* [知乎—群晖nas如何安装emby](https://zhuanlan.zhihu.com/p/622800596)


[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-register-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-register-setting-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-emby-search-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-emby-install-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-image-list-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-add-new-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-select-one-8.png
[9]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-grade-port-9.png
[10]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-grade-space-10.png
[11]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-grade-path-11.png
[12]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-webui-welcom-12.png
[13]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-5-container-webui-home-13.png

[00]:https://emby.media/download.html
[01]:https://hub.docker.com/r/zishuo/embyserver#installation
[02]:https://hub.docker.com/r/lovechen/embyserver