---
title: KMP开发之——反馈组件之进度与加载反馈(8.3)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
  - 反馈组件
abbrlink: abe2871f
date: 2026-03-03 09:58:14
---
## 一 概述

```
本文介绍：
 - Loading / Skeleton / Shimmer
```

<!--more-->

## 二 概念

### 2.1 为什么加载反馈在 KMP 中更重要？

```
1-多端性能差异更明显
-Android / iOS / Desktop 性能差异大
-网络延迟不可控
-Desktop / Web 用户对“空白页”容忍度极低

2-结论：
-KMP 项目中必须 显式设计加载状态
```

### 2.2 加载反馈的三种层级

| 层级 |   组件   |      体验      |
| :--: | :------: | :------------: |
| 基础 | Loading  | 明确“正在加载” |
| 进阶 | Skeleton |  减少等待焦虑  |
| 高级 | Shimmer  |   强化流畅感   |

## 三 进度与加载反馈

### 3.1 Loading(基础加载指示)

1-CircularProgressIndicator(最常用)

```
@Composable
fun LoadingView(modifier: Modifier = Modifier) {
    Box(
        modifier = modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        CircularProgressIndicator()
    }
}
```

2-适用场景

```
-页面初始化
-切换 Tab
-表单提交
-网络请求等待
```

3-优缺点

```
优点：简单、跨端一致
缺点：等待感明显
```

### 3.2 Skeleton(骨架屏)

Skeleton 用 **结构占位**，让用户“提前看到页面轮廓”

1-最简单的 Skeleton 实现

```
@Composable
fun SkeletonItem(modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .background(
                color = Color.LightGray.copy(alpha = 0.3f),
                shape = RoundedCornerShape(8.dp)
            )
    )
}
```

2-列表 Skeleton 示例

```
@Composable
fun SkeletonList() {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        repeat(6) {
            SkeletonItem(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(80.dp)
            )
        }
    }
}
```

3-Skeleton 的优势

```
-减少白屏
-提前构建布局认知
-比 Loading 更“快”

KMP 项目中非常推荐使用 Skeleton
```

### 3.3 Shimmer(骨架动画)

Shimmer = Skeleton + 动画
用于 长列表 / 图片流 / 内容型页面

1-基础 Shimmer 动画

```
@Composable
fun shimmerBrush(): Brush {
    val transition = rememberInfiniteTransition()

    val translate by transition.animateFloat(
        initialValue = 0f,
        targetValue = 1000f,
        animationSpec = infiniteRepeatable(
            animation = tween(1200, easing = LinearEasing)
        )
    )

    return Brush.linearGradient(
        colors = listOf(
            Color.LightGray.copy(alpha = 0.6f),
            Color.LightGray.copy(alpha = 0.3f),
            Color.LightGray.copy(alpha = 0.6f)
        ),
        start = Offset(translate - 200f, 0f),
        end = Offset(translate, 0f)
    )
}
```

2-Shimmer Skeleton 组件

```
@Composable
fun ShimmerItem(modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .background(
                brush = shimmerBrush(),
                shape = RoundedCornerShape(8.dp)
            )
    )
}
```

3-使用示例

```
@Composable
fun ShimmerList() {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        repeat(6) {
            ShimmerItem(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(80.dp)
            )
        }
    }
}
```

## 四 统一加载状态建模(KMP 实战关键)

### 4.1 定义 UI State

```
sealed class UiState<out T> {
    object Loading : UiState<Nothing>()
    data class Success<T>(val data: T) : UiState<T>()
    data class Error(val message: String) : UiState<Nothing>()
}
```

### 4.2 ViewModel 使用

```
private val _state = MutableStateFlow<UiState<List<Item>>>(
    UiState.Loading
)
val state = _state.asStateFlow()
```

### 4.3 UI 层统一渲染

```
when (state) {
    is UiState.Loading -> {
        ShimmerList()
    }
    is UiState.Success -> {
        ContentList((state as UiState.Success).data)
    }
    is UiState.Error -> {
        ErrorView()
    }
}
```

 说明：**状态驱动 UI，是 KMP 中最稳定的模式**

## 五 Loading / Skeleton / Shimmer 选型建议

|      场景       |        推荐        |
| :-------------: | :----------------: |
|   页面初始化    |      Loading       |
|     列表页      |      Skeleton      |
| 内容流 / 图片流 |      Shimmer       |
|    二次刷新     | Skeleton / Shimmer |

## 六 性能与体验注意事项

### 6.1 不建议

```
不要所有页面都用 Shimmer
动画持续时间过长
同一页面叠加多个动画
```

### 6.2 推荐

```
1.Skeleton 数量可控
2.Shimmer 只用于主内容
3.加载完成立即切换
```

## 七 小结

```
Loading 是最低成本方案
Skeleton 是 最具性价比 的加载体验
Shimmer 是 锦上添花
UIState + 状态驱动渲染 是 KMP 的核心模式
```

