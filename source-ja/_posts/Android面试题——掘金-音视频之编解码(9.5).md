---
title: Android面试题——掘金-音视频之编解码(9.5)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: '976196e3'
date: 2025-04-07 19:55:22
---
## 一 概述

```
1.常见的音视频压缩算法有哪些？
2.如何实现音视频录制并保存为 MP4？
3.如何使用 MediaCodec 进行编码和解码？
4.MediaCodec 和 FFmpeg 的优劣对比？
5.如何将音视频数据封装成 MP4 文件？
6.Android 中如何用 FFmpeg 解码音视频？
7.如何通过 FFmpeg 截取视频帧、转码、抽音频？
```

<!--more-->

## 二 音视频处理

### 2.1  常见的音视频压缩算法有哪些？

```
-视频压缩：H.264（AVC）、H.265（HEVC）、VP8、AV1
-音频压缩：AAC、MP3、Opus、Vorbis
```

### 2.2 如何实现音视频录制并保存为 MP4？

```
-音频采集（AudioRecord）+ 视频采集（Camera）
-分别编码（MediaCodec）
-封装音视频轨道（MediaMuxer）
-保存为 MP4 文件
```

### 2.3 如何使用 MediaCodec 进行编码和解码？

```
使用 MediaCodec 编码或解码视频/音频通常包括以下几个步骤，适用于 H.264、AAC 等格式：

一、MediaCodec 使用流程（编码/解码通用）
1.1 创建 Codec 实例
val codec = MediaCodec.createEncoderByType("video/avc") // 或 createDecoderByType
1.2 配置 Codec
codec.configure(format, surface, null, CONFIGURE_FLAG_ENCODE) //surface仅解码时使用
1.3 启动 Codec
codec.start()
1.4 输入数据（写入编码器 / 解码器）
val inputIndex = codec.dequeueInputBuffer(timeoutUs)
if (inputIndex >= 0) {
    val inputBuffer = codec.getInputBuffer(inputIndex)
    inputBuffer?.put(inputData)
    codec.queueInputBuffer(inputIndex, 0, dataSize, presentationTimeUs, flags)
}
1.5 获取输出数据（编码后的帧 / 解码后的图像）
val bufferInfo = MediaCodec.BufferInfo()
val outputIndex = codec.dequeueOutputBuffer(bufferInfo, timeoutUs)
if (outputIndex >= 0) {
    val outputBuffer = codec.getOutputBuffer(outputIndex)
    // 处理编码/解码后的数据
    codec.releaseOutputBuffer(outputIndex, renderToSurface)
}
1.6 释放资源
codec.stop()
codec.release()

二、 小贴士：
-编码需设置码率、帧率、I 帧间隔等参数；
-解码支持绑定 Surface 直接渲染；
-编码结束需要发送 EOS（end-of-stream）标志位；
-编解码过程通常配合 MediaExtractor、MediaMuxer 使用。

三、总结
MediaCodec 提供底层硬编解码能力，通过输入输出 Buffer 队列方式，
完成高效的视频/音频编码与解码，是实现自定义播放器、推流器的核心组件
```

### 2.4 MediaCodec 和 FFmpeg 的优劣对比？

一、MediaCodec（硬编解码）

|      优点       |                       说明                       |
| :-------------: | :----------------------------------------------: |
|   ✅ 硬件加速    |   利用 SoC 提供的编码/解码芯片，性能高，功耗低   |
|    ✅ 延迟低     |      适合实时场景，如直播、通话、低延时播放      |
| ✅ 系统 API 支持 | 与 `MediaExtractor`、`MediaMuxer` 等组件配合良好 |
|  ❌ 平台差异大   |       不同设备支持的编码格式/参数存在差异        |
|   ❌ 功能有限    |        不支持复杂滤镜、转码，解封装能力弱        |

二、FFmpeg（软编解码）

|      优点      |                        说明                        |
| :------------: | :------------------------------------------------: |
| ✅ 格式支持丰富 |     支持几乎所有音视频格式、编解码器、封装协议     |
|   ✅ 功能强大   |     转码、混流、剪辑、滤镜、美颜等高级处理能力     |
| ✅ 跨平台一致性 |       Android、iOS、Windows 都能保持一致行为       |
|  ❌ CPU占用高   | 软编解码耗费大量 CPU，功耗大，不适合实时高性能场景 |
|   ❌ 集成复杂   |        需编译 .so 库，体积大，兼容性问题多         |

三、总结

|           场景           |                推荐方案                 |
| :----------------------: | :-------------------------------------: |
|    实时推流、视频通话    |   **MediaCodec**（低延迟 + 硬编解码）   |
| 视频编辑、转码、滤镜处理 |      **FFmpeg**（功能强 + 格式广）      |
|          播放器          | 通常二者混合使用：`MediaCodec + FFmpeg` |

### 2.5 如何将音视频数据封装成 MP4 文件？

```
一、封装 MP4 的流程
1.1 创建 MediaMuxer 实例
val muxer = MediaMuxer(outputPath, MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4)

1.2 添加音频/视频轨道：使用 MediaCodec 编码后获得的 MediaFormat
val videoTrackIndex = muxer.addTrack(videoFormat)
val audioTrackIndex = muxer.addTrack(audioFormat)

1.3 启动封装器
muxer.start()

1.4 写入编码后的数据：获取到编码后的 ByteBuffer 和 BufferInfo 后调用：
muxer.writeSampleData(trackIndex, encodedBuffer, bufferInfo)

1.5 结束封装并释放资源
muxer.stop()
muxer.release()

二、注意事项
-添加轨道前不能调用 start()；
-writeSampleData() 需要配合正确的时间戳（bufferInfo.presentationTimeUs）；
-一般配合 MediaCodec 进行编码，或使用 FFmpeg 软编码后封装
```

### 2.6 Android 中如何用 FFmpeg 解码音视频？

```
一、概念
在 Android 中使用 FFmpeg 解码音视频，通常通过 JNI 调用 FFmpeg C/C++ 库实现，流程如下：

二、FFmpeg 解码音视频的简要流程
2.1 初始化 FFmpeg
av_register_all(); // 已废弃但仍常见，建议使用 avformat_network_init()

2.2 打开输入文件或流
avformat_open_input(&fmt_ctx, inputPath, NULL, NULL);
avformat_find_stream_info(fmt_ctx, NULL);

2.3 查找音视频流索引
video_stream_index = av_find_best_stream(fmt_ctx, AVMEDIA_TYPE_VIDEO, ...);

2.4 打开解码器
AVCodec *codec = avcodec_find_decoder(codecpar->codec_id);
avcodec_open2(codec_ctx, codec, NULL);

2.5 读取并解码数据
while (av_read_frame(fmt_ctx, &pkt) >= 0) {
    if (pkt.stream_index == video_stream_index) {
        avcodec_send_packet(codec_ctx, &pkt);
        while (avcodec_receive_frame(codec_ctx, frame) == 0) {
            // 解码成功，可处理 YUV 数据
        }
    }
    av_packet_unref(&pkt);
}

2.6 释放资源
avcodec_free_context(&codec_ctx);
avformat_close_input(&fmt_ctx);

三、常见用途：
解码音频 PCM / 视频 YUV 数据；
-配合 OpenGL / AudioTrack 进行播放；
-用于播放器、剪辑工具、转码器中。

四、总结
FFmpeg 解码灵活强大，支持多种格式，适合复杂场景。
Android 中需通过 JNI 封装 C 层接口调用，并结合 OpenGL ES 或 AudioTrack 实现图像或音频播放。
```

### 2.7 如何通过 FFmpeg 截取视频帧、转码、抽音频？

```
使用 FFmpeg 可以轻松实现视频帧截取、转码、提取音频等功能，以下是三种典型操作的简短描述：

1. 截取视频某一帧为图片（如 JPG、PNG）
ffmpeg -ss 00:00:05 -i input.mp4 -frames:v 1 -q:v 2 output.jpg

-ss：截取时间点（秒）
-frames:v 1：只截一帧
-q:v：图片质量（越小越清晰）

2. 视频转码（如 MP4 转为 H.264 编码）
ffmpeg -i input.avi -c:v libx264 -preset fast -crf 23 -c:a aac output.mp4

-c:v libx264：视频使用 H.264 编码
-crf：画质参数（0-51，默认23）
-preset：转码速度（越快体积越大）
-c:a aac：音频编码为 AAC

3. 提取音频（抽离为 MP3/AAC 文件）
ffmpeg -i input.mp4 -vn -acodec copy output.aac

-vn：不处理视频
-acodec copy：直接复制原音频，不重新编码

4 总结
使用 FFmpeg 命令即可完成常见的帧截取、转码、抽音频等音视频处理任务，
适合 Android 离线处理或后端批处理。
在 Android 中可通过 JNI 或调用 FFmpeg 命令行实现。
```

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)