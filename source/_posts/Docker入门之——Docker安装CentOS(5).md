---
title: Docker入门之——Docker安装CentOS(5)
abbrlink: f6bb71ce
date: 2024-10-01 07:45:17
categories:
tags:
---
## 一 概述

* 搜索CentOS镜像
* 安装CentOS镜像
* 运行CentOS系统
* 进入Docker中的CentOS

<!--more-->

## 二 搜索CentOS镜像

### 2.1 准备条件

* VPN

### 2.2 搜索CentOS镜像

1-在搜索框中输入`centos`

![][1]

2-下拉列表选择`centos`版本

![][2]

## 三 安装CentOS镜像

1-点击`Pull`，拉取镜像

![][3]

2-开始下载，显示进度

![][4]

3-Images列表，显示已下载镜像

![][5]

4-点击`Images->CentOS`右侧的`run`

![][6]

5-弹出窗口，设置Option信息

![][7]

## 四 运行CentOS系统

### 4.1 查看本地镜像

cmd终端输入如下指令

```
docker images
```

结果

```
C:\Users\83422>docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
ubuntu       latest    dfc10878be8d   4 weeks ago   117MB
centos       latest    a27fd8080b51   3 years ago   340MB
```

### 4.2 运行容器

cmd指令

```
docker run -itd --name centos-test centos
```

结果

```
C:\Users\83422>docker run -itd --name centos-test centos
2c904da792d9c97d3760a52285b5f05d4c804424e6850234b85a99f4346dc201
```

说明：

* --name 后面的第一个centos-test为Container的Name

### 4.3 查看容器信息

指令

```
docker ps
```

图示

```
C:\Users\83422>docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED         STATUS         PORTS     NAMES
2c904da792d9   centos    "/bin/bash"   3 minutes ago   Up 3 minutes             centos-test
```

## 五 进入Docker中的CentOS

指令

```
docker exec -it centos-test /bin/bash
```

进入后，终端显示

```
C:\Users\83422>docker exec -it centos-test /bin/bash
[root@2c904da792d9 /]#
```

说明：

* it后的可为Name或Container ID

## 六 参考

* [菜鸟教程—Docker 安装 CentOS](https://www.runoob.com/docker/docker-install-centos.html)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-5-centos-search-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-5-centos-tag-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-5-centos-pull-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-5-centos-download-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-5-centos-image-list-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-5-centos-image-run-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-5-centos-run-option-7.png