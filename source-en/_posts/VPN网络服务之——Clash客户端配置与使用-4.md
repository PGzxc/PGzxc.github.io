---
title: VPN网络服务之——Clash客户端配置与使用(4)
categories:
  - 工具
  - 网络工具
  - VPN
tags:
  - VPN
  - Clash
abbrlink: 78d7b4bf
date: 2026-03-31 15:26:09
---
## 一 概述

```
完成后可以：
 -浏览器正常访问外网
 -Git / Docker 走代理
 -国内外自动分流
 -一键开关代理
```

<!--more-->

## 二 Clash 是什么？

### 2.1 它的作用

```
- 管理代理节点（你刚搭的 Xray）
- 控制流量走向
- 实现分流（国内直连 / 国外代理）
```

### 2.2 在架构中的位置

```
你的应用（浏览器 / Git / App）
   ↓
Clash（本地）
   ↓
Xray（VPS）
   ↓
互联网
```

### 2.3  一句话

```
Clash = 本地代理控制中心
```

## 三 安装 Clash

### 3.1 Windows(推荐)

```
推荐客户端：

- Clash Verge（现代 UI）
- Clash for Windows（经典）
```

### 3.2 Mac

```
ClashX
```

### 3.3 Android

```
Clash Meta
```

### 3.4 iOS

```
Shadowrocket（付费）
```

## 四 Clash使用步骤

### 4.1 添加你的第一个节点—手动配置(推荐理解原理)

1-Clash 核心概念

```
1. 本地代理端口-默认(所有流量都会走这里)：

HTTP：7890
SOCKS：7891

2. 配置文件（最重要）—Clash 一切靠这个：

proxies:
rules:
proxy-groups:
```

2-创建配置文件 `config.yaml`

```
port: 7890
socks-port: 7891
allow-lan: true
mode: rule

proxies:
  - name: my-vps
    type: vless
    server: 你的服务器IP
    port: 443
    uuid: 你的UUID
    network: tcp
    tls: false
    udp: true
    flow: ""
    servername: www.cloudflare.com
    reality-opts:
      public-key: 你的PublicKey
      short-id: "12345678"

proxy-groups:
  - name: Proxy
    type: select
    proxies:
      - my-vps

rules:
  - DOMAIN-SUFFIX,google.com,Proxy
  - DOMAIN-SUFFIX,github.com,Proxy
  - GEOIP,CN,DIRECT
  - MATCH,Proxy
```

3-必须替换

|    项目    |     内容     |
| :--------: | :----------: |
|   server   |    VPS IP    |
|    uuid    |  你的 UUID   |
| public-key | Reality 公钥 |

### 4.2 导入配置到 Clash

```
1. 操作步骤：

 -打开 Clash
 -Profiles（配置）
 -Import（导入）
 -选择 config.yaml

2. 成功后：

 -能看到节点
 -能选择 Proxy
```

### 4.3 开启代理

```
1.  打开开关：
System Proxy → ON

2. 现在你的流量路径：
浏览器 → Clash → VPS → 外网
```

### 4.4 测试是否成功

```
方法1：浏览器
访问：https://www.google.com

方法2：命令行
curl ip.sb
返回 VPS IP = 成功
```

## 五 Clash进阶

### 5.1 分流规则

1-什么是分流？

```
不同网站走不同路径
```

2-推荐规则(通用)

```
rules:
  - GEOIP,CN,DIRECT
  - MATCH,Proxy
```

3-效果

|   流量   | 路径 |
| :------: | :--: |
| 国内网站 | 直连 |
| 国外网站 | 代理 |

4-进阶规则

```
- DOMAIN-SUFFIX,openai.com,Proxy
- DOMAIN-SUFFIX,bilibili.com,DIRECT
```

### 5.2 模式选择

1-Clash 三种模式

|  模式  |       说明       |
| :----: | :--------------: |
|  rule  | 自动分流（推荐） |
| global |    全部走代理    |
| direct |     不走代理     |

2-新手建议

```
使用：rule 模式
```

### 5.3 开发者必用(CLI 代理)

```
1- 让命令行走代理
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890

2- 现在：
- git clone 
- npm install 
- docker pull 
```

## 六 常见问题

### 6.1 打不开网页

```
原因：

- 节点配置错
- Clash 没开 System Proxy
```

### 6.2 能连但很慢

```
原因：

- VPS 地区远
- 带宽不足
```

### 6.3 部分网站打不开

```
原因：

- 分流规则问题
```

## 七 总结

```
1. Clash = 本地控制器
2. Xray = 远程核心
3. YAML 配置 = 灵魂
4. 分流规则 = 体验关键
```

