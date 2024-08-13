---
title: Docker入门之——docker安装官方镜像(3)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: 6c88f3b3
date: 2024-08-13 08:49:49
---
## 一 概述

* 官方镜像和查找Docker Hub
* 安装Docker Hub
* 运行软件

<!--more-->

## 二 官方镜像和查找Docker Hub

### 2.1 Docker Desktop查询软件

![][1]

说明：

* 打开Docker Desktop在输入框中输入要查询的软件镜像
* Images下列出查询出的结果

### 2.2 官方网站查询软件

1-打开软件官网

```
https://hub.docker.com/
```

2-输入要搜索的内容

![][2]

3-回车后跳转到搜索结果

![][3]

## 三 安装Docker Hub

### 3.1 Docker Desktop软件安装

1-进入软件详情页，选择`tag`版本，并点击pull安装

![][4]

### 3.2 CMD终端安装

```
docker pull tomcat
```

安装图示

![][5]

### 3.3 Images下查看安装镜像

![][6]

## 四 运行软件

1-点击run，弹出运行设置弹出框(设置Port等)

![][7]

2-运行后查看运行日志，并访问

![][8]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-3-desktop-search-hub.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-3-website-search-hub.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-3-website-search-result.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-3-desktop-pull.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-3-cmd-pull.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-3-images-local.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-3-run-container.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-3-log-visit.png