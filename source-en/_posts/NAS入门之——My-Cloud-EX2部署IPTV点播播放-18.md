---
title: NAS入门之——My Cloud EX2部署IPTV点播播放(18)
categories:
  - NAS
  - NAS设备
  - WD MyCloud
tags:
  - My Cloud EX2
abbrlink: 44c5b4a8
date: 2025-07-25 19:57:36
---
## 一 概述

```
我们要让 EX2 的某个文件夹下的视频：

- 不转码、不推流
- 直接通过 http://<NAS IP>/videos/movie1.mp4 播放
- 自动生成 IPTV 播放列表 .m3u 文件（如 iptv.m3u）
```
<!--more-->

## 二 方法1：使用内置共享功能(简易)

### 2.1 说明

```
My Cloud EX2 自带的「Public 文件夹」和「Web访问」功能其实可以作为简易 HTTP 服务使用
```

### 2.2 步骤

```
1、打开 EX2 管理后台(如 http://192.168.1.100)
2、进入「设置」 > 启用「云访问 / HTTP 访问」
3、打开「共享」 > 找到 Public 文件夹，启用：
 - Public 共享
 - Media Serving（DLNA）

4、将视频文件上传至 Public/videos/ 目录
5、使用如下格式访问视频：

http://<NAS-IP>/Public/videos/movie1.mp4
```

## 三 方法2：安装 Entware + 自建 HTTP服务

### 3.1 说明

```
如果你需要更灵活的控制方式（例如挂载路径 /share/IPTV/ 并提供静态服务），
你可以使用 Entware（轻量软件包管理） 在EX2上安装 Python 或 Lighttpd/Nginx
```

### 3.2 步骤

```
1、安装 Entware
如果你之前已尝试过，跳过这步。
参考仓库安装 Entware：
https://github.com/Entware/Entware/wiki/Install-on-WD-My-Cloud

2、安装 Python 或 HTTP 服务
opkg update
opkg install python3
或者：
opkg install lighttpd

3、使用 Python 启动 HTTP 静态服务
cd /mnt/HD/HD_a2/Public/iptv       # 假设你的视频放这里
python3 -m http.server 8080
```

## 四 生成播放列表文件

### 4.1 目录结构

```
/mnt/HD/HD_a2/Public/iptv/
├── videos/                # ← 放你的视频文件
│   ├── movie1.mp4
│   └── movie2.mp4
├── logo/                  # ← 可选，频道图标，名称需与视频一致
│   ├── movie1.png
│   └── movie2.png
├── iptv.m3u               # ← 自动生成的播放列表
└── generate_m3u.py        # ← 我为你生成的脚本
```

### 4.2  IPTV 播放列表的目标链接格式

```
#EXTINF:-1 tvg-name="movie1" tvg-logo="http://192.168.1.100:8080/logo/movie1.png" group-title="NAS视频",movie1
http://192.168.1.100:8080/videos/movie1.mp4
```

### 4.3 `generate_m3u.py` 脚本

```
import os

# ✅ 修改为你 NAS 的 IP 地址
NAS_HOST = "http://192.168.1.100:8080"

# 📁 视频和台标目录（与你文件夹一致）
VIDEO_DIR = "videos"
LOGO_DIR = "logo"
GROUP_TITLE = "NAS视频"
OUTPUT_FILE = "iptv.m3u"

def generate_m3u():
    lines = ["#EXTM3U\n"]

    video_files = sorted(os.listdir(VIDEO_DIR))

    for file in video_files:
        if file.lower().endswith((".mp4", ".mkv", ".avi", ".mov")):
            name = os.path.splitext(file)[0]
            video_url = f"{NAS_HOST}/{VIDEO_DIR}/{file}"
            logo_path = f"{LOGO_DIR}/{name}.png"
            logo_url = f"{NAS_HOST}/{logo_path}" if os.path.exists(logo_path) else ""

            # 添加频道行
            extinf = f'#EXTINF:-1 tvg-name="{name}" group-title="{GROUP_TITLE}"'
            if logo_url:
                extinf += f' tvg-logo="{logo_url}"'
            extinf += f',{name}'

            lines.append(extinf)
            lines.append(video_url)
            lines.append("")  # 空行

    # 写入 .m3u 文件
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"✅ IPTV 播放列表已生成：{OUTPUT_FILE}")

if __name__ == "__main__":
    generate_m3u()
```

### 4.4 使用方法(NAS 上或本地运行)

```
1、将该脚本保存为 /mnt/HD/HD_a2/Public/iptv/generate_m3u.py
2、确保你已上传视频到 videos/，可选上传图标到 logo/
3、SSH 登录到 NAS，或在本地运行脚本（访问 NAS 文件）
4、执行：

cd /mnt/HD/HD_a2/Public/iptv/
python3 generate_m3u.py

运行完成后，你将获得一个 IPTV 播放器可直接使用的：

http://192.168.1.100:8080/iptv.m3u

5、支持 VLC、TiviMate、IPTV Pro、IINA、Kodi 等。
```

