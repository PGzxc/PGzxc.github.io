---
title: KMP开发之——绘制之Canvas(9.1)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
  - Canvas
abbrlink: a6ce02af
date: 2026-03-04 08:37:21
---
## 一 概述

```
本文介绍：
 - Canvas
```

<!--more-->

## 二 概念

### 2.1 与传统 View 的区别

|     体系     |         思想          |
| :----------: | :-------------------: |
| Android View |    onDraw + Canvas    |
|   Compose    | 声明式绘制 + 状态驱动 |

### 2.2 Compose 中

```
没有重写 onDraw
没有手动 invalidate
状态变化 → 自动重绘
```

## 三 KMP 中的绘制入口

### 3.1 Canvas 组件(最核心)

```
1-代码
Canvas(modifier = Modifier.size(200.dp)) {
    // drawScope
}

2-说明
-Canvas 是一个 Composable
-内部提供 DrawScope
-跨 Android / iOS / Desktop 一致
```

### 3.2 DrawScope 是什么？

```
DrawScope 提供：
1.尺寸：size
2.中心点：center
3.绘制 API：
-drawRect
-drawCircle
-drawLine
-drawArc
-drawPath
```

## 四 基础图形绘制

### 4.1 绘制矩形

```
1-代码
Canvas(modifier = Modifier.size(120.dp)) {
    drawRect(
        color = Color.Red,
        size = size
    )
}

2-说明
默认从 (0,0) 开始绘制
```

### 4.2  绘制圆形

```
Canvas(modifier = Modifier.size(120.dp)) {
    drawCircle(
        color = Color.Blue,
        radius = size.minDimension / 2
    )
}
```

### 4.3 绘制直线

```
Canvas(modifier = Modifier.size(200.dp)) {
    drawLine(
        color = Color.Black,
        start = Offset(0f, 0f),
        end = Offset(size.width, size.height),
        strokeWidth = 4f
    )
}
```

## 五 描边 vs 填充(Stroke / Fill)

### 5.1 填充(默认)

```
drawCircle(
    color = Color.Green
)
```

### 5.2 描边

```
1-代码
drawCircle(
    color = Color.Green,
    style = Stroke(width = 6f)
)

2-非常常用于：
-进度环
-边框
-图表轮廓
```

## 六 Arc(圆弧)绘制 —— 高频实战

### 6.1 基本圆弧

1-代码

```
drawArc(
    color = Color.Red,
    startAngle = 0f,
    sweepAngle = 120f,
    useCenter = false,
    style = Stroke(width = 8f)
)
```

2-参数说明：

|    参数    |         含义         |
| :--------: | :------------------: |
| startAngle | 起始角度(3 点钟方向) |
| sweepAngle |       扫描角度       |
| useCenter  |    是否闭合成扇形    |

### 6.2 环形进度条示例

```
@Composable
fun CircleProgress(progress: Float) {
    Canvas(modifier = Modifier.size(120.dp)) {
        drawArc(
            color = Color.LightGray,
            startAngle = -90f,
            sweepAngle = 360f,
            useCenter = false,
            style = Stroke(12f)
        )

        drawArc(
            color = Color.Blue,
            startAngle = -90f,
            sweepAngle = 360f * progress,
            useCenter = false,
            style = Stroke(12f)
        )
    }
}
说明：progress ∈ 0f..1f
```

## 七 Path —— 自由形状绘制

### 7.1  Path 基础

```
val path = Path().apply {
    moveTo(0f, 0f)
    lineTo(size.width, 0f)
    lineTo(size.width / 2, size.height)
    close()
}

drawPath(
    path = path,
    color = Color.Magenta
)
```

### 7.2 Path 常见用途

```
-自定义气泡
-波浪线
-折线图
-不规则背景

说明：图表几乎离不开 Path
```

## 八 绘制与 Modifier.drawBehind

### 8.1 drawBehind 的作用

```
1-给已有组件 加一层装饰绘制
Box(
    modifier = Modifier
        .size(100.dp)
        .drawBehind {
            drawCircle(
                color = Color.Red,
                radius = size.minDimension / 2
            )
        }
)
```

### 8.2 适合 drawBehind 的场景

```
背景装饰
分割线
阴影 / 边框
不影响布局的绘制
```

## 九 状态驱动绘制(Compose 精髓)

### 9.1 使用 state 控制绘制

```
var progress by remember { mutableStateOf(0.3f) }

CircleProgress(progress)
```

### 9.2 状态变化 = 自动重绘

```
不需要 invalidate
不需要手动刷新
跨端一致
```

## 十 KMP 绘制的跨端优势

|  平台   |    是否一致     |
| :-----: | :-------------: |
| Android |       可        |
|   iOS   |       可        |
| Desktop |       可        |
|   Web   | 可(Compose Web) |

说明：一次绘制逻辑，多端生效

## 十一 小结

```
Canvas 是 Compose 绘制的核心
DrawScope 提供统一绘制 API
Arc / Path 是实战高频
绘制完全由 状态驱动
KMP 中绘制是真正的“写一次，多端一致”
```

