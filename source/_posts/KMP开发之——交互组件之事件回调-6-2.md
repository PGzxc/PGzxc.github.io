---
title: KMP开发之——交互组件之事件回调(6.2)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: c7510b98
date: 2026-01-21 09:38:25
---
## 一 概述

```
本文介绍：
-如何在 KMP 中处理 Click 事件、手势(Gesture)事件
-以及如何有效管理和响应这些事件。
```

<!--more-->

## 二 Click 事件回调

### 2.1 基本的 Click 事件

```
1-在 Compose 中，点击事件的处理非常简单，直接通过 Modifier.clickable 来处理
@Composable
fun ClickableExample() {
    Box(
        modifier = Modifier
            .size(100.dp)
            .clickable(onClick = { /* 处理点击事件 */ })
            .background(Color.Cyan)
    ) {
        Text("Click Me", modifier = Modifier.align(Alignment.Center))
    }
}

2-说明
-clickable：使组件能够响应点击事件
-onClick：点击事件触发时执行的回调
```

### 2.2 禁用点击事件

```
1-如果你希望 禁用 点击事件，可以将 enabled 参数设置为 false：
@Composable
fun DisabledButton() {
    Button(
        onClick = { /* 点击事件 */ },
        enabled = false
    ) {
        Text("I am Disabled")
    }
}

2-说明
enabled：控制按钮是否可以点击，禁用状态下点击事件不触发
```

### 2.3 点击事件与状态管理

```
1-点击事件常常与状态管理结合使用，例如点击按钮后更改状态：
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
2-说明
每次点击按钮，count 状态增加，UI 会自动更新
```

## 三 Gesture 事件回调

### 3.1 GestureDetector(手势检测)

```
1-说明
对于更复杂的手势，Compose 提供了 pointerInput 和 detectTapGestures 等 API 用于处理多种手势。

2-示例：单击、长按手势
@Composable
fun GestureExample() {
    Box(
        modifier = Modifier
            .size(200.dp)
            .pointerInput(Unit) {
                detectTapGestures(
                    onPress = { /* 按压事件 */ },
                    onTap = { /* 单击事件 */ },
                    onLongPress = { /* 长按事件 */ }
                )
            }
            .background(Color.Gray)
    )
}

3-补充
detectTapGestures：可以检测多个手势，如 onTap（单击）、onLongPress（长按）等。
```

### 3.2 拖动(Drag)手势

```
1-pointerInput 和 detectDragGestures 允许我们处理拖动手势：
@Composable
fun DraggableBox() {
    var offset by remember { mutableStateOf(Offset(0f, 0f)) }

    Box(
        modifier = Modifier
            .size(100.dp)
            .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
            .pointerInput(Unit) {
                detectDragGestures { _, dragAmount ->
                    offset = Offset(offset.x + dragAmount.x, offset.y + dragAmount.y)
                }
            }
            .background(Color.Cyan)
    )
}

2-说明
detectDragGestures：用于处理拖动手势，其中 dragAmount 表示每次拖动的增量
```

### 3.3  滑动手势(Horizontal / Vertical Scroll)

```
1-Compose 中也有很强大的 滑动手势 支持，使用 Modifier.horizontalScroll 或 Modifier.verticalScroll 可以轻松实现滑动事件：

@Composable
fun HorizontalScrollExample() {
    val scrollState = rememberScrollState()

    Row(modifier = Modifier.horizontalScroll(scrollState)) {
        Text("Item 1", modifier = Modifier.padding(16.dp))
        Text("Item 2", modifier = Modifier.padding(16.dp))
        Text("Item 3", modifier = Modifier.padding(16.dp))
    }
}

2-说明
horizontalScroll：用于水平方向的滑动
verticalScroll：用于垂直方向的滑动
```

## 四 多个手势事件组合

### 4.1 说明

```
有时我们需要同时处理多个手势事件，比如 点击 + 拖动。
可以通过 pointerInput 和不同的手势识别器组合：
```

### 4.2 示例

```
@Composable
fun ClickAndDragExample() {
    var offset by remember { mutableStateOf(Offset(0f, 0f)) }
    var tapped by remember { mutableStateOf(false) }

    Box(
        modifier = Modifier
            .size(200.dp)
            .pointerInput(Unit) {
                detectTapGestures(
                    onTap = {
                        tapped = !tapped
                    }
                )
                detectDragGestures { _, dragAmount ->
                    offset = Offset(offset.x + dragAmount.x, offset.y + dragAmount.y)
                }
            }
            .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
            .background(if (tapped) Color.Green else Color.Gray)
    )
}
```

### 4.3 补充

```
detectTapGestures 和 detectDragGestures 可以同时使用，用来同时响应点击和拖动
```

## 五 手势事件的性能优化

### 5.1 使用 remember 来避免重复计算

```
在事件回调中使用 remember 来缓存手势状态，避免每次重组时重复计算：

var offset by remember { mutableStateOf(Offset(0f, 0f)) }
```

### 5.2 优化手势检测

```
避免使用过多的手势检测器，尤其是当它们覆盖较大的区域时，可能会影响性能。
只在必要时才使用手势检测，并合理拆分组件。
```

## 六 综合示例：手势与点击结合的应用

### 6.1 代码

```
@Composable
fun ClickAndSwipeApp() {
    var offset by remember { mutableStateOf(Offset(0f, 0f)) }
    var clicked by remember { mutableStateOf(false) }

    Box(
        modifier = Modifier
            .size(200.dp)
            .pointerInput(Unit) {
                detectTapGestures(
                    onTap = { clicked = !clicked },
                    onLongPress = { /* 长按事件 */ }
                )
                detectDragGestures { _, dragAmount ->
                    offset = Offset(offset.x + dragAmount.x, offset.y + dragAmount.y)
                }
            }
            .background(if (clicked) Color.Green else Color.Gray)
            .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
    )
}
```

### 6.2 说明

```
结合了 点击事件 和 拖动事件，当用户点击时会切换颜色，当用户拖动时会改变位置
```

## 七 总结

```
1.Click 事件的基本用法以及禁用操作
2.Gesture 事件回调的实现方法，包括单击、长按、拖动等
3.如何处理复杂的手势事件，如点击和拖动的组合
4.优化事件回调的性能，避免过度计算
```

