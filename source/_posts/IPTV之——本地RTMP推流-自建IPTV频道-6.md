---
title: IPTV之——本地RTMP推流+自建IPTV频道(6)
categories:
  - 开发
  - J-NAS
  - 自建服务
  - IPTV
tags:
  - IPTV
abbrlink: f4ce5a54
date: 2025-07-24 22:42:00
---
## 一 概述

```
本地RTMP推流+自建IPTV频道:
-适合想要将本地视频文件或摄像头推送为一个“像电视台一样的直播频道”的场景，
-比如用于IPTV、内网点播、教育广播等。
```

<!--more-->

## 二 目标

```
将本地视频（如.mp4文件）变成一个RTMP直播频道，并通过.m3u8 格式让IPTV或播放器播放。
```

## 三 技术栈与工具

|                 工具                 |                    用途                     |
| :----------------------------------: | :-----------------------------------------: |
|                FFmpeg                |     推流工具，将视频推送到 RTMP 服务器      |
| Nginx + RTMP 模块(nginx-rtmp-module) |              本地 RTMP 服务器               |
|          HLS 转发模块(可选)          | 将 RTMP 自动转为 `.m3u8` 格式以供 IPTV 播放 |

## 四 实现步骤

### 4.1 步骤1：安装 Nginx + RTMP 模块

1、Docker 安装

```
docker run -d \
  --name nginx-rtmp \
  -p 1935:1935 \
  -p 8080:80 \
  -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf \
  tiangolo/nginx-rtmp
```

2、`nginx.conf` 配置文件如下

```
# 启动多个工作进程
worker_processes auto;

events {
  worker_connections 1024;  # 每个 worker 最多同时处理 1024 个连接
}

# ========================
# RTMP 服务配置（重点）
# ========================
rtmp {
  server {
    listen 1935;          # RTMP 协议监听端口（标准）
    chunk_size 4096;      # RTMP 分块大小，通常无需更改

    application live {    # 定义 RTMP 应用名（URL 中使用）
      live on;            # 启用直播模式
      record off;         # 关闭录制功能

      # HLS 输出设置（可选）
      hls on;                         # 开启 HLS 输出
      hls_path /tmp/hls;              # HLS 输出路径
      hls_fragment 5s;                # 每个 ts 分片时长
      hls_playlist_length 60s;        # m3u8 中包含的 ts 总时长（12 个片段）
    }
  }
}

# ========================
# HTTP 配置（用于访问 m3u8）
# ========================
http {
  server {
    listen 8080;  # HTTP 服务端口

    # 提供静态网页服务（可用于测试）
    location / {
      root /usr/share/nginx/html;
      index index.html;
    }

    # HLS 视频访问路径
    location /hls {
      types {
        application/vnd.apple.mpegurl m3u8;  # HLS 播放列表类型
        video/mp2t ts;                       # 视频分片类型
      }
      root /tmp;                             # 匹配前面 hls_path
      add_header Cache-Control no-cache;    # 禁用缓存
      add_header Access-Control-Allow-Origin *;  # 允许跨域播放
    }
  }
}
```

### 4.2 步骤2：FFmpeg 推流到 RTMP 本地服务

```
1、使用如下命令将本地视频推送为直播流：
ffmpeg -re -i video.mp4 \
  -c:v libx264 -c:a aac -f flv \
  rtmp://localhost/live/test

2、说明：
-re：按原速读取文件（模拟直播）
rtmp://localhost/live/test：推送地址（频道名：test）
```

### 4.3 步骤3：播放 RTMP 或生成 HLS `.m3u8`(供 IPTV 使用)

1、RTMP 播放方式(VLC 支持)

```
rtmp://localhost/live/test
```

2、 自动转为 HLS(推荐 IPTV 播放格式)

```
1、修改nginx.conf，加上HLS转码(需要 FFmpeg 后端)
application live {
  live on;
  record off;

  hls on;
  hls_path /tmp/hls;
  hls_fragment 5s;
  hls_playlist_length 60s;
}

2、重启 nginx 后，访问
http://localhost:8080/hls/test.m3u8
```

### 4.4 步骤4：加入 IPTV 播放列表(.m3u)

```
生成如下 .m3u 文件

#EXTM3U
#EXTINF:-1 tvg-id="local-test" group-title="本地频道",本地直播频道
http://localhost:8080/hls/test.m3u8
```

