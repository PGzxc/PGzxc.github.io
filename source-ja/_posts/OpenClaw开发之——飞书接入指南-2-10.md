---
title: OpenClaw开发之——飞书接入指南(2.10)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: adeb3d47
date: 2026-04-27 08:50:10
---
## 一 概述

```
本文介绍如何将 OpenClaw 与飞书(Feish /Lark)完成双向实时通信接入。

主要内容：
 -为何选择飞书作为国内通信通道
 -前提条件
 -完整配置步骤（2026 年最新长连接方案）
 -测试与验证方法
```

<!--more-->

## 二 为何选择飞书

### 2.1 优势总结

```
2026 年最新版 OpenClaw 采用官方插件 + 飞书开放平台长连接模式，是国内用户最友好的接入方式：

-无需公网 IP、无需 ngrok 或反向代理
-基于 WebSocket 长连接，双向实时通信，延迟低、稳定高
-原生支持私聊、群聊（@提及回复）、流式输出
-可深度调用飞书文档、多维表格、任务、日历、卡片交互等能力（官方插件已全面支持）
```

### 2.2 功能亮点

```
-支持私聊与群聊（可设置仅@机器人时响应，避免刷屏）
-支持流式回复（打字机效果）
-可操作飞书云文档、多维表格、任务列表等企业级能力
```

## 三 前提条件

```
1.OpenClaw 已完成初始配置并设置好主模型（推荐本地 Qwen3 或 Grok 等）
2.Gateway 已启动（建议使用 openclaw gateway start --daemon 常驻运行）
3.拥有飞书企业账号（个人版也可使用，但部分权限受限）
```

## 四 配置步骤

### 4.1 步骤1：在飞书开放平台创建机器人

```
1.打开 https://open.feishu.cn/app（国际版使用 open.larksuite.com/app）
2.点击 创建企业自建应用 → 选择 自定义应用
3.填写应用名称（如「我的龙虾助手」）和描述，完成创建
4.左侧菜单 → 应用能力 → 添加 机器人 能力并开启
5.权限管理（最重要）：添加以下权限（建议导入 JSON 批量申请）：
 -im:message
 -im:message:read
 -im:message:send_as_user（可选）
 -文档、多维表格、任务、日历等按需添加

6.凭证与基础信息 → 复制 App ID 和 App Secret（后续需要）
```

### 4.2 步骤2：安装飞书官方插件

```
1.推荐命令安装最新官方插件
openclaw plugins install @openclaw/feishu

2.安装完成后验证
openclaw plugins list
```

### 4.3 步骤3：添加飞书通道

```
1.推荐使用向导配置（最简单）：
Bashopenclaw channels add

2.按提示依次输入：

-选择通道：Feishu / Lark
-粘贴 App ID 和 App Secret
-Domain：选择 feishu（国内）或 lark（国际）
-私聊策略：推荐 pairing（安全，先配对再对话）
-群聊策略：推荐 mention（仅@机器人时回复）

3.手动配置方式（可选）：
Bashopenclaw config edit
在 channels.feishu 下填入：
JSON{
  "enabled": true,
  "appId": "cli_xxxxxxxxxxxxxxxx",
  "appSecret": "xxxxxxxxxxxxxxxxxxxxxxxx",
  "domain": "feishu",
  "dmPolicy": "pairing",
  "groupPolicy": "mention"
}
```

### 4.4 步骤4：配置飞书事件订阅(长连接模式)

```
1.返回飞书开放平台你的应用页面
2.左侧菜单 → 事件与回调
3.订阅方式 选择 使用长连接接收事件（关键！不要选择 HTTP 回调）
4.添加以下事件（建议全选常用事件）：
 -im.message.receive_v1
 -im.message.message_read_v1
 -文档相关、卡片交互等事件

5.点击保存（系统会通过长连接自动连接 OpenClaw，无需填写回调 URL）
```

### 4.5 步骤5：开启配对流程

```
1.在终端执行（将 ZA2FTTME 替换为实际收到的配对码）：
Bashopenclaw pairing approve feishu ZA2FTTME
```

### 4.6 步骤6：重启并验证

```
openclaw gateway restart
openclaw gateway status     # 查看状态
openclaw gateway logs --follow   # 实时看日志
```

## 五 测试通信是否成功

```
一、在飞书内搜索你的机器人并发起私聊：

1.如果是Pairing模式，机器人会发送一个8位配对码，在终端输入openclaw pairing approve [配对码]完成绑定。
2.测试指令示例：
-你好，龙虾在吗？现在几点？
-帮我总结这个群最近 10 条消息
-创建一个云文档，标题叫「OpenClaw 周报」


二、成功后龙虾将实时回复，并支持流式打字效果。
```

