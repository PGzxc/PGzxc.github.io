---
title: Android面试题——高频面试题之基础(1)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 3ea13b1c
date: 2025-09-22 16:23:45
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二 面试要求和面试题(后续类似不再详述)

### 2.1 面试要求(技术点提取)

```
1.Java/Kotlin(各种技术,如Kotlin协程等)
2.Android四大组件：Activity、Service、BroadcastReceiver、ContentProvider
3.常用布局：linearlayout,recycleview,constraintlayout
4.View与布局： 布局优化（ConstraintLayout、include、merge、ViewStub）
5.android sdk
6.并发编程、响应式编程
7.架构设计模式: MVC/MVP/MVVM
8.组件化与模块化
9.网络通信：http/https协议，tcp/ip,websocket
10.网络请求缓存(本地+内存)
11.数据存储(Sqlite数据库)
12.打包上线流程
```

### 2.2 如何提问(注意关键词)

```
1.想谁提问：
-借助于AI：回答的精确度和准确度跟模型有关，可以多试几个或多试几次
-可以尝试的AI工具：chatgpt，gemini，grok，豆包等语言环境明确且对编程语言识别度高

2.关键词
-哪个开发语言：Android
-来自于哪里或去哪里查找：如(结合面试招聘要求和互联网分享)
-如何归纳：结合一下知识点
-如何总结：总结常见面试题并给出解答

3.结合之后的示例
-结合面试招聘要求和互联网分享，结合一下知识点，总结常见面试题并给出解答
-用适合程序员的文档整理，要求回答尽量贴近官方文档，并加以整理优化
```

### 2.3 如何处理

```
1.每个知识点
-ai会给出答案，不一定准确，可以切换ai工具或模型来提问

2.如何处理
-根据现有知识，粗读一下，判断ai给出的知识准确性和精确性及回答专业性和扩展知识点
-多问几次或重试或切换ai工具或模型，结合每次回答或综合考虑后给出结果
-最终还是要参考官方文档，搜索官方文档最终确定下来
```

## 三 面试题解答(仅供参考)

### 3.1 Java/Kotlin(各种技术,如Kotlin协程等)

面试题题型考核

```
常见面试题包括Java基础概念、
Kotlin与Java的差异，
以及协程的使用
```

1、Java 和 Kotlin 的区别是什么？为什么 Kotlin 越来越受欢迎？

```
1、区别：
Kotlin 是现代化、静态类型语言，与 Java 完全互操作。
Kotlin 提供简洁语法（数据类、空安全、扩展函数）、协程支持，减少样板代码。

2、受欢迎原因：
空安全机制避免 NullPointerException，
协程简化异步编程
语法简洁提高开发效率，Android 官方推荐。
```

2、Java中String Pool是什么？

```
String Pool 是 JVM 中的内存区域，用于存储字符串字面量以复用不可变字符串，提高内存效率。
创建字符串时会检查池中是否已有相同值，若有则直接复用
```

3、什么是 Kotlin 协程？它解决了什么问题？

```
1、定义：
协程是轻量级并发框架，支持挂起/恢复机制，运行于线程但不阻塞。

2、解决问题：
简化异步编程，消除回调地狱，提供同步风格的代码，提高可读性和维护性。

3、与线程区别：
协程更高效，内存占用低，依赖程序调度而非 OS，支持结构化并发
```

4、解释Kotlin中的suspend函数

```
1、定义：
用于协程的函数，可暂停并恢复执行，处理耗时操作（如网络请求）而不阻塞线程。

2、特点：
只能在协程或另一个 suspend 函数中调用。
```

5、Kotlin协程构建器有哪些？

```
常见构建器包括：
launch：启动“启动后并忘却”协程，返回 Job。
async：启动返回 Deferred 结果的协程。
runBlocking：阻塞当前线程，常用于测试
```

6、Kotlin如何处理空安全？

```
默认非空类型，? 表示可空（如 String?）。
使用安全调用（?.）、Elvis(/elvɪs/)操作符（?:）、非空断言（!!）避免空指针异常
```

7、协程异常传播机制？

```
父协程取消会级联取消子协程。
SupervisorJob：隔离兄弟协程，防止互相影响。
异常捕获：通过 try-catch 或 CoroutineExceptionHandler 处理。
```

### 3.2 Android四大组件：Activity、Service、BroadcastReceiver、ContentProvider

面试题题型考核

```
这些问题是面试中的核心，考察组件生命周期和交互，常结合招聘要求如理解数据共享和背景处理
```

1、什么是Activity及其生命周期？

```
1、定义：
用户交互入口，展示 UI。

2、生命周期：
onCreate（初始化）、onStart（可见）、onResume（可交互）、
onPause（部分可见）、onStop（不可见）、onDestroy（销毁）
```

2、Service的类型有哪些？

```
Foreground：前台服务，需显示通知。
Background：后台服务，受 API 限制。
Bind：绑定服务，与组件通信。用途：处理长时间任务（如音乐播放）。
```

3、Service 和 IntentService 区别？

```
1、Service：
运行于主线程，需手动创建线程。

2、IntentService：
自带工作线程，任务完成后自动停止（Android 8.0+ 限制后台执行，推荐 ForegroundService）。
```

4、BroadcastReceiver 作用与场景

```
作用：响应系统或应用广播事件（如网络变化、开机）。
类型：静态（清单注册，8.0+ 限制隐式广播）、动态（代码注册，适合局部通信）。
```

5、ContentProvider如何实现数据共享？

```
定义：管理应用间数据共享，通过 URI（如 content://authority/path/id）访问。
组件：URI、ContentResolver、Cursor、Contract 类。
用途：跨进程/跨应用共享数据（如联系人）。
```

6、四大组件如何通过Intent通信？

```
显式 Intent：指定目标组件。
隐式 Intent：指定动作，系统选择组件。
用途：启动 Activity/Service，发送广播
```

### 3.3 常用布局与优化：linearlayout,recycleview,constraintlayout

面试题题型考核：

```
布局问题是UI优化的重点，招聘常要求高效UI构建经验
```

1、LinearLayout与ConstraintLayout的区别？

```
1、LinearLayout：
线性排列子视图（水平/垂直），简单但易导致嵌套。

2、ConstraintLayout：
基于约束的灵活布局，减少嵌套，提高性能，支持链式约束
```

2、RecyclerView如何工作？

```
1、组成：
ViewHolder（复用视图）、LayoutManager（管理布局，如 Linear/Grid）、Adapter（绑定数据）。

2、优势：
比 ListView 更高效，支持大数据集
```

3、ConstraintLayout的优化优势是什么？

```
使用 Cassowary 算法，扁平化布局，减少层级嵌套，提升渲染速度
```

4、RecyclerView中DiffUtil的作用？

```
计算数据集差异，仅更新变化项，避免全量刷新，提高性能
```

### 3.4 View与布局: 布局优化(ConstraintLayout、include、merge、ViewStub)

面试题题型考核：

```
优化问题是高级话题，考察减少重绘和内存使用
```

1、include/merge/ViewStub 有什么用？

```
include：复用布局。
merge：减少层级，替换根布局。
ViewStub：按需加载，节省内存
```

2、View.GONE与View.INVISIBLE的区别？

```
GONE：隐藏且不占空间。
INVISIBLE：隐藏但保留空间。
```

3、如何优化视图树？

```
使用ConstraintLayout减少嵌套，合并布局，延迟加载ViewStub，避免过度重绘
```

### 3.5 android sdk

面试题题型考核：

```
SDK问题是基础，考察API使用和版本兼容
```

1、Android SDK的主要组成部分？

```
提供构建工具、调试工具、模拟器、平台库和文档，支持从API 1到最新
包括 adb、emulator、platform-tools。
```

2、什么是ADB？

```
Android Debug Bridge，用于设备通信，如安装APK、日志查看
```

3、SDK中dp和sp的区别？

```
dp：密度独立像素，用于布局尺寸。
sp：缩放独立像素，用于字体，适配用户偏好
```

### 3.6 并发编程、响应式编程

面试题题型考核：

```
考察异步处理，常用于网络/IO操作
```

1、什么是并发编程？在 Android 中有哪些实现方式？

```
1、并发编程指的是程序同时执行多个任务。

2、在 Android 中，常用的方式有
-Thread & Handler： 传统的线程通信方式。
-AsyncTask： 已过时，但面试仍可能问到，用于在后台执行任务并在主线程更新 UI。
-ThreadPoolExecutor： 线程池，用于管理和复用线程，避免频繁创建和销毁。
-Kotlin 协程： 目前最推荐的方式，轻量且高效，解决了回调地狱问题。
-RxJava：响应式编程，链式操作，学习成本高。
```

2、什么是响应式编程

```
1、定义：
面向数据流和变化的编程范式，数据源变化时自动通知订阅者。

2、Android 应用：
使用 RxJava 或 Kotlin Flow 处理异步数据流（如事件响应）
```

3、Kotlin Flow与协程的区别？

```
Flow：冷流，处理响应式数据序列。
协程：通用异步编程工具。
```

### 3.7 架构设计模式: MVC/MVP/MVVM

面试题题型考核：

```
架构问题是中高级，招聘强调可维护性
```

1、MVC、MVP、MVVM的区别？

```
MVC(Model-View-Controller)：View直接与Model交互，耦合度高
MVP(Presenter中介)：Presenter 解耦 View 和 Model
MVVM：ViewModel 通过数据绑定自动更新 UI，推荐用于 Android。
```

2、Android中为什么推荐MVVM？(MVVM 优势)

```
支持生命周期感知、数据绑定，适配 Jetpack 组件（如 LiveData、Room），提高测试性和可维护性
```

3、ViewModel的作用？

```
存储 UI 数据，存活于配置变化（如屏幕旋转）。
AndroidViewModel：包含 Application 上下文。
```

### 3.8 组件化与模块化

面试题题型考核：

```
考察大型App设计，常见于大厂招聘
```

1、什么是模块化？

```
将App拆分成独立模块，提高复用性和并行开发，使用AAR或动态特性模块
```

2、模块化的优势？

```
加速编译、独立测试、易维护，支持动态交付
```

3、组件化如何实现？

```
每个业务独立 Module（如登录、支付）。
公共组件（网络、数据库）抽取到 Base Module。
Router/ARouter 做模块间跳转。
```

### 3.9 网络通信：http/https协议，tcp/ip,websocket

面试题题型考核：

```
考察网络基础和实现。
```

1、TCP 和 UDP 区别？

```
TCP：面向连接，可靠传输（握手+重传）。
UDP：无连接，效率高（常用于直播、游戏）。
```

2、HTTP 和 HTTPS 区别？

```
HTTP：明文传输，安全性低。
HTTPS：基于 TLS/SSL，加密传输，支持认证、防篡改
```

3、WebSocket 特点？

```
全双工长连接。
适合实时通信（如 IM、推送）。
```

4、Android中如何实现WebSocket？

```
使用 OkHttp 或 Socket.IO 建立连接，监听事件
```

### 3.10 网络请求缓存(本地+内存)

面试题题型考核：

```
优化网络性能的问题
```

1、如何实现内存缓存？

```
使用LruCache存储Bitmap或响应，基于LRU算法自动淘汰
```

2、本地缓存策略？

```
使用DiskLruCache或Room数据库存储响应，支持过期检查
```

3、OkHttp中的缓存机制？

```
通过CacheInterceptor处理，检查Cache-Control头实现
```

4、OkHttp/Retrofit 缓存策略？

```
内存缓存：LruCache。
本地缓存：磁盘缓存（Cache-Control、ETag）。
配合 Room/SQLite 做本地持久化。
```

### 3.11 数据存储(Sqlite数据库)

面试题题型考核：

```
本地存储
```

1、在 Android 中有哪些数据存储方式？

```
Shared Preferences： 存储少量简单键值对数据。
文件存储： 存储文件数据，如图片、文本。
SQLite 数据库： 存储结构化数据，常用于存储大量复杂数据。
Room： Jetpack ORM，支持注解、LiveData、Flow
```

2、SQLite 与 Room 区别？

```
SQLite：原生 API，需手动写 SQL。
Room：封装 SQLite，提供简洁 API，支持 Jetpack 组件
```

3、如何处理SQLite事务？

```
使用beginTransaction/endTransaction确保原子操作
```

### 3.12 打包上线流程

面试题题型考核：

```
发布流程问题是实践经验考察。
```

1、一个 APK 的打包流程是怎样的？

```
资源编译： aapt 工具将资源文件（XML、图片等）编译为二进制资源文件。
代码编译： Java/Kotlin 代码被编译为字节码（.class 文件）。
DEX 转换： dx/d8 工具将字节码转换为 Dalvik/ART 虚拟机可执行的 DEX 文件。
APK 打包： 将编译好的 DEX 文件、资源、清单文件（AndroidManifest.xml）等打包成一个未签名的 APK。
签名： 使用 apksigner 对 APK 进行签名，确保应用的完整性和来源可信。
对齐优化： 使用 zipalign 工具对 APK 文件进行对齐优化，以提高运行时效率
```

2、简洁版打包流程

```
编译 → Dex → APK/AAB → 签名（V1/V2/V3） → 对齐（zipalign） → 发布
```

3、ProGuard/R8的作用？

```
代码混淆、缩小、优化，R8是默认工具，更高效
```

4、如何减少APK大小？

```
启用minify、shrinkResources，使用WebP图像，拆分模块
```

5、上线到Google Play的步骤？

```
创建开发者账号、上传AAB、设置定价、通过审核发布
```

6、APK 和 AAB 区别？

```
APK：完整安装包。
AAB：Google Play 要求，按设备动态生成 APK，减小包体积
```

