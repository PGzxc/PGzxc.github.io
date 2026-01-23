---
title: Dify开发之——卸载应用(3)
categories:
  - 开发
  - Q-AI
  - Dify
tags:
  - Dify
abbrlink: 7ee83c21
date: 2025-08-04 09:36:24
---
## 一 概述

* 停止容器
* 删除数据卷
* 删除镜像

<!--more-->

## 二 停止容器

dify的docker目录下，打开终端执行如下指令

```
docker compose down
```

图示

![][1]

## 三 删除数据卷

```
docker compose down --volumes --remove-orphans
```

## 四 删除镜像

### 4.1 列出与Dify相关镜像

```
docker images | Select-String dify
```

### 4.2 删除Dify镜像(通过id删除)

```
docker rmi fe462d3b1cb3  de4e28dde1da 123eb10e1cc0 ba1b250b9505
```


## 五 参考

* [Dify使用文档—Docker Compose部署](https://docs.dify.ai/zh-hans/getting-started/install-self-hosted/docker-compose)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/dify-3-stop-cmd-1.png
