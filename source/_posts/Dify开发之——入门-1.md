---
title: Dify开发之——入门(1)
categories:
  - 开发
  - Q-AI
  - Dify
tags:
  - Dify
abbrlink: bfdd19
date: 2025-07-22 07:35:33
---
## 一 概述

* Dify介绍
* Dify能做什么
* Docker Compose本地部署

<!--more-->

## 二 Dify介绍

```
-Dify 是一个开源的 LLMOps 平台
-它能构建、管理和部署基于大语言模型(如 GPT-4、Claude、Gemini 等)的 AI 应用
-一句话概括：Dify 理解为一个 “AI 应用的中台系统”
```

## 三 Dify能做什么

|    功能类别    |                            说明                            |
| :------------: | :--------------------------------------------------------: |
|  模型统一调用  |    支持接入 OpenAI、阿里通义、讯飞星火等模型，统一调用     |
|    API 封装    | 为每个应用自动生成 API，可直接接入前端页面、小程序、App 等 |
| 数据分析与管理 |        自动记录对话日志、用户行为，可视化查看与反馈        |

## 四 Docker Compose本地部署

### 4.1 当前环境

* 系统：Win11 专业版 24H2
* VPN
* WSL版本：2.5.9
* Docker Desktop版本：4.43.1 (198352)
* CPU：12th Gen Intel(R) Core(TM) i7-12700   2.10 GHz
* RAM：16.0 GB (15.7 GB 可用)

### 4.2 克隆 Dify 代码仓库

```
# 假设当前最新版本为 0.15.3
git clone https://github.com/langgenius/dify.git --branch 0.15.3
```

### 4.3 启动 Dify

1、进入 Dify 源代码的 Docker 目录

```
cd dify/docker
```

2、复制环境配置文件

```
cp .env.example .env
```

3、启动 Docker 容器

```
1、 命令检查版本
docker compose version

2、如果版本是 Docker Compose V2，使用以下命令
docker compose up -d

3、如果版本是 Docker Compose V1，使用以下命令
docker-compose up -d
```

运行命令后，看到如下执行过程(需要VPN网络)

```
[+] Running 12/12
 ✔ Network docker_ssrf_proxy_network  Created                                                                      0.1s
 ✔ Network docker_default             Created                                                                      0.1s
 ✔ Container docker-db-1              Healthy                                                                     31.6s
 ✔ Container docker-web-1             Started                                                                      1.6s
 ✔ Container docker-weaviate-1        Started                                                                      1.5s
 ✔ Container docker-ssrf_proxy-1      Started                                                                      1.6s
 ✔ Container docker-sandbox-1         Started                                                                      1.5s
 ✔ Container docker-redis-1           Started                                                                      1.5s
 ✔ Container docker-plugin_daemon-1   Started                                                                     32.1s
 ✔ Container docker-api-1             Started                                                                     31.7s
 ✔ Container docker-worker-1          Started                                                                     31.7s
 ✔ Container docker-nginx-1           Started             
```

4、检查是否所有容器都正常运行

```
docker compose ps
```

### 4.4 访问 Dify

1、访问地址

```
# 本地环境
http://localhost/install

# 服务器环境
http://your_server_ip/install
```

图示

![][1]

2、设置管理员账户信息

```
邮箱:834228918@qq.com
用户名：PGzxc
密码：QQ123456789
```

3、登录后主界面如下图

![][2]

### 4.5 Dify停止及启动(在dockr目录执行)

```
docker compose down //停止
docker compose up -d //启动
```

## 五 参考

* [Dify使用文档—Docker Compose部署](https://docs.dify.ai/zh-hans/getting-started/install-self-hosted/docker-compose)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/dify-1-install-page-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/dify-1-home-page-2.png