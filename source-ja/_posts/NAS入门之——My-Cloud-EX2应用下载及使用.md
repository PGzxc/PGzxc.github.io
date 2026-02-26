---
title: NAS入门之——My Cloud EX2应用下载及使用
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - NAS
  - My Cloud EX2
abbrlink: 10b96a44
date: 2026-02-26 08:10:55
---
## 一 概述

```
本文介绍：
1.My Cloud EX2 .bin文件下载
2.常见.bin文件应用功能介绍
```

<!--more-->

## 二 .bin文件下载

### 2.1 WD支持三方应用下载

```
https://support-en.wd.com/app/answers/detailweb/a_id/29960
```

### 2.2 如何操作

```
链接点进去 → 选 My Cloud EX2 Ultra → 下面列出支持的第三方 App .bin 下载链接
```

### 2.3 目前支持三方应用

```
Transmission
GoodSync
USB Backups
Internal Backups
Dropbox、FTP Downloads 等
```

## 三 常见三方应用介绍

### 3.1 GoodSync(很多人用这个做自动备份)

```
1.可以从 https://www.goodsync.com/for-wd-users 或 GoodSync 官网下载专为 WD 的 .bin 版
2.或者 WD 页面直接有 GoodSync for WD 的链接
3.装好后在 NAS 上配置同步任务，日常用电脑 → NAS、NAS → 外接硬盘、NAS → 云盘都很方便
4.GoodSync for WD Premium 收费
```

### 3.2 Transmission(BT 下载)

```
官方列表里有 .bin，直接下。

装好后进 Transmission Web UI（通常 NAS_IP:9091）
设置下载目录、速度限制等，日常下东西超稳。
```

### 3.3 USB Backups(超级实用，免费)

```
1.说明：WD 官方第三方 App，完全免费，无任何收费。
2.功能：把外接 USB 硬盘/U盘插NAS的USB口，就能自动备份 NAS 里的共享文件夹到 USB（或反向从 USB 拷到 NAS）。
3.支持定时（每天/每周）、单向备份或双向同步、增量拷贝（只拷新改的文件）。
4.日常场景：回家插个硬盘，按一下或自动跑，备份照片/视频到外接盘防 NAS 坏盘。超稳，很多人就靠这个做离线备份。
5.下载：
 -WD 支持页 https://support-en.wd.com/app/answers/detailweb/a_id/29960
 -选 EX2 Ultra → 找 USB Backups 的 .bin 链接，直接手动装。

6.装好后在 Apps 里启用，创建 job 选源文件夹和 USB 目标，设置计划就行。
```

