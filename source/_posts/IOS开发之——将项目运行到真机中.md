---
title: IOS开发之——将项目运行到真机中
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 91db0ec8
date: 2021-08-24 20:47:39
---
## 一 概述

与安卓开发不同，iOS开发需要开发者账号或apple id

* 模拟器时：Debug模式和Release模式都可以直接运行，不需要开发者账户
* 真机时：需要添加开发者账户，才能在真机中运行

<!--more-->

## 二 将代码运行到设备中

### 2.1 模拟器

终端设备选择模拟器，States显示账号警告，可以直接运行

![][1]

### 2.2 真机

#### 出现错误(States)

```
Signing for "xxx" requrires a developement team.Select a development team in the Signing & Capabilities editor.
```

#### 异常现象

![][2]

## 三 创建Apple Developer

### 3.1 注册条件

* 已开启[双重认证](https://support.apple.com/zh-cn/HT204915)的 Apple ID
* iPhone或iPad上注册Apple Developer Program(Appstore 搜索Developer)
* 注册会员资格续费(688人民币/年)

### 3.2 注册地址

* Apple ID注册地址：https://appleid.apple.com/account?appId
* Apple Developer Program：https://developer.apple.com/cn/programs/

### 3.3 注册结果

#### 注册结果

```
Your request could not be processed
```

![][3]

#### 反馈结果
![][4]

### 3.4 注册结果说明

* 按照正常流程注册时，会出现错误，官方并未给出失败原因及失败处理方案
* 我们可以继续使用Apple ID进行开发

## 四 Xcode管理Apple ID

### 4.1 添加Apple ID

打开Xcode开发工具，依次点击：Xcode——>Preferences
![][5]

在弹出的对话框中，切换到Accounts选项卡
![][6]
点击`+`，并选择添加账户类型

![][7]
选择Apple ID登陆并登陆
![][8]
添加成功后的效果
![][9]

### 4.2 删除Apple ID

选中Apple IDs列表中的条目，并点击`-`
![][10]

## 五 将项目运行到真机中

### 5.1 原生项目

原生项目：Targets——>Signing&Capabilities——>All——>Signing，选择Team
![][11]

选择运行到真机设备中，Xcode和真机设备显示如下信息

|      |                            Xcode                             |                             真机                             |
| :--: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 信息 | The operation couldn’t be completed. Unable to launch com.example.iosDevices because it has an invalid code signature, inadequate entitlements or its profile has not been explicitly trusted by the user. | 不受信任的开发者。你的设备管理设置不允许在这台iPad上使用开发者“Apple Development:xxx”的App。你可以在“设置”中允许使用这些App |
| 图片 |                           ![][12]                            |                           ![][13]                            |

真机设备：设置——>通用——>设备管理
![][14]
设备管理器中选择账户，选择`信任xxx`
![][15]
此种情况下app的有效期
![][16]

### 5.2 Flutter项目

Debug模式运行时，关闭Flutter，从Home页面打开时，显示如下，Release模式正常

```
in IOS14+,debug mode Flutter apps can only be launched from Flutter tooling,IDEs with Flutter plugins or form Xcode.

Alternatively,build in profile or release modes to enable launching from the home screen
```
![][17]

## 六 Debug和Release模式切换

在Xcode中，依次选择：Product——>Scheme——>Edit Scheme
![][18]
在弹出的对话框中选择运行模式
![][19]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-monitor-state.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-state-error.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-program-error.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-regist-error-apple-response.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-addid-xocde-preference.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-addid-xocde-accounts.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-addid-xocde-add.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-addid-xocde-appleid.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-addid-xocde-added.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-addid-xocde-delete.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-normalrun-add-team.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-normalrun-xcode-info.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-normalrun-device-info.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-normalrun-setting-manager.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-normalrun-account-belive.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-normalrun-expried.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-flutterrun-info.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-model-product-sheme.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-model-product-sheme-select.png
