---
title: KMP开发之——绘制+动画(9.3)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: '9197048'
date: 2026-03-06 11:40:48
---
## 一 概述

```
本文介绍：
 - 进度动画
 - 图表动画
 - 无限动画
 - 状态 + 动画 + 绘制的组合方式
```

<!--more-->

## 二 Compose 中动画的本质

### 2.1 动画不是在 Canvas 里写循环

```
1-错误认知(传统思维)
for 循环 + Thread.sleep + invalidate

2-Compose 正确模型
状态变化 + AnimationState → 自动重绘 Canvas
```

### 2.2 Canvas 动画 = 状态动画

```
State → Animation → Canvas
Canvas 只是 消费动画后的状态
```

## 三 实战

### 3.1 最简单的绘制动画：animateFloatAsState

1-圆环进度动画

```
@Composable
fun AnimatedRingProgress(
    targetProgress: Float
) {
    val progress by animateFloatAsState(
        targetValue = targetProgress,
        animationSpec = tween(
            durationMillis = 800,
            easing = FastOutSlowInEasing
        )
    )

    RingProgress(progress)
}
```

2-使用示例

```
var progress by remember { mutableStateOf(0.2f) }

AnimatedRingProgress(progress)
```

### 3.2 无限动画：rememberInfiniteTransition

1-无限波纹 / 加载动画

```
@Composable
fun InfiniteProgress() {

    val infiniteTransition = rememberInfiniteTransition()

    val progress by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(1000, easing = LinearEasing)
        )
    )

    RingProgress(progress)
}
```

2-常用于：

```
Loading
Shimmer
波浪动画
```

### 3.3 折线图动画(Line Chart Animation)

1- 思路拆解

```
先画“完整路径”
用 progress 控制绘制长度
```

2-PathMeasure 动画绘制

```
@Composable
fun AnimatedLineChart(
    values: List<Int>,
    modifier: Modifier = Modifier
) {
    val progress by animateFloatAsState(
        targetValue = 1f,
        animationSpec = tween(1000)
    )

    Canvas(modifier = modifier) {

        val maxValue = values.maxOrNull() ?: 1
        val stepX = size.width / (values.size - 1)

        val fullPath = Path()

        values.forEachIndexed { index, value ->
            val x = stepX * index
            val y = size.height * (1 - value / maxValue.toFloat())

            if (index == 0) fullPath.moveTo(x, y)
            else fullPath.lineTo(x, y)
        }

        val pathMeasure = PathMeasure()
        pathMeasure.setPath(fullPath, false)

        val animatedPath = Path()
        pathMeasure.getSegment(
            0f,
            pathMeasure.length * progress,
            animatedPath
        )

        drawPath(
            path = animatedPath,
            color = Color.Blue,
            style = Stroke(4f)
        )
    }
}
```

### 3.4 柱状图动画(Bar Chart)

1-动画每个柱子的高度

```
@Composable
fun AnimatedBarChart(
    values: List<Int>,
    modifier: Modifier = Modifier
) {
    val animatedProgress by animateFloatAsState(
        targetValue = 1f,
        animationSpec = tween(800)
    )

    Canvas(modifier = modifier) {

        val maxValue = values.maxOrNull() ?: 1
        val barWidth = size.width / (values.size * 1.5f)

        values.forEachIndexed { index, value ->
            val height = size.height *
                (value / maxValue.toFloat()) *
                animatedProgress

            val left = index * barWidth * 1.5f

            drawRoundRect(
                color = Color.Green,
                topLeft = Offset(left, size.height - height),
                size = Size(barWidth, height),
                cornerRadius = CornerRadius(8f)
            )
        }
    }
}
```

## 四 绘制 + 手势 + 动画(进阶组合)

### 4.1 拖动控制进度

```
@Composable
fun DragProgressRing() {

    var progress by remember { mutableStateOf(0.3f) }

    Box(
        modifier = Modifier
            .size(150.dp)
            .pointerInput(Unit) {
                detectDragGestures { change, drag ->
                    progress = (progress + drag.x / 500).coerceIn(0f, 1f)
                }
            }
    ) {
        AnimatedRingProgress(progress)
    }
}
```

### 4.2 说明

```
Canvas + Gesture + Animation = 高级交互组件
```

### 4.3 性能注意事项(动画 + Canvas)

```
1-不推荐
-每一帧创建大量对象
-Path / Paint 在循环中 new
-无限动画过多

2-推荐
-Path 尽量复用
-动画只控制关键状态
-合理限制动画区域
```

## 五 小结

```
Canvas 动画 = 状态动画
animate*AsState 是最常用方案
InfiniteTransition 用于持续动画
PathMeasure 是图表动画核心
绘制 + 动画 + 手势是 Compose 的王炸组合
```

