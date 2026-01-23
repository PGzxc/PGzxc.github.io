---
title: Android面试题——掘金-性能优化之布局优化(4.3)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: e5e430e5
date: 2025-04-07 10:06:06
---
## 一 概述

```
常见 Android 布局优化面试题
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 为什么要进行布局优化？

```
-减少 View 的层级和数量可以提升 UI 渲染效率，避免布局过度复杂。
-减少 Layout Pass（Measure、Layout、Draw）的耗时。
-避免 UI 卡顿（尤其是在 RecyclerView、动画、滑动中尤为明显）。
-降低内存占用、提高首帧渲染速度、加快冷启动。
```

### 2.2 如何查看布局是否存在性能问题？

```
可以使用以下工具或方法：
-Layout Inspector（Android Studio）
-Profile → Rendering → Show GPU Overdraw
-Hierarchy Viewer / Layout Bounds（开发者选项）
-Log onMeasure(), onLayout(), onDraw() 调用栈分析。
```

### 2.3 如何优化布局层级？

```
-避免深层嵌套布局，如 LinearLayout 套 LinearLayout。
-优先使用 ConstraintLayout 替代多层嵌套布局。
-合理使用 merge、include、ViewStub：
 -merge：避免中间无用布局节点。
 -include：复用通用布局。
 -ViewStub：延迟加载不常用 View（如错误页、加载中）。
```

### 2.4 LinearLayout 嵌套和 ConstraintLayout 哪个更优？

```
-ConstraintLayout 通常性能更好，能通过一个节点完成多重布局关系（等价于多个嵌套 LinearLayout）。
-但使用 LinearLayout + weights 可能会触发两次 measure，性能反而更差。
```

### 2.5 如何避免布局中的重复 measure？

```
-避免使用 android:layout_weight（会触发双测量）。
-避免使用 wrap_content 的嵌套布局（会递归测量）。
-在 RecyclerView Adapter 中复用 ViewHolder，避免多次测量。
-在自定义 View 中复用 measure 结果、使用缓存。
```

### 2.6 ViewStub 适合哪些场景？

```
ViewStub 是一种延迟加载的 View，它初始不会占用内存和绘制资源，适合用于：
-加载失败页面
-空数据页
-网络加载提示
-引导页（首次打开才出现）
示例
<ViewStub
    android:id="@+id/stub_empty"
    android:layout="@layout/view_empty"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>
调用 inflate() 时才会加载
val emptyView = stubEmpty.inflate()
```

### 2.7 如何减少过度绘制（Overdraw）？

```
-避免背景重复叠加，例如父子 View 都设置了背景。
-使用 android:background="?attr/selectableItemBackground" 替代多余颜色。
-尽量避免不必要的阴影、渐变、大图。
-检查 GPU Overdraw（开发者选项）。
```

### 2.8 如何优化 RecyclerView 中的布局？

```
-ViewHolder 复用：避免频繁创建子布局。
-使用 DiffUtil 提高 notifyDataSetChanged 性能。
-避免 item 使用复杂嵌套布局，优先使用 ConstraintLayout。
-使用 setHasFixedSize(true) 提高性能。
-滑动中避免加载大图/圆角图。
```

### 2.9  如何通过布局加速 App 启动？

```
-启动页使用静态图/极简布局，避免复杂 XML。
-首页避免嵌套 ScrollView + RecyclerView。
-避免启动页加载 WebView、Fragment、Banner 动画等。
-加载首页布局时用 ViewStub 延迟非必要区域
```

### 2.10 如何检测布局层级过深？

```
-adb shell dumpsys gfxinfo 包名 查看 View 层级。
-使用 Layout Inspector → Hierarchy 查看深度。
-打开开发者模式中的“显示布局边界”辅助分析。
```

### 2.11 布局优化 Checklist

|               优化点               |           说明           |
| :--------------------------------: | :----------------------: |
| 使用 ConstraintLayout 替代嵌套布局 |    降低层级、提高性能    |
|       避免使用 layout_weight       |     避免两次 measure     |
|       使用 ViewStub 延迟加载       |   节省内存 & 启动时间    |
|       减少嵌套 wrap_content        |       避免递归测量       |
|        使用 include + merge        | 提高复用，减少 View 节点 |
|  开启硬件加速 + 检查 GPU Overdraw  |       降低渲染压力       |
|     首页极简布局 + SplashTheme     |        冷启动提速        |


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)