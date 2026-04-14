---
title: OpenClaw开发之——Mac本地部署(2.5)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: 3637f3c8
date: 2026-04-14 09:23:09
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
 -macOS（Intel / Apple Silicon M1/M2/M3）
 -8GB+ 内存（建议16GB）
 -20GB+ 可用空间

2.软件：
 -终端（Terminal / iTerm2）
 -Node.js（npm）

3.已安装：
 -Ollama（本地大模型运行环境）

4.注意事项：
 -首次运行可能需要授予终端权限（文件访问 / 网络）
 -关闭 Gatekeeper 限制（必要时）
 
5.推荐工具
-iTerm2（更好用的终端）
-Ollama（本地模型）
```

## 三 部署过程(npm安装)

### 3.1 安装OpenClaw

```
npm i -g openclaw

如果报权限错误（常见）：
sudo npm i -g openclaw
```

### 3.2 启动 OpenClaw(龙虾)

```
openclaw onboard

Mac 注意：
-不需要管理员 PowerShell
-使用普通终端即可
-如端口占用，可换端口
```

## 四 相关配置

### 4.1 安全提醒和确认

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

### 4.3 Model / Provider 配置

```
1.推荐选择：
Ollama

2.Ollama 配置
Base URL:http://127.0.0.1:11434
Mode:Local

3.下载模型（推荐）
ollama run llama3
ollama run glm-4.7-flash(注意内存不足，需要32G)

设置默认模型：ollama/llama3
```

### 4.4 选择通知Channel(本文选择飞书)

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

