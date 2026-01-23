---
title: 微信小程序开发之——Dialog弹窗
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: c2e9cdea
date: 2021-11-26 15:06:32
---
## 一 概述

小程序中弹窗的两种方式：

* modal弹窗
* WeUI组件dialog

<!--more-->

## 二 弹窗原理

* 在布局中事先放置好要显示的Dialog布局
* 通过一个参数`dialogShow`控制Dialog的显示与隐藏
* 点击按钮时，通过 `this.setData({ dialogShow: false,})`改变Dialog的值并改变Dialog的状态

## 三 modal弹窗

### 3.1 布局文件(modal.wxml)

```
<view class="container-view">
  <view>主题内容</view>
</view>
<!--modal-->
<!--弹窗-->
<view>
  <view class="modal-mask" bindtap="hideModal" catchtouchmove="preventTouchMove" wx:if="{{showModal}}">
    <view class="modal-dialog" wx:if="{{showModal}}">
      <video src="https://res.wx.qq.com/wxaliveplayer/htdocs/video14e1eea.mov"></video>
    </view>
  </view>
</view>
```

### 3.2 样式文件(modal.wxss)

```
.container-view {
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-dialog {
  width: 80%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed;
  margin: 0 auto;
  z-index: 9999;
  background: #f9f9f9;
  border-radius: 36rpx;
}

.container-view {
  width: 100%;
  height: 100%;
}
```

### 3.3 逻辑文件(modal.js)

```
Page({
  data: {
    showModal:true
  },
})
```

### 3.4 显示效果
![][1]

## 四 WeUI组件dialog

### 4.1 项目引入WeUI

[微信小程序开发之——WeUI快速上手][00]

### 4.2 布局文件(dialog.wxml)

```
<view class="page" data-weui-theme="{{theme}}">
  <view class="page__bd">
    <view class="weui-btn-area">
      <button class="weui-btn" type="default" bindtap="openConfirm">确认取消按钮</button>
      <button class="weui-btn" type="default" bindtap="tapOneDialogButton">只有确认按钮</button>
    </view>
  </view>
  <mp-dialog title="test" show="{{dialogShow}}" bindbuttontap="tapDialogButton" buttons="{{buttons}}">
    <view>test content</view>
  </mp-dialog>
  <mp-dialog title="test1" show="{{showOneButtonDialog}}" bindbuttontap="tapDialogButton" buttons="{{oneButton}}">
    <view>test content1</view>
  </mp-dialog>
</view>
```

### 4.3 逻辑文件(dialog.js)

```
Page({
  data: {
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    oneButton: [{text: '确定'}],
  },
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
    })
  }
})
```

### 4.4 显示效果图
![][2]

## 五 参考
* [CSDN下载-dialog](https://download.csdn.net/download/Calvin_zhou/49754396)


[00]:https://pgzxc.github.io/posts/66aabbca.html
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-modal-dialog-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-dialog-dialog-preview.gif