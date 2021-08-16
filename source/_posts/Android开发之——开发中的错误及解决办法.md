---
title: Android开发之——开发中的错误及解决办法
categories:
  - 开发
  - 移动开发
  - Android
tags:
  - Android
abbrlink: 13bebc71
date: 2021-05-27 16:57:01
---
## 一 概述

* 开发工具升级，依赖库，运行环境(jdk)等都会造成项目运行出现错误
* 掌握开发中常见错误现象和问题及解决办法，能节省时间
* 本文将不定期更新

<!--more-->

## 二 错误类

### 2.1 Cannot inline bytecode built with JVM target 1.8

**现象**

```
Cannot inline bytecode built with JVM target 1.8 into bytecode that is being built with JVM target
```

**解决方案**

```
android {
    ...
    compileOptions {
        sourceCompatibility = 1.8
        targetCompatibility = 1.8
    }
 
    kotlinOptions {
        jvmTarget = "1.8"
    }
}
```

### 2.2 Unable to find EOCD signature

**现象1**

```
Execution failed for task ':app:packagexxxxRelease'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.Workers$ActionFacade
   > Unable to find EOCD signature
```
**现象2**
```
Execution failed for task ':app:packageGame_ZHRelease'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.Workers$ActionFacade
   > java.lang.IllegalArgumentException (no error message)
```

**原因**

依赖中添加了有关`ABI`相关的配置，打包输出时，未指定`ABI`版本

**解决办法（添加ABI输出）**

```
import com.android.build.OutputFile

static def releaseTime() {
    return new Date().format("yyyyMMdd", TimeZone.getTimeZone("GMT+8"))
}
buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            applicationVariants.all { variant ->
                variant.outputs.all { output ->
                    project.ext { appName = 'YourApkName' }
                    outputFileName = "${appName}-${output.getFilter(OutputFile.ABI)}-${variant.name}-${variant.versionName}.apk"
                }
            }
        }
    }
```
### 2.3 failed to read PNG signature: file does not start with PNG signature
**现象**

```
AAPT: error: failed to read PNG signature: file does not start with PNG signature.
```

**解决办法**

在app/build.gradle文件中加以下代码后，重构项目

```
android {
    compileSdkVersion 28
    flavorDimensions "mode"
    aaptOptions.cruncherEnabled = false
    aaptOptions.useNewCruncher = false
    defaultConfig {
    
    }
```

## 三 警告类

### 3.1 The 'kotlin-android-extensions' Gradle plugin is deprecated

**现象**

```
The 'kotlin-android-extensions' Gradle plugin is deprecated. Please use this migration guide (https://goo.gle/kotlin-android-extensions-deprecation) to start working with View Binding (https://developer.android.com/topic/libraries/view-binding) and the 'kotlin-parcelize' plugin.
```

**解决办法**

```
删除 apply plugin: 'kotlin-android-extensions'
使用binding赋值
binding.name.text = viewModel.nameString
```

### 3.2 Warning: Mapping new ns xx/common/02 to old ns xx/common/01

**现象**

```
Warning: Mapping new ns http://schemas.android.com/repository/android/common/02 to old ns http://schemas.android.com/repository/android/common/01
Warning: Mapping new ns http://schemas.android.com/repository/android/generic/02 to old ns http://schemas.android.com/repository/android/generic/01
Warning: Mapping new ns http://schemas.android.com/sdk/android/repo/addon2/02 to old ns http://schemas.android.com/sdk/android/repo/addon2/01
Warning: Mapping new ns http://schemas.android.com/sdk/android/repo/repository2/02 to old ns http://schemas.android.com/sdk/android/repo/repository2/01
Warning: Mapping new ns http://schemas.android.com/sdk/android/repo/sys-img2/02 to old ns http://schemas.android.com/sdk/android/repo/sys-img2/01
```

**解决办法(buildToolsVersion引起-修改前)**

```
compileSdkVersion 30
buildToolsVersion "30.0.3"
```

**去掉buildToolsVersion或将buildToolsVersion版本降低**

```
compileSdkVersion 30
buildToolsVersion "30.0.2"
```

## 四 工具类

### 4.1 Task list not build

**现象**

![][41]
**解决办法**

* 点击`Task list not build`，进入`Settings——>Experimental`，将`Do not build Gradle task list duraing Gradle sync`前面的勾选去掉，并应用
* 点击`Sync Project with Gradle Files`同步一下项目


[41]:https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-android/as-task-list-not-build.png

