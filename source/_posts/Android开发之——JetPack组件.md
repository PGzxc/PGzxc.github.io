---
title: Android开发之——JetPack组件
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - JetPack
abbrlink: 620b2d3d
date: 2019-09-02 21:50:50
---
## 一 [什么是JetPack][1]
Jetpack 是一套库、工具和指南，可帮助开发者更轻松地编写优质应用。这些组件可帮助您遵循最佳做法、让您摆脱编写样板代码的工作并简化复杂任务，以便您将精力集中放在所需的代码上。


Jetpack 包含与平台 API 解除捆绑的 androidx.* 软件包库。这意味着，它可以提供向后兼容性，且比 Android 平台的更新频率更高，以此确保您始终可以获取最新且最好的 Jetpack 组件版本。

<!--more-->

## 二 Android JetPack发展历程
* Google在17年的I/O大会上推出了架构组件(Architecture Component)工具集
* 随后在18年I/O大会上发布了 Android Jetpack ，Jetpack 是Android开发组件工具集，旨在帮助我们轻松构建更稳定、更健壮、以及更可维护的应用程序

## 三 Android JetPack 组成
### 3.1 JetPack 组成

![][2]     
 
* Jetpack主要分为4个部分， 基础、架构、行为、界面 。   
* 从图中得知，Jetpack并不全是些新东西，只要是能够帮助开发者更好更方便地构建应用程序的组件，Google都将其归纳入了Jetpack
* 每个 Jetpack 组件均可单独采用，并且它们依然可以流畅地协作


### 3.2 [AndroidX][3] 
紧接着Google推出 AndroidX ，将许多Google认为是正确的方案和实践集中起来    

* AndroidX 是对support library的重大改进
* AndroidX中的所有软件包名都以字符串androidx.开头，位于一致的命名空间中
* 与support支持库不同，AndroidX软件包可单独维护和更新
* 所有新的支持库开发都将在AndroidX库中进行


### 3.3 JetPack(基础)
#### 3.3.1 概念
 基础组件，向后兼容性，测试，Kotlin 语言支持
#### 3.3.2 组成
1. Android KTX——Kotlin的扩展支持库
2. AppCompat——功能支持库(核心平台功能提供向后兼容的实现。扩展类的早期版本，以处理在较新版本的平台中添加的新方法和功能)
3. Auto——构建生态系统(车辆音频应用、即时通讯)
4. 检测(Benchmark)——从 Android Studio 中快速检测基于 Kotlin 或 Java 的代码
5. 多Dex处理(Multidex)——为具有多个 DEX 文件的应用提供支持
6. 安全(Security)——按照安全最佳做法读写加密文件和共享偏好设置
7. 测试(Test)——用于单元和运行时界面测试的 Android 测试框架
8. TV——用于开发 Android TV 应用的组件
9. Wear OS——开发 Wear 应用的组件


### 3.4 JetPack(架构)
#### 3.4.1 概念
架构组件可帮助您设计稳健、可测试且易维护的应用。
#### 3.4.2 组成
1. 数据绑定(Data Binding)——以声明方式将可观察数据绑定到界面元素
2. Lifecycles——管理您的 Activity 和 Fragment 生命周期
3. LiveData——在底层数据库更改时通知视图
4. Navigation——处理应用内导航所需的一切
5. Paging——逐步从您的数据源按需加载信息
6. Room——流畅地访问 SQLite 数据库
7. ViewModel——以注重生命周期的方式管理界面相关的数据
8. WorkManager——管理您的 Android 后台作业

### 3.5 JetPack(行为)
#### 3.5.1 概念
行为组件可帮助您的应用与标准 Android 服务（如通知、权限、分享和 Google 助理）相集成。
#### 3.5.2 组成
1. CameraX——轻松地向应用中添加相机功能
2. 下载管理器(Download manager)——安排和管理大量下载任务
3. 媒体和播放(Media&Playback)——用于媒体播放和路由（包括 Google Cast）的向后兼容 API
4. 通知(Notifications)——提供向后兼容的通知 API，支持 Wear 和 Auto
5. 权限(Permissions)——用于检查和请求应用权限的兼容性 API
6. 偏好设置(Preferences)——创建交互式设置屏幕
7. 共享(Sharing)——提供适合应用操作栏的共享操作
8. 切片(Slices)——创建可在应用外部显示应用数据的灵活界面元素

### 3.6 JetPack(界面)
#### 3.6.1 概念
界面组件可提供微件和辅助程序，让您的应用不仅简单易用，还能带来愉悦体验。了解有助于简化界面开发的 [Jetpack Compose][4]
#### 3.6.2 组成
1. 动画和过渡(Animations and Transitions)——动画，界面转场等
2. 表情符号(Emoji)——在旧版平台上启用最新的表情符号字体
3. Fragment——组件化界面的基本单位
4. 布局(Layout)——基础概念
5. 调色板(Palette)——从调色板中提取出有用的信息




[1]: https://developer.android.google.cn/jetpack
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-jetpack-composition.png
[3]: https://developer.android.google.cn/jetpack/androidx
[4]: https://developer.android.google.cn/jetpack/compose/