---
title: Android开发之——安全区域
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: b448c1ea
date: 2025-11-29 18:14:43
---
## 一 概述

```
安全区域 (Safe Area) 是状态栏、导航栏适配的进阶主题。
它在全面屏、刘海屏、挖孔屏、底部手势导航模式下尤其关键。
下面梳理一下 Android 的安全区域机制、适配方式，以及封装方案。
```

<!--more-->

## 二 什么是安全区域 (Safe Area)

```
1、安全区域指：
-屏幕中不被系统 UI（状态栏、导航栏、刘海区、圆角、手势区）遮挡的部分。
-你的 UI 内容要在 Safe Area 内展示。

2、换句话说：
-刘海区上方不要放标题
-手势导航区域不要放底部按钮
-全面屏下内容不要顶到状态栏
```

## 三 Android 官方体系：WindowInsets

### 3.1 概念

```
从 Android 10（API 29）起，官方引入了统一的系统 UI 安全区域管理：

-WindowInsets：包含系统栏、IME、显示切口、圆角等区域信息
-WindowInsetsCompat：兼容到 Android 5.0
-WindowInsetsControllerCompat：控制状态栏和导航栏显示
```

### 3.2 常见类型

|   Insets 类型    |      含义       |
| :--------------: | :-------------: |
|   statusBars()   |   状态栏高度    |
| navigationBars() | 底部导航栏高度  |
|      ime()       | 输入法键盘区域  |
| displayCutout()  |  刘海/挖孔区域  |
|   systemBars()   | 状态栏 + 导航栏 |

## 四 安全区域适配通用写法

### 4.1 代码

```
ViewCompat.setOnApplyWindowInsetsListener(rootView) { v, insets ->
    val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
    v.setPadding(bars.left, bars.top, bars.right, bars.bottom)
    insets
}
```

### 4.2 优点

```
-自动计算状态栏、导航栏、安全区域
-适配所有机型（含刘海屏、手势导航）
-与 fitsSystemWindows 不冲突
```

## 五 全面屏 + 沉浸式下的安全区域

### 5.1 情景1

```
如果使用沉浸式布局：
WindowCompat.setDecorFitsSystemWindows(window, false)

这时系统不会为你自动留安全区，你必须 自己处理内边距。
```

### 5.2 情景2

```
例如顶部 Toolbar 需要避开状态栏：
toolbar.updatePadding(top = statusBarHeight())

可配合：
fun Context.statusBarHeight(): Int {
    val resId = resources.getIdentifier("status_bar_height", "dimen", "android")
    return if (resId > 0) resources.getDimensionPixelSize(resId) else 0
}
```

## 六 实战：工具类封装

### 6.1 SafeAreaUtils.kt

```
object SafeAreaUtils {

    fun applySystemBarsPadding(view: View) {
        ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    fun applyTopInset(view: View) {
        ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
            val topInset = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top
            v.setPadding(v.paddingLeft, topInset, v.paddingRight, v.paddingBottom)
            insets
        }
    }

    fun applyBottomInset(view: View) {
        ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
            val bottomInset = insets.getInsets(WindowInsetsCompat.Type.navigationBars()).bottom
            v.setPadding(v.paddingLeft, v.paddingTop, v.paddingRight, bottomInset)
            insets
        }
    }
}
```

### 6.2 使用

```
SafeAreaUtils.applySystemBarsPadding(binding.root)
SafeAreaUtils.applyTopInset(binding.toolbar)
```

## 七 Compose 安全区域适配

### 7.1 Jetpack Compose 自带安全区支持（非常推荐使用）

```
Scaffold(
    modifier = Modifier
        .fillMaxSize()
        .systemBarsPadding()   // 自动避开状态栏、导航栏
) {
    // 内容
}
```

### 7.2 常用 Modifier

|        Modifier         |               功能               |
| :---------------------: | :------------------------------: |
|   statusBarsPadding()   |           仅避开状态栏           |
| navigationBarsPadding() |           仅避开导航栏           |
|   systemBarsPadding()   |           同时避开两者           |
|      imePadding()       |       输入法弹出时避开键盘       |
|  safeDrawingPadding()   | 自动避开所有显示 cutout 和系统条 |

## 八 第三方库（封装更全面）

### 8.1  ImmersionBar

```
1、说明：
支持安全区 + 刘海屏 + 各厂系统完美适配。

2、示例
ImmersionBar.with(this)
    .fitsSystemWindows(true)
    .statusBarColor(R.color.transparent)
    .navigationBarColor(R.color.black)
    .init()
```

### 8.2 UltimateBarX

```
1、说明
基于官方 WindowInsetsCompat，Compose & View 全支持。

2、示例
UltimateBarX.with(this)
    .fitWindow(true)
    .applyStatusBar()
```

## 九 适配建议总结

|      场景      |                   推荐方式                   |
| :------------: | :------------------------------------------: |
|    普通布局    | ViewCompat.setOnApplyWindowInsetsListener()  |
|    Compose     | .systemBarsPadding() / .safeDrawingPadding() |
| 刘海屏、全面屏 |            ImmersionBar 自动处理             |
|    Fragment    |         用工具类或 ImmersionBar 支持         |
|    手势导航    |      通过 Insets 获取底部手势区高度避让      |
|   输入法弹出   |    使用 .imePadding() 或监听 ime() insets    |

