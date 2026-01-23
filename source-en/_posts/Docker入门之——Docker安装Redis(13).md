---
title: Docker入门之——Docker安装Redis(13)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: cb7a2494
date: 2024-10-09 08:46:11
---
## 一 概述

* 搜索Redis镜像
* 安装Redis镜像
* 安装Redis容器
* 查看Redis信息
* 连接测试

<!--more-->

## 二 搜索Redis镜像

### 2.1 准备条件

* VPN

### 2.2 搜索Redis镜像

1-在搜索框中输入`redis`

![][1]

2-下拉列表选择`redis`版本

![][2]

## 三 安装Redis镜像

1-点击`Pull`，拉取镜像

![][3]

2-开始下载，显示进度

![][4]

3-Images列表，显示已下载镜像

![][5]

## 四 安装Redis容器

### 4.1 查看本地镜像

终端指令

```
docker images
```

结果

```
REPOSITORY   TAG               IMAGE ID       CREATED        SIZE
tomcat       9-jdk8-corretto   4d556de5186d   13 days ago    567MB
redis        latest            6725a7dc7a44   2 months ago   174MB
mysql        latest            92dc86967801   2 months ago   803MB
```

### 4.2 运行容器

1-运行设置

![][6]

2-查看容器状态

![][7]

## 五 查看Redis信息

操作指令

```
docker ps
```

操作结果

![][8]

## 五 连接测试

### 5.1 进入redis Exec

![][9]

### 5.2 连接测试

操作指令

```
redis-cli
```

操作结果

```
# redis-cli
127.0.0.1:6379> set test 1
OK
127.0.0.1:6379>
```

图示

![][10]

## 六 参考

* [菜鸟教程—Docker 安装 Redis](https://www.runoob.com/docker/docker-install-redis.html)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-13-redis-search-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-13-redis-tag-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-13-redis-pull-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-13-redis-download-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-13-redis-container-list-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-13-redis-run-option-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-13-redis-container-state-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-13-redis-state-8.png
[9]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-13-redis-exec-9.png
[10]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-13-redis-exec-result-10.png