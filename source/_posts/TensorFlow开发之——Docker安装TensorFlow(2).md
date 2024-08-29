---
title: TensorFlow开发之——Docker安装TensorFlow(2)
categories:
  - 开发
  - Q-AI
  - TensorFlow
tags:
  - TensorFlow
abbrlink: 9827f938
date: 2024-08-29 09:20:54
---
## 一 概述

* Docker下载及安装
* 下载安装TensorFlow Docker镜像
* 启动 TensorFlow Docker 容器

<!--more-->

## 二 Docker下载及安装

### 2.1 Docker下载

Docker下载地址：https://docs.docker.com/get-started/get-docker/

图示：

![][1]

### 2.2 Docker验证

```
C:\Users\83422>docker -v
Docker version 27.1.1, build 6312585
```

## 三 下载安装TensorFlow Docker镜像

1-打开Docker Desktop，输入框中输入`tensorflow/tensorflow`，点击`pull`拉取

![][2]

2-下载完成后，Images下显示下载的`tensorflow`

![][3]

## 四 启动 TensorFlow Docker 容器

### 4.1 启动Docker容器

1-弹出创建容器对话框中，输入容器名

![][4]

2-Container显示启动容器

![][5]

### 4.2 启动bash shell会话

指令

```
docker run -it tensorflow/tensorflow bash
```

图示

![][6]

## 五 参考

* [TensorFlow-Docker ](https://www.tensorflow.org/install/docker?hl=zh-cn)
* [Docker官网](https://docs.docker.com/get-started/get-docker/)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-ai/tensor-2-docker-download-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-ai/tensor-2-docker-tensor-pull-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-ai/tensor-2-docker-tensor-images-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-ai/tensor-2-docker-tensor-run-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-ai/tensor-2-docker-tensor-container-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-ai/tensor-2-docker-bash-start-6.png