---
title: 群晖入门之——Docker加速(1)
categories:
  - 开发
  - J-NAS
  - 群晖
tags:
  - 群晖
abbrlink: d99ed699
date: 2024-12-25 09:34:09
---
## 一 概述

* Docker介绍
* Docker安装
* Docker加速原因
* Docker如何加速

<!--more-->

## 二 Docker介绍

* 群晖上的Docer技术叫做Container Manager
* Docker是一种轻量级虚拟化应用程序, 能运行数千种容器应用程序
* Docker Hub类似于应用市场，供用户下载所需应用程序

## 三 Docker安装

1-登录群晖后，点击套件中心

![][1]

2-依次点击: 所有套件—>开源—>Container Manager(未安装->安装套件)

![][2]

3-安装完成后，打开如下图

![][3]

## 四 Docker加速原因

### 4.1 现象(切换到注册表选项卡)

![][4]

### 4.2 原因

* 注册表用于列出应用市场所有可供下载的应用
* 默认情况下注册表被禁，无法正常访问
* 通过第三方加速镜像访问Docker Hub

## 五 Docker如何加速

### 5.1 加速镜像

```
https://hub.geekery.cn
https://docker.unsee.tech
```

### 5.2 如何使用

1-注册表选项卡，点击设置

![][5]

2-打开注册表设置窗口，选择新增

![][6]

3-添加加速镜像(填写注册表URL和名称)

![][7]

4-选中添加的注册表，并使用

![][8]

5-注册表显示应用列表

![][9]

## 六 参考

* [目前国内可用Docker镜像源汇总](https://www.coderjia.cn/archives/dba3f94c-a021-468a-8ac6-e840f85867ea)
* [Docker 镜像加速列表](https://www.cnblogs.com/alex-oos/p/18417200)
* [国内可用Docker镜像源加速器/DockerHub镜像汇总](https://www.wangdu.site/course/2109.html)
* [Github-DockerHub](https://github.com/dongyubin/DockerHub)
* [https://synocommunity.com/](https://synocommunity.com/)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-1-taojian-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-1-taojian-install-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-1-docker-open-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-1-docker-issue-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-1-docker-setting-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-1-docker-new-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-1-docker-info-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-1-docker-use-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-1-docker-list-9.png