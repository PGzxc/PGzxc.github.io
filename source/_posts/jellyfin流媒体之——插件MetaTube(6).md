---
title: jellyfin流媒体之——插件MetaTube(6)
categories:
  - 开发
  - J-NAS
  - Jellyfin
tags:
  - Jellyfin
abbrlink: 72a5bcd
date: 2024-09-05 09:00:47
---
## 一 概述

* MetaTube服务器端搭建
* MetaTube for Jellyfin插件安装
* MetaTube 使用指南

<!--more-->

## 二 MetaTube服务器端搭建

MetaTube介绍了多种服务器部署方案，本文介绍Windows端(NSSM)

### 3.1 手动启动

终端执行如下指令(日志在终端中显示)

```
metatube-server-windows-amd64-v3.exe -dsn metatube.db
```

### 3.2 借助NSSM(不需要每次手动启动，日志放到log文件中)

![][1]

说明：具体设置见文章：NSSM服务器之——安装windows服务配置项

### 3.3 启动后输入如下查看是否启动成功

```
http://127.0.0.1:8080/
```

图示(显示信息为成功状态)

![][2]

## 三 MetaTube for Jellyfin插件安装

1-进入Jellfyin控制台—>插件—>存储库，点击添加

![][3]

2-输入存储库名称和URL

```
名称：MetaTube
URL：https://cdn.jsdelivr.net/gh/metatube-community/jellyfin-plugin-metatube@dist/manifest.json
```

3-在插件目录下找到MetaTube，点击安装

![][5]

4-切换到`我的插件`，查看`MetaTube`状态

![][6]

## 四 MetaTube 使用指南

### 4.1 MetaTube插件配置

1-填写服务器地址

```
http://127.0.0.1:8080/
```

图示

![][7]

2-设置模板信息

![][8]

### 4.2 媒体库设置

1-设置元数据抓取器

![][9]

2-设置图片抓取器

![][10]

### 4.3 计划任务(设置程序启动或定时任务扫描媒体库)

![][11]

## 五 参考

* [MetaTube-插件安装](https://metatube-community.github.io/wiki/plugin-installation/)
* [Jellyfin官网—Plugin](https://jellyfin.org/docs/general/server/plugins/index.html#repositories)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-6-metatube-nssm-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-6-metatube-start-success-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-6-metatube-lib-add-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-6-metatube-lib-set-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-6-metatube-install-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-6-metatube-mine-plugin-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-6-metatube-service-add-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-6-metatube-template-8.png
[9]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-6-metatube-meta-9.png
[10]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-6-metatube-image-10.png
[11]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-6-metatube-schedu-11.png