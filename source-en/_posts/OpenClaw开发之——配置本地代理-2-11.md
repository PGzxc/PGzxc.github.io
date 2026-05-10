---
title: OpenClaw开发之——配置本地代理(2.11)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: 2be5c8f7
date: 2026-05-10 08:00:56
---
## 一 概述

```
本文介绍：
 -为何需要配置代理
 -如何在 Windows / macOS / Linux 上为 OpenClaw 配置本地代理
 -支持主流代理软件：Clash、Clash Verge、v2rayN、Shadowsocks、Hiddify

OpenClaw 主要通过环境变量 HTTP_PROXY / HTTPS_PROXY 实现代理，支持 HTTP 和 SOCKS5 协议。
```

<!--more-->

## 二 为何走代理

```
使用 Grok API（xAI）时频繁出现 LLM request timed out，最常见原因是国内网络直连不稳定。
配置本地代理后，OpenClaw 的所有对外请求(Grok/Gemini/Telegram等)均走代理，可显著提升连接稳定性与成功率。

推荐配置方式：创建 ~/.openclaw/.env 文件（对前台、后台、pm2、systemd 均生效）。
```

## 三 配置方式

### 3.1 创建 .env 配置文件(三平台通用第一步)

```
1、Windows(PowerShell)：
PowerShellmkdir -Force "$env:USERPROFILE\.openclaw"
notepad "$env:USERPROFILE\.openclaw\.env"

2、macOS / Linux：
Bashmkdir -p ~/.openclaw
nano ~/.openclaw/.env
```

### 3.2 .env 文件内容(按你的代理软件选择对应段落)

```
# ====================== 代理软件配置 ======================

# 1. Clash / Clash Verge（默认端口）
HTTP_PROXY=http://127.0.0.1:7890
HTTPS_PROXY=http://127.0.0.1:7890

# 2. v2rayN（推荐使用 Mixed HTTP 端口）
# HTTP_PROXY=http://127.0.0.1:10809
# HTTPS_PROXY=http://127.0.0.1:10809

# 3. Shadowsocks（常见端口）
# HTTP_PROXY=http://127.0.0.1:7890
# HTTPS_PROXY=http://127.0.0.1:7890
# 或 SOCKS5
# HTTP_PROXY=socks5://127.0.0.1:1080
# HTTPS_PROXY=socks5://127.0.0.1:1080

# 4. Hiddify（默认端口通常为 12345 或 1080，请在 Hiddify 设置中查看）
# HTTP_PROXY=http://127.0.0.1:12345
# HTTPS_PROXY=http://127.0.0.1:12345

# ====================== 重要排除本地请求 ======================
NO_PROXY=localhost,127.0.0.1,::1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.local

# 可根据需要添加更多排除域名
# NO_PROXY=localhost,127.0.0.1,::1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.local,api.x.ai


提示：同一时间只保留一组 HTTP_PROXY / HTTPS_PROXY，把其他行用 # 注释掉。
```

### 3.3 macOS / Linux 用户额外推荐(可选)

如果你希望只在 OpenClaw 运行时生效，也可以在启动命令前临时设置：

```
Bashexport HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
export NO_PROXY=localhost,127.0.0.1,::1

openclaw gateway start --daemon
```

## 四 重启 Gateway 让配置生效

```
1.所有平台统一命令
openclaw gateway restart

2.如果使用 pm2 启动，建议加上 --update-env：
Bashpm2 restart openclaw-gateway --update-env
```

## 五 验证代理是否生效

```
1.查看详细状态（检查环境变量是否加载）
openclaw gateway status --verbose

2.测试 Grok 是否正常通过代理连接
openclaw chat "你好，请确认当前是否通过本地代理连接网络，并简单介绍一下自己"
```

## 六 进阶建议(推荐最终模型配置)

### 6.1 执行以下命令，采用 本地优先 + Grok 后备 策略，同时提升超时时间

```
openclaw config set agents.defaults.timeoutSeconds 1500 --strict-json
openclaw config set agents.defaults.model.primary "ollama/qwen3:latest" --strict-json
openclaw config set agents.defaults.model.fallbacks '["xai/grok-4.20-0309-non-reasoning"]' --strict-json
openclaw gateway restart
```

### 6.2 检查结果

```
完成以上配置后，请运行如下配置得到输出可以确认代理是否成功加载以及进一步优化。
openclaw gateway status --verbose

这样就得到了一个跨平台、多代理软件、结构清晰、实用性强的最终版指南。
```

