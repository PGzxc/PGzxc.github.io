---
title: KMP开发之——反馈组件之SnackBar(8.2)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
  - SnackBar
abbrlink: 52a1e471
date: 2026-03-01 09:36:02
---
## 一 概述

```
本文介绍：
 - Snackbar / Toast / Message
```

<!--more-->

## 二 提示与反馈的分类与使用场景

### 2.1 列表

|       类型       | 是否打断 | 是否可交互 |      常见用途      |
| :--------------: | :------: | :--------: | :----------------: |
|      Toast       |    否    |     否     |    轻量状态提示    |
|     Snackbar     |    否    |     可     |  操作反馈 + 撤销   |
| Message / Dialog |    可    |     可     | 错误、确认、强提示 |
|   Popup / 浮层   |  视情况  |     可     |     组合式反馈     |

### 2.2 核心原则

```
非关键状态 → Toast / Snackbar
需要用户确认 → Message / Dialog
操作可撤销 → Snackbar
```

## 三 反馈组件

### 3.1 Snackbar

1-Scaffold + SnackbarHost(官方推荐)

```
val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()

Scaffold(
    snackbarHost = {
        SnackbarHost(hostState = snackbarHostState)
    }
) { padding ->
    Button(
        onClick = {
            scope.launch {
                snackbarHostState.showSnackbar(
                    message = "保存成功",
                    actionLabel = "撤销",
                    duration = SnackbarDuration.Short
                )
            }
        }
    ) {
        Text("显示 Snackbar")
    }
}
```

2-Snackbar 的特点

```
Android / Desktop / Web 统一
支持 Action（撤销、重试）
自动处理队列
需要 Scaffold 环境
KMP 中首选 Snackbar，而不是 Toast
```

### 3.2 Toast(平台相关，不推荐直接用)

1-Android Toast(仅 Android)

```
Toast.makeText(
    context,
    "操作完成",
    Toast.LENGTH_SHORT
).show()
```

2-KMP 问题点

|      问题      |            说明            |
| :------------: | :------------------------: |
|     非跨端     | iOS / Desktop 无原生 Toast |
| 生命周期不安全 |     页面销毁仍可能显示     |
|    不可测试    |        UI 测试困难         |

3-结论

```
KMP 项目中应避免直接使用 Toast
```

### 3.3 Message / Dialog(强提示)

1- AlertDialog(Compose 标准)

```
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
```

2-适用场景

```
1.删除 / 覆盖 / 提交
2.严重错误
3.权限说明
```

### 3.4 统一 Message 体系(KMP 实战推荐)

1-定义反馈模型

```
sealed class UiMessage {
    data class Toast(val text: String) : UiMessage()
    data class Snackbar(
        val text: String,
        val action: String? = null
    ) : UiMessage()

    data class Dialog(
        val title: String,
        val message: String
    ) : UiMessage()
}
```

2-ViewModel 中发送消息

```
private val _message = MutableSharedFlow<UiMessage>()
val message = _message.asSharedFlow()

fun save() {
    viewModelScope.launch {
        _message.emit(
            UiMessage.Snackbar("保存成功", "撤销")
        )
    }
}
```

3-UI 层统一处理

```
LaunchedEffect(Unit) {
    viewModel.message.collect { msg ->
        when (msg) {
            is UiMessage.Snackbar -> {
                snackbarHostState.showSnackbar(
                    msg.text,
                    msg.action
                )
            }
            is UiMessage.Dialog -> {
                dialogState.show(msg)
            }
            is UiMessage.Toast -> {
                // 可退化为 Snackbar
            }
        }
    }
}
```

3-总结

```
这是 KMP 中最重要的一种“跨端提示模式”
```

## 四 Snackbar vs Dialog vs Toast 对比总结

### 4.1 对比

|   维度   | Snackbar | Dialog | Toast |
| :------: | :------: | :----: | :---: |
| 跨端一致 |    可    |   可   | 不可  |
|  可交互  |    可    |   可   | 不可  |
|  推荐度  |  5颗星   | 4颗星  | 1颗星 |

### 4.2 KMP 提示体系最佳实践

```
1-优先级建议
-Snackbar → 默认反馈
-Dialog → 强提示
-Toast → 不建议使用

2-架构建议
-提示由 ViewModel 发起
-UI 只负责 展示
-使用 SharedFlow / Channel
-避免在 Composable 内直接 showToast
```

## 五 小结

```
-Snackbar 是 KMP 中最推荐的提示方式
-Toast 不具备跨端能力，应避免
-Dialog 适合强交互
-统一 Message 模型是多端一致体验的关键
```

