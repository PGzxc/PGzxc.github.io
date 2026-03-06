---
title: KMP开发之——自定义进度条与图表实战(9.2)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
  - 进度条
  - 图表
abbrlink: 26efc472
date: 2026-03-05 10:40:53
---
## 一 概述

```
本文介绍：
 - 用 Canvas + Path + 状态 实现 进度条/折线图/柱状图
```

<!--more-->

## 二 为什么要自定义绘制？

```
1-虽然 Compose 自带：
-LinearProgressIndicator
-CircularProgressIndicator

2-但在真实项目中经常需要：
-非标准样式
-品牌定制
-图表可视化
-跨端一致 UI
```

## 三 实战

### 3.1 自定义线性进度条(Linear)

1-设计目标

```
-高度可控
-圆角
-颜色可定制
-跨平台一致
```

2-基础实现

```
@Composable
fun CustomLinearProgress(
    progress: Float,
    modifier: Modifier = Modifier,
    backgroundColor: Color = Color.LightGray,
    progressColor: Color = Color.Blue
) {
    Canvas(
        modifier = modifier
            .height(8.dp)
            .fillMaxWidth()
    ) {
        val width = size.width
        val height = size.height

        // 背景
        drawRoundRect(
            color = backgroundColor,
            size = size,
            cornerRadius = CornerRadius(height / 2)
        )

        // 进度
        drawRoundRect(
            color = progressColor,
            size = Size(width * progress, height),
            cornerRadius = CornerRadius(height / 2)
        )
    }
}
```

3-使用方式

```
CustomLinearProgress(
    progress = 0.6f,
    modifier = Modifier.padding(horizontal = 16.dp)
)
```

### 3.2 自定义圆形进度条(升级版)

1-需求点

```
起点在顶部
圆角端点
可控制粗细
```

2-实战实现

```
@Composable
fun RingProgress(
    progress: Float,
    strokeWidth: Float = 12f
) {
    Canvas(modifier = Modifier.size(120.dp)) {

        val radius = size.minDimension / 2
        val stroke = Stroke(
            width = strokeWidth,
            cap = StrokeCap.Round
        )

        drawCircle(
            color = Color.LightGray,
            radius = radius,
            style = stroke
        )

        drawArc(
            color = Color.Green,
            startAngle = -90f,
            sweepAngle = 360f * progress,
            useCenter = false,
            style = stroke
        )
    }
}
```

### 3.3 折线图(Line Chart)

1-数据模型

```
val data = listOf(10, 30, 20, 50, 40)
```

2-折线绘制核心

```
@Composable
fun LineChart(
    values: List<Int>,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier) {

        val maxValue = values.maxOrNull() ?: 0
        val stepX = size.width / (values.size - 1)

        val path = Path()

        values.forEachIndexed { index, value ->
            val x = stepX * index
            val y = size.height * (1 - value / maxValue.toFloat())

            if (index == 0) {
                path.moveTo(x, y)
            } else {
                path.lineTo(x, y)
            }
        }

        drawPath(
            path = path,
            color = Color.Blue,
            style = Stroke(width = 4f)
        )
    }
}
```

3-使用示例

```
LineChart(
    values = listOf(10, 30, 20, 50, 40),
    modifier = Modifier
        .fillMaxWidth()
        .height(200.dp)
```

### 3.4 柱状图(Bar Chart)

1-实现思路

```
计算每个柱子的宽度
按比例绘制高度
```

2-实战代码

```
@Composable
fun BarChart(
    values: List<Int>,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier) {

        val maxValue = values.maxOrNull() ?: 1
        val barWidth = size.width / (values.size * 1.5f)

        values.forEachIndexed { index, value ->

            val barHeight = size.height * (value / maxValue.toFloat())
            val left = index * barWidth * 1.5f

            drawRoundRect(
                color = Color.Cyan,
                topLeft = Offset(left, size.height - barHeight),
                size = Size(barWidth, barHeight),
                cornerRadius = CornerRadius(8f)
            )
        }
    }
}
```

## 四 绘制 + 状态驱动

### 4.1 动态数据

```
var progress by remember { mutableStateOf(0.2f) }
```

### 4.2 自动重绘

```
RingProgress(progress)

只要 progress 变化：
-Canvas 自动重绘
-无需手动刷新
```

### 4.3 KMP 中绘制的最佳实践

```
所有尺寸用 size 计算
不写死像素坐标
数据 → UI → Canvas
把绘制当“纯函数”
```

## 五 小结

```
Canvas 是自定义 UI 的核心
进度条 / 图表是最典型实战
Path 是图表的灵魂
状态驱动绘制是 Compose 精髓
KMP 真正做到了绘制层跨端一致
```

