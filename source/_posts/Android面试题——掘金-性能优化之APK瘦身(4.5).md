---
title: Android面试题——掘金-性能优化之APK瘦身(4.5)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 28801a47
date: 2025-04-07 10:07:34
---
## 一 概述

```
APK 瘦身相关常见面试题及详解
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 APK 包体为什么会过大？有哪些主要构成？

```
APK 主要由以下几部分组成：

-Dex 文件：包含 Java/Kotlin 编译后的字节码。
-资源文件（res/）：布局、图片、动画、xml 等。
-assets/ 文件夹：存放额外资源（本地网页、字典包等）。
-so 文件（lib/）：C/C++ 编译后的 Native 库。
-META-INF/：签名信息等。
-AndroidManifest.xml
```

### 2.2 APK 瘦身有哪些常见手段？

|      优化维度       |                  优化方法                   |
| :-----------------: | :-----------------------------------------: |
|      图片资源       |      压缩、WebP 格式替代 PNG、按需加载      |
|     代码（Dex）     |    ProGuard / R8 混淆、移除无用类和方法     |
|       so 文件       | ABI 拆分（只打包 arm64-v8a 等）、删无用架构 |
|     多语言资源      |           resConfigs 精简多余语言           |
|     不必要资源      |       res 删无用布局、图片、drawable        |
|      第三方库       |   精简依赖，按需引入，使用 lighter 替代库   |
| 多 APK / App Bundle |        按需生成变种包，瘦身效果显著         |

### 2.3 如何使用 ProGuard / R8 对 APK 瘦身？

```
1.R8 是 Android 默认的混淆器兼压缩器。

2.它可以：
-混淆类/方法名；
-移除无用类/代码（Tree Shaking）；
-优化代码结构；

3.添加混淆配置（proguard-rules.pro）：
# 移除未使用的代码和资源
-dontwarn
-ignorewarnings
-keep class com.example.** { *; }
在 build.gradle 中开启
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles 
       getDefaultProguardFile('proguard-android-optimize.txt'), 
       'proguard-rules.pro'
    }
}
```

### 2.4 如何移除无用资源？

```
-使用 shrinkResources true（需配合混淆）。
-使用 Android Studio 的 Analyze → Run Lint 或 Unused Resources。
-手动排查 res/ 目录中未引用的资源。
-使用 ResourceUsageAnalyzer 工具自动分析。
```

### 2.5 如何使用 WebP 格式优化图片资源？

```
WebP 图片在不影响质量的情况下大幅压缩体积（较 PNG 小 25~50%）。
Android Studio 支持图片转换：右键 → Convert to WebP

注意：
-Android 4.0 开始支持有损 WebP；
-Android 4.2 之后支持无损；
-Android 5.0 支持透明 WebP。
```

### 2.6 如何使用 `resConfigs` 精简多语言资源？

```
在 build.gradle 中配置，只保留简体中文和英文资源
android {
    defaultConfig {
        resConfigs "zh", "en"
    }
}
可以移除多余的 values-fr/, values-de/ 等
```

### 2.7 多架构 so 文件如何优化？

```
1.使用 ndk.abiFilters 指定只打包某些架构
ndk {
    abiFilters "armeabi-v7a", "arm64-v8a"
}
2.或使用 ABI 拆分 + Play Store 分发（App Bundle）
splits {
    abi {
        enable true
        reset()
        include "armeabi-v7a", "arm64-v8a"
        universalApk false
    }
}
```

### 2.8 什么是 App Bundle？为什么它更推荐？

```
-App Bundle 是 Google 推出的动态 APK 生成方案（.aab 格式）；
-支持按需拆包（语言、屏幕密度、ABI）；
-实际用户下载的 APK 更小；
-减少 20%~50% 包体积；
-支持动态 Feature 模块按需下载；
```

### 2.9 APK 文件大小怎么分析？

```
-使用 Android Studio → Build → Analyze APK
-使用 APK Analyzer
-使用 apktool 解包分析。
-使用 aapt dump badging xxx.apk 查看资源
```

### 2.10  如何避免第三方库拖大包体？

```
-尽量使用轻量库（如 Retrofit + OkHttp 替代某些 SDK）。
-避免引入重复功能库（例如 Gson + Moshi 同时存在）。
-移除不必要的 transitive dependencies：
implementation("com.xxx:lib") {
    exclude group: 'com.yyy', module: 'zzz'
}
```

### 2.11  APK 瘦身面试技巧（项目经验回答模板）

```
我们项目曾通过 ProGuard + App Bundle 的方式进行 APK 瘦身，从原来的 45MB 降到约 18MB。
具体做法包括： 
1）精简 so 架构为 arm64； 
2）使用 WebP 替代部分 PNG； 
3）删除了未使用资源和语言包； 
4）调整 Glide 缓存策略避免重复资源； 
并引入 R8 的 ShrinkResource 和混淆规则，最终显著减小包体体积，提升用户安装转化率。
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)