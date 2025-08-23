---
title: IPTV之——根据视频生成IPTV脚本(14)
categories:
  - 开发
  - J-NAS
  - 自建服务   
  - IPTV
tags:
  - IPTV
abbrlink: '93644692'
date: 2025-07-25 22:53:18
---
## 一 概述

```
本文介绍根据不同的目录结构生成IPTV列表的执行脚本

1、Videos文件夹下放置视频文件(IPTV默认格式)
2、Videos文件夹下也有文件夹(视频在2级文件夹中)
3、脚本和IPTV目录的文件夹在同一位置(且文件夹里可以遍历)
4、按最后一级的文件夹作为分组
5、按照文件夹标签作为分组
```

<!--more-->

## 二 Videos文件夹下放置视频文件(IPTV默认格式)

### 2.1 默认目录结构

```
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

### 2.2 Python脚本如下

```
import os
import urllib.parse

HFS_HOST = "http://192.168.8.181:85"
VIDEO_DIR = "videos"
LOGO_DIR = "logo"
OUTPUT_FILE = "iptv.m3u"
GROUP_TITLE = "本地视频"

def generate_m3u():
    lines = ["#EXTM3U\n"]
    for file in sorted(os.listdir(VIDEO_DIR)):
        if file.lower().endswith((".mp4", ".mkv", ".avi", ".mov")):
            name = os.path.splitext(file)[0]
            encoded_filename = urllib.parse.quote(file)  # 视频路径
            video_url = f"{HFS_HOST}/{VIDEO_DIR}/{encoded_filename}"

            logo_filename = f"{name}.png"
            logo_path = os.path.join(LOGO_DIR, logo_filename)
            encoded_logo = urllib.parse.quote(logo_filename)
            logo_url = f"{HFS_HOST}/{LOGO_DIR}/{encoded_logo}" if os.path.exists(logo_path) else ""

            extinf = f'#EXTINF:-1 tvg-name="{name}" group-title="{GROUP_TITLE}"'
            if logo_url:
                extinf += f' tvg-logo="{logo_url}"'
            extinf += f',{name}'

            lines.append(extinf)
            lines.append(video_url)
            lines.append("")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"✅ IPTV 播放列表已生成：{OUTPUT_FILE}")

if __name__ == "__main__":
    generate_m3u()
```

## 三 Videos文件夹下也有文件夹(视频在2级文件夹中)

### 3.1 目录结构

```
D:\iptv-project\
│
├── generate_m3u.py
├── videos\
│   ├── dance\
│   │   └── nana.mp4
│   └── mv\
│       └── mv1.mp4
```

### 3.2 Python脚本

```
import os
import urllib.parse

# 配置项
HFS_HOST = "http://192.168.8.181:85"
VIDEO_ROOT = "videos"          # 你的视频根目录
LOGO_DIR = "logo"              # logo 文件夹（可选）
OUTPUT_FILE = "iptv.m3u"       # 输出文件

def generate_m3u():
    lines = ["#EXTM3U\n"]

    for root, dirs, files in os.walk(VIDEO_ROOT):
        rel_dir = os.path.relpath(root, VIDEO_ROOT)
        group = rel_dir if rel_dir != "." else "本地视频"

        for file in sorted(files):
            if file.lower().endswith((".mp4", ".mkv", ".avi", ".mov")):
                name = os.path.splitext(file)[0]

                # 相对路径 + URL 编码
                video_rel_path = os.path.join(rel_dir, file).replace("\\", "/")
                video_url = f"{HFS_HOST}/{VIDEO_ROOT}/{urllib.parse.quote(video_rel_path)}"

                # logo 支持（在 logo/目录中找同名 .png）
                logo_filename = f"{name}.png"
                logo_path = os.path.join(LOGO_DIR, logo_filename)
                logo_url = f'{HFS_HOST}/{LOGO_DIR}/{urllib.parse.quote(logo_filename)}' if os.path.exists(logo_path) else ""

                extinf = f'#EXTINF:-1 tvg-name="{name}" group-title="{group}"'
                if logo_url:
                    extinf += f' tvg-logo="{logo_url}"'
                extinf += f',{name}'

                lines.append(extinf)
                lines.append(video_url)
                lines.append("")  # 空行

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"✅ IPTV 播放列表已生成：{OUTPUT_FILE}")

if __name__ == "__main__":
    generate_m3u()
```

## 四 脚本和IPTV目录的文件夹在同一位置(且文件夹里可以遍历)

### 4.1 目录结构

```
第一级目录/
└── 第二级目录/
    └── 第三级目录/
    	...
        └── 视频1.mp4
```

### 4.2 Python脚本(此时遍历后的视频放在第一级目录下)

```
import os
import urllib.parse

HFS_HOST = "http://192.168.8.181:85"
VIDEO_ROOT = "."  # 当前目录
LOGO_DIR = "logo"  # logo 目录，跟脚本同级
OUTPUT_FILE = "iptv.m3u"

def get_top_level_folder(rel_path):
    parts = rel_path.split(os.sep)
    # 如果直接在当前目录下，分组用“默认分组”
    return parts[0] if len(parts) > 0 and parts[0] != '.' else "默认分组"

def generate_m3u():
    lines = ["#EXTM3U\n"]

    for root, dirs, files in os.walk(VIDEO_ROOT):
        rel_dir = os.path.relpath(root, VIDEO_ROOT)
        for file in sorted(files):
            if file.lower().endswith((".mp4", ".mkv", ".avi", ".mov")):
                name = os.path.splitext(file)[0]

                # 组装相对路径，替换反斜杠，URL编码
                video_rel_path = os.path.join(rel_dir, file).replace("\\", "/")
                video_url = f"{HFS_HOST}/{urllib.parse.quote(video_rel_path)}"

                # 组名：顶层目录或默认分组
                group_title = get_top_level_folder(rel_dir)

                # logo 同名png，放logo目录
                logo_filename = f"{name}.png"
                logo_path = os.path.join(LOGO_DIR, logo_filename)
                logo_url = ""
                if os.path.exists(logo_path):
                    logo_url = f"{HFS_HOST}/logo/{urllib.parse.quote(logo_filename)}"

                extinf = f'#EXTINF:-1 tvg-name="{name}" group-title="{group_title}"'
                if logo_url:
                    extinf += f' tvg-logo="{logo_url}"'
                extinf += f',{name}'

                lines.append(extinf)
                lines.append(video_url)
                lines.append("")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"✅ IPTV 播放列表生成完成：{OUTPUT_FILE}")

if __name__ == "__main__":
    generate_m3u()
```

## 五 按最后一级的文件夹作为分组

### 5.1 说明

```
1、遍历当前目录及子目录所有视频文件
2、分组（group-title）只按视频文件所在的“最直接上级文件夹名”来分类
3、比如路径 第1级文件夹/第2级文件夹/第3级文件夹/视频1.mp4，分组名是 第3级文件夹
4、视频播放链接保持完整路径（URL 编码）
```

### 5.2 Python脚本

```
import os
import urllib.parse

HFS_HOST = "http://192.168.8.181:85"
VIDEO_ROOT = "."      # 当前目录
LOGO_DIR = "logo"     # logo目录
OUTPUT_FILE = "iptv.m3u"

def generate_m3u():
    lines = ["#EXTM3U\n"]

    for root, dirs, files in os.walk(VIDEO_ROOT):
        rel_dir = os.path.relpath(root, VIDEO_ROOT).replace("\\", "/")

        # 分组名为当前目录名（最后一级文件夹名）
        group_title = os.path.basename(root)
        if group_title == "." or group_title == "":
            group_title = "默认分组"

        for file in sorted(files):
            if file.lower().endswith((".mp4", ".mkv", ".avi", ".mov")):
                name = os.path.splitext(file)[0]

                video_rel_path = os.path.join(rel_dir, file).replace("\\", "/")
                video_url = f"{HFS_HOST}/{urllib.parse.quote(video_rel_path)}"

                # logo
                logo_filename = f"{name}.png"
                logo_path = os.path.join(LOGO_DIR, logo_filename)
                logo_url = ""
                if os.path.exists(logo_path):
                    logo_url = f"{HFS_HOST}/logo/{urllib.parse.quote(logo_filename)}"

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

## 六 按照文件夹标签作为分组

### 6.1 示例结构(标签[内容])

```
iptv-root/
├── [舞蹈] 快手/
│   ├── 西瑶/
│   │   └── xiyao01.mp4
│   └── 小雅/
│       └── xiaoya01.mp4
├── [游戏] 抖音/
│   └── 超哥/
│       └── chao01.mp4
```

### 6.2 Python脚本(支持多层嵌套、标签文件夹)

```
import os
import urllib.parse
import re

HFS_HOST = "http://192.168.8.181:85"
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

