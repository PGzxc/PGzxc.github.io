---
title: IPTV之——Windows提供IPTV服务(17)
categories:
  - 开发
  - J-NAS
  - 自建服务  
  - IPTV
tags:
  - IPTV
abbrlink: efdeab45
date: 2025-07-28 15:08:22
---
## 一 概述

```
在Windows上实现IPTV本地HTTP服务：
- 利用HFS搭建WindowsHTTP服务，添加iptv相关文件服务
- 利用Python脚本，将本地视频生成iptv.m3u列表文件
- 局域网内设备添加订阅，实现资源访问
```

<!--more-->

## 二 利用HFS搭建WindowsHTTP服务，添加iptv相关文件服务

### 2.1 HFS下载地址

```
https://github.com/rejetto/hfs
```

### 2.2 HFS介绍

```
HFS(HTTP File Server)是一款轻量级的、专为Windows系统设计的HTTP文件服务器软件。
它的主要功能是让用户能够通过网络，以 HTTP 协议的方式共享和访问本地文件。
```

### 2.3 HFS使用

| 1-设置端口(生成脚本时使用) | 2-分享文件(iptv.m3u) |
| :------------------------: | :------------------: |
|           ![][2]           |        ![][3]        |


## 三 利用Python脚本，将本地视频生成iptv.m3u列表文件

### 3.1 文件目录结构([]内的是标签)—HFS提供服务

```
E:.
├─[春晚]春晚
├─[电影]电影
├─[过山车]过山车
└─舞蹈
    ├─[广场舞]广场舞
    └─[快手]快手   
```

### 3.2 Python脚本生成iptv列表

![][3]


## 四 局域网内设备添加订阅，实现资源访问

### 4.1 局域网内地址

```
http://192.168.8.6:85/iptv.m3u
```

图示

![][4]

### 4.2 局域网内设备访问(安卓为例)

| 1-添加链接 | 2-显示信息 |
| :--------: | :--------: |
|   ![][5]   |   ![][6]   |

## 五 参考脚本

### 5.1 Python脚本(python-tag-group-generate.py)

```
import os
import urllib.parse
import re

HFS_HOST = "http://192.168.8.112:85"
VIDEO_ROOT = "."  # 当前脚本目录
LOGO_DIR = "logo"
OUTPUT_FILE = "iptv.m3u"

def find_tag_from_path(path, root_path):
    parts = os.path.relpath(path, root_path).split(os.sep)
    for part in reversed(parts):
        match = re.search(r"\[(.*?)\]", part)
        if match:
            return match.group(1)
    return "默认分组"

def generate_m3u():
    lines = ["#EXTM3U\n"]

    for root, dirs, files in os.walk(VIDEO_ROOT):
        for file in sorted(files):
            if file.lower().endswith((".mp4", ".mkv", ".avi", ".mov")):
                rel_path = os.path.relpath(os.path.join(root, file), VIDEO_ROOT).replace("\\", "/")
                video_url = f"{HFS_HOST}/{urllib.parse.quote(rel_path)}"
                name = os.path.splitext(file)[0]

                # 查找标签分组
                group_title = find_tag_from_path(root, VIDEO_ROOT)

                # Logo（可选）
                logo_filename = f"{name}.png"
                logo_path = os.path.join(LOGO_DIR, logo_filename)
                logo_url = f"{HFS_HOST}/logo/{urllib.parse.quote(logo_filename)}" if os.path.exists(logo_path) else ""

                extinf = f'#EXTINF:-1 tvg-name="{name}" group-title="{group_title}"'
                if logo_url:
                    extinf += f' tvg-logo="{logo_url}"'
                extinf += f',{name}'

                lines.append(extinf)
                lines.append(video_url)
                lines.append("")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"✅ IPTV m3u 文件生成完毕：{OUTPUT_FILE}")

if __name__ == "__main__":
    generate_m3u()
```

### 5.2 脚本执行

```
python python-tag-group-generate.py
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-17-win-hfs-port-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-17-win-hfs-disk-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-17-win-list-make-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-17-win-hfs-address-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-17-phone-add-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/iptv-17-phone-list-6.png