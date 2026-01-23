---
title: Docker入门之——Docker安装Tomcat(11)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: 5b65315c
date: 2024-10-07 08:14:05
---
## 一 概述

* 搜索Tomcat镜像
* 安装Tomcat镜像
* 创建Tomcat容器
* 查看Tomcat信息

<!--more-->

## 二 搜索Tomcat镜像

### 2.1 准备条件

* VPN

### 2.2 搜索Tomcat镜像

1-在搜索框中输入`tomcat`

![][1]

2-下拉列表选择`tomcat`版本

![][2]

## 三 安装Tomcat镜像

1-点击`Pull`，拉取镜像

![][3]

2-开始下载，显示进度

![][4]

3-Images列表，显示已下载镜像

![][5]

## 四 创建MySQL容器

### 4.1 查看本地镜像

终端指令

```
docker images
```

结果

```
C:\Users\83422>docker images
REPOSITORY   TAG                        IMAGE ID       CREATED        SIZE
tomcat       9.0.95-jdk8-corretto-al2   4d556de5186d   12 days ago    567MB
mysql        latest                     92dc86967801   2 months ago   803MB
```

### 4.2 运行容器

点击Images下的Tomcat，点击`run`弹出Option对话框


图示

![][6]

### 4.3 容器显示Tomcat

Container点击图示位置

![][7]



## 四 查看Tomcat信息

### 4.1 直接访问Tomcat(webapp下缺少文件)

访问地址

```
http://localhost:8080/
```

执行结果

```
HTTP Status 404 – Not Found
Type Status Report

Message The requested resource [/] is not available

Description The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.
```

### 4.2 导入Root文件夹

1-webapps(/usr/local/tomcat/webapps)导入Root文件

![][8]

2-导入Root后的文件显示

![][9]

3-刷新地址

![][10]


## 五 参考

* [菜鸟教程—Docker 安装 Tomcat](https://www.runoob.com/docker/docker-install-tomcat.html)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-11-tomcat-search-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-11-tomcat-tag-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-11-tomcat-pull-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-11-tomcat-download-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-11-tomcat-images-list-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-11-tomcat-run-option-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-11-tomcat-container-click-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-11-tomcat-import-8.png
[9]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-11-tomcat-web-root-9.png
[10]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-11-tomcat-visit-10.png