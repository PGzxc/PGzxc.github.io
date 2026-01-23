---
title: Android开发之——状态栏导航栏高度
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: b088add3
date: 2025-11-28 18:13:40
---
## 一 概述

```
本文介绍：
 -状态栏/导航栏高度的获取方式（含旧版、新版、Compose、全面屏和刘海屏场景）
 - 并附带工具类封装
```

<!--more-->

## 二 传统方式（通过系统资源 ID 获取）

```
1、这在 Android 5.0–Android 11 之间仍然可靠。
fun Context.statusBarHeight(): Int {
    val resourceId = resources.getIdentifier("status_bar_height", "dimen", "android")
    return if (resourceId > 0) resources.getDimensionPixelSize(resourceId) else 0
}

fun Context.navigationBarHeight(): Int {
    val resourceId = resources.getIdentifier("navigation_bar_height", "dimen", "android")
    return if (resourceId > 0) resources.getDimensionPixelSize(resourceId) else 0
}

2、优点：
-简单直接
-在绝大多数机型都生效

3、缺点：
-Android 12+ 某些系统（尤其是手势导航）下，导航栏可能为 0（因为没有虚拟键）
```

## 三 官方推荐方式（WindowInsetsCompat）

### 3.1 获取

```
在 Android 10+ 全面屏/刘海屏上，推荐使用 WindowInsets 获取真实区域

fun getSystemBarHeights(view: View, callback: (statusBar: Int, navBar: Int) -> Unit) {
    ViewCompat.setOnApplyWindowInsetsListener(view) { _, insets ->
        val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
        callback(systemBars.top, systemBars.bottom)
        insets
    }
}
```

### 3.2 使用

```
getSystemBarHeights(binding.root) { statusBar, navBar ->
    Log.d("Insets", "状态栏=$statusBar, 导航栏=$navBar")
}
```

### 3.3  优点

```
实时、准确（可适配刘海屏、手势导航）
自动适应横竖屏、输入法、分屏等场景
```

## 四 Compose 下获取状态栏/导航栏高度

### 4.1 Compose使用

```
Compose 已内置安全区域支持，可直接使用：

val insets = WindowInsets.systemBars
val statusBarHeight = insets.getTop(LocalDensity.current)
val navBarHeight = insets.getBottom(LocalDensity.current)
```

### 4.2 简写

```
或使用简写：
Modifier
    .statusBarsPadding()      // 自动避开状态栏
    .navigationBarsPadding()  // 自动避开导航栏
```

### 4.3 需要精确数值时

```
val statusBarPx = WindowInsets.statusBars.getTop(LocalDensity.current)
val navBarPx = WindowInsets.navigationBars.getBottom(LocalDensity.current)
```

## 五 全面封装工具类示例

### 5.1 工具

```
object SystemBarUtils {

    fun getStatusBarHeight(context: Context): Int {
        val resourceId = context.resources.getIdentifier("status_bar_height", "dimen", "android")
        return if (resourceId > 0) context.resources.getDimensionPixelSize(resourceId) else 0
    }

    fun getNavigationBarHeight(context: Context): Int {
        val resourceId = context.resources.getIdentifier("navigation_bar_height", "dimen", "android")
        return if (resourceId > 0) context.resources.getDimensionPixelSize(resourceId) else 0
    }

    fun getRealInsets(view: View, callback: (statusBar: Int, navBar: Int) -> Unit) {
        ViewCompat.setOnApplyWindowInsetsListener(view) { _, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            callback(bars.top, bars.bottom)
            insets
        }
    }

    fun hasNavigationBar(context: Context): Boolean {
        val id = context.resources.getIdentifier("config_showNavigationBar", "bool", "android")
        return id > 0 && context.resources.getBoolean(id)
    }
}
```

### 5.2 使用

```
val statusHeight = SystemBarUtils.getStatusBarHeight(context)
val navHeight = SystemBarUtils.getNavigationBarHeight(context)

SystemBarUtils.getRealInsets(binding.root) { top, bottom ->
    Log.d("SystemBar", "Status=$top, Nav=$bottom")
}
```

## 六 不同场景下的推荐方案

|          场景          |                  获取方式                   |     说明     |
| :--------------------: | :-----------------------------------------: | :----------: |
| 普通布局（固定导航栏） |                 系统资源 ID                 |   简单可靠   |
|   全面屏 / 手势导航    |             WindowInsetsCompat              | 获取真实高度 |
|        Compose         |  WindowInsets.statusBars / navigationBars   | 直接使用 API |
|        Fragment        | ViewCompat.setOnApplyWindowInsetsListener() |   动态监听   |
|  Dialog / PopupWindow  |        获取 decorView 再计算 Insets         | 避免遮挡问题 |

## 七 补充：刘海屏安全区获取（DisplayCutout）

```
如果需要避开刘海区域，可用：
ViewCompat.setOnApplyWindowInsetsListener(window.decorView) { _, insets ->
    val cutout = insets.displayCutout
    val safeTop = cutout?.safeInsetTop ?: 0
    val safeBottom = cutout?.safeInsetBottom ?: 0
    Log.d("Cutout", "刘海上边距=$safeTop, 下边距=$safeBottom")
    insets
}
```

