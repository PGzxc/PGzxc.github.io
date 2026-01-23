---
title: IPTV之——生成音视频带标签分组的脚本(20)
categories:
  - 开发
  - J-NAS
  - 自建服务   
  - IPTV
tags:
  - IPTV
abbrlink: e0c0014c
date: 2025-08-09 09:07:42
---
## 一 概述

```
这是一个Python 脚本示例
- 生成IPTV音视频播放列表(M3U格式)
- 带标签分组
```

<!--more-->

## 二 使用说明

### 2.1 准备环境

* 确保安装 Python 3.7+(用于执行Python脚本)
* 系统：Win(其他也可)
* 音视频资源(通过[]添加标签)
* HFS提供HTTP服务(用于访问音视频资源)

### 2.2 分类依据

```
1、处理视频文件格式：.mp4, .mkv, .avi, .mov
2、处理音频文件格式：.mp3, .aac, .flac, .wav,.m4a
3、分组标签为[]
4、执行Python脚本，生成iptv.m3u文件
```

## 三 Python脚本

### 3.1 脚本文件名

```
generate_iptv_with_audio_video.py
```

### 3.2 参考代码

```
import os
import urllib.parse
import re

HFS_HOST = "http://192.168.8.191:85"
MEDIA_ROOT = "."  # 当前脚本目录
LOGO_DIR = "logo"
OUTPUT_FILE = "iptv.m3u"

def find_tag_from_path(path, root_path):
    """从路径中提取分组标签"""
    parts = os.path.relpath(path, root_path).split(os.sep)
    for part in reversed(parts):
        match = re.search(r"\[(.*?)\]", part)
        if match:
            return match.group(1)
    return "默认分组"

def generate_m3u():
    """生成 IPTV M3U 播放列表文件"""
    lines = ["#EXTM3U\n"]

    # 处理视频文件
    for root, dirs, files in os.walk(MEDIA_ROOT):
        for file in sorted(files):
            if file.lower().endswith((".mp4", ".mkv", ".avi", ".mov")):
                rel_path = os.path.relpath(os.path.join(root, file), MEDIA_ROOT).replace("\\", "/")
                video_url = f"{HFS_HOST}/{urllib.parse.quote(rel_path)}"
                name = os.path.splitext(file)[0]

                # 查找视频分组标签
                group_title = f"视频 - {find_tag_from_path(root, MEDIA_ROOT)}"

                # Logo（仅视频）
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

    # 处理音频文件
    for root, dirs, files in os.walk(MEDIA_ROOT):
        for file in sorted(files):
            if file.lower().endswith((".mp3", ".aac", ".flac", ".wav",".m4a")):
                rel_path = os.path.relpath(os.path.join(root, file), MEDIA_ROOT).replace("\\", "/")
                audio_url = f"{HFS_HOST}/{urllib.parse.quote(rel_path)}"
                name = os.path.splitext(file)[0]

                # 查找音频分组标签
                group_title = f"音频 - {find_tag_from_path(root, MEDIA_ROOT)}"

                # 音频不需要 logo
                extinf = f'#EXTINF:-1 tvg-name="{name}" group-title="{group_title}",{name}'

                lines.append(extinf)
                lines.append(audio_url)
                lines.append("")

    # 保存 M3U 文件，确保使用 UTF-8 编码
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"✅ IPTV M3U 文件生成完成：{OUTPUT_FILE}")

if __name__ == "__main__":
    generate_m3u()
```

