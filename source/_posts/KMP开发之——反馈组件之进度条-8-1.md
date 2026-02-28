---
title: KMP开发之——反馈组件之进度条(8.1)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
  - 进度条
abbrlink: 55f0436f
date: 2026-02-28 09:09:22
---
## 一 概述

```
本文介绍：
 - 进度条
```

<!--more-->

## 二 进度条类型

KMP提供两类核心进度条：

|    类型    |           组件            |  使用场景   |
| :--------: | :-----------------------: | :---------: |
| 不确定进度 | CircularProgressIndicator |   加载中    |
|  确定进度  |  LinearProgressIndicator  | 下载 / 上传 |

## 三 不确定进度条(Loading)

### 3.1 CircularProgressIndicator(最常用)

```
1-代码
@Composable
fun LoadingIndicator() {
    CircularProgressIndicator()
}

2-说明
表示 正在加载，但不知道进度
```

### 3.2 指定颜色和尺寸

```
CircularProgressIndicator(
    color = Color.Blue,
    strokeWidth = 4.dp
)
```

### 3.3 居中 Loading（高频）

```
@Composable
fun CenterLoading() {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        CircularProgressIndicator()
    }
}
```

## 四 确定进度条(Progress)

### 4.1 LinearProgressIndicator

```
1-代码
@Composable
fun LinearProgress() {
    var progress by remember { mutableStateOf(0.3f) }

    LinearProgressIndicator(
        progress = progress
    )
}
2-说明：
progress ∈ [0f, 1f]
```

### 4.2 动态更新进度

```
@Composable
fun DownloadProgress() {
    var progress by remember { mutableStateOf(0f) }

    Column {
        LinearProgressIndicator(progress = progress)
        Button(onClick = {
            progress = (progress + 0.1f).coerceAtMost(1f)
        }) {
            Text("增加进度")
        }
    }
}
```

## 五 进度条与状态管理

### 5.1 UI 只关心状态

```
sealed class LoadState {
    object Loading : LoadState()
    data class Progress(val value: Float) : LoadState()
    object Success : LoadState()
}
```

### 5.2 渲染不同进度 UI

```
@Composable
fun LoadStateView(state: LoadState) {
    when (state) {
        LoadState.Loading ->
            CircularProgressIndicator()

        is LoadState.Progress ->
            LinearProgressIndicator(progress = state.value)

        LoadState.Success ->
            Text("完成")
    }
}
说明：强烈推荐这种模式
```

## 六 进度条 + 动画

### 6.1 animateFloatAsState

```
@Composable
fun AnimatedProgress(progress: Float) {
    val animatedProgress by animateFloatAsState(progress)

    LinearProgressIndicator(progress = animatedProgress)
}
```

### 6.2 平滑更新进度(下载 / 上传)

```
AnimatedProgress(progress)
说明：避免「跳变感」
```

## 七 自定义进度条

### 7.1 自定义 Linear 样式

```
LinearProgressIndicator(
    progress = progress,
    modifier = Modifier
        .fillMaxWidth()
        .height(8.dp),
    trackColor = Color.LightGray,
    color = Color.Green
)
```

### 7.2 自定义圆形进度(Canvas)

```
@Composable
fun CircleProgress(
    progress: Float
) {
    Canvas(modifier = Modifier.size(80.dp)) {
        drawArc(
            color = Color.Blue,
            startAngle = -90f,
            sweepAngle = progress * 360f,
            useCenter = false,
            style = Stroke(width = 8.dp.toPx())
        )
    }
}
```

## 八 进度条 + 弹窗(真实项目)

### 8.1 Loading Dialog

```
@Composable
fun LoadingDialog(show: Boolean) {
    if (show) {
        Dialog(onDismissRequest = {}) {
            Box(
                modifier = Modifier
                    .size(120.dp)
                    .background(Color.White, RoundedCornerShape(12.dp)),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        }
    }
}
说明：不可取消 Loading
```

## 九 跨平台一致性说明

|  平台   |     表现      |
| :-----: | :-----------: |
| Android | Material 风格 |
|   iOS   |    自适应     |
| Desktop |  窗口级渲染   |

说明：KMP已统一行为，**无需平台判断**

## 十 常见坑点

### 10.1 进度值越界

```
1-错误
progress = 1.2f // x

2-正确
始终 coerceIn(0f, 1f)
```

### 10.2 在 Composable 内启动任务

```
1-错误
@Composable
fun Download() {
    startDownload() // x
}

2-正确
使用 ViewModel / LaunchedEffect
```

### 10.3 Loading 永不结束

```
成功 / 失败都要更新状态
```

## 十一 与 Flutter / Android 对照

|          Compose          |          Flutter          | Android View |
| :-----------------------: | :-----------------------: | :----------: |
| CircularProgressIndicator | CircularProgressIndicator | ProgressBar  |
|  LinearProgressIndicator  |  LinearProgressIndicator  | ProgressBar  |

## 十二 小结

```
1.不确定 / 确定进度条
2.进度状态建模
3.动画化进度更新
4.自定义进度条
5.Loading Dialog 实战
```

