---
title: KMP开发之——expect与actual机制(2)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: 1d285303
date: 2026-01-13 09:27:47
---
## 一 概述

```
expect/actual 是 Kotlin Multiplatform 的核心能力之一。
它解决的是：“公共代码如何调用平台能力？”
```

<!--more-->

## 二 相关概念

### 2.1 为什么需要 expect / actual？

```
在 KMP 中：
1-commonMain 不能直接使用平台 API
-Android：Context / Log / Build
-iOS：UIDevice / NSBundle

2-但业务代码又必须：
-读系统信息
-打日志
-访问文件、时间、网络状态

这时就需要 声明式 + 平台实现 的机制。
```

### 2.2 expect / actual 是什么

1-核心概念

1-1、表格

| 关键字 |              作用              |
| :----: | :----------------------------: |
| expect | 在 commonMain 声明“我需要什么” |
| actual |   在平台源码中“具体怎么实现”   |

1-2、编译期强校验

```
expect 没有 actual → 编译失败
actual 签名不一致 → 编译失败
```

2-设计思想(非常重要)

```
公共层只关心“能力”，不关心“平台”

commonMain：我要「设备信息」
androidMain：用 Android API 实现
iosMain：用 iOS API 实现
```

## 三 示例

### 3.1 最基础示例：平台名称

1-commonMain：定义 expect

```
// commonMain
expect fun platformName(): String
```

2-androidMain：actual 实现

```
// androidMain
actual fun platformName(): String {
    return "Android"
}
```

3-iosMain：actual 实现

```
// iosMain
actual fun platformName(): String {
    return "iOS"
}
```

4-commonMain 使用

```
class Greeting {
    fun greet(): String {
        return "Hello ${platformName()}"
    }
}

commonMain 完全不感知平台
```

### 3.2 expect / actual 的三种常见形式

1-函数(最常见)

```
expect fun getTimeMillis(): Long
```

2-属性

```
expect val deviceName: String
actual val deviceName: String = Build.MODEL
```

3-类(实战最重要)

```
expect class PlatformLogger {
    fun log(message: String)
}
```

## 四 实战

### 4.1 实战1：跨平台日志封装(推荐模板)

1-commonMain

```
expect class PlatformLogger {
    fun log(tag: String, message: String)
}
```

2-Android 实现

```
// androidMain
actual class PlatformLogger {
    actual fun log(tag: String, message: String) {
        android.util.Log.d(tag, message)
    }
}
```

3-iOS 实现

```
// iosMain
import platform.Foundation.NSLog

actual class PlatformLogger {
    actual fun log(tag: String, message: String) {
        NSLog("[$tag] $message")
    }
}
```

4-公共层使用

```
class HomeViewModel(private val logger: PlatformLogger = PlatformLogger()) {
    fun load() {
        logger.log("Home", "load data")
    }
}
说明：业务层零平台代码
```

### 4.2  实战2：获取设备信息(真实项目常用)

1-commonMain

```
data class DeviceInfo(
    val name: String,
    val osVersion: String
)

expect fun getDeviceInfo(): DeviceInfo
```

2-Android 实现

```
// androidMain
actual fun getDeviceInfo(): DeviceInfo {
    return DeviceInfo(
        name = android.os.Build.MODEL,
        osVersion = android.os.Build.VERSION.RELEASE
    )
}
```

3-iOS 实现

```
// iosMain
import platform.UIKit.UIDevice

actual fun getDeviceInfo(): DeviceInfo {
    val device = UIDevice.currentDevice
    return DeviceInfo(
        name = device.name,
        osVersion = device.systemVersion
    )
}
```

## 五 进阶

### 5.1 expect / actual 与依赖注入的配合)

1- 问题

```
如果 actual 类里依赖 Context / UIApplication 怎么办？
```

2-方案一：构造参数(推荐)

```
1-// commonMain
expect class FileManager {
    fun read(path: String): String
}

2-// androidMain
actual class FileManager(
    private val context: Context
)
3-在 Android 入口传入 Context
```

3-方案二：平台初始化(不推荐)

```
使用 lateinit var
易踩坑，不利测试
```

### 5.2 expect / actual 使用规范(经验总结)

1-该用的时候

```
1.系统能力
2.IO / 时间 / 日志
3.平台 SDK（支付 / 推送 / 分享）
```

2-不该用的时候

```
1.纯业务逻辑
2.数据计算
3.ViewModel 状态
```

3-设计建议

```
1-说明
expect 越“粗”，公共层越稳定

2-不推荐
expect fun getAndroidContext(): Any

3-推荐
expect fun getCacheDir(): String
```

## 六 常见错误 & 排查

### 6.1 actual 签名不一致

```
Expected: fun log(String)
Actual: fun log(String, Int)

说明：参数 / 返回值 / 可见性必须完全一致
```

### 6.2 忘了实现某个平台

```
Desktop / Web 也算 Target
缺一个直接编译失败
```

### 6.3  actual 放错 sourceSet

```
iosMain ≠ iosArm64Main
新手常见坑
```

## 七 小结

```
本篇你学会了：

1.expect / actual 的设计目的
2.三种声明方式（函数 / 属性 / 类）
3.日志 & 设备信息完整实战
4.与依赖注入的配合方式
5.项目级使用规范与避坑
```

