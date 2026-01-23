---
title: IPTV之——内网IPTV广播平台(7)
categories:
  - 开发
  - J-NAS
  - 自建服务   
  - IPTV
tags:
  - IPTV
abbrlink: 10001a55
date: 2025-07-24 22:43:10
---
## 一 概述

```
实现一个可以像电视一样“多个频道、EPG、台标、分组、直播流”的 IPTV 系统，
适合部署在学校、公司、养老院、局域网直播、家庭影院等环境。
```

<!--more-->

## 二 目标：打造一个完整的 IPTV 广播平台

```
- 多频道推流
-.m3u 播放列表支持分组 + 台标 + EPG
- 浏览器/电视盒/局域网播放器可直接观看
- 所有资源本地部署，不依赖外网
```

## 三 核心组件一览

|      组件       |         功能         |           推荐工具           |
| :-------------: | :------------------: | :--------------------------: |
| RTMP 推流服务器 |      接收视频流      |  Nginx + nginx-rtmp-module   |
|    HLS 转码     | 输出 `.m3u8` 视频流  |     nginx 配置 + FFmpeg      |
|  播放列表管理   | 频道列表 `.m3u` 文件 |       自建 `.m3u` 文件       |
| 电子节目单(EPG) |     节目预告信息     | XMLTV 格式，EPG 文件本地生成 |
|   台标(Logo)    |    每个频道 logo     |     URL 或本地图片文件夹     |

## 四 搭建步骤详解

### 4.1 步骤1：部署 RTMP + HLS 转发服务器(Docker)

```
1、创建一个名为 nginx.conf 的配置文件如下
worker_processes auto;

events {
  worker_connections 1024;
}

rtmp {
  server {
    listen 1935;
    chunk_size 4096;

    application live {
      live on;
      record off;

      hls on;
      hls_path /tmp/hls;
      hls_fragment 5s;
      hls_playlist_length 30s;
    }
  }
}

http {
  server {
    listen 8080;

    location /hls {
      types {
        application/vnd.apple.mpegurl m3u8;
        video/mp2t ts;
      }
      root /tmp;
      add_header Cache-Control no-cache;
      add_header Access-Control-Allow-Origin *;
    }
  }
}

2、然后运行 nginx-rtmp docker 容器
docker run -d \
  --name nginx-iptv \
  -p 1935:1935 -p 8080:8080 \
  -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf \
  tiangolo/nginx-rtmp
```

### 4.2 ：推流多个频道(使用 FFmpeg)

```
1、你可以用脚本批量推多个频道，比如这样
#!/bin/bash

for file in /iptv/videos/*.mp4; do
  name=$(basename "$file" .mp4)
  ffmpeg -re -stream_loop -1 -i "$file" \
    -c:v libx264 -c:a aac -f flv \
    "rtmp://localhost/live/$name" &
done


2、说明
以上脚本会自动读取文件夹内所有 .mp4 并生成频道。
```

### 4.3 生成 IPTV `.m3u` 播放列表(带台标、分组)

1、示例

```
#EXTM3U x-tvg-url="http://localhost:8080/epg.xml"
#EXTINF:-1 tvg-id="news" tvg-name="本地新闻" tvg-logo="http://localhost/logo/news.png" group-title="新闻频道",本地新闻
http://localhost:8080/hls/news.m3u8

#EXTINF:-1 tvg-id="movie" tvg-name="电影频道" tvg-logo="http://localhost/logo/movie.png" group-title="娱乐频道",电影频道
http://localhost:8080/hls/movie.m3u8
```

2、说明

|    字段     |               作用               |
| :---------: | :------------------------------: |
|   tvg-id    |       对应 EPG 中的频道 ID       |
|  tvg-logo   |  台标地址(可以是公网、本地 Web)  |
| group-title | 分组名(如“新闻频道”、“综艺频道”) |

### 4.4 生成 EPG(电子节目单)

1、可用工具

```
WebGrab+Plus：http://webgrabplus.com/
EPGStation：https://github.com/l3tnun/EPGStation
```

2、可使用 WebGrab+Plus、EPGStation 或自己生成 XML 文件，例如

```
<tv>
  <channel id="news">
    <display-name>本地新闻</display-name>
  </channel>
  <programme start="20250724180000 +0800" stop="20250724183000 +0800" channel="news">
    <title>新闻联播</title>
    <desc>今日头条、本地资讯</desc>
  </programme>
</tv>
```

3、提供服务

```
保存为：epg.xml，提供本地服务：http://localhost:8080/epg.xml
```

### 4.5 用 IPTV 播放器加载 `.m3u` 频道

```
可用播放器：

-VLC（支持 m3u/m3u8）
-iOS/Android 的 IPTV Pro、TiviMate、Kodi、Perfect Player
-智能电视 / 盒子（Smart IPTV）
-浏览器播放器（Video.js + HLS 插件）
```

