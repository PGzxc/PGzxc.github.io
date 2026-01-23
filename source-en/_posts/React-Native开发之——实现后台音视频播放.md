---
title: React Native开发之——实现后台音视频播放
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: 101040ef
date: 2025-11-24 19:00:57
---
## 一 概述

```
目标：应用切至后台仍能继续播放（或至少播放音频）。
```

<!--more-->

## 二 核心原理

```
iOS： 系统限制视频后台播放，需伪装为“音频播放”模式（禁用视频轨道）。
Android： 允许后台播放，通过 Foreground Service 保持进程。
跨平台框架： 复用原生机制，通过原生桥接调用底层API。
```

## 三 各平台原生实现

### 3.1 iOS(AVPlayer)

```
// 1-Info.plist
<key>UIBackgroundModes</key>
<array>
  <string>audio</string>
</array>

//2-代码中
let session = AVAudioSession.sharedInstance()
try? session.setCategory(.playback)
try? session.setActive(true)
// 后台禁用视频轨道，只保留音频
```

### 3.2 Android(ExoPlayer + ForegroundService)

```
//1-权限
<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>

//2-代码
val player = ExoPlayer.Builder(context).build()
startForegroundService(Intent(context, VideoService::class.java))
```

## 四 React Native跨平台框架方案

### 4.1 插件

```
react-native-video
```

### 4.2 实现

```
<Video
  source={{ uri: url }}
  playInBackground={true}
  playWhenInactive={true}
  resizeMode="cover"
/>
```

### 4.3 说明

```
优点：配置简单，社区成熟
限制：需在 iOS 原生层开启音频后台模式
```

## 五 对比总结

|     框架     | 实现复杂度 | 依赖插件 / 原生代码 |     iOS 限制     |          Android 限制           |
| :----------: | :--------: | :-----------------: | :--------------: | :-----------------------------: |
|   Flutter    |     中     |     3-4 个插件      |    仅音频后台    |       需唤醒锁，系统易杀        |
| React Native |     低     |     1-2 个插件      |  需启用音频模式  |        无前台服务会中断         |
|     KMP      |     高     |       全原生        | 手动实现后台控制 | 管理 ForegroundService 生命周期 |

## 六 总结命令

```
# Flutter 后台播放
flutter pub add video_player audio_session flutter_background

# RN 后台播放
npm install react-native-video react-native-background-task

# iOS 启用后台音频
open ios/Runner/Info.plist && echo "<string>audio</string>"

# Android 启用前台服务
open android/app/src/main/AndroidManifest.xml
```

