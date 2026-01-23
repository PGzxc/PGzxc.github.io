---
title: 微信小程序开发之——个人中心-API(2)
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 6d6c7364
date: 2021-09-24 17:15:05
---
## 一 概述

* 页面跳转方法：wx.switchTab/wx.navigateTo/wx.redirectTo/wx.reLaunch
* 从本地相册或照相机拍照：wx.chooseImage
* 选择用户地址：wx.chooseAddress
* 拨打电话：wx.makePhoneCall
* 显示加载及隐藏加载：wx.showLoading、wx.hideLoading
* 提示信息：wx.showToast

<!--more-->

## 二 页面跳转方法

### 2.1 页面跳转方法比较

|     方法      |                          说明                           |
| :-----------: | :-----------------------------------------------------: |
| wx.switchTab  |          只跳转tabBar页面，并关闭非tabBar页面           |
| wx.navigateTo |  跳转应用内的某个页面，且保留当前页面，单机左上角返回   |
| wx.redirectTo |     跳转应用内的某个页面，且关闭当前页面，不能返回      |
|  wx.reLaunch  | 关闭所有页面，打开应用内的某个页面。可跳标签页+非标签页 |

### 2.2 跳转可用属性

|   属性   |   类型   |            说明            |
| :------: | :------: | :------------------------: |
|   url    |  string  |       跳转页面的路径       |
| success  | function |     调用成功的回调函数     |
|   fail   | function |     调用失败的回调函数     |
| complete | function | 调用结束(成功失败都会执行) |

### 2.3 wx.navigateTo和wx.redirectTo跳转携带参数

#### 简单参数

```
wx.navigateTo({
	 url: 'http://localhost:3000/search' + 'no=' + 1000,
})
```

#### 携带参数使用encodeURIComponent()编码

```
wx.navigateTo({
      //为了避免用户名中的特殊字符破坏字符串结构，使用encodeURIComponent()编码
      url: '/pages/modify/modify?username=' + encodeURIComponent(this.data.username) + '&gender=' + encodeURIComponent(this.data.gender),
    })
```

## 三 从本地相册或照相机拍照

```
wx.chooseImage({
      count: 1, //最多可以选择9张图片
      sizeType: ['original', 'compressed'], //图片尺寸原图，压缩图
      sourceType: ['album', 'camera'], //图片来源， 从相册选图，使用相机
      success: res => {
        //tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        this.setData({
          imgUrl: tempFilePaths
        })
      }
    })
```

## 四 选择用户地址

```
wx.chooseAddress({
      //成功之后，把所有数据存放到addressInfo里，在wxml中调用
      success: (result) => {
        console.log(result.userName) //收货人姓名
        console.log(result.postalCode) //邮编
        console.log(result.provinceName) //省
        console.log(result.cityName) //市
        console.log(result.countyName) //县
        console.log(result.detailInfo) //详细信息
        console.log(result.nationalCode)//国家码
     
      },
      //接口调试失败信息，打印在控制台中
      fail: err => {
        console.log(err)
      }
    })
```

## 五 拨打电话

```
wx.makePhoneCall({
      phoneNumber: '123456789',
  })
```

## 六 显示加载及隐藏加载

### 6.1 显示加载中

```
 wx.showLoading({
      title: 'Loading',
    })
```

### 6.2 加载结束

```
wx.hideLoading()
```

## 七 提示信息

```
wx.showToast({
          title: '查询异常',
})
```

## 八 源码
* [源码](https://download.csdn.net/download/Calvin_zhou/24419372)