---
title: IPTV之——将视频转换为直播流文件(5)
categories:
  - 开发
  - J-NAS
  - 自建服务  
  - IPTV
tags:
  - IPTV
abbrlink: b0fe1292
date: 2025-07-24 22:41:04
---
## 一 概述

```
IPTV 中将一个普通视频文件(如.mp4、.ts)变为直播流（Live Stream），
通常是通过推流(push)的方式将视频内容实时送入一个媒体服务器，
再通过直播协议(如 HLS 或 RTMP)播放。
```

<!--more-->

## 二 将视频转为IPTV直播流文件(如.m3u8 或.ts 流)

### 2.1 使用 `FFmpeg` + `HLS`

这是最常用的方式，适合将本地视频文件（如 `movie.mp4`）转为 `.m3u8` HLS 直播流格式。

1、安装 FFmpeg

```
下载地址：https://ffmpeg.org/download.html
```

2、 FFmpeg 命令行示例（转为本地 HLS）

```
ffmpeg -re -i movie.mp4 \
  -c:v libx264 -c:a aac \
  -f hls \
  -hls_time 5 \
  -hls_list_size 10 \
  -hls_flags delete_segments \
  ./output/stream.m3u8
```

参数说明：

```
-re: 模拟实时速度读取文件
-i movie.mp4: 输入源
-c:v libx264: 使用 H.264 编码
-f hls: 输出格式为 HLS
-hls_time 5: 每个分片 5 秒
-hls_list_size 10: m3u8 中保留 10 个片段
-hls_flags delete_segments: 删除旧片段（滚动直播效果）
```

3、输出目录下会生成：

```
stream.m3u8    # 主播放列表
stream0.ts     # 分片视频文件
stream1.ts     # ...
```

### 2.2 方法二：将视频推送为 RTMP 流(搭配 Nginx + RTMP 模块)

1、搭建 RTMP 服务器（如 Nginx + RTMP 模块）

```
1、安装教程见：https://github.com/arut/nginx-rtmp-module

2、配置如下
rtmp {
  server {
    listen 1935;
    chunk_size 4096;

    application live {
      live on;
      record off;
    }
  }
}
```

2、FFmpeg 推流命令(RTMP 推送)

```
ffmpeg -re -i movie.mp4 \
  -c:v libx264 -c:a aac \
  -f flv rtmp://localhost/live/stream
```

转为直播

```
然后你就可以通过：
rtmp://localhost/live/stream

或者搭配 Nginx 的 HLS 转发，变成：

http://localhost/hls/stream.m3u8
```

### 2.3 IPTV 在线转发

1、什么是“在线转发”？

```
“在线转发”是指你将本地的视频或直播内容推流到一个公网直播平台(如 YouTube、Twitch、哔哩哔哩)，

由它们来提供直播服务与 CDN 分发，别人通过 IPTV 或播放器就能观看。
```

2、推流流程简述

```
1、准备本地视频源（如 video.mp4、摄像头、OBS 虚拟源等）
2、获取直播平台的 RTMP 推流地址（带有 rtmp:// 前缀）
3、使用 FFmpeg 或 OBS 将视频推送到该地址
4、平台生成直播观看地址（HLS），你就能将它加入 IPTV 播放列表中
```

3、示例(用 FFmpeg 推送到 YouTube)

```
1、获取 YouTube 推流地址
rtmp://a.rtmp.youtube.com/live2/YOUR_STREAM_KEY

2、推流命令(FFmpeg)
ffmpeg -re -i video.mp4 -c:v libx264 -c:a aac -f flv \
  rtmp://a.rtmp.youtube.com/live2/YOUR_STREAM_KEY
```

## 三 用于 IPTV 播放(例如放入 .m3u8 列表)

```
将直播流地址写入 .m3u 播放列表中：

#EXTM3U
#EXTINF:-1 tvg-id="test" group-title="Test",本地推流测试
http://localhost/output/stream.m3u8
```

## 四 几种方式对比

|       类型        |                  技术方案                   |   输出   |       适合场景        |
| :---------------: | :-----------------------------------------: | :------: | :-------------------: |
| 本地 `.m3u8` 输出 |                FFmpeg -f hls                | HLS文件  | 无需服务器，简单测试  |
|  本地 RTMP 推流   |      `FFmpeg -f flv` 推送到 Nginx RTMP      | RTMP 流  | IPTV 推流源、自建频道 |
|     在线转发      | OBS / FFmpeg + Youtube/Twitch/Bilibili RTMP | 公网直播 |     公网直播频道      |






