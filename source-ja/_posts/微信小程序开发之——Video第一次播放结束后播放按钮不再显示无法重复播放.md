---
title: 微信小程序开发之——Video第一次播放结束后播放按钮不再显示无法重复播放
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 1cb6d734
date: 2022-01-19 15:35:29
---
## 一 现象

小程序里使用video组件全屏播放时，设置了只显示中间的播放按钮。当视频播放完成后，不再显示播放按钮，无法再次播放

![][1]
<!--more-->
## 二 [原因—微信开放社区][00]

### 2.1 原因

小程序官方bug，暂未修复

### 2.2 截图

![][2]

## 三 如何解决—自己设置播放按钮

### 3.1 过程

* 视频播放前设置播放按钮
* 点击播放按钮，播放视频，并隐藏播放按钮
* 播放结束后，显示播放按钮

### 3.2 代码

#### 布局文件

```
<view class="container-camera">

  <!--视频预览-->
  <video id="myVideo" wx:if="{{videoSrc}}" class="video" src="{{videoSrc}}" muted="true" bindended="ended" controls="{{false}}" show-center-play-btn="{{false}}" play-btn-position="center"></video>
  <!--播放按钮-->
  <image src="/images/icon_play.png" hidden="{{isShowPlayButton}}" bindtap="play"></image>

</view>
```

#### 样式文件

```
.container-camera {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

/**视频回放布局 */
.container-camera video {
  width: 100vh;
  height: 100vh;
}

.container-camera image {
  width: 200rpx;
  height: 200rpx;
  position: absolute;
}
```

#### 逻辑文件

```
// pages/video/video.js
Page({
  data: {
    //videoSrc:"https://res.wx.qq.com/wxaliveplayer/htdocs/video54e1eeb.mov",
    videoSrc: "http://localhost:8082/small.mp4",
    isShowPlayButton: false
  },
  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  play(e) {
    this.setData({
      isShowPlayButton: true
    })
    this.videoContext.play()
  },
  pause(e) {
    console.log('pause');
  },
  ended(e) {
    console.log('ended', e);
    this.setData({
      isShowPlayButton: false
    })
  },
})
```

### 3.3 预览图
![][3]

## 四 参考
* [CSDN下载——参考代码](https://download.csdn.net/download/Calvin_zhou/76684349)


[00]:https://developers.weixin.qq.com/community/develop/doc/000e8451dbc5e0f2430a27ad551800
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-video-play-finish-no-play.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-video-commit-answer.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/weichat-video-play-finish-has.gif