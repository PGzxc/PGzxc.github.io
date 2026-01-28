---
title: AI开发之——Clawdbot指南
categories:
  - 开发
  - R-AI开发助手
  - Clawdbot
tags:
  - Clawdbot
abbrlink: 44232a48
date: 2026-01-28 08:43:15
---
## 一 概述

```
Clawdbot 是一个开源、本地优先的个人 AI 助手(MIT 许可，GitHub 星标已超 55k)，
核心理念是“把 Claude/GPT/Grok 等大模型装进你自己的设备里”，
让你通过日常聊天软件(Telegram、Discord等)来指挥它做事，而不是只聊天。
它强调隐私(数据不上传云端)、全本地运行、可扩展技能(Skills)，最接近"私人 Jarvis"的开源方案。
```

<!--more-->

## 二 介绍

### 2.1 本质

```
一个运行在你设备上的 AI 代理网关(Gateway)，支持多通道、多代理、持久记忆、工具调用
```

### 2.2 核心卖点

```
1、跨平台聊天控制：
在 Telegram / WhatsApp / Discord 等发消息，它就执行任务。

2、强大工具集：
浏览器控制(自动下单、查票、填表)、本地文件读写、运行 shell 脚本、操作智能家居、
Gmail 自动分类/回复、订机票酒店、语音唤醒、Live Canvas 视觉工作区、Cron 定时任务等。

3、模型支持：
Claude Opus 4.5（推荐）、GPT、Grok、Ollama 本地模型。

4、可扩展：
Skills 平台(社区插件，如 Polymarket 交易、Todoist 自动化、WHOOP 数据拉取等)，
AI 还能自己写/改技能。

5、隐私与控制：
全本地运行，数据不离设备，支持 Docker 沙箱隔离非主会话。
```

### 2.3 典型场景

```
早报推送(天气+日程+邮件摘要)、自动退订垃圾邮件、手机远程操控电脑、自主交易、生成自定义冥想音频等
```

### 2.4 局限

```
需要一台常开设备(Mac mini 或 VPS 最流行)，权限一旦开放风险高。
```

## 三 下载安装(Mac / Win / Linux)

### 3.1 支持平台

```
macOS、Linux、Windows(强烈推荐用 WSL2)
```

### 3.2 安装

```
1、最简单一键安装(推荐，自动装 Node.js ≥22)
curl -fsSL https://clawd.bot/install.sh | bash

2、手动
npm install -g clawdbot@latest   # 或 pnpm / bun
clawdbot onboard --install-daemon   # 启动向导，安装 Gateway 为系统服务（macOS launchd / Linux systemd）
```

### 3.3 Windows 用户

```
1、安装说明
-先装 WSL2（Ubuntu 推荐）。
-在 WSL 终端运行上面命令。
-避免直接 Windows 终端（兼容性差）。

2、从源码开发
git clone https://github.com/clawdbot/clawdbot.git
cd clawdbot
pnpm install
pnpm ui:build
pnpm build
pnpm clawdbot onboard --install-daemon

安装后运行 clawdbot doctor 检查配置健康
```

## 四 配置 API Key

### 4.1 配置文件

```
配置主要在 ~/.clawdbot/clawdbot.json(安装后自动生成)，向导会引导大部分
```

### 4.2 步骤

```
1.运行 clawdbot onboard 或 clawdbot models 进入配置向导。
2.选择/添加模型：
-Anthropic(Claude)：推荐 Opus 4.5。支持 API Key 或 OAuth(Claude Pro/Max)。
在向导输入 ANTHROPIC_API_KEY=sk-ant-xxx。
-OpenAI (GPT)：输入 OPENAI_API_KEY=sk-xxx。
-Grok / xAI：输入 Grok API Key(从 x.ai 获取)
-本地 Ollama：安装 Ollama 后，设置 "model": "ollama/llama3.1:70b" 或自动发现模型。

3.设置默认代理："agent": { "model": "anthropic/claude-opus-4-5" }。
4.支持多模型 failover 和轮换。
5.对于技能(如 GitHub、Gmail)：在 Skills 安装后单独配置对应 Key(向导提示或编辑 config)。
```

### 4.3 示例 config 片段

```
1、配置
{
  "agent": {
    "model": "anthropic/claude-opus-4-5",
    "apiKey": "sk-ant-api03-xxx"
  },
  "ollama": {
    "endpoint": "http://localhost:11434"
  }
}

2、保存后重启 Gateway：
clawdbot gateway restart
```

## 五 使用教程

### 5.1 基本流程

1、启动 Gateway(常驻)

```
clawdbot gateway --port 18789 --verbose   # 后台运行加 nohup 或 systemd

说明：onboard 已设为开机自启
```

2、连接聊天通道(Telegram 最简单)

```
1.Telegram：
用 @BotFather 创建 bot → /newbot → 取 Token → 在 Clawdbot 向导
或 config 的 channels.telegram 填入。

2.WhatsApp/Discord 等：类似，参考 https://docs.clawd.bot/channels
3.完成后，向 bot 发送消息激活。
```

3、日常使用(在聊天软件里发消息)

```
1.直接说任务：
“帮我订明天台北到东京的机票” 或 “总结今天未读邮件”。

2.命令：
/status：查看模型、token、使用量。
/new 或 /reset：新会话。
/think high：深度思考。
/compact：压缩上下文。
/verbose on：详细输出。

3.多会话：用 /sessions_list 管理。
```

4、高级

```
-装 Skills：clawdbot skills install <name> 或从 ClawdHub。
-语音唤醒：macOS/iOS 伴侣 App。
-Canvas：视觉界面操作。
```

### 5.2 Telegram 快速上手(社区最常用)

```
1、@BotFather 创建 bot，复制 Token。
2、在 Clawdbot config 加：
JSON"channels": {
  "telegram": { "token": "你的Token" }
}
3、重启 → 在 Telegram 搜 bot → 开始聊天。
```

## 六 注意事项 & 风险

### 6.1 安全第一

```
-默认 DM 策略：pairing(陌生人需配对码)，用 clawdbot pairing approve 批准。
-用 allowFrom 白名单限制访问（别用 "*"）。
-非主会话工具跑 Docker 沙箱（main 会话有主机权限）。
-关闭 /elevated 除非必要（shell 命令风险高）。
-浏览器/文件/通知等权限需手动授权(macOS TCC)。
```

### 6.2 隐私

```
数据本地，但 API 调用会发给 Claude/OpenAI 等(内容可能被厂商看到)。
```

### 6.3 风险

```
给 bot 权限后，它能删文件、跑恶意脚本、泄露敏感信息。
很多人踩坑：过度授权导致电脑被搞乱或钱包被刷。
```

### 6.4 常见坑

```
-Node.js 版本太低 → 升级到 ≥22。
-Windows 直装兼容差 → 用 WSL。
-模型 token 超限 → 用 /compact 或换模型。
-常开机：Mac mini 或 VPS(Zeabur/AWS 等)最稳。
```

### 6.5 建议

```
先小范围测试(只连 Telegram，只读权限)，跑 clawdbot doctor 检查，
阅读 https://docs.clawd.bot/gateway/security。
```

## 七 图示

### 7.1 安装

| ![][1] | ![][2] |
| ------ | ------ |
| ![][3] |        |

### 7.2 配置

| ![][4]  | ![][5]  | ![][6] |
| ------- | ------- | ------ |
| ![][7]  | ![][8]  | ![][9] |
| ![][10] | ![][11] |        |

### 7.3 运行

![][12]
![][13] 






[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-clawdbot1-13.png