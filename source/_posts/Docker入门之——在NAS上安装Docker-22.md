---
title: Docker入门之——在NAS上安装Docker(22)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: 7a7170d5
date: 2025-07-27 07:49:32
---
## 一 概述

```
在NAS上安装Docker，取决于你的NAS品牌和型号（如群晖Synology、威联通QNAP、WDMyCloud、群晖黑群等），
以下是主流方案
```

<!--more-->

## 二 主流方案

### 2.1 群晖NAS(Synology)安装 Docker

```
1、说明：
-仅支持 支持 x86 CPU 且 DSM 6.2+ 的型号
-ARM CPU 的群晖（如 DS220j）无法通过套件中心安装 Docker，需要通过 Entware + 自行交叉编译。

2、步骤：
-打开 DSM（群晖后台）> 套件中心。
-搜索并安装 Docker 套件。
-安装后打开 Docker，使用图形界面管理镜像、容器、卷等。
-可通过“注册表”直接搜索如 nginx、jellyfin 等镜像。
```

### 2.2 威联通QNAP安装Docker

```
方法：使用 Container Station
-打开 QTS > App Center。
-安装 Container Station（QNAP 的 Docker 管理界面）。
-安装完成后，可以通过 UI 拉取镜像、运行容器等
```

### 2.3  My Cloud EX2 Ultra 安装 Docker

```
这个机型官方 不支持 Docker 套件，可选两种方式

1、方法一：Entware + 交叉编译安装 Docker（推荐）
1-1 启用 SSH 登录 NAS。
1-2 安装 Entware：下载并运行安装脚本（视设备架构而定）。
1-3 通过 Entware 安装 Docker 依赖：
opkg update
opkg install docker dockerd containerd

1-4 启动 Docker 服务：
dockerd &

若遇到 libstdc++.so.6 缺失问题，请安装：
opkg install libstdc++

2、方法二：OpenWRT 固件 + 自行构建（进阶）
替换系统为 OpenWRT 后安装 Docker，需完全开放 root 权限，风险较高。
```

### 2.4 Unraid / OpenMediaVault 等系统

```
这些 NAS 系统默认支持 Docker，可以直接通过 WebUI 安装并使用 Docker Compose。
```

### 2.5 不支持 Docker 的设备怎么办？

```
可以：
-换成支持 Docker 的自建服务器或 x86 迷你主机
-或使用轻量级 Docker 替代方案（如 Podman）
-或使用交叉编译将你需要的服务构建为静态二进制部署
```

