---
title: 微信小程序开发之——WebView
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: d107a30c
date: 2021-11-15 16:54:53
---
## 一 概述

微信小程序对WebView支持的库有：

* [wxParse][00]：微信小程序富文本解析自定义组件，支持HTML及markdown解析(已过期，不提供支持)
* [web-view][01]：微信官方提供，承载网页的容器(个人类型的小程序暂不支持使用)

<!--more-->

## 二 web-view的基本使用

### 2.1 基本属性

|    属性     |     类型     |                             说明                             |
| :---------: | :----------: | :----------------------------------------------------------: |
|     src     |    string    |                    webview 指向网页的链接                    |
| bindmessage | eventhandler | 网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息 |
|  bindload   | eventhandler |        网页加载成功时候触发此事件。e.detail = { src }        |
|  binderror  | eventhandler |       网页加载失败的时候触发此事件。e.detail = { src }       |

### 2.2 web-view加载网页

#### 2.2.1 网页内容

```
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            background-color: lightsalmon;
        }

        div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin: auto 0;
            padding: 0 auto;
            height: 100%;
            text-align: center;
        }
    </style>
</head>
<div>
    <h1>网页内容</h1>
</div>
</html>
```

#### 2.2.2 IIS(Internet Information Services)提供web服务
![][1]

#### 2.2.3 小程序使用web-view加载网页-1

##### webview.wxml中使用(src指定网页地址)

```
<web-view src="http://localhost:8081/html/my-webview.html"></web-view>
```

#### 2.2.4 小程序使用web-view加载网页-2

##### webview.wxml中

```
<web-view  src="{{src}}"></web-view>
```

##### webview.js

```
var webSrc = [
  "http://localhost:8081/html/weichat-webview.html", //网页地址
  "http://localhost:8081/html/my-webview.html"
];

onLoad: function (options) {
    this.setData({
      src: webSrc[1]
    })
  },
```

#### 2.2.5 效果图
![][2]

## 三 web-view和小程序交互传值

### 3.1 通过`bindmessage`传值(小程序后退，销毁，分享)

#### 3.1.1 说明

网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息

#### 3.1.2 网页

```
<!DOCTYPE html>
<html>
    <meta charset="UTF-8">
<head>
    <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
    <!--小程序调用-->
</head>
<body>
    <h1>JavaScript 事件</h1>
    <button onclick="getTime()">时间是？</button>
    <p id="demo"></p>
</body>
<script>
    function getTime() {
        var date = Date();
        document.getElementById('demo').innerHTML = date
        /**小程序调用 */
        wx.miniProgram.navigateBack({delta: 1}); 
        wx.miniProgram.postMessage({ data: date });
    }
</script>
</html>
```

#### 3.1.3 小程序端-handleGetMessage

```
  handleGetMessage: function (e) {
    debugger;
    console.log("从WebView返回的数据为：" + JSON.stringify(e.detail.data[0]));
  }
```

#### 3.1.4 返回结果(返回时，接收到的结果)
![][3]

### 3.2 网页直接传值

#### 3.2.1 网页(navigateTo后面拼接参数)

```
<!DOCTYPE html>
<html>
    <meta charset="UTF-8">
<head>
    <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
    <!--小程序调用-->
</head>
<body>

    <h1>JavaScript 事件</h1>
    <button onclick="getTime()">时间是？</button>
    <p id="demo"></p>
</body>
<script>
    function getTime() {
        var date = Date();
        var data={date:null};
        document.getElementById('demo').innerHTML = date
        wx.miniProgram.navigateTo({url: '/pages/webjump/webjump?data='+JSON.stringify(data)})
    }
</script>
</html>
```

#### 3.2.2 跳转到结果页面接收数值

##### webjump.wxml

```
<text>{{content}}</text>
```

##### webjump.js

```
  onLoad: function (options) {
    debugger
    var data=options.data;
    var con=JSON.stringify(options.data);
    this.setData({
      content:JSON.stringify(options.data)
    })
    console.log("从webview获得的值为：============="+JSON.stringify(options.data));
  },
```

#### 3.2.3 效果图
![][4]

## 四 参考
* [CSDN下载-webview](https://download.csdn.net/download/Calvin_zhou/42466860)
* [小程序官方文档-webview](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)



[00]:https://github.com/icindy/wxParse
[01]:https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-webview-iis-service.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-webview-basic-use.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-webview-handleGetMessage.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-webview-jump-param.gif
