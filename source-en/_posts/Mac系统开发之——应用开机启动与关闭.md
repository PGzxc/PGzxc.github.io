---
title: Mac系统开发之——应用开机启动与关闭
categories:
  - 系统
  - Mac
tags:
  - Mac
abbrlink: 52ec3cb9
date: 2025-11-23 18:52:30
---
## 一 概述

```
本文介绍：Mac上应用开机自启动打开或关闭设置：
1.系统设置里直接开关(macOS Sonoma/Sequoia)
2.应用内部设置关闭(很多 App 自带开关)
3.Dock 图标右键一键开启/关闭
4.老版本 macOS(Catalina 及以前)操作方式
5.终端强制禁止自启动
```

 <!--more-->

## 二 最推荐——系统设置里直接开关(macOS Sonoma/Sequoia)

### 2.1 路径

```
 → 系统设置 → 通用 → 登录项（Login Items）
```

### 2.2 类型

```
1、启动时打开（Open at Login）
-开机后会自动弹出应用窗口
-如：网易云音乐、Typora

2、允许在后台运行（Allow in Background）
-应用会常驻后台
-如：微信、QQ、百度网盘
```

### 2.3 操作

```
禁止开机启动：选中 → 点“-”删除 或 关闭右侧开关
开启开机启动：把应用拖进列表 即可
这是管理自启动最干净、最稳定的方法。
```

## 三 应用内部设置关闭(很多 App 自带开关)

### 3.1 常见路径示例

|            应用            |               自启设置路径               |
| :------------------------: | :--------------------------------------: |
|            微信            |    设置 → 通用 → “启动时自动开启微信”    |
|             QQ             | 设置 → 基本设置 → “登录后设为启动时运行” |
|         网易云音乐         |       设置 → 工具 → “开机自动启动”       |
| 钉钉 / 企业微信 / 腾讯会议 |          设置 → 通用 → 开机启动          |
|    VS Code / iTerm2 等     |  Preferences → General → Open at Login   |

### 3.2 说明

```
如果系统设置里删不掉，它往往在 App 内部默认开启。记得 双处检查。
```

## 四 最快捷——Dock 图标右键一键开启/关闭

```
只要应用固定在 Dock：
右键图标 → 选项 → 勾选/取消 “启动时打开”
速度最快，最方便。
```

## 五 老版本 macOS（Catalina 及以前）操作方式

```
1、路径：
 → 系统偏好设置 → 用户与群组 → 登录项

2、操作(和现在一样)：
+ 添加
- 移除
```

## 六 高级/顽固软件——终端强制禁止自启动

### 6.1 说明

```
如果某些应用关了还会自己加回来（典型如：微信、百度网盘），可以用 launchctl 彻底封杀。
禁止开机自启动（把下面命令复制到终端）
```

### 6.2 示例

```
1、示例（先按需改名字）：

launchctl disable gui/$(id -u)/com.tencent.xinWeChat       # 微信
launchctl disable gui/$(id -u)/com.tencent.qq              # QQ
launchctl disable gui/$(id -u)/com.tencent.wetype          # 企业微信
launchctl disable gui/$(id -u)/com.laiwang.DingTalk        # 钉钉
launchctl disable gui/$(id -u)/com.netease.163music        # 网易云音乐
launchctl disable gui/$(id -u)/com.baidu.BaiduNetdisk-mac  # 百度网盘

2、恢复开机自启动：
launchctl enable gui/$(id -u)/xxx

3、查看所有自启动项：
launchctl list | grep -v com.apple
```

## 七 借助三方应用

```
1、AppCleaner（免费）：可以列出 App 的所有启动项

2、CleanMyMac（付费）
提供 启动项 管理界面，可一键关闭：
-登录项
-LaunchAgents
-Cron Jobs
-Safari Extensions
```


