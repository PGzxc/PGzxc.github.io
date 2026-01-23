---
title: jellyfin流媒体之——客户端安装与使用(5)
categories:
  - 开发
  - J-NAS
  - Jellyfin
tags:
  - Jellyfin
abbrlink: 11c4425
date: 2024-08-18 08:31:18
---
## 一 概述

* 客户端下载及安装(Android、IOS)
* 客户端登录
* 客户端使用教程
* jellyfin播放器第三方

<!--more-->

## 二 客户端下载及安装(Android、IOS)

### 2.1 Android客户端下载

1-打开jellyfin官网下载地址，点击`Full Repository`(download下需要通过应用商店下载)

```
https://jellyfin.org/downloads
```

官网下载图示

![][1]

2-打开`Full Repository`后，选择`Client`

```
https://repo.jellyfin.org/
```

图示

![][2]

3-打开Client，选择`android`

![][3]

4-选择`release`签名包进行下载(不要选择debug和unsigned包，proprietary为特别版)

```
https://repo.jellyfin.org/files/client/android/
```

图示

![][4]

### 2.2 IOS客户端下载安装

AppStore搜索jellyfin，并安装

![][5]

## 三 客户端登录(android为例)

| 打开app | 搜索服务器 | 输入用户信息 | 登录后 |
| :-----: | :--------: | :----------: | :----: |
| ![][6]  |   ![][7]   |    ![][8]    | ![][9] |

说明：

* Android端可以选择`选择服务器`搜索局域网内的jellyfin服务端，并将搜索结果列出来
* iOS没有局域网服务器搜索功能，请直接输入`192.168.1.5:8096`(根据个人服务器IP设置，8096默认可不填)
* 输入服务器端用户名和密码进行登录

## 四 客户端使用教程

### 4.1 电视节目

| 切换到电视直播 | 观看节目 |
| :------------: | :------: |
|    ![][10]     | ![][11]  |

### 4.2 观看电视剧

| 切换到电视剧 | 选择节目 |  观看   |
| :----------: | :------: | :-----: |
|   ![][12]    | ![][13]  | ![][14] |

## 五 jellyfin播放器第三方(swiftfin ios)—连接到jellyfin后

|  首页   |  搜索   |  媒体   |
| :-----: | :-----: | :-----: |
| ![][15] | ![][16] | ![][17] |

## 六 参考

* [jellyfin官网-clients](https://jellyfin.org/docs/general/clients/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-website-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-binay-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-android-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-android-release-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-ios-appstore-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-android-open-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-android-seach-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-android-login-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-android-home-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-android-live-tab-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-android-live-play-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-android-lanmu-tab-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-android-lanmu-choice-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-android-lanmu-play-14.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-swiftfin-home-15.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-swiftfin-search-16.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-5-client-swiftfin-media-17.png