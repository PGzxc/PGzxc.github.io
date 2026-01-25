---
title: KMP开发之——弹窗之Dialog(7.1)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: c13e21b0
date: 2026-01-26 07:01:18
---
## 一 概述

```
本文介绍：
 - Dialog/AlertDialog
 -自定义Dialog
```

<!--more-->

## 二 弹窗体系概览

### 2.1 常见弹窗分为三大类：

|   类型   |         组件         |     使用场景      |
| :------: | :------------------: | :---------------: |
|  对话框  | Dialog / AlertDialog | 提示、确认、警告  |
|   浮层   |        Popup         | 下拉菜单、Tooltip |
| 底部弹层 |   ModalBottomSheet   | 操作面板、选择器  |

本文只讲 Dialog / AlertDialog

### 2.2 弹窗的设计核心：状态驱动

1-错误做法(命令式思维)

```
点按钮 → showDialog()
Compose 中 没有 show / dismiss API
```

2-正确做法(声明式)

```
弹窗是否显示 = 状态
var showDialog by remember { mutableStateOf(false) }
```

## 三 AlertDialog：最常用的弹窗

### 3.1 基础 AlertDialog 示例

```
@Composable
fun SimpleAlertDialog() {
    var showDialog by remember { mutableStateOf(false) }

    Button(onClick = { showDialog = true }) {
        Text("Show Dialog")
    }

    if (showDialog) {
        AlertDialog(
            onDismissRequest = { showDialog = false },
            title = { Text("提示") },
            text = { Text("确定要删除吗？") },
            confirmButton = {
                TextButton(onClick = {
                    showDialog = false
                }) {
                    Text("确定")
                }
            },
            dismissButton = {
                TextButton(onClick = {
                    showDialog = false
                }) {
                    Text("取消")
                }
            }
        )
    }
}
```

### 3.2  AlertDialog 结构解析

|       参数       |       作用        |
| :--------------: | :---------------: |
| onDismissRequest | 点击遮罩 / 返回键 |
|      title       |       标题        |
|       text       |       内容        |
|  confirmButton   |     确认按钮      |
|  dismissButton   |     取消按钮      |

说明：是否显示 = if (showDialog)

## 四 Dialog：完全自定义弹窗

当 AlertDialog 不够用时，使用 `Dialog`

### 4.1 自定义布局 Dialog

```
@Composable
fun CustomDialog() {
    var show by remember { mutableStateOf(true) }

    if (show) {
        Dialog(
            onDismissRequest = { show = false }
        ) {
            Box(
                modifier = Modifier
                    .width(280.dp)
                    .background(
                        Color.White,
                        shape = RoundedCornerShape(12.dp)
                    )
                    .padding(16.dp)
            ) {
                Column {
                    Text("自定义弹窗", fontSize = 18.sp)
                    Spacer(Modifier.height(8.dp))
                    Text("这是一个完全自定义的 Dialog")
                    Spacer(Modifier.height(16.dp))
                    Button(
                        modifier = Modifier.align(Alignment.End),
                        onClick = { show = false }
                    ) {
                        Text("关闭")
                    }
                }
            }
        }
    }
}
```

### 4.2 Dialog 特点总结

|    特点    |          说明           |
| :--------: | :---------------------: |
| 完全自定义 |    布局、样式、动画     |
|  自带遮罩  |      默认阻断交互       |
|   跨平台   | Android / Desktop / iOS |

## 五 点击外部是否关闭？

### 5.1 可关闭(默认)

```
Dialog(onDismissRequest = { show = false })
```

### 5.2 禁止点击外部关闭

```
Dialog(
    onDismissRequest = { /* ignore */ }
)
说明：常用于：强制升级 / 危险操作确认
```

## 六 弹窗与返回键(Android)

```
Dialog 自动拦截 Back
onDismissRequest 会在 Back 时触发
iOS / Desktop 无 Back 键概念
```

## 七 常见弹窗场景封装(实战)

### 7.1 通用确认弹窗

```
@Composable
fun ConfirmDialog(
    title: String,
    content: String,
    onConfirm: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(title) },
        text = { Text(content) },
        confirmButton = {
            TextButton(onClick = onConfirm) {
                Text("确定")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("取消")
            }
        }
    )
}
```

### 7.2 使用方式

```
if (showConfirm) {
    ConfirmDialog(
        title = "删除",
        content = "确认删除该条数据？",
        onConfirm = {
            showConfirm = false
        },
        onDismiss = {
            showConfirm = false
        }
    )
}
```

## 八 弹窗常见坑点

### 8.1 在 Dialog 内创建状态

```
if (show) {
    var state by remember { ... } //  易丢失
}

正确：状态上提
```

### 8.2 多 Dialog 同时显示

```
必须统一管理弹窗状态（枚举 / sealed class）
```

### 8.3 在 ViewModel 中直接控制 UI

```
ViewModel 只暴露状态
UI 决定是否显示 Dialog
```

## 九 与 Flutter / Android 对比理解

|     平台      |    弹窗模型    |
| :-----------: | :------------: |
| Android View  | show / dismiss |
|    Flutter    |   showDialog   |
| Compose / KMP |  状态驱动 if   |

说明：Compose 是 **声明式的极致体现**

## 十 小结

```
1.Compose / KMP 弹窗的核心模型
2.AlertDialog 与 Dialog 的使用场景
3.状态驱动的弹窗控制方式
4.自定义弹窗结构
5.常见弹窗封装与踩坑点
```

