---
title: IOS开发之——Xcode打开不显示模拟器设备
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 44cd6884
date: 2026-01-11 10:03:28
---
## 一 概述

```
本文介绍：
 -最常见原因(90% 都在这里)
 -进阶原因(偏工程&底层)
 -极端但真实的坑
```

<!--more-->

## 二 最常见原因(90% 都在这里)

### 2.1 Scheme 选成了Generic iOS Device

```
1、表现
-顶部运行目标只看到：Any iOS Device(arm64)/Generic iOS Device
-没有任何模拟器

2、解决
Xcode 顶部 —> Scheme 下拉→ 选择 iPhone 15/iPhone 14 Pro 等 Simulator
```

### 2.2  没安装模拟器运行时(Simulator Runtime)

```
1、检查
Xcode → Settings(或 Preferences)
→ Platforms
→ iOS

2、看有没有类似：
iOS 17.x Simulator x 未安装
iOS 18.x Simulator x 未安装

3、解决
-点 Download 安装
-安装完成后 重启 Xcode

4、注意：
Xcode 本体 ≠ 模拟器运行时，是两个东西
```

### 2.3 当前工程不支持 Simulator 架构

```
1、常见于
-纯 arm64 配置
-三方静态库只支持真机
-C/C++ / FFmpeg / OpenCV 项目

2、检查
Target → Build Settings
→ Architectures
→ Excluded Architectures

3、如果看到
Any iOS Simulator SDK → arm64
那 模拟器直接被你排除了

4、解决(Apple Silicon Mac)
Excluded Architectures
Any iOS Simulator SDK → x 清空

或者明确支持：
Architectures = Standard Architectures (arm64, x86_64)
```

## 三 进阶原因(偏工程&底层)

### 3.1 Deployment Target 太高/不匹配

```
1、例如
项目设置 iOS 18.0
但你只装了 iOS 17.x Simulator

2、解决
降低 Deployment Target或安装对应版本 Simulator

3、路径：
Target → General → Minimum Deployments
```

### 3.2 Scheme 被设置成「真机 Only」

```
1、检查
Product → Scheme → Edit Scheme→ Run → Info
2、确认：
-Build Configuration = Debug
-Destination = iOS Simulator（不是 iOS Device）
```

### 3.3 Xcode / Simulator 进程异常(非常常见)

```
1、直接重置：
# 关闭 Xcode 后执行
killall Simulator
killall com.apple.CoreSimulator.CoreSimulatorService

2、然后：
重开 Xcode
再开 Simulator（⌘ + ⇧ + S）
```

## 四 极端但真实的坑

### 4.1 Command Line Tools 指向错误 Xcode

```
1、表现
-模拟器装了
-Xcode 里死活不显示

2、检查
xcode-select -p

如果不是你当前 Xcode 路径：
sudo xcode-select --switch /Applications/Xcode.app
```

### 4.2 Xcode 版本太新/项目太老(或反过来)

```
1、例如
-老项目+Xcode 16
-老Pod/Carthage/手写脚本

2、快速验证
-新建一个 空白 iOS App
-看是否能选模拟器

新工程正常 → 项目配置问题
新工程也不行 → Xcode/系统问题
```

