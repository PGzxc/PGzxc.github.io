---
title: WebRTC音视频开发之——概述-整体框架(2)
categories:
  - 开发
  - H-音、视频开发
  - WebRTC
tags:
  - WebRTC
abbrlink: 9bf17e54
date: 2022-03-01 16:29:05
---
## 一 概述

* WebRTC整体架构图
* 不同开发人员对整体架构图的关注点
* WebRTC涉及内容

<!--more-->

## 二 WebRTC整体架构图

WebRTC目前已经形成了一个HTML5的规范。由W3C组织来指定并维护这个标准，其总体架构图如下

![][1]

## 三 不同开发人员对整体架构图的关注点

### 3.1 Video Conference、Video Call、Remote Education

* 这部分为应用层
* 指具体的音视频应用，是应用开发人员最关注的

### 3.2 Web API(W3C组织)

* 这部分是Web应用开发者API层
* 为上层应用层提供API服务，是应用开发者调用的接口

### 3.3 WebRTC  C++API(PeerConnection)

* 这部分是面向浏览器厂商的API层

#### 3.4 Session Management/Abstract Signaling(Session)

* 这部分为信令管理层，可由开发者自行定义实现

### 3.5 Transport、VideoEngine、VoiceEngine

* 这部分为WebRTC的核心内容
* 可由WebRTC的应用SDK厂进行优化处理

### 3.6 Audio/Video Capture

* 这部分内容可供浏览器厂商自定义实现

## 四 WebRTC涉及内容

### 4.1 Web应用

Web开发者可以基于Web API开发基于视频、音频的实时通信应用，如视频会议、远程教育、视频通话、视频直播、游戏直播、远程协助、互动游戏、实时人脸识别、远程机械手操作等

### 4.2 Web API

Web API是面向第三方开发者的WebRTC标准API(JavaScript)，使开发者能够很容易地开发出类似于网络视频聊天的Web应用，最新的技术进展可以参考W3C的WebRTC文档[https://www.w3.org/TR/webrtc/][00]，常用的 API如下所示：

* MediaStream：媒体数据流，如音频流、视频流等
* RTCPeerConnection：该类很重要，提供了应用层的调用接口
* RTCDataChannel：传输非音视频数据，如文字、图片等

WebRTC的API接口非常丰富，更多详细的API可以参考网址：[https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API][01]，该文档提供了中文说明

### 4.3  C++ API 

* 底层API使用C++语言编写，使浏览器厂商容器实现WebRTC标准的Web API，抽象地对数据信号过程进行处理。
* 如RTCPeerConnection API是每个浏览器之间点对点连接的核心
* RTCPeerConnection是WebRTC组件，用于处理点对点间数据的稳定和有效通信

### 4.4 Session Management

* Session Management是一个抽象的会话层，提供会话建立和管理功能
* 该层协议留给应用开发者自定义实现
* 对于Web应用，建议使用WebSocket技术来管理信令Session
* 信令主要用来转发会话双方的媒体信息和网络信息

### 4.5 Transport

* Transport为WebRTC的传输层，涉及音视频的数据传输、接收、网络打洞等内容
* 可以通过STUN和ICE组件来建立不同类型的网络间的呼叫连接

### 4.6 VoiceEngine

VoiceEngine(音频引擎)是包含一系列音频多媒体处理的框架，包括从音视频采集到网络传输端等整个解决方案。VoiceEngine是WebRTC极具价值的技术之一，是Google收购GIPS公司后开源的，目前在VoIP技术上处于业界领先地位。下面介绍主要的模块：

#### ISAC(Internet Speech Audio Codec)
是针对VoIP和音频流的带宽和超带宽音频编解码器，是WebRTC音频引擎的默认编码器，参数如下

* 采样频率：16kHz，24kHz，32kHz(默认16kHz)
* 自适应速率为：10kbps~52kbps
* 自适应包大小：30ms~60ms
* 算法延时：frame+3ms
* ILBC(Internet Low Bitrate Codec)：是VoIP音频流的窄带语音编解码器，参数如下

  - 采样频率：8kHz
  - 20ms帧比特率为15.2kbps
  - 30ms帧比特率为13.33kbps

#### NetEQ For Voice

* 是针对音频软件实现的语音信号处理单元。
* NetEQ算法是自适应抖动控制算法以及语音包丢失隐藏算法，该算法能够快速且高解析度地适应不断变化的网络环境，确保音质优美且缓冲延迟最小，是GIPS公司独特的技术，能够有效地处理网路抖动和语音包丢失时对语音质量产生的影响。
* NetEQ也是WebRTC中一个极具价值的技术，对于提高VoIP质量有明显效果，与AEC、NR、AGC等模块集成使用效果更好。

#### Acoustic Echo Canceler

* Acoustic Echo Canceler，简称AEC，回声抑制
* 是一个基于软件的信号处理元件，能实时地去除Mic采集到的回声

#### Noise Reduction

* Noise Reduction，简称NR，噪声抑制
* 也是基于软件的信号处理元件，用于消除与相关VoIP的某些类型的背景噪声(如嘶嘶声、风扇噪音等)

### 4.7 VideoEngine

VideoEngine是WebRTC视频处理引擎，包含一系列视频处理的整体框架，从摄像头采集视频到视频信息网络传输再到视频显示，是一个完整过程的解决方案。下面介绍主要模块：

#### VP8(视频图像编解码器)

* VP8是视频图像编解码器，也是WebRTC视频引擎默认的编解码器
* VP8适合实时通信应用场景，因为它主要是针对低延时而设计的编解码器
* VPx编解码器是Google收购ON2公司后开源的，现在是WebM项目的一部分
* WebM项目时Google致力于推动的HTML5标准之一

#### Video Jitter Buffer(视频抖动缓冲器)

* Video Jitter Buffer：视频抖动缓冲器
* 该模块可以降低由于视频抖动和视频信息包丢失带来的不良影响

#### Image Enhancements(图像质量增强)

* Image Enhancements：图像质量增强
* 该模块对网络摄像头采集到的视频图像进行处理，包括明暗度检测、颜色增强、降噪处理等功能，用来提升视频质量



[00]:https://www.w3.org/TR/webrtc/
[01]:https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-webrtc/webrtc-01-total-struct.png