---
title: React Native开发之——Expo EAS服务端打包(1)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: 8e93705b
date: 2025-12-26 08:27:21
---
## 一 概述

```
本文介绍：
—EAS 服务端打包
-EAS 服务端打包完整流程
-Android 服务端打包(生成APK)
-iOS 服务端打包(如你需要IPA)
```

<!--more-->

## 二 EAS 服务端打包

```
1、说明
就是 不在本地编译，所有构建都在 Expo 的云服务器完成。

2、需要完成
-上传代码（自动完成）
-Expo 服务端完成构建
-生成下载链接(APK/AAB/IPA)
```

## 三 EAS 服务端打包准备阶段

### 3.1 安装 EAS CLI

```
npm install -g eas-cli
eas login
```

### 3.2 初始化 EAS(首次执行)

```
1、初始化指令
eas init

2、生成：
-eas.json
-配置 Expo 项目
```

### 3.3 配置 eas.json(关键)

1-配置

```
1、位置
在项目根目录新建或编辑

2、内容
{
  "cli": {
    "version": ">= 16.28.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

2-说明：

|  profile   |              功能              |
| :--------: | :----------------------------: |
|  preview   | debug/测试版本，APK 本地可以装 |
| production |  release 版本，APK 上架前测试  |

## 四 Android 服务端打包(生成APK)

### 4.1 配置签名文件(keystore)

```
1、你可以 让 Expo 自动生成（推荐）：
eas build:configure
eas credentials

2、看到提示选择
→ Generate new Android Keystore? YES

3、说明
Expo 会完整托管 keystore
```

### 4.2 服务端打包

```
1、Production 构建 APK
eas build --platform android --profile production

2、Preview 构建 APK
eas build --platform android --profile preview

3、构建完成后你会看到
✔ Build finished
Android APK: https://expo.dev/.../builds/xxxx

4、点击链接即可下载成品
```

## 五 iOS 服务端打包(如你需要IPA)

### 5.1 说明

```
免费开发者账号能构建 模拟器版本
付费开发者账号才能生成 IPA。
```

### 5.2 免费账号(模拟器包)

```
eas build --platform ios --profile preview
```

### 5.3 付费账号（真实设备可安装 IPA）

```
eas build --platform ios --profile production
```