---
title: Docker入门之——Docker安装Ubuntu(4)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: ae83e2d1
date: 2024-09-30 10:52:29
---
## 一 概述

* 搜索Ubuntu镜像
* 安装Ubuntu镜像
* 运行Ubuntu系统
* 进入Docker中的Ubuntu

<!--more-->

## 二 搜索Ubuntu镜像

### 2.1 准备条件

* VPN

### 2.2 搜索Ubuntu镜像

1-在搜索框中输入`ubuntu`

![][1]

2-下拉列表选择`ubuntu`版本

![][2]

## 三 安装Ubuntu镜像

1-点击`Pull`，拉取镜像

![][3]

2-开始下载，显示进度

![][4]

3-Images列表，显示已下载镜像

![][5]

4-点击`Images->ubuntu`右侧的`run`

![][6]

5-弹出窗口，设置Option信息

![][7]

## 四 运行Ubuntu系统

### 4.1 查看本地镜像

cmd终端输入如下指令

```
docker images
```

图示

![][8]

### 4.2 运行容器

cmd指令

```
docker run -itd --name ubuntu ubuntu
```

图示

![][9]

说明：

* --name 后面的第一个ubuntu为Container的Name

### 4.3 查看容器信息

指令

```
docker ps
```

图示

![][10]

## 五 进入Docker中的Ubuntu

指令

```
docker exec -it ubuntu /bin/bash
```

进入后，终端显示

```
root@09e9517b02f3:/#
```

说明：

* it后的可为Name或Container ID

## 六 参考

* [菜鸟教程—Docker 安装 Ubuntu](https://www.runoob.com/docker/docker-install-ubuntu.html)
* [CSDN—如何在Ubuntu中安装和运行docker](https://blog.csdn.net/2401_82458959/article/details/138355039)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-4-ubuntu-search-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-4-ubuntu-tag-choice-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-4-ubuntu-pull-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-4-ubuntu-download-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-4-ubuntu-images-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-4-ubuntu-run-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-4-ubuntu-run-option-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-4-ubuntu-docker-images-8.png
[9]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-4-ubuntu-container-run-9.png
[10]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-4-ubuntu-docker-ps-10.png