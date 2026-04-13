---
title: OpenClaw开发之——Win11本地部署(2.4)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: faa52884
date: 2026-04-13 09:23:48
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
1.硬件：Windows11 64位、8GB+内存、20GB+可用空间
2.软件：powershell 或 npm
3.已安装ollama
4.注意事项：关闭第三方杀毒软件（避免误删文件）
```

## 三 部署过程(npm安装)

### 3.1 安装OpenClaw

```
npm i -g openclaw
```

### 3.2 启动龙虾

```
openclaw onboard

注意：打开管理员 PowerShell，执行
```

## 四 相关配置

### 4.1 安全提醒和确认

```
1.提醒
I understand this is personal-by-default and shared/multi-user use requires lock-down. Continue?

2.操作：
移动上下键选择Yes并回车
```

### 4.2 引导模式(Onboarding Mode)

```
一：可供选择：
1.快速模式(QuickStart)：后续可通过openclaw configure补充配置
2.手动操作(Manual)：配置(端口、网络、Tailscale、认证选项)

二、如何操作
本文选择快速模式，并回车

三、选择快速模式后
-Gateway port:18789
-Gateway bind:Loopback(127.0.0.1)
-Gateway auth:Token(default)
-Tailscale exposure: Off
-Direct to chat channels.
```

### 4.3 Model/auth provider

```
1.选项
-OpenAI(Codex OAuth +API key)
-Anthropic
-Chutes
-Moonshot AI(kimi K2.5)
-Google
-xAI(Grok)
-Mistral AI
-Volcano Engine
-BytePlus
-OpenRouter
-Kilo Gateway
-Qwen
-Z.AI
-Qianfan
-Alibaba Cloud Model Studio
-Copilot
-Vercel AI Gateway
-OpenCode
-Xiaomi
-Synthetic
-Gogether AI
-Hugging Face
-Venice AI
-LiteLLM
-Cloudflare AI Gateway
-Custom Provider
-Ollama
-SGLang
-vLLM
-Skip for now

2.如何选择
-如何要求精确可以选择国外大模型，但是注意费用
-国内用户可以尝试国产大模型
-自己部署的可以尝试Ollama
-本文选择Ollama本地部署

3.Model/auth provider
Ollama

4.Ollama base URL
http://127.0.0.1:11434

5.Ollama mode(本文选择Local)
-Cloud+Local
-Local

6.开始下载模型
glm-4.7-flash

7.设置默认模型
Default model:ollama/glm-4.7-flash
```

### 4.4 选择通知Channel(本文选择飞书)

```
1.Select channel
 -Telegram
 -WhatsApp
 -Discord
 ....
 Feishu/Lark(飞书)
 Skip for now 
 
2.安装飞书插件(已安装openclaw/feishu，选择Use local plugin path)
 -Download form npm(@openclaw/feishu)
 -Use local plugin path
 
 
3.创建飞书凭证
-打开飞书开放平台：open.feishu.cn
-创建app并发布
-控制台依次填入App ID和App Secret

4.飞书连接model
-WebSocket(默认)
-Webhook

5.飞书域名
-Feishu(feishu.cn)-大陆
-Lark(larksuite.com)-海外/国际

6.机器人在飞书群聊里的响应规则(Group chat policy)-本文选择Open -response

只想让机器人在指定几个群里说话
—>选 Allowlist-only respond in specific groups

想让机器人所有群都能 @唤醒，但不主动乱说话
—>选 Open - respond in all groups(requires mention)

机器人只在私聊用，群里完全不搭理
—>选 Disabled - don't respond in groups
```

### 4.5 联网搜索提供商(Search provider)

```
1.说明：
用来让 AI 回答时能查最新信息、网页内容、实时数据

2.可供选择
-Brave Search
-Gemini
-Grok
-Kimi
-Perplexity Search
-Skip for now

3.如何选择？
 由于选择本地Ollama，本次选择skip for now?
 如果想开启联网搜索：
  -国内能用、稳定优先 → Kimi
  -海外环境、追求精准 → Perplexity Search / Brave Search
  -想用 Gemini/Grok 能力 → 对应选 Gemini / Gro
```

### 4.6 Skills状态(Skills status)

```
Eligible:10(有 10 个插件 / 功能满足条件，可以用)
Missing requirements:38(38 个功能缺依赖、缺 API、没配置，暂时用不了)
Unsupported on this OS:8(8 个功能你当前系统不支持)
Blocked by allowlist:0(没有被白名单限制)
```

### 4.7 Configure skills now?

```
1-Install missing skill dependencies
-Skip for now
-lpassword
-blogwatcher
-blucli
-camsnap
-clawhub
-eightctl
-gemini
...

2.如何选择？
-这些技能都是各种插件、工具、外部服务（控制摄像头、博客监控、调用 Gemini 等）
-飞书 + 本地 Ollama，一个额外技能都不需要
- Skip for now → 跳过，直接进入主程序
```

### 4.8 Set GOOGLE_PLACES_API_KEY for goplaces?

```
1.说明
-这是谷歌地图地点查询的插件，和你本地 Ollama + 飞书机器人完全无关
-不填不影响聊天、问答功能
-填了反而要去申请 API key，多此一举

2.如何选择
-直接选 跳过/No，不用设置
```

### 4.9 Set GEMINI_API_KEY for nano-banana-pro?

```
1.说明
-这是给 Gemini 谷歌模型 用的 API Key
-你用的是 本地 Ollama，跟 Gemini 没关系
-填了也用不上，还多一步配置

2.如何选择
-同样选 跳过 / No，不用填
```

### 4.10 Set NOTION_API_KEY for notion?

```
1.说明
-这是用来对接 Notion 笔记的技能
-你只用到飞书 + 本地 Ollama，完全用不到 Notion
-不填不影响机器人正常聊天回复

2.如何选择
-还是选 跳过 / Skip，不用填
```

### 4.11 Set OPENAI_API_KEY for openai-image-gen?

```
1.说明
-这是 OpenAI 画图（DALL・E）用的 API key
-你用的是本地 Ollama，跟 OpenAI 无关
-不填完全不影响机器人正常对话

2.如何选择
-直接选 Skip / 跳过，不用填
```

### 4.12 Set OPENAI_API_KEY for openai-shisper-api?

```
1.说明
-这个是 OpenAI 的语音识别（Whisper）用的
-你现在只跑本地 Ollama + 飞书文字对话，完全用不上
-不填不影响任何核心功能

2.如何选择
-照样选 Skip / 跳过。
```

### 4.13 Set ELEVENLABS_API_KEY for sag?

```
1.说明
-ElevenLabs 是语音合成工具
-你只用到飞书文字对话 + 本地 Ollama，不需要语音
-不填完全不影响机器人运行

2.如何选择
-Skip，直接跳过
```

### 4.14 Hooks

```
Enable hooks?
-Skip for now：跳过所有钩子
-boot-md：启动时加载 markdown 脚本
-bootstrap-extra-files：加载额外配置文件
-command-logger：记录所有命令日志
-session-memory：开启对话上下文记忆	
```

如何选择

|         选项          |           含义           | 是否需要选 |                         原因                         |
| :-------------------: | :----------------------: | :--------: | :--------------------------------------------------: |
|     Skip for now      |       跳过所有钩子       |    不选    |                 少了对话记忆，体验差                 |
|        boot-md        | 启动时加载 markdown 脚本 |    不选    |                新手用不上，纯进阶功能                |
| bootstrap-extra-files |     加载额外配置文件     |    不选    |            你只需要基础配置，无需额外文件            |
|    command-logger     |     记录所有命令日志     |    不选    |               自用场景没必要，还占存储               |
|    session-memory     |    开启对话上下文记忆    |    必选    | 让机器人记住你之前说的话，聊天有上下文，不然答非所问 |

## 五 启动完成

```
http://127.0.0.1:18789
```

## 六 参考

* [开发者社区/OpenClaw保姆级部署](https://developer.aliyun.com/article/1716721)
* [openclaw.ai官网](https://openclaw.ai/)


