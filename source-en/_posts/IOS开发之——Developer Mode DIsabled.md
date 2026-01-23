---
title: IOS开发之——Developer Mode DIsabled
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: cfc4ca7
date: 2023-03-25 11:11:43
---
## 一 现象

将设备接入电脑，进行真机调试时显示如图所示信息：

```
Developer Mode disabled: To use xc的iPad for development,enable Developer Mode in Settings->Privacy & Security.
```

![][1]

<!--more-->

## 二 原因—设备开发者模式已关闭

`隐私与安全性`——>安全性——>开发者模式

![][2]

## 三 开启开发者模式

将开发者模式打开后，设备重启

![][3]

重启设备后，查看开发者模式是否打开

![][4]

Xcode中设备恢复正常状态

![][5]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-disable-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-disable-ipad-developer-disabled.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-disable-ipad-developer-reset.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-disable-ipad-developer-enabled.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-disable-enable-view.png