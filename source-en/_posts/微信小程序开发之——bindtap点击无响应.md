---
title: 微信小程序开发之——bindtap点击无响应
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 90b24d8
date: 2021-12-28 16:53:29
---
## 一 现象

当父控件的属性同时为：`position: relative;z-index: -1;`时，子控件无法点击；

| position:relative;z-index:-1 |  其他  |
| :--------------------------: | :----: |
|           无法点击           | 可点击 |
|            ![][1]            | ![][2] |

<!--more-->

## 二 示例(不可点击)

### 2.1 布局文件(zindex.wxml)

```
<view class="page-container1">
  <text bindtap="tapclick">点击</text>
  <button type="primary" bindtap="buttonclick">我是按钮</button>
</view>
```

### 2.2 样式文件(zindex.wxss)

```
.page-container1{

  position: relative;
  z-index: -1;
  text-align: center;
  
}
.page-container1 text{
  background: coral;
  padding: 10rpx 30rpx;
  
}
.page-container1 button{
  z-index: 100;
  margin: 20rpx;
}
```

### 2.3 逻辑文件(zindex.js)

```
Page({

  tapclick(){
    console.log("text点击了按钮");
  },
  buttonclick(){
    console.log("按钮被点击了按钮");
  }
})
```

## 三 如何修改

### 3.1 修改position属性

保持`z-index:-1`不变时，将position修改为除`relative`外的其他属性

### 3.2 修改z-index

保持`position:relative`不变，将z-index修改为>=0的值

## 四 参考

* [CSDN下载——本项目demo](https://download.csdn.net/download/Calvin_zhou/71999008)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-position-zindex-no.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-position-zindex-yes.gif