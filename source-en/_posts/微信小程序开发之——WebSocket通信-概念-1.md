---
title: 微信小程序开发之——WebSocket通信-概念(1)
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: b3e2c0ba
date: 2021-10-09 15:47:52
---
## 一 概述

* 什么是WebSocket通信
* 为什么需要WebSocket通信
* WebSocket通信API
* WebSocket示例

<!--more-->

## 二 什么是WebSocket通信

### 2.1 概念

* **WebSocket**是一种在单个[TCP](https://baike.baidu.com/item/TCP)连接上进行[全双工](https://baike.baidu.com/item/全双工)通信的协议
* **WebSocket** 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了
* 服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于[服务器推送技术](https://en.wikipedia.org/wiki/Push_technology)的一种

### 2.2 特点

* 建立在 TCP 协议之上，服务器端的实现比较容易
* 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器
* 数据格式比较轻量，性能开销小，通信高效
* 可以发送文本，也可以发送二进制数据
* 没有同源限制，客户端可以与任意服务器通信
* 协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL

### 2.3 WebSocket服务器URL示例

```
ws://example.com:80/some/path
```

## 三 为什么需要WebSocket通信

* 因为 HTTP 协议有一个缺陷：通信只能由客户端发起
* 这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用["轮询"](https://www.pubnub.com/blog/2014-12-01-http-long-polling/)：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室
* 轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）

## 四 WebSocket通信API

### 4.1 [wx.connectSocket(Object object)][02]

#### 创建一个 WebSocket 连接

```
wx.connectSocket({
  url: 'wss://example.qq.com',
  header:{
    'content-type': 'application/json'
  },
  protocols: ['protocol1']
})
```

#### 参数说明

|       参数        |      类型       |                      说明                       |
| :---------------: | :-------------: | :---------------------------------------------: |
|        url        |     string      |            开发者服务器 wss 接口地址            |
|      header       |     Object      |     HTTP Header，Header 中不能设置 Referer      |
|     protocols     | Array.\<string> |                   子协议数组                    |
|    tcpNoDelay     |     boolean     |     建立 TCP 连接的时候的 TCP_NODELAY 设置      |
| perMessageDeflate |     boolean     |                是否开启压缩扩展                 |
|      timeout      |     number      |              超时时间，单位为毫秒               |
|      success      |    function     |             接口调用成功的回调函数              |
|       fail        |    function     |             接口调用失败的回调函数              |
|     complete      |    function     | 接口调用结束的回调函数（调用成功、失败都会执行) |

### 4.2 [wx.onSocketOpen(function callback)][03]

#### 接口说明

* 监听 WebSocket 连接打开事件
* 可在wx.onSocketOpen监听连接打开事件，在该事件中执行关闭操作

#### 示例

```
wx.onSocketOpen(function(){
	wx.closeSocket()
})
wx.onSocketClose(function(res){
	console.log('WebSocket已关闭')
})
```

### 4.3 [wx.sendSocketMessage][04]

#### 接口说明

* 通过 WebSocket 连接发送数据
* 需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送

#### 示例

```
let socketOpen = false
let socketMsgQueue = []
wx.connectSocket({
  url: 'test.php'
})

wx.onSocketOpen(function(res) {
  socketOpen = true
  for (let i = 0; i < socketMsgQueue.length; i++){
    sendSocketMessage(socketMsgQueue[i])
  }
  socketMsgQueue = []
})

function sendSocketMessage(msg) {
  if (socketOpen) {
    wx.sendSocketMessage({
      data:msg
    })
  } else {
    socketMsgQueue.push(msg)
  }
}
```

### 4.4 [wx.onSocketMessage][05]

#### 接口说明

* 监听 WebSocket 接受到服务器的消息事件
* 在回调函数中接收msg参数，通过msg.data可以获取服务器返回的消息

#### 示例

```
//监听服务器端发送给客服端的消息
wx.onSocketMessage(msg=>{
	var data=JSON.parse(msg,data)
	console.log(data)
})
```

## 五 WebSocket示例-[WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)

### 5.1 Server Example——socket.js

#### 初始化项目，将会自动创建package.json配置文件

```
npm init -y
```

#### 安装WebSocket库

```
npm install websocket
```

#### 创建socket.js文件，并将Server Example下的代码copy

#### 启动socket.js

```
node socket.js
```

### 5.2 Client Example

#### 初始化项目，将会自动创建package.json配置文件

```
npm init -y
```

#### 安装WebSocket库

```
npm install websocket
```

#### 创建client.js文件，并将Client Example下的代码copy

#### 启动client.js文件

```
node client.js
```

### 5.3 效果图

![][1]



## 六 参考

* [百度百科-WebSocket][00]
* [阮一峰的网络日志-WebSocket 教程][01]



[00]:https://baike.baidu.com/item/WebSocket/1953845?fr=aladdin
[01]:https://www.ruanyifeng.com/blog/2017/05/websocket.html
[02]:https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.connectSocket.html
[03]:https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.onSocketOpen.html
[04]:https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.sendSocketMessage.html
[05]:https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.onSocketMessage.html
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-websocket-github-sample.png