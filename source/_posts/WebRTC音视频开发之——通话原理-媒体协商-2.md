---
title: WebRTC音视频开发之——通话原理-媒体协商(2)
categories:
  - 开发
  - H-音、视频开发
  - WebRTC
tags:
  - WebRTC
abbrlink: b0150cd2
date: 2022-03-02 13:20:25
---
## 一 概述

* 编码交集
* SDP从哪来
* SDP交换过程
* SDP信息

<!--more-->

## 二 编码交集

### 2.1 编码交集示意图
![][1]

### 2.2 编码交集说明

首先两个客户端(Peer-A和Peer-B)想要创建连接，一般来说需要有一个双方都能访问的服务器来帮助它们交换连接所需要的信息。有了交换数据的中间人之后，两个客户端首先要交换的数据是SDP，这里面描述了连接双方想要建立怎样的连接

两个客户端要了解对方支持的媒体格式。比如，Peer-A端可支持VP8、H264多种编码格式，而Peer-B端支持VP9、H264，要保证两端都能正确地编解码，最简单的办法就是取它们的交集H264

在WebRTC中，参与视频通信的双方必须先交换SDP信息，这样双方才能“知根知底”，这一过程也称为“媒体协商”

## 三 SDP从哪来

* 一般来说，在建立连接之前，连接双方需要先通过API来指定自己要传输什么数据(如Audio、Video、DataChannel)
* 以及自己希望接受什么数据
* 然后Peer-A调用CreateOffer()方法，获取offer类型的SessionDescription，通过公共服务器传递给Peer-B
* 同样，Peer-B通过调用CreateAnswer()，获取answer类型的SessionDescription，通过公共服务器传递给Peer-A
* 在这个过程中，由哪一方创建Offer(Answer)都可以，但是要保证连接双方创建的SessionDescription类型是相互对应的。
* Peer-A=Answer Peer-B=Offer或者Peer-A=Offer Peer-B=Answer

## 四 SDP 交换过程
### 4.1示意图
![][2]

### 4.2 过程说明

信令服务器可以用来交换双方的SDP信息，一般是通过创建Socket连接进行交互处理。你可以使用Node.js、Golang或其他技术，只要能交换双方的SDP数据即可

SDP是一个描述多媒体连接内容的协议，例如分辨率、格式、编码、加密算法等，便于在数据传输时两端都能够理解彼此的数据。从本质上，这些描述内容的元数据并不是媒体流本身

从技术上讲，SDP并不是一个真正的协议，而是一种数据格式，用于描述在设备之间共享媒体的连接

## 五 SDP信息

### 5.1 SDP信息内容

```
//版本
v=0
//<username> <sess-id> <sess-version> <nettype> <addrtype> <unicast-address>
o=- 3089712662142082488 2 IN IP4 127.0.0.1
//会话名
s=-
//会话的起始时间和结束时间，0代表没有限制
t=0 0
//表示音频传输和data channel传输共用一个传输通道，通过id区分不同的流
a=group:BUNDLE audio data
//WebRTC Media Stream
a=msid-semantic: WMS
//m=audio说明本会话包含音频，9代表音频使用端口9来传输，但是在WebRTC中现在一般不使用，如果设置
为0，代表不传输音频
//使用UDP来传输RTP包，并使用TLS加密。SAVPF代表使用srtcp的反馈机制来控制通信过程
//111 103 104 9 0 8 106 105 13 110 112 113 126表示支持的编码，和后面的a=rtpmap对应
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
//表示你要用来接收或者发送音频时使用的IP地址，WebRTC使用ICE传输，不使用这个地址
c=IN IP4 0.0.0.0
//用来传输rtcp的地址和端口，WebRTC中不使用
a=rtcp:9 IN IP4 0.0.0.0
//ICE协商过程中的安全验证信息
a=ice-ufrag:ubhd
a=ice-pwd:l82NnsGm5i7pucQRchNdjA6B
//支持trickle，即SDP里面只描述媒体信息，ICE候选项的信息另行通知
a=ice-options:trickle
//DTLS协商过程中需要的认证信息
a=fingerprint:sha-256 CA:83:D0:0F:3B:27:4C:8F:F4:DB:34:58:AC:A6:5D:36:01:07:9F: 2B:1D:95:29:AD:0C:F8:08:68:34:D8:62:A7
a=setup:active
//前面BUNDLE行中用到的媒体标识
a=mid:audio
/指出要在rtp头部中加入音量信息
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
//当前客户端只接收数据，不发送数据，如recvonly、sendonly、inactive、sendrecv
a=recvonly
//rtp、rtcp包使用同一个端口来传输
a=rtcp-mux
//下面都是对m=audio这一行媒体编码的补充说明，指出了编码采用的编号、采样率、声道等
a=rtpmap:111 opus/48000/2
a=rtcp-fb:111 transport-cc
//对opus编码可选的补充说明，minptime代表最小打包时长是10ms，useinbandfec=1代表使用opus编码内置fec特性
a=fmtp:111 minptime=10;useinbandfec=1
a=rtpmap:103 ISAC/16000
a=rtpmap:104 ISAC/32000
a=rtpmap:9 G722/8000
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:106 CN/32000
a=rtpmap:105 CN/16000
a=rtpmap:13 CN/8000
a=rtpmap:110 telephone-event/48000
a=rtpmap:112 telephone-event/32000
a=rtpmap:113 telephone-event/16000
a=rtpmap:126 telephone-event/8000
//下面是对Data Channel的描述，基本和上面的audio描述类似，使用DTLS加密，使用SCTP传输
m=application 9 DTLS/SCTP 5000
c=IN IP4 0.0.0.0
//可以是CT或AS，CT方式是设置整个会议的带宽，AS是设置单个会话的带宽。默认带宽是kbps级别
b=AS:30
a=ice-ufrag:ubhd
a=ice-pwd:l82NnsGm5i7pucQRchNdjA6B
a=ice-options:trickle
a=fingerprint:sha-256 CA:83:D0:0F:3B:27:4C:8F:F4:DB:34:58:AC:A6:5D:36:01:07:9F: 2B:1D:95:29:AD:0C:F8:08:68:34:D8:62:A7
a=setup:active
//前面BUNDLE行中用到的媒体标识
a=mid:data
//使用端口5000，一个消息的大小是1024b
a=sctpmap:5000 webrtc-datachannel 1024
```

### 3.2 SDP列子介绍

以上SDP的例子中，虽然没有video的描述，但是video和audio的描述是十分类似的。SDP中有对于IP和端口的描述，但是WebRTC技术并没有使用这些内容，那么双方是怎么建立“直接”连接的呢？建立起连接最关键的IP和端口是从哪里来的呢？

SDP由一行或多行UTF-8文本构成，每行以一个字符的类型开头，后跟等号("=")，然后是包含值或描述的结构化文本，其格式取决于类型。以给定字母开头的文本行通常称为“字母行”。例如，提供媒体描述的行的类型为“m”，因此这些行称为“m行”



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-webrtc/webrtc-02-communicate-sdp.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-webrtc/webrtc-02-communicate-sdp-progress.png