---
title: Docker入门之——导出镜像为tar并在另一台设备上使用(24)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: ba218384
date: 2025-07-30 08:51:29
---
## 一 概述

```
在 Docker 中，你可以将镜像导出为 tar 文件，然后在另一台设备上导入使用。
这在离线环境或需要迁移镜像时非常有用
```

<!--more-->

## 二 导出镜像为 tar 文件

### 2.1 查看本地镜像列表

```
docker images
```

### 2.2 导出指定镜像

```
docker save -o 导出文件名.tar 镜像名:标签
# 示例：导出 nginx:latest 镜像
docker save -o nginx-image.tar nginx:latest

# 或者使用 > 重定向
docker save 镜像名:标签 > 导出文件名.tar
```

### 2.3 导出多个镜像到一个 tar 文件

```
docker save -o 多个镜像.tar 镜像1:标签1 镜像2:标签2
# 示例：导出 nginx 和 mysql 镜像
docker save -o web-stack.tar nginx:latest mysql:8.0
```

## 三 传输 tar 文件到目标设备

```
将生成的 tar 文件（如 nginx-image.tar）通过以下方式传输到另一台设备

1、USB 存储：复制到 U 盘后手动传输。
2、网络传输：使用 scp、rsync 或云存储服务
# scp 示例（从本地复制到远程服务器）
scp nginx-image.tar user@远程服务器IP:/目标路径/
```

## 四 在目标设备上导入镜像

### 4.1 导入 tar 文件为镜像

```
docker load -i 导入文件名.tar
# 示例：导入 nginx-image.tar
docker load -i nginx-image.tar
```

### 4.2 验证导入结果

```
docker images
```

### 4.3 运行导入的镜像

```
docker run -d -p 80:80 nginx:latest
```

## 五 替代方案：使用 Docker Hub 或私有仓库

如果设备可以访问网络，推荐使用 Docker Hub 或私有镜像仓库：

### 5.1 登录 Docker Hub

```
docker login
```

### 5.2 标记本地镜像

```
docker tag 本地镜像名:标签 你的DockerHub用户名/仓库名:标签
```

### 5.3 推送镜像

```
docker push 你的DockerHub用户名/仓库名:标签
```

### 5.4 在目标设备上拉取

```
docker pull 你的DockerHub用户名/仓库名:标签
```

