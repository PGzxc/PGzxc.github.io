---
title: IOS开发之——实现类似Android中的后台服务
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 6ac8ada7
date: 2025-11-21 15:24:37
---
## 一 概述

```
iOS 不像 Android 那样允许 App 随意在后台持续运行服务，
因此要实现“App退到后台仍能播放视频”的行为，需要符合苹果系统的后台运行规则。
```

<!--more-->

## 二 iOS 后台机制与 Android 的区别

|     项目     |                   Android                    |                      iOS                      |
| :----------: | :------------------------------------------: | :-------------------------------------------: |
|   后台运行   | 可通过 Service / ForegroundService 持续运行  |     系统严格限制，仅允许特定类型后台任务      |
|   保活机制   | 可通过前台服务、JobScheduler、WorkManager 等 |    仅允许有限后台模式(音频、定位、VoIP等)     |
| 视频后台播放 |         可直接播放或通过前台通知播放         | 只能通过 **Audio后台模式** 实现(当作音频播放) |

## 三 iOS 后台播放视频的可行方式

### 3.1 方式1：开启音频后台模式(最常见)

```
1、思路：
让视频播放的音频流在后台继续播放，视频画面暂停。
当用户回到前台时，再恢复画面。

2、步骤：

2.1、打开后台播放权限
在 Xcode 的 Project → Target → Signing & Capabilities
添加 Capability：

Background Modes → Audio, AirPlay, and Picture in Picture

2.2、配置 AVAudioSession
import AVFoundation
try? AVAudioSession.sharedInstance().setCategory(.playback, mode: .moviePlayback)
try? AVAudioSession.sharedInstance().setActive(true)

2.3、使用 AVPlayer 播放视频
let player = AVPlayer(url: videoURL)
let playerLayer = AVPlayerLayer(player: player)
player.play()

当 App 进入后台时，系统会继续播放“音频部分”

3、注意
-视频画面会自动暂停（因为系统不允许渲染图像）
-音频会继续播放
-可以配合 画中画 (PiP) 保持视频可视化（下面讲）
```

### 2.2 方式2：使用 Picture in Picture (画中画)

```
1、说明
从 iOS 14+ 起，系统支持 AVPictureInPictureController，
可让用户退到后台仍观看视频画面（类似 YouTube 小窗）。

2、实现示例：

import AVKit
let player = AVPlayer(url: videoURL)
let playerLayer = AVPlayerLayer(player: player)
let pipController = AVPictureInPictureController(playerLayer: playerLayer)
pipController?.startPictureInPicture()

3、要点
用户回到桌面后，视频会以悬浮窗形式继续播放；
必须开启后台模式中的：
Background Modes → Audio, AirPlay, and Picture in Picture

iPad / iPhone 均支持；
适合视频 App（如哔哩哔哩、YouTube、腾讯视频）。
```

### 2.3 方式3：后台任务延迟挂起（仅临时延续播放）

```
1、如果只是想延长几秒播放（比如切后台时等网络请求、动画结束）
var backgroundTask: UIBackgroundTaskIdentifier = .invalid

backgroundTask = UIApplication.shared.beginBackgroundTask {
    UIApplication.shared.endBackgroundTask(self.backgroundTask)
    self.backgroundTask = .invalid
}

// 做一些短时间后台任务，比如继续播放或保存状态

2、注意
最多能维持约 30秒；
不能用于长期播放；
一旦超时，系统会强制挂起。
```

## 三 总结推荐方案

|            目标            |         推荐方案          |   可实现   |
| :------------------------: | :-----------------------: | :--------: |
|  视频App希望后台播放声音   | Audio后台模式 (.playback) | 声音可继续 |
|  希望视频画面也能浮窗播放  |    Picture in Picture     | 画中画播放 |
| 短暂后台操作（非持续播放） |   beginBackgroundTask()   |  临时延时  |
| 真正后台运行（如Service）  |        iOS 不支持         |   不可行   |

## 四 额外优化(选用场景)

```
1、控制中心显示播放信息：
使用 MPNowPlayingInfoCenter.default() 设置歌曲/视频标题与控制按钮。

2、AirPlay 支持：
可在后台播放中通过 AVRoutePickerView 支持 AirPlay。

3、防止系统自动暂停：
确保 AVAudioSession 激活成功，且 player.play() 调用在主线程执行。
```

