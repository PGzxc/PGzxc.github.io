---
title: Android面试题——高频面试题之音视频图(3)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 1d063014
date: 2025-09-22 16:24:58
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二 面试要求和面试题

### 2.1 面试要求(技术点提取)

```
1.MLKit(ai应用-图像识别，nlp,大模型语音对话)
2.TensorFlow Lite(ai应用-图像识别，nlp,大模型语音对话)
3.ML Kit vs TFLite 对比
4.im聊天
5.图形图像
6.音视频处理技术，短视频经验
7.集成三方视频通话组件：webrtc，zoom sdk等
8.音视频编码器和相关技术：如h.264,h.265,ffmpeg，aac等
9.音视频传输协议(rtmp/hls)及cdn分发
```

## 三 面试题解答(仅供参考)

### 3.1 ML Kit(AI应用-图像识别,nlp,大模型语音对话)

1、概念

```
ML Kit 是 Google 提供的移动端机器学习 SDK，
集成预训练模型，开箱即用，适合快速实现 AI 功能
```

2、常见功能

```
1、图像识别
-文本识别（OCR）：识别图片里的文字。
-人脸检测：检测人脸位置、表情。
-条码扫描：识别二维码/条形码。
-图像分类/物体检测：识别物体类别。

2、NLP
-翻译：支持 50+ 种语言，部分离线。
-实体抽取：识别姓名、地址、邮箱。
-语音转文本：部分需联网。

3、语音/大模型对话

-ML Kit 本身不提供 LLM，
ML Kit不直接支持 LLM，需配合 Google Cloud Speech-to-Text 或外部大模型 API（如 Gemini）。
架构：端侧预处理（录音、VAD、压缩）→ 云端大模型 → 返回文本/TTS。
```

3、面试要点

```
1、适用场景：
快速集成 OCR、人脸检测、翻译等，适合简单 AI 需求；缺点是模型定制化有限。

2、Android 使用：
通过Firebase ML Kit或独立 SDK，调用API(如 TextRecognizer.processImage())，内置 TFLite 推理。
```

### 3.2 TensorFlow Lite(AI应用-图像识别,nlp,大模型语音对话)

1、概念

```
TFLite 是 TensorFlow 的移动端推理框架，支持自定义模型，适合复杂/定制化 AI 需求
```

2、常见功能

```
1、图像识别
-分类：如猫狗识别。
-目标检测：识别物体位置 + 标签。
-人脸关键点检测、人像分割

2、NLP
-文本分类：情感分析、垃圾邮件检测。
-关键词检测：如 Wake Word。
-轻量模型：MobileBERT、ALBERT

3、大模型语音对话
-轻量模型（量化/蒸馏）在端侧推理，大模型需云端 API。
-架构：端侧 TFLite 快速响应 + 云端增强。
```

3、模型优化手段

```
量化：Float32 → Int8，减小模型体积，加速推理。
硬件加速：委托 GPU/NNAPI/CoreML。
剪枝/蒸馏：减少参数，提升效率
```

4、面试问法 & 答案要点

```
1、为什么要用 TFLite 而不是 ML Kit？
-ML Kit 提供现成 API，适合常见场景；
-TFLite 可以部署自己训练的模型，适合定制化需求。

2、 如何在 Android 使用 TFLite？
-转换模型（SavedModel → TFLite）。
-加载模型（Interpreter）。
-输入预处理 → 推理 → 输出后处理。
-可选 GPU Delegate/NNAPI 加速。

3、如何在端上运行 NLP/对话模型？
-使用轻量模型（如 MobileBERT），结合量化与蒸馏，部署在 TFLite；
-大模型对话通常需要云端 API，端上主要负责语音采集/VAD/简单推理。
```

### 3.3 ML Kit vs TFLite 对比

1、表格

|    特点    |         ML Kit         |        TensorFlow Lite         |
| :--------: | :--------------------: | :----------------------------: |
|    定位    | 提供现成 API，开箱即用 |   部署自定义模型，灵活可扩展   |
|  常见场景  |  OCR、人脸检测、翻译   | 图像分类、目标检测、自定义 NLP |
|  开发难度  |          简单          |    中等，需要模型训练/转换     |
|  性能优化  |        内置优化        |     需开发者量化/剪枝/加速     |
|  离线支持  |   部分(OCR、翻译等)    |         支持，且更灵活         |
| 大模型对话 |  依赖云端(大模型 API)  |  可用轻量 NLP 模型，本地推理   |

2、总结

```
ML Kit 适合快速集成通用功能，
TFLite 适合定制化 AI 需求。
大模型对话多采用端云结合架构
```

### 3.4 im聊天

1、IM 常用的网络协议有哪些？各自优缺点？

```
TCP 长连接：可靠、有序，适合聊天消息；需心跳维持，移动网络下易掉线。
UDP：低延迟，适合实时语音/视频；但不可靠。
WebSocket：基于 TCP，跨平台、跨浏览器，适合移动端 + Web 聊天。
HTTP/2 / gRPC：支持多路复用，常用于推送和 API 调用。
实际：移动端 IM 常用 TCP 长连接 + Protobuf/JSON + 心跳。
```

2、消息服务器的核心功能是什么？

```
接入层：维持长连接（如 Netty）。
路由层：消息转发（点对点、群聊）。
存储层：保存历史/离线/未读消息。
推送层：对接 APNs/FCM，确保离线消息送达。
大型 IM：分布式服务器 + 水平扩展（如微信）
```

3、IM 消息如何存储？

```
本地存储：SQLite / Room / MMKV，保存会话列表和最近聊天记录，提升加载速度。
服务端存储：MySQL/MongoDB/HBase + Redis，用于完整历史消息和离线消息。
离线消息机制：用户不在线时，服务端存储未读消息；上线后拉取。

要点：保证 顺序、幂等性、快速查询。
```

4、如何保证消息不丢失？

```
ACK 机制：客户端/服务端双向确认。
重传机制：超时未收到 ACK 自动重发。
消息顺序：会话内有序 ID。
幂等性：消息 ID 去重
```

5、IM 消息如何保证安全？

```
传输安全：TLS/SSL。
内容加密：AES（对称）、RSA/ECC（非对称，主要用于密钥交换）。
完整性校验：HMAC-SHA256 防篡改。
端到端加密 (E2EE)：如 Signal/WhatsApp，消息仅在用户设备解密。
```

6、常见的第三方 IM SDK 有哪些？优缺点？

```
1、IM SDK
-环信 (EaseMob)：功能全，国内常用，适合快速接入。
-融云 (RongCloud)：稳定性好，支持实时音视频。
-声网 (Agora)：擅长实时音视频，IM 功能相对轻量。
-腾讯云 IM (TIM/IMSDK)：大规模并发能力强，支持 QQ/微信同款协议。
-JMessage (极光 IM)：集成简单，功能较轻量。

2、使用场景：
-自研 IM → 灵活可控，适合大厂。
-三方 SDK → 快速上线，适合中小团队/快速验证。
```

### 3.5 图形图像

1、在 Android 中如何高效加载和处理大图？

```
问法:如果需要在 Android 中加载超大图片（如 4K、长图），怎么避免 OOM？

1、方法：
采样缩放：BitmapFactory.Options 设置 inSampleSize，降低分辨率。
区域解码：BitmapRegionDecoder 解码可视区域（适合长图、地图）。
硬件位图：API 26+ 使用 HARDWARE 配置，减少内存。
内存管理：LruCache 复用 Bitmap，及时 recycle()。

2、总结：
缩放 + 局部解码 + 内存复用避免 OOM
```

2、Glide 和 Picasso 有什么区别？你更推荐哪个？

```
1、Glide

特点：支持 GIF、视频帧、缩略图；内存缓存和磁盘缓存优化好；与 RecyclerView 结合流畅。
API 示例：
Glide.with(context)
    .load(url)
    .placeholder(R.drawable.loading)
    .error(R.drawable.error)
    .into(imageView)
    
2、Picasso

特点：轻量，API 简洁；适合基础图片加载需求。
缺点：不支持 GIF，性能和缓存策略比 Glide 略弱。
API 示例：

Picasso.get()
    .load(url)
    .placeholder(R.drawable.loading)
    .error(R.drawable.error)
    .into(imageView)   
    
3、对比总结：
Glide：主流首选，功能全面。
Picasso：轻量，简单场景。
Fresco：大图专精，防 OOM   
```

### 3.6 音视频处理技术，短视频经验

相关知识点

```
用MediaCodec/MediaExtractor处理，ExoPlayer播放。
短视频经验：剪辑（FFmpeg）、特效（OpenGL）
```

1、Android 如何用 MediaCodec + MediaExtractor 实现音视频解码与播放？

```
1、MediaExtractor：
解析音视频轨道，获取压缩数据（MIME、时长等）

2、MediaCodec：
硬件编解码，解码 H.264/H.265/AAC 输出原始帧

3、典型流程：
-MediaExtractor 选择轨道。
-MediaCodec.configure() 设置解码器（MIME、Surface）。
-循环 queueInputBuffer() → dequeueOutputBuffer()。
-视频渲染到 Surface，音频交给 AudioTrack。
```

2、为什么推荐用 ExoPlayer 而不是原生 MediaPlayer？

```
1、MediaPlayer 缺点：
功能单一，扩展性差，很多流媒体格式不支持。

2、ExoPlayer 优势：
-支持更多协议（DASH、HLS、SmoothStreaming）。
-支持自定义渲染器，方便做特效。
-内置缓存机制（减少网络请求）。
-支持 DRM、字幕、ABR（自适应码率）。

3、选择：
短视频/流媒体用 ExoPlayer，
本地播放可用 MediaPlayer
```

3、短视频如何实现剪辑、拼接？

```
1、FFmpeg 常用操作：
-裁剪：ffmpeg -i input.mp4 -ss 00:00:05 -t 10 output.mp4 （截取 5s-15s）
-拼接：先生成 file list.txt → ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
-转码压缩：ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output.mp4

2、原理：
FFmpeg 解析封装格式（demuxer），处理编码流（codec），再封装输出。

3、实际开发：
Android：通过 JNI 调用 MobileFFmpeg
```

4、如何在 Android 上给视频加滤镜或特效？

```
1、OpenGL ES：
-使用 SurfaceTexture 或 EGLSurface 获取视频帧。
-通过 片元着色器 (Fragment Shader) 实现滤镜（如美颜、模糊、色彩调整）。
-渲染到屏幕或编码器输入 Surface。

2、常用库：
-GPUImage：封装好的滤镜库，支持美颜、滤镜叠加。
-OpenGL + MediaCodec：可以实现边解码边渲染特效，再编码生成新视频。

3、加分点：
提到 CameraX + OpenGL 结合，实现拍摄 + 实时滤镜
```

### 3.7 集成三方视频通话组件：webrtc，zoom sdk等

1、WebRTC 的核心原理是什么？

```
1、介绍
WebRTC 是 Google 开源的 实时音视频通信框架，

2、核心流程：
-媒体采集：摄像头（VideoCapturer）+ 麦克风（AudioSource）。
-信令交换：通过 WebSocket/MQTT 交换 SDP 和 ICE Candidate。
-连接建立：STUN/TURN 实现 NAT 穿透，PeerConnection 建立 P2P。
-媒体传输：SRTP 加密，RTP/RTCP 传输音视频。

3、关键：采集 → 信令 → NAT 穿透 → 传输 → 解码渲染。
```

2、在 Android 项目中如何集成 WebRTC？

```
1、步骤
引入依赖：org.webrtc:google-webrtc:x.x.x.
初始化 PeerConnectionFactory.
获取媒体流：VideoCapturer + AudioSource.
建立连接：createOffer()/createAnswer() 生成 SDP，交换 ICE Candidate.
渲染：SurfaceViewRenderer 显示视频.

2、注意：
权限（Camera、Audio）、带宽自适应、内存/电池优化。
```

3、Zoom SDK 注意事项

```
鉴权（Key/Secret）、权限、UI 定制、版本兼容、License 限制
```

4、总结

```
WebRTC 原理：采集 → 信令 → NAT 穿透 (STUN/TURN) → SRTP 传输 → 解码渲染。
WebRTC Android 集成：依赖 → PeerConnectionFactory → 媒体流 → SDP/ICE → 渲染。
Zoom SDK 注意事项：鉴权（Key/Secret）、权限、UI 定制、版本兼容、License 限制。
```

### 3.8 音视频编码器和相关技术：如h.264,h.265,ffmpeg，aac等

1、H.264 vs H.265

```
H.264 (AVC)：主流视频编码，广泛兼容。
H.265 (HEVC)：压缩效率高 30-50%，支持 4K/8K，计算复杂。
选择：H.264 兼容性好，H.265 适合高画质/低带宽。
```

2、FFmpeg

```
1、作用：FFmpeg 是一个开源的音视频处理库，功能极其强大。

2、它能够实现：
-编解码：支持几乎所有音视频格式的编解码。
-转码：将一种格式的视频转换为另一种格式。
-剪辑和合并：进行视频的剪切、拼接等操作。
-滤镜和特效：支持添加各种音视频特效。
-流媒体：支持推流和拉流。

3、在 Android 开发中，通常通过 JNI 方式集成 FFmpeg，实现复杂的本地音视频处理。
```

3、 I/P/B 帧作用？

```
I 帧：独立存储，seek 方便，码率高。
P/B 帧：依赖前后帧，压缩率高，容错差
```

4、AAC 常用配置？

```
采样率：44.1kHz/48kHz.
码率：单声道 16-64kbps（语音），双声道 96-128kbps（音乐）。
类型：LC-AAC（通用），HE-AAC（低码率优化）。
```

### 3.9 音视频传输协议(rtmp/hls)及cdn分发

相关知识点

```
RTMP低延迟推流，HLS自适应拉流。CDN加速全球分发
```

1、RTMP 低延迟推流

```
1、RTMP（Real-Time Messaging Protocol）：
最常用的推流协议，基于 TCP。

2、特点：
-支持低延迟（1-3s）。
-传输视频、音频、字幕等数据。
-需搭配 Flash/RTMP 服务器（如 Nginx-RTMP、SRS、Wowza）。

3、应用场景：
主播端推流到媒体服务器（如抖音/快手/斗鱼直播）。

4、实现步骤：
-使用 MediaCodec 编码（H.264 + AAC）。
-封装为 FLV 格式。
-通过 RTMP 协议推送到流媒体服务器。
```

2、HLS 自适应拉流

```
1、HLS（HTTP Live Streaming）：
苹果提出，基于 HTTP + M3U8 的拉流协议。

2、特点：
-延迟较高（5-30s）。
-支持 自适应码率（ABR，自动切换 480p/720p/1080p）。
-兼容性好（iOS、Android、Web 都支持）。

3、实现原理：
-服务端将视频分片（TS/MP4），生成索引文件（M3U8）。
-客户端播放器（如 ExoPlayer）按需请求分片并播放。

4、应用场景：
点播、延迟不敏感的直播（电视、教育）。
```

3、CDN 加速与全球分发

```
1、作用：全球分发，降低延迟，减少卡顿。
2、机制：
-边缘节点缓存热点内容。
-负载均衡选择最优节点。
-回源拉取未缓存资源。

3、厂商：阿里云、腾讯云、AWS CloudFront、Akamai.
```

4、总结回答

```
RTMP：低延迟推流。
HLS/DASH：自适应拉流。
低延迟优化：HTTP-FLV、WebRTC（200ms-1s）、LL-HLS.
CDN：边缘节点 + 负载均衡，确保全球访问效率。
```

