---
title: Docker入门之——Docker常见操作(20)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: ea5ed21b
date: 2025-07-24 07:32:18
---
## 一 概述

* Docker基础操作
* 镜像操作
* Docker Compose(多容器管理)
* 常用挂载参数
* 权限和用户设置
* 进阶使用示例

<!--more-->

## 二 当前环境

* 系统：Win11专业版 24H2
* WSL 版本: 2.5.9.0
* Docker.desktop版本：4.43.1(198352)

## 三 Docker基础操作

1、Docker相关

|       操作       |            命令示例             |
| :--------------: | :-----------------------------: |
| 查看 Docker 版本 |   docker -v 或 docker version   |
| 启动 Docker 服务 | systemctl start docker（Linux） |

2、镜像相关

|   操作   |            命令示例             |         说明         |
| :------: | :-----------------------------: | :------------------: |
| 查看镜像 |          docker images          |                      |
| 删除镜像 |        docker rmi 镜像ID        |                      |
| 构建镜像 | docker build -t 自定义名:标签 . | 用于构建 Docker 镜像 |

3、容器相关

|       操作       |            命令示例             |
| :--------------: | :-----------------------------: |
|   查看所有容器   |          docker ps -a           |
| 运行镜像创建容器 | docker run -d -p 8080:80 镜像名 |
|     启动容器     |    docker start 容器ID或名称    |
|     停止容器     |    docker stop 容器ID或名称     |
|     删除容器     |     docker rm 容器ID或名称      |

## 四 镜像操作

```
1、拉取镜像
docker pull nginx:latest

2、查看镜像层
docker history 镜像ID

3、清理无用镜像、容器、网络(执行前有弹出警告确认)：
docker system prune -a
```

## 五 Docker Compose(多容器管理)—用于项目

```
1、启动服务：
docker-compose up -d

2、停止服务：
docker-compose down

3、构建服务：
docker-compose build
```

## 六 常用挂载参数

```
1、目录挂载
docker run -v /宿主机路径:/容器内路径 ...

2、端口映射
docker run -p 外部端口:容器端口 ...

3、环境变量设置
docker run -e KEY=VALUE ...
```

## 七 权限和用户设置

```
1、以特定用户运行容器
docker run --user 1000:1000 ...

2、使用 --privileged 获取特权模式：
docker run --privileged ...
```

## 八 进阶使用示例

```
1、使用 Docker 部署 Jellyfin

docker run -d \
  --name jellyfin \
  --net=host \
  -v /path/to/config:/config \
  -v /path/to/cache:/cache \
  -v /path/to/media:/media \
  jellyfin/jellyfin

2、使用 Dockerfile 构建：

FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```

