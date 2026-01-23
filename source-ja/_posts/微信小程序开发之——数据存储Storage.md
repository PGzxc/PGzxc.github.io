---
title: 微信小程序开发之——数据存储Storage
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 7d74fe7d
date: 2021-11-10 12:04:15
---
## 一 概述

微信小程序默认创建的应用，点击用户头像，会显示log日志，日志存储在Storage中，key值是logs，value值是Array数组，数组的长度为8

![][1]

<!--more-->

## 二 logs日志分析

### 2.1 读取logs日志并追加(app.js)

```
onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 }   
```

说明：

* wx.getStorageSync('logs')：读取Storage中存储的logs日志
* logs.unshift(Date.now())：向日志中追加一条新的日志
* wx.setStorageSync('logs', logs)：将追加后的日志，存储到Storage中

### 2.2 logs页面展示日志信息

#### 2.2.1 logs.js(获取Stroage中存储的logs日志，并将long类型通过formatTime格式化)

```
onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  }
```

#### 2.2.2 logs.wxml展示

```
 <block wx:for="{{logs}}" wx:key="timeStamp" wx:for-item="log">
    <text class="log-item">{{index + 1}}. {{log.date}}</text>
 </block>
```

## 三 Stroage说明

* 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容
* 除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。
* 单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。

## 四 Storage示例
界面
![][2]

### 4.1 保存数据(wx.setStorageSync/wx.setStorage)

#### 代码

```
 data: {
    jsonData: { name: '张三',age: 18}
  },
addBasic() {
    /**原生类型 */
    wx.setStorage({
      key: 'key-basic',
      data: '张三'
    })
  },
  addDate() {
    /**Date类型 */
    wx.setStorage({
      key: 'key-date',
      data: util.formatTime(new Date())
    })
  },
  addJson() {
    /**JSON.stringify序列化的对象 */
    wx.setStorage({
      key: 'key-json',
      data: this.data.jsonData,
      success: function () {
        console.log("Storage--success");
      }
    })
  },  
```

#### Storage中变化
![][3]

### 4.2 清除数据(wx.removeStorage/wx.removeStorageSync)

#### 代码

```
removeBasic(){
    wx.removeStorage({
      key: 'key-basic',
    })
},
```

#### Storage中变化

![][4]

### 4.3 获取所有Storage(wx.getStorageInfo/wx.getStorageInfoSync())

#### 代码

```
storageInfo(){
    wx.getStorageInfo({
      success: (option) => {
        console.log(option);
      },
    })
  },
```

#### 获取的结果
![][5]

### 4.4 清除所有Storage(wx.clearStorage/wx.clearStorageSync())

#### 代码

```
  clearStorageInfo(){
    wx.clearStorage({
      success: (res) => {
        console.log("数据清除成功");
      },
    })
  }
```

#### 效果图
![][6]

## 五 参考

* [CSDN下载-参考代码](https://download.csdn.net/download/Calvin_zhou/39535305)
* [微信小程序官方文档-Storage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html)






[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-storange-log-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-storage-operate-preview.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-storage-add-preview.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-storage-remove-preview.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-storage-getStroageinfo.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-storage-clearInfo-preview.gif