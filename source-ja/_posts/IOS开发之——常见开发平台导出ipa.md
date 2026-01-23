---
title: IOS开发之——常见开发平台导出ipa
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: c4e59377
date: 2025-08-04 11:09:42
---
## 一 概述

```
本文介绍常用的开发平台(如 Xcode、Flutter、React Native、Unity 等)
生成ipa文件的方式
```

<!--more-->

## 二 Xcode 原生项目(Swift / Objective-C)

### 2.1 准备工作

```
-使用 Apple 开发者账号（个人或企业）
-在 Xcode 中设置正确的 Bundle Identifier 和 签名团队（Team）
```

### 2.2 Xcode工具生成

```
1、步骤 1：生成 Archive
-连接真机（或选择 Generic iOS Device）
-菜单栏选择 Product → Archive
-等待 Archive 完成，会自动打开 Organizer 窗口

2、步骤 2：导出 .ipa
-在 Organizer 中选中刚生成的 Archive
-点击右边的 Distribute App
-选择：
 Development（用于测试）
 Ad Hoc（用于添加设备 UDID）
 App Store Connect（提交到商店）

-Enterprise（企业分发）
-选择「Export as .ipa」，保存即可

如果你只是为了离线安装或测试使用，推荐用「Development」或「Ad Hoc」。
```

### 2.3 命令行方式(Xcode 工程)

```
1、指令
xcodebuild -scheme YourScheme -archivePath ./build/YourApp.xcarchive archive

xcodebuild -exportArchive \
  -archivePath ./build/YourApp.xcarchive \
  -exportPath ./build/export \
  -exportOptionsPlist ExportOptions.plist

2、说明
ExportOptions.plist 决定了导出类型（开发、自签、企业、App Store）
```

## 三 Flutter 项目打包 .ipa

```
1、步骤
-配置 iOS 工程(flutter build ios 会调用 Xcode 构建)
-打包命令(Release 模式)
flutter build ipa --release
-生成的 .ipa 文件路径
build/ios/ipa/*.ipa

2、说明
如果是 Mac + 真机环境，也可以使用 Xcode Archive 模式
```

## 四 React Native 打包 .ipa

### 4.1 使用Xcode方式

```
-使用 Xcode 打开 ios/YourApp.xcworkspace
-配置签名（Signing & Capabilities）
-选择 Generic iOS Device，然后 Archive → Export .ipa
```

### 4.2  Fastlane 自动化打包(适合 CI/CD)

```
# Fastfile
lane :build do
  gym(
    workspace: "YourApp.xcworkspace",
    scheme: "YourApp",
    export_method: "development",
    output_directory: "./build",
    output_name: "YourApp.ipa"
  )
end
```

## 五 Unity 导出 .ipa

```
-Build Settings → iOS → Export Xcode 工程
-打开 Xcode 项目 → Archive
-导出 .ipa(步骤同 Xcode 项目)
```

## 六 总结

|    使用方式    |     生成 .ipa 的方法      |
| :------------: | :-----------------------: |
| Xcode 原生开发 |    Archive` → `Export     |
|    Flutter     |     flutter build ipa     |
|  React Native  | Xcode Archive 或 Fastlane |
|     Unity      | 导出 Xcode 工程后 Archive |
|  自动化 CI/CD  |  Fastlane 或 xcodebuild   |

