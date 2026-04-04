---
title: CC Switch之——添加New-API(3)
categories:
  - AI
  - AI编程助手
  - CC-Switch
tags:
  - CC-Switch
abbrlink: 465b03a4
date: 2026-04-04 13:58:43
---
## 一 概述

```
本文介绍：
 -CC Switch 添加任意自定义新供应 /中转/第三方 API
 -CC Switch 支持几乎所有兼容 OpenAI 或 Anthropic 格式的 API，非常灵活
```

<!--more-->

## 二 New-API 配置

### 2.1 部署方式Docker

![][1]

### 2.2 相关配置

| 1-令牌管理 | 2-渠道管理 |
| :--------: | :--------: |
|   ![][2]   |   ![][3]   |

说明：

```
1-令牌管理主要为了设置apikey
2-渠道管理：将本地模型映射
```

## 三 在 CC Switch 中添加步骤

### 3.1 点击右上角

```
点击右上角 + 添加供应商。
```

图示

![][4]

### 3.3 添加自定义

```
选择 自定义（Custom）
```

### 3.4 填写以下关键信息

```
1.名称：例如 New-API-MyProvider、SiliconFlow、DeepSeek-New 等。
2.API Key：粘贴你从平台获取的密钥（例如 sk- 开头的）。
4.Base URL：填写该 API 的基础地址，例如：
-OpenAI 兼容：https://api.openai.com/v1 或中转地址 https://api.xxx.com/v1
-Anthropic 兼容：https://api.anthropic.com
-其他常见中转：根据平台文档提供（例如硅基流动、阿里百炼、通义等都有对应 Base URL）。

4.模型：
 填写平台支持的模型 ID（例如 deepseek-r1、qwen-max、claude-3-5-sonnet 等）。
 对于国产模型，常把 Haiku/Sonnet/Opus 都填同一个模型名。
 
5.API 格式：选择对应类型（OpenAI Compatible 最通用，或 Anthropic Messages）。
6.如果平台需要额外 Header 或参数，可在高级设置中添加。
```

图示

| 1-apikey+url | 2-api和模型 | 3-json |
| :----------: | :---------: | :----: |
|    ![][5]    |   ![][6]    | ![][7] |

### 3.5 保存

```
保存后，选中并 启用 该 Provider。
```

### 3.6 保存说明

```
CC Switch 会自动把配置写入对应 CLI 工具的配置文件。
```

### 3.7 测试

```
在终端启动 CLI，查看当前使用的模型是否切换成功。
```

![][8]

说明：

```
由于docker地址较慢，改为localhost地址
-http://host.docker.internal:11434
-http://localhost:11434
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cc-switch-3-1-docker.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cc-switch-3-2-token.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cc-switch-3-3-qudao.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cc-switch-3-4-add.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cc-switch-3-5-config.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cc-switch-3-6-config.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cc-switch-3-7-config.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cc-switch-3-8-resp.png

