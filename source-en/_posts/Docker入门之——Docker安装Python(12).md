---
title: Docker入门之——Docker安装Python(12)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: d7d069b7
date: 2024-10-08 08:18:43
---
## 一 概述

* 搜索Python镜像
* 安装Python镜像
* 安装Python容器
* 查看Python信息

<!--more-->

## 二 搜索Python镜像

### 2.1 准备条件

* VPN

### 2.2 搜索Python镜像

1-在搜索框中输入`python`

![][1]

2-下拉列表选择`python`版本

![][2]

## 三 安装Python镜像

1-点击`Pull`，拉取镜像

![][3]

2-开始下载，显示进度

![][4]

3-Images列表，显示已下载镜像

![][5]

## 四 安装Python容器

### 4.1 查看本地镜像

终端指令

```
docker images
```

结果

```
C:\Users\83422>docker images
REPOSITORY   TAG               IMAGE ID       CREATED        SIZE
tomcat       9-jdk8-corretto   4d556de5186d   13 days ago    567MB
python       latest            14f073695854   2 weeks ago    1.47GB
mysql        latest            92dc86967801   2 months ago   803MB
```

### 4.2 运行容器

操作指令

```
docker run -itd python /bin/sh
```


图示

![][6]

### 4.3 查看是否成功

操作指令

```
docker ps
```

操作结果

![][7]

## 五 查看Python信息

### 5.1 进入python终端

操作指令(7776976feff9为容器id)

```
docker exec -it 7776976feff9 /bin/sh
```

执行结果

```
#
```

### 5.2 查看python版本

操作指令

```
python
```

操作结果

```
C:\Users\83422> docker exec -it 7776976feff9 /bin/sh
# python
Python 3.12.6 (main, Sep 27 2024, 06:10:24) [GCC 12.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```


## 六 参考

* [菜鸟教程—Docker 安装 Python](https://www.runoob.com/docker/docker-install-python.html)
* [CSDN—在docker上安装运行Python文件](https://blog.csdn.net/qq_53679247/article/details/130552615)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-12-python-search-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-12-python-tag-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-12-python-pull-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-12-python-download-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-12-python-images-list-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-12-python-run-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/docker-12-python-docker-ps-7.png
