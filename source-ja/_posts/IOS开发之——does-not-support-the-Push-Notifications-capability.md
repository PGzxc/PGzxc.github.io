---
title: IOS开发之——does not support the Push Notifications capability
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: f7c18101
date: 2022-02-19 22:37:17
---
## 一 现象

导入友盟分享，运行到真机设备时，出现了如下异常

```
Code Signing Error: Cannot create a iOS App Development provisioning profile for "com.umeng.UMComDemo". Personal development teams, including "user", do not support the Push Notifications capability.
```

<!--more-->

## 二 原因

友盟项目，因为其开启了通知, 但是我们的证书又不支持这个推送证书配置

## 三 解决办法

找到当前工程对应的`xxx.entitlements`文件，删除`APS Environment`项，保存后重新打开工程即可

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-error-push-aps-environment.png