---
title: Flutter开发之——安全区域高度
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 2cd33066
date: 2025-12-08 08:35:19
---
## 一 安全区域

```
本文介绍：
 - 获取系统栏与安全区高度
 - 工具类封装(推荐)
```

<!--more-->

## 二 获取系统栏与安全区高度

### 2.1 使用 MediaQuery

1、代码示例

```
final padding = MediaQuery.of(context).padding;
final statusBarHeight = padding.top;
final bottomInset = padding.bottom;
```

2、说明

|        参数        |           说明           |
| :----------------: | :----------------------: |
|    padding.top     |    状态栏 / 刘海高度     |
|   padding.bottom   | 底部安全区（手势导航条） |
| padding.left/right |      横屏时左右边距      |

3、示例

```
Container(
  margin: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
  child: Text("手动避开状态栏"),
);
```

### 2.2 获取屏幕高度（含/不含安全区）

```
final size = MediaQuery.of(context).size;
final heightWithoutStatusBar = size.height - MediaQuery.of(context).padding.top;
```

## 三 工具类封装(推荐)

### 3.1 通用工具类

```
import 'package:flutter/material.dart';

class ScreenUtils {
  static double statusBarHeight(BuildContext context) =>
      MediaQuery.of(context).padding.top;

  static double bottomSafeHeight(BuildContext context) =>
      MediaQuery.of(context).padding.bottom;

  static double screenHeight(BuildContext context) =>
      MediaQuery.of(context).size.height;

  static double screenWidth(BuildContext context) =>
      MediaQuery.of(context).size.width;

  static bool isFullScreenDevice(BuildContext context) =>
      MediaQuery.of(context).padding.bottom > 0;
}
```

### 3.2 使用示例

```
double top = ScreenUtils.statusBarHeight(context);
double bottom = ScreenUtils.bottomSafeHeight(context);
```

