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

## 二 面试要求和面试题(后续类似不再详述)

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

### 3.1 MLKit(ai应用-图像识别，nlp,大模型语音对话)

1、概念

```
ML Kit 是 Google 提供的 移动端机器学习 SDK，
集成了常见的 预训练模型，无需自己训练或部署，适合快速落地
```

2、常见功能

```
1、图像识别
-文本识别（OCR）：识别图片里的文字。
-人脸检测：检测人脸位置、表情。
-条码扫描：识别二维码/条形码。
-图像分类 / 物体检测：识别物体类别。

2、NLP
-翻译（50+ 种语言离线支持）。
-实体抽取（姓名、地址、邮箱）。
-语音转文本（部分功能需联网）。

3、语音/大模型对话

-ML Kit 本身不提供 LLM，
但可以配合Google Cloud Speech-to-Text或外部大模型 API(如 ChatGPT、Gemini)使用。

-架构：端侧预处理(录音 → VAD → 压缩) → 云端大模型 → 返回文本/TTS。
```

3、面试问法 & 答案要点

```
1、ML Kit 适合什么场景？
-快速集成常用 AI 功能，无需训练模型，适合 OCR、人脸检测、翻译等。
-缺点是模型不可高度自定义，灵活性差。

2、ML Kit 在 Android 怎么用？
通过 Firebase ML Kit 或独立 ML Kit SDK，
调用 API（如 TextRecognizer.processImage()）即可，内部已集成 TFLite 推理。
```

### 3.2 TensorFlow Lite(ai应用-图像识别，nlp,大模型语音对话)

1、概念

```
TFLite 是 TensorFlow 的移动端推理框架，支持 自定义模型，适合做更复杂/定制化的 AI。
```

2、常见功能

```
1、图像识别
-分类（Image Classification）：如猫狗识别。
-目标检测（Object Detection）：检测目标位置 + 标签。
-人脸关键点检测、人像分割。

2、NLP
-文本分类（情感分析、垃圾邮件检测）。
-关键词检测（Wake Word）。
-自然语言模型（BERT 蒸馏版、MobileBERT）。

3、大模型语音对话
-大模型(LLM)一般无法完整部署到手机，但可用 量化/蒸馏模型，例如 MobileBERT、ALBERT，在手机端做轻量推理。
-常见架构：端侧模型 (TFLite) + 云端大模型 API 结合，做边缘计算（快速响应）+ 云端增强。
```

3、模型优化手段

```
-量化（Float32 → Int8），减少模型大小、加快推理速度。
-委托 GPU / NNAPI / CoreML 加速。
-模型剪枝、蒸馏（Distillation）。
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
ML Kit：适合 快速集成常见 AI 功能(OCR、人脸检测、翻译)，内部其实就是封装了 TFLite 模型。
TFLite：适合 部署自定义模型(图像识别、NLP、轻量大模型)，支持量化、GPU/NNAPI 加速。
大模型语音对话：通常采用 端上轻量模型 + 云端大模型 API 的混合架构，端侧主要做预处理和低延迟响应。
```

### 3.4 im聊天

1、IM 常用的网络协议有哪些？各自优缺点？

```
CP 长连接：可靠、有序，适合聊天消息；需心跳维持，移动网络下易掉线。
UDP：低延迟，适合实时语音/视频；但不可靠。
WebSocket：基于 TCP，跨平台、跨浏览器，适合移动端 + Web 聊天。
HTTP/2 / gRPC：支持多路复用，常用于推送和 API 调用。

实际：移动端 IM 一般用 TCP 长连接 + 自定义协议（Protobuf/JSON）+ 心跳机制。
```

2、消息服务器的核心功能是什么？

```
接入层：维持长连接（如 Netty）。
路由层：负责消息转发（点对点、群聊）。
存储层：保存消息（历史/离线/未读）。
推送层：与 APNs、FCM 等对接，保障离线消息送达。

大型 IM（如微信、钉钉）采用 分布式消息服务器 + 水平扩展。
```

3、IM 消息如何存储？

```
本地存储：SQLite / Room / MMKV，保存会话列表和最近聊天记录，提升加载速度。
服务端存储：MySQL/MongoDB/HBase + Redis，用于完整历史消息。
离线消息机制：用户不在线时，服务端存储未读消息；上线后拉取。

要点：保证 顺序、幂等性、快速查询。
```

4、如何保证消息不丢失？

```
ACK 机制：Client/Server 双向确认。
重传机制：超时未收到 ACK → 自动重发。
消息顺序：会话内消息有序 ID。
幂等性：消息 ID 去重，防止重复投递。

实际：微信采用 双向 ACK + 本地消息队列
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
-三方 SDK → 快速上线，适合中小团队/快速验证 MVP。
```

### 3.5 图形图像

1、在 Android 中如何高效加载和处理大图？

```
问法:如果需要在 Android 中加载超大图片（如 4K、长图），怎么避免 OOM？

回答：
1、按需采样(inSampleSize)：使用 BitmapFactory.Options 设置采样率，避免一次性加载完整尺寸。
2.按需区域解码(RegionDecoder):使用 BitmapRegionDecoder，只解码可视区域（适合长图、地图类应用）。
3.使用硬件加速 & 硬件位图:API 26+ 支持 inPreferredConfig = HARDWARE，减少内存占用。
4.避免内存泄漏
-用完及时 recycle()，或交给 GC。
-配合 LruCache/内存池复用 Bitmap。

总结：缩放采样 + 局部解码 + 内存复用 是关键
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

Glide：适合复杂场景（大图、GIF、视频帧缩略图），主流项目首选。
Picasso：适合轻量、简单的图片加载需求。
Fresco（Facebook 出品）：更适合需要处理大量大图的应用（如新闻/社交类 APP），底层内存优化更强。    
```

3、总结

```
1、大图加载：
采样缩放（inSampleSize）、局部解码（RegionDecoder）、Bitmap 复用、内存缓存。

2、三方库：
Glide → 功能全，主流首选
Picasso → 简单轻量
Fresco → 大图专精
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
从音视频文件中读取轨道(Track)，解析编码格式(MIME、时长、比特率等)，逐帧获取压缩数据。

2、MediaCodec：
硬件加速编解码器，支持 H.264/H.265/AAC 等，负责解码数据 → 输出原始帧。

3、典型流程：
-使用 MediaExtractor 选中视频/音频轨道。
-MediaCodec.configure() 配置解码器（传入 MIME 类型、宽高、surface 等）。
-循环读取压缩帧 → queueInputBuffer() → dequeueOutputBuffer() 取解码帧。
-视频 → 渲染到 Surface；音频 → 交给 AudioTrack 播放。
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

3、总结
-短视频/流媒体场景 → ExoPlayer；
-基础本地播放 → MediaPlayer 也够用
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
Android 上可调用 FFmpeg so 库（如 MobileFFmpeg）。
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

2.1、媒体采集：获取本地音频（麦克风）和视频（摄像头）。

2.2、信令交换 (Signaling)
-不包含在 WebRTC 内，需要开发者自定义（常用 WebSocket、MQTT）。
-用于交换 SDP（会话描述协议）和 ICE Candidate（网络信息）。

2.3、建立点对点连接 (PeerConnection)
-借助 STUN（公网探测）和 TURN（中继）实现 NAT 穿透。
-找到最佳传输路径。

2.4、媒体传输
-SRTP (Secure RTP) 加密音视频流，保证安全性。
-RTP/RTCP 协议：数据流 + 控制流。

3、关键：采集 → 信令 → NAT 穿透 → 传输 → 解码渲染。
```

2、在 Android 项目中如何集成 WebRTC？

```
1、步骤
1.1、引入依赖
使用 Google 提供的 aar，或者 implementation 'org.webrtc:google-webrtc:x.x.x'。

1.2、初始化环境
PeerConnectionFactory.initialize(
    PeerConnectionFactory.InitializationOptions.builder(context)
        .createInitializationOptions()
)

1.3、创建 PeerConnectionFactory：用于构建本地音视频 Track、PeerConnection。
1.4、获取媒体流：使用 VideoCapturer (摄像头) + AudioSource (麦克风)。
1.5、建立连接
-调用 createOffer() / createAnswer() → 生成 SDP。
-通过 信令服务器 发送给对方。

1.6、ICE 候选信息交换：通过 onIceCandidate() 回调收集网络信息。
1.7、渲染视频
使用 SurfaceViewRenderer 或 TextureViewRenderer 显示远端/本地视频。

2、注意点：
-移动端需处理 权限（Camera、Record Audio）。
-网络差时要支持 带宽自适应 / 降码率。
-长时间通话要考虑 内存/电池消耗。
```

3、总结

```
WebRTC 原理：采集 → 信令 → NAT 穿透 (STUN/TURN) → SRTP 传输 → 解码渲染。
WebRTC Android 集成：依赖 → PeerConnectionFactory → 媒体流 → SDP/ICE → 渲染。
Zoom SDK 注意事项：鉴权（Key/Secret）、权限、UI 定制、版本兼容、License 限制。
```

### 3.8 音视频编码器和相关技术：如h.264,h.265,ffmpeg，aac等

1、H.264 vs H.265

```
1、概念
H.264 (AVC)：当前最流行的视频编码标准。
H.265 (HEVC)：新一代视频编码标准。

2、主要区别：
在同等画质下，H.265 的压缩效率比 H.264 高 30-50%，
这意味着可以用更小的文件体积或更低的带宽传输更高质量的视频。

H.265 支持更高分辨率的视频（如 4K、8K），但计算复杂度更高。
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
I 帧独立存储，P/B 帧依赖前后帧。
I 帧多 → seek 方便但码率高；
I 帧少 → 压缩好但容错差。
```

4、AAC 常用配置？

```
44.1kHz/48kHz，单声道 16-64kbps（语音），双声道 96-128kbps（音乐）。
注意 LC-AAC/HE-AAC 差异。
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
1、为什么要用 CDN？
-直播用户分布全球，直接从源站访问会出现延迟和卡顿。
-CDN（内容分发网络）在全球布点，用户就近访问。

2、关键能力：
-边缘节点缓存：热点视频分片缓存到最近的节点。
-负载均衡：根据网络情况选择最优节点。
-回源机制：CDN 节点无资源时回源站拉取。

3、常见厂商：
阿里云 CDN、腾讯云 CDN、AWS CloudFront、Akamai。

4、面试常考点：
-RTMP 适合 推流（主播 -> 服务器）。
-HLS/DASH 适合 拉流（观众 -> CDN）。
-低延迟直播优化：HTTP-FLV、WebRTC（延迟 200ms-1s），取代传统 HLS。
```

4、总结回答

```
在直播场景中，通常采用 RTMP 作为推流协议，保证低延迟；
播放端常用 HLS，支持分片和自适应码率。
为了服务全球用户，会结合 CDN 加速，用户就近访问边缘节点，减少卡顿。
若对延迟要求更高，还可结合 WebRTC 或低延迟 HLS（LL-HLS） 方案
```

