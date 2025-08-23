---
title: IPTV之——本地HTTP服务(15)
categories:
  - 开发
  - J-NAS
  - 自建服务
  - IPTV
tags:
  - IPTV
abbrlink: 56ca8cf6
date: 2025-07-26 08:12:02
---
## 一 概述

|           方式           |       系统兼容性        | 是否带界面 |             说明             |
| :----------------------: | :---------------------: | :--------: | :--------------------------: |
| Python http.server | 跨平台(Win/Linux/macOS) |   无界面   |  简单轻便，内建于 Python 中  |
|  HFS(HTTP File Server)   |         Windows         |   有界面   | 非常适合局域网共享，点击即用 |
|          Nginx           |         跨平台          |   无界面   |    更专业、稳定，但需配置    |
|   Node.js http-server    |         跨平台          |   无界面   |   适合前端开发者，简单启动   |
|    文件共享(SMB/NAS)     |   Windows/macOS/Linux   |  系统自带  |     适用于 NAS 映射盘等      |

<!--more-->

## 二 方式 1：Python 自带 HTTP 服务（推荐轻量级）

```
1、启动命令
python -m http.server 8080

2、会启动一个 HTTP 服务，默认目录为当前目录
通过浏览器访问：
http://127.0.0.1:8080/

3、若想绑定到所有局域网访问地址
python -m http.server 8080 --bind 0.0.0.0

4、然后你的局域网其他设备可访问
http://192.168.x.x:8080/
```

## 三 方式 2：HFS（HTTP File Server）[Windows 专用]

```
1、下载地址
https://www.rejetto.com/hfs/

2、步骤
-下载后是一个 .exe 文件，无需安装，点击即用
-拖拽文件夹进去
-设置端口（如 85）
-浏览器访问：http://192.168.x.x:85/
```

## 四 方式 3：Nginx 本地服务（进阶）

```
1、适合需要：
-处理大量视频
-控制缓存/编码
-访问控制、目录列表等

2、启动方式（以 Windows 为例）：
2-1、下载 Nginx for Windows：
https://nginx.org/en/download.html

2-2、解压后修改 conf/nginx.conf：
server {
    listen       8080;
    server_name  localhost;

    location / {
        root   E:/iptv-root;
        autoindex on;
    }
}

2-3、启动 Nginx：
start nginx
```

## 五 方式 4：Node.js `http-server`

```
npm install -g http-server
cd E:/iptv-root
http-server -p 8080
```

## 六 方式 5：文件共享 / 映射（SMB/NAS）

```
将 \\192.168.8.181\Public 映射为 Z:\
播放地址使用文件共享路径（部分播放器支持）
但 IPTV 一般 不支持 SMB/本地盘地址，所以推荐配合 HTTP 服务
```

