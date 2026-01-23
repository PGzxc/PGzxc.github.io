---
title: 微信小程序开发之——WebSocket通信-示例(2)
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: b0d51ef5
date: 2021-10-09 15:48:42
---
## 一 概述

* 服务器端使用Node.js搭建，接收到消息后，返回一条消息“自动回复”
* 小程序端模拟聊天对话，右侧是用户端(发送消息后)，左侧是Socket回复消息
* 小程序底部，输入框输入内容，点击发送按钮发送给服务器

<!--more-->

## 二 示例逻辑介绍

* 在onLoad方法中，小程序连接Node服务器
* 当输入框中输入内容，并点击`发送`按钮，此时的`role`为用户端，显示在右侧
* 当输入框中内容为空时，提示`消息不能为空哦~`
* 服务器端接收到用户发来的消息，返回`自动回复`，此时的`role`为服务端，显示在左侧
* 发送完成后，页面滚动到底部

## 三 WebSocket通信示例—服务器

### 3.1 安装package.json中依赖

```
npm install
```

### 3.2 启动服务

```
node socket.js
```

## 四 WebSocket通信示例—小程序

### 4.1 布局文件(index.wxml)

```
<view class="wrap">
  <scroll-view scroll-y class="chat" scroll-top="{{scrollTop}}">
    <view class="list">
      <view class="chat-news" wx:for="{{list}}" wx:key="{{item.id}}">
        <!--根据角色判断-->
        <block wx:if="{{item.role==='me'}}">
          <!--自己的消息显示在右侧-->
          <view class="news-lf">
            <text class="new-txt">{{item.content}}</text>
            <image class="new-img" src="/images/man.png"></image>
          </view>
        </block>
        <!--对方的消息显示在左侧-->
        <block wx:else>
          <view>
            <image class="new-img" src="/images/women.png"></image>
            <text class="new-txt new-text">{{item.content}}</text>
          </view>
        </block>
      </view>
    </view>
  </scroll-view>
</view>
<!--聊天输入-->
<view class="message">
  <form>
    <input type="text" cursor-spacing="20" bindinput="bindChange" placeholder="请输入聊天内容..." />
    <button type="primary" bindtap="send" form-type="reset" size="mini">发送</button>
  </form>
</view>
```

### 4.2 样式文件(index.wxss)

```
page{
  background-color: #f7f7f7;
  height: 100%;
}
.wrap{
  width: 100%;
  height: 100%;
  display: flex;
  border-top: 0px;
  box-sizing: border-box;
}

.chat{
  padding: 5rpx 10rpx;
  font-size: 14px;
  line-height: 80rpx;
  word-break: break-all;
  margin-bottom: 100rpx;
  box-sizing: border-box;
}
/* 聊天*/
.chat-news{
  width: 100%;
  overflow: hidden;
}
.news-lf{
  float: right;
  padding-right: 20rpx;
}
.chat-news::after{
  display: block;
  height: 0;
  clear: both;
  content: '';
}
.new-rl{
  float: left;
  padding-left: 20rpx;
}
.new-img{
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10rpx;
}
.new-txt{
  max-width: 300rpx;
  display: inline-block;
  border-radius: 6rpx;
  line-height: 60rpx;
  background: #95d4ff;
  padding: 5rpx 20rpx;
  margin: 0 10rpx;
  margin-left: 50rpx;
}
.new-text{
  margin-left: 0;
  background: lightgreen;
}
/* 信息输入区域*/
.message{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 102rpx;
  padding: 10rpx;
  background-color: #fff;
  border-top: 2rpx solid #eee;
  box-sizing: border-box;
  z-index: 3;
}
.message input{
  float: left;
  width: 76%;
  height: 100%;
  line-height: 80rpx;
  padding: 0 10rpx;
  font-size: 35rpx;
  color: #666;
}
.message button{
  float: right;
  font-size: 35rpx;
}
```

### 4.3 逻辑文件(index.js)

```
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    list: []
  },
  id: 0,
  /** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    wx.connectSocket({
      //本地服务器地址
      url: 'ws://localhost:3000',
    })
    //连接成功
    wx.onSocketOpen((res) => {
      console.log('连接成功')
    })
    wx.onSocketMessage((res) => {
      var data = JSON.parse(res.data)
      data.id = this.id++
      data.role = 'server'
      var list = this.data.list
      list.push(data)
      this.setData({
        list: list
      })
      this.rollingBottom()
    })
  },
  //发送内容
  message: '',
  send() {
    //判断发送内容是否为空
    if (this.message) {
      wx.sendSocketMessage({
        data: this.message,
      })
      //我自己的消息
      console.log(this.data.list)
      var list = this.data.list
      list.push({
        id: this.id++,
        content: this.message,
        role: 'me'
      })
      this.setData({
        list: list
      })
      this.rollingBottom()
    } else {
      //弹出提示框
      wx.showToast({
        title: '消息不能为空哦~',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //监听Input值的改变
  bindChange(res) {
    this.message = res.detail.value
  },
  //页面卸载，关闭连接
  onUnload: function () {
    wx.closeSocket()
    console.log('连接已断开')
  },
  //聊天内容始终显示在最低端
  rollingBottom(e) {
    wx.createSelectorQuery().selectAll('.list').boundingClientRect(rects => {
      rects.forEach(rect => {
        this.setData({
          scrollTop: rect.bottom
        })
      })
    }).exec()
  }
})
```

### 4.4 效果图

| 小程序端 | 服务器端 |
| :------: | :------: |
|  ![][1]  |  ![][2]  |

## 五 参考代码

* [参考代码](https://download.csdn.net/download/Calvin_zhou/29946909)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-websocket-client.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-websocket-service.png