---
title: Docker入门之——Docker 镜像使用(18)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: 775652cd
date: 2024-10-15 09:03:10
---
## 一 概述

* 列出镜像列表
* 获取一个新的镜像
* 查找镜像
* 拉取镜像

<!--more-->

## 二 列出镜像列表

### 2.1 准备条件

* VPN

### 2.2 列出镜像列表

1-操作指令

```
docker images
```

2-操作结果

```
C:\Users\83422>docker images
REPOSITORY   TAG               IMAGE ID       CREATED       SIZE
tomcat       9-jdk8-corretto   4d556de5186d   13 days ago   567MB
ubuntu       latest            dfc10878be8d   4 weeks ago   117MB
```

## 三 获取一个新的镜像

1-操作指令

```
docker pull ubuntu:latest
```

2-操作结果

```
C:\Users\83422>docker pull ubuntu:latest
latest: Pulling from library/ubuntu
Digest: sha256:dfc10878be8d8fc9c61cbff33166cb1d1fe44391539243703c72766894fa834a
Status: Image is up to date for ubuntu:latest
docker.io/library/ubuntu:latest
```

## 四 查找镜像

1-操作指令

```
docker search httpd
```

2-操作结果

```
C:\Users\83422>docker search httpd
NAME                     DESCRIPTION                                      STARS     OFFICIAL
httpd                    The Apache HTTP Server Project                   4796      [OK]
manageiq/httpd           Container with httpd, built on CentOS for Ma…   1
paketobuildpacks/httpd                                                    0
dockerpinata/httpd                                                        1
jitesoft/httpd           Apache httpd on Alpine linux.                    0
vulhub/httpd                                                              0
centos/httpd                                                              36
e2eteam/httpd                                                             0
manasip/httpd                                                             0
futdryt/httpd                                                             0
amd64/httpd              The Apache HTTP Server Project                   1
openquantumsafe/httpd    Demo of post-quantum cryptography in Apache …   14
ppc64le/httpd            The Apache HTTP Server Project                   0
9af925e7043/httpd                                                         0
arm64v8/httpd            The Apache HTTP Server Project                   11
s390x/httpd              The Apache HTTP Server Project                   1
arm32v7/httpd            The Apache HTTP Server Project                   11
i386/httpd               The Apache HTTP Server Project                   1
tugboatqa/httpd          The Apache HTTP Server Project                   0
signiant/httpd           httpd (apache2) base container with a custom…   0
armhf/httpd              The Apache HTTP Server Project                   8
inventis/httpd           apache container with support for https only     0
publici/httpd            httpd:latest                                     1
trollin/httpd                                                             0
vzwingmadomatic/httpd    Service frontal de l'application de domotique    0
```

## 五 拉取镜像

1-操作指令

```
docker pull httpd
```

2-操作结果

```
C:\Users\83422>docker pull httpd
Using default tag: latest
latest: Pulling from library/httpd
4f4fb700ef54: Already exists
302e3ee49805: Download complete
95eac36196b2: Download complete
c7c900975bf7: Download complete
ca8887d72588: Download complete
4669bea11670: Download complete
Digest: sha256:7204bce27072f97f244337ebe93c1dfc93d358d103beefc4107ee359d74d9148
Status: Downloaded newer image for httpd:latest
docker.io/library/httpd:latest
```

3-使用镜像

```
docker run httpd
```

## 六 参考

* [菜鸟教程—Docker 镜像使用](https://www.runoob.com/docker/docker-image-usage.html)

