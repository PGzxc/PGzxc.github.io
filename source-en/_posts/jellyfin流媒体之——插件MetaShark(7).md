---
title: jellyfin流媒体之——插件MetaShark(7)
categories:
  - 开发
  - J-NAS
  - Jellyfin
tags:
  - Jellyfin
abbrlink: 66a268ea
date: 2024-09-21 08:51:03
---
## 一 概述

* MetaShark介绍
* MetaShark插件安装
* MetaShark使用指南

<!--more-->

## 二 MetaShark介绍

### 2.1 项目地址

Github地址

```
https://github.com/cxfksword/jellyfin-plugin-metashark
```

Gitee地址

```
https://gitee.com/cwhzy/jellyfin-plugin-metashark
```

### 2.2 项目介绍

* Jellyfin电影元数据插件
* 支持从豆瓣和TMDB获取元数据

## 三 MetaShark插件安装

### 3.1 插件存储库

```
国内加速：https://mirror.ghproxy.com/https://github.com/cxfksword/jellyfin-plugin-metashark/releases/download/manifest/manifest_cn.json

国外访问：https://github.com/cxfksword/jellyfin-plugin-metashark/releases/download/manifest/manifest.json
```

### 3.2 插件安装

1-进入Jellfyin控制台—>插件—>存储库，点击添加

![][1]

2-输入存储库名称和URL

![][2]

3-在插件目录下找到MetaShark，点击安装

![][3]

4-切换到`我的插件`，查看`MetaShark`状态

![][4]

## 四 MetaShark使用指南(媒体库，不需要配置插件)

### 4.1 媒体库削刮设置

1-设置元数据抓取器

![][5]

2-设置图片抓取器

![][6]

### 4.2 计划任务(设置程序启动或定时任务扫描媒体库)

![][7]

### 4.3 削刮结果(详情里点击标签可跳转豆瓣电影)

![][8]

## 五 参考

* [Github-jellyfin-plugin-metashark](https://github.com/cxfksword/jellyfin-plugin-metashark)
* [Gitee- jellyfin-plugin-metashark](https://gitee.com/cwhzy/jellyfin-plugin-metashark)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-7-shark-add-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-7-shark-set-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-7-shark-install-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-7-shark-active-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-7-shark-meta-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-7-shark-image-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-7-shark-schedu-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-jellyfin-7-shark-result-8.png