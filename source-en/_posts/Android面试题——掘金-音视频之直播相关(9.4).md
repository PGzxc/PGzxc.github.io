---
title: Android面试题——掘金-音视频之直播相关(9.4)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: d1f66bf
date: 2025-04-07 19:54:40
---
## 一 概述

```
1.推流的流程？
2.拉流播放的流程？
3.常见直播协议及其对比？
4.Android 直播推流的整体架构是什么？
5.如何使用 Camera 和 AudioRecord 进行音视频采集？
6.推流使用了哪些协议？RTMP、SRT、WebRTC 区别？
7.Android 如何实现 HLS、RTMP 播放？
8.如何实现美颜、滤镜等视频前处理？
9.如何处理直播中的卡顿、延迟、音画不同步？
10.推流过程中如何动态切换码率（ABR）？
```

<!--more-->

## 二 直播相关

### 2.1  推流的流程？

```
-采集音视频数据（Camera、AudioRecord）
-编码（MediaCodec）
-封装成 FLV 或 RTMP 包
-使用 Socket/RTMP 推流至服务器
```

### 2.2 拉流播放的流程？

```
-播放器连接服务器拉取流媒体数据（如 RTMP、HLS）
-解析媒体格式（MediaExtractor、FFmpeg）
-解码（MediaCodec/FFmpeg）
-渲染音视频（AudioTrack + Surface）
```

### 2.3 常见直播协议及其对比？

|  协议  |     特点     |        延迟        |     支持情况     |
| :----: | :----------: | :----------------: | :--------------: |
|  RTMP  |   实时直播   |   低延迟（<2s）    |     广泛使用     |
|  HLS   |   分段传输   |   高延迟（10s+）   |     iOS友好      |
| WebRTC |   P2P通信    | 超低延迟（<500ms） |  视频通话/会议   |
|  SRT   | 安全可靠传输 |  中低延迟（<2s）   | 替代 RTMP 的趋势 |

### 2.4 Android 直播推流的整体架构是什么？

```
Android 直播推流的整体架构一般包括以下几个关键模块：

1.视频采集： 
使用Camera或Camera2 API采集视频数据，或者使用 MediaRecorder 或其他硬件加速库获取视频流。

2.音频采集： 使用 AudioRecord API 获取音频数据，或者使用 MediaRecorder 同时采集音视频。

3.编码： 
使用 MediaCodec 或第三方库（如 FFmpeg、X264）对采集到的视频和音频进行编码，
转换成流媒体格式（如 H.264 视频、AAC 音频）。

4.推流协议： 
编码后的数据通过 RTMP、RTSP 或 HLS 协议推送到直播服务器。
常用的推流库有 RTMP 推流库（如 LFLiveKit）或 FFmpeg 推流。

5.网络传输： 通过网络协议（如 TCP、UDP）将编码后的视频音频流传输到直播服务器。

6.直播服务器： 
服务器负责接收并转发视频流，进行分发、存储等处理。
常见的直播服务器有 Nginx + RTMP 模块、Wowza 等。

7.播放器： 客户端播放器使用 ExoPlayer、MediaPlayer 等来接收直播流，并进行解码和播放。

整体架构旨在确保高效、低延迟地进行音视频数据的采集、编码、推流及分发。
```

### 2.5 如何使用 Camera 和 AudioRecord 进行音视频采集？

```
在 Android 中，使用 Camera 和 AudioRecord 进行音视频采集的流程如下：

1. 视频采集（Camera）
-初始化 Camera： 
使用 Camera 或 Camera2 API 获取视频帧。Camera2 提供更细粒度的控制，如曝光、对焦等。

-设置预览： 配置相机预览输出至 SurfaceView 或 TextureView，在界面上显示视频内容。

-捕获帧：
使用Camera.setPreviewCallback()获取每一帧图像数据，可以通过Camera API捕获视频帧并进行编码。

2. 音频采集（AudioRecord）
-初始化AudioRecord：使用AudioRecord API创建音频采集实例，配置采样率、通道、缓冲区大小等参数。
-开始录音： 调用 audioRecord.startRecording() 开始音频数据采集。
-读取音频数据：使用 audioRecord.read()读取采集到的音频数据，通常会以PCM格式获取原始音频数据。

3. 同步音视频：
将视频帧和音频数据分别进行编码，并确保它们的时间戳一致，
最后通过推流协议（如 RTMP）将音视频流推送到服务器。
```

### 2.6 推流使用了哪些协议？RTMP、SRT、WebRTC 区别？

```
推流常用的协议包括 RTMP、SRT 和 WebRTC，它们的区别如下：

1. RTMP (Real-Time Messaging Protocol)
用途： 主要用于视频和音频的实时流媒体传输，广泛应用于直播推流。
特点： 基于 TCP，支持低延迟、高稳定性传输，适用于视频直播平台。
优点： 简单易用，成熟稳定，广泛支持。
缺点： 主要用于点对服务器的推流，不适用于大规模的点对点通讯；且在某些环境下有较高的延迟。

2. SRT (Secure Reliable Transport)
用途： 专为低延迟、高稳定性的视频传输设计，特别适用于不稳定网络环境中的视频传输。
特点： 基于 UDP，提供更强的错误恢复和数据包丢失修复能力。
优点： 支持低延迟和高质量的传输，尤其适合不稳定的网络环境。
缺点： 相较于 RTMP，兼容性较低，部署较为复杂。

3. WebRTC (Web Real-Time Communication)
用途： 用于浏览器和移动端之间的实时音视频通讯，支持点对点（P2P）视频通话。
特点： 基于 UDP，支持实时音视频、数据交换。
优点： 极低延迟，适用于实时通讯和视频通话。
缺点： 对于大规模直播推流的支持较弱，通常需要通过中继服务器。

总结：
RTMP 适合直播推流，稳定但略有延迟。
SRT 适用于不稳定网络的高质量低延迟视频传输。
WebRTC 适合点对点实时通讯，延迟极低。
```

### 2.7 Android 如何实现 HLS、RTMP 播放？

```
在Android中，实现HLS(HTTP Live Streaming) 和RTMP(Real-Time Messaging Protocol) 
播放通常通过使用第三方库，如 ExoPlayer 或 IjkPlayer。
以下是如何在 Android 中实现这两种播放协议的简要描述：

1. HLS 播放
HLS 是基于 HTTP 的流媒体协议，通常用于直播和点播。
它将视频内容分成多个小的 .ts（MPEG-2 TS）文件并通过 .m3u8 文件进行播放。

1.1 ExoPlayer 支持 HLS 播放。
1.2 实现步骤：
1.2.1 添加 ExoPlayer 依赖：
implementation 'com.google.android.exoplayer:exoplayer-hls:2.x.x'
1.2.2 创建 ExoPlayer 实例：
val player = ExoPlayerFactory.newSimpleInstance(context, DefaultTrackSelector())
val hlsMediaSource = HlsMediaSource.Factory(DefaultHttpDataSourceFactory("user-agent"))
    .createMediaSource(Uri.parse("https://path/to/your/playlist.m3u8"))
player.prepare(hlsMediaSource)
player.playWhenReady = true

1.2.3 设置播放器视图：
val playerView: PlayerView = findViewById(R.id.player_view)
playerView.player = player

1.2.4 开始播放：
player.play()


2. RTMP 播放
RTMP 是一个基于 TCP 的流媒体协议，常用于低延迟的直播推流和播放。
2.1 IjkPlayer 是一个支持 RTMP 协议的开源播放器，使用 FFmpeg 进行解码。
2.2实现步骤：

2.2.1 添加 IjkPlayer 依赖：
implementation 'tv.danmaku.ijk.media:ijkplayer-java:0.x.x'

2.2.2 创建 IjkPlayer 实例：
val ijkMediaPlayer = IjkMediaPlayer.create(context)
ijkMediaPlayer.setDataSource("rtmp://path/to/your/stream")
ijkMediaPlayer.prepareAsync()
ijkMediaPlayer.setOnPreparedListener {
    ijkMediaPlayer.start()
}
2.2.3 设置播放器视图：
val surfaceView: SurfaceView = findViewById(R.id.surface_view)
val surface = surfaceView.holder.surface
ijkMediaPlayer.setSurface(surface)

2.2.4 开始播放：
ijkMediaPlayer.start()

3.总结：
-HLS 播放： 使用 ExoPlayer 的 HlsMediaSource 播放 .m3u8 文件。
-RTMP 播放： 使用 IjkPlayer 或 ExoPlayer 支持 RTMP 协议播放实时视频流
```

### 2.8 如何实现美颜、滤镜等视频前处理？

```
在 Android 中实现 美颜、滤镜 等视频前处理通常涉及对视频帧进行图像处理，常见的实现方式有以下几种：

1. 使用 OpenGL ES
1.1 原理： 
通过 OpenGL ES 进行图像处理，可以实现美颜、滤镜等效果。
利用 OpenGL ES 对视频帧进行纹理操作，应用各种图像处理算法（如模糊、亮度、对比度调整等）。

1.2实现方式：
-捕获视频帧（通过 Camera 或 MediaCodec）。
-将每一帧作为纹理上传至 OpenGL。
-在 OpenGL 上执行图像处理（如滤镜、磨皮等）。
-渲染到屏幕上。

1.3 库支持：
-GPUImage：一个封装了 OpenGL ES 的图像处理库，支持多种滤镜、特效。
-OpenGL ES：可以自定义实现滤镜和美颜效果。

2. 使用第三方库
-FaceUnity：一个提供多种美颜和滤镜效果的 SDK，专为实时视频处理设计，支持人脸识别和各种特效。
-CameraFilter：一个开源库，封装了 OpenGL 和 GPU 加速，可以方便地为视频流添加滤镜、特效等。

3. FFmpeg + OpenGL

3.1 原理： 
利用 FFmpeg 解码视频流并将视频帧传递给 OpenGL 进行美颜或滤镜处理。
FFmpeg 用于视频解码，OpenGL 用于处理图像。

3.2实现方式：
-使用 FFmpeg 解码视频帧。
-使用 OpenGL 进行滤镜处理。
-处理后的帧渲染到屏幕。

总结：
-OpenGL ES 是实现美颜和滤镜的核心技术，通过纹理操作和图像处理算法进行实时视频处理。
-使用 GPUImage 和 FaceUnity 等第三方库可以方便地实现各种美颜、滤镜效果。
```

### 2.9 如何处理直播中的卡顿、延迟、音画不同步？

```
在直播中，卡顿、延迟和音画不同步是常见的问题，通常可以通过以下方式进行优化和处理：
1. 卡顿优化
-网络优化： 
使用合适的协议（如SRT或HLS）和自适应码率技术，动态调整视频流的码率，以适应网络带宽波动，减少卡顿。
-缓存机制： 增加视频播放器的缓冲区大小，确保数据流畅传输，避免因为网络波动导致的卡顿。
-硬件加速： 使用硬件解码（如 MediaCodec 或 ExoPlayer），减少 CPU 占用，提高解码效率。

2. 延迟优化
-选择低延迟协议：RTMP协议虽然普遍，但延迟较高。使用 WebRTC 或 SRT 可减少延迟，提供更快的流传输。
-减少缓冲时间： 在播放器中优化缓冲区设置，减少播放器的初始加载时间和缓冲延迟。
-优化编码参数： 调整视频编码器（如 H.264）和音频编码器的参数，减少编码延迟。

3. 音画同步
-时间戳同步：在编码时确保音频和视频的时间戳一致，播放器在解码时根据时间戳来同步播放音频和视频。
-调整播放速率： 如果发现音频和视频不同步，可以通过调整视频或音频播放的速率来进行校正。
-同步算法： 在播放器中加入音画同步算法，实时调整视频帧的播放时机，确保音频和视频的准确同步。

总结：
-卡顿：通过网络优化、缓存机制和硬件加速减少。
-延迟：选择低延迟协议和减少缓冲来优化。
-音画同步：确保时间戳同步，并在播放器中实现调整算法。
```

### 2.10 推流过程中如何动态切换码率（ABR）？

```
在推流过程中动态切换码率（ABR，Adaptive Bitrate Streaming）主要通过以下步骤实现：

1.多码率推流：
推流端（如使用 FFmpeg 或 MediaCodec）生成多个不同码率的视频流
（例如 1080p、720p、480p 等），并将其推送到服务器。

2.分段视频流：
视频流被分成多个小段（如.ts文件），并通过播放列表（如.m3u8 或.mpd）进行管理，方便播放器按需选择。

3.播放器端自适应选择：
-播放器根据当前网络带宽和缓存状况动态选择最适合的码率。
-使用 ExoPlayer 等播放器，内置 ABR 功能会根据实时带宽调整码率，确保流畅播放。

4.带宽检测与调整：
通过实时监测网络带宽、延迟和缓存状态，播放器自动切换至更低或更高的码率，优化播放体验。

通过这种方式，播放器可以在网络状况变化时，无缝切换不同的码率，确保视频播放流畅且稳定。
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)