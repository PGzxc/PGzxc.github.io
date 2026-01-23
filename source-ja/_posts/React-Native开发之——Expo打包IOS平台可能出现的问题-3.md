---
title: React Native开发之——Expo打包IOS平台可能出现的问题(3)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: 37a0bca4
date: 2025-09-15 12:44:58
---
## 一 错误现象

```
Authentication with Apple Developer Portal failed!                                                                                                                                
You have no team associated with your Apple account, cannot proceed.                                                                                                              
(Do you have a paid Apple Developer account?)                                                                                                                                     
    Error: build command failed.
```

<!--more-->

## 二 常见原因

```
1、你用的是普通 Apple ID（免费账号）
 免费账号只能本地真机调试，不能打包 IPA 上传 App Store。
 EAS / Xcode Archive 都必须绑定付费开发者计划才行。

2、没有加入任何团队
 如果你是企业/公司开发者，需要管理员在 Apple Developer
 邀请你进入团队。

3、账号付费已过期
 每年 $99（个人）或 $299（企业），到期后不能再打包 IPA。
```

## 三 解决方案

### 3.1 方案一：升级为付费开发者账号

```
1、登录 Apple Developer 官网：https://developer.apple.com/accou
2、购买 Apple Developer Program ($99/年)
3、付款通过后，EAS 再执行 eas build -p ios 就能正常创建证书、签名了。
```

### 3.2 方案二：公司团队账号

```
如果公司已经有开发者账号，需要管理员：
 -登录 Apple Developer Console
 -进入 Users and Access → Invite
 -给你的 Apple ID 发送邀请
 -你接受后就能正常打包
```

### 3.3 方案三(仅开发调试)：使用免费账号真机运行

```
1、如果只是想在自己设备上跑 App，而不是上架
 expo run:ios

2、说明
 这会调用 Xcode，允许你用免费证书在设备安装调试（限制 7 天有效）。
 不能生成可以上架的 IPA。
```

