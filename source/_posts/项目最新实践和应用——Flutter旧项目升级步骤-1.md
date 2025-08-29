---
title: 项目最新实践和应用——Flutter旧项目升级步骤(1)
categories:
  - 开发
  - U-项目实践
  - Flutter项目
tags:
  - Flutter项目
abbrlink: 800a34e7
date: 2025-08-29 08:02:44
---
## 一 概述

```
随着Flutter的升级，旧项目可能出现这样那样的问题，本文加以整理
 -升级步骤与注意事项
 -避免兼容性问题
```

<!--more-->

## 二 旧项目升级步骤

### 2.1 确认 Flutter SDK 版本

```
1、查看flutter版本
 flutter --version

2、如果项目很久没维护，先升级到一个稳定版（推荐最新稳定 flutter stable）
 flutter upgrade
 
3、如果想锁定版本，可以用 flutter version 3.24.3（举例）
```

### 2.2 清理旧依赖

```
1、执行如下清理指令
 flutter clean

2、说明
 删除缓存与旧构建产物，避免残留
```

### 2.3 检查 pubspec.yaml 依赖

```
1、很多旧库不再维护，要逐个升级
 flutter pub outdated
 flutter pub upgrade --major-versions
 
2、常见替换方案
 provider → 继续用即可，API 基本兼容。
 http → 更新到 ^1.x，某些 API 返回类型改了。
 flutter_webview_plugin → 废弃，改用 webview_flutter。
 image_picker → 最新版 API 改为 XFile。
 intl → 升级后 DateFormat 等使用方式保持一致，但要注意依赖冲突
```

### 2.4 适配 Android 部分

```
1、Gradle & AGP 升级
 1-1、打开 android/build.gradle：
 classpath 'com.android.tools.build:gradle:8.2.2'（旧项目可能是 3.x/4.x）

 1-2、gradle-wrapper.properties 里改成：
 distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-all.zip
 
2、AndroidManifest.xml 
 Android 12+ 要加上 android:exported="true" 给每个 activity, service, receiver
 
3、Kotlin 版本
 升级到至少 1.8.x，保证和 Flutter 插件兼容
```

### 2.5 适配 iOS 部分

```
1、更新 CocoaPods
 sudo gem install cocoapods
 cd ios
 pod repo update
 pod install

2、ios/Podfile 加上(旧项目可能还在 9.0)
platform :ios, '12.0'
```

### 2.6 代码层面修改

```
1、空安全 (Null Safety)
 1-1、旧项目可能没有启用，需要迁移
 dart migrate

 1-2、按提示逐步修改
 
2、API 变动
 -Theme.of(context).accentColor → Theme.of(context).colorScheme.secondary
 -FlatButton, RaisedButton, OutlineButton → 换成 TextButton, ElevatedButton, OutlinedButton
 -Scaffold.of(context).showSnackBar(...) → 换成 ScaffoldMessenger.of(context).showSnackBar(...)
```

### 2.7 验证与构建

```
flutter pub get
flutter analyze
flutter run
flutter build apk --release
flutter build ios --release
```

## 三 常见升级坑

### 3.1 依赖冲突

```
比如 intl、path_provider、shared_preferences，需要锁定兼容版本
```

### 3.2 AndroidX 迁移

```
1、旧项目可能没迁移，执行
flutter pub upgrade
flutter create .

2、会自动加上 androidx 相关配置
```

### 3.3 Gradle 内存溢出

```
在 gradle.properties 加：org.gradle.jvmargs=-Xmx2048M
```

## 四 总结

```
升级流程就是：SDK → 依赖 → Android/iOS 构建配置 → 代码适配 → 测试打包
```

