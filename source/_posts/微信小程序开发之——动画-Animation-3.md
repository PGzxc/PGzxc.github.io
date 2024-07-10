---
title: 微信小程序开发之——动画-Animation(3)
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: efefbf1d
date: 2021-09-30 17:15:27
---
## 一 概述

* wx.createAnimation创建Animation动画实例
* wx.createAnimation时，参数的常用属性
* 动画常见动作
* 动画执行完成之后导出动画队列(export)

<!--more-->

## 二 wx.createAnimation创建Animation动画实例

### 2.1 默认的

```
this.animation = wx.createAnimation()
```

### 2.2 自己指定参数

```
this.animation=wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })
```

### 2.3 说明(this.animation)

this.animation：布局文件中，需要执行动画操作的对象

## 三 wx.createAnimation时，参数的常用属性

|      属性       |  类型  |         说明          |
| :-------------: | :----: | :-------------------: |
|    duration     | number | 动画持续时间，单位 ms |
| timingFunction  | string |      动画的效果       |
|      delay      | number | 动画延迟时间，单位 ms |
| transformOrigin | string |                       |

#### timingFunction(动画效果)

|     属性      |                    说明                    |
| :-----------: | :----------------------------------------: |
|   'linear'    |         动画从头到尾的速度是相同的         |
|    'ease'     |   动画以低速开始，然后加快，在结束前变慢   |
|   'ease-in'   |               动画以低速开始               |
| 'ease-in-out' |            动画以低速开始和结束            |
|  'ease-out'   |               动画以低速结束               |
| 'step-start'  |      动画第一帧就跳至结束状态直到结束      |
|  'step-end'   | 动画一直保持开始状态，最后一帧跳到结束状态 |

## 四 动画常见动作

* Animation.opacity：透明动画
* Animation.rotate：选择动画
* Animation.scale：缩放动画
* Animation.skew：倾斜动画
* Animation.translate：平移动画

## 五 动画执行过程

*  this.animation = wx.createAnimation()：执行动画赋值
* 动画动作(透明、旋转、缩放等)
*  this.animation..step()：表示一组动画完成
* this.animation.export()：导出动画队列。**export 方法每次调用后会清掉之前的动画操作**

## 六 示例

### 6.1 布局文件(index.wxml)

```
<view class="anim-pic">
<image src="/images/rocket.png" animation="{{animated}}"></image>
</view>
<view class="anim-btns">
  <button bindtap="rotate">旋转</button>
</view>
```

### 6.2 样式文件(index.wxss)

```
.anim-pic {
  width: 300rpx;
  height: 300rpx;
  margin: 40rpx auto;
}
.anim-pic image{
  width: 300rpx;
  height: 300rpx;
}
.anim-btns button{
  border: 1px solid orange;
}
```

### 6.3 逻辑文件(index.js)

```
Page({
  onReady: function () {
    this.animated=wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })
  },
  rotate: function () {
    this.animated.rotate(Math.random()*720-360).step()
    this.setData({
      animated:this.animated.export()
    })
  }
})
```

### 6.4 效果图

![][1]

## 七 参考
* [小程序官方文档—Animation](https://developers.weixin.qq.com/miniprogram/dev/api/ui/animation/wx.createAnimation.html)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-animate-animation-rotate.gif