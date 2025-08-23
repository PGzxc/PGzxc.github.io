---
title: HTTP服务之——常见HTTP软件(1)
categories:
  - 开发
  - J-NAS
  - 自建服务
  - HTTP
tags:
  - HTTP
abbrlink: 69b4fc70
date: 2025-08-06 05:51:33
---
## 一 概述

```
HFS(HTTP File Server)是一个轻量的 HTTP 文件分享服务器，
适合快速在本地或内网通过浏览器分享文件。
它的主要特性是：
-零配置、即开即用
-提供 Web 界面浏览文件
-支持上传、账户、虚拟文件系统等
```

<!--more-->

## 二 常用HTTP软件

### 2.1 File Browser

```
1、项目地址: https://github.com/filebrowser/filebrowser

2、特点：
-现代化 Web UI
-支持身份验证、文件上传/下载、目录浏览
-可运行在 Windows/Linux/macOS
-支持 Docker 部署
```

### 2.2 python -m http.server

```
1、特点：
-Python 内置（Python 3 自带）
-无需安装其他依赖

2、一条命令即可在任意目录开启 HTTP 共享：
python -m http.server 8080
```

### 2.3 Caddy File Server

```
1、项目地址: https://caddyserver.com/docs/file-server

2、特点：
-内置 HTTPS（自动配置 Let's Encrypt）
-高性能 Golang 实现
-文件服务仅需几行配置

3、示例：
caddy file-server --root /path/to/share --browse
```

### 2.4 GoHTTPServer

```
1、项目地址: https://github.com/codeskyblue/gohttpserver

2、特点：
-Golang 编写，单个可执行文件
-支持密码保护、下载统计、上传等功能
-易于部署在各种系统中
```

### 2.5 Droppy

```
1、项目地址: https://github.com/silverwind/droppy

2、特点：
-基于 Node.js
-UI 现代，支持多用户、在线播放媒体
-支持上传、拖放、移动、文件编辑
```

### 2.6 SimpleHTTPServerWithUpload

```
1、项目地址: https://github.com/suyashkumar/simple-http-file-server

2、特点：
-基于 Python 改良版 HTTP server，支持上传
-超轻量、无需数据库或外部依赖
```

### 2.7 Lighttpd / Nginx + autoindex

```
1、特点：
-非专为文件分享设计，但配置 autoindex 后可浏览目录
-适合长期服务部署

2、比如 Lighttpd：
dir-listing.activate = "enable"
```

## 三 补充功能需求可考虑

```
-多用户/权限：FileBrowser、Droppy
-HTTPS：Caddy、Nginx
-离线运行：HFS、GoHTTPServer、Python 简易服务器
-Docker 部署：FileBrowser、Droppy 等均支持
```

