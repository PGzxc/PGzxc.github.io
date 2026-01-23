---
title: Android开发之——适配状态栏导航栏
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: '3294e254'
date: 2025-11-27 18:12:32
---
## 一 概述

```
状态栏导航栏是 Android 开发中 UI 适配的重点之一
尤其在 沉浸式布局、透明状态栏、全屏手势、刘海屏、折叠屏 等设备上
状态栏与导航栏适配如果不处理好，就会出现「内容被遮挡」或「底部空白」等问题
```

<!--more-->

## 二 状态栏与导航栏基础概念

|           名称           |            含义            |    位置     |
| :----------------------: | :------------------------: | :---------: |
|   状态栏（Status Bar）   | 顶部显示时间、电量、信号栏 | 屏幕最上方  |
| 导航栏（Navigation Bar） |      底部虚拟按键区域      |  屏幕底部   |
|  系统栏（System Bars）   |      状态栏 + 导航栏       | 顶部 + 底部 |

注：Android 11 (API 30) 起，系统推荐使用 **WindowInsetsController** 统一控制。

## 三 常见适配目标( 实现下列 UI 效果)

|        效果         |           实现目标           |
| :-----------------: | :--------------------------: |
|    沉浸式状态栏     |     内容延伸到状态栏下方     |
|     状态栏透明      |           背景透出           |
|     导航栏透明      |        全屏显示背景图        |
| 状态栏字体颜色可变  |     深色/浅色模式自适应      |
|    全屏手势适配     | 刘海屏/全面屏/折叠屏安全区域 |
| Compose & View 兼容 |   同时支持 XML 和 Compose    |

## 四 按 Android 版本分的适配方案

### 4.1 Android 5.0 (Lollipop, API 21) 开始

```
1、可通过 Window 控制状态栏、导航栏颜色与透明度：
window.apply {
    // 内容延伸至状态栏
    decorView.systemUiVisibility =
        View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or View.SYSTEM_UI_FLAG_LAYOUT_STABLE

    // 设置状态栏透明
    statusBarColor = Color.TRANSPARENT
}

2、注意：
fitsSystemWindows="true" 会让布局避开状态栏，常用于顶部 Toolbar。
```

### 4.2 Android 6.0 (Marshmallow, API 23)

```
1、可修改状态栏图标颜色（浅色背景下使用深色图标）：
window.decorView.systemUiVisibility =
    View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR

2、说明
LIGHT_STATUS_BAR: 状态栏文字/图标变深色
若为深色背景，移除该 flag 即可。
```

### 4.3 Android 8.0 (Oreo, API 26)

```
1、支持 导航栏图标变色：
window.decorView.systemUiVisibility =
    View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR

2、注意：
部分厂商（如小米）仍需额外适配 MIUI flag。
```

### 4.4 Android 10 (Q, API 29)

```
1、引入 全屏手势 与 WindowInsets：
WindowCompat.setDecorFitsSystemWindows(window, false)
ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
    val statusBar = insets.getInsets(WindowInsetsCompat.Type.statusBars())
    v.setPadding(0, statusBar.top, 0, 0)
    insets
}

2、说明
推荐做法：关闭系统自动适配，用 Insets 计算安全区域。
特别适合自定义布局、全屏视频播放器。
```

### 4.5  Android 11 (R, API 30)

```
1、统一使用 WindowInsetsController 控制系统栏：
val controller = window.insetsController
controller?.hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
controller?.systemBarsBehavior =
    WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE


2、说明
新接口替代旧的 SYSTEM_UI_FLAG_IMMERSIVE_STICKY 等标志位
```

### 4.6 Android 12+ (S, API 31)

```
1、支持 动态主题 与系统自动栏色调适配：
WindowInsetsControllerCompat(window, window.decorView).isAppearanceLightStatusBars = true

2、说明
若使用 Material3，系统会自动为状态栏与导航栏上色。
```

## 五 现代推荐方式（官方最佳实践）

```
1、自 Android 11 起，推荐使用以下封装：
// 1. 让内容扩展到系统栏区域
WindowCompat.setDecorFitsSystemWindows(window, false)

// 2. 通过 WindowInsets 控制安全区域
ViewCompat.setOnApplyWindowInsetsListener(contentView) { view, insets ->
    val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
    view.setPadding(0, systemBars.top, 0, systemBars.bottom)
    insets
}

// 3. 动态切换状态栏文字颜色
WindowInsetsControllerCompat(window, window.decorView).isAppearanceLightStatusBars = true

2、优点：

-兼容 Android 10–14
-支持刘海屏与手势导航
-统一 Compose 与 View 行为
```

## 六 Compose 中的状态栏适配

```
1、代码
@Composable
fun TransparentStatusBar() {
    val window = (LocalView.current.context as Activity).window
    SideEffect {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        WindowInsetsControllerCompat(window, window.decorView)
            .isAppearanceLightStatusBars = true
        window.statusBarColor = Color.Transparent.toArgb()
    }
}

2、说明
再结合 Modifier.padding(WindowInsets.statusBars.asPaddingValues()) 处理内容偏移
```

## 七 常见问题与解决方案

|           问题           |               原因               |                           解决方案                           |
| :----------------------: | :------------------------------: | :----------------------------------------------------------: |
|     内容被状态栏遮挡     |      关闭 fitsSystemWindows      |              使用 WindowInsets 动态设置 padding              |
|        导航栏变黑        |         未设置导航栏透明         |        window.navigationBarColor = Color.TRANSPARENT         |
|       刘海屏被裁切       | 未声明 layoutInDisplayCutoutMode | window.attributes.layoutInDisplayCutoutMode = LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES |
| 全屏视频无法滑出手势返回 |        隐藏系统栏方式错误        |           使用 WindowInsetsController 而非旧 flag            |

## 八 总结建议

|           场景           |                    推荐方案                    |
| :----------------------: | :--------------------------------------------: |
|         普通页面         |             fitsSystemWindows=true             |
| 沉浸式页面（图片、视频） |  decorFitsSystemWindows=false + WindowInsets   |
|       Compose 项目       | 使用 Modifier.padding(WindowInsets.systemBars) |
|     Android 11+ 项目     |       使用 WindowInsetsControllerCompat        |
|         全屏交互         |  Hide status/navigation bars + swipe behavior  |

## 九 最佳实践组合模板

```
fun Activity.setupSystemBars() {
    WindowCompat.setDecorFitsSystemWindows(window, false)
    window.statusBarColor = Color.TRANSPARENT
    window.navigationBarColor = Color.TRANSPARENT
    WindowInsetsControllerCompat(window, window.decorView).apply {
        isAppearanceLightStatusBars = true
        isAppearanceLightNavigationBars = true
    }
}
```

