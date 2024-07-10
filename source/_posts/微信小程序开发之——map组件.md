---
title: 微信小程序开发之——map组件
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: fba11a20
date: 2021-09-27 18:04:01
---
## 一 概述

* wx.getLocation获取用户当前位置信息
* map组件的基础属性(显示带有方向的当前定位点，显示指南针，开启卫星图)
* map添加标记点marker

<!--more-->

## 二 map使用-当前不是定位位置

### 2.1 布局文件(index.wxml)

```
<map id="map"></map>
```

### 2.2 样式文件(index.wxss)-全屏

```
map{
  height: 100vh;
  width: 100vw;
}
```

### 2.3 效果图

![][1]

## 三 map获取当前位置显示(添加精度和纬度)

### 3.1 布局文件(index.wxml)

```
<map id="map" longitude="{{longitude}}" latitude="{{latitude}}"></map>
```

### 3.2 逻辑文件(index.js)—获取当前位置设置精度和纬度

```
onLoad: function (options) {
    wx.getLocation({
      type:'gcj02',
      success:res=>{
          this.setData({
            longitude: res.longitude,
            latitude: res.latitude
          })
      }
    })
  },
```

### 3.3 权限授予

#### 3.3.1 未授权前

![][2]

#### 3.3.2 点击查看详情，跳转[小程序位置授权][00]

```
{
  "pages": ["pages/index/index"],
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
    }
  }
}
```
![][3]
说明：

* 将上述代码配置到app.js下

#### 3.3.4 保存后，显示获取位置对话框
![][4]

#### 3.3.5 允许后，显示当前位置视图
![][5]

## 四 map组件的基础属性

### 4.1 [地图基础属性][01]-仅列出几项

|       属性       |  类型   |           说明           |
| :--------------: | :-----: | :----------------------: |
|  show-location   | boolean | 显示带有方向的当前定位点 |
|   show-compass   | boolean |        显示指南针        |
| enable-satellite | boolean |      是否开启卫星图      |

### 4.2 布局文件(index.wxml)

```
<map id="map" longitude="{{longitude}}" latitude="{{latitude}}" show-location show-compass enable-satellite></map>
```

### 4.3 效果图
![][6]

## 五 map添加标记点marker

### 5.1 布局文件(index.wxml)

```
<map id="map" longitude="{{longitude}}" latitude="{{latitude}}"  markers="{{markers}}" show-location show-compass enable-satellite></map>
```

### 5.2 逻辑文件(index.js)-addMark

#### 5.2.1 addMark函数

```
 addMark(res){
    var marker=[]
    marker.push({
      id:1, //标记点 id
      width:50,
      longitude: res.longitude,
      latitude: res.latitude,
      label:{
        content:'我的位置',
        color:'#f00',
        fontSize:20
      },
      callout:{
        content:'气泡',
        color:"#f00",
        fontSize:30
      },
      iconPath:'/images/center.png'
    })
    this.setData({
      markers:marker
    })
  },
```

#### 5.2.2 位置获取成功后，调用添加addMark函数

```
 onLoad: function (options) {
    wx.getLocation({
      type:'gcj02',
      success:res=>{
          this.setData({
            longitude: res.longitude,
            latitude: res.latitude
          })
          this.addMark(res)
      }
    })
  },
```

### 5.3 效果图
![][7]
## 六 源码
[参考代码](https://download.csdn.net/download/Calvin_zhou/25329453)


[00]:https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#permission
[01]:https://developers.weixin.qq.com/miniprogram/dev/component/map.html
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-map-first-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-map-getlocation-permission.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-map-permission-object.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-map-permission-dyamic.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-map-my-location.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-map-location-compass.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-map-marker-preview.gif