---
title: React Native开发之——Expo ios使用fastlane打包ipa(3)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: d28c7eb0
date: 2025-12-28 08:33:29
---
## 一 概述

```
本文介绍：
 - 前置条件
 - 生成iOS原生目录
 - fastlane打包ipa
```

<!--more-->

## 二 前置条件

```
1、Mac 电脑（必须）
2、Xcode 16+ 已安装
3、安装最新 EAS CLI 和 Fastlane
npm install -g eas-cli
sudo gem install fastlane   # 或使用 brew install fastlane
```

## 三 生成iOS原生目录(只做一次)

```
1、指令
npx expo prebuild --platform ios --clean

2、说明
执行完后项目里会出现 ios/ 文件夹，里面就是完整的 Xcode 工程
```

## 四 fastlane打包ipa

### 4.1 初始化 Fastlane

```
1、进入 iOS 目录并初始化 fastlane
cd ios
fastlane init

2、选择 4. manual(手动配置) → 直接回车跳过后面所有问题
```

### 4.2 创建 Fastfile

```
default_platform(:ios)

platform :ios do
  desc "Build IPA"
  lane :build do
    gym(
      workspace: "YourApp.xcworkspace", #YourApp.xcworkspace
      scheme: "YourApp", #YourApp
      export_method: "development",
      export_options: {
        signingStyle: "automatic",
        compileBitcode: false
      },
      output_directory: "./build",
      output_name: "YourApp.ipa", #YourApp.ipa
      clean: true
    )
  end
end
```

### 4.3 设置Xcode

```
1、Xcode安装路径
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

验证是否设置成功
xcode-select -p
应返回
/Applications/Xcode.app/Contents/Developer


2、接受许可协议
sudo xcodebuild -license
按提示按下 空格键 快速翻页 → 输入 agree → 回车确认

3、查看当前证书/签名配置状态
security find-identity -v -p codesigning
```

### 4.4 IOS代码签名(通过Xcode配置)

```
1、打开IOS项目
YourApp.xcworkspace

2、在Xcode中选择项目
-点击左侧导航栏中的项目
-切换到`Signing & Capabilities`标签页

3、配置签名设置
-勾选`Automatically manage signing`
-在`Team`下拉菜单中选择你的Apple开发者团队
-如果没有团队，需要先添加Apple ID到Xcode

4、关闭Xcode
```

### 4.5 执行构建打包流程

```
fastlane build
```

