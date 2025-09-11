---
title: React Native开发之——Expo IOS EAS打包流程(2)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: ca2830d5
date: 2025-09-11 10:44:18
---
## 一 概述

```
本文介绍：开通 Apple Developer 账号后，IOS EAS 打包流程
```

<!--more-->

## 二 EAS iOS 打包流程

### 2.1 安装工具

```
# 安装 EAS CLI
npm install -g eas-cli
```

### 2.2 登录 Expo & Apple

```
1、# 登录 Expo
eas login

2、# 登录 Apple Developer 账号
eas device:create

3、说明
会要求输入 Apple ID、密码、2FA 验证码。成功后会和 Apple Developer 账号绑定。
```

### 2.3 配置项目

```
1、指令
 cd your-app
 npx expo install expo-dev-client   # 推荐安装，方便真机调试
 eas build:configure

2、说明
此命令会自动生成一个 eas.json 文件，里面存放打包配置
```

### 2.4 配置 `eas.json`

```
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "ios": {
      "release": {
        "workflow": "managed",
        "distribution": "app-store"
      }
    }
  },
  "submit": {
    "ios": {
      "appleId": "你的AppleID邮箱",
      "ascAppId": "你的App Store Connect App ID (如1234567890)",
      "appleTeamId": "团队ID (可以在Apple开发者后台找到)"
    }
  }
}
```

### 2.5 开始构建

```
1、# 构建 iOS 包 (IPA)
eas build -p ios --profile release

2、说明
会自动生成证书和 Provisioning Profile，不需要你手动配置
```

### 2.6 上传到 TestFlight

```
1、# 直接提交到 App Store Connect
 eas submit -p ios --latest

2、说明
 --latest 表示上传最近一次构建的 IPA。
 上传成功后，可以在 App Store Connect → TestFlight 里看到
```

### 2.7 本地真机调试(可选)

```
1、如果只是想真机安装测试
 expo run:ios

2、说明
 会用免费证书打包到设备，7 天有效期
```

