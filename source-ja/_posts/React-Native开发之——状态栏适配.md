---
title: React Native开发之——状态栏适配
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: c77e9ee1
date: 2025-12-09 08:51:33
---
## 一 概述

```
本文介绍：
 - 官方组件StatusBar
 - 基本使用
 - 属性说明
```

<!--more-->

## 二 官方组件StatusBar

```
React Native 提供官方组件：StatusBar
可控制样式、颜色、沉浸等。
```

## 三 基本使用

```
import { StatusBar } from 'react-native';

<StatusBar
  barStyle="light-content" // 状态栏文字颜色
  backgroundColor="transparent" // 背景透明
  translucent={true} // 内容延伸到状态栏下
/>
```

## 四 属性说明

|      属性       |                      作用                      |
| :-------------: | :--------------------------------------------: |
|    barStyle     | 状态栏文字颜色（light-content / dark-content） |
| backgroundColor |          状态栏背景色（Android 有效）          |
|   translucent   |       内容是否延伸到状态栏下（Android）        |

