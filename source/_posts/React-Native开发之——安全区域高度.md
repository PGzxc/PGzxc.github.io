---
title: React Native开发之——安全区域高度
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: 2e424ee6
date: 2025-12-09 08:54:22
---
## 一 概述

```
本文介绍：
 - 获取状态栏高度/底部安全区高度
 - 封装工具类(推荐)
```

<!--more-->

## 二 获取状态栏高度/底部安全区高度

### 2.1 使用 react-native-safe-area-context

1、示例

```
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function MyComponent() {
  const insets = useSafeAreaInsets();
  console.log('状态栏高度:', insets.top);
  console.log('底部手势区:', insets.bottom);
}
```

2、说明

|       属性        |              说明               |
| :---------------: | :-----------------------------: |
|    insets.top     |        状态栏 / 刘海高度        |
|   insets.bottom   | 底部手势区（如 iPhone X 的 34） |
| insets.left/right |            横屏边距             |

### 2.2 获取屏幕信息(宽高)

```
1、示例
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


2、说明
-window：可用区域（不含状态栏）
-screen：物理屏幕（含状态栏）
```

## 三 封装工具类(推荐)

### 3.1 工具类

```
// utils/DeviceHelper.js
import { Dimensions, Platform, StatusBar } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export const DeviceHelper = {
  screenWidth: width,
  screenHeight: height,
  statusBarHeight: Platform.select({
    ios: initialWindowMetrics?.insets.top || 20,
    android: StatusBar.currentHeight || 0,
  }),
  bottomSafeHeight: initialWindowMetrics?.insets.bottom || 0,
  isFullScreenDevice:
    (initialWindowMetrics?.insets.bottom || 0) > 0,
};
```

### 3.2 使用

```
import { DeviceHelper } from './utils/DeviceHelper';
console.log(DeviceHelper.statusBarHeight);
```

