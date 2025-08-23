---
title: IPTV之——做一个TXT直播源(2)
categories:
  - 开发
  - J-NAS
  - 自建服务   
  - IPTV
tags:
  - IPTV
abbrlink: '63791623'
date: 2025-07-20 09:49:55
---
## 一 概述

* TXT做直播源说明
* TXT创建简易直播源
* TXT创建带分组扩展直播源
* TXT添加group分组

<!--more-->

## 二 TXT做直播源说明

```
-大部分IPTV软件并不支持播放TXT格式文件
-TXT文件一般做简单文件整理
-稍后通过TXT==>M3U转换为m3u格式文件
-TXT文件不支持group分组
```

## 三 TXT创建简易直播源

### 3.1 格式及示例(逗号分隔)

```
1、格式
频道名称,直播源地址

2、示例
中国足球频道,http://example.com/live/sports1.m3u8,
中国篮球频道,http://example.com/live/sports2.m3u8
湖南卫视,http://example.com/live/entertainment1.m3u8
浙江卫视,http://example.com/live/entertainment2.m3u8
```

### 3.2 播放演示(未分组)

![][1]

## 四 TXT创建带分组扩展直播源

### 4.1 分组说明

```
一、分组格式
1、体育频道,#genre#
2、[group=娱乐频道]

2、说明：此种格式分组，并不支持m3u格式，此处仅供书写时分组使用
```

### 4.2 示例

```
体育频道,#genre#
中国足球频道,http://example.com/live/sports1.m3u8,中国足球频道直播源,http://example.com/logo1.png,2023-10-18 20:00,体育节目A
中国篮球频道,http://example.com/live/sports2.m3u8,中国篮球频道直播源,http://example.com/logo2.png,2023-10-18 21:00,篮球赛直播


[group=娱乐频道]
湖南卫视,http://example.com/live/entertainment1.m3u8,湖南卫视直播源,http://example.com/logo3.png,2023-10-18 19:30,娱乐节目A
浙江卫视,http://example.com/live/entertainment2.m3u8,浙江卫视直播源,http://example.com/logo4.png,2023-10-18 20:00,娱乐节目B

[group=新闻频道]
中央新闻频道,http://example.com/live/news1.m3u8,中央新闻频道直播源,http://example.com/logo5.png,2023-10-18 18:00,新闻报导
CCTV新闻频道,http://example.com/live/news2.m3u8,CCTV新闻频道直播源,http://example.com/logo6.png,2023-10-18 18:30,全球新闻
```

### 4.3 转换后播放(标志作为分组依据)

![][2]

## 五 TXT添加group分组

### 5.1 示例(添加group-title分组)

```
group-title="体育频道", 中国足球频道,http://example.com/live/sports1.m3u8
group-title="体育频道",中国篮球频道,http://example.com/live/sports2.m3u8,中国篮球频道直播源

group-title="娱乐频道", 湖南卫视,http://example.com/live/entertainment1.m3u8
group-title="娱乐频道",浙江卫视,http://example.com/live/entertainment2.m3u8

group-title="新闻频道", 中央新闻频道,http://example.com/live/news1.m3u8
group-title="新闻频道",CCTV新闻频道,http://example.com/live/news2.m3u8
```

### 5.2 转换后播放(带分组)

![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-2-txt-nogroup-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-2-txt-group-view-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-2-txt-group-view-3.png

