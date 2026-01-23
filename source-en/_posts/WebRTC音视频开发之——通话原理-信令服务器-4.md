---
title: WebRTC音视频开发之——通话原理-信令服务器(4)
categories:
  - 开发
  - H-音、视频开发
  - WebRTC
tags:
  - WebRTC
abbrlink: 65a132f8
date: 2022-03-02 13:21:55
---
## 一 概述

* 信令服务器概念
* 信令服务器工作原理
* 连接建立的过程
* 双方连接流程

<!--more-->

## 二 信令服务器概念

从前面的介绍中我们知道了两个客户端的协商媒体信息和网络信息，那怎么去交换？是不是需要一个中间商去做交换？所以我们需要一个信令服务器(signal server)转换彼此的媒体行和网络信息。

我们在基于WebRTC API开发应用(App)时，可以将彼此的App连接到信令服务器，一般搭建在公网或者两端都可以访问到的局域网，借助信令服务器，就可以实现SDP(媒体信息)及Candidate(网络信息)交换

信令服务器不只是交换SDP和Candidate，还有其他功能，比如房间管理、用户列表、用户进入、用户退出等IM功能。

## 三 信令服务器工作原理
![][1]

## 四 连接建立的过程

介绍完ICE框架中各个部分的含义之后，让我们来看看WebRTC连接建立的流程

1. 连接双方(Peer)通过第三方服务器来交换(signaling)各自的SDP数据
2. 连接双方通过STUN协议从STUN服务器那里获取到自己的NAT结构、子网IP和公网IP、端口，即Candidate信息
3. 连接双方通过第三方服务器来交换各自的Candidate，如果连接双方在同一个NAT下，那它们仅通过内网Candidate就能建立起连接；如果它们处于不同NAT下，就需要通过STUN服务器识别出的公网Candidate进行通信
4. 如果仅通过STUN服务器发现的公网Candidate任然无法建立连接，这就需要寻求TURN服务器提供的转发服务，然后将转发形式的Candidate共享给对象
5. 连接双方目标IP端口发送报文，通过SDP数据中涉及的密匙及期望传输的内容建立起加密长连接

## 五 双方连接流程

下面用一个例子描述连接双方的具体步骤。A(local)和B(remote)代表两个人，初始并分别创建PeerConnection，并向peerConnection添加到本地媒体流，连接流程如下所示。

1. A创建Offter
2. A 保存Offer(设置本地描述)
3. A发送Offer给B
4. B保存Offer(设置远程描述)
5. B创建Answer
6. B保存Answer(设置本地描述)
7. B发送Answer给A
8. A保存Answer(设置远端描述)
9. A发送ICE Candidate给B
10. B发送ICE Candidate给A
11. A、B收到对方的媒体流并播放



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-webrtc/webrtc-02-signal-server.png