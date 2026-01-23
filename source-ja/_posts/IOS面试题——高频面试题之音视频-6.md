---
title: IOS面试题——高频面试题之音视频(6)
categories:
  - 面试相关
  - IOS面试题
tags:
  - IOS面试题
abbrlink: 7c833c2d
date: 2025-09-25 16:02:25
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
1.图形处理：工具(GPUImage, Core Image)+ 核心能力(图像加速处理)。
2.音视频：核心能力(采集、编解码)+ 实践场景(处理、播放)。
3.直播：核心协议(RTMP, WebRTC)+ 核心功能(推流/拉流)。
4.三方商业库：推送(APNs或第三方)、IM(即时通讯)、云平台(AWS/Aliyun)、支付(Apple Pay/支付宝/微信)、分享(Social SDK)
```

## 三 面试题解答(仅供参考)

### 3.1 图形处理

面试考点

```
Core Image：苹果原生框架，API 简单，内置大量滤镜，适合静态图像处理。  
GPUImage：开源框架，基于 OpenGL ES，更灵活，擅长实时视频处理与自定义滤镜。  
性能优化：GPU 加速、避免离屏渲染、异步处理、缓存与复用。
```

1、Core Image 与 GPUImage 的核心区别是什么？如何选择？

```
1、区别
-Core Image：原生框架，封装度高，滤镜丰富，适合快速实现照片/静态图像处理。
-GPUImage：基于 OpenGL ES，底层可控，擅长实时视频流处理和自定义复杂滤镜。

2、选择场景
-Core Image：照片滤镜、简单图像增强（快速开发）。
-GPUImage：实时美颜、视频特效、需要高度定制的场景。
```

2、GPU 加速如何提升图像处理性能？

```
原理：GPU 并行处理像素点，利用着色器（Shader）分担复杂计算 → 大幅减少 CPU 负载。
效果：在高分辨率图像和视频流处理中，能显著提升实时性和流畅度。
```

3、图像处理有哪些常见的优化策略？

```
GPU 优先：尽量使用 Core Image / GPUImage 等 GPU 加速框架。
避免离屏渲染：减少圆角、阴影等频繁离屏操作，可通过图层合成或 mask 优化。
异步处理：耗时任务放后台线程，避免阻塞主线程。
图像压缩：在保证效果的前提下降低分辨率，减少内存与运算开销。
缓存与复用：避免重复创建 CIContext、滤镜对象，提升性能。
```

4、如何用 Core Image 实现实时滤镜效果？

```
1、步骤
-将输入图像（UIImage / CMSampleBuffer）转为 CIImage。
-创建并配置 CIFilter。
-使用 CIContext 渲染输出为 UIImage / CVPixelBuffer。
-将结果显示到界面（可应用于视频帧回调中实现实时滤镜）。

2、Swift 示例

let inputImage = CIImage(image: UIImage(named: "photo")!)!
let filter = CIFilter(name: "CISepiaTone")!
filter.setValue(inputImage, forKey: kCIInputImageKey)
filter.setValue(0.8, forKey: kCIInputIntensityKey)

let context = CIContext()
if let outputImage = filter.outputImage,
   let cgImage = context.createCGImage(outputImage, from: outputImage.extent) {
    let result = UIImage(cgImage: cgImage)
}
```

5、面试总结

```
Core Image 强在易用性 + 静态图像；
GPUImage 强在灵活性 + 实时视频；
性能优化核心在于 GPU 加速、避免离屏渲染、异步处理、缓存复用。
```

### 3.2 音视频

面试考点

```
采集：AVFoundation 获取摄像头、麦克风数据
编解码：VideoToolbox / AudioToolbox（硬件加速），FFmpeg（多格式支持）
播放：AVPlayer（系统原生）、第三方播放器（IJKPlayer、VLC）
核心挑战：音视频同步（PTS）、实时处理、性能优化
```

1、简述 iOS 音视频处理的完整流程与核心框架。

```
1、处理流程
采集：AVCaptureSession 捕获音视频数据 → 输出 CMSampleBuffer
处理（可选）：滤镜、美颜、水印（Core Image / Metal / GPUImage）
编解码：硬件编码（H.264/AAC）或解码（VideoToolbox/AudioToolbox）
封装/传输：写入本地（MP4/Mov via AVAssetWriter），或推流（RTMP/HTTP-FLV/WebRTC）
播放：本地/网络播放（AVPlayer 或第三方播放器）

2、框架职责
AVFoundation：采集、播放、基础编解码
VideoToolbox / AudioToolbox：硬件加速编解码，低延迟、高性能
FFmpeg：跨平台/多格式支持，复杂协议处理（RTMP、RTSP、MPEG-TS 等）
```

2、iOS 视频采集和编码的流程是怎样的？

```
1、采集流程
初始化 AVCaptureSession
添加输入：AVCaptureDeviceInput（摄像头/麦克风）
添加输出：AVCaptureVideoDataOutput / AVCaptureAudioDataOutput
在 AVCaptureVideoDataOutputSampleBufferDelegate 中获取 CMSampleBuffer

2、编码流程
初始化编码器：AVAssetWriter（录制）、VTCompressionSession（硬件实时编码）
输入数据：采集回调中将 CMSampleBuffer 送入编码器
输出结果：获取压缩后数据（H.264/AAC）

3、关键点
权限：相机 & 麦克风授权
性能：后台线程做数据处理，避免阻塞主线程
```

3、iOS 中音视频同步的原理是什么？

```
1、时间戳（PTS）：
每个音频帧/视频帧带有播放时间戳

2、同步机制：
音频为主时钟（耳朵对延迟敏感）
视频根据 PTS 对齐音频，过早等待、过晚丢帧或加速渲染

3、播放器处理：
AVPlayer 自动对齐时间戳
直播/低延迟场景需手动管理时间戳，避免音画不同步
```

4、在 iOS 中如何选择合适的视频播放器？

```
1、AVPlayer
-原生、稳定，支持本地/主流网络格式（HLS、DASH）
-适合常规播放场景

2、第三方（IJKPlayer/VLC 等）
-基于 FFmpeg，支持更多协议（RTMP、RTSP）、低延迟直播、多格式兼容
-适合直播、跨平台或复杂场景

3、总结：
能用 AVPlayer 就用 AVPlayer，复杂协议/直播场景才用第三方。
```

### 3.3 直播

面试考点

```
协议：RTMP（传统直播）、WebRTC（低延迟互动）。
功能：推流、拉流、连麦、互动。
优化：弱网处理（码率自适应、丢包恢复）、延迟控制、性能优化。
```

1、直播的核心协议是什么？

```
1、RTMP (Real-Time Messaging Protocol)
基于 TCP，稳定性高，适合一对多广播（游戏/秀场直播）。
延迟：2–5 秒，需要流媒体服务器（Nginx-RTMP 等）。
iOS实现：常用 LFLiveKit，通过 AVCaptureSession 采集音视频，H.264/AAC 编码，推流至 RTMP 服务器。

2、WebRTC (Web Real-Time Communication)
基于 UDP，延迟 <1 秒，适合实时互动（视频会议/连麦）。
支持 NAT 穿透，传输灵活，要求网络良好。
iOS实现：使用官方 WebRTC SDK，配置 PeerConnection，实现点对点传输。
```

2、RTMP vs WebRTC 对比

2-1、对比

|    特性    |        RTMP(TCP)         |         WebRTC(UDP)          |
| :--------: | :----------------------: | :--------------------------: |
|    延迟    |          2-5 秒          |            <1 秒             |
|  适用场景  | 大规模直播（游戏、秀场） | 实时互动（连麦、教育、会议） |
| 实现复杂度 |  简单，依赖流媒体服务器  |   复杂，需信令与 NAT 穿透    |
|  iOS 工具  |    LFLiveKit / FFmpeg    |       官方 WebRTC 框架       |

2-2、选择依据：

```
RTMP → 大规模稳定直播场景。
WebRTC → 低延迟、高互动场景。
```

3、推流与拉流

```
1、推流
采集(AVCaptureSession)→ 编码(H.264/AAC) → 封装(FLV/TS) → 协议传输(RTMP/WebRTC) → CDN 分发。

2、拉流
服务器/CDN 拉取 → 解码 → 渲染播放。

3、关键点：
-推流需保障稳定性（丢包、抖动处理）。
-拉流需优化缓冲区，平衡流畅与延迟。

4、推流基本流程(增加理解)：
采集：通过 AVCaptureSession 获取音视频。
编码：使用 H.264（视频）和 AAC（音频）编码。
封包：封装为 FLV/TS 格式。
传输：通过 RTMP/WebRTC 协议推送到服务器。
分发：CDN 分发至观众端。
播放：客户端解码渲染。
```

4、弱网环境优化

```
动态码率/分辨率调整（自适应网络带宽）。
FEC (前向纠错)：添加冗余包，丢包可恢复。
重传机制 (ARQ)：关键数据包丢失时请求重传。
拥塞控制：根据 RTT、丢包率调整速率。
缓冲优化：缩短首屏时延，减少卡顿。
```

6、降低直播延迟

```
1、RTMP
-减小服务器/客户端缓冲区。
-尝试低延迟协议替代（SRT、QUIC）。
-自适应码率策略。

2、WebRTC
-优化信令流程，加快握手。
-采用高效编解码器（如 H.265、AV1）。
-启用弱网自适应（带宽估计 + 码率控制）。
```

7、面试总结

```
RTMP 适合大规模、稳定直播，WebRTC 适合低延迟互动。
优化重点在： 弱网自适应、延迟控制，
iOS 中常用 LFLiveKit (RTMP) 和 WebRTC SDK
```

### 3.4 三方商业库

面试考点

```
推送：APNs(Apple Push Notification service/远程推送通知服务)、Firebase、极光推送  
即时通讯（IM）：环信、融云、声网（消息+音视频）  
云平台：AWS、阿里云（存储、CDN、鉴权）  
支付：Apple Pay、支付宝、微信支付  
社交分享：微信、微博、QQ SDK、Universal Links  
```

1、如何在iOS中实现推送通知？

```
1、推送通知
1.1、APNs (Apple Push Notification Service)
配置 UNUserNotificationCenter 注册通知，获取 deviceToken → 上传服务器。
特点：官方服务、稳定，但功能基础。

1.2、第三方（Firebase、极光等）
提供 SDK，简化证书管理。
支持离线消息、分组推送、统计分析、多平台统一。

2、选择依据：
APNs → 简单通知场景，苹果生态内闭环。
第三方 → 个性化推送、统计、多端统一需求
```

2、如何在iOS中集成第三方IM(即时通讯)？

```
1、常用 SDK：
环信、融云、声网、Sendbird。

2、集成流程：
CocoaPods/SPM 安装 → 配置 AppId/Token → 初始化 SDK → 调用 API 实现单聊/群聊/离线消息/音视频通话。

3、优化点：
封装 IM 模块，使用协议隔离 SDK，方便后续替换。

4、特点：
提供完整解决方案，快速接入。
声网额外支持实时音视频，适合互动场景。
```

3、如何在iOS中集成Apple Pay或支付宝支付？

```
1、Apple Pay (PassKit)
-PKPaymentRequest 设置金额、商户 ID。
-PKPaymentAuthorizationViewController 处理授权回调。
-安全、简单，但局限于苹果生态。

2、支付宝/微信支付
-集成 SDK，配置 AppId + URL Schemes。
-发起支付请求 → 回调处理签名和结果。
-灵活，适合国内复杂支付场景。
```

4、如何在iOS中实现社交分享？

```
1、原生 (UIActivityViewController)
-支持系统内分享（短信、邮件、AirDrop 等）。
-简单但功能有限。

2、第三方 SDK (微信、微博、QQ)
-需注册 AppId、配置 URL Schemes。
-支持分享、授权登录、用户数据拉取。
-推荐启用 Universal Links 提升跳转体验
```

5、如何在iOS中使用AWS或阿里云等云平台？

```
1、AWS (S3、Lambda 等)
-使用 AWS iOS SDK，配置 Access Key/区域，执行文件上传/下载。
-支持 TransferUtility 异步传输，结合 IAM 做权限控制。

2、阿里云 (OSS SDK)
-配置 AccessKey/Endpoint，上传/下载对象存储文件。

3、关键点：
-权限安全（IAM/STS 临时授权）。
-异步上传下载，避免阻塞 UI。
```

6、在你的项目中是如何集成和使用第三方库的？

```
1、工具：
CocoaPods / SwiftPM。

2、流程：
-阅读官方文档，了解 SDK 功能和限制。
-集成 SDK，配置必要参数（App ID、密钥等）。
-封装功能到独立模块（如 PaymentManager、ShareManager），降低耦合。
-测试回调、错误处理，确保稳定性。

3、流程简化：
阅读文档 → 集成 SDK → 配置参数（AppId、密钥） → 封装模块 → 测试回调与异常处理。

4、优化：
-用协议或 Manager 层隔离 SDK。
-定期更新库，关注兼容性。
-关键功能（支付、推送）需容灾或备选方案
```

7、APNs 与第三方推送对比

7-1、对比

|   特性   |          APNs(官方)          |     第三方(Firebase/极光)      |
| :------: | :--------------------------: | :----------------------------: |
|   来源   |           苹果官方           |           第三方平台           |
|   功能   | 基本通知（标题、内容、徽章） | 离线消息、统计、个性化、跨平台 |
|   集成   |     需配置证书，流程复杂     |   SDK 简化集成，管理后台完善   |
| 适用场景 |   简单通知，强依赖苹果生态   |    复杂推送需求，需多端支持    |

7-2、选择依据

```
APNs → 官方、稳定、轻量化场景。
第三方 → 统计、个性化、跨平台统一
```

