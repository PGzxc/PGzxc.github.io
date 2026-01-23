---
title: Docker入门之——Docker安装MySQL(9)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: 4c5e255
date: 2024-10-05 08:21:39
---
## 一 概述

* 搜索MySQL镜像
* 安装MySQL镜像
* 创建MySQL容器
* 查看MySQL信息

<!--more-->

## 二 搜索MySQL镜像

### 2.1 准备条件

* VPN

### 2.2 搜索MySQL镜像

1-在搜索框中输入`node`

![][1]

2-下拉列表选择`php`版本

![][2]

## 三 安装MySQL镜像

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
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
php          latest    304192ef9272   3 days ago     747MB
node         latest    69e667a79aa4   12 days ago    1.6GB
nginx        latest    b5d3f3e10469   6 weeks ago    273MB
mysql        latest    92dc86967801   2 months ago   803MB
```

### 4.2 运行容器

终端指令

```
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
docker run -itd --name mysql-test -p 3306:3360 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

图示

![][6]

## 四 查看MySQL信息

### 4.1 进入docker 终端

操作指令

```
docker exec -it mysql-test /bin/bash
```

执行结果

```
C:\Users\83422>docker exec -it mysql-test /bin/bash
bash-5.1#
```

### 4.2 访问MySQL服务

操作指令

```
mysql -h localhost -u root -p
```

执行结果

![][7]

## 五 参考

* [菜鸟教程—Docker 安装 MySQL](https://www.runoob.com/docker/docker-install-mysql.html)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-9-mysql-search-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-9-mysql-tag-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-9-mysql-pull-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-9-mysql-download-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-9-mysql-images-list-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-9-mysql-container-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-9-mysql-login-7.png