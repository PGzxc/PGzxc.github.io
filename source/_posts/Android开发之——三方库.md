---
title: Android开发之——三方库
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 2b67e1b4
date: 2025-11-30 18:15:50
---
## 一 概述

```
状态栏/导航栏适配是 Android UI 开发中最常见、最容易出坑的部分
尤其在沉浸式布局、全面屏、刘海屏上
```

<!--more-->

## 二 核心问题分类

| 适配场景 |                 常见问题                  |
| :------: | :---------------------------------------: |
|  状态栏  | 颜色设置、透明沉浸、文字图标颜色（亮/暗） |
|  导航栏  |    背景色、隐藏与显示、返回键位置偏移     |
|  全面屏  |       内容顶到状态栏、底部导航遮挡        |
|  刘海屏  | Insets 适配、WindowInsetsController 兼容  |
|  多系统  |    MIUI、Flyme、EMUI、ColorOS 差异行为    |

## 三 官方推荐写法（Android 11+）

### 3.1 设置沉浸式状态栏（透明 + 内容延伸）

```
WindowCompat.setDecorFitsSystemWindows(window, false)
```

### 3.2 修改状态栏/导航栏颜色

```
window.statusBarColor = Color.TRANSPARENT
window.navigationBarColor = Color.TRANSPARENT
```

### 3.3 控制状态栏文字亮/暗色

```
val controller = WindowInsetsControllerCompat(window, window.decorView)
controller.isAppearanceLightStatusBars = true   // 深色文字
controller.isAppearanceLightNavigationBars = true
```

### 3.4 给布局增加安全内边距（防止内容被遮挡）

```
ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
    val systemInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars())
    v.setPadding(systemInsets.left, systemInsets.top, systemInsets.right, systemInsets.bottom)
    insets
}
```

## 四 常用工具类封装示例

### 4.1 StatusBarUtils.kt

```
object StatusBarUtils {

    fun transparent(window: Window) {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.TRANSPARENT
    }

    fun setLightStatusBar(window: Window, light: Boolean) {
        val controller = WindowInsetsControllerCompat(window, window.decorView)
        controller.isAppearanceLightStatusBars = light
    }

    fun setLightNavBar(window: Window, light: Boolean) {
        val controller = WindowInsetsControllerCompat(window, window.decorView)
        controller.isAppearanceLightNavigationBars = light
    }
}
```

### 4.2 使用

```
StatusBarUtils.transparent(window)
StatusBarUtils.setLightStatusBar(window, true)
```

## 五 第三方库推荐

### 5.1  [ImmersionBar](https://github.com/gyf-dev/ImmersionBar)

```
1、说明：最强大的状态栏适配库（国产开发者用最多）。
2、特性
-支持状态栏、导航栏一体化管理
-兼容 MIUI / Flyme / Android 4.4-14
-一行代码实现沉浸式效果

3、使用
ImmersionBar.with(this)
    .transparentStatusBar()
    .statusBarDarkFont(true)
    .navigationBarColor(R.color.black)
    .init()
    
4、优点
-API 设计优秀，适配全面屏、刘海屏
-自动处理 WindowInsets
-支持 Fragment / DialogFragment
```

### 5.2 [UltimateBarX](https://github.com/Zackratos/UltimateBarX)

```
1、说明：现代化、基于 WindowInsetsControllerCompat 的库。

2、优点：
-Kotlin DSL 风格
-Compose 支持
-轻量级无侵入

3、使用：

UltimateBarX.with(this)
    .fitWindow(false)
    .color(Color.TRANSPARENT)
    .light(true)
    .applyStatusBar()
```

### 5.3  [BarUtils (Blankj AndroidUtilCode)](https://github.com/Blankj/AndroidUtilCode)

```
1、说明
如果项目中用了 AndroidUtilCode，可以直接用内置工具类：

2、使用
BarUtils.setStatusBarColor(this, Color.TRANSPARENT)
BarUtils.setStatusBarLightMode(this, true)
BarUtils.transparentStatusBar(this)
```

## 六 适配策略总结

|          场景          |              推荐方式              |
| :--------------------: | :--------------------------------: |
|      Android 11+       | 官方 WindowInsetsControllerCompat  |
|      Android 6–10      |       ImmersionBar 自动适配        |
|      Compose 项目      | UltimateBarX 或 SystemUiController |
|        混合布局        |      BarUtils 或自定义工具类       |
| Fragment/Activity 混合 |       ImmersionBar 支持最佳        |

## 七 Compose 下的状态栏/导航栏适配

```
1、如你用 Jetpack Compose：
val systemUiController = rememberSystemUiController()
SideEffect {
    systemUiController.setStatusBarColor(
        color = Color.Transparent,
        darkIcons = true
    )
    systemUiController.setNavigationBarColor(
        color = Color.Transparent,
        darkIcons = true
    )
}

2、依赖
implementation "com.google.accompanist:accompanist-systemuicontroller:<latest>"
```



