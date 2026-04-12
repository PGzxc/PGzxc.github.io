---
title: OpenClaw开发之——阿里云Docker Compose部署(2.3)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: b6de83d8
date: 2026-04-12 09:26:29
---
## 一 概述

```
本文介绍：
 -阿里云Docker Compose部署
```

<!--more-->

## 二 Docker Compose部署介绍

```
遵循容器化部署最佳实践，通过Docker Compose实现环境隔离、数据持久化与快速升级，

适配企业级生产需求，稳定性更强，适合长期运行。
```

## 三 阿里云Docker Compose部署

### 3.1 基础环境配置（SSH远程连接服务器）

```
# 1. 登录服务器（替换为你的公网IP）
ssh root@你的服务器公网IP

# 2. 安装Docker与Docker Compose（若已安装可跳过）
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
sudo apt install docker-compose-plugin -y
sudo systemctl start docker && sudo systemctl enable docker

# 3. 验证Docker安装（显示版本号即为成功）
docker --version && docker compose version
```

### 3.2 创建配置与启动服务

```
# 1. 创建项目目录（用于存储配置、日志与数据，实现持久化）
mkdir -p /opt/openclaw && cd /opt/openclaw

# 2. 编写docker-compose.yml文件（直接复制，无需修改）
cat > docker-compose.yml << EOF
version: "3.8"
services:
  openclaw:
    image: openclaw/openclaw:2026-latest  # 2026最新稳定版镜像
    container_name: openclaw
    ports:
      - "18789:18789"  # 映射核心端口
    volumes:
      - openclaw-data:/root/.openclaw  # 配置与数据持久化
      - /var/log/openclaw:/var/log/openclaw  # 日志持久化
      - /tmp:/tmp  # 挂载临时目录，支持文件操作
    restart: unless-stopped  # 异常自动重启
    command: ["openclaw", "gateway", "run"]
    network_mode: bridge
    environment:
      - TZ=Asia/Shanghai  # 时区设置（避免时间异常）
      - GATEWAY_MODE=remote  # 支持远程访问
      - GATEWAY_BIND=0.0.0.0:18789
volumes:
  openclaw-data:
EOF

# 3. 启动容器（后台运行）
docker compose up -d

# 4. 初始化配置（设置访问令牌，替换为你的高强度密码）
docker compose exec openclaw openclaw config set gateway.auth.token "your-secret-token"

# 5. 查看日志，确认启动成功（无报错即为正常）
docker compose logs -f
```

### 3.3 安全加固(可选，企业用户必做)

```
1.在阿里云控制台“安全组”中，将18789端口访问来源限制为企业内网IP或个人常用IP，避免恶意访问；

2.定期更新Docker镜像，执行如下修复安全漏洞。
docker pull openclaw/openclaw:2026-latest && docker compose restart openclaw，
```


## 四 参考

* [开发者社区/OpenClaw保姆级部署](https://developer.aliyun.com/article/1716721)


