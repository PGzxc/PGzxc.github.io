---
title: NAS入门之——MyCloudEx2安装filebrowser(19)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2
abbrlink: e122092e
date: 2025-08-06 06:02:43
---
## 一 概述

```
本文介绍在西部数据NAS MyCloudEx2上安装filebrowser
```

<!--more-->

## 二 准备阶段

* 设备：NAS MyCloudEx2
* SSH软件：MobaXterm
* 登录账号：用户名sshd，密码：xxx(西部数据登录密码)
* 查看NAS架构：armv7版本

## 三 安装步骤

### 3.1 拉取镜像

```
docker pull m.daocloud.io/docker.io/filebrowser/filebrowser:v2.30.0-armv7
```

### 3.2 运行容器

```
docker run -d \
  -v /mnt/HD/HD_a2/myshare:/srv \
  -v /mnt/HD/HD_a2/docker/filebrowser.db:/database/filebrowser.db \
  -v /mnt/HD/HD_a2/docker/config:/config \
  -p 8080:80 \
  --name filebrowser \
  m.daocloud.io/docker.io/filebrowser/filebrowser:v2.30.0-armv7
```

### 3.3 查看容器运行状态

```
docker ps -a
```

说明：确保容器正常 `Up`，没有崩溃

## 四 访问

### 4.1 访问地址

```
http://<你的NAS_IP>:8080
```

### 4.2 登录账号和密码(默认)

```
用户名：admin
密码：admin
```

### 4.3 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-19-filebrowser-1.png