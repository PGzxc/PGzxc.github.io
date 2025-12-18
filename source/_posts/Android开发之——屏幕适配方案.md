---
title: Android开发之——屏幕适配方案
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 85a0aabb
date: 2025-12-18 09:22:50
---
## 一 概述

```
本文介绍以下内容：
 - 屏幕构成(状态栏，刘海区、安全区、导航栏、手势区等)
 - 如何适配
 - 常用三方库
 - 沉浸式
 - 折叠屏
```

<!--more-->

## 二 安卓屏幕构成(StatusBar、刘海、SafeArea、导航栏、手势区)

现代 Android 屏幕由以下系统 UI 元素组成，它们影响布局、安全区和沉浸式效果

### 2.1 状态栏(Status Bar)

```
-位于屏幕顶部，显示时间、电量、图标。
-高度通常为 24dp(随密度变化可能更高)。
-可通过沉浸式隐藏或透明化。
```

### 2.2 刘海区 / 显示切口(DisplayCutout)

1、说明

```
带“刘海、打孔、药丸”设备的非矩形区域，影响顶部安全区。

API：
-WindowInsets.getDisplayCutout()
-DisplayCutout.safeInsetTop / Bottom / Left / Right
-layoutInDisplayCutoutMode 控制内容是否延伸至刘海区
```

2、常见刘海形式

|   类别    |        示例        |
| :-------: | :----------------: |
| 长条刘海  |  小米 8、华为 P20  |
|  打孔屏   | S10 / 华为打孔机型 |
| U型小刘海 |  OPP X、Vivo 系列  |

### 2.3 安全区(Safe Area)

```
即不会被系统 UI 覆盖的区域，包括：
-顶部状态栏高度
-底部导航栏或手势条区域
-刘海区显示切口
-折叠屏铰链区域（Hinge）
-折叠屏物理分割区（如果存在）

Android 通过 WindowInsets + DisplayCutout 提供安全区信息。
```

### 2.4 导航栏(Navigation Bar)

```
-位于屏幕底部，包括：返回\Home\多任务
-在 Android 10+ 可能被手势导航区域替代。
-传统导航栏高度：48dp 左右。
```

### 2.5 手势区(Gesture Navigation Area)

```
Android 10+ 默认手势导航：
-底部：上滑返回桌面手势
-左右边缘：滑动返回手势

该区域也属于安全区的一部分，必须动态读取 Insets 进行 bottom padding 适配
```

### 2.6 系统栏(System Bars)

```
-官方统称：状态栏 + 导航栏 = System Bars
-它们都能通过 WindowInsets 控制显示隐藏。
```

### 2.7 折叠屏新增区域(Foldable-Specific)

折叠屏新增 "中缝(Hinge)" 与 "折叠态布局变化"。

2.7.1 Hinge(折叠屏铰链区域)

```
折叠时会出现无法显示内容的区域，可通过 Jetpack WindowManager 读取：
WindowInfoTracker.getOrCreate(context)
    .windowLayoutInfo(activity)
    .collect { info ->
        info.displayFeatures.filterIsInstance<FoldingFeature>().forEach { feature ->
            val hinge = feature.bounds
        }
    }
```

2.7.2 展开态与折叠态

```
不同折叠角度会影响可用范围：
-折叠态(Folded)：类似手机窄屏
-平板态(Opened)：宽屏布局
-桌面态(Half-opened)：上半屏 + 下半屏，适合视频会议/预览
```

因此折叠屏必须调节布局方案：

|     模式     |         推荐布局         |
| :----------: | :----------------------: |
| 折叠形态(窄) |         单栏布局         |
| 展开形态(宽) |       双栏 / 多栏        |
|   桌面形态   | 上下分屏 / 内容 + 控制栏 |

## 三 Android 屏幕适配方法

屏幕适配包含密度适配、尺寸适配、刘海屏适配、系统栏适配、Edge-to-Edge 等。

### 3.1 使用相对单位(dp/sp)

Android 屏幕密度不同，避免使用 px：

|   内容   | 使用单位 |
| :------: | :------: |
| 布局尺寸 |    dp    |
|   字体   |    sp    |
| 图片大小 |    dp    |

### 3.2 响应式布局(推荐)

3.2.1、 ConstraintLayout(XML-适合传统项目)

```
1、支持：
-百分比宽高
-约束链
-自适应控件

2、示例：
android:layout_width="0dp"
app:layout_constraintWidth_percent="0.5"
```

3.2.2、Jetpack Compose(现代 UI-首选)

```
1、Compose 天然支持：
-不同窗口宽度类别(compact/medium/expanded)
-Insets 适配(systemBars/ime)
-折叠屏窗口变化响应

2、示例：
Box(
    modifier = Modifier.windowInsetsPadding(WindowInsets.systemBars)
)
```

### 3.3  处理刘海/切口(Android 9+)

```
启用内容扩展：
<item name="android:layoutInDisplayCutoutMode">shortEdges</item>

获取刘海区域：
val cutout = insets.displayCutout
val safeTop = cutout?.safeInsetTop ?: 0
```

### 3.4 Edge-to-Edge 适配(Android 10～15 必备)

```
现代 Android 界面设计趋势：
内容延伸至系统栏背景下，通过 Insets 控制 padding 再避让安全区。

Step1：关闭系统默认 padding
WindowCompat.setDecorFitsSystemWindows(window, false)

Step2：动态计算安全区(通过Insets添加padding，确保UI不遮挡系统栏)
ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
    val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
    v.setPadding(0, bars.top, 0, bars.bottom)
    insets
}
```

### 3.5 大屏适配(平板/ChromeOS)

3.5.1-Google 官方窗口分类

|   类别   | 宽度区间  |       典型设备       |
| :------: | :-------: | :------------------: |
| Compact  |  < 600dp  |         手机         |
|  Medium  | 600~840dp | 大屏手机 / 竖屏平板  |
| Expanded | \> 840dp  | 平板 / Fold 展开状态 |

3.5.2-Compose

```
when (WindowWidthSizeClass.current) {
    Compact -> SingleColumn()
    Medium -> NavigationRail + SinglePane()
    Expanded -> TwoPaneUI()
}
```

### 3.6 折叠屏适配

3.6.1-折叠屏需要处理

```
1）窗口变化（WindowMetrics）
2）折叠特性（FoldingFeature）
3）铰链区域避让
4）不同模式切换不同布局
5）支持分屏 / 多窗口模式
6）折叠角度下的 UI 变化
```

3.6.2-折叠屏适配核心代码(Jetpack WindowManager)

```
检测折叠状态和 hinge 区域：
WindowInfoTracker
    .getOrCreate(context)
    .windowLayoutInfo(activity)
    .collect { info ->

        info.displayFeatures.filterIsInstance<FoldingFeature>().forEach { feature ->

            when {
                feature.state == FoldingFeature.State.HALF_OPENED -> showDualPaneUI()
                feature.state == FoldingFeature.State.FLAT -> showWideScreenUI()
            }

            val hingeBounds = feature.bounds
        }
    }
```

3.6.3-单栏→双栏切换逻辑(最常用)

|    场景    |         推荐 UI          |
| :--------: | :----------------------: |
|  手机竖屏  |      单栏内容 List       |
| 折叠屏展开 | 左导航 + 右内容(TwoPane) |
| 折叠中间态 |    上内容 / 下操作栏     |

3.6.4-避让铰链(hinge)

```
1、如果 hinge 存在：
-将左右内容拆分
-hinge 区域设置透明背景
-不可绘制 UI

2、示例(Compose)：
if (hingeBounds != null) {
    Row {
        Pane1(Modifier.weight(1f))
        Spacer(Modifier.width(hingeBounds.width().dp))
        Pane2(Modifier.weight(1f))
    }
}
```

## 四 常用三方适配库(含折叠屏)

### 4.1 常用库

|          库           |             用途              |          状态           |
| :-------------------: | :---------------------------: | :---------------------: |
|    AndroidAutoSize    |  屏幕密度适配(今日头条方案)   |          经典           |
|        sdp/ssp        |       可缩放 dp/sp 单位       |          轻量           |
|      ScreenUtils      |     导航栏、状态栏等查询      |      适用于工具类       |
|    NotchScreenTool    |          刘海屏检测           | 补充 Android P 之前机型 |
|     ImmersionBar      | 最好用的沉浸式 + 系统栏适配库 |      视频/直播强推      |
| Jetpack WindowManager |    折叠屏、高度大屏官方库     |          必用           |

### 4.2 折叠屏项目必用

```
implementation "androidx.window:window:1.2.0"
implementation "androidx.window:window-java:1.2.0"
```

## 五 沉浸式模式(Immersive Mode)

### 5.1 使用场景

```
-短视频（抖音快手）
-全屏视频播放器
-游戏/阅读
```

### 5.2 实现方案

5.2.1-Android 11+(推荐)

```
val controller = WindowInsetsControllerCompat(window, window.decorView)
controller.hide(WindowInsetsCompat.Type.systemBars())
controller.systemBarsBehavior =
    WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
```

5.2.2-Compose 版本

```
val controller = LocalWindowInsetsController.current
controller?.hide(WindowInsets.Type.systemBars())
```

### 5.3 沉浸式注意点（结合折叠屏）

```
-横屏视频要避让 DisplayCutout（刘海）
-折叠屏展开态手势区更大，需要动态 insets
-桌面模式下沉浸式可能不生效（厂商定制）
-全屏下记得提供“退出全屏”按钮
```

## 六 最终总结

|        主题         |             Android 推荐方案              |
| :-----------------: | :---------------------------------------: |
| 状态栏 / 导航栏适配 |               WindowInsets                |
|     刘海 / 打孔     | layoutInDisplayCutoutMode + DisplayCutout |
|    Edge-to-Edge     |     setDecorFitsSystemWindows(false)      |
|    屏幕尺寸适配     |    dp/sp + ConstraintLayout / Compose     |
|      大屏适配       |            sw600dp + SizeClass            |
|     折叠屏适配      |   Jetpack WindowManager（窗口 & 中缝）    |
|       沉浸式        |       WindowInsetsControllerCompat        |
|     全屏+折叠屏     |           避让 hinge + 动态布局           |

