---
title: lanhu-mcp系列之——快速入门(2)
categories:
  - AI
  - AI开发
  - AI Agent
  - lanhu-mcp
tags:
  - lanhu-mcp
abbrlink: 69077bdb
date: 2026-04-08 10:37:33
---
## 一 概述

```
本文介绍：
 - 前置要求
 - 安装方式
 - 接入 AI 工具
```

<!--more-->

## 二 前置要求

### 2.1 必须满足

```
- Python 3.10+
- Docker（推荐）
- 支持视觉能力的 AI 模型（非常重要）
```

### 2.2 支持模型

```
GPT / Claude / Gemini / Qwen / DeepSeek 
```

## 三 安装方式

### 3.1 AI 自动安装

```
1.直接对 AI 说：
 帮我克隆并安装 https://github.com/dsphper/lanhu-mcp

2.AI 会自动完成：
- 克隆项目
- 安装依赖
- 配置 Cookie
- 启动服务
```

### 3.2 手动安装(Docker)

```
git clone https://github.com/dsphper/lanhu-mcp.git
cd lanhu-mcp

bash setup-env.sh   # 配置 Cookie
docker-compose up -d
```

### 3.3 源码运行

```
pip install -r requirements.txt
playwright install chromium

python lanhu_mcp_server.py

服务地址：http://localhost:8000/mcp
```

## 四 接入 AI 工具

### 4.1 以 Cursor 为例：

```
{
  "mcpServers": {
    "lanhu": {
      "url": "http://localhost:8000/mcp?role=Developer&name=YourName"
    }
  }
}
```

### 4.2 参数说明：

| 参数 |             说明              |
| :--: | :---------------------------: |
| role | 角色（Frontend/Backend/Test） |
| name |      用户名（用于协作）       |