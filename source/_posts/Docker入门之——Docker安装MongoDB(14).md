---
title: Docker入门之——Docker安装MongoDB(14)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: cff0a06b
date: 2024-10-10 08:51:17
---
## 一 概述

* 搜索Mongo镜像
* 安装Mongo镜像
* 安装Mongo容器
* 查看Mongo信息
* 连接测试

<!--more-->

## 二 搜索Mongo镜像

### 2.1 准备条件

* VPN

### 2.2 搜索Mongo镜像

1-在搜索框中输入`Mongo`

![][1]

2-下拉列表选择`mongo`版本

![][2]

## 三 安装Mongo镜像

1-点击`Pull`，拉取镜像

![][3]

2-开始下载，显示进度

![][4]

3-Images列表，显示已下载镜像

![][5]

## 四 安装Mongo容器

### 4.1 查看本地镜像

终端指令

```
docker images
```

结果

```
C:\Users\83422>docker images
REPOSITORY   TAG               IMAGE ID       CREATED       SIZE
mongo        latest            a3d0dec40b95   12 days ago   1.15GB
tomcat       9-jdk8-corretto   4d556de5186d   13 days ago   567MB
```

### 4.2 运行容器

1-运行设置

![][6]

2-查看容器状态

![][7]

## 五 查看Mongo信息

操作指令

```
docker ps
```

操作结果

![][8]

## 五 连接测试

### 5.1 进入Mongo Exec

![][9]

### 5.2 连接测试

操作指令

```
mongosh --host 127.0.0.1 --port 27017
```

操作结果

```
# mongosh --host 127.0.0.1 --port 27017
Current Mongosh Log ID: 66fb45658917bcfb29964032
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1
Using MongoDB:          8.0.0
Using Mongosh:          2.3.1

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/
```

图示

![][10]

## 六 参考

* [菜鸟教程—Docker 安装 Mongo](https://www.runoob.com/docker/docker-install-mongodb.html)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-14-mongo-search-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-14-mongo-tag-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-14-mongo-pull-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-14-mongo-download-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-14-mongo-images-list-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-14-mongo-run-container-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-14-mongo-container-state-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-14-mongo-docker-ps-8.png
[9]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-14-mongo-exec-9.png
[10]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-14-mongo-exec-cmd-10.png