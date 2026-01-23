---
title: 微信小程序开发之——列表渲染-wxfor
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 4828ded
date: 2021-10-20 17:06:49
---
## 一 概述

*  `wx:for`可以用在view上，也可以用在`block`上
* 在组件上使用 `wx:for` 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件
* 默认数组的当前项的下标变量名默认为 `index`，数组当前项的变量名默认为 `item`
* 使用 `wx:for-item` 可以指定数组当前元素的变量名，使用 `wx:for-index` 可以指定数组当前下标的变量名
* 如果列表中项目的位置会动态改变或者有新的项目添加到列表中，需要使用 `wx:key` 来指定列表中项目的唯一的标识符

<!--more-->

## 二 wx:for渲染列表

### 2.1 用在view上

#### 页面中wx:for使用

```
<view wx:for="{{array}}">
  {{index}}: {{item.message}}
</view>
```

说明：

* 默认数组的当前项的下标变量名默认为 `index`
* 数组当前项的变量名默认为 `item`

#### 逻辑文件中设置数组array数据

```
data: {
    array: [{message: 'foo'},{message: 'bar'}]
 }
```

#### 效果图
![][1]

### 2.2 用在block上

#### 布局文件中代码

```
<block wx:for="{{[1, 2, 3]}}">
  <view> {{index}}: </view>
  <view> {{item}} </view>
</block>
```

#### 效果图
![][2]

## 三 wx:for使用时,wx:for-index指定下标和wx:for-item指定变量名

### 3.1 代码文件

```
<view wx:for="{{['a','r','r','a','y']}}" wx:for-index="idx" wx:for-item="itemName">
{{idx}}:{{itemName}}
</view>
```
### 3.2 效果图
![][3]

## 四 动态列表时,使用wx:key

### 4.1 `wx:key` 的值以两种形式提供

* 字符串，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
* 保留关键字 `*this` 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字

### 4.2 示例

#### 布局文件

```
<view wx:for="{{numberArray}}" wx:key="*this" style="display: block;">
  <view>{{item}}</view>
</view>
<button type="default" bindtap="addNum">点击</button>
```

#### 逻辑文件

```
Page({
  data: {
    numberArray:[0]
  },
  addNum(){
    var arrays=this.data.numberArray
    var newNum=arrays[arrays.length-1]+1
    arrays.push(newNum)
    this.setData({
      numberArray: arrays
    })
  }
})
```

#### 效果图
![][4]

## 五 参考
* [官方文档——列表渲染](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/list.html)
* [CSDN——参考代码](https://download.csdn.net/download/Calvin_zhou/33482005)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wxfor-view-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wxfor-block-preview.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wxfor-for-index-item.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wxfor-wxkey-preview.gif