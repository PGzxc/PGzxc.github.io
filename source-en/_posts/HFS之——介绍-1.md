---
title: HFS之——介绍(1)
categories:
  - 开发
  - J-NAS
  - 自建服务
  - HFS
tags:
  - HFS
abbrlink: '3522e422'
date: 2025-08-23 09:56:00
---
## 一 概述

```
HFS (HTTP File Server)，是 Windows 下非常经典的轻量级文件分享工具
```

<!--more-->

## 二 HFS 简介

```
全称 HTTP File Server
免费、小巧（只有一个 .exe 可执行文件）
运行后即开启 HTTP 文件共享服务
默认只支持 浏览器访问文件/下载，但可以通过插件/扩展支持 WebDAV（上传、挂载网络驱动器）
```

## 三 HFS 下载

```
1、下载地址
官网：http://www.rejetto.com/hfs/
新版 HFS 3（正在开发，基于 Node.js）：https://github.com/rejetto/hfs

2、说明
建议初学用 HFS 2.3，最稳定，也有 WebDAV 脚本支持。
```

## 四 基本使用

```
1、下载 hfs.exe 并运行（无需安装）。
2、右键 → Add files / Add folder → 选择你要共享的文件或文件夹。
3、软件会生成一个共享 URL，例如：
  http://192.168.1.100:8080/
 （默认端口 80，可以改成 8080 等）

4、内网电脑 / 手机用浏览器访问即可下载文件
```

## 五 图示

| 1-双击启动 | 2-主页面 | 3-服务页面 |
| :--------: | :------: | :--------: |
|   ![][1]   |  ![][2]  |   ![][3]   |



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/hfs-1-start-cmd-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/hfs-1-open-home-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/hfs-1-server-page-3.png