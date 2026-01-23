---
title: Flutter开发之——安全区域三方库
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: e38ffc31
date: 2025-12-08 08:36:16
---
## 一 安全区域

```
本文介绍：
 - 第三方库推荐
 - 常见场景适配总结
 - 沉浸式状态栏示例
```

<!--more-->

## 二 第三方库推荐

### 2.1 flutter_screenutil

```
1、地址
https://pub.dev/packages/flutter_screenutil

2、说明
Flutter 最常用的屏幕适配库

3、功能
-自动适配不同分辨率
-动态计算状态栏高度
-兼容鸿蒙 / Android / iOS

4、使用示例
ScreenUtil.init(context);
final statusBar = ScreenUtil().statusBarHeight;
final bottomBar = ScreenUtil().bottomBarHeight;
```

### 2.2 flutter_displaymode

```
1、地址
https://pub.dev/packages/flutter_displaymode

2、说明
获取设备屏幕参数（如分辨率、刷新率）
适合需要动态适配全面屏 / 刘海屏 UI。
```

### 2.3 safe_area_padding

```
1、地址
https://pub.dev/packages/safe_area_padding

2、说明
专门处理安全区域，支持监听变化（横竖屏切换时）

3、示例
SafeAreaPadding(
  builder: (context, padding) {
    return Padding(
      padding: EdgeInsets.only(top: padding.top, bottom: padding.bottom),
      child: child,
    );
  },
);
```

## 三 常见场景适配总结

|          场景          |                           解决方式                           |
| :--------------------: | :----------------------------------------------------------: |
|    内容被状态栏遮挡    | 用 SafeArea 或加 EdgeInsets.only(top: MediaQuery.padding.top) |
| 全屏背景图（需沉浸式） | 用 AnnotatedRegion\<SystemUiOverlayStyle> + 忽略 SafeArea(top: false) |
|  底部按钮被手势栏挡住  |                  用 SafeArea(bottom: true)                   |
|      横屏左右留白      |                     用 SafeArea 默认即可                     |
|     Flutter + 鸿蒙     |     官方 SafeArea 已完全适配（HarmonyOS NEXT Beta 之后）     |

## 四 沉浸式状态栏示例(兼容 Android/iOS/鸿蒙)

```
import 'package:flutter/services.dart';

AnnotatedRegion<SystemUiOverlayStyle>(
  value: SystemUiOverlayStyle(
    statusBarColor: Colors.transparent, // 透明状态栏
    statusBarIconBrightness: Brightness.light, // 状态栏图标亮色
  ),
  child: Scaffold(
    extendBodyBehindAppBar: true, // 内容延伸至状态栏下
    body: SafeArea(
      top: false, // 忽略顶部安全区
      child: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/bg.jpg'),
            fit: BoxFit.cover,
          ),
        ),
      ),
    ),
  ),
);
```

