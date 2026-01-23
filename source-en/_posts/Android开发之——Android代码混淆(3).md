---
title: Android开发之——Android代码混淆(3)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 2511c1ba
date: 2017-11-16 17:43:12
---
## 一 概述

* 代码混淆是什么？
* Android 混淆工具
* 启用代码混淆
* ProGuard 规则（proguard-rules.pro）<!--more-->
* R8 进阶优化（比 ProGuard 更强）
* 检查混淆是否生效
* 混淆 + 加固（更高级保护）
* 总结

## 二 代码混淆是什么？

```
代码混淆（Obfuscation）是指 对 Java/Kotlin 代码进行优化、压缩和混淆，
使其难以被反编译和阅读，从而提高应用安全性，减少 APK 体积，并优化运行性能。

混淆的作用：
-防止反编译（避免代码被破解）
-减少 APK 体积（移除无用代码）
-提高执行效率（优化字节码）
```

## 三 Android 混淆工具

|    工具    |        作用        |                       优缺点                       |
| :--------: | :----------------: | :------------------------------------------------: |
|  ProGuard  |      基本混淆      |       ✅ 轻量级、简单易用<br/>❌ 优化不够激进        |
| R8（默认） | 混淆 + D8 编译优化 | ✅ 更快、更高效、默认启用<br/>✅ 支持 Kotlin 和 Java |

 说明：从 Android Studio 3.4+ 开始，R8 取代 ProGuard 成为默认混淆工具。

## 四 启用代码混淆(在 Gradle 配置混淆)

在 **`app/build.gradle`**（Kotlin DSL/ Groovy DSL）中启用混淆：

```
android {
    buildTypes {
        release {
            minifyEnabled true  // 启用混淆
            shrinkResources true // 移除无用资源
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

说明：

* `minifyEnabled true` → 开启混淆
* `shrinkResources true` → 移除未使用的资源文件（图片、XML 等）
* `proguardFiles` → 指定混淆规则文件

## 五 `proguardFiles` → 指定混淆规则文件

在 `proguard-rules.pro` 里可以自定义混淆规则

### 5.1 保留应用主入口（避免混淆 MainActivity）

```
-keep class com.example.app.MainActivity { *; }
```

### 5.2 保留所有 Activity、Fragment、Service、BroadcastReceiver

```
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.app.Fragment
```

### 5.3 保留所有带 `@Keep` 注解的类

```
-keep @androidx.annotation.Keep class *
-keepclassmembers class * {
    @androidx.annotation.Keep *;
}
```

也可以手动在代码里加：

```
@Keep
class MyClass { ... }
```

### 5.4 保留 Gson / Jackson 解析的 JSON 模型

```
-keep class com.example.models.** { *; }
```

### 5.5 保留 Retrofit / OkHttp

```
-keep class com.squareup.retrofit2.** { *; }
-keep class okhttp3.** { *; }
```

### 5.6 保留自定义 View

```
-keep public class * extends android.view.View { public <init>(...); }
```

### 5.7 忽略 Log 代码（不混淆）

```
-assumenosideeffects class android.util.Log { *; }
```

可以去掉 Log 代码，提高安全性 & 优化性能

## 六 R8 进阶优化（比 ProGuard 更强）

R8 具有更智能的优化策略，自动删除无用代码
 在 **proguard-rules.pro** 里可以增加 R8 规则：

### 6.1 仅在 release 版本中删除调试信息

```
-if release
-assumenosideeffects class android.util.Log { *; }
```

### 6.2 移除 Kotlin 协程调试信息

```
-dontwarn kotlinx.coroutines.**
-keep class kotlinx.coroutines.** { *; }
```

### 6.3 压缩字节码（优化代码结构）

```
-optimizationpasses 5
```

## 七 检查混淆是否生效

### 7.1 方式 1：查看 APK 体积变化

```
./gradlew assembleRelease
```

然后比较 **release APK** 和 **debug APK** 的大小

### 7.2 方式 2：反编译 APK

用 `jadx` 或 `apktool` 反编译 APK，检查类名是否被混淆：

```
jadx -d output_dir my_app.apk
```

如果代码仍然可读，说明混淆不彻底，需要优化 `proguard-rules.pro`。

## 八  混淆 + 加固（更高级保护）

如果要 **进一步防止反编译**，可以使用加固工具：

```
-腾讯乐固（Tinker）
-360 加固
-阿里梆梆
-字节跳动 FreeShield

这些工具可以 加密 DEX、隐藏关键代码、阻止调试，防止黑客逆向破解
```

## 九 总结

### 9.1 ProGuard / R8 主要作用

```
-混淆代码（变量、类、方法重命名）
-移除无用代码
-优化代码执行
```

### 9.2 最佳实践

```
-启用 R8（默认）
-在 proguard-rules.pro 里添加保留规则
-使用 @Keep 避免误混淆关键类
-Release 版本测试 APK 反编译
-结合加固工具提升安全性

这样可以 减少 APK 体积，提高性能，保护代码安全！
```

