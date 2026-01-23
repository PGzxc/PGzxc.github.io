---
title: WebRTC音视频开发之——通话原理-概述(1)
categories:
  - 开发
  - H-音、视频开发
  - WebRTC
tags:
  - WebRTC
abbrlink: 2932f1e4
date: 2022-03-02 13:19:11
---
## 一 概述

* 通话原理概述
* 媒体协商
* 网络协商
* 连接建立的流程

<!--more-->

## 二 通话原理概述

### 2.1 流程

WebRTC通话最典型的应用场景就是一对一音视频通话，如微信或QQ音视频聊天。通话的过程是比较复杂的，简化的流程如下

![][1]

### 2.2 双方建立通话的主要步骤

假定通话的双方为Peer-A和Peer-B。双方要建立起通话，主要步骤如下

#### 步骤一 媒体协商

* Peer-A与Peer-B通过信令服务器进行媒体协商，如双方使用的音视频编码格式
* 双方交换的媒体数据由SDP(Session Description Protocol,会话描述协议)描述

#### 步骤二 网络协商

* Peer-A与Peer-B通过STUN服务器获取到各自的网络信息，如IP和端口
* 然后通过信令服务器转发，相互交换各种网络信息。
* 这样双方就知道对方的IP和端口了，即P2P打洞成功建立直联
* 这个过程涉及NAT及ICE协议

#### 步骤三 建立连接

Peer-A与Peer-B如果没有建立起直连，则通过TURN中转服务器转发音视频数据，最终完成音视频通话



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-webrtc/webrtc-02-peer-communite-progress.png
