---
title: OpenClaw开发之——Linux本地部署(2.6)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: 7b10240
date: 2026-04-19 09:15:35
---
## 一 概述

```
本文介绍：
 -系统要求
 -部署过程
 -注意事项
```

<!--more-->

## 二 系统要求

```
1.硬件：
 -Linux（Ubuntu / Debian / CentOS / Arch）
 -8GB+ 内存（建议16GB）
 -20GB+ 可用空间

2.软件：
 -终端（bash / zsh）
 -Node.js（npm）

3.已安装：
 -Ollama（本地大模型运行环境）

4.注意事项：
 -建议使用 root 或 sudo 权限
 -服务器需开放端口（如 18789）
 -部分云服务器需关闭防火墙或放行端口
 
5.推荐发行版：
-Ubuntu（最稳定）
-Debian / CentOS 也可
```

## 三 部署过程(npm安装)

### 3.1 安装 Node.js

```
1.推荐使用 nvm：
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

2.验证：
node -v
npm -v
```

### 3.2 安装OpenClaw

```
npm i -g openclaw

如果权限问题：
sudo npm i -g openclaw
```

### 3.3 启动 OpenClaw

```
openclaw onboard
```

## 四 相关配置

### 4.1 安全确认

```
1.提醒
I understand this is personal-by-default and shared/multi-user use requires lock-down. Continue?

2.操作：
↑↓ 选择 Yes
回车确认
```

### 4.2 引导模式(Onboarding Mode)

```
1.模式
-QuickStart（推荐）
-Manual（手动配置）

2.推荐选择：
QuickStart

3.默认配置：
-Gateway port: 18789
-Gateway bind: 127.0.0.1
-Auth: Token
-Tailscale: Off
```

### 4.3 模型配置

```
1.推荐：
Ollama

2.安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh
启动：ollama serve

3.下载模型
ollama run llama3
或：
ollama run glm-4.7-flash

4.OpenClaw 配置
-Base URL: http://127.0.0.1:11434
-Mode: Local
-Default Model: ollama/llama3
```

### 4.4 通知Channel

```
1.推荐：
Skip for now

2.如果需要：
-Feishu（飞书）
-Telegram / Discord 等
```

### 4.5 联网搜索提供商(Search provider)

```
1.推荐：
Skip for now

2.后续可扩展：
-Kimi
-Perplexity
```

### 4.6 Skills状态(Skills status)

```
1.展示
Eligible: XX
Missing: XX
Unsupported: XX

2.直接跳过即可：
Skip for now
```

### 4.7 各类 API Key（全部跳过）

```
1.以下全部：
-GOOGLE_PLACES_API_KEY
-GEMINI_API_KEY
-NOTION_API_KEY
-OPENAI_API_KEY
-ELEVENLABS_API_KEY

2.原因：
本地 Ollama 不依赖任何云 API
```

### 4.8 Hooks(重点)

1-推荐选择：

```
session-memory
```

2-说明

|      选项      | 是否推荐 |     原因     |
| :------------: | :------: | :----------: |
|      Skip      |  不推荐  |   无上下文   |
| session-memory |   推荐   | 保持对话记忆 |
| command-logger |  不推荐  |    没必要    |
|    boot-md     |  不推荐  |   进阶功能   |

## 五 启动完成

```
http://127.0.0.1:18789
```

## 六 参考

* [开发者社区/OpenClaw保姆级部署](https://developer.aliyun.com/article/1716721)
* [openclaw.ai官网](https://openclaw.ai/)


