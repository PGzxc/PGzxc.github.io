---
title: SMB之——支持SMB的NAS和媒体库-4
categories:
  - 开发
  - J-NAS
  - 自建服务
  - SMB
tags:
  - SMB
abbrlink: 26f9636d
date: 2025-08-24 07:42:41
---
## 一 概述

```
本文介绍：
 支持 SMB 协议的 NAS 设备，
 同时还能配合 媒体库管理软件(自动刮削封面、剧情简介、字幕、分类等)，让内网音视频播放体验更好
```

<!--more-->

## 二 支持 SMB 的常见 NAS

### 2.1 群晖 Synology

```
自带 SMB 共享服务（可在“控制面板 → 文件服务 → SMB”中开启）。
优点：DSM 系统易用，套件生态丰富。
常见型号：DS220+、DS920+ 等。
```

### 2.2 威联通 QNAP

```
自带 SMB、AFP、NFS 等多协议共享。
优点：硬件性能普遍强，虚拟化支持好。
```

### 2.3 华芸 Asustor

```
内置 SMB/NFS/AFP，适合家用和轻量用户。
```

### 2.4 WD My Cloud 系列

```
支持 SMB，但扩展性和套件生态较弱。
```

### 2.5 铁威马 TerraMaster

```
支持 SMB/NFS，适合性价比选择。
```

## 三 媒体库管理方案(搭配 SMB 使用)

NAS 只是存储 + 提供 SMB 服务，要想有 Netflix 一样的观影体验，需要 **媒体库管理软件** 来组织影片。

### 3.1 Emby

```
部署：NAS 上可安装 Emby Server，或在 Docker 部署。
功能：刮削封面、剧情、演员，支持 SMB 路径挂载。
客户端：安卓、iOS、Windows、macOS、Web 全覆盖
```

### 3.2  Jellyfin(开源免费版 Emby)

```
开源免费，功能类似 Emby。
优点：完全开源，无需付费。
缺点：UI 稍逊，但社区插件丰富。
```

### 3.3 Plex

```
部署：NAS/Docker。
功能：全球知名媒体库，自动刮削、支持远程访问。
特点：远程播放和跨平台客户端体验最好，但部分功能需要 Plex Pass。
```

### 3.4 Kodi

```
部署：客户端软件，直接连接 SMB 共享目录。
特点：无需服务端，客户端自带刮削，支持 Android TV、Windows、macOS、树莓派等。
缺点：每个客户端都要自己刮削和配置，不是集中式。
```

## 四 推荐组合

```
如果主要是内网播放 + SMB：
 NAS (Synology/QNAP/WD) 开 SMB →
 Jellyfin/Emby/Plex（NAS 或 Docker 部署） 做媒体库管理 →
 客户端（手机/电视/电脑） 用 Emby/Jellyfin/Plex App 播放。
```

