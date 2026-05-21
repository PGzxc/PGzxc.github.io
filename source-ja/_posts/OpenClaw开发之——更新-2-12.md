---
title: OpenClaw开发之——更新(2.12)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: cc697c08
date: 2026-05-17 08:11:57
---
## 一 概述

```
本文介绍：
 -检查当前版本
 -更新
```

<!--more-->

## 二 检查当前版本

### 2.1 查看当前版本(Powershell)

```
openclaw --version
```

### 2.2 运行诊断

```
openclaw doctor
```

## 三 更新

### 3.1 最简单推荐命令

```
1.执行指令：
openclaw update

2.说明：
-检测你的安装类型(npm/git/安装包)
-下载最新稳定版
-执行 openclaw doctor --fix
-重启 gateway
```

### 3.2 进阶更新命令

```
openclaw update --channel stable     # 稳定版（默认）
openclaw update --channel beta       # 测试版
openclaw update --channel dev        # 开发版
openclaw update --dry-run            # 只预览，不实际更新


如果是通过 npm 全局安装
npm install -g openclaw@latest
# 或指定版本
npm install -g openclaw@2026.3.13
```

### 3.3 更新完成后，建议立即执行

```
openclaw doctor --fix
openclaw gateway restart
```

