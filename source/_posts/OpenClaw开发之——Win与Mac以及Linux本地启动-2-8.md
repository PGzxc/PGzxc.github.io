---
title: OpenClaw开发之——Win与Mac以及Linux本地启动(2.8)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: ea3cef72
date: 2026-04-21 08:28:36
---
## 一 概述

```
本文介绍：
 -已经完成配置(openclaw onboard/init)
 -常用启动方式
 -常驻启动(开机自启)
```

<!--more-->

## 二 启动方式

### 2.1 推荐启动方式(通用)

```
# 前台启动（适合调试）
openclaw gateway start

# 后台启动（推荐）
openclaw gateway start --daemon
```

### 2.2 验证是否启动成功

```
1.执行指令
openclaw gateway status

2.成功输出示例
Gateway is running
Listening on: http://127.0.0.1:18789
Version: 2026.x.x
Connected channels: Telegram, Feishu...
Uptime: 2m 34s

3.浏览器访问
http://127.0.0.1:18789
```


### 2.3 其他常用启动/管理命令

```
openclaw gateway restart # 重启（配置修改后常用）
openclaw gateway stop # 停止
openclaw gateway logs --follow # 查看日志（实时看龙虾在干什么）
openclaw gateway status --verbose # 查看详细状态（包括内存、模型、连接的通道）
```

## 三 开机自启动(常驻运行)

### 3.1 使用于

```
NAS
服务器
本地长期运行 AI Agent
```

### 3.2 macOS / Linux(systemd)

```
1.前提：onboard 时使用了 --install-daemon
systemctl --user enable --now openclaw-gateway

2.常用 systemd 命令
systemctl --user status openclaw-gateway
systemctl --user restart openclaw-gateway
systemctl --user stop openclaw-gateway

3.适用系统：
-macOS（部分环境）
-Ubuntu / Debian / CentOS
```

### 3.2 Windows 启动方式

```
Windows 不使用 systemd，推荐以下方式：

方式一：任务计划程序（推荐）

步骤：
1. 打开：任务计划程序
2. 创建基本任务
3. 触发器：开机启动
4. 操作：启动程序
5. 程序填写：
   openclaw
6. 参数填写：
   gateway start --daemon

方式二：启动文件夹
Win + R → shell:startup
创建 .bat 文件：
openclaw gateway start --daemon
```

### 3.3 通用方案(强烈推荐)——PM2

```
一、适用于：
-Windows/Mac/Linux 全平台
-最稳定

二、步骤
2.1-安装 PM2
npm install -g pm2

2.2-启动 OpenClaw
pm2 start $(which openclaw) --name "openclaw-gateway" -- gateway start --daemon

Windows(PowerShell)：
pm2 start openclaw --name "openclaw-gateway" -- gateway start --daemon

2.3-设置开机自启
pm2 startup
pm2 save

三、常用 PM2 命令
pm2 list
pm2 logs openclaw-gateway
pm2 restart openclaw-gateway
pm2 stop openclaw-gateway
```

