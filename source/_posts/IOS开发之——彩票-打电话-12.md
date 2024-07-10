---
title: IOS开发之——彩票-打电话(12)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: b96ddde4
date: 2022-02-14 23:40:29
---
## 一 概述

* 方法一：NSURL URLWithString:@"tel://10010"];
* 方法二：[NSURL URLWithString:@"telprompt://10010"];
* 方法三：webView loadRequest

<!--more-->

## 二 方法一：NSURL URLWithString:@"tel://10010"];

### 2.1 代码

```
NSURL *url = [NSURL URLWithString:@"tel://10010"];
[[UIApplication sharedApplication] openURL:url];
```

### 2.2 说明

* 最简单最直接的方式：直接跳到拨号界面
* 电话打完后，不会自动回到原应用，直接停留在通话记录界面

## 三 方法二：[NSURL URLWithString:@"telprompt://10010"];

### 3.1 代码

```
NSURL *url = [NSURL URLWithString:@"telprompt://10010"];
[[UIApplication sharedApplication] openURL:url];
```

### 3.2 说明

* 拨号之前会弹框询问用户是否拨号，拨完后能自动回到原应用
* 因为是私有API，所以可能不会被审核通过

## 四 方法三：webView loadRequest

### 4.1 代码

```
@interface ILAboutViewController ()
@property(nonatomic,strong) UIWebView *webView;
@end

if (_webView == nil) {
    _webView = [[UIWebView alloc] initWithFrame:CGRectZero];
}
[_webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"tel://10010"]]];

```

### 4.2 说明

* 创建一个UIWebView来加载URL，拨完后能自动回到原应用
* 拨号之前会弹框询问用户是否拨号，拨完后能自动回到原程序
* 注意：这个webView千万不要设置尺寸，不然会挡住其他界面，他只是用来打电话，不需要显示

## 五 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-tel.gif