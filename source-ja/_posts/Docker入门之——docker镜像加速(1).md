---
title: Docker入门之——docker镜像加速(1)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: 9971d4c
date: 2024-07-27 08:08:10
---
## 一 概述

* 开源镜象
* 加速镜像
* 镜像配置

<!--more-->

## 二 开源镜象

1- SJTU软件源镜像服务

```
https://mirrors.sjtug.sjtu.edu.cn/
```

2-ISCAS 开源镜像站

```
https://mirror.iscas.ac.cn/
```

## 三 加速镜像

```
https://mirror.sjtu.edu.cn
https://mirror.iscas.ac.cn
https://hub.atomgit.com
https://docker.m.daocloud.io
https://docker.rainbond.cc
最推荐官方仓库，使用代理魔法通道加速下载
https://hub.docker.com
//加速镜像2
"https://dockerhub.icu",
"https://docker.ckyl.me",
"https://docker.awsl9527.cn",
“https://hub.uuuadc.top",
“https://docker.anyhub.us.kg",
"https://dockerhub.jobcher.com"
//nas加速
https://docker.m.daocloud.io
https://ghcr.io
https://dockerhub.timeweb.cloud
https://docker.agsv.top
https://docker.agsvpt.work
https://dockerhub.icu
https://docker.ckyl.me
```

## 四 镜像配置

### 4.1 Docker desktop

以 Docker desktop为例，Settings—>Docker Engine

```
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "features": {
    "buildkit": true
  },
  "registry-mirrors": [
    "https://mirror.sjtu.edu.cn",
    "https://mirror.iscas.ac.cn",
    "https://hub.atomgit.com"
  ]
}
```

### 4.2 群晖配置

![][1]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-syn-mirror-config.png