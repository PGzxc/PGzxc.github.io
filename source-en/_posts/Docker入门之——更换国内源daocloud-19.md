---
title: Docker入门之——更换国内源daocloud(19)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: f707bdf2
date: 2025-07-23 09:14:42
---
## 一 概述

* 直接使用docker拉取现象(错误)
* daocloud/public-image-mirror介绍
* 使用 DaoCloud 镜像拉取指定版本

<!--more-->

## 二 当前环境

* 系统：Win11专业版 24H2
* WSL 版本: 2.5.9.0
* Docker.desktop版本：4.43.1(198352)

## 三 直接使用docker拉取现象(错误)

### 3.1 Docker拉取镜像

```
docker pull linuxserver/jellyfin:arm32v7-10.8.10-1-ls209
```

### 3.2 错误现象

```
打开终端，执行如下指令，拉取Image镜像时出错误
```

图示
![][1]

## 四 daocloud/public-image-mirror介绍

### 4.1 介绍

```
daocloud/public-image-mirror 是 DaoCloud 提供的公共镜像加速服务，
它能帮助国内用户更快速地拉取 Docker 镜像
```

### 4.2 配置 DaoCloud 镜像加速

```
1、打开 Docker Desktop，点击任务栏中的 Docker 图标，选择 “Settings”（设置）

2、进入 “Docker Engine” 选项。

3、在 JSON 配置中添加或修改 registry-mirrors 字段，内容如下
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
    "https://docker.m.daocloud.io",
    "https://mirror.sjtu.edu.cn",
    "https://mirror.iscas.ac.cn",
    "https://hub.atomgit.com"
  ]
}

4、点击 “Apply & Restart”（应用并重启），使设置生效。
```

### 4.3 验证配置是否成功

```
1、配置完成后，你可以通过以下命令查看 Docker 的配置信息
docker info

2、如果在输出中看到类似下面的内容，就说明配置成功了
Registry Mirrors:
  https://registry.daocloud.io/
```

## 五 使用 DaoCloud 镜像拉取指定版本

### 5.1 拉取镜像指令

```
docker pull m.daocloud.io/docker.io/linuxserver/jellyfin:arm32v7-10.8.10-1-ls209

说明：
1、添加了m.daocloud.io/docker.io/
```

### 5.2 效果图

![][2]

## 六 参考

* [DaoCloud/public-image-mirror](https://github.com/DaoCloud/public-image-mirror)

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-19-daocloud-pull-err-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-19-daocloud-pull-success-2.png