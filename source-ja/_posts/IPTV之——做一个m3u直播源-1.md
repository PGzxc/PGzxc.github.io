---
title: IPTV之——做一个m3u直播源(1)
categories:
  - 开发
  - J-NAS
  - 自建服务   
  - IPTV
tags:
  - IPTV
abbrlink: 5f8cd5ea
date: 2025-07-19 10:15:24
---
## 一 概述

* m3u文件介绍
* 如何创建一个 M3U 播放列表
* 示例：创建一个带分组和台标的 M3U 播放列表

<!--more-->

## 二 m3u文件介绍

```
M3U 文件格式是一种用于多媒体播放列表的标准格式，
它包含了一系列的直播源（视频或音频流），并可以通过 M3U 文件在支持的播放器中进行播放。
```

## 三 如何创建一个 M3U 播放列表

### 3.1 步骤 1: 准备 M3U 播放列表文件

```
1、打开文本编辑器：
使用你常用的文本编辑器（例如 Notepad、VS Code、Sublime Text 等）。

2、创建一个新文件：
在文本编辑器中创建一个新的文本文件。
```

### 3.2 步骤 2: 添加 M3U 文件的基本结构

```
一、M3U 文件通常包含两部分：
-文件头部标识：#EXTM3U
-每个频道的详细信息（使用 #EXTINF 和直播流地址）。

二、基本 M3U 格式结构

#EXTM3U

#EXTINF:-1, 频道名称
http://example.com/live/stream1.m3u8

#EXTINF:-1, 频道名称
http://example.com/live/stream2.m3u8

说明
1、#EXTM3U：标记该文件为 M3U 播放列表。
2、#EXTINF:-1, 频道名称：
定义每个流的描述信息，-1 代表流的持续时间（如果不确定，可以用 -1），
频道名称 是显示在播放器中的名称。
3、直播流地址：紧跟在 #EXTINF 标签后的行，提供实际的直播流 URL。
```

### 3.3 步骤 3: 扩展 M3U 文件，添加更多信息

```
如果你想添加更多信息（如：台标、EPG、节目开始时间等），你可以通过扩展 #EXTINF 标签来实现：

#EXTM3U

#EXTINF:-1 tvg-logo="http://example.com/logo.png" tvg-id="channel1" group-title="体育" 频道名称, 频道描述
http://example.com/live/sports1.m3u8

#EXTINF:-1 tvg-logo="http://example.com/logo2.png" tvg-id="channel2" group-title="娱乐" 频道名称, 频道描述
http://example.com/live/entertainment1.m3u8

解释扩展字段
1、tvg-logo="http://example.com/logo.png"：指定台标的 URL 链接。
2、tvg-id="channel1"：每个频道的唯一 ID（可选）。
3、group-title="体育"：分组名称，用来将频道分组（例如，“体育”组）。
4、频道名称：显示的频道名称。
5、频道描述：可选的频道描述。
```

### 3.4 步骤 4: 保存文件

```
保存文件：将文件保存为 .m3u 格式，例如：live_channels.m3u。
在保存时选择 "所有文件" 类型，然后输入文件名并确保扩展名是 .m3u
```

### 3.5 步骤 5: 使用 M3U 播放列表

```
你可以在支持 M3U 播放列表的播放器中打开此文件。例如：
-VLC：选择“打开文件”并选择 .m3u 播放列表文件。
-IPTV 播放器：将 .m3u 文件导入到支持 IPTV 的播放器中。
```

## 四 示例：创建一个带分组和台标的 M3U 播放列表

### 4.1 示例

```
#EXTM3U

#EXTINF:-1 tvg-logo="http://example.com/logo_sports.png" tvg-id="sports1" group-title="体育" 中国足球频道, 中国足球频道直播
http://example.com/live/sports1.m3u8

#EXTINF:-1 tvg-logo="http://example.com/logo_entertainment.png" tvg-id="entertainment1" group-title="娱乐" 湖南卫视, 湖南卫视直播
http://example.com/live/entertainment1.m3u8

#EXTINF:-1 tvg-logo="http://example.com/logo_news.png" tvg-id="news1" group-title="新闻" CCTV新闻频道, CCTV新闻频道直播
http://example.com/live/news1.m3u8

```

### 4.2 使用IPTV播放

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-1-play-view-1.png