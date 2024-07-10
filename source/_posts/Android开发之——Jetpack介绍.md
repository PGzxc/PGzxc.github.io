---
title: Android开发之——Jetpack介绍
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Jetpack
abbrlink: 40ec1b68
date: 2022-11-13 17:59:25
---
## 一 概述

* 什么是Jetpack
* 为何使用Android Jetpack
* Jetpack构成

<!--more-->

## 二 什么是Jetpack

Google 官方解释:

Jetpack 是一个由多个库组成的套件，可帮助开发者遵循最佳做法，减少样板代码并编写可在各种 Android 版本和设备中一致运行的代码，让开发者精力集中编写重要的代码。

Jetpack 是 Google 为解决 Android 开发碎片化，打造成熟健康生态圈提出的战略规划，是 Google 对 Android 未来提出的发展方向，同时它也是众多优秀 Android 组件的集合。

## 三 为何使用Android Jetpack

- 遵循最佳做法：Android Jetpack 组件采用最新的设计方法构建，具有向后兼容性，可以减少崩溃和内存泄露。
- 消除样板代码：Android Jetpack 可以管理各种繁琐的 Activity（如后台任务、导航和生命周期管理），以便您可以专注于打造出色的应用。
- 减少不一致：这些库可在各种 Android 版本和设备中以一致的方式运作，助您降低复杂性。

Jetpack 的优势：

Jetpack 拥有基于生命周期感知的能力，可以减少 NPE(空指针异常) 崩溃、内存泄漏，为开发出健壮且流畅的程序提供强力保障；

Jetpack 可以消除大量重复样板式的代码，可以加速 Android 的开发进程，组件可搭配工作，也可单独使用，同时配合 Kotlin 语言特性能够显著提高工作效率；

统一开发模式，抛弃传统的 MVC, MVP；

## 四 JetPack 的构成
![][1]

Android Jetpack组件共分为四大类，Architecture、Foundation、Behavior和UI。

**Architecture(架构组件)：**
 架构组件可帮助开发者设计稳健、可测试且易维护的应用。它包含如下组件库：

- Data Binding(数据绑定)：数据绑定库是一种支持库，借助该库，可以使用声明式将布局中的界面组件绑定到应用中的数据源。
- Lifecycles：方便管理 Activity 和 Fragment 生命周期，帮助开发者书写更轻量、易于维护的代码。
- LiveData：是一个可观察的数据持有者类。与常规observable不同，LiveData是有生命周期感知的。
- Navigation：处理应用内导航所需的一切。
- Paging：帮助开发者一次加载和显示小块数据。按需加载部分数据可减少网络带宽和系统资源的使用。
- Room：Room持久性库在SQLite上提供了一个抽象层，帮助开发者更友好、流畅的访问SQLite数据库。
- ViewModel：以生命周期感知的方式存储和管理与UI相关的数据。
- WorkManager：即使应用程序退出或设备重新启动，也可以轻松地调度预期将要运行的可延迟异步任务。

**Foundation(基础组件)：**
 基础组件提供了横向功能，例如向后兼容性、测试以及Kotlin语言的支持。它包含如下组件库：

- Android KTX：Android KTX 是一组 Kotlin 扩展程序，它优化了供Kotlin使用的Jetpack和Android平台的API。以更简洁、更愉悦、更惯用的方式使用Kotlin进行Android开发。
- AppCompat：提供了一系列以AppCompat开头的API，以便兼容低版本的Android开发。
- Cars(Auto)：有助于开发 Android Auto 应用的组件，无需担心特定于车辆的硬件差异（如屏幕分辨率、软件界面、旋钮和触摸式控件）。
- Benchmark(检测)：从 Android Studio 中快速对基于 Kotlin 或 Java 的代码进行基准化分析。衡量代码性能，并将基准化分析结果输出到 Android Studio 控制台。
- Multidex(多Dex处理)：为方法数超过 64K 的应用启用多 dex 文件。
- Security(安全)：按照安全最佳做法读写加密文件和共享偏好设置。
- Test(测试)：用于单元和运行时界面测试的 Android 测试框架。
- TV：构建可让用户在大屏幕上体验沉浸式内容的应用。
- Wear OS：有助于开发 Wear 应用的组件。

**Behavior(行为)：**
 行为组件可帮助开发者的应用与标准 Android 服务（如通知、权限、分享和 Google 助理）相集成。它包含如下组件库：

- CameraX：帮助开发者简化相机应用的开发工作。它提供一致且易于使用的 API 界面，适用于大多数 Android 设备，并可向后兼容至 Android 5.0（API 级别 21）。
- DownloadManager(下载管理器)：可处理长时间运行的HTTP下载，并在出现故障或在连接更改和系统重新启动后重试下载。
- Media & playback(媒体&播放)：用于媒体播放和路由（包括 Google Cast）的向后兼容 API。
- Notifications(通知)：提供向后兼容的通知 API，支持 Wear 和 Auto。
- Permissions(权限)：用于检查和请求应用权限的兼容性 API。
- Preferences(偏好设置)：提供了用户能够改变应用的功能和行为能力。
- Sharing(共享)：提供适合应用操作栏的共享操作。
- Slices(切片)：创建可在应用外部显示应用数据的灵活界面元素。

**UI(界面组件)：**
 界面组件可提供各类view和辅助程序，让应用不仅简单易用，还能带来愉悦体验。它包含如下组件库：

- Animation & Transitions(动画&过度)：提供各类内置动画，也可以自定义动画效果。
- Emoji(表情符号)：使用户在未更新系统版本的情况下也可以使用表情符号。
- Fragment：组件化界面的基本单位。
- Layout(布局)：xml书写的界面布局或者使用Compose完成的界面。
- Palette(调色板)：从调色板中提取出有用的信息。

## 五 思维导图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-jetpack.webp
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/Jetpack-struct-image.png



