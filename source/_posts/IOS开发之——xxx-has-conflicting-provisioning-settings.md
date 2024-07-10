---
title: IOS开发之——xxx has conflicting provisioning settings
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: '599046e5'
date: 2022-02-19 22:35:17
---
## 一 异常现象

将友盟分享项目运行到真机时，出现了如下问题：

```
UMengComDemo has conflicting provisioning settings.
UMengComDemo is automatically signed, but provisioning profile ce77059f-c89f-4a6c-8e78-3e23cb2fc4a9 has been manually specified. Set the provisioning profile value to "Automatic" in the build settings editor, or switch to manual signing in the Signing & Capabilities editor
```
<!--more-->

## 二 异常图片

![][1]

## 三 异常原因

项目已经指定了`Provisioning Profile`,通过勾`Automatically manage signing`无法清除
![][2]



## 四 解决办法(清除provisioning file)

依次找到：TARGETS——>Demo——>Build Settings——>PROVISIONING_PROFILE——>删除provisioning file
![][3]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-error-conficting-provisioning-setting.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-error-provisioning-profile-exist.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-error-conficting-provisioning-buildsetting-remove.png

