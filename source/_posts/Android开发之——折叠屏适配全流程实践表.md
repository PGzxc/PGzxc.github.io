---
title: Android开发之——折叠屏适配全流程实践表
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
  - 适配
abbrlink: f0775fe2
date: 2025-08-22 08:32:30
---
## 一 概述

```
本文介绍：
-折叠屏适配全流程实践表
-覆盖从项目配置、布局设计、代码实现到测试的完整方案
```

<!--more-->

## 二 Android 折叠屏适配全流程实践表

### 2.1 项目配置

```
1、项目配置1

-内容：允许 Activity 可调整大小
-具体操作/示例
 在 AndroidManifest.xml 中设置：
 ```xml
 <activity android:name=".MainActivity"
 android:resizeableActivity="true"
 android:configChanges="screenSize
-备注： smallestScreenSize

2、项目配置2
-内容：引入 Jetpack WindowManager
-具体操作/示例
 gradle<br>implementation "androidx.window:window:1.1.0"<br>
-备注： 用于监听 hinge 和折叠状态
```

### 2.2 布局资源

```
1、布局资源1

-内容：响应式布局
-具体操作/示例
 在 res/values 目录下添加：
 values-sw600dp / values-w720dp / values-h720dp，分别提供大屏资源
-备注： 可针对折叠展开状态使用


2、布局资源2

-内容：ConstraintLayout / Compose
-具体操作/示例
 - ConstraintLayout: 自动约束布局，适应不同屏幕
 - Compose: BoxWithConstraints 根据 maxWidth/maxHeight 切换布局
-备注： Compose 更灵活
```

### 2.3 屏幕状态监听

```
1、屏幕状态监听1

-内容：WindowInfoTracker
-具体操作/示例
kotlin<br>val tracker = WindowInfoTracker.getOrCreate(context)
tracker.windowLayoutInfo(this)
.flowWithLifecycle(lifecycle) 
.collect { layoutInfo ->
         for (feature in layoutInfo.displayFeatures) {
            if (feature is FoldingFeature) {
            	 // 判断 hinge orientation / state 
            	}
               } 
             }
-备注： 可获取 hinge 位置和折叠状态


2、屏幕状态监听2

-内容：原生方式
-具体操作/示例
kotlin<br>val metrics = windowManager.currentWindowMetrics
val width = metrics.bounds.width()
val height = metrics.bounds.height()
-备注： 用于简单尺寸判断
```

### 2.4 布局适配

```
1、布局适配

-内容：折叠小屏
-具体操作/示例
  单栏布局
  核心内容显示
-备注： 参考 maxWidth < 600dp


2、布局适配

-内容：展开大屏
-具体操作/示例
  多栏布局 (Master-Detail)
  可显示更多信息
-备注： 参考 maxWidth ≥ 600dp


3、布局适配

-内容：Hinge 分区
-具体操作/示例
  左右/上下分栏
  避免内容被 hinge 遮挡
-备注： 使用 FoldingFeature.bounds
```

### 2.5 UI设计原则

```
1、UI设计原则

-内容：触控区域
-具体操作/示例
  控件至少 48dp

-备注： 可改善折叠屏操作体验

2、UI设计原则

-内容：动态调整
-具体操作/示例
  MotionLayout 或 Compose Animation 做展开/折叠过渡

-备注： 提升体验
```

### 2.6 多任务/多窗口

```
1、多任务/多窗口

-内容：模拟器
-具体操作/示例
  Android Studio → Device Manager → Foldable Device

-备注： 可测试折叠/展开、hinge 分区

2、多任务/多窗口

-内容：实机
-具体操作/示例
  Samsung Galaxy Z Fold / Huawei Mate X / Surface Duo

-备注： 多机型测试

3、多任务/多窗口

-内容：分屏 & 多窗口
-具体操作/示例
  分屏模式下测试 Activity 生命周期

-备注： 验证多窗口下 UI、数据一致性
```

### 2.7 测试

```
-内容：支持 Multi-Resume
-具体操作/示例
  Activity resizeableActivity="true" 保证生命周期处理正确

-备注： 防止折叠屏切换时 Activity 崩溃
```

## 三 示例

### 3.1 Compose 可伸缩布局(根据 maxWidth 自动切换布局)

```
@Composable
fun FoldableApp() {
    BoxWithConstraints {
        if (maxWidth < 600.dp) {
            Column {
                Text("Compact Mode")
                Button(onClick = {}) { Text("Action") }
            }
        } else {
            Row {
                Column { Text("Master") }
                Column { Text("Detail") }
            }
        }
    }
}
```

### 3.2 示例代码 (原生 XML-小屏/大屏不同布局)

```
layout/main_activity.xml
layout-sw600dp/main_activity.xml
```

## 四 推荐实践流程

```
配置 Manifest 和 WindowManager。
准备响应式布局资源和 Compose 布局。
监听折叠屏状态及 hinge 位置。
根据屏幕尺寸和 hinge 调整布局。
实现动画或过渡效果。
测试折叠/展开、多窗口、多机型。
调整 UI 与交互，确保触控区域和可视范围。
```

