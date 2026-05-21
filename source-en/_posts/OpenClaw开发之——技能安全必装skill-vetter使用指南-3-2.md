---
title: OpenClaw开发之——技能安全必装skill-vetter使用指南(3.2)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: c5bed71
date: 2026-05-21 07:53:37
---
## 一 概述

```
本文介绍：
-安全技能skill-vetter
-其安装、使用和定期维护方法。
```

<!--more-->

## 二 skill-vetter

### 2.1 说明

```
在安装任何第三方技能之前，强烈建议先安装安全扫描器 skill-vetter。

它是 OpenClaw 官方推荐的“技能安全卫士”，
可有效检测技能是否存在恶意行为、后门或过度权限。
```

### 2.2 安装与启用

```
1.安装clawhub
npm install -g clawhub

2.查看clawhub是否Ok
clawhub --version

3.安装skill-vetter
npx clawhub install skill-vetter

4.安装完成后验证
openclaw skills list
手动查有没有：skill-vetter
```

## 三 使用方法

### 3.1 扫描所有已安装技能

```
# 推荐命令：全面扫描
openclaw skills check
```

### 3.2 查看所有技能状态(强烈推荐先跑)

```
openclaw skills list
openclaw skills list --eligible
```

### 3.3 扫描指定技能

```
1.扫描/审查具体技能
openclaw skills info feishu

2.如果 feishu 是插件/技能名：
openclaw skills info feishu-doc
openclaw skills info feishu_chat
```

### 3.4 开启自动扫描(待验证)

```
# 每天自动扫描一次（推荐）
openclaw scheduler create --name "daily-skill-vet" --cron "0 9 * * *" --command "openclaw skill vet all"
```

## 四 扫描结果说明

```
Safe：安全可正常使用
Warning：存在可疑权限，建议审查
Danger：检测到高危行为，强烈建议卸载
```

