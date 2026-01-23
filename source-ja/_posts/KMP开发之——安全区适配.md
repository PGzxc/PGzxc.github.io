---
title: KMP开发之——安全区适配
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: c33c2649
date: 2025-12-10 09:01:46
---
## 一 KMP 的多端 UI 体系

```
目前 KMP 主流使用 Compose Multiplatform(即 JetBrains Compose for Android/iOS/Desktop)。
其 UI 层在 shared 模块统一编写，可以在 Android、iOS、Desktop 三端运行。

在这种架构下，我们可以用：
-Android： 直接访问 WindowInsets / Compose WindowInsetsCompat
-iOS： 通过 UIKit.safeAreaInsets 获取
-Desktop： 没有状态栏概念，可统一为 0
-共有层（shared）： 定义 expect/actual 获取接口
```

<!--more-->

## 二 核心目标：统一 SafeArea Insets API

### 2.1 定义一个跨平台接口

```
// shared/src/commonMain/kotlin/com/example/utils/SafeAreaInsets.kt
package com.example.utils

data class SafeAreaInsets(
    val top: Float,
    val bottom: Float,
    val left: Float,
    val right: Float
)

expect fun getSafeAreaInsets(): SafeAreaInsets
```

### 2.2 Android 实现

```
1、代码
// shared/src/androidMain/kotlin/com/example/utils/SafeAreaInsets.android.kt
package com.example.utils

import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.WindowInsetsCompat
import androidx.compose.foundation.layout.getTop
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalDensity

@Composable
actual fun getSafeAreaInsets(): SafeAreaInsets {
    val insets = WindowInsets.statusBars.union(WindowInsets.navigationBars)
    val density = LocalDensity.current

    return SafeAreaInsets(
        top = with(density) { insets.getTop(this).toFloat() },
        bottom = with(density) { insets.getBottom(this).toFloat() },
        left = 0f,
        right = 0f
    )
}

2、说明：
-通过 Compose Multiplatform 的 WindowInsets 动态获取状态栏 & 导航栏
-Compose 自动兼容 Android 12+ 手势导航
```

### 2.3 iOS 实现

```
1、代码
// shared/src/iosMain/kotlin/com/example/utils/SafeAreaInsets.ios.kt
package com.example.utils

import platform.UIKit.UIApplication
import platform.UIKit.UIWindow
import platform.UIKit.safeAreaInsets

actual fun getSafeAreaInsets(): SafeAreaInsets {
    val window: UIWindow? = UIApplication.sharedApplication.keyWindow
    val insets = window?.safeAreaInsets ?: platform.UIKit.UIEdgeInsetsZero

    return SafeAreaInsets(
        top = insets.top.toFloat(),
        bottom = insets.bottom.toFloat(),
        left = insets.left.toFloat(),
        right = insets.right.toFloat()
    )
}

2、说明：
-iOS 的 safeAreaInsets 与 Flutter / RN 同概念
-自动兼容刘海屏、底部 Home 手势区
```

### 2.4 Desktop 实现

```
// shared/src/desktopMain/kotlin/com/example/utils/SafeAreaInsets.desktop.kt
package com.example.utils

actual fun getSafeAreaInsets(): SafeAreaInsets = SafeAreaInsets(0f, 0f, 0f, 0f)
```

## 三 在 Compose Multiplatform UI 中使用

### 3.1 SafeAreaScreen

```
@Composable
fun SafeAreaScreen(content: @Composable (SafeAreaInsets) -> Unit) {
    val insets = getSafeAreaInsets()
    Box(
        modifier = Modifier
            .padding(
                top = insets.top.dp,
                bottom = insets.bottom.dp,
                start = insets.left.dp,
                end = insets.right.dp
            )
    ) {
        content(insets)
    }
}
```

### 3.2 使用示例

```
@Composable
fun ExampleScreen() {
    SafeAreaScreen { insets ->
        Column {
            Text("Top safe area: ${insets.top}")
            Text("Bottom safe area: ${insets.bottom}")
        }
    }
}
```

## 四 适配状态栏/导航栏(Compose 风格)

在 Android Compose Multiplatform 中，你也可以直接使用 Jetpack 提供的 API

```
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.safeDrawing

// 示例
val statusBarPadding = WindowInsets.statusBars.asPaddingValues()
val navigationBarPadding = WindowInsets.navigationBars.asPaddingValues()
```

## 五 三端对比总结

|  平台   |    获取方式    | 状态栏 | 底部导航/手势区 | 支持动态更新 |
| :-----: | :------------: | :----: | :-------------: | :----------: |
| Android |  WindowInsets  |   ✓    |        ✓        |      ✓       |
|   iOS   | safeAreaInsets |   ✓    |        ✓        |      ✓       |
| Desktop |       无       |   x    |        x        |      —       |

## 六 选扩展封装（常用工具类）

### 6.1 工具类

```
// shared/src/commonMain/kotlin/com/example/utils/ScreenUtils.kt
package com.example.utils

expect fun getScreenWidth(): Int
expect fun getScreenHeight(): Int
expect fun getStatusBarHeight(): Int
expect fun getNavigationBarHeight(): Int
```

### 6.2 然后在各平台

```
Android → 使用 Resources.getDimensionPixelSize()
iOS → 用 UIApplication.sharedApplication.keyWindow?.safeAreaInsets
Desktop → 直接返回 0

这样你就可以在 shared 层完全统一屏幕信息访问。
```

## 七 推荐实践(生产级)

|             场景             |                        推荐方案                        |
| :--------------------------: | :----------------------------------------------------: |
|     通用 UI 层安全区适配     |                 封装 SafeAreaScreen()                  |
|     Android/iOS 分端 UI      |                使用 expect/actual 封装                 |
|    动态变化（横竖屏切换）    |       监听 Compose Recomposition 或原生窗口回调        |
| NavigationBar 与手势导航共存 | 使用 Compose Multiplatform 的 WindowInsets.safeDrawing |

## 八 若使用 SwiftUI + Compose 混合（KMP iOS）

```
你可以在 Swift 层注入 SafeArea 值到 Kotlin 层，通过 KMM Bridge：
let insets = UIApplication.shared.keyWindow?.safeAreaInsets
SharedSafeAreaBridge.shared.setInsets(top: insets.top, bottom: insets.bottom)

然后在 Kotlin 层监听 SharedFlow 实时更新
```

## 九 总结

|       项目层        |        工具        |        功能        |
| :-----------------: | :----------------: | :----------------: |
| shared (commonMain) | expect/actual 封装 |    定义统一接口    |
|       Android       |    WindowInsets    | 动态安全区、状态栏 |
|         iOS         |   safeAreaInsets   | 刘海屏、底部手势区 |
|       Desktop       |       固定 0       |    无状态栏概念    |
|     Compose 层      |   SafeAreaScreen   |    通用 UI 包装    |

