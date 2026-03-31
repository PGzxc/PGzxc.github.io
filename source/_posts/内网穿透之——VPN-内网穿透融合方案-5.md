---
title: 内网穿透之——VPN+内网穿透融合方案(5)
categories:
  - 工具
  - 网络工具
  - 内网穿透
tags:
  - 内网穿透
abbrlink: f9e2bea4
date: 2026-03-31 16:13:11
---
## 一 概述

```
完成后可以：

 -不再依赖单一 frp 暴露端口
 -建立“私有加密网络”
 -远程访问像在同一局域网
 -大幅提升安全性
```

<!--more-->

## 二 方案及架构

### 2.1 核心思想

```
一、传统 frp：

1.思想：公网 → VPS → 内网服务（暴露端口）

2.问题：
-端口暴露
-可能被扫描
-安全依赖 token

二、VPN + frp：

1.思想：设备 → VPN（加密内网）→ VPS → 内网

2.优点：
-先“加密成局域网”
-再做穿透
-更安全
```

### 2.2 VPN 方案选择(使用 WireGuard)

```
为什么选它？

-极简配置
-内核级性能
-延迟低
-比 OpenVPN 快很多
```

### 2.3 整体架构

```
1.架构

手机 / 电脑
      ↓
WireGuard VPN
      ↓
虚拟局域网（10.0.0.x）
      ↓
frp / 内网服务
      ↓
NAS / 家庭设备


2.本质：
 把“互联网”变成“局域网”
```

## 三 实施步骤

### 3.1 第1步：搭建 WireGuard(VPS)

```
一、安装
apt update
apt install wireguard -y

二、生成密钥

wg genkey | tee privatekey | wg pubkey > publickey

三、配置服务端

nano /etc/wireguard/wg0.conf

示例：

[Interface]
Address = 10.10.0.1/24
ListenPort = 51820
PrivateKey = VPS_PRIVATE_KEY

PostUp = iptables -A FORWARD -i wg0 -j ACCEPT
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT

四、启动 VPN

wg-quick up wg0
```

### 3.2 第2步：客户端配置(手机/NAS)

```
1.配置

[Interface]
PrivateKey = CLIENT_PRIVATE_KEY
Address = 10.10.0.2/24

[Peer]
PublicKey = VPS_PUBLIC_KEY
Endpoint = VPS_IP:51820
AllowedIPs = 10.10.0.0/24
PersistentKeepalive = 25

2. 成功后：
客户端 ↔ VPS VPN 内网互通
```

### 3.3 第3步：frp 改造(关键升级)

```
1. 以前：
frp 直接暴露公网

2. 现在：
frp 只在 VPN 内运行

3.frpc 修改：
server_addr = 10.10.0.1
server_port = 7000

4.变化：
-不再用公网 IP
-只走 VPN 内网
```

### 3.4 最终访问方式变化

```
1.原来：
公网IP:8080 → NAS

2.现在：
VPN内网IP:8080 → NAS

3.更安全：
-外网看不到端口
-只允许 VPN 用户访问
```

### 3.5 安全性提升对比

|    方案     | 安全性 |
| :---------: | :----: |
|   纯 frp    | 2颗星  |
| frp + token | 3颗星  |
|  VPN + frp  | 5颗星  |

## 四 典型应用场景

### 4.1 家庭 NAS(强烈推荐)

```
手机 → VPN → NAS
```

### 4.2 远程办公

```
公司设备 → VPN → 内网系统
```

### 4.3 开发环境

```
本地 → VPN → 测试服务器
```

## 五 进阶架构

### 5.1 组合方案

```
WireGuard + frp
```

### 5.2 功能

```
-VPN 内网访问
-代理外网流量
-内网穿透备用
```

## 六 常见问题

### 6.1 VPN 连不上

```
原因：

- 端口没开 51820
- IP 转发没开
- key 写错
```

### 6.2 frp 不通

```
原因：

- server_addr 写错（应为 VPN IP）
```

### 6.3 速度慢

```
原因：

- VPS 距离
- UDP 被限制
```

## 七 总结

### 7.1 本篇核心

```
1.VPN = 私有局域网
互联网 → 变局域网


2.frp = 服务暴露工具
局域网 → 外部访问入口


3.组合 = 最强方案
VPN（安全） + frp（灵活）
```

### 7.2 一句话总结

```
frp 负责“通道”，VPN 负责“安全边界”
```

