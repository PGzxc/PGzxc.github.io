---
title: Android面试题——掘金-三方框架之Exoplayer(5.6)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 74710dbf
date: 2025-04-07 10:34:49
---
## 一 概述

```
以下是关于 ExoPlayer（音视频播放库） 的 Android 面试题整理，
涵盖架构、使用方式、缓存机制、与 MediaPlayer 对比等内容，
适合面试答题和项目实践总结。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 ExoPlayer？它的优势是什么？

```
1.概念
ExoPlayer 是 Google 提供的 Android 流媒体播放库，
替代传统的 MediaPlayer，支持自定义扩展和流式媒体播放。

2.优势：
-更强的流媒体支持（DASH/HLS/SmoothStreaming）
-支持自定义缓存机制
-解码灵活，可选择软解/硬解
-支持 DRM、广告、字幕、多轨道等高级特性
-与生命周期更好地绑定
-可扩展性强（Renderer/Source/Output）
```

### 2.2 ExoPlayer 的核心架构有哪些模块？

```
+------------------------+
|    ExoPlayer           |  ← 播放控制核心
+------------------------+
| TrackSelector          |  ← 音视频轨道选择
| LoadControl            |  ← 缓冲控制策略
| MediaSource            |  ← 媒体资源加载器（如 HLS、DASH）
| Renderer               |  ← 音频/视频渲染器
| Extractor              |  ← 媒体数据解析器
+------------------------+
```

### 2.3 ExoPlayer 的基本使用方式？

```
val player = ExoPlayer.Builder(context).build()
val mediaItem = MediaItem.fromUri(videoUri)

player.setMediaItem(mediaItem)
player.prepare()
player.play()

常用于配合 PlayerView 控件
<com.google.android.exoplayer2.ui.PlayerView
    android:id="@+id/playerView"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"/>
```

### 2.4 ExoPlayer 与 MediaPlayer 有什么区别？

|       特性        |      ExoPlayer       |    MediaPlayer     |
| :---------------: | :------------------: | :----------------: |
|      扩展性       |      ✅ 可自定义      |     ❌ 不可扩展     |
|    流媒体支持     | ✅ 支持 HLS、DASH 等  | 一般支持，局限较大 |
|     缓存控制      |  ✅ 可自定义缓存策略  |    ❌ 控制能力弱    |
|     解码能力      | ✅ 支持软解/硬解切换  |  主要依赖系统硬解  |
| 子标题/多音轨支持 |        ✅ 完善        |      支持有限      |
|     性能优化      | ✅（Google 官方维护） |     ❌ 维护较少     |

### 2.5 ExoPlayer 如何实现缓存？

```
通过 SimpleCache 实现磁盘缓存，结合 CacheDataSourceFactory 控制缓存行为
示例
val cache = SimpleCache(cacheDir, LeastRecentlyUsedCacheEvictor(MAX_CACHE_SIZE))
val cacheDataSourceFactory = CacheDataSource.Factory()
    .setCache(cache)
    .setUpstreamDataSourceFactory(DefaultHttpDataSource.Factory())

val mediaSource = ProgressiveMediaSource.Factory(cacheDataSourceFactory)
    .createMediaSource(MediaItem.fromUri(uri))
```

### 2.6 如何监听播放状态变化？

```
player.addListener(object : Player.Listener {
    override fun onPlaybackStateChanged(state: Int) {
        when (state) {
            Player.STATE_READY -> Log.d("ExoPlayer", "准备完毕")
            Player.STATE_ENDED -> Log.d("ExoPlayer", "播放完成")
            Player.STATE_BUFFERING -> Log.d("ExoPlayer", "缓冲中")
            Player.STATE_IDLE -> Log.d("ExoPlayer", "空闲")
        }
    }
})
```

### 2.7 ExoPlayer 如何支持视频列表播放（如抖音上下滑）？

```
-使用 RecyclerView + PlayerView 复用；
-每个 item 共享同一个 ExoPlayer 实例；
-滑动到当前项时重新绑定 PlayerView；
-离开屏幕时 player.pause()，并解绑。
```

### 2.8 如何播放本地文件/视频流/直播？

```
// 本地文件
val mediaItem = MediaItem.fromUri(Uri.fromFile(File("/sdcard/video.mp4")))

// 网络流
val mediaItem = MediaItem.fromUri("https://example.com/video.mp4")

// 直播流（HLS）
val mediaItem = MediaItem.fromUri("https://example.com/live.m3u8")
```

### 2.9 如何支持视频播放倍速？

```
player.setPlaybackParameters(PlaybackParameters(speed = 1.5f))
```

### 2.10 如何实现 ExoPlayer 的预加载（Preload）？

```
方法：使用 preload prepare + seekTo 控制
player.setMediaItem(item, /*startPosition=*/C.TIME_UNSET)
player.prepare() // 提前加载，但不播放

也可以配合 MediaSource 缓存预加载某段内容到 SimpleCache 中。
```

### 2.11 如何控制缓存目录大小和清理策略？

```
val evictor = LeastRecentlyUsedCacheEvictor(100 * 1024 * 1024) // 100MB
val cache = SimpleCache(cacheDir, evictor)

可以定期清理缓存文件，也可自定义缓存策略替换默认的 CacheEvictor。
```

### 2.12 如何实现静音播放 / 循环播放？

```
// 静音
player.volume = 0f

// 循环播放
player.repeatMode = Player.REPEAT_MODE_ONE
```

### 2.13 ExoPlayer 如何控制播放的画面比例？

```
playerView.resizeMode = AspectRatioFrameLayout.RESIZE_MODE_FIT

支持：
-RESIZE_MODE_FIT：等比缩放（默认）
-RESIZE_MODE_FILL：填满不留黑边（可能裁剪）
-RESIZE_MODE_ZOOM：拉伸画面
```

### 2.14 如何播放视频的指定片段（如 1-10 秒）？

```
val mediaItem = MediaItem.Builder()
    .setUri(videoUri)
    .setClippingConfiguration(
        MediaItem.ClippingConfiguration.Builder()
            .setStartPositionMs(1000)
            .setEndPositionMs(10000)
            .build()
    )
    .build()

player.setMediaItem(mediaItem)
player.prepare()
```

### 2.15 ExoPlayer 在后台播放或悬浮窗支持吗？

```
后台播放：支持，只需设置音频焦点策略；
悬浮窗播放（画中画 PiP）：可结合 Android PiP 模式使用；
需设置：
android:supportsPictureInPicture="true"
并在 onUserLeaveHint() 中触发 enterPictureInPictureMode()。
```

### 2.16 总结

|      能力项       |  是否支持   |
| :---------------: | :---------: |
|    流媒体播放     |      ✅      |
| DRM、广告、字幕等 |      ✅      |
|     缓存机制      | ✅（可定制） |
|    视频帧控制     |      ✅      |
| 多种媒体格式支持  |      ✅      |
|   HLS/DASH 支持   |      ✅      |
|    视频预加载     |      ✅      |
|   播放列表支持    |      ✅      |

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)