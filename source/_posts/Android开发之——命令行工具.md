---
title: Android开发之——命令行工具
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: baa53caf
date: 2025-08-05 10:45:46
---
## 一 概述

```
本文介绍常用的 Android 命令行工具，以及它们的功能和使用场景
```

<!--more-->

## 二 命令行工具

### 2.1 SDK Manager(sdkmanager)

```
1、介绍
管理 Android SDK 的组件安装/更新/卸载

2、命令示例
sdkmanager --list         # 查看可安装的 SDK 包
sdkmanager "platform-tools" "build-tools;34.0.0"
sdkmanager --update       # 更新所有已安装组件

3、适用场景：
CI/CD 环境安装 SDK、离线安装、维护 SDK。
```

### 2.2 AVD Manager(avdmanager)

```
1、介绍
管理 Android 虚拟设备(AVD)

2、命令示例
avdmanager list avd        # 列出已有的 AVD
avdmanager list device     # 列出支持的设备配置
avdmanager create avd -n testAVD -k "system-images;android-34;google_apis;x86_64"

3、适用场景：
在命令行创建、管理模拟器（用于自动化测试等）。
```

### 2.3 ADB(Android Debug Bridge)

```
1、介绍
连接设备进行调试、安装应用、执行命令等

2、命令示例：
adb devices                   # 查看已连接设备
adb install myapp.apk        # 安装 APK
adb logcat                   # 查看日志
adb shell                    # 进入设备终端

3、适用场景：
开发调试、日志采集、自动化测试、设备操作等。
```

### 2.4 Fastboot

```
1、介绍
与 bootloader 交互，用于刷机、解锁设备等

2、命令示例
fastboot devices
fastboot oem unlock
fastboot flash boot boot.img


3、适用场景：
需要对设备底层系统进行操作(刷 recovery、解锁等)。
```

### 2.5 Lint

```
1、介绍
检查代码中的潜在问题

2、命令示例
./gradlew lint           # 使用 Gradle 执行 Lint

3、适用场景
独立 lint 命令在较新版本中已并入 Gradle 工具链
```

### 2.6 Gradle 命令

```
1、介绍
用于构建、打包、签名等

2、常见命令
./gradlew assembleDebug
./gradlew assembleRelease
./gradlew bundleRelease

3、适用场景：
命令行构建 APK/AAB，用于 CI/CD 或本地构建。
```

### 2.7 Test / Emulator CLI 工具

```
1、介绍
用于执行单元测试 / 启动模拟器

2、启动模拟器：
emulator -avd testAVD

3、运行测试：
./gradlew testDebugUnitTest
adb shell am instrument -w com.example.test/androidx.test.runner.AndroidJUnitRunner
```

