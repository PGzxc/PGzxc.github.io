---
title: React Native开发之——Expo android打包apk(2)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: f0459607
date: 2025-12-27 09:39:26
---
## 一 概述

```
本文介绍：
-为何不使用EAS Build生成ABI splits
-ABI splits构建方案
```

<!--more-->

## 二 为何不使用EAS Build生成ABI splits

### 2.1 说明

```
-EAS Build 默认生成 universal APK(包含所有 ABI：armeabi-v7a、arm64-v8a、x86、x86_64)
-不支持直接生成 ABI splits(单独的 per-ABI APK)。
```

### 2.2 原因

```
EAS 是托管构建，Gradle 的 ABI splits 配置需要在 native 代码中手动设置，
但 Expo managed workflow 不直接暴露。
```

## 三 ABI splits构建方案

### 3.1 生成 android目录(包含native代码)

```
npx expo prebuild --platform android
```

### 3.2 编辑 android/app/build.gradle，在 android 块中添加 splits 配置

```
android {
  // ... 其他配置
  splits {
    abi {
      reset()
      enable true
      include "armeabi-v7a", "arm64-v8a"  // 只包含需要的 ABI，排除 x86 等
      universalApk false  // 不生成通用 APK
    }
  }
  // 确保 signingConfigs 已配置你的 keystore
}
```

### 3.3 APKSplit

```
static def releaseTime() {
    return new Date().format("yyyyMMdd", TimeZone.getTimeZone("GMT+8"))
}
    
 buildTypes {
        debug {
            //applicationIdSuffix ".debug"
            minifyEnabled false
            debuggable true
            zipAlignEnabled false    // 开启ZipAlign优化
            shrinkResources false    //移除无用的资源文件
            signingConfig signingConfigs.release
            //proguardFiles fileTree(dir: "../setting/proguard", include: ["*.pro"]).asList().toArray()
        }
        release {
            minifyEnabled false
            debuggable true
            zipAlignEnabled false    // 开启ZipAlign优化
            shrinkResources false    //移除无用的资源文件
            signingConfig signingConfigs.release
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'

            //APK Split
            applicationVariants.all { variant ->
                variant.outputs.all { output ->
                    project.ext { appName = 'Live' }
                    outputFileName = "${appName}_${output.getFilter(com.android.build.OutputFile.ABI)}_V${variant.versionCode}.apk"
                }
            }
        }
    }
```

### 3.4 配置签名：在 android/gradle.properties 添加

```
MYAPP_RELEASE_STORE_FILE=my-upload-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

### 3.5 本地构建(需 Android Studio 或 Gradle)：

```
cd android
./gradlew assembleRelease  // 输出多个 APK 到 android/app/build/outputs/apk/release/
```

### 3.6 输出

```
这会生成如 app-armeabi-v7a-release.apk 和 app-arm64-v8a-release.apk 等文件，已签名
```

## 四 使用 AAB + Google Play

```
如果目标是 Google Play 发布，配置 buildType: "aab"(默认)，
Google 会自动生成 per-ABI APK。

无需手动 splits
```

## 五 参考

* [Expo 文档 EAS JSON 配置](https://docs.expo.dev/build/eas-json/)
* [Android 构建](https://docs.expo.dev/build-reference/android-builds/)