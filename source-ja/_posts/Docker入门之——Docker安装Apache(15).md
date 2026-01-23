---
title: Docker入门之——Docker安装Apache(15)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: a0d7c9e1
date: 2024-10-11 08:44:13
---
## 一 概述

* 搜索httpd镜像
* 安装httpd镜像
* 安装httpd容器
* 查看httpd信息
* 连接测试

<!--more-->

## 二 搜索httpd镜像

### 2.1 准备条件

* VPN

### 2.2 搜索httpd镜像

1-在搜索框中输入`httpd`

![][1]

2-下拉列表选择`httpd`版本

![][2]

## 三 安装httpd镜像

1-点击`Pull`，拉取镜像

![][3]

2-开始下载，显示进度

![][4]

3-Images列表，显示已下载镜像

![][5]

## 四 安装httpd容器

### 4.1 查看本地镜像

终端指令

```
docker images
```

结果

```
C:\Users\83422>docker images
REPOSITORY   TAG               IMAGE ID       CREATED        SIZE
mongo        latest            a3d0dec40b95   12 days ago    1.15GB
tomcat       9-jdk8-corretto   4d556de5186d   13 days ago    567MB
httpd        latest            7204bce27072   2 months ago   221MB
```

### 4.2 运行容器

1-运行设置

![][6]

2-查看容器状态

![][7]

## 五 查看httpd信息

操作指令

```
docker ps
```

操作结果

![][8]

## 五 连接测试

### 5.1 点击Containers，点击图示打开浏览器

![][9]

### 5.2 网页显示

![][10]

## 六 参考

* [菜鸟教程—Docker 安装 Apache](https://www.runoob.com/docker/docker-install-apache.html)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-15-httpd-search-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-15-httpd-tag-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-15-httpd-pull-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-15-httpd-download-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-15-httpd-images-list-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-15-httpd-run-option-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-15-httpd-container-state-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-15-httpd-docker-ps-8.png
[9]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-15-httpd-container-click-9.png
[10]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-15-httpd-web-result-10.png