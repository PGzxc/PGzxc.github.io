---
title: OpenClaw开发之——Docker本地部署(2.7)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: c1b62abf
date: 2026-04-20 08:14:24
---
## 一 概述

```
本文介绍：
 -系统要求
 -Docker部署过程
 -注意事项
```

<!--more-->

## 二 系统要求

```
1.硬件：
 -Windows / macOS / Linux
 -8GB+ 内存（建议16GB）
 -20GB+ 可用空间

2.软件：
 -Docker
 -Docker Compose

3.已安装：
 -Ollama（推荐，本地模型）

4.注意事项：
 -需开启虚拟化（Windows / Mac）
 -NAS / Linux 需开放端口
 
5.推荐工具：
 -Docker Desktop（Win / Mac）
 -Docker（Linux / NAS）
 -Ollama（本地模型）
```

## 三 部署过程(Docker)

### 3.1 获取 OpenClaw

```
git clone https://github.com/OpenClawAI/OpenClaw.git
cd OpenClaw
```

### 3.2 配置环境变量

```
1.创建 .env 文件：

# 本地模型（推荐）
MODEL_PROVIDER=ollama
MODEL_NAME=llama3

# Ollama 地址（关键）
OLLAMA_BASE_URL=http://host.docker.internal:11434

# 服务端口
PORT=18789

2.不同系统说明：
Windows / Mac：host.docker.internal 可直接使用
Linux：需改为宿主机 IP（如 172.17.0.1）
```

### 3.3 启动服务

```
docker compose up -d
```

### 3.4 查看运行状态

```
docker ps
```

### 3.5 查看日志(重要)

```
docker logs -f openclaw
```

## 四 访问服务

```
http://127.0.0.1:18789

NAS/服务器：
http://服务器IP:18789
```

## 五 相关配置(对比npm版)

### 5.1 Docker 模式下

```
不再需要 openclaw onboard 交互配置
```

### 5.2 配置方式变化

|   npm模式   | Docker模式 |
| :---------: | :--------: |
| onboard交互 | .env 文件  |
|   CLI配置   |  环境变量  |
|  本地运行   |  容器运行  |

### 5.3 常用环境变量

```
# 模型
MODEL_PROVIDER=ollama
MODEL_NAME=llama3

# 端口
PORT=18789

# 日志
LOG_LEVEL=info
```

## 六 Ollama 配置(关键)

### 6.1 启动 Ollama

```
ollama serve
```

### 6.2 下载模型

```
ollama run llama3
```

### 6.3 Docker 连接 Ollama 注意

```
必须使用宿主机地址
```

### 6.4 不同系统配置

|  系统   |         地址         |
| :-----: | :------------------: |
| Windows | host.docker.internal |
|   Mac   | host.docker.internal |
|  Linux  |      172.17.0.1      |

## 七 进阶

### 7.1 Docker 常驻运行

```
docker compose up -d

开机自启：
docker update --restart=always openclaw
```

### 7.2  NAS 部署

```
OpenClaw + 群晖 / EX2 ——> AI 自动整理文件
```

### 7.3 多容器组合

```
OpenClaw + Ollama + 向量数据库
```

## 八 总结

```
Docker 部署 OpenClaw优势：
- 一键启动
- 跨平台
- 易迁移
- 适合 NAS / 服务器

推荐：
Docker + Ollama = 最优本地AI方案
```

