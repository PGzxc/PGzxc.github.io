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
```

## 四 镜像配置

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

