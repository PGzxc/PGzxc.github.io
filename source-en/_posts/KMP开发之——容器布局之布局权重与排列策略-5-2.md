---
title: KMP开发之——容器布局之布局权重与排列策略(5.2)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: f0aeff19
date: 2026-01-19 08:39:42
---
## 一 概述

```
本文介绍：
 -布局权重与排列策略
 -空间怎么分
```

<!--more-->

## 二 为什么需要权重与排列策略

### 2.1 页面布局常见需求

```
-左右两栏，左边自适应，右边固定
-多个按钮平均分布
-内容居中，但整体靠底
-列表项头尾对齐，中间自适应
```

### 2.2 这些全部靠

```
weight + Arrangement + Alignment
```

## 三 权重与排列策略

### 3.1 weight：空间分配的核心

1- weight 是什么？

Modifier.weight() 用于 在主轴方向分配剩余空间

|  布局  | 主轴 |
| :----: | :--: |
|  Row   | 水平 |
| Column | 垂直 |

2- 基础示例

```
Row(modifier = Modifier.fillMaxWidth()) {
    Box(
        modifier = Modifier
            .weight(1f)
            .height(40.dp)
            .background(Color.Red)
    )

    Box(
        modifier = Modifier
            .weight(2f)
            .height(40.dp)
            .background(Color.Blue)
    )
}
说明：红 : 蓝 = 1 : 2
```

3-weight 的计算规则(重点)

```
1.先测量 非 weight 子项
2.剩余空间按权重比例分配
3.weight 只在主轴生效
```

4-常见误区

```
1-没有 fillMaxWidth / fillMaxHeight
Row {
    Box(Modifier.weight(1f))
    Box(Modifier.weight(1f))
}
Row 没空间，weight 无效

2-正确写法
Row(Modifier.fillMaxWidth())
```

5-weight + 固定尺寸组合（实战）

```
1-左自适应 + 右固定
Row(Modifier.fillMaxWidth()) {
    Text(
        "Title",
        modifier = Modifier.weight(1f)
    )
    Icon(Icons.Default.MoreVert, null)
}

2-底部按钮平均分
Row(Modifier.fillMaxWidth()) {
    Button(
        modifier = Modifier.weight(1f),
        onClick = { }
    ) { Text("Cancel") }

    Spacer(Modifier.width(8.dp))

    Button(
        modifier = Modifier.weight(1f),
        onClick = { }
    ) { Text("Confirm") }
}
```

### 3.2 Arrangement：主轴排列策略

1-Arrangement 的作用

```
决定子项在主轴方向上的分布方式
```

2-常用 Arrangement 类型

|     类型     | 说明 |
| :----------: | :--: |
| Start / Top  | 起始 |
|    Center    | 居中 |
| End / Bottom | 结束 |
| SpaceBetween | 两端 |
| SpaceAround  | 环绕 |
| SpaceEvenly  | 均分 |

3-示例对比

```
Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceBetween
) {
    Text("Left")
    Text("Right")
}
```

4-weight vs SpaceEvenly

|    场景    |    推荐     |
| :--------: | :---------: |
| 内容自适应 |   weight    |
|  内容等宽  | SpaceEvenly |

### 5.3 Alignment：交叉轴对齐

1-Row 的交叉轴

```
Row(
    verticalAlignment = Alignment.CenterVertically
)
```

2-Column 的交叉轴

```
Column(
    horizontalAlignment = Alignment.CenterHorizontally
)
```

3-Box 的 Alignment

```
Box(
    contentAlignment = Alignment.BottomCenter
)
```

## 六 示例

### 6.1 组合使用示例—顶部标题 + 右侧操作

```
Row(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    Text(
        "Page Title",
        modifier = Modifier.weight(1f),
        fontSize = 18.sp,
        fontWeight = FontWeight.Bold
    )

    Icon(Icons.Default.Search, null)
}
```

### 6.2 Column 中的 weight—底部固定按钮

```
Column(Modifier.fillMaxSize()) {

    Content(
        modifier = Modifier.weight(1f)
    )

    Button(
        modifier = Modifier.fillMaxWidth(),
        onClick = { }
    ) {
        Text("Submit")
    }
}
说明：内容区撑满，按钮固定底部
```

## 七 权重与排列策略设计规范

### 7.1 推荐做法

```
1.主轴分配 → weight
2.整体分布 → Arrangement
3.细节对齐 → Alignment
```

### 7.2 不推荐

```
1.weight + SpaceEvenly 混用
2.滥用固定尺寸
3.在 Box 里使用 weight（无效）
```

### 7.3 Flutter / Android 对照理解

|   Compose   |       Flutter       |
| :---------: | :-----------------: |
|   weight    | Expanded / Flexible |
| Arrangement |  MainAxisAlignment  |
|  Alignment  | CrossAxisAlignment  |

## 八 小结

```
1.weight 的原理与计算规则
2.Row / Column 中的权重使用方式
3.Arrangement 的排列策略选择
4.Alignment 的交叉轴对齐
5.常见实战布局模式
```

