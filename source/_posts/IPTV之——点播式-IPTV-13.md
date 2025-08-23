---
title: IPTV之——点播式 IPTV(13)
categories:
  - 开发
  - J-NAS
  - 自建服务 
  - IPTV
tags:
  - IPTV
abbrlink: 6b4a52bd
date: 2025-07-25 19:35:21
---
## 一 概述

```
要 “不转码、不推流”，直接用 原始视频文件（如 .mp4）构建 IPTV .m3u 播放列表！
这种方式属于点播式 IPTV（VOD），
适合在家庭、酒店、教室等局域网环境中使用。
```

<!--more-->

## 二 目标效果

```
视频文件原样保留，只通过 HTTP 静态服务访问，
播放器（如 VLC、IPTV Pro）从 .m3u 中读取视频地址直接播放，无需转码。
```

## 三 目录结构建议

```
假设你在本地或NAS搭了个Web服务器（Nginx、Python HTTP、群晖、OpenWrt、路由器等），
目录结构如下：

/iptv-root
├── videos/
│   ├── movie1.mp4
│   ├── movie2.mp4
├── logo/
│   ├── movie1.png
│   ├── movie2.png
├── iptv.m3u      ✅ 播放列表文件（自动生成）
```

## 四 m3u 文件结构(示例)

```
#EXTM3U

#EXTINF:-1 tvg-id="movie1" tvg-name="电影1" tvg-logo="http://192.168.1.100:8080/logo/movie1.png" group-title="本地视频",电影1
http://192.168.1.100:8080/videos/movie1.mp4

#EXTINF:-1 tvg-id="movie2" tvg-name="电影2" tvg-logo="http://192.168.1.100:8080/logo/movie2.png" group-title="本地视频",电影2
http://192.168.1.100:8080/videos/movie2.mp4
```

## 五 Python 脚本自动生成 iptv.m3u

将此脚本保存为 generate_m3u.py：

```
import os

# 配置
host = "http://192.168.1.100:8080"  # 改为你设备的内网IP或域名
video_dir = "videos"
logo_dir = "logo"
group_title = "本地视频"
output_file = "iptv.m3u"

lines = ["#EXTM3U\n"]

for file in sorted(os.listdir(video_dir)):
    if file.endswith((".mp4", ".mkv", ".avi", ".mov")):
        name = os.path.splitext(file)[0]
        video_url = f"{host}/{video_dir}/{file}"
        logo_url = f"{host}/{logo_dir}/{name}.png"

        lines.append(f'#EXTINF:-1 tvg-id="{name}" tvg-name="{name}" tvg-logo="{logo_url}" group-title="{group_title}",{name}')
        lines.append(video_url)
        lines.append("")

with open(output_file, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"✅ 已生成 {output_file}")
```

## 六 启动本地 HTTP 服务(示例：Python)

### 6.1 为什么需要本地服务？

```
1、原因
因为 IPTV 播放器（如 VLC、IPTV Pro、TiviMate）只能播放网络URL，
无法直接读取你本地磁盘的 file:// 路径（出于安全和兼容性原因）。

2、不支持本地路径
这类路径不会被 IPTV 播放器支持
file:///C:/Users/you/Videos/movie1.mp4

3、本地路径示例
需要通过一个本地 HTTP 服务访问，例如
http://192.168.1.100:8080/videos/movie1.mp4
```

### 6.2 本地服务的几种启动方式

|       方法       |              命令               |           说明           |
| :--------------: | :-----------------------------: | :----------------------: |
| Python 内置服务  |   python3 -m http.server 8080   | 快速零依赖，支持所有平台 |
| Node.js 静态服务 | npx serve` 或 `npx http-server  |    样式美观，支持 SPA    |
| Nginx(推荐进阶)  | 配置 Nginx 映射 `/videos` 路径  | 性能高，适合长期开机运行 |
|  群晖 / OpenWrt  | 建站套件、nginx/lighttpd/uhttpd |   NAS 和路由器专用方式   |
| Windows GUI 工具 |     如 HFS、Easy File Share     | 有图形界面，适合小白用户 |

### 6.3 如何启动本地HTTP服务

```
在根目录（含 videos/）下运行:

python3 -m http.server 8080
即可在本机开启 Web 服务（默认路径为 http://localhost:8080/）
```

## 七 在 IPTV 播放器中使用

```
将 iptv.m3u 放入播放器（或网页）中：

-VLC/IINA：打开网络串流 > 粘贴 http://192.168.1.100:8080/iptv.m3u
-TiviMate/IPTV Pro/Kodi：导入 .m3u 文件或 URL
-浏览器播放：支持video/mp4 格式的播放器，如 plyr.js、Video.js 等
```

## 八 优点(与直播流比较)

|   项目   |  原始文件播放(VOD)  |  直播流(RTMP/HLS)   |
| :------: | :-----------------: | :-----------------: |
| 转码压力 |        无需         |  需要 FFmpeg 推流   |
| 启动速度 |        秒开         |     一般需缓存      |
| 支持格式 | 原生 `.mp4`、`.mkv` |  通常需转码成 HLS   |
| 构建简单 |  静态文件服务即可   | 需搭建 RTMP + Nginx |
|   功能   |     点播、拖动      |  实时播放，难拖动   |
|  稳定性  |     高(局域网)      |  中等，依赖推流端   |

## 九 总结：适合你使用场景

```
-家庭 NAS 影视库分享
-酒店房间 IPTV 点播（无需直播流）
-教育课堂、企业资料室使用
-离线播放器 + 局域网分享
```

