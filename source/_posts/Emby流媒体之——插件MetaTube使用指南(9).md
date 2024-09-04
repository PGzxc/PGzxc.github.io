---
title: Emby流媒体之——插件MetaTube使用指南(9)
categories:
  - 开发
  - J-NAS
  - Emby
tags:
  - Emby
abbrlink: 398e37fc
date: 2024-09-04 09:05:58
---
## 一 概述

* MetaTube插件介绍
* MetaTube服务器端搭建
* MetaTube for Emby插件安装
* MetaTube 使用指南

<!--more-->

## 二 MetaTube插件介绍

### 2.1 MetaTube介绍

* MetaTube用于识别影片演员的三方插件
* MetaTube支持常见的媒体库如：Jellyfin、Emby等

### 2.2 MetaTube部署必备

|      |       插件       |     服务端     |
| :--: | :--------------: | :------------: |
| 网址 |  [官网下载][00]  | [破解下载][01] |
| 说明 | 为媒体库提供插件 |  获取演员数据  |

## 三 MetaTube服务器端搭建

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

## 四 MetaTube for Emby插件安装

### 4.1 下载MetaTube插件

下载地址：https://github.com/metatube-community/jellyfin-plugin-metatube/releases

![][3]

2-解压文件得到MetaTube.dll

![][4]

### 4.2 安装MetaTube插件

```
embyserver-win-x64-4.8.8.0\programdata\plugins
D:\SoftWare\NAS\embyserver-win-x64-4.8.8.0\system\plugins
```

说明：将解压文件复制到上述plugins目录

### 4.3 检查MetaTube是否安装成功

重启Emby后，进入插件—>我的插件，查看MetaTube是否正确安装

![][5]

## 五 MetaTube 使用指南

### 5.1 MetaTube插件配置

![][6]

说明：

* 服务器输入4中启动后正确地址
* 其他配置按照需要勾选，确认后保存

### 5.2 媒体库设置(添加媒体文件时)

1-设置元数据下载器(选择MetaTube)

![][7]

2-设置电影图像获取器(确认后开始扫描)

![][8]



## 六 参考


* [MetaTube插件][00]
* [MetaTube服务器端][01]
* [MetaTube中文文档](https://metatube-community.github.io/README_ZH/)


[00]:https://github.com/metatube-community/jellyfin-plugin-metatube/releases
[01]:https://github.com/metatube-community/metatube-server-releases/releases

[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-9-metatube-nssm-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-9-metatube-start-success-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-9-metatube-download-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-9-metatube-unzip-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-9-metatube-plugin-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-9-metatube-service-setting-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-9-metatube-meta-choice-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-9-metatube-meta-image-8.png
