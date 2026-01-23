---
title: React Native开发之——调试应用
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: 5b649436
date: 2025-12-25 08:21:45
---
## 一 概述

```
本文介绍：
-React Native + Expo 项目中，如何进行 Debug 调试。
-适用：Expo Go、Expo Dev Client、裸项目、iOS/Android/WEB
```

<!--more-->

## 二 最推荐方式：使用 Expo DevTools(网页调试界面)

### 2.1 步骤

```
1、启动项目后会自动打开
npx expo start

2、浏览器会自动打开 DevTools，也可以手动访问
http://localhost:8081或项目终端显示的 DevTools 地址。
```

### 2.2  功能

```
打开 JS Debugger(调试JS代码)
查看日志
检查网络请求
项目重载/重新构建
切换平台(iOS/Android)
```

## 三 JS 代码调试(最常用)

Expo 提供 3 种方式

### 3.1 使用 Expo Tools → Debug with Chrome(经典)

```
1、在 Expo DevTools 中点击
JS Debugging → Open JS Debugger

2、它会在 Chrome DevTools 打开一个调试工具，你能：
-下断点（Breakpoints）
-查看变量（Scope）
-查看网络请求（Network）
-查看 console.log 输出

注意：调试器已经不再使用 Remote JS，而是使用 Metro + JSI 的新架构，更快更稳定。
```

### 3.2 使用 Expo Tools → Debug with React DevTools

```
1、调试 React UI、组件状态：
npx expo start --devtools

2、然后在浏览器点击：Open React DevTools(可以查看：)
-组件树
-state、props
-性能（Profiler）
-UI 更新
```

### 3.3 使用 Flipper(更专业)

```
1、支持：
-网络请求查看
-Layout Inspector
-性能监控
-Crash 日志

2、安装：
brew install --cask flipper

3、说明
Expo Dev Client 或裸 React Native 都支持。
```

## 四 Expo Go/真机调试(iOS / Android)

```
Expo Go 自动连接调试:

1、运行：
npx expo start

2、打开手机 Expo Go 扫二维码。

3、手机摇一摇 → Developer Menu：
-Toggle Fast Refresh
-Show Performance Monitor
-Open JS Debugger
-Reload
```

## 五 调试 Android 原生(需要 Dev Client)

```
1、Expo Go 不能调试原生模块，因此需要：

npx expo prebuild
npx expo run:android

2、然后才能使用：
-Android Studio Logcat
-原生断点
-Flipper
```

## 六 调试 iOS 原生(需要 Dev Client)

```
1、先生成 Dev Client
npx expo run:ios

2、在 Xcode 中可使用：
-breakpoint
-查看 native logs
-调试原生模块
```

## 七 调试网络请求(非常常用)

```
Expo 内置支持网络监控：
方式 1：Chrome DevTools → Network
方式 2：Flipper → Network
方式 3：使用第三方：
npm i @react-native-community/netinfo
或者：
npm i reactotron-react-native
```

## 八 调试 UI(布局)

```
Expo Developer Menu → Show Inspector

功能类似 React Native 官方布局调试：
-查看 Flex 布局
-点击元素显示位置
-查看 padding/margin
```

## 九  总结：最常用 Debug 流程

|     目的     |            推荐 Debug 方式             |
| :----------: | :------------------------------------: |
| 调试 JS 逻辑 |         Chrome/Firebase/VSCode         |
|  看组件状态  |             React DevTools             |
|   网络请求   |        Chrome Network / Flipper        |
| UI布局、Flex |             Expo Inspector             |
|   原生调试   | Expo Dev Client + Xcode/Android Studio |
|   性能分析   |   Flipper + React DevTools Profiler    |

