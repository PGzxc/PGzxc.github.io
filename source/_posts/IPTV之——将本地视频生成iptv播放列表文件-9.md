---
title: IPTV之——将本地视频生成iptv播放列表文件(9)
categories:
  - 开发
  - J-NAS
  - 自建服务   
  - IPTV
tags:
  - IPTV
abbrlink: 17da0f65
date: 2025-07-24 22:45:12
---
## 一 概述

```
通过以下方法将本地.mp4 视频批量转成IPTV播放器可识别的.m3u播放列表文件iptv.m3u，

支持：
- 视频名作为频道名
- 播放 URL 为本地 HTTP/HLS 访问地址
- 可附加频道分组、台标、EPG字段
```

<!--more-->

## 二 目标示例 `.m3u` 文件内容如下：

```
#EXTM3U x-tvg-url="http://localhost:8080/epg.xml"

#EXTINF:-1 tvg-id="video1" tvg-name="Video 1" tvg-logo="http://localhost:8080/logo/video1.png" group-title="本地视频",Video 1
http://localhost:8080/hls/video1.m3u8

#EXTINF:-1 tvg-id="video2" tvg-name="Video 2" tvg-logo="http://localhost:8080/logo/video2.png" group-title="本地视频",Video 2
http://localhost:8080/hls/video2.m3u8
```

## 三 使用 Python 自动生成 `iptv.m3u`

### 3.1 准备结构

```
/iptv
├── videos/              # 你的本地视频文件夹
│   ├── video1.mp4
│   ├── video2.mp4
├── logo/                # 台标图片（可选）
│   ├── video1.png
│   ├── video2.png
├── generate_m3u.py      # ⬅ 脚本文件
└── iptv.m3u             # ⬅ 自动生成结果

```

### 3.2 `generate_m3u.py` 脚本内容

```
import os

# 配置路径
video_dir = "./videos"
logo_prefix = "http://localhost:8080/logo"
hls_prefix = "http://localhost:8080/hls"
output_file = "iptv.m3u"

# 播放列表头部
lines = ['#EXTM3U x-tvg-url="http://localhost:8080/epg.xml"\n']

for filename in sorted(os.listdir(video_dir)):
    if filename.endswith(".mp4"):
        name = os.path.splitext(filename)[0]  # 不带后缀
        title = name.replace("_", " ").title()  # 频道显示名
        logo_url = f"{logo_prefix}/{name}.png"
        stream_url = f"{hls_prefix}/{name}.m3u8"

        lines.append(f'#EXTINF:-1 tvg-id="{name}" tvg-name="{title}" tvg-logo="{logo_url}" group-title="本地视频",{title}')
        lines.append(stream_url)
        lines.append("")  # 空行

# 写入文件
with open(output_file, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print("✅ 生成完成：iptv.m3u")
```

### 3.3 运行生成

```
1、指令
python3 generate_m3u.py

2、生成结果
生成结果为 iptv.m3u 文件，内容结构符合 IPTV 播放器规范
```

