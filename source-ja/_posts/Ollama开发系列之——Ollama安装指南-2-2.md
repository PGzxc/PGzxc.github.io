---
title: Ollama开发系列之——Ollama安装指南(2.2)
categories:
  - AI
  - AI模型
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 47021ca7
date: 2026-03-31 16:50:02
---
## 一 概述

```
在上一篇我们介绍了 Ollama 是什么
这一篇直接进入实操环节：
手把手教你把 Ollama 跑起来(含避坑指南 + GPU 支持 + Docker 部署)
```

<!--more-->

## 二 安装前准备

### 2.1 硬件要求(核心)

1-模型及配置

| 模型规模 |  推荐配置   |
| :------: | :---------: |
|  1B~7B   |  8GB 内存   |
|  8B~14B  |   8B~14B    |
|   32B+   | 32GB+ / GPU |

2-重点：

```
没有 GPU 也能跑（只是慢）
推荐优先用小模型测试（如 gemma3:4b）
```

### 2.2 GPU 支持说明

|  平台   |          支持          |
| :-----: | :--------------------: |
|  macOS  |      Apple Metal       |
| Windows |      NVIDIA / AMD      |
|  Linux  | NVIDIA CUDA / AMD ROCm |

## 三 安装

### 3.1 macOS / Linux 安装(最简单)

```
1、 一键安装（官方推荐）
curl -fsSL https://ollama.com/install.sh | sh

2、验证是否成功
ollama -v

3、启动服务
ollama serve
macOS 默认已自动启动（无需手动执行）

4、常见问题
问题1：命令不存在
ollama: command not found
解决：
export PATH=$PATH:/usr/local/bin

问题2：下载慢
解决：
-配置代理（推荐）
-或使用镜像源（进阶）
```

### 3.2 Windows 安装(最推荐新手)

```
1. 下载地址
https://ollama.com/download

2. 安装步骤
-双击安装程序
-一路 Next
-安装完成自动启动

3. 验证
打开 PowerShell：ollama list

4. Windows 常见坑
-GPU 不生效：检查：NVIDIA 驱动是否最新/CUDA 是否正常
-被防火墙拦截：允许 Ollama 访问网络
```

### 3.3 Docker 部署(服务器推荐)

```
1. 适合：
-NAS
-云服务器
-家庭服务器

2. 启动容器
docker run -d \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --name ollama \
  ollama/ollama
  
3. 验证
curl http://localhost:11434

4. GPU 支持（进阶）
NVIDIA:docker run --gpus all ...
AMD(实验性):需 ROCm + Vulkan
```

## 四 安装后运行及升级

### 4.1 安装后第一步

```
1. 运行第一个模型
ollama run gemma3
首次会自动下载模型（约 2~5GB）

2. 成功标志
看到：>>> 说明已经可以聊天了 
```

### 4.2 升级与版本管理

```
1. 升级
ollama update

2. 重装
curl -fsSL https://ollama.com/install.sh | sh

3. Docker 升级
docker pull ollama/ollama
docker restart ollama
```

### 4.3 多版本共存(进阶)

```
1.说明：
一般不需要，但开发者可能会用到

2.方式：
-使用 Docker 多容器
-或手动切换 PATH
```

## 五 安装完成

### 5.1 完整安装验证流程

```
1. 查看版本
ollama -v

2. 拉取模型
ollama pull gemma3

3. 运行模型
ollama run gemma3

4. API测试
curl http://localhost:11434/api/generate -d '{
  "model": "gemma3",
  "prompt": "你好"
}'
```

### 5.2 安装完成后可以做什么？

```
1.本地 AI 聊天
2.搭建 AI API 服务
3.接入 WebUI
4.做 AI 编程助手
```

