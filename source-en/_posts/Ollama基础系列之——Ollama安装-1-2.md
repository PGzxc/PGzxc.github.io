---
title: Ollama基础系列之——Ollama安装(1.2)
categories:
  - AI
  - C-AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: e23d8cbf
date: 2026-03-30 16:22:36
---
## 一 概述

```
本文介绍：
 - 硬件要求
 - 各平台安装
```

<!--more-->

## 二 官方地址

```
官网文档：
https://docs.ollama.com/
```

## 三 硬件要求

### 3.1 模型与要求

| 模型 | 最低内存 |
| :--: | :------: |
|  7B  |   8GB    |
| 13B  |   16GB   |
| 33B  |  32GB+   |

### 3.2 本质

```
模型越大，效果越好，但越吃资源
```

## 四 安装方式

### 4.1 Windows / macOS

```
直接下载安装包
```

### 4.2 Linux(推荐)

```
curl -fsSL https://ollama.com/install.sh | sh
```

### 4.3 Docker

```
docker pull ollama/ollama
```

