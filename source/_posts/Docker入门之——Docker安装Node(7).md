---
title: Docker入门之——Docker安装Node(7)
abbrlink: 6b2bdf4
date: 2024-10-03 07:46:42
categories:
tags:
---
## 一 概述

* 搜索Node镜像
* 安装Node镜像
* 创建Node容器
* 查看Node信息

<!--more-->

## 二 搜索Node镜像

### 2.1 准备条件

* VPN

### 2.2 搜索Node镜像

1-在搜索框中输入`node`

![][1]

2-下拉列表选择`node`版本

![][2]

## 三 安装Node镜像

1-点击`Pull`，拉取镜像

![][3]

2-开始下载，显示进度

![][4]

3-Images列表，显示已下载镜像

![][5]

## 四 创建Node容器

### 4.1 查看本地镜像

终端指令

```
docker images
```

结果

```
C:\Users\83422>docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
node         latest    69e667a79aa4   12 days ago   1.6GB
```

### 4.2 运行容器

终端指令

```
docker run -itd --name node-test node
```

图示

![][7]

## 四 查看Node信息

### 4.1 进入docker 终端

操作指令

```
docker exec -it node-test /bin/bash
```

执行结果

```
C:\Users\83422>docker exec -it node-test /bin/bash
root@9341936c0405:/#
```

### 4.2 查看Node版本

操作指令

```
node -v
```

执行结果

```
root@9341936c0405:/# node -v
v22.9.0
root@9341936c0405:/#
```

## 五 参考

* [菜鸟教程—Docker 安装 Node](https://www.runoob.com/docker/docker-install-node.html)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-7-node-search-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-7-node-tag-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-7-node-pull-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-7-node-download-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-7-node-images-list-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-7-node-image-run-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-7-node-docker-run-7.png