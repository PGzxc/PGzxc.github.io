---
title: IPTV之——IPTV列表公网访问(16)
categories:
  - 开发
  - J-NAS
  - 自建服务   
  - IPTV
tags:
  - IPTV
abbrlink: 6e1e533e
date: 2025-07-26 09:52:42
---
## 一 概述

|                      方法                      |      原理       |  是否免费   | 技术难度 | 推荐程度 |
| :--------------------------------------------: | :-------------: | :---------: | :------: | :------: |
|            使用 Ngrok 暴露本地端口             |    内网穿透     | 有免费额度  |    低    |   ⭐⭐⭐⭐   |
|    将 `.m3u` 和视频部署到公网服务器（VPS）     |    静态托管     |   有成本    |    中    |  ⭐⭐⭐⭐⭐   |
|        通过自家公网 IP + 路由器端口映射        | 本地服务 → 外网 |    免费     |   中高   |   ⭐⭐⭐    |
| 上传 `.m3u` 文件到 GitHub Pages 或 Gitee Pages |    静态列表     |    免费     |    中    |   ⭐⭐⭐    |
|    使用第三方 IPTV 托管平台（如 IPTV-org）     |    内容分享     | 免费/需申请 |  受限多  |    ⭐⭐    |

<!--more-->

## 二 方式1：使用 **Ngrok**（最简单、适合临时分享）

### 2.1 实现说明

```
1、说明
Ngrok 可以将你本地的 HTTP 服务映射到公网地址，任何人都能访问

2、步骤
2-1 注册 Ngrok：https://ngrok.com
2-2 安装 Ngrok：Windows/macOS/Linux 均支持
2-3 启动命令（假设你用的是 HFS 或 python -m http.server 8080）
ngrok http 8080
2-4 控制台会显示一个公网地址
Forwarding http://abc123.ngrok.io → http://localhost:8080
2-5 .m3u 里的地址替换成
http://abc123.ngrok.io/videos/xxx.mp4

3、优点
 -快速、简单、无需公网 IP
 -免费额度够用
 - 免费版 URL 每次变（可用脚本生成）
```

### 2.2 替换公网地址脚本(generate_m3u_public.py)

```
import os
import urllib.parse
import re

# 配置区
LOCAL_HOST = "http://192.168.8.181:85"             # 局域网地址（原始）
PUBLIC_HOST = "https://abc123.ngrok.io"            # 替换为公网地址（Ngrok、VPS 或域名）
VIDEO_ROOT = "."                                   # 当前目录
LOGO_DIR = "logo"                                  # logo目录
OUTPUT_FILE = "iptv_public.m3u"                    # 输出文件

# 提取分组标签，例如文件夹名为：[舞蹈] 快手
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
                video_url = f"{PUBLIC_HOST}/{urllib.parse.quote(rel_path)}"
                name = os.path.splitext(file)[0]

                # 提取 IPTV 分组名
                group_title = find_tag_from_path(root, VIDEO_ROOT)

                # logo 路径
                logo_filename = f"{name}.png"
                logo_path = os.path.join(LOGO_DIR, logo_filename)
                logo_url = f"{PUBLIC_HOST}/logo/{urllib.parse.quote(logo_filename)}" if os.path.exists(logo_path) else ""

                # EXTINF 行构建
                extinf = f'#EXTINF:-1 tvg-name="{name}" group-title="{group_title}"'
                if logo_url:
                    extinf += f' tvg-logo="{logo_url}"'
                extinf += f',{name}'

                lines.append(extinf)
                lines.append(video_url)
                lines.append("")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"✅ 已生成 IPTV 公网列表：{OUTPUT_FILE}")

if __name__ == "__main__":
    generate_m3u()

```

## 三 方式2：上传到公网服务器（推荐长期分享）

```
1、条件：
如果你有 VPS 或 Web 空间：

2、步骤
-把视频、logo 和 .m3u 文件一起上传至服务器 /www/ip-tv/
-Nginx/Apache 启动 Web 服务
-直接分享 URL：

http://your-domain.com/iptv.m3u

3、优点：
-稳定、长久、可加 CDN
-最接近专业 IPTV 平台
-有一定维护成本(x)
```

## 四  方式3：通过公网 IP + 路由器端口映射(有风险)

```
1、步骤：
-在你的路由器上设置 端口转发，将 8080 映射到你 PC 的 HTTP 服务
-你的公网地址为：http://[你的公网IP]:8080/
-.m3u 文件中写绝对路径地址即可

2、注意事项：
-有些宽带是 NAT（非公网 IP），不支持
-有暴露风险，需开启防火墙、安全认证
```

## 五 方式4：托管 `.m3u` 到 GitHub Pages(只分享列表)

```
1、说明
-此方法只分享 IPTV 列表本身，不分享视频：
-视频资源仍需你在 HFS/服务器/云盘上托管

2、步骤
-在 GitHub 上新建仓库：myiptvlist
-上传 iptv.m3u
-启用 GitHub Pages
-访问地址：https://yourname.github.io/myiptvlist/iptv.m3u
```

## 六 方式5：通过 IPTV 开源项目上传(需规范)

```
如 IPTV-org(https://github.com/iptv-org/iptv) 开源项目支持贡献：
-节目源需稳定
-URL 可公网访问
-不支持私有/局域网源(❌ )
```

