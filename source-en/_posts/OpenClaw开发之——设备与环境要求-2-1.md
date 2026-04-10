---
title: OpenClaw开发之——设备与环境要求(2.1)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: 45d7c62e
date: 2026-04-10 10:12:57
---
## 一 概述

```
本文介绍：
 1.设备与环境要求
 2.必备凭证与工具
 3.基础工具安装(全系统通用，必做)
```

<!--more-->

## 二 设备与环境要求

无论是云端还是本地部署，内存是核心硬性要求，低于4GB会导致服务启动失败，各部署方式具体要求如下：

|     部署方式     |         最低配置          |                           推荐配置                           |                     系统要求                     |                     核心依赖                     |
| :--------------: | :-----------------------: | :----------------------------------------------------------: | :----------------------------------------------: | :----------------------------------------------: |
| 阿里云轻量服务器 | 2vCPU+2GiB内存+40GiB ESSD | 个人：2vCPU+4GiB内存+40GiB ESSD；<br>企业：4vCPU+8GiB内存+80GiB ESSD | Ubuntu 22.04 LTS、Alibaba Cloud Linux 3.2104 LTS |            阿里云百炼API密钥、Docker             |
|  Windows11本地   |  4GiB内存+20GiB磁盘空间   |                    8GiB内存+30GiB磁盘空间                    |                  Windows11 64位                  | Node.js≥v22.0.0、Python≥3.9、Git、Docker Desktop |
|    MacOS本地     |  4GiB内存+20GiB磁盘空间   |                    8GiB内存+30GiB磁盘空间                    |         MacOS 12及以上(M系列/Intel芯片)          |      Homebrew、Node.js≥v22.0.0、Git、Docker      |
|    Linux本地     |  4GiB内存+20GiB磁盘空间   |                    8GiB内存+30GiB磁盘空间                    |                Ubuntu 22.04+ 64位                |  curl、Git、Python≥3.9、Node.js≥v22.0.0、Docker  |

## 三 必备凭证与工具

```
1.核心凭证：
-阿里云账号(注册阿里云账号，完成实名认证，用于服务器购买与百炼API开通)、
-阿里云百炼Coding Plan API Key(格式为sk-sp-xxxxx，新用户可领90天免费额度)及专属Base URL；

2.辅助工具：
-SSH远程工具（FinalShell，用于阿里云服务器登录）、
-系统终端（Windows11：PowerShell管理员模式；MacOS/Linux：原生终端）、
-文本编辑器（VS Code、记事本、Nano）、
-加密记事本（存储API Key、Token等敏感凭证）；

3.可选工具：
-飞书/钉钉/Telegram账号（多渠道控制用）、
-Ollama（本地模型部署用）、
-GitHub账号（自定义技能安装用）。
```

## 四 基础工具安装(全系统通用，必做)

### 4.1 说明

```
基础工具是部署OpenClaw的前提，所有命令可直接复制执行，避免手动安装出错：
```

### 4.2 基础工具

```
# 1. 安装Node.js（推荐v22+，确保兼容性，避免版本过低导致部署失败）
# Windows11（PowerShell，管理员模式）
winget install OpenJS.NodeJS.LTS --version 22.2.0 -y

# MacOS（终端）
brew install node@22
echo 'export PATH="/usr/local/opt/node@22/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Linux/Ubuntu（终端）
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 2. 验证Node.js版本（显示v22+即为成功）
node -v

# 3. 安装核心工具（Git、pnpm，技能管理与依赖安装必备）
# Windows11
winget install Git.Git -y
npm install -g pnpm

# MacOS/Linux
brew install git  # MacOS
sudo apt install git -y  # Linux
npm install -g pnpm

# 4. 安装Docker（容器化部署必备，官方推荐，稳定性更强）
# Windows11：下载Docker Desktop并安装，开启“以管理员身份运行”（官网：https://www.docker.com/products/docker-desktop/）
# MacOS
brew install docker --cask
open -a Docker  # 启动Docker

# Linux/Ubuntu
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
sudo systemctl start docker
sudo systemctl enable docker

# 5. 配置npm国内镜像，加速依赖下载（解决国内下载缓慢、超时问题）
npm config set registry https://registry.npmmirror.com
pnpm config set registry https://registry.npmmirror.com

# 6. 验证工具安装（显示版本号即为成功）
git --version && pnpm --version && docker --version
```

### 4.3 注意事项

```
npm安装完成后，若终端提示“openclaw: command not found”，
是因为npm全局安装目录未添加到系统PATH，
需手动将路径添加到~/.zshrc（MacOS/Linux）或系统环境变量（Windows11）；

MacOS M系列芯片用户，若安装失败，执行arch -arm64 brew install node@22，指定ARM架构安装依赖。
```

## 五 参考

* [开发者社区/OpenClaw保姆级部署](https://developer.aliyun.com/article/1716721)