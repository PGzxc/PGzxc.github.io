---
title: Docker入门之——Docker安装PHP(8)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: f69955e2
date: 2024-10-04 08:12:13
---
## 一 概述

* 搜索PHP镜像
* 安装PHP镜像
* 创建PHP容器
* 查看PHP信息

<!--more-->

## 二 搜索PHP镜像

### 2.1 准备条件

* VPN

### 2.2 搜索PHP镜像

1-在搜索框中输入`node`

![][1]

2-下拉列表选择`php`版本

![][2]

## 三 安装PHP镜像

1-点击`Pull`，拉取镜像

![][3]

2-开始下载，显示进度

![][4]

3-Images列表，显示已下载镜像

![][5]

## 四 创建PHP容器

### 4.1 查看本地镜像

终端指令

```
docker images
```

结果

```
C:\Users\83422>docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
php          latest    304192ef9272   3 days ago    747MB
node         latest    69e667a79aa4   12 days ago   1.6GB
nginx        latest    b5d3f3e10469   6 weeks ago   273MB
```

### 4.2 运行容器

终端指令

```
docker run -itd --name php-test php
```

图示

![][6]

## 四 查看PHP信息

### 4.1 进入docker 终端

操作指令

```
docker exec -it php-test /bin/bash
```

执行结果

```
C:\Users\83422>docker exec -it php-test /bin/bash
root@2fd271a1313a:/#
```

### 4.2 查看PHP版本

操作指令

```
php -v
```

执行结果

```
root@2fd271a1313a:/# php -v
PHP 8.3.12 (cli) (built: Sep 27 2024 06:13:51) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.3.12, Copyright (c) Zend Technologies
root@2fd271a1313a:/#
```

## 五 参考

* [菜鸟教程—Docker 安装 PHP](https://www.runoob.com/docker/docker-install-php.html)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-8-php-search-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-8-php-tag-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-8-php-pull-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-8-php-download-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-8-php-images-list-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-8-php-container-6.png
