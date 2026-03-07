---
title: KMP开发之——绘制性能与优化(9.4)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: 913adfde
date: 2026-03-07 08:43:21
---
## 一 概述

```
本文介绍：
 -掉帧
 -卡顿
 -电量消耗
 -Desktop/iOS 表现不一致
```

<!--more-->

## 二 Compose 绘制性能模型

### 2.1 三个阶段

```
State 改变
  ↓
Composable 重组
  ↓
Canvas 重绘
```

### 2.2 核心结论

```
Canvas 的性能瓶颈几乎都不在“绘制 API”，而在“重组 & 对象创建”
```

## 三 最常见的性能坑

### 3.1 在 Canvas 中频繁创建对象

```
1-错误方式
Canvas {
    val path = Path() // ❌ 每一帧 new
    drawPath(path, Color.Red)
}

2-正确方式
val path = remember { Path() }

Canvas {
    path.reset()
    // build path
}
```

### 3.2  动画驱动整个 Composable 重组

```
1-错误方式
val progress by animateFloatAsState(...)
Column {
    Header()
    Canvas { ... } // ❌ 整个 Column 重组
}

2-正确方式
Header()
Canvas {
    // 只让 Canvas 使用 progress
}

3-总结
缩小重组范围 = 性能提升
```

### 3.3 remember 的正确使用姿势

1-缓存计算结果

```
val points = remember(values) {
    values.map { it * 2 }
}
```

2-缓存绘制资源

```
val stroke = remember {
    Stroke(width = 4f, cap = StrokeCap.Round)
}
Stroke / Path / Brush 都适合 remember
```

### 3.4 避免“无意义重绘”

1-典型错误

```
var time by remember { mutableStateOf(System.currentTimeMillis()) }

会导致 疯狂重组
```

2-替代方案

```
LaunchedEffect
derivedStateOf
snapshotFlow

val progress by remember {
    derivedStateOf { rawProgress.coerceIn(0f, 1f) }
}
```

## 四 Canvas 与 Modifier.drawBehind 的选择

### 4.1 性能对比结论

|    场景    |    推荐    |
| :--------: | :--------: |
|   纯装饰   | drawBehind |
|  主体绘制  |   Canvas   |
| 大面积背景 | drawBehind |
|  动态图表  |   Canvas   |

### 4.2 drawBehind 更轻量

```
Modifier.drawBehind {
    drawLine(...)
}
说明：不参与布局，不影响测量
```

## 五 绘制优化

### 5.1 大数据量绘制优化(图表/波浪)

1-折线图点数控制

```
一次画 2000 个点 x
采样 / 抽稀     ✅ 

val sampled = values.chunked(5).map { it.average() }
```

2-超出区域不绘制

```
if (x in 0f..size.width) {
    drawLine(...)
}
```

### 5.2 动画性能优化原则

1-不要每个元素一个动画

```
100 个 bar = 100 个 animate x
1 个 progress 控制全部       ✅ 
```

2-控制动画帧率与时长

```
animationSpec = tween(
    durationMillis = 600,
    easing = LinearOutSlowInEasing
)
```

### 5.3 跨平台性能差异注意点

```
1-Android
-Canvas 性能最好
-Path 大量操作也 OK

2-iOS
-Path 复杂度要控制
-避免过多透明叠加

3-Desktop
-窗口缩放频繁触发重绘
-注意 resize 触发条件

结论：以 iOS 性能为下限设计
```

### 5.4 绘制组件的架构建议

1-Canvas 当“渲染层”

```
Data → State → Canvas

Canvas 内：
-不做业务判断
-不做复杂计算
```

2-把绘制逻辑函数化

```
fun DrawScope.drawGrid() { ... }
fun DrawScope.drawLineChart(...) { ... }

可维护性、可测试性大幅提升
```

## 六 小结

```
Canvas 性能 ≠ GPU 绘制
80% 性能问题来自 重组
remember 是 Canvas 的生命线
控制动画数量与范围
以 iOS 性能为设计基准
```

