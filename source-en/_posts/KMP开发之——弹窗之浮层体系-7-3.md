---
title: KMP开发之——弹窗之浮层体系(7.3)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
  - 弹窗
  - 浮层
abbrlink: da7bed5c
date: 2026-02-27 21:05:57
---
## 一 概述

```
本文介绍：
-Dialog/BottomSheet：阻断式
-Popup/DropdownMenu：非阻断、上下文相关
```

<!--more-->

## 二 KMP 中的浮层家族

### 2.1 列表

|     组件      |   作用   |    特点    |
| :-----------: | :------: | :--------: |
|     Popup     | 基础浮层 | 完全自定义 |
| DropdownMenu  | 下拉菜单 | 封装 Popup |
| Tooltip(实验) | 提示气泡 |   轻交互   |
|  自定义浮层   | 高级定位 |  精准控制  |

### 2.2 本文重点

```
Popup + DropdownMenu
```

## 三 Popup：最底层的浮层能力

### 3.1 Popup 的本质

```
1-说明
-脱离父布局树
-独立 Z 层级
-默认 不阻断页面

2-示例
Popup(alignment = Alignment.TopEnd) {
    Text("I am Popup")
}
```

### 3.2 基础 Popup 示例

```
@Composable
fun SimplePopup() {
    var show by remember { mutableStateOf(false) }

    Box {
        Button(onClick = { show = true }) {
            Text("Show Popup")
        }

        if (show) {
            Popup(
                onDismissRequest = { show = false }
            ) {
                Box(
                    modifier = Modifier
                        .background(Color.White)
                        .border(1.dp, Color.Gray)
                        .padding(12.dp)
                ) {
                    Text("这是一个 Popup")
                }
            }
        }
    }
}
```

### 3.3 Popup 关键参数

|       参数       |      说明       |
| :--------------: | :-------------: |
|    alignment     |  相对窗口对齐   |
|      offset      |      位移       |
| onDismissRequest |  点击外部关闭   |
|    properties    | 焦点 / 事件控制 |

### 3.4 PopupProperties(高级)

1-控制焦点与点击穿透

```
Popup(
    properties = PopupProperties(
        focusable = true
    )
)
```

2-列表

|         属性          |     作用     |
| :-------------------: | :----------: |
|       focusable       | 是否获取焦点 |
|  dismissOnBackPress   | Android 返回 |
| dismissOnClickOutside |   点击外部   |

说明：focusable = true ≈ 半 Dialog

## 四 DropdownMenu：最常用浮层组件

DropdownMenu = Popup + 定位 + 列表封装

### 4.1 基础 DropdownMenu

```
@Composable
fun SimpleDropdownMenu() {
    var expanded by remember { mutableStateOf(false) }

    Box {
        IconButton(onClick = { expanded = true }) {
            Icon(Icons.Default.MoreVert, null)
        }

        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            DropdownMenuItem(
                text = { Text("编辑") },
                onClick = { expanded = false }
            )
            DropdownMenuItem(
                text = { Text("删除") },
                onClick = { expanded = false }
            )
        }
    }
}
```

### 4.2 DropdownMenu 的核心参数

|          参数          |   说明   |
| :--------------------: | :------: |
|        expanded        | 是否显示 |
|    onDismissRequest    | 外部点击 |
|         offset         |   位移   |
| shape / tonalElevation |   样式   |

### 4.3 DropdownMenu 的正确使用姿势

1-必须包在锚点容器里

```
Box {
    Anchor()
    DropdownMenu(...)
}
说明：否则定位会异常
```

2-常见业务场景

```
列表项「更多」操作
Toolbar 菜单
筛选条件选择
```

### 4.4 Popup vs DropdownMenu 对比

|  对比点  | Popup  | DropdownMenu |
| :------: | :----: | :----------: |
|   定位   |  手动  |     自动     |
|   样式   | 自定义 |   Material   |
|   列表   | 自己写 |     内置     |
| 使用成本 |   高   |      低      |

## 五 示例

### 5.1 实战 1：列表项操作浮层(高频)

```
@Composable
fun ListItemMenu(
    onEdit: () -> Unit,
    onDelete: () -> Unit
) {
    var expanded by remember { mutableStateOf(false) }

    Box {
        Icon(
            Icons.Default.MoreVert,
            contentDescription = null,
            modifier = Modifier
                .clickable { expanded = true }
        )

        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            DropdownMenuItem(
                text = { Text("编辑") },
                onClick = {
                    expanded = false
                    onEdit()
                }
            )
            DropdownMenuItem(
                text = { Text("删除") },
                onClick = {
                    expanded = false
                    onDelete()
                }
            )
        }
    }
}
```

### 5.2 自定义 Popup 定位(进阶)

1-基于 offset 的精准定位

```
Popup(offset = IntOffset(0, 50)) {
    Card {
        Text("Tooltip")
    }
}
```

2-Tooltip 气泡示例

```
@Composable
fun Tooltip(text: String) {
    Popup {
        Box(
            modifier = Modifier
                .background(Color.Black, RoundedCornerShape(6.dp))
                .padding(8.dp)
        ) {
            Text(text, color = Color.White)
        }
    }
}
```

## 六 补充

### 6.1 浮层体系常见坑

1- Popup 当 Dialog 用

```
没遮罩
事件穿透
易误触
```

2-DropdownMenu 乱嵌套

```
多个 expanded 状态
列表复用错乱
用 单一状态源
```

3-浮层状态写在 Item 内

```
状态上提
index / id 绑定
```

### 6.2 与 Flutter / Android 对照

|   Compose    |     Flutter     |   Android   |
| :----------: | :-------------: | :---------: |
|    Popup     |     Overlay     | PopupWindow |
| DropdownMenu | PopupMenuButton |  PopupMenu  |

### 6.3 浮层体系选型指南

|   场景   |     推荐     |
| :------: | :----------: |
| 操作菜单 | DropdownMenu |
| Tooltip  |    Popup     |
|  轻提示  |    Popup     |
| 阻断交互 |    Dialog    |
| 半屏操作 | BottomSheet  |

