---
title: Android面试题——掘金-音视频之项目相关(9.7)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: f3b77947
date: 2025-04-07 19:56:43
---
## 一 概述

```
1.项目中使用了哪个播放器框架？为什么？
2.如何自定义播放器组件（如控制条、封面）？
3.如何实现边下边播？缓存策略如何设计？
4.是否遇到过花屏、卡顿、黑屏？如何排查？
5.播放失败时如何做错误恢复和降级处理？
```

<!--more-->

## 二 项目相关

### 2.1  项目中使用了哪个播放器框架？为什么？

```
在项目中我们常用的是 ExoPlayer，原因如下：

一、为什么选用 ExoPlayer：
-Google 官方出品，维护活跃：与 Android 系统高度兼容，更新及时，文档完善。
-高度可定制：支持自定义渲染器、缓冲策略、加载逻辑，适合复杂业务场景如直播、短视频、教育等。
-支持多种协议：原生支持 MP4、HLS、DASH、SmoothStreaming 等主流协议，拓展性强。
-支持自适应码率（ABR）播放：对网络状态敏感，自动调整视频质量，提升用户体验。
-内置播放状态监听器：易于实现播放状态、缓冲进度、错误处理等监控功能。

二、总结：
项目中使用 ExoPlayer 是因为它官方支持、扩展性强、协议丰富，
能满足我们对视频点播和流媒体播放的多样化需求。
适合中大型项目中灵活控制播放行为。
```

### 2.2 如何自定义播放器组件（如控制条、封面）？

```
自定义播放器组件（如控制条、封面）通常是在 ExoPlayer 基础上，通过自定义 UI 控件来实现：

一、实现方式：
1.1 使用 PlayerView 并自定义布局
-PlayerView 是 ExoPlayer 提供的封装控件，支持通过自定义 XML 替换控制条、封面、加载动画等组件。
-示例：
<com.google.android.exoplayer2.ui.PlayerView
    android:id="@+id/player_view"
    app:controller_layout_id="@layout/custom_controller"
    ... />
    
1.2 自定义控制条布局（custom_controller.xml）
-在布局中添加播放、暂停、进度条、全屏按钮等控件，绑定 player 控制器进行交互。

1.3 添加封面图（Cover）控件
-在PlayerView中添加ImageView作为封面图层，在播放开始后通过监听onPlayerStateChanged()隐藏封面。
-示例：

player.addListener(object : Player.Listener {
    override fun onPlaybackStateChanged(state: Int) {
        if (state == Player.STATE_READY) {
            coverImageView.visibility = View.GONE
        }
    }
})

1.4 控制逻辑与样式分离
-控制条逻辑放在自定义 Controller 类中，便于复用。
-封面、加载动画可以设置透明层叠显示，播放时隐藏即可。

二、总结：
自定义播放器组件主要通过重写 PlayerView 的控制器布局，自定义封面、控制条，
并结合 Player.Listener 控制显示隐藏逻辑，UI 和播放状态解耦，灵活适配业务需求。
```

### 2.3 如何实现边下边播？缓存策略如何设计？

```
一、概念
实现边下边播（即 Progressive Download）主要依赖播放器的流式能力和合理的缓存策略设计。

二、实现方式（以 ExoPlayer 为例）
2.1 使用 ProgressiveMediaSource
-支持 HTTP 流式传输，不需要文件完全下载完成就可播放。
val mediaSource = ProgressiveMediaSource.Factory(dataSourceFactory)
    .createMediaSource(MediaItem.fromUri(url))

2.2 启用缓存机制（SimpleCache）
-ExoPlayer 提供 SimpleCache 类，实现磁盘缓存，缓存策略可配置。
val cache = SimpleCache(cacheDir, LeastRecentlyUsedCacheEvictor(MAX_SIZE))
val cacheDataSourceFactory = CacheDataSource.Factory()
    .setCache(cache)
    .setUpstreamDataSourceFactory(httpDataSourceFactory)

2.3 播放中自动写入缓存
播放过程中数据会自动写入 SimpleCache，下次可直接读取本地缓存。

三、缓存策略设计建议：
-缓存目录设置：放在 app 私有目录，避免用户手动清理。
-缓存大小控制：使用 LRU 淘汰策略，避免磁盘空间占满。
-预加载策略：
 -视频列表页提前预加载封面几秒内容。
 -进入详情页再加载剩余部分。
-断点续播：结合缓存文件和播放进度记录。

四、总结：
实现边下边播核心在于 流式播放 + 本地缓存。使用 ExoPlayer 的 
SimpleCache + ProgressiveMediaSource 可轻松实现，
配合合理的预加载与缓存清理策略，兼顾播放流畅与磁盘占用。
```

### 2.4 是否遇到过花屏、卡顿、黑屏？如何排查？

```
实际项目中常会遇到花屏、卡顿、黑屏等问题。排查时可从以下几方面入手：

一、常见问题与排查思路：
1.1 黑屏
原因：
-Surface 未准备好或未绑定。
-播放器未正确初始化。
-视频源异常（404、0kb）。

排查：
-检查 PlayerView 是否显示。
-检查 player.setVideoSurface() 是否执行。
-监听播放器回调 onPlayerError 判断是否播放失败。

1.2  花屏
原因：
-解码器异常，尤其是硬解。
-视频源码流损坏或不标准。

排查：
-改为软解试试（ExoPlayer 支持软硬解切换）。
-使用 VLC、FFmpeg 验证源视频是否正常。
-检查 MediaCodec 输出格式。

1.3 卡顿
原因：
-网络缓冲不够。
-播放器缓存设置太小。
-解码耗时高、掉帧。

排查：
-开启 ExoPlayer 的日志，观察 onIsPlayingChanged 与 buffering 状态。
-使用 ANR-WatchDog 或 Choreographer 检测主线程掉帧。
-观察 FPS 和播放延迟。

二、工具推荐：
-ExoPlayer PlaybackStats
-Android Studio Profiler（CPU、Memory）
-日志分析（EventLogger）
-FFmpeg 检测视频流是否损

三、总结：
黑屏多是渲染或视频源问题，花屏通常是解码或视频流异常，卡顿可能是网络/解码/主线程卡顿。
建议配合播放器回调、日志、性能监控工具多维度排查。
```

### 2.5 播放失败时如何做错误恢复和降级处理？

```
当播放失败时，为了提升用户体验，应及时进行错误恢复与降级处理。
以下是常见做法：

一、错误恢复与降级策略：
1.1 播放失败自动重试
-设置最大重试次数（如 3 次），重试间隔可使用指数退避。
-使用 ExoPlayer.Listener.onPlayerError() 中判断错误类型，决定是否重试。

1.2 降级处理
-切换清晰度：若播放高清失败，尝试切换到标清或流畅。
-切换播放源：主源失败后切备用源（CDN）。
-切换解码模式：硬解失败尝试软解。

1.3 UI 反馈
-明确提示用户“播放失败”并提供“重试”按钮。
-加入 loading 动画避免“卡死感”。

1.4 埋点与日志上报
-记录错误码、错误信息、网络状态、URL 等信息，用于线上排查。
-常见错误码如：
 -网络超时
 -解码器初始化失败
 -404/403 等源错误
 
二、总结：
播放失败时要做到“自动尝试 + 智能降级 + 及时反馈 + 异常上报”，提高容错能力和用户体验。
常见降级路径包括切码率、切源、切解码器。 
```

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)