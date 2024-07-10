---
title: Compose Multiplatform开发之——环境搭建(1)
categories:
  - 开发
  - F-跨平台
  - Compose Multiplatform
tags:
  - Compose Multiplatform
abbrlink: 7a07b9d8
date: 2023-08-01 11:13:00
---
## 一 概述

* 开发条件
* 编译环境
* IDE及插件安装
* 项目创建
* 项目运行(安卓+iOS)

<!--more-->

## 二 开发条件

* macOS：13.4.1
* Xcode：14.3.1
* Android Studio：Android Studio Flamingo|2022.2.1 Patch2
* [Kotlin多平台手机插件：0.6.1(222)-14](https://plugins.jetbrains.com/plugin/14936-kotlin-multiplatform-mobile/versions/stable)
* CocoaPods依赖管理器(Ruby)

## 三 编译环境

### 3.1 编译环境

* Homebrew：Homebrew 4.0.28-28-gb0d3863(brew -v)
* Ruby：ruby 3.2.2 (2023-03-30 revision e51014f9c0) [x86_64-darwin22]. (Ruby -v)

### 3.2 检查环境

在开始之前，请使用[KDoctor](https://link.zhihu.com/?target=https%3A//github.com/Kotlin/kdoctor)工具确保您的开发环境配置正确：

#### [使用Homebrew](https://link.zhihu.com/?target=https%3A//brew.sh/)安装 KDoctor

```
brew install kdoctor
```

#### 在终端中运行 KDoctor

```
kdoctor
```

如果一切设置正确，您将看到如下输出

```
macbook-pro-zxc:iosApp zxc$ kdoctor
Environment diagnose (to see all details, use -v option):
[✓] Operation System
[✓] Java
[✓] Android Studio
[✓] Xcode
[✓] Cocoapods

Conclusion:
  ✓ Your system is ready for Kotlin Multiplatform Mobile Development!
```

## 四 IDE及插件安装

### 4.1 开发工具IDE

Android Studio

### 4.2 插件—Kotlin Multiplatform Mobile

在插件市场，搜索`Kotlin Multiplatform Mobile`进行安装

![][1]

## 五 项目创建

### 5.1 项目创建

1-在Android Studio中新建项目，选择kotlin multiplatform app

![][2]

2-创建应用，填写kotlin multiplatform app信息(项目名、包名及保存位置)

![][3]

3-填写安卓名称、iOS名称、Shared共享Module名称

![][4]

### 5.2 项目目录结构

项目目录结果如下图所示

![][5]

Compose Multiplatform 项目包括三个模块

#### shared


这是一个 Kotlin 模块，包含 Android 和 iOS 应用程序通用的逻辑，即您在平台之间共享的代码

该`shared`模块也是您编写 Compose Multiplatform 代码的地方。在`shared/src/commonMain/kotlin/Greeting.kt` 中，您可以找到适用于您的应用程序的共享`@Composable`功能。

它使用 Gradle 作为构建系统。您可以在该shared模块中的`shared/build.gradle.kts` 构建一个 Android 库和一个 iOS 框架。

![][6]

#### androidApp

这是一个构建到 Android 应用程序中的 Kotlin 模块。它使用 Gradle 作为构建系统。该`androidApp`模块依赖于`shared`模块并将其用作常规 Android 库。

![][7]

#### iosApp

这是一个构建到 iOS 应用程序中的 Xcode 项目。它依赖并使用`shared`模块作为 CocoaPods 依赖项。

![][8]

## 六 项目运行(安卓+iOS)

| 安卓   |   iOS   |
| ------ | :-----: |
| ![][9] | ![][10] |

## 七 参考

* [compose-multiplatform官网](https://www.jetbrains.com/lp/compose-multiplatform/)
* [Moko](https://moko.icerock.dev/)
* [Ktor](https://ktor.io/)
* [Voyager](https://voyager.adriel.cafe/)
* [SQLDelight](https://cashapp.github.io/sqldelight/2.0.0/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-compose-multiplatform/compose-multiplatform-plugin-kotlin-01.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-compose-multiplatform/compose-multiplatform-create-choice-01.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-compose-multiplatform/compose-multiplatform-create-android-01.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-compose-multiplatform/compose-multiplatform-create-multiapp-info2-01.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-compose-multiplatform/compose-multiplatform-struct-project-view-01.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-compose-multiplatform/compose-multiplatform-struct-shared-view-01.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-compose-multiplatform/compose-multiplatform-struct-android-view-01.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-compose-multiplatform/compose-multiplatform-struct-ios-view-01.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-compose-multiplatform/compose-multiplatform-android-view-01.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-compose-multiplatform/compose-multiplatform-ios-view-01.png