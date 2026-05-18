---
title: OpenClaw开发之——卸载(2.13)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: f39ab5ed
date: 2026-05-18 08:52:05
---
## 一 概述

```
本文介绍：
 - 一键卸载命令
 - 手动卸载步骤
```

<!--more-->

## 二 一键卸载命令

```
# 先备份重要数据（强烈建议！）
copy "%USERPROFILE%\.openclaw\workspace" "%USERPROFILE%\Desktop\OpenClaw_Backup" /E /I

# 执行卸载
openclaw uninstall --all --yes --non-interactive
```

## 三 手动卸载步骤

### 3.1 停止并卸载服务

```
openclaw gateway stop
openclaw gateway uninstall
```

### 3.2 删除核心目录(Windows)

```
rmdir /s /q "%USERPROFILE%\.openclaw"
# 如果有旧目录也清理
rmdir /s /q "%USERPROFILE%\.clawdbot"
```

### 3.3 卸载全局 npm 包(如果通过 npm 安装)

```
npm uninstall -g openclaw
# 或 pnpm
pnpm remove -g openclaw
```

### 3.4 Windows 额外清理(安装包方式)

```
1.打开 设置 → 应用 → 应用和功能
2.搜索 “OpenClaw” 或 “AutoClaw”
3.点击卸载
```

### 3.5 彻底清理残留(安全考虑)

```
1.删除可能残留的旧配置文件：%USERPROFILE%\.openclaw-*
2.检查任务计划程序（Task Scheduler），删除 OpenClaw 相关任务
3.重启电脑后再次检查
```

### 3.6 macOS 用户额外命令

```
rm -rf ~/.openclaw
rm -rf /Applications/OpenClaw.app
launchctl bootout gui/$UID/bot.molt.gateway   # 如果有服务残留
```

## 四 更新/卸载后常见问题处理

```
1.更新后出现配置错误(如 compaction 键无效)：直接运行 openclaw doctor --fix
2.卸载后仍有残留命令：检查环境变量 PATH，手动删除 openclaw 可执行文件路径
3.想保留技能/记忆但清理其他：只备份 ~/.openclaw/workspace 和 openclaw.json，卸载后再重新安装
4.安全提醒：
OpenClaw 曾因技能 vet 不彻底出现争议，
卸载前建议先运行 openclaw skills vet --all 确认无风险，再备份后卸载
```

## 五 最佳实践

```
更新前备份 ~/.openclaw 整个文件夹
生产环境建议使用 --channel stable
定期更新可通过 cron 任务实现(但卸载时需先删除相关 cron)
```

