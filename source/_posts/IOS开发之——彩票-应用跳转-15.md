---
title: IOS开发之——彩票-应用跳转(15)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: efa9ab7a
date: 2022-02-15 23:18:19
---
## 一 概述

* 自定义应用跳转
* AppStore中已存在的应用跳转(已上架)

<!--more-->

## 二 自定义应用跳转

### 2.1 创建自定义跳转应用(JumpApp)-URL Types

TARGETS——>JumpApp——>Info——>URL Types中点击“+”，添加一个URL Type

![][1]



说明：

* URL Schemes：设置为mm
* Identifier：设置为abc

### 2.2 跳转应用

```
 [[UIApplication sharedApplication]openURL:[NSURL URLWithString:@"mm://abc"]];
```

### 2.3 效果图
![][2]

## 三 AppStore中已存在的应用跳转(已上架)

### 3.1 跳转信息

```
{
   "title": "网易新闻", 
    "id": "com.netease.news", 
    "url": "http://itunes.apple.com/app/id425349261?mt=8", 
    "icon": "newsapp@2x.png", 
    "customUrl": "newsapp"
},
```

### 3.2 逻辑说明

* 根据customUrl和id拼接出跳转到的应用scheme
* 跳转前判断移动端是否已经安装了应用
* 如果未安装，跳转到AppStore进行下载
* 已经安装了，直接跳转到应用界面

### 3.3 代码

```
  NSString *urlStr=[NSString stringWithFormat:@"%@://%@",product.customUrl,product.ID];
  NSURL *url=[NSURL URLWithString:urlStr];
  UIApplication *app=[UIApplication sharedApplication];
  if ([app canOpenURL:url]) {//是否安装这个应用
       [[UIApplication sharedApplication]openURL:url];
  }else //没有安装这个应用
  {
      [[UIApplication sharedApplication]openURL:[NSURL URLWithString:product.url]];
  }
```

### 3.4 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-jumpapp-url-types.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-jumpapp-define-sample.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-jumpapp-appstore-sample.gif