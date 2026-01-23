---
title: Docker入门之——卸载Docker(25)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: 4146e75b
date: 2025-08-03 08:10:06
---
## 一 概述

* 删除容器
* 删除镜像
* 卸载Docker

<!--more-->

## 二 删除容器

### 2.1 停止所有正在运行的容器

```
1、停止指令
docker stop $(docker ps -aq)

2、说明
docker ps -a会列出所有容器的 ID，
docker stop则会停止这些容器。
```

### 2.2 删除所有容器

```
1、删除所有容器指令
docker rm $(docker ps -aq)

2、说明
docker ps -a -q会列出包括已停止容器在内的所有容器的 ID，
docker rm会删除这些容器
```

## 三 删除镜像

```
1、删除镜像指令
docker rmi $(docker images -q)

2、说明
docker images -q会列出所有镜像的 ID，docker rmi会删除这些镜像。
如果有镜像被容器依赖，删除时可能会报错，
此时可以使用docker rmi -f $(docker images -q)强制删除所有镜像
```

## 四 卸载Docker

### 4.1 Debian/Ubuntu 系统

```
1、停止 Docker 服务：
sudo systemctl stop docker

2、删除 Docker 安装包：
sudo apt-get purge docker-ce docker-ce-cli containerd.io

3、删除 Docker 相关文件：
sudo rm -rf /var/lib/docker，sudo rm -rf /etc/docker（如果有相关配置文件需要删除）
```

### 4.2 CentOS/RHEL 系统

```
1、停止 Docker 服务：
sudo systemctl stop docker

2、删除 Docker 安装包：
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine

3、删除 Docker 数据目录：
sudo rm -rf /var/lib/docker
```

### 4.3 macOS 系统

```
1、停止 Docker 服务：
通过菜单栏中的 Docker 图标，选择 “Quit Docker” 停止服务。

2、卸载 Docker 应用：
将 Docker 应用从 “应用程序” 文件夹拖到 “废纸篓”，
或者使用brew uninstall --cask docker命令（如果是通过 Homebrew 安装的）。

3、删除 Docker 配置文件：
rm -rf ~/.docker
```

### 4. 4 Windows 系统

```
1、停止 Docker 服务：
通过任务管理器，在 “服务” 选项卡中找到 “Docker Desktop Service”，右键选择 “停止”。

2、通过控制面板卸载 Docker Desktop：
打开 “控制面板> 程序 > 程序和功能”，找到 “Docker Desktop”，右键选择 “卸载”。

3、清理残留文件：
手动删除C:\Program Files\Docker、
C:\Users\你的用户名\AppData\Local\Docker、
C:\Users\你的用户名\AppData\Roaming\Docker等目录（如有）
```

