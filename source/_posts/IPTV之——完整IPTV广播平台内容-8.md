---
title: IPTV之——完整IPTV广播平台内容(8)
categories:
  - 开发
  - J-NAS
  - 自建服务   
  - IPTV
tags:
  - IPTV
abbrlink: ab4881d7
date: 2025-07-24 22:44:38
---
## 一 概述

```
下面是一个完整的IPTV.m3u播放列表示例，同时包含：

-台标(tvg-logo)
-频道分组(group-title)
-EPG 节目单关联(tvg-id 与 XMLTV 对应)
-多频道展示
```

<!--more-->

## 二 `.m3u` 播放列表示例(文件名例如 `iptv.m3u`)

```
#EXTM3U x-tvg-url="http://localhost:8080/epg.xml"

#EXTINF:-1 tvg-id="news" tvg-name="本地新闻频道" tvg-logo="http://localhost:8080/logo/news.png" group-title="新闻",本地新闻
http://localhost:8080/hls/news.m3u8

#EXTINF:-1 tvg-id="movie" tvg-name="电影频道" tvg-logo="http://localhost:8080/logo/movie.png" group-title="影视",经典电影
http://localhost:8080/hls/movie.m3u8

#EXTINF:-1 tvg-id="music" tvg-name="音乐频道" tvg-logo="http://localhost:8080/logo/music.png" group-title="音乐",怀旧金曲
http://localhost:8080/hls/music.m3u8

#EXTINF:-1 tvg-id="kids" tvg-name="儿童频道" tvg-logo="http://localhost:8080/logo/kids.png" group-title="儿童",卡通乐园
http://localhost:8080/hls/kids.m3u8
```

## 三 台标图片示例

```
1、你需要将 logo 图片部署在 nginx 的 /logo/ 目录下，例如

http://localhost:8080/logo/news.png
http://localhost:8080/logo/movie.png
http://localhost:8080/logo/music.png
http://localhost:8080/logo/kids.png

2、图片规格
可以使用 200x200 或 400x400 PNG 图片
```

## 四 EPG 节目单示例(文件名：`epg.xml`)

```
<?xml version="1.0" encoding="UTF-8" ?>
<tv>
  <channel id="news">
    <display-name>本地新闻频道</display-name>
  </channel>
  <channel id="movie">
    <display-name>电影频道</display-name>
  </channel>
  <channel id="music">
    <display-name>音乐频道</display-name>
  </channel>
  <channel id="kids">
    <display-name>儿童频道</display-name>
  </channel>

  <programme start="20250724180000 +0800" stop="20250724183000 +0800" channel="news">
    <title>本地早报</title>
    <desc>播报本地最新资讯</desc>
  </programme>

  <programme start="20250724183000 +0800" stop="20250724190000 +0800" channel="movie">
    <title>功夫片特辑</title>
    <desc>经典功夫片欣赏</desc>
  </programme>

  <programme start="20250724190000 +0800" stop="20250724200000 +0800" channel="music">
    <title>怀旧金曲</title>
    <desc>港台流行金曲回顾</desc>
  </programme>

  <programme start="20250724200000 +0800" stop="20250724203000 +0800" channel="kids">
    <title>喜羊羊与灰太狼</title>
    <desc>亲子卡通时间</desc>
  </programme>
</tv>
```

## 五 播放效果(播放器支持)

```
1、在以下播放器中导入.m3u，即可看到：
-台标图标显示
-频道按组分类
-节目单显示当前播放内容

2、支持 EPG + LOGO 的播放器包括：

-TiviMate（Android）
-Smart IPTV（电视盒）
-IPTV Pro / OTT Navigator
-VLC（基础支持）
```

## 六 部署路径结构建议

```
/iptv-root
├── iptv.m3u           # 播放列表文件
├── epg.xml            # 节目单
├── logo/
│   ├── news.png
│   ├── movie.png
│   └── ...
├── hls/
│   ├── news.m3u8
│   ├── movie.m3u8
│   └── ...

```

