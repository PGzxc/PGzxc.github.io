---
title: Android开发之——应用安装包格式
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: dff27e7a
date: 2025-08-06 09:48:26
---
## 一 概述

```
本文介绍应用市场会见到的应用安装包格式：
-.apk
-.xapk
-.apks(.aab)
```

<!--more-->

## 二 应用安装包

### 2.1 `.apk`(Android Package)

```
1、官方格式
2、简介：最传统的 Android 应用安装包格式，是已编译好的 ZIP 包，包含了应用运行所需的所有内容。
3、内部内容：
 -classes.dex、
 -AndroidManifest.xml、
 -res/、
 -lib/、
 -META-INF/ 等。

4、安装方式：
-手机上直接点击安装
-命令行：adb install xxx.apk

5、特点：
-安装方便
-不支持模块化或按需下载
-同一个 APK 包含所有架构、语言、分辨率资源 → 冗余大
```

### 2.2 `.xapk`(扩展 APK，通常来自 APKPure)

```
1、非官方格式（如 APKPure 提出）
2、简介：用于封装 .apk + .obb 的 ZIP 包格式，方便分发大型应用（如游戏）。
3、内部结构：
 -/manifest.json
 -/com.xxx.yyy.apk
 -/Android/obb/com.xxx.yyy/main.xxxx.obb

4、安装方式：
 -解压后手动安装 .apk，将 .obb 拷贝到 Android/obb/ 路径
 -或用 APKPure 安装器自动处理
5、特点：
 -为了第三方市场分发大型游戏而设计
 -Android 系统本身不识别 .xapk
 -兼容性差，不推荐正式项目使用
```

### 2.3 `.apks`(Split APK 安装包合集)

```
1、官方支持（由 .aab 构建）
2、简介：使用 bundletool 从 .aab 文件构建出的 多个 APK 的 ZIP 包。
3、内部结构：
 -base.apk
 -config.arm64_v8a.apk
 -config.zh.apk
 -split_feature1.apk
  ...
 -toc.pb （Table of Contents）
4、安装方式：
 bundletool install-apks --apks=my_app.apks
5、特点：
 -精简包体积，按设备架构/语言/密度拆分
 -安装需使用命令行，不适合普通用户直接安装
```

### 2.4 `.aab`(Android App Bundle)

```
1、Google 官方推荐格式（Play Store 新标准）
2、简介：开发者打包上传至 Google Play 的格式，不能直接安装！
3、用途：
 Google Play 拿到 .aab 后会根据用户设备动态生成并下发最合适的 .apk 安装包（Dynamic Delivery）

4、构建 .apks：
bundletool build-apks \
  --bundle=my_app.aab \
  --output=my_app.apks \
  --ks=key.jks --ks-pass=pass:123456 --ks-key-alias=key0 --key-pass=pass:123456

5、特点：
 -更高效、模块化（支持 Dynamic Features）
 -不支持离线直接安装
 -需通过 Google Play 或 bundletool 安装 .apks
```

## 三 总结对比

| 格式  | 是否官方 |         组成          | 可直接安装 |       用途/场景       |          生成方式           |
| :---: | :------: | :-------------------: | :--------: | :-------------------: | :-------------------------: |
| .apk  |   ✅ 是   |     单一 APK 文件     |    ✅ 是    |     常见单体应用      |       Gradle 构建输出       |
| .xapk |   ❌ 否   |     .apk` + `.obb     |    ❌ 否    | 大型游戏(第三方分发)  |       第三方工具封装        |
| .apks |   ✅ 是   | 多个分 APK + 配置文件 |    ❌ 否    | 离线安装 AAB 构建产物 |    bundletool build-apks    |
| .aab  |   ✅ 是   |    App Bundle 格式    |    ❌ 否    |   发布 Google Play    | Gradle `bundleRelease` 输出 |

## 四 常用工具

|      工具      |         用途         |                   下载地址                    |
| :------------: | :------------------: | :-------------------------------------------: |
|      adb       |     安装 `.apk`      |                  Android SDK                  |
|   bundletool   |  构建/安装 `.apks`   | https://github.com/google/bundletool/releases |
| APKPure安装器  |     安装 `.xapk`     |             https://apkpure.com/              |
| Android Studio | 构建 `.apk` / `.aab` |     https://developer.android.com/studio      |

