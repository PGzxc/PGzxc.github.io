---
title: 微信小程序开发之——webview适配
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: a80b57d1
date: 2021-12-31 16:22:12
---
## 一 概述

* 百分比布局
* 整体缩放
* 调整字体大小

<!--more-->

## 二 百分比布局

```
.item-wrapper{
        width: 33.33%;
}
```

## 二 整体缩放

```
html {
	    position: fixed;
	    height: 100%;
	    width: 100%;
	    /**调整缩放 */
	    transform: scale(0.75, 0.75);
	   -ms-transform: scale(0.75, 0.75);
	   -webkit-transform: scale(0.75, 0.75);
}
```

## 三 调整字体大小

```
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="format-detection" content="telephone=yes" />
<meta name="msapplication-tap-highlight" content="no" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">

//CSS里使用rem代替px，JS里根据屏幕大小修改rem的值
window.setFontSize = function() {
    var size = document.documentElement.clientWidth / 750 * 100;
//  size = size > 50 ? size : 50
//  console.log(size);
    document.documentElement.style.fontSize = size.toString()  + "px";
};
setFontSize();
//在屏幕大小变化时重新设置大小
$(window).resize(function() {
    setFontSize()
});
```

