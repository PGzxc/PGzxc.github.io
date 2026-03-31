---
title: VPN网络服务之——一键部署Xray+Reality(6)
categories:
  - 工具
  - 网络工具
  - VPN
tags:
  - VPN
  - Xray
  - Reality
abbrlink: 170751b4
date: 2026-03-31 15:27:38
---
## 一 概述

```
完成后你可以：

 -一条命令搭好代理服务器
 -自动生成节点信息
 -直接导入 Clash 使用
 -无需手动改配置
```

<!--more-->

## 二 为什么需要“一键部署”？

### 2.1 手动部署流程

```
- 安装 Xray
- 生成 UUID
- 生成 Reality Key
- 写 JSON 配置
- 开端口
```

### 2.2 问题

```
-容易出错
-步骤多
-新手容易劝退
```

### 2.3 结论

```
用脚本自动完成所有步骤
```

## 三 一键部署

### 3.1 方式1：官方/社区脚本(最简单)

```
1. 执行以下命令（在 VPS 上）

bash <(curl -Ls https://raw.githubusercontent.com/233boy/Xray/main/install.sh)

2.运行后你会看到菜单：
-安装 Xray
-配置 VLESS + Reality
-查看节点

3. 新手按顺序：1 → 2 → 3

4. 最终你会得到(这就是你的“节点链接”)：
VLESS://xxxx@你的IP:443?type=tcp&security=reality...
```

### 3.2 手动一键脚本(极简版)—想完全可控(推荐开发者)

```
1. 创建脚本：
nano install_xray.sh

2. 粘贴：

#!/bin/bash

echo "🚀 安装 Xray..."
bash <(curl -Ls https://github.com/XTLS/Xray-install/raw/main/install-release.sh)

echo "🔑 生成 UUID..."
UUID=$(cat /proc/sys/kernel/random/uuid)

echo "🔐 生成 Reality Key..."
KEY=$(xray x25519 | grep "Private key" | awk '{print $3}')
PUB=$(xray x25519 | grep "Public key" | awk '{print $3}')

echo "⚙️ 写入配置..."

cat > /usr/local/etc/xray/config.json <<EOF
{
  "inbounds": [{
    "port": 443,
    "protocol": "vless",
    "settings": {
      "clients": [{"id": "$UUID"}],
      "decryption": "none"
    },
    "streamSettings": {
      "network": "tcp",
      "security": "reality",
      "realitySettings": {
        "dest": "www.cloudflare.com:443",
        "serverNames": ["www.cloudflare.com"],
        "privateKey": "$KEY",
        "shortIds": ["12345678"]
      }
    }
  }],
  "outbounds": [{"protocol": "freedom"}]
}
EOF

echo "🔥 开端口..."
ufw allow 443

echo "▶️ 启动服务..."
systemctl restart xray
systemctl enable xray

echo "================================="
echo "🎉 安装完成！"
echo "IP: $(curl -s ifconfig.me)"
echo "UUID: $UUID"
echo "PublicKey: $PUB"
echo "端口: 443"
echo "================================="

3. 执行：

chmod +x install_xray.sh
./install_xray.sh
```

### 3.3 导入到 Clash

```
方法一：手动填配置:用上一章 YAML
方法二：URL 转 Clash:使用在线转换工具
```

### 3.4 验证是否成功

```
1. Clash 打开代理
2.浏览器访问：https://www.google.com
3.命令行：curl ip.sb
4.返回 VPS IP = 成功 
```

### 3.5 一键部署 vs 手动部署(对比)

|   方式   |      优点       | 缺点 |
| :------: | :-------------: | :--: |
|   手动   |      可控       | 复杂 |
| 一键脚本 |       快        | 黑盒 |
|   推荐   | 脚本 + 理解原理 |      |

## 四 进阶

### 4.1 进阶优化

```
1.更换伪装域名
-配置："serverNames": ["www.cloudflare.com"]
-可换：microsoft.com或apple.com

2.多用户支持：
"clients": [
  {"id": "uuid1"},
  {"id": "uuid2"}
]

3.多端口：
port: 443 / 8443 / 2053
```

### 4.2 安全建议

```
1.建议
-使用 Reality
-不暴露端口列表
-定期更换 UUID

2.不要做：
- 公共分享节点
- 使用弱协议
```

## 五 总结

```
一键脚本 = 提升效率神器
Reality = 当前最佳方案
你已经可以独立搭建整套系统
```

