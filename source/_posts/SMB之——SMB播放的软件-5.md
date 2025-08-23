---
title: SMB之——SMB播放的软件-5
categories:
  - 开发
  - J-NAS
  - 自建服务
  - SMB
tags:
  - SMB
abbrlink: 76704d7b
date: 2025-08-24 07:43:15
---
## 一 概述

```
本文介绍：
 -SMB（Samba/CIFS）共享可以跨平台访问，
 -不同设备上都有支持 SMB 协议的播放器或文件管理器
```

<!--more-->

## 二 各平台支持SMB播放器

### 2.1 安卓(Android)

```
VLC for Android（免费，开源，支持 SMB/UPnP/DLNA/NFS 等协议）
MX Player Pro（付费，支持 SMB 网络播放）
Kodi（免费，开源，支持 SMB、NFS、UPnP、DLNA）
Plex App（配合 Plex Server，支持 SMB 挂载）
Infuse for Android（第三方，影视整理好看，但付费订阅
```

### 2.2 iOS(iPhone/iPad)

```
VLC for iOS（免费，开源，支持 SMB、WebDAV、FTP 等）
Infuse Pro（UI 漂亮，支持 SMB、DLNA，支持字幕，付费订阅）
nPlayer（支持 SMB、FTP、WebDAV、UPnP，付费一次性）
PlayerXtreme Media Player（支持 SMB/FTP/UPnP，免费基础版
```

### 2.3 Windows

```
VLC Media Player（免费，支持直接添加 SMB 路径，如 smb://192.168.1.100/video）
Kodi（媒体中心，支持 SMB）
PotPlayer（强大播放器，支持 SMB 网络流）
MPC-HC / MPC-BE（配合 SMB 网络路径可播放）
Plex for Windows（配合 Plex Server，支持 SMB 挂载）
```

### 2.4 macOS

```
VLC for Mac（免费，开源，支持 SMB/NFS/WebDAV/FTP）
IINA（开源播放器，基于 mpv，支持 SMB 网络路径）
Kodi（跨平台，支持 SMB）
Infuse for macOS（付费订阅，体验好，支持 SMB）
Plex Media Player for Mac（配合 Plex Server）
```

## 三  推荐组合(简单好用)

```
1、内网 SMB 共享服务器：由 NAS / Windows / macOS 提供

2、播放软件：
 iOS：Infuse
 Android：VLC / Kodi
 Windows：PotPlayer / VLC
 macOS：IINA / VLC
```

