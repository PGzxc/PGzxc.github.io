---
title: VPN网络服务之——Xray从安装到配置(3)
categories:
  - 工具
  - 网络工具
  - VPN
tags:
  - VPN
  - Xray
abbrlink: 1564a6f
date: 2026-03-31 15:25:31
---
## 一 概述

```
本文介绍：
 - Xray相关概念
 - Xray配置流程
```

<!--more-->

## 二 Xray相关概念

### 2.1 Xray 是什么？

```
Xray = 代理服务器核心程序（负责加密 + 转发）
```

### 2.2 它在整个架构中的位置

```
你的电脑
   ↓
Clash（客户端）
   ↓
Xray（服务器）
   ↓
互联网
```

### 2.3 为什么选择 VLESS + Reality

1-推荐组合

|  技术   |     作用      |
| :-----: | :-----------: |
|  VLESS  |   轻量协议    |
| Reality | 伪装 + 抗封锁 |

2-优点：

```
- 不需要证书
- 隐蔽性强（像正常 HTTPS）
- 抗封锁能力强
```

## 三 Xray配置流程

### 3.1 安装 Xray

```
1. 在 VPS 执行：

bash <(curl -Ls https://github.com/XTLS/Xray-install/raw/main/install-release.sh)

2. 安装完成后验证：
xray version
```

### 3.2 生成必要参数

```
1. 生成 UUID
cat /proc/sys/kernel/random/uuid

输出类似：
a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx

保存下来（后面要用）

2.生成 Reality 密钥
xray x25519

输出：
Private key: xxx
Public key: xxx

保存：
PrivateKey（服务端用）
PublicKey（客户端用）
```

### 3.3 配置 Xray

1-配置文件

```
1.编辑配置文件：
nano /usr/local/etc/xray/config.json

2.粘贴以下配置（最小可用版）
{
  "inbounds": [
    {
      "port": 443,
      "protocol": "vless",
      "settings": {
        "clients": [
          {
            "id": "这里填你的UUID"
          }
        ],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "show": false,
          "dest": "www.cloudflare.com:443",
          "xver": 0,
          "serverNames": [
            "www.cloudflare.com"
          ],
          "privateKey": "这里填PrivateKey",
          "shortIds": [
            "12345678"
          ]
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom"
    }
  ]
}
```

2-必须修改的 3 个地方

|    项目    |   替换内容    |
| :--------: | :-----------: |
|    UUID    |   你生成的    |
| privateKey | Reality 私钥  |
|  shortIds  | 随便写（8位） |

### 3.4 放行端口

```
ufw allow 443
```

### 3.5 启动 Xray

```
1.启动指令：
systemctl restart xray
systemctl enable xray

2.查看状态：
systemctl status xray

3.看到：
active (running) 说明成功
```

### 3.6 客户端连接信息(需要记住)

```
你现在有这些参数：

IP：你的服务器IP
端口：443
UUID：刚生成的
协议：VLESS
加密：Reality
PublicKey：刚生成的
SNI：www.cloudflare.com
```

### 3.7 测试是否成功(服务器侧)

```
journalctl -u xray -f

如果有连接日志，说明正常
```

## 四 新手最常见错误

### 4.1 错误1：UUID 写错

```
结果：无法连接
```

### 4.2 错误2：端口没开

```
结果：连接超时
```

### 4.3 错误3：Reality key 填错

```
结果：握手失败
```

### 4.4 错误4：端口被占用

```
lsof -i:443
```

