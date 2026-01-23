---
title: 微信小程序开发之——CSS动画
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: dda9ee22
date: 2022-01-13 09:46:27
---
## 一 概述

上一节介绍了通过CSS属性keyframes设置图片选择动画，本文介绍以下两种形式的动画：

* `this.animate` 接口(旧的)
* `wx.createAnimation`接口(新的，2.9.0开始支持)

<!--more-->

## 二 this.animate

### 2.1 布局文件

```
<view class="container">
  <view class="box">
    <!--this.animate-->
    <image id="loading" src="/images/icon_loading.png"></image>
    <text>加载中...</text>
  </view>
</view>
```

### 2.2 样式文件

```
page {
  background: gray;
}

.box {
  width: 400rpx;
  height: 300rpx;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 30rpx;
}

.box image {
  width: 100rpx;
  height: 100rpx;
}

.box text {
  margin-top: 20rpx;
  font-size: large;
  font-weight: bold;

}
```

### 2.3 逻辑文件

```
onShow: function () {
    this.animate('#loading', [
      { opacity: 1.0, rotate: 0},
      { opacity: 1.0, rotate: 45 },
      { opacity: 1.0, rotate: 90 },
      { opacity: 1.0, rotate: 360 },
    ], 5000)
  },
```

### 2.4 效果图

![][1]

### 2.5 说明

* this.animate动画在开发者工具中有时候不执行动画
* 此种动画在真机上演示

## 三 wx.createAnimation动画

### 3.1 布局文件

```
<view class="container">
  <view class="box">
    <image id="loading" src="/images/icon_loading.png" animation="{{animationData}}"></image>
    <text>加载中...</text>
  </view>
</view>
```

### 3.2 样式文件(同上)

```
page {
  background: gray;
}

.box {
  width: 400rpx;
  height: 300rpx;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 30rpx;
}

.box image {
  width: 100rpx;
  height: 100rpx;
}

.box text {
  margin-top: 20rpx;
  font-size: large;
  font-weight: bold;

}
```

### 3.3 逻辑文件

```
 data: {
    animationData: ''
  },
 onShow: function () {
    var anim = wx.createAnimation({
      duration: 5000,
      timingFunction: "linear"
    })
    this.animationData = anim;
    anim.rotate(180).step();
    this.setData({
      animationData: anim.export()
    })
  },  
```

### 3.4 效果图
![][2]

## 四 参考

* [CSDN下载—参考代码](https://download.csdn.net/download/Calvin_zhou/75631128)
* [微信官方文档—Animation](https://developers.weixin.qq.com/miniprogram/dev/api/ui/animation/Animation.html)
* [微信官方文档—wx.createAnimation](https://developers.weixin.qq.com/miniprogram/dev/api/ui/animation/wx.createAnimation.html)
* [微信官方文档—动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-animal-this-preview.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-animal-wxcreate-preview.gif