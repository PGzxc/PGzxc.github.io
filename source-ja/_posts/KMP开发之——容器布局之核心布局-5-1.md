---
title: KMP开发之——容器布局之核心布局(5.1)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: 4a6968ce
date: 2026-01-18 08:33:40
---
## 一 概述

```
在KMP中，主要的页面结构都由以下三个核心布局完成：
Row/Column/Box
```

<!--more-->

## 二 Compose 布局模型总览

### 2.1 Compose 的布局本质

```
1、Compose 布局遵循一个统一流程：
测量(Measure) → 布局(Layout) → 绘制(Draw)

2、说明
-父布局给子布局 约束
-子布局在约束内 决定尺寸
-父布局 决定位置

3、总结：
这是理解 weight / fill / wrap 的关键
```

### 2.2 与 Flutter / Web 的类比

| Compose  |   Flutter   |     Web     |
| :------: | :---------: | :---------: |
|   Row    |     Row     |  flex-row   |
|  Column  |   Column    | flex-column |
|   Box    |    Stack    |  position   |
| Modifier | Widget 属性 |     CSS     |

## 三 布局

### 3.1 Column：垂直布局(最常用)

1-基础用法

```
Column {
    Text("Title")
    Text("Content")
}
```

2-主轴与交叉轴

```
1、说明
主轴：垂直（Vertical）
交叉轴：水平（Horizontal

2、代码
Column(
    verticalArrangement = Arrangement.Center,
    horizontalAlignment = Alignment.CenterHorizontally
) {
    Text("A")
    Text("B")
}
```

3-常用 Arrangement

| Arrangement  |    作用    |
| :----------: | :--------: |
|     Top      | 顶部(默认) |
|    Center    |    居中    |
|    Bottom    |    底部    |
| SpaceBetween |  两端对齐  |
| SpaceAround  |    环绕    |
| SpaceEvenly  |    均分    |

### 3.2 Row：水平布局

1、基础用法

```
Row {
    Text("Left")
    Text("Right")
}
```

2、对齐方式

```
Row(
    horizontalArrangement = Arrangement.SpaceBetween,
    verticalAlignment = Alignment.CenterVertically
) {
    Text("A")
    Text("B")
}
```

3、weight(核心重点)

```
Row(modifier = Modifier.fillMaxWidth()) {
    Text(
        "Left",
        modifier = Modifier.weight(1f)
    )
    Text("Right")
}
类似 Flutter 的 Expanded
```

### 3.3 Box：叠加布局(Stack)

1-基础用法

```
Box {
    Image(...)
    Text("Overlay")
}
```

2-子项对齐

```
Box(contentAlignment = Alignment.Center) {
    Image(...)
    Text("Center")
}
```

3-子项单独对齐

```
Box {
    Text(
        "Bottom",
        modifier = Modifier.align(Alignment.BottomCenter)
    )
}
```

## 四 注意事项

### 4.1 尺寸控制与布局关系

1-fill vs wrap

```
Modifier.fillMaxWidth()
Modifier.wrapContentHeight()

说明
-fill：占满父布局给的空间
-wrap：按内容大小
```

2-子布局影响父布局？

```
不会
Compose 是 自上而下约束
```

### 4.2 Spacer：布局中的“空白元素”

```
Spacer(modifier = Modifier.height(16.dp))
Spacer(modifier = Modifier.weight(1f))
比写 padding 更语义化
```

## 五 嵌套布局示例(实战)

```
@Composable
fun UserCard() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Image(
            painter = painterResource("avatar.png"),
            contentDescription = null,
            modifier = Modifier
                .size(48.dp)
                .clip(CircleShape)
        )

        Spacer(Modifier.width(12.dp))

        Column(
            modifier = Modifier.weight(1f)
        ) {
            Text("Username", fontWeight = FontWeight.Bold)
            Text("Description", fontSize = 12.sp)
        }

        Icon(Icons.Default.ArrowForward, null)
    }
}
```

## 六 KMP 场景下的布局注意事项

### 6.1 跨端一致性

```
1-Row / Column / Box 行为在：
-Android
-Desktop
-iOS（Compose）

2-完全一致
```

### 6.2 屏幕尺寸差异

```
1-多用：
-weight
-fillMaxWidth
-Arrangement.SpaceBetween

2-少用绝对尺寸
```

## 七 核心布局使用规范总结

### 7.1 推荐组合模式

```
页面 = Column
区域 = Row / Box
内容 = 基础组
```

### 7.2 不推荐

```
过深嵌套（> 5 层）
Column + Column 滥用
Row 里塞复杂业务
```

## 八 小结

```
Compose 布局模型原理
Column / Row / Box 的核心用法
主轴 / 交叉轴对齐方式
weight / Spacer 的正确使用
跨端布局的实践经验
```

