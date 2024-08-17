---
title: jellyfin流媒体之——电视直播(4)
categories:
  - 开发
  - J-NAS
  - Jellyfin
tags:
  - Jellyfin
abbrlink: a74d55bf
date: 2024-08-17 10:10:19
---
## 一 概述

* 直播源分享
* jellyfin电视直播配置
* jellyfin电视直播操作

<!--more-->

## 二 直播源分享

### 2.1 网站地址

```
https://live.fanmingming.com/
```

网站图示
![][1]

### 2.2 直播源提取

```
https://live.fanmingming.com/tv/m3u/ipv6.m3u
```

## 三 jellyfin电视直播配置

### 3.1 未添加直播功能界面

![][2]

### 3.2 启动电视直播

1-控制台页面，点击左侧的`电视直播`，切换到`电视直播`配置页面

![][3]

2-电视直播页面功能介绍

![][4]

### 3.3 配置`调谐器设备`(即直播源)

1-点击`调谐器设备`后，打开`电视直播协调器安装`页面，选择调谐器类型(本文选择M3U-录制的 IPTV 频道播放列表)

![][5]

2-`电视直播协调器安装`配置如下(选择调谐器并填入在线直播源或文件-搜索图标)
![][6]

3-保存后，如下图(等待刷新结果)，至此可以观看电视直播(缺少节目表)

![][7]

### 3.4 配置`电视指南数据提供方`

1-[jellyfin-电视直播](https://jellyfin.org/docs/general/server/live-tv/index.html)，获取电视节目指南

![][8]

2-打开上述连接后，获取节目表

![][9]

电视节目表对应地址如下(下面会用到)

```
http://epg.51zmt.top:8000/e.xml
```

3-点击`电视指南数据提供方`，选择`XMLTv`

![][10]

4-配置`电视指南数据提供方`

![][11]

5-配置完成后，调谐器和电视指南数据提供方页面如下

![][12]

## 四 jellyfin电视直播操作

### 4.1 切换到`电视直播`页面

jellyfin首页，点击主屏幕的`电视直播`进入

![][13]

### 4.2 电视相关操作

1-节目标签(显示现在、电影、体育、给儿童、新闻)信息

![][14]

2-指南标签(显示节目预告)

![][15]

3-频道标签(显示可观看的电视节目)

![][16]

4-点击频道中的节目进入观看

![][17]

5-点击右下角的设置,可进行视频质量、播放速度等设置

![][18]

## 五 参考

* [直播源-fangmingming](https://live.fanmingming.com/)
* [Jellyfin-电视直播](https://jellyfin.org/docs/general/server/live-tv/index.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-source-fmm-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-view-no-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-tab-click-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-page-func-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-tiaoxie-choice-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-tiaoxie-config-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-tiaoxie-fresh-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-zhinan-shedules-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-zhinan-site-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-zhinan-choice-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-zhinan-config-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-zhinan-finish-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-home-live-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-tv-tab-14.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-tv-zhinan-15.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-tv-pindao-16.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-tv-live-17.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-4-live-tv-live-set-18.png