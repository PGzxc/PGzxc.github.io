---
title: Android开发之——各版本特性及适配
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: b8c3f1da
date: 2025-11-20 15:11:04
---
## 一 概述

```
本文介绍：
 -Android 各版本的主要特性与适配要点
 -从开发角度总结，涵盖 API 级别、系统变化、权限、UI、性能、安全、隐私等维度
```

<!--more-->

## 二 Android 各版本主要特性概览(API 级别)

|    版本     | API  |       代号        | 发布时间 |                           主要特性                           |
| :---------: | :--: | :---------------: | :------: | :----------------------------------------------------------: |
| Android 4.4 |  19  |      KitKat       |   2013   | 引入 Translucent status bar、WebView(Chromium)、Immersive mode |
| Android 5.0 |  21  |     Lollipop      |   2014   |     Material Design、ART 运行时、JobScheduler、通知分组      |
| Android 6.0 |  23  |    Marshmallow    |   2015   |            动态权限、Doze 省电模式、指纹识别 API             |
| Android 7.0 |  24  |      Nougat       |   2016   |            多窗口、多任务、FileProvider、通知增强            |
| Android 8.0 |  26  |       Oreo        |   2017   |         后台限制、通知渠道、Picture-in-Picture 模式          |
| Android 9.0 |  28  |        Pie        |   2018   |  手势导航、Adaptive Battery、明暗模式、App Standby Buckets   |
| Android 10  |  29  |         Q         |   2019   |      Scoped Storage（沙盒存储）、暗色主题、隐私权限变更      |
| Android 11  |  30  |         R         |   2020   |         一次性权限、前台服务限制、通知气泡、对话分组         |
| Android 12  |  31  |         S         |   2021   |  Material You 动态主题、Approximate location、后台启动限制   |
| Android 12L |  32  |        S2         |   2022   |              折叠屏和平板优化、任务栏、多列布局              |
| Android 13  |  33  |     Tiramisu      |   2022   |       通知权限、照片选择器、BT LE Audio、应用语言设置        |
| Android 14  |  34  | Upside Down Cake  |   2023   |            安全性提升、背景限制更严格、无障碍改进            |
| Android 15  |  35  | Vanilla Ice Cream |   2024   |         通知管理优化、卫星通信支持、后台任务管控更细         |

## 三 关键特性变化与适配建议(重点版本)

### 3.1 Android 6.0（API 23）— 动态权限 & Doze 模式

```
1、变化：
-引入运行时权限（需动态申请）。
-Doze 模式：应用后台被延迟唤醒。

2、适配建议：
-使用 ActivityCompat.requestPermissions()。
-后台任务使用 JobScheduler / WorkManager。
-重要后台服务使用前台服务 + 通知。
```

### 3.2 Android 7.0（API 24）— FileProvider & 多窗口

```
1、变化：
-禁止 file:// URI 共享（改用 FileProvider）。
-支持分屏与多窗口。

2、适配建议：
-文件共享改为 content://。
-适配多窗口（onMultiWindowModeChanged()）。
```

### 3.3 Android 8.0（API 26）— 后台限制 & 通知渠道

```
1、变化：
-后台执行、广播限制。
-必须创建通知渠道 NotificationChannel。

2、适配建议：
-所有前台服务必须绑定通知渠道。
-后台任务移入 WorkManager 或 JobIntentService。
-广播注册改为动态注册。
```

### 3.4 Android 9.0（API 28）— 安全限制 & 网络变化

```
1、变化：
-禁止明文 HTTP（默认仅支持 HTTPS）。
-后台应用无法访问剪贴板。

2、适配建议：
-在 network_security_config.xml 中配置明文域。
-使用 ClipboardManager 前检查前台状态。
```

### 3.5 Android 10（API 29）— Scoped Storage（沙盒存储）

```
1、变化：
-外部存储访问受限。
-后台定位权限拆分。

2、适配建议：
-使用 MediaStore 或 Storage Access Framework。
-申请 MANAGE_EXTERNAL_STORAGE 时需声明用途。
-前后台定位分别申请权限。
```

### 2.6 Android 11（API 30）— 隐私与前台服务

```
1、变化：
-MANAGE_EXTERNAL_STORAGE 引入。
-一次性权限（摄像头、位置）。
-通知气泡、对话通知。

2、适配建议：
-尽量不使用存储管理特权。
-UI 层适配气泡通知。
```

### 2.7 Android 12（API 31）— Material You、隐私指示器

```
1、变化：
-动态主题（Material You）。
-前台服务与后台启动限制。
-麦克风/摄像头访问指示灯。

3、适配建议：
-适配动态配色（DynamicColors.applyIfAvailable()）。
-优化后台任务策略。
-使用 WorkManager 代替隐式启动。
```

### 2.8 Android 13（API 33）— 通知权限 & 照片选择器

```
1、变化：
-新增通知权限 POST_NOTIFICATIONS。
-统一照片选择器 API。
-各语言设置独立。

2、适配建议：
-动态请求通知权限。
-适配 PhotoPicker 替代文件选择器。
-多语言使用 AppCompatDelegate.setApplicationLocales()。
```

### 2.9 Android 14（API 34）— 严格后台限制 & 安全

```
1、变化：
-禁止 targetSdk<23 应用安装。
-后台服务启动更严格。
-更多 foregroundServiceType 分类。

2、适配建议：
-所有任务尽量走 WorkManager。
-调整 Manifest 中前台服务类型。
```

### 2.10 Android 15（API 35）— 隐私 & 通讯增强

```
1、变化：
-卫星通信 API、任务管理优化。
-可配置通知优先级、后台任务受控。

2、适配建议：
-检查后台行为限制。
-更新 targetSdkVersion 至 35 并复测所有权限弹窗。
```

## 三 适配策略建议

|     类型      |    适配方向    |                         推荐方案                         |
| :-----------: | :------------: | :------------------------------------------------------: |
|     权限      |    动态申请    | PermissionX 或 ActivityResultContracts.RequestPermission |
|     存储      |   沙盒化访问   |                 MediaStore / SAF / Room                  |
|     后台      |    限制执行    |              WorkManager、ForegroundService              |
|     通知      |   渠道与权限   |         NotificationChannel + POST_NOTIFICATIONS         |
|      UI       |   响应式布局   |      ConstraintLayout / Compose / WindowManager API      |
|   深色模式    |    适配主题    |        AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM        |
| 折叠屏 / 平板 |   新布局适配   |           WindowSizeClass / SlidingPaneLayout            |
|     语言      | 应用内语言切换 |             Android 13+ 支持系统语言独立设置             |
|     隐私      |  API 调用合规  |              避免采集敏感数据，遵守隐私政策              |

## 四 项目升级 checklist

|     升级方向      |                       检查项                       |
| :---------------: | :------------------------------------------------: |
|      Gradle       |                  更新至最新稳定版                  |
| compileSdkVersion |                    对应最新 API                    |
| targetSdkVersion  |              逐步过渡，不要一次跳太多              |
|    Permissions    |         检查 AndroidManifest 中的权限声明          |
|     文件访问      |              避免直接访问外部存储路径              |
|     第三方库      |            检查兼容性与 targetSdk 支持             |
|     构建工具      |     Gradle Plugin / Kotlin Plugin 对应版本一致     |
|       测试        | 在 Android 6～最新系统上验证功能(至少三个主要版本) |

## 五 推荐适配流程

```
1.确定目标版本 → 分析影响范围
2.升级 Gradle / targetSdk
3.逐模块测试（权限 / 文件 / 通知 / 后台）
4.引入 WorkManager、PhotoPicker 等官方兼容方案
5.添加版本分支代码（if (Build.VERSION.SDK_INT >= XX)）
6.更新隐私与政策声明（Google Play 审核要求）
```

