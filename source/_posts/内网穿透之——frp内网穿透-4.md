---
title: 内网穿透之——frp内网穿透(4)
categories:
  - 工具
  - 网络工具
  - 内网穿透
tags:
  - 内网穿透
  - frp
abbrlink: 2249875e
date: 2026-03-31 16:12:39
---
## 一 概述

```
完成后可以：

 -公网访问你家 NAS
 -远程访问本地 Web 服务
 -不需要公网 IP
 -完整掌握 frp 架构
```

<!--more-->

## 二 准备工作

### 2.1 整体架构

```
1.结构：

内网设备（NAS / 电脑）
        ↓
frpc（客户端）
        ↓
VPS（frps 服务端）
        ↓
   公网访问
  
2.本质：
内网主动连接 VPS → VPS 提供访问入口
```

### 2.2 准备工作

```
-一台 VPS（推荐你之前用的 DMIT）
-一台内网设备（NAS / 电脑）
-能 SSH 登录 VPS
```

## 三 部署

### 3.1 服务端部署(VPS)

```
1、下载 frp

wget https://github.com/fatedier/frp/releases/latest/download/frp_0.51.3_linux_amd64.tar.gz
tar -zxvf frp_0.51.3_linux_amd64.tar.gz
cd frp_0.51.3_linux_amd64


2、配置 frps（服务端）
文件：nano frps.ini
填入：
[common]
bind_port = 7000

3、启动 frps

./frps -c frps.ini
后台运行（推荐）：
nohup ./frps -c frps.ini &

4、开放端口
ufw allow 7000
```

### 3.2 客户端部署(NAS / 本地电脑)

```
1、下载 frp
（和 VPS 一样）

2、配置 frpc

nano frpc.ini
示例：映射 NAS Web（80端口）

[common]
server_addr = VPS-IP
server_port = 7000

[nas]
type = tcp
local_ip = 127.0.0.1
local_port = 80
remote_port = 8080

含义：访问 VPS:8080 → 访问 NAS:80

3、启动客户端

./frpc -c frpc.ini
```

### 3.3 测试是否成功

```
1、在浏览器访问：
http://你的VPS-IP:8080

2、如果看到 NAS 页面：
 成功
```

## 四 常见应用场景

### 4.1 NAS 远程访问

```
公网 → VPS → NAS
```

### 4.2 本地 Web 开发

```
localhost:3000 → 公网访问
```

### 4.3 远程管理后台

```
VPS:8081 → 内网管理系统
```

## 五 进阶

### 5.1 多个服务映射

1-配置

```
[web]
type = tcp
local_port = 80
remote_port = 8080

[ssh]
type = tcp
local_port = 22
remote_port = 2222
```

2- 效果

| 公网端口 | 内网服务 |
| :------: | :------: |
|   8080   |   Web    |
|   2222   |   SSH    |

### 5.2 HTTP 域名访问

```
1、示例：

[web]
type = http
local_port = 80
custom_domains = yourdomain.com

2、实现：

https://yourdomain.com → NAS

需要：
- 域名解析到 VPS
- frps 开 http_port
```

### 5.3 安全优化

```
1、设置 token

frps.ini：
token = abc123
 
frpc.ini：
token = abc123

防止别人连接你服务器

2、限制端口：
ufw allow 7000
ufw allow 8080
```

## 六 常见问题

### 6.1 访问失败

```
原因：

- frps 没启动
- 端口没开
- IP 写错
```

### 6.2 页面打不开

```
原因：

- local_port 错误
- 服务没启动
```

### 6.3 很慢

```
原因：

- VPS 带宽
- 距离远
```

## 七 总结

### 7.1 现在的能力

```
-完整搭建内网穿透
-能公网访问 NAS
-能映射任意服务
-理解穿透原理
```

### 7.2 最终架构总结

```
内网设备（NAS）
        ↓
       frpc
        ↓
    VPS（frps）
        ↓
     公网访问
```

### 7.3 本篇总结

```
-frp = 自建穿透核心
-frpc 主动连接 VPS
-VPS 提供公网入口
```

