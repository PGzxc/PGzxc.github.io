---
title: 微信小程序开发之——CSS动画仿上传及完成
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: ac3f5585
date: 2022-01-11 17:09:22
---
## 一 功能预览

| 加载中 | 加载完成 | 加载中，3s后完成 |
| :----: | :------: | :--------------: |
| ![][1] |  ![][2]  |      ![][3]      |

<!--more-->

## 二 CSS动画-加载中

### 3.1 要选中的图形
![][4]



### 3.2 CSS-keyframes 旋转动画

#### 布局文件

```
<view class="container">
  <view class="box" bindtransitionend="transitionEnd" bindanimationstart="animationStart" bindanimationiteration="animationIteration">
    <image id="loading" class="{{extraClasses}}" src="/images/icon_loading.png"></image>
    <text>加载中...</text>
  </view>
</view>
```

#### 样式文件(wxss)

```
.box image {

  width: 100rpx;
  height: 100rpx;
  animation: loading 3s infinite linear;
}
@keyframes loading {
  0% {transform: rotate(0deg);}
  50% {transform: rotate(180deg);}
  100% {transform: rotate(360deg);}
}
```

animation说明：

* 其中`loading`是下面keyframes中的名字 
* 3s：3s转一圈(时间越短，转速越快)
* linear：线性变化
* infinite：永远播放

keyframes loading 说明：

* 0%：执行刚开始旋转多少度
* 50%：执行一半时旋转多少度
* 100%：执行完成时旋转多少度

## 三 加载完成

### 3.1 布局文件

```
<view class="container">
  <view class="box" bindtransitionend="transitionEnd" bindanimationstart="animationStart" bindanimationiteration="animationIteration">
    <image id="loading" class="{{extraClasses}}" src="/images/icon_ok.png"></image>
    <text>上传完成</text>
  </view>
</view>
```

### 3.2 样式文件(wxss)

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
  animation: loading 3s infinite linear;

}

.box text {
  margin-top: 20rpx;
  font-size: large;
  font-weight: bold;

}

/* @keyframes loading {
  0% {transform: rotate(0deg);}
  50% {transform: rotate(180deg);}
  100% {transform: rotate(360deg);}
} */
```

## 四 加载中，3秒后完成

### 4.1 说明

* 逻辑文件中设置`isLoading`属性
* 通过`isLoading`控制加载动画和完成动画及对应文字的显示
* 先设置`isLoading`为true，倒计时3秒后，设置`isLoading`为false

### 4.2 功能

#### 布局文件

```
<view class="container">
  <view class="box" bindtransitionend="transitionEnd" bindanimationstart="animationStart" bindanimationiteration="animationIteration">
    <image id="loading" class="{{isLoading?'imageloading':'imagefinished'}}" src="{{isLoading?'/images/icon_loading.png':'/images/icon_ok.png'}}"></image>
    <text>{{isLoading?'加载中...':'上传完成'}}</text>
  </view>
</view>
```

#### 样式文件

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
  border-radius: 20rpx;
}

.imageloading {

  width: 100rpx;
  height: 100rpx;
  animation: loading 3s infinite linear;

}
.imagefinished {

  width: 100rpx;
  height: 100rpx;
  animation: none;

}

.box text {
  margin-top: 20rpx;
  font-size: large;
  font-weight: bold;

}

@keyframes loading {
  0% {transform: rotate(0deg);}
  50% {transform: rotate(180deg);}
  100% {transform: rotate(360deg);}
}
```

#### 逻辑文件

```
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //倒计时结束后
    setTimeout(() => {
      this.setData({
        isLoading: false
      })
    }, 2000);
  },
})
```

### 4.3 补充

* 通过这种方式设置可能因为嵌套导致底部的按钮无法点击
* 可以通过将布局文件放到modal，进而控制页面的显示和隐藏

## 五 参考

* [CSDN下载-参考代码](https://download.csdn.net/download/Calvin_zhou/75409272)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-css-animal-loading.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-css-animal-finished.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-css-animal-loadingfinished.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/weichat-css-animal-icon-loading.png

