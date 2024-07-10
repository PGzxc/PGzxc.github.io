---
title: 微信小程序开发之——动画-CSS动画(1)
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: c84df8f4
date: 2021-09-30 17:13:45
---
## 一 概述

* CSS动画基础预习
* CSS动画过程动作监听
* CSS动画示例

<!--more-->

## 二 CSS动画基础预习

* [CSS渐变动画][00]：提供了一种在更改CSS属性时控制动画速度的方法
* [CSS动画][01]：使得可以将从一个CSS样式配置转换到另一个CSS样式配置

## 三 CSS动画过程动作监听

|       事件名       |                             含义                             |
| :----------------: | :----------------------------------------------------------: |
|   transitionend    | CSS 渐变结束或 [wx.createAnimation](https://developers.weixin.qq.com/miniprogram/dev/api/ui/animation/wx.createAnimation.html) 结束一个阶段 |
|   animationstart   |                         CSS 动画开始                         |
| animationiteration |                     CSS 动画结束一个阶段                     |
|    animationend    |                         CSS 动画结束                         |

## 四 CSS动画示例

### 4.1 布局文件(index.wxml)

```
<view class="box {{extraClasses}}"
  bindtransitionend="transitionEnd"
  bindanimationstart="animationStart"
  bindanimationiteration="animationIteration">
  </view>

<button class="btn" bindtap="triggerTransition">触发 CSS 渐变</button>
<button class="btn" bindtap="triggerAnimation">触发 CSS 动画</button>
```

说明：

* extraClasses：给此属性赋值动画
* animationStart：动画开始时，执行此操作(文中打印结果)
* animationIteration：动画执行时，执行此操作(文中打印结果)
* transitionEnd：动画执行结束时，执行此操作(文中打印结果)
* triggerTransition：动画执行事件
* triggerAnimation：动画执行事件

### 4.2 样式文件(index.wxss)

```
.box {
  width: 100rpx;
  height: 100rpx;
  margin: 60rpx;
  background: red;
}
.btn {
  margin: 30rpx 60rpx 0;
}

.box-transition {
  transition: all 0.5s;
}
.box-moved {
  margin-left: 590rpx;
}

@keyframes box-ani {
  from {margin-left: 60rpx}
  to {margin-left: 590rpx}
}
.box-animation {
  animation: box-ani 1s alternate infinite;
}
```

### 4.3 逻辑文件(index.js)

```
const app = getApp()
Page({
  data: {
    extraClasses: '',
  },
  triggerTransition: function () {
    if (this.data.extraClasses == 'box-transition box-moved') {
      this.setData({
        extraClasses: 'box-transition'
      })
    } else {
      this.setData({
        extraClasses: 'box-transition box-moved'
      })
    }
  },
  triggerAnimation: function () {
    this.setData({
      extraClasses: 'box-animation'
    })
  },
  transitionEnd: function () {
    console.log('渐变已结束')
  },
  animationStart: function () {
    console.log('动画已开始')
  },
  animationIteration: function () {
    console.log('动画进行中')
  },
})
```

### 4.4 界面效果
![][1]

## 五 参考

* [界面动画的常见方式](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)



[00]:https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions
[01]:https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-animate-css.gif