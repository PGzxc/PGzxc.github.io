---
title: IOS开发之——使用AltStore给IPA签名并安装
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: b9730a5e
date: 2023-03-25 11:18:05
---
## 一 概述

* 准备材料
* 软件下载及安装
* AltStore注意事项
* AltStore给IPA文件签名

<!--more-->

## 二 准备材料

* Mac电脑/Windows电脑(安装AltStore软件)
* Apple ID账户
* AltStore(第三方签名软件)
* iPad(安装第三方软件设备)
* 第三方IPA软件

## 三 软件下载及安装

### 3.1 官网地址及介绍

官网地址：https://altstore.io

软件介绍：AltStore是一个第三方应用商店，无法在App Store中找到下载。通过官网下载后，可以对第三方ipa软件签名并安装到设备中

### 3.2 软件下载及安装

打开官网后，根据当前电脑系统选择相应的文件下载

![][1]

AltStore安装完成后，在状态栏中看到如下图所示标志

![][2]

## 四 AltStore注意事项

### 4.1 在设备上启用“WI-FI”同步


打开Finder，在位置中找到对应的设备，通用—>选项位置，开启`接入WI-Fi时显示此Ipad`

![][3]

### 4.2  打开Mail Plugin插件

未打开Mail 插件时，安装会出现如下错误

![][4]

按照如下步骤打开Mail Plugin：在软件中找到系统自带的Mail邮件登陆后点击左上角的邮件—>设置，打开邮件设置窗口

![][5]

在弹出的窗口中，勾选`AltPlugin.mailbundle`，并点击底部的`应用并重启邮件`

![][6]

## 五 AltStore给IPA文件签名

### 5.1 AltStore软件安装及设置

在菜单栏中找到AltStore，依次选择：Install AltStore——>设备

![][2]

在弹出的窗口中，输入Apple Id和密码

![][7]

Apple Id和密码填写正确后，弹出安装Mail Plugin-in，安装邮箱插件
![][8]

下一步，输入电脑密码
![][9]

### 5.2  添加AlStore信任

首次安装是无法打开的，按照以下步骤添加设备信任：通用——>VPN与设备管理——>`Trust YourEmailHere@email.com`

![][10]

### 5.3 安装AltStore到设备上

在菜单栏中找到AltStore，依次选择：Install AltStore——>设备，稍等片刻，AltStore安装到桌面上

![][11]

### 5.4 将ipa文件导入设备

将ipa文件拖放入某个应用的文件夹下

![][12]

### 5.5 通过AlStore安装ipa文件

首次打开AlStore，界面如下图所示

![][13]

在`Settings`页面登录apple Id后，切换到`My Apps`页面，点击左上角的加号，搜索ipa名称并点击安装

![][14]

在弹出的`App Contains Extensions`窗口中点击`Keep App Extensions`

![][15]

安装完成后，Active下显示已安装的ipa应用
![][16]

回到主屏幕，看到对应的ipa应用
![][17]

### 5.6 安装ipa文件管理
![][18]

### 5.7 IPA应用Deactivate

在`Active`列表中，选择要卸载的应用，弹出的窗口选择`Deactivate`

## 六 参考

* [在 Mac 上使用“隔空投送”](https://support.apple.com/zh-cn/HT203106)
* [How to Install AltStore (macOS)](https://faq.altstore.io/getting-started/how-to-install-altstore-macos)
* [Enable Mail Plug-in](https://faq.altstore.io/getting-started/how-to-install-altstore-macos/enable-mail-plug-in)
* [通过altStore自签证书实现绿信多开、安装TikTok、Spotify++等等](https://mp.weixin.qq.com/s?__biz=Mzg4MjE2NzYzNg==&mid=2247485182&idx=1&sn=4e67a347638e88763e2d64607bc7b3bc&chksm=cf5b9cc5f82c15d3d0b078b3178042d066ff4687a9e3f37e25aa96ee8ed270865596dbbf40f8&scene=27)
* [AltStore 使用说明](http://www.xiaoji001.com/altstore/index.win.html)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-software-download.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-install-alstore.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-install-ipad-enable-wifi.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-install-alstore-not-connect-mail.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-install-alstore-not-mail-open-manager.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-install-alstore-not-connect-bundle.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-software-apple-id-login.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-software-install-plugin.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-software-login-user.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-ipad-trust-app.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-ipad-install.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-install-ipa-to-ipad-folder.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-open-first-view.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-search-add-ipa.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-install-extensions-keep.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-install-ipa-finish.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-install-home-view.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-alstore-app-manager.png