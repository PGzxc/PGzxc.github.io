---
title: IOS开发之——非付费账号使用Fastlane一键打包
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 4a6ff142
date: 2025-07-31 12:13:12
---
## 一 概述

```
使用 Xcode GUI 进行打包，Product → Archive，非付费账号只能运行在本地设备，无法导出 IPA
使用 Fastlane 一键打包，使用Automatically manage siging导出ipa
-Xcode 启用自动签名
-Fastfile加入 signingStyle: automatic
-执行fastlane build
```

<!--more-->

## 二 安装Fastlane

### 2.1 安装指令

```
1、安装指令
sudo gem install fastlane -NV
或
brew install fastlane

2、安装完成后查看
fastlane -v
```

### 2.2 查找fastlane安装路径

```
gem which fastlane
```

### 2.3 将 gem 的 bin 目录加入 PATH

```
1、zsh 用户（大多数 macOS 默认)
echo 'export PATH="/usr/local/lib/ruby/gems/3.4.0/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

2、bash 用户（macOS 老版本）
echo 'export PATH="/usr/local/lib/ruby/gems/3.4.0/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile

3、验证是否成功
which fastlane
fastlane -v
```

## 三 fastlane打包ipa

### 3.1 在你的项目目录中初始化

1、初始化指令

```
fastlane init
```

2、可能出现出现选择(选择4)

```
What would you like to use fastlane for?
1. 📸  Automate screenshots
2. 👩‍✈️  Automate beta distribution to TestFlight
3. 🚀  Automate App Store distribution
4. 🛠  Manual setup - manually setup your project to automate your tasks
```

3、选项说明

```
1、📸 Automate screenshots（自动截图）
自动生成 iOS 设备截图，常用来快速生成 App Store 需要的多分辨率截图。

2、👩‍✈️ Automate beta distribution to TestFlight（自动上传到 TestFlight）
自动打包并上传 Beta 版本到 Apple TestFlight，用于内测或外测分发。

3、🚀 Automate App Store distribution（自动发布 App Store）
自动打包并上传正式版到 App Store Connect，进行发布上线。

4、🛠 Manual setup（手动配置）
自定义配置 fastlane 的打包、发布流程。适合你想一步步搭建，灵活控制
```

### 2 创建 `Fastfile`

```
default_platform(:ios)

platform :ios do
  desc "Build IPA"
  lane :build do
    gym(
      workspace: "WanAndroid_SwiftUI.xcworkspace", #YourApp.xcworkspace
      scheme: "WanAndroid_SwiftUI", #YourApp
      export_method: "development",
      export_options: {
        signingStyle: "automatic",
        compileBitcode: false
      },
      output_directory: "./build",
      output_name: "WanAndroid_SwiftUI.ipa", #YourApp.ipa
      clean: true
    )
  end
end
```

### 3.3 设置Xcode

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

### 3.3 执行构建打包流程

```
fastlane build
```

### 3.4 图示

| 1-构建过程 | 2-生成ipa |
| :--------: | :-------: |
|   ![][1]   |  ![][2]   |



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-fastlane-cmd-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-fastlane-output-2.png