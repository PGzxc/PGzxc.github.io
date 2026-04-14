---
title: new-api开发之——本地部署+局域网访问+接口调用全流程(9)
categories:
  - AI
  - AI模型
  - 聚合平台
  - new-api
tags:
  - new-api
abbrlink: fa39b7b8
date: 2026-04-14 10:28:47
---
## 一 概述

```
本文介绍：
 - 本地部署(win运行new-api纯服务)
 - new-api相关配置
 - new-api相关接口
```

<!--more-->

## 二 本地部署(win运行new-api纯服务)

### 2.1 部署说明

```
new-api官方教程主要是Docker compose部署
作者提供了桌面端服务(安装程序及运行服务)
考虑到Docker文件过大，本文介绍win本地运行new-api服务
```

### 2.2 下载程序(以v0.12.9为例)

```
-下载new-api-v0.12.9.exe(不是New-API-APP Setup 0.12.9.exe安装程序)
-将new-api-v0.12.9.exe放到要运行文件夹
```

### 2.2 启动并运行程序()

```
1.cmd或Powershell执行
.\new-api-v0.12.9.exe -port 3000

2.看到如下输出即成功
Local:   http://localhost:3000
Network: http://192.168.8.139:3000

3.如果有异常或运行中推出，请换个端口(比如3001)
.\new-api-v0.12.9.exe -port 3001
```

### 2.3 放行端口访问(局域网访问必备)

```
管理员 PowerShell 放行防火墙：
netsh advfirewall firewall add rule name="New-API 3000" dir=in action=allow protocol=TCP localport=3000
```

### 2.4 访问地址(端口根据设置访问)

```
本机访问：http://localhost:3000
局域网访问：http://192.168.8.139:3000
首次访问会进入初始化页面，设置管理员账号密码
```

## 三 new-api相关配置-后台配置

### 3.1 登录后台

```
进入 http://localhost:3000 → 登录
```

### 3.2 添加渠道(对接大模型)

1-查看大模型

```
1.如果Ollama已本地部署，通过如下查看
ollama list

2.显示内容
NAME               ID              SIZE      MODIFIED
qwen3.5:4b         2a654d98e6fb    3.4 GB    2 weeks ago
qwen2.5:7b         845dbda0ea48    4.7 GB    2 weeks ago
qwen3:latest       500a1f067a9f    5.2 GB    2 weeks ago
qwen3:8b           500a1f067a9f    5.2 GB    2 weeks ago
llama3:8b          365c0bd3c000    4.7 GB    2 weeks ago
kimi-k2.5:cloud    6d1c3246c608    -         3 weeks ago
```

2-添加渠道并测试

```
一、一般步骤
1.左侧菜单 → 渠道管理 → 添加渠道
2.选择模型类型（OpenAI / Anthropic / 通义千问 / 千帆 等）
3.填写 API Key、代理地址（如有）
4.保存 → 渠道状态显示 正常

二、本地示例(qwen3.5:4b)
1.类型：OpenAI或Ollama
2.渠道名：qwen3.5:4b(同本地模型名)
3.密钥：qwen3.5:4b(同本地模型名)
4.api地址：http://0.0.0.0:11434
5.模型：qwen3.5:4b(输入搜索(搜索不到)并添加)
```

3-测试

```
1.点击已添加渠道，右侧测试
2.打开界面，点击测试
3.显示成功或失败，及所耗时长
```

### 3.3 生成 API KEY/令牌(调用接口必需)

```
一、步骤
1.左侧菜单 → 令牌管理 → 添加令牌
2.绑定用户、设置额度、过期时间
3.复制生成的 Key，类似：sk-xxxxxxxxxxxxxxxxxxxxxxxx

二、示例
1.名称：vip1
2.令牌分组：vip分组
3.过期时间：永不过期
4.生成密钥：sk-b0g7UKp6NpZXfUhTHrBT5MmhvJM6iN2yKn0D9guun143zj1m
```

## 四 接口调用(兼容 OpenAI 格式)

### 4.1 获取可用模型列表

```
1.请求地址:GET http://192.168.8.139:3001/v1/models
2.请求头:Authorization: Bearer sk-b0g7UKp6NpZXfUhTHrBT5MmhvJM6iN2yKn0D9guun143zj1m

3.返回示例:
{
    "data": [
        {
            "id": "llama3:8b",
            "object": "model",
            "created": 1626777600,
            "owned_by": "custom",
            "supported_endpoint_types": [
                "openai"
            ]
        }
    ],
    "object": "list",
    "success": true
}
```

### 4.2 对话接口(Chat Completions)

```
1.请求地址:POST http://192.168.8.139:3001/v1/chat/completions
2.请求头:
Content-Type: application/json
Authorization: Bearer 你生成的sk-xxx

3.请求体:
{
  "model": "qwen3:8b",
  "messages": [
    {"role": "user", "content": "你好"}
  ],
  "stream": false
}
4.返回示例：
{
    "id": "chatcmpl-787",
    "object": "chat.completion",
    "created": 1776133242,
    "model": "qwen3:8b",
    "system_fingerprint": "fp_ollama",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "你好！有什么我可以帮你的吗？无论是解答问题、提供建议，还是只是闲聊，我都很乐意为你服务！😊",
                "reasoning": "好的，用户发来“你好”，我需要以友好和专业的方式回应。首先，要确认用户的需求，可能是测试、寻求帮助，或者只是打招呼。考虑到可能的多种情况，回复应该简洁、亲切，并提供进一步帮助的选项。需要避免过于冗长，同时保持开放性，让用户知道我可以协助他们。另外，保持口语化，避免使用过多专业术语，让交流更自然。同时，注意不要假设用户的具体需求，而是鼓励他们提出具体问题。最后，确保回复符合所有指导原则，保持积极和友好的态度。\n"
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 11,
        "completion_tokens": 152,
        "total_tokens": 163
    }
}

5.流式对话
将 "stream": true 即可使用 SSE 流式返回。
```

## 五 常见配置与问题

### 5.1 更换端口

```
.\new-api-v0.12.9.exe -port 3001
接口地址对应改为 http://IP:3001/v1/xxx
```

### 5.2 局域网仍无法访问

```
大概率是路由器 AP 隔离 导致：
-换手机热点测试
-或关闭路由器「客户端隔离」
```

### 5.3 接口返回 401

```
API Key 错误
Key 未绑定用户或已过期
未加 Bearer 前缀
```

### 5.4 接口返回 500 / 无模型

```
渠道未添加或密钥错误
模型名称填写错误
渠道负载异常
```

