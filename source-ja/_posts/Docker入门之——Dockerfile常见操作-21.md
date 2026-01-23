---
title: Docker入门之——Dockerfile常见操作(21)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: 7bd7973d
date: 2025-07-25 08:34:34
---
## 一 概述

* Dockerfile 基本结构
* 常用指令说明
* 构建镜像与运行
* 示例

<!--more-->

## 二 当前环境

* 系统：Win11专业版 24H2
* WSL 版本: 2.5.9.0
* Docker.desktop版本：4.43.1(198352)

## 三 Dockerfile 基本结构

```
# 选择基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 拷贝依赖描述文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 拷贝项目代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["npm", "start"]
```

## 四 常用指令说明

|    指令    |              作用              |
| :--------: | :----------------------------: |
|    FROM    |          指定基础镜像          |
|  WORKDIR   |      设置容器内部工作目录      |
|    COPY    |         拷贝文件到容器         |
|    ADD     | 类似 COPY，支持自动解压和 URL  |
|    RUN     |     执行命令，比如安装依赖     |
|    CMD     | 容器启动默认执行命令(可被覆盖) |
| ENTRYPOINT |  容器启动执行命令(不易被覆盖)  |
|   EXPOSE   |       声明容器暴露的端口       |
|    ENV     |          设置环境变量          |
|   VOLUME   |           设置挂载点           |
|    ARG     | 构建时传参，`--build-arg` 使用 |

## 五 构建镜像与运行

```
1、构建镜像
docker build -t myapp:latest .

2、运行镜像
docker run -d -p 3000:3000 myapp:latest

3、传入构建参数
docker build --build-arg APP_ENV=production -t myapp:prod .
```

## 六 示例

### 6.1 多阶段构建（用于前端/Vue/React 项目）

```
# 构建阶段
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 部署阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

### 6.2 Python 项目

```
FROM python:3.11
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "main.py"]
```

### 6.3 可定制的构建参数

```
ARG VERSION=latest
FROM nginx:$VERSION

构建时传参：
docker build --build-arg VERSION=1.25.2 -t mynginx .
```

