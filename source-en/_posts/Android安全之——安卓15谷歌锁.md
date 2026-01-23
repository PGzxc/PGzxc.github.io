---
title: Android安全之——安卓15谷歌锁
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 463e15b7
date: 2025-07-10 08:39:44
---
## 一 概述

* Google 锁(FRP)机制
* FRP 锁的触发条件
* 解锁 FRP 的正规方式

<!--more-->

## 二 Google 锁(FRP)机制

### 2.1 出厂重置保护(Factory Reset Protection, FRP)增强

```
当设备已登录 Google 账号并设置锁屏方式（图案/指纹/密码等），
在未解除账号绑定前进行出厂重置，重启后会强制要求登录原账号验证。

Android 15 对于尝试绕过 FRP 的方法进行了更深层的限制（如ADB命令、非法Fastboot操作等）。
```

### 2.2  强制账户验证界面不可跳过

```
Android 15 强化了 FRP 流程的完整性，无法通过“跳过”或“回退”按钮绕过账户验证
```

### 2.3 配合 Google Find My Device

```
增强与远程锁定、定位、擦除功能联动，当设备开启“查找我的设备”后即被标记为受保护设备。
```

### 2.4 限制第三方刷机工具绕过

```
对 bootloader 状态、系统完整性（如 verified boot）做更严格的校验，防止刷入第三方ROM绕过 FRP
```

## 三 FRP 锁的触发条件

```
-用户已设置 Google 账号 + 屏幕锁定
-通过设置外以外方式恢复出厂设置（如 Recovery 模式）
```

## 四 解锁 FRP 的正规方式

```
-输入原 Google 账号密码（建议开启 2FA）
-若为企业设备，管理员可通过 Android Enterprise 平台管理设备解除
```

