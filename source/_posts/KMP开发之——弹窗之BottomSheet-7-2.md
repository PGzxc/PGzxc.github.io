---
title: KMP开发之——弹窗之BottomSheet(7.2)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
  - BottomSheet
abbrlink: 1ccd2037
date: 2026-02-25 09:20:01
---
## 一 概述

```
本文介绍：
 - BottomSheet
 - ModalSheet
```

<!--more-->

## 二 BottomSheet 在 KMP 中的位置

在KMP中，常见的底部弹层主要是：

|        组件         |         说明         |
| :-----------------: | :------------------: |
|  ModalBottomSheet   | 模态底部弹窗(最常用) |
| BottomSheetScaffold |    页面级底部结构    |
|    自定义 Sheet     |   手势 + 动画实现    |

## 三 ModalBottomSheet 

### 3.1 ModalBottomSheet 核心模型

1- 状态驱动(和 Dialog 一样)

```
1-代码
val sheetState = rememberModalBottomSheetState(
    skipPartiallyExpanded = false
)
var showSheet by remember { mutableStateOf(false) }

2-说明
是否显示 = 状态
```

2-基础使用示例

```
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BasicBottomSheet() {
    val sheetState = rememberModalBottomSheetState()
    var showSheet by remember { mutableStateOf(false) }

    Button(onClick = { showSheet = true }) {
        Text("Show BottomSheet")
    }

    if (showSheet) {
        ModalBottomSheet(
            onDismissRequest = { showSheet = false },
            sheetState = sheetState
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                Text("这是一个 BottomSheet", fontSize = 18.sp)
                Spacer(Modifier.height(12.dp))
                Button(
                    onClick = { showSheet = false }
                ) {
                    Text("关闭")
                }
            }
        }
    }
}
```

### 3.2 ModalBottomSheet 的核心参数

1-onDismissRequest

```
1-代码
onDismissRequest = { showSheet = false }

2-说明
-点击遮罩
-下滑关闭
-Android 返回键
```

2-sheetState(控制展开状态)

```
1-代码
val sheetState = rememberModalBottomSheetState(
    skipPartiallyExpanded = true
)

2-参数及作用
skipPartiallyExpanded：是否跳过半展开
confirmValueChange：拦截状态变化
```

## 四 BottomSheet 

### 4.1 BottomSheet 的三种高度状态

1-三种高度状态

|       状态        |  说明  |
| :---------------: | :----: |
|      Hidden       | 不显示 |
| PartiallyExpanded |  半屏  |
|     Expanded      |  全屏  |

2-示例：只允许全屏 / 关闭

```
val sheetState = rememberModalBottomSheetState(
    skipPartiallyExpanded = true
)
说明：常用于：操作面板、表单
```

### 4.2 BottomSheet 内容设计规范

1-推荐结构

```
Column {
    DragHandle()
    Title
    Content
    ActionButtons
}
```

2-拖拽指示条(UX 细节)

```
@Composable
fun DragHandle() {
    Box(
        modifier = Modifier
            .padding(vertical = 8.dp)
            .size(width = 32.dp, height = 4.dp)
            .background(Color.LightGray, RoundedCornerShape(2.dp))
            .align(Alignment.CenterHorizontally)
    )
}
```

### 4.3 实战

1-实战 1：操作列表 BottomSheet

```
@Composable
fun ActionSheet(
    onEdit: () -> Unit,
    onDelete: () -> Unit,
    onCancel: () -> Unit
) {
    Column(Modifier.fillMaxWidth()) {
        Text(
            "操作",
            modifier = Modifier.padding(16.dp),
            fontWeight = FontWeight.Bold
        )

        Divider()

        ListItem(
            headlineContent = { Text("编辑") },
            modifier = Modifier.clickable(onClick = onEdit)
        )

        ListItem(
            headlineContent = { Text("删除") },
            modifier = Modifier.clickable(onClick = onDelete)
        )

        Spacer(Modifier.height(8.dp))

        TextButton(
            modifier = Modifier.fillMaxWidth(),
            onClick = onCancel
        ) {
            Text("取消")
        }
    }
}
```

2-实战 2：选择器 BottomSheet

```
@Composable
fun SelectSheet(
    items: List<String>,
    onSelect: (String) -> Unit
) {
    LazyColumn {
        items(items) { item ->
            ListItem(
                headlineContent = { Text(item) },
                modifier = Modifier.clickable {
                    onSelect(item)
                }
            )
        }
    }
}
```

### 4.4 BottomSheet 与状态管理

1-错误做法

```
ModalBottomSheet {
    var state by remember { ... } // ❌
}
```

2-正确做法(状态上提)

```
var selected by remember { mutableStateOf<String?>(null) }

if (showSheet) {
    ModalBottomSheet {
        SelectSheet(
            items = list,
            onSelect = {
                selected = it
                showSheet = false
            }
        )
    }
}
```

## 五 补充

### 5.1 BottomSheet 与 Dialog 的选择指南

|     场景      |    推荐     |
| :-----------: | :---------: |
| 强提示 / 确认 |   Dialog    |
|   操作集合    | BottomSheet |
|     表单      | BottomSheet |
|    选择器     | BottomSheet |
|   阻断用户    |   Dialog    |

### 5.2 跨平台差异说明

|  平台   |         行为         |
| :-----: | :------------------: |
| Android |     支持手势下滑     |
|   iOS   | 行为接近 ActionSheet |
| Desktop |       更像浮层       |

说明： Compose 已帮你 **统一行为模型**

### 5.3 项目级封装建议

1-弹窗统一入口

```
sealed class SheetState {
    object None : SheetState()
    object Action : SheetState()
    data class Select(val items: List<String>) : SheetState()
}
```

2-统一渲染

```
when (sheetState) {
    is SheetState.Action -> ActionSheet(...)
    is SheetState.Select -> SelectSheet(...)
    else -> {}
}
```

说明：避免多 Sheet 冲突

## 六 小结

```
1.ModalBottomSheet 的状态模型
2.高度控制与交互行为
3.常见操作面板 / 选择器实现
4.BottomSheet 与 Dialog 的使用边界
5.项目级封装思路
```

