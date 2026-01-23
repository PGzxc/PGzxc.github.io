---
title: React Native开发之——Expo Orbit
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: aba8b685
date: 2025-12-23 08:44:06
---
## 一 什么是Expo Orbit？

```
Expo Orbit 是 Expo 官方提供的 本地设备管理工具(Device Manager)，用于管理开发时的真机与模拟器。
它是 伴随 Expo CLI 自动安装 并在电脑本地运行的图形化工具。

它的作用类似：
-Android Studio 的 Device Manager
-Xcode 的 Devices
-但专门为 Expo + React Native 优化
-并完全围绕 expo start/expo run/dev-client 流程设计

换句话说：Orbit 是 Expo 的原生设备控制中心。
```

<!--more-->

## 二 Expo Orbit 的主要功能

### 2.1 自动检测所有设备(Android / iOS / Web)

```
Orbit 会自动列出：
-Android 模拟器(AVD)
-iOS 模拟器(Mac)
-已连接的 iPhone 真机
-已连接的 Android 真机
-Web 端(Chrome/Safari)

你可以直接点击运行。
```

### 2.2 一键启动模拟器

```
不需要打开 Android Studio / Xcode：
-1键启动 Pixel 设备
-1键打开 iOS 模拟器(iPhone 14/iPad 等)

也可以关闭设备或切换设备
```

### 2.3 一键安装 Expo Go / Dev Client

```
Orbit 可以：
-在模拟器上自动安装 Expo Go
-在模拟器或真机上安装 Dev Client (.apk/.ipa)

无需手动拖拽安装，非常方便。
```

### 2.4 进程与调试工具

```
Orbit 中能看到：
-当前运行的 Expo 项目
-Metro Bundler 状态
-是否连上模拟器
-Device logs（设备日志）

相当于把 CLI 信息 GUI 化了。
```

### 2.5 与 VS Code 插件联动(Expo Tools)

```
如果你安装了：

✔ Expo Tools（VS Code 插件）
✔ Expo CLI (SDK 50+)

VS Code 会直接调用 Orbit 来选择设备。
```

## 三 Expo Orbit 出现的理由(为什么要用它?)

### 3.1 以前 Expo 开发流程很繁琐

```
Android 模拟器要开 Android Studio
iOS 模拟器要开 Xcode
Expo Go 的安装经常不稳定
多设备来回切换不方便
```

### 3.2 Orbit 提供了一个统一界面(提升 Expo 开发体验)

```
不需要再打开 Android Studio / Xcode
点一下即可运行设备
自动匹配 Expo 项目
可以帮你安装 Dev Client
```

## 四 如何打开 Expo Orbit？

### 4.1 方法 1：自动弹出

```
运行：npx expo start
Orbit 会自动弹出。
```

### 4.2 方法 2：手动启动

```
在命令行执行：npx expo orbit
```

### 4.3 方法 3：VS Code 调用

```
按：Ctrl + Shift + P → Expo: Start development server 
VS Code 的 Expo Tools 会打开 Orbit 并展示设备。
```

## 五 Orbit 的安装

```
Orbit 是 Expo CLI SDK 50+ 版本自动集成 的。
确认版本：npx expo --version

如果 ≥ 7.x，已内置 Orbit。
```

## 六 使用示例

```
1、启动你的 Expo 项目：
npx expo start


2、Orbit 界面会出现，里面会显示：
-Android Emulator
-iOS Simulator
-Connected Devices
-Run in Web Browser

你只需点一个设备即可。
```

## 七 常见问题

### 7.1 Orbit 显示 “No devices found”

```
解决：
-Android：确保你安装了 AVD
-iOS：确保 Mac 上安装 Xcode
-USB 连接手机时打开开发者模式
```

### 7.2 Orbit 不自动打开

```
手动启动：npx expo orbit
```

### 7.3 Orbit 无法安装 Expo Go

```
运行：adb devices
检查安卓设备是否连接成功。
```

### 7.4  Orbit 和 Expo Go/Dev Client 的关系？

```
Orbit = 管理设备
Expo Go = 用于运行Expo app
Dev Client = 自定义原生模块时替代 Expo Go

Orbit 会帮你安装这两个东西。
```

