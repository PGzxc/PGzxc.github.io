---
title: Hermes-Agent系列之——环境准备及安装(2)
categories:
  - AI
  - AI开发
  - AI Agent
  - Hermes-Agent
tags:
  - Hermes-Agent
abbrlink: 552571b2
date: 2026-04-08 10:18:07
---
## 一 概述

```
本文介绍：
 - 环境准备
 - 安装
```

<!--more-->

## 二 环境准备

### 2.1 基础要求

|  项目  |                要求                |
| :----: | :--------------------------------: |
|  系统  | Linux / macOS / Windows（WSL推荐） |
|  Node  |                ≥ 18                |
| Python |                可选                |
|  网络  |           可访问模型API            |

### 2.2 推荐环境(官方+社区实践)

```
# 推荐部署方式
- VPS（$5即可）
- Docker（推荐）
- 本地开发机
```

### 2.3 模型准备

```
任选一种：

一、云模型
- OpenAI API
- Anthropic API

二、本地模型(推荐你)
- Ollama（qwen / llama）
```

## 三 快速安装(官方方式)

### 3.1 一键安装

```
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | sh

说明：官方推荐安装方式 
```

### 3.2 启动

```
hermes
```

### 3.3 初始化配置

```
首次启动会引导：
1. 选择模型 Provider
2. 配置 API Key
3. 设置存储路径（Memory）
4. 设置学习参数
```

