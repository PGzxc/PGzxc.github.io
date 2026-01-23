---
title: ZyPlayer播放器之——配置及数据导入(1)
categories:
  - 开发
  - J-NAS
  - ZyPlayer
tags:
  - ZyPlayer
abbrlink: 283ddf4c
date: 2024-07-30 08:36:50
---
## 一 概述

* ZyPlayer介绍
* 有效资源
* 播放器配置
* 配置导出导入

<!--more-->

## 二 ZyPlayer介绍

* ZyPlayer 是一款采用现代化技术栈开发的全功能媒体播放器
* 它基于 `electron-vite` 框架，集成了 `TDesign` UI 组件库与 `Vue3` 全家桶
* 全面支持 Windows、Mac、Linux 系统
* 支持导入本地或远程网络志愿

## 三 有效资源

### 3.1 资源地址

https://github.com/Hiram-Wong/ZyPlayer/issues/43

### 3.2 筛选有效地址

```
http://xiaoguozitv.cn/catys/zyplay.json
```

说明：

* 依次点击网友分享资源，显示有效json的为有效链接
* 显示404等为无效资源，经过滤后只有第一个可用

## 四 播放器配置

### 4.1 影视配置

1-打开ZyPlayer后，点击右上角设置

![][1]

2-数据管理界面导入数据

![][2]

说明：

* 数据管理界面，`一键配置`选择`此软件`填入接口
* 数据管理界面，`配置导入`选择`远程导入`

3-影视效果图

![][3]

### 4.2 电视配置

1-打开电视配置界面

![][4]

2-下载m3u8直播源

地址：http://www.kodiplayer.cn/movie/2898.html

远程直播源：https://live.fanmingming.com/tv/m3u/ipv6.m3u

3-导入本地直播源

![][5]

4-导入后如下

![][6]

5-直播源效果图

![][7]

## 五 配置导出导入

### 5.1 配置导出

![][8]

### 5.2 配置导入

![][9]

## 六 参考

* [ZyPlayer介绍](https://zy.catni.cn/what-is-zyplayer.html)
* [fanmingming](https://live.fanmingming.com/)
* [Kodi IPTV m3u8直播源下载 2024年最新m3u直播源](http://www.kodiplayer.cn/movie/2898.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-1-setting.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-1-import.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-1-video.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-1-live-setting.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-1-live-import.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-1-live-finish.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-1-live-view.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-1-config-export.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-1-config-import.png