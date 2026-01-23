---
title: React Native开发之——Expo打包平台(1)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: fd8681a1
date: 2025-09-09 09:08:29
---
## 一 概述

```
本文介绍：React Native Expo 打包各个平台的包
 -Managed Workflow(托管工作流) —> 使用Expo官方的EAS(Expo Application Services)来打包 iOS/Android
 -Bare Workflow(裸工作流) —> 和传统 React Native 项目类似，
  需要自己接管原生代码，用 Xcode / Android Studio 或 CI/CD 来打包
```

<!--more-->

## 二 准备工作

```
1、注册Expo账号：https://expo.dev/accounts
2、创建Expo项目
```

## 三 各平台打包

### 3.1  Android 打包

####  使用 EAS Build

```
1、# 登录 Expo
npx expo login

2、# 初始化 EAS
npx expo install eas-cli
npx eas build:configure

3、# 构建 APK 或 AAB
npx eas build -p android --profile preview   # 测试 APK
npx eas build -p android --profile production # 正式 AAB

4、说明
--profile 配置在 eas.json 里，可以控制是否上传 Google Play。
默认产物在 Expo Cloud，你可以下载 .apk 或 .aab。
```

####  离线打包 (Bare workflow)

```
cd android
./gradlew assembleRelease   # 生成 APK
./gradlew bundleRelease     # 生成 AAB
```

### 3.2 iOS 打包(iOS 需要 Mac + Xcode 环境，需付费账号)

####  使用 EAS Build(推荐）

```
1、指令
npx eas build -p ios --profile preview    # 测试包
npx eas build -p ios --profile production # 上架 App Store

2、说明
 需要 Apple 开发者账号，会自动帮你处理 Provisioning Profile 和 Certificate。
 构建结果会生成 .ipa。
```

####  Bare workflow (手动打包)

```
cd ios
pod install
open YourApp.xcworkspace   # 用 Xcode 打开
# 在 Xcode -> Product -> Archive -> Export IPA
```

### 3.3  Web 平台打包

```
1、Expo 支持导出 Web 版（PWA）
npx expo export:web

2、说明
会在 web-build/ 下生成静态网站文件，可以直接部署到 Netlify、Vercel、Nginx 等服务器
```

### 3.4  Windows / macOS 桌面端

```
Expo 官方没有直接支持 Windows/macOS 桌面端，但可以：
 借助 react-native-windows 和 react-native-macos（Bare workflow）来打包
 或者配合 Electron / Tauri 打包 Web 版本成桌面端
```

## 四 总结

|     平台      |              托管 (Managed)               |       裸项目 (Bare)       |
| :-----------: | :---------------------------------------: | :-----------------------: |
|    Android    |     `eas build -p android` → APK/AAB      | ./gradlew assembleRelease |
|      iOS      |         `eas build -p ios` → IPA          |    Xcode Archive 导出     |
|      Web      |       `expo export:web` → 静态站点        |           同上            |
| Windows/macOS | 不直接支持，用 RN-Windows/Mac 或 Electron |           同左            |

