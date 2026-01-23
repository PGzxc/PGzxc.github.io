---
title: WebRTC音视频开发之——通话原理-网络协商(3)
categories:
  - 开发
  - H-音、视频开发
  - WebRTC
tags:
  - WebRTC
abbrlink: d11d355e
date: 2022-03-02 13:21:20
---
## 一 概述

* 网络协商——网络信息
* 处理网络协商中的几个概念

<!--more-->

## 二 网络协商——网络信息

### 2.1 网络信息说明

通信双方彼此要了解对方的网络情况，这样才有可能找到一条通信链路。需要做以下两个处理

* 获取外网IP地址影射
* 通过信令服务器(Signal server)交换“网络信息”
* 分为理想网络和实际网络情况

### 2.2 理想网络

理想的网路情况是每个浏览器所在的计算机IP都是公网IP，可以直接进行点对点连接

![][1]

### 2.3 实际网络情况

实际情况是我们的计算机都是在某个局域网中并且有防火墙，需要进行网路地址转换(Network Address Translation,NAT)，如下图

![][2]

## 三 处理网络协商中的几个概念

在解决WebRTC使用过程中的上述问题时，我们需要用到NAT、STUN和TURN等概念

### 3.1 NAT

#### NAT概念

简单来说，NAT是为了解决IPV4下的IP地址匮乏而出现的一种技术

例如，通常我们处在一个路由器之下，而路由器分配给我们的地址通常为192.168.1.1、192.168.1.2，如果有n个设备，可能分配到192.168.1.n，而这个IP地址显然只是一个内网的IP地址，这样一个路由器的公网地址对应了n个内网地址，这种使用少量的公有IP地址代表较多的私有IP地址的方式，有助于减缓IP地址空间的枯竭。如图所示

![][3]

#### NAT 穿透技术

NAT技术会保护内网地址的安全性，所以这就会引发一个问题，就是当我们采用P2P中的连接方式时，NAT会阻止外网地址的访问，这是我们就得代用NAT穿透技术了。

于是我们有了如下的思路：

* 借助一个公网IP服务器，Peer-A与Peer-B都往公网IP/PORT发包
* 公网服务器就可以获知Peer-A与Peer-B的IP/PORT
* 又由于Peer-A与Peer-B主动给公网IP服务器发包，所以公网服务器可以穿透NAT-A与NAT-B并发送包给Peer-A与Peer-B
* 所以只要公网IP将Peer-B的IP/PORTF发给Peer-A，将Peer-A的IP发给Peer-B，这样下次Peer-A与Peer-B相互发送消息时，就不会被NAT阻拦了

WebRTC的防火墙穿透技术就是基于上述思路来实现的。在WebRTC中采用ICE框架来保证PTCPeerConnection能实现NAT穿透

#### ICE

* ICE：Interactive Connectivity Establishment，互动式连接建立
* 这是一种框架，使各种NAT穿透技术(如STUN、TURN等)可以实现统一
* 该技术可以让客户端成功地穿透远程用户与网络之间可能存在的各类防火墙

#### STUN

* STUN是指简单UDP穿透NAT，Simple Traversal of UDP Through NAT
* 该项技术允许位于NAT(或多重NAT)后的客户端找出自己的公网IP地址
* 以及查出自己位于哪种类型的NAT及NAT所绑定的Internet端口
* 这些信息可用于将两个同时处于NAT路由器之后的主机之间建立UDP通信

如图：STUN服务器能够知道Peer-A以及Peer-B的公网IP地址及端口
![][4]

即使通过STUN服务器取得了公网IP地址，也不一定能建立连接。因为不同的NAT类型处理传入的UDP分组的方式是不同的，四种主要类型中有三种可以使用STUN穿透：

* 完全圆锥型NAT
* 受限圆锥型NAT
* 端口受限圆锥型NAT

但大型公司网络中经常采用的对称形NAT(又称为双向NAT)则不能使用，这类路由器会透过NAT部署所谓的“Symmetric NAT限制”，也就是说，路由器只会接受你之前连接过的节点所建立的连线，这类网络就需要用到TURN技术

#### TRUN

* TURN是指使用中继穿透NAT(Traversal Using Relays around NAT)
* 是STUN的一个扩展(在RFC5389中定义)，主要添加了中继功能
* 如果终端在进行NAT之后，在特定的情景下有可能使得终端无法和其他终端进行直接的通信
* 这时就需要将公网的服务器作为一个中继，对来往的数据进行转发。
* 这个转发采用的协议就是TURN

在STUN服务器的基础上，再架设几台TURN服务器。在STUN分配公网IP失败后，可以通过TURN服务器请求公网IP地址作为中继地址，将媒体数据由TURN服务器中转，如图所示
![][5]

当媒体数据进入TURN服务器中转，这种方式的带宽由服务器端承担。所以在架设中转服务器时要考虑硬件及带宽

## 四 总结

以上是WebRTC中经常用到的协议，STUN服务器和TURN服务器我们使用coturn开源项目来搭建，地址为：[https://github.com/coturn/coturn][00]。也可以使用Golang技术开发的服务器来搭建，地址为：[https://github.com/pion/turn][01]


[00]:https://github.com/coturn/coturn
[01]:https://github.com/pion/turn

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-webrtc/webrtc-02-net-protocol-idea.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-webrtc/webrtc-02-net-protocol-firewall.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-webrtc/webrtc-02-net-route-struct.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-webrtc/webrtc-02-stun-server-through.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-webrtc/webrtc-02-turn-traversal-relay.png