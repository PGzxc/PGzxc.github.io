---
title: Docker入门之——Docker Hello World(16)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: a526517f
date: 2024-10-13 07:37:12
---
## 一 概述

* Docker Hello World
* 交互式容器
* 启动容器(后台模式)
* 停止容器

<!--more-->

## 二 Docker Hello World

### 2.1 准备条件

* VPN

### 2.2 Docker Hello World

1-运行指令

```
docker run ubuntu /bin/echo "Hello world"
```

2-图示

![][1]

说明：

* **docker:** Docker 的二进制执行文件
* **run:** 与前面的 docker 组合来运行一个容器
* **ubuntu** 指定要运行的镜像，Docker 首先从本地主机上查找镜像是否存在，如果不存在，Docker 就会从镜像仓库 Docker Hub 下载公共镜像
* **/bin/echo "Hello world":** 在启动的容器里执行的命令

## 三 交互式容器

### 3.1 启动交互容器

操作指令

```
docker run -i -t ubuntu /bin/bash
```

说明：

* **-t:** 在新容器内指定一个伪终端或终端
* **-i:** 允许你对容器内的标准输入 (STDIN) 进行交互。

### 3.2 交互操作

操作指令

```
 cat /proc/version
 ls
```

操作结果

```
C:\Users\83422>docker run -i -t ubuntu /bin/bash
root@34fc40bd0a8d:/# cat /proc/version
Linux version 5.15.153.1-microsoft-standard-WSL2 (root@941d701f84f1) (gcc (GCC) 11.2.0, GNU ld (GNU Binutils) 2.37) #1 SMP Fri Mar 29 23:14:13 UTC 2024
```

### 3.3 退出交互

```
root@34fc40bd0a8d:/# exit
exit
```

## 四 启动容器(后台模式)

### 4.1 启动容器

操作指令

```
docker run -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"
```

操作结果

```
C:\Users\83422>docker run -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"
c271f97774e506bfc8ce1540c32a41df034fb6c388192faf79c4ff9f34b9bf12
```

### 4.2 查看容器

操作指令

```
docker ps
```

操作结果

```
C:\Users\83422>docker ps
CONTAINER ID   IMAGE     COMMAND                   CREATED          STATUS          PORTS     NAMES
c271f97774e5   ubuntu    "/bin/sh -c 'while t…"   16 seconds ago   Up 16 seconds             recursing_maxwell
```

说明：

* **CONTAINER ID:** 容器 ID
* **IMAGE:** 使用的镜像
* **COMMAND:** 启动容器时运行的命令
* **CREATED:** 容器的创建时间。
* **PORTS:** 容器的端口信息和使用的连接类型（tcp\udp）
* **NAMES:** 自动分配的容器名称。
* **STATUS:** 容器状态。

状态枚举

| created | restarting | running 或 Up | removing | paused | exited | dead |
| :-----: | :--------: | :-----------: | :------: | :----: | :----: | :--: |
| 已创建  |   重启中   |    运行中     |  迁移中  |  暂停  |  停止  | 死亡 |

### 4.3 docker log

操作指令

```
docker logs c271f97774e5
```

操作结果

```
C:\Users\83422>docker logs c271f97774e5
hello world
hello world
hello world
hello world
...
```

## 五 停止容器

操作指令

```
docker stop c271f97774e5
```

操作结果

```
C:\Users\83422>docker stop c271f97774e5
c271f97774e5
```

## 六 参考

* [菜鸟教程—Docker Hello World](https://www.runoob.com/docker/docker-hello-world.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-16-hello-cmd-1.png
