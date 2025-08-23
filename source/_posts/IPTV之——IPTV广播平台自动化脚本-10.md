---
title: IPTV之——IPTV广播平台自动化脚本(10)
categories:
  - 开发
  - J-NAS
  - 自建服务   
  - IPTV
tags:
  - IPTV
abbrlink: 2bcd7bbf
date: 2025-07-24 22:45:46
---
## 一 概述

```
IPTV 广播平台自动化脚本方案能实现一下内容：

- 自动推流多个 .mp4 文件为频道
- 自动生成.m3u播放列表(含台标、分组、tvg-id)
- 自动生成简单 EPG(epg.xml)
```

<!--more-->

## 二 目录结构建议(假设你放在 `/iptv` 下)

```
/iptv
├── videos/            # 频道视频（命名即频道名）
│   ├── news.mp4
│   ├── movie.mp4
│   ├── music.mp4
├── logo/              # 台标图片（与视频名一致）
│   ├── news.png
│   ├── movie.png
├── iptv.m3u           # 自动生成的播放列表
├── epg.xml            # 自动生成的节目单
├── auto_push.sh       # 自动推流脚本
├── generate_iptv.py   # 生成 m3u + epg 脚本
```

## 三 脚本

### 3.1 `auto_push.sh`(自动推流)

```
#!/bin/bash

VPATH="./videos"
for file in "$VPATH"/*.mp4; do
  name=$(basename "$file" .mp4)
  echo "推流频道: $name"
  ffmpeg -re -stream_loop -1 -i "$file" \
    -c:v libx264 -c:a aac -f flv "rtmp://localhost/live/$name" &
done

wait
```

说明：自动循环播放每个 `.mp4` 并推送到 RTMP

### 3.2 `generate_iptv.py`(生成 .m3u 和 epg.xml)

```
import os
from datetime import datetime, timedelta

# 配置
video_dir = "./videos"
logo_dir = "http://localhost:8080/logo"
hls_prefix = "http://localhost:8080/hls"
epg_file = "epg.xml"
m3u_file = "iptv.m3u"

# 自定义频道分组
group_map = {
    "news": "新闻",
    "movie": "影视",
    "music": "音乐",
    "kids": "儿童",
}

# ===== 生成 .m3u 播放列表 =====
with open(m3u_file, "w", encoding="utf-8") as m3u:
    m3u.write('#EXTM3U x-tvg-url="http://localhost:8080/epg.xml"\n')
    for filename in sorted(os.listdir(video_dir)):
        if filename.endswith(".mp4"):
            name = os.path.splitext(filename)[0]
            group = group_map.get(name, "默认")
            logo_url = f"{logo_dir}/{name}.png"
            stream_url = f"{hls_prefix}/{name}.m3u8"

            m3u.write(f'#EXTINF:-1 tvg-id="{name}" tvg-name="{name}" tvg-logo="{logo_url}" group-title="{group}",{name}\n')
            m3u.write(f'{stream_url}\n\n')

# ===== 生成 epg.xml（简单固定节目） =====
now = datetime.now()
with open(epg_file, "w", encoding="utf-8") as epg:
    epg.write('<?xml version="1.0" encoding="UTF-8"?>\n<tv>\n')

    for filename in sorted(os.listdir(video_dir)):
        if filename.endswith(".mp4"):
            name = os.path.splitext(filename)[0]
            epg.write(f'  <channel id="{name}">\n')
            epg.write(f'    <display-name>{name}</display-name>\n')
            epg.write(f'  </channel>\n')

            # 添加 3 条节目记录
            for i in range(3):
                start = now + timedelta(hours=i)
                end = start + timedelta(minutes=30)
                epg.write(f'  <programme start="{start.strftime("%Y%m%d%H%M%S")} +0800" stop="{end.strftime("%Y%m%d%H%M%S")} +0800" channel="{name}">\n')
                epg.write(f'    <title>{name} 节目 {i+1}</title>\n')
                epg.write(f'    <desc>{name} 的第 {i+1} 个节目</desc>\n')
                epg.write(f'  </programme>\n')

epg.write('</tv>\n')
print("✔ 生成完成：iptv.m3u + epg.xml")
```

### 3.3 使用方法

```
# 1. 启动 Nginx RTMP 服务器
# 假设已使用 Docker 启动 nginx-rtmp 容器（见上文）

# 2. 启动推流
bash auto_push.sh

# 3. 生成播放列表和 EPG
python3 generate_iptv.py
```

### 3.4 播放测试

```
用 VLC/IPTV App加载iptv.m3u

你将看到：
-每个频道 logo 正常显示
-频道按组分类
-显示 EPG 节目（如“news 节目 1”）
```

