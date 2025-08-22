---
title: Android开发之——折叠屏适配
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
  - 适配
abbrlink: cd2a267
date: 2025-08-22 08:31:38
---
## 一 概述

```
本文介绍：Android 折叠屏适配
 -包括设计、开发和测试方面的要点
 -折叠屏 Android 设备(如 Samsung Galaxy Z Fold 系列、Huawei Mate X 系列等)
 -在应用适配上主要涉及 多窗口、屏幕展开/折叠、屏幕尺寸和比例变化
```

<!--more-->

## 二 理解折叠屏特性

折叠屏设备主要有三种形态

### 2.1 折叠状态(Compact Mode)

```
屏幕小，类似普通手机
应用需保证 UI 在小屏下可用
```

### 2.2 展开状态(Expanded Mode)

```
屏幕大，类似平板
应用可以展示更多内容或多栏布局
```

### 2.3 多任务/多窗口模式

```
部分折叠屏支持同时运行两个应用（Multi-Resume/Spanning）
```

## 三 适配策略

### 3.1 响应式布局

```
使用 ConstraintLayout / FlexboxLayout / Jetpack Compose 动态调整布局
利用 res/values-sw<N>dp 或 res/values-w<N>dp 提供不同屏幕宽度下的资源
对 Compose：可用 BoxWithConstraints 根据屏幕宽度调整 UI
```

### 3.2 支持屏幕展开/折叠事件

```
1、Android 10+ 提供 WindowManager Jetpack 库

2、可监听折叠屏状态：
val windowManager = context.getSystemService(WindowManager::class.java) as WindowManager
val metrics = windowManager.currentWindowMetrics
val windowBounds = metrics.bounds
val width = windowBounds.width()
val height = windowBounds.height()

3、或使用 Jetpack WindowInfoTracker
val tracker = WindowInfoTracker.getOrCreate(context)
tracker.windowLayoutInfo(this)
    .flowWithLifecycle(lifecycle)
    .collect { layoutInfo ->
        // 判断 hinge 或屏幕分区，调整布局
    }
```

### 3.3 支持 Multi-Resume / Spanning

```
1、Android 10+ 支持多个前台活动（Activity）

2、在 Manifest 中：
<activity
    android:name=".MainActivity"
    android:resizeableActivity="true"
    android:configChanges="screenSize|smallestScreenSize|screenLayout|orientation"/>

3、注意不要在 Activity 内部依赖单屏逻辑
```

### 3.4 分屏与 hinge 处理

```
1、折叠屏中间可能有铰链（Hinge）

2、可以通过 WindowLayoutInfo.displayFeatures 获取 hinge 信息
for (feature in layoutInfo.displayFeatures) {
    if (feature is FoldingFeature) {
        val state = feature.state  // FLAT, HALF_OPENED
        val orientation = feature.orientation // HORIZONTAL / VERTICAL
    }
}
3、根据 hinge 位置调整布局，比如左右分栏或上下分栏
```

## 四 UI设计建议

```
使用可伸缩布局：尽量用 ConstraintLayout 或 Compose 自适应布局
多栏模式：大屏展开时展示 Master-Detail 或双列
内容优先级：折叠状态只显示核心内容
可交互元素大小：保持触控区域 ≥ 48dp
动画过渡：展开/折叠状态可用 MotionLayout 或 Compose Animation
```

## 五 测试与工具

```
1、官方模拟器：Android Studio 提供折叠屏模拟器
2、实机测试：Samsung、Huawei、Microsoft Surface Duo
3、WindowManager Jetpack 工具：
 WindowInfoTracker + FoldingFeature 可模拟 hinge 与折叠状态

4、多屏/多任务测试：
 使用分屏或多窗口模式，确保 Activity 生命周期正确
```

## 六 代码示例(Compose 可伸缩布局)

```
@Composable
fun FoldableApp() {
    BoxWithConstraints {
        if (maxWidth < 600.dp) {
            // 折叠小屏布局
            Column {
                Text("Compact Mode")
                Button(onClick = {}) { Text("Action") }
            }
        } else {
            // 展开大屏布局
            Row {
                Column { Text("Master") }
                Column { Text("Detail") }
            }
        }
    }
}
```

## 七 参考资料

* [Android官方折叠屏指南](https://developer.android.com/guide/topics/large-screens/foldables)
* [Jetpack WindowManager库](https://developer.android.com/jetpack/androidx/releases/window)
* [Surface Duo适配指南](https://learn.microsoft.com/en-us/surface-duo/develop/)