---
title: Android开发之——nowinAndroid项目ui-test-hilt-manifest模块(13)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 711b1708
date: 2025-09-26 17:09:40
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目下ui-test-hilt-manifest模块
 -模块剖析:ui-test-hilt-manifest
```

<!--more-->

## 二 模块剖析

### 2.1 模块定位

```
-模块名：ui-test-hilt-manifest
-用途：为 UI 测试提供一个可被 Hilt 注入的 Activity（HiltComponentActivity）。
-场景：Compose UI 测试 + Hilt 依赖注入
```

### 2.2 目录结构(逻辑划分)

```
ui-test-hilt-manifest
 ├── src
 │   └── main
 │       ├── AndroidManifest.xml   # 在测试/调试环境下声明 HiltComponentActivity
 │       └── java
 │           └── com.google.samples.apps.nowinandroid
 │               └── HiltComponentActivity.kt   # @AndroidEntryPoint 的宿主 Activity
 └── build.gradle.kts              # 模块构建脚本
```

### 2.3 关键文件

1、HiltComponentActivity.kt

```
1、作用：
-继承自 ComponentActivity；
-标注 @AndroidEntryPoint；
-不包含业务逻辑，仅作为测试宿主。

2、示例（简化推测版）：

@AndroidEntryPoint
class HiltComponentActivity : ComponentActivity()
```

2、AndroidManifest.xml

```
1、作用：
-声明 HiltComponentActivity，确保它在 UI 测试运行时可用；
-只在 test/debug 变体中生效，不影响 release。

2、示例（简化版）：

<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application>
        <activity
            android:name=".HiltComponentActivity"
            android:exported="false" />
    </application>
</manifest>
```

### 2.4 使用方式

```
测试时：
@get:Rule
val composeTestRule = createAndroidComposeRule<HiltComponentActivity>()

@Test
fun testWithHiltComponentActivity() {
    composeTestRule.setContent {
        MyComposableScreen() // 可以正常注入依赖
    }
}
```

## 三 总结

```
1、问题：普通 ComponentActivity 不支持 Hilt 注入，测试时会报错。

2、解决：提供 HiltComponentActivity 模块，并在 manifest 中注册。

3、优势：
-测试专用，不影响正式应用；
-简化 UI 测试环境；
-统一 Compose UI 测试入口。
```

