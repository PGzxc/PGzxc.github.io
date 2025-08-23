---
title: IPTV之——群晖提供IPTV服务(18)
categories:
  - 开发
  - J-NAS
  - 自建服务   
  - IPTV
tags:
  - IPTV
abbrlink: '19476174'
date: 2025-07-28 15:09:25
---
## 一 概述

```
群晖提供HTTP本地服务的是Web Station
- 将视频文件放到Web目录/web/Video目录下
- 根据/web/Video视频生成iptv文件
- 局域网访问iptv并播放
```

<!--more-->

## 二 Web Station安装

### 2.1 安装方式

```
1、官方套件：套件中心——>所有套件——>搜索Web Station并安装
2、手动安装
 - 下载中心：https://www.synology.cn/zh-cn/support/download/DS1821+?version=7.2#packages
 - DMS套件：下载Web Station
 - 套件中心：手动安装
```

### 2.2 安装后，打开如下图

![][1]



## 三 准备视频及据此生成IPTV列表

### 3.1 项目结构

| 1-整体视图 | 2-视频文件 |
| :--------: | :--------: |
|   ![][2]   |   ![][3]   |

### 3.2 IPTV文件(仅供测试)

```
#EXTINF:-1, 测试视频
http://192.168.8.42:80/Video/111.mp4
```

## 四 局域网访问iptv并播放

### 5.1 局域网IPTV地址

```
http://192.168.8.42:80/iptv.m3u
```

### 5.2 视图

| 1-添加播放源 | 2-播放列表 |
| :----------: | :--------: |
|    ![][4]    |   ![][5]   |

## 六 延申

```
- 本文视频资源放在Web Station目录下，由其提供HTTP服务
-如何将磁盘内的视频资源放在iptv中播放？？？
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-18-syn-web-view-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-18-syn-view-struce-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-18-syn-video-view-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-18-syn-add-res-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-18-syn-play-list-5.png