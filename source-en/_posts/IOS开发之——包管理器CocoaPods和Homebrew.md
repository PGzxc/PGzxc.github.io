---
title: IOS开发之——包管理器CocoaPods和Homebrew
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: d7249eab
date: 2018-07-09 09:30:26
---
## 一 概述

```
CocoaPods 和 Homebrew 均为 macOS 开发环境中常用的包管理工具，但它们的定位和用途有明显区别
```

<!--more-->

## 二 Homebrew

### 2.1 定位

```
macOS（及 Linux）的系统级包管理器，用于安装开发工具、命令行软件、系统依赖等
```

### 2.2 核心功能

```
安装命令行工具（如 git、wget、python）。
管理系统级依赖库（如 openssl、zlib）。
支持图形化应用（通过 brew cask），例如 brew install --cask visual-studio-code。
```

### 2.3 安装路径

```
Intel 芯片：/usr/local/Cellar/
M1/M2 芯片：/opt/homebrew/Cellar/
```

### 2.4 常用命令

```
brew install <package>     # 安装包
brew upgrade <package>    # 升级包
brew search <keyword>     # 搜索包
brew cleanup              # 清理旧版本
```

## 三 CocoaPods

### 3.1 定位

```
iOS/macOS 应用开发的依赖管理器，专注于管理项目中的第三方框架（如 Alamofire、AFNetworking）
```

### 3.2 核心功能

```
通过 Podfile 声明项目依赖。
自动解决依赖冲突，下载并集成框架到 Xcode 项目。
```

### 3.3 安装前提

```
需先安装 Homebrew 和 Ruby（macOS 预装）
```

### 3.4 安装命令

```
# 通过 Homebrew 安装 CocoaPods
brew install cocoapods
# 或使用 RubyGems 安装（需管理员权限）
sudo gem install cocoapods
```

### 3.5 使用流程

```
1、在项目根目录创建 Podfile

platform :ios, '11.0'
target 'MyApp' do
  pod 'Alamofire', '~> 5.6'
  pod 'SwiftyJSON', '~> 5.0'
end

2、执行 pod install 下载并集成依赖
3、打开生成的 .xcworkspace 文件而非原 .xcodeproj
```

## 四 关键区别

|   维度   |             Homebrew             |             CocoaPods             |
| :------: | :------------------------------: | :-------------------------------: |
| 管理对象 | 系统级工具、开发环境、命令行软件 |   iOS/macOS 项目中的第三方框架    |
| 安装位置 |    系统目录（如 /usr/local）     |     项目目录下的 Pods/文件夹      |
| 依赖范围 |     全局共享（所有项目可用）     |   项目私有（每个项目独立管理）    |
| 典型用途 |   安装 Git、Python、Node.js 等   | 集成 Alamofire、Kingfisher 等框架 |
| 核心文件 |      无（通过命令直接管理）      |      Podfile 和 Podfile.lock      |

## 五 协作场景

### 5.1 场景 1：搭建 iOS 开发环境

```
1.通过 brew install git xcodegen 安装版本控制和项目生成工具。
2.通过 brew install cocoapods 安装依赖管理器。
3.在项目中使用 Podfile 管理第三方库。
```

### 5.2 场景 2：修复依赖问题

```
若 CocoaPods 报错提示缺少系统依赖（如 libffi），可先用 brew install libffi 解决。
```

## 六 常见问题

### 6.1 Homebrew 权限问题

```
# 修复权限问题
sudo chown -R $(whoami) $(brew --prefix)/*
```

### 6.2 CocoaPods 缓存问题

```
# 清除缓存并重新安装
pod cache clean --all
pod deintegrate && pod install
```

### 6.3 版本锁定

```
Homebrew 通过 brew pin/unpin 锁定包版本。
CocoaPods 通过 Podfile.lock 锁定依赖版本。
```

