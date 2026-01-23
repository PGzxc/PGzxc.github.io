---
title: Android面试题——掘金-性能优化之启动优化相关面试题(4.2)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: fd7d6d5
date: 2025-04-07 10:05:04
---
## 一 概述

```
1.如何减少 Application#onCreate() 的启动时间？
2.Jetpack App Startup 的作用是什么？
3.如何避免多进程重复初始化？
4.为什么多进程会导致 Application#onCreate() 运行多次？
5.如何判断当前进程是否是主进程？/如何避免非主进程重复初始化SDK？/如何在多进程架构下高效管理组件初始化？
6.为什么 Application.getProcessName() 比 ActivityManager 更推荐？
7.如何使用 ContentProvider 避免多进程重复初始化？
8.Application#getProcessName() 和 ContentProvider 方案，哪个更好？
9.为什么 ContentProvider 只会初始化一次？
10.ContentProvider 为什么会导致 Application 过早初始化？
11.如果一个 SDK 需要在 :push 进程初始化，该怎么做？
12.如何使用 WorkManager 延迟任务？
13.如何监控 Application#onCreate() 的耗时？/怎么测量应用启动时间？
14.如何减少数据库 / 文件 IO 操作对启动的影响？
15.如何让冷启动时间小于 1s？
16.View 渲染慢的原因？如何优化？
17.RecyclerView 如何优化初始化速度？
18.SharedPreferences 为什么慢？如何优化？
19.冷启动、热启动、温启动的区别？
20.优化布局层级的方法有哪些？
21.如何优化 Dex 加载？
22.数据库操作如何优化启动时间？
23.如何减少首次启动的白屏时间
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 如何减少 Application#onCreate() 的启动时间？

```
减少 Application#onCreate() 的启动时间是 优化应用冷启动 的关键。
以下是 最佳优化方案：

1. 延迟初始化（Lazy Initialization）
问题：
Application#onCreate() 初始化 SDK、数据库、日志等过多，阻塞主线程，导致冷启动变慢。
优化方案
-只初始化必须的组件，将 非必要初始化推迟 到 后台任务 或 首屏加载后
示例：使用 Coroutine 异步初始化
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        // 必须的初始化（同步）
        initCrashHandler()
        
        // 延迟初始化（异步）
        GlobalScope.launch(Dispatchers.IO) {
            initSDKs()
            initDatabase()
        }
    }
}
-非必须 SDK、数据库等放到 Coroutine 的 IO 线程，减少主线程阻塞

2. 使用 Jetpack App Startup
问题：
手动管理初始化逻辑复杂，可能影响主线程。
优化方案：
-使用 Jetpack Startup 让 非必须初始化 延迟加载：
dependencies {
    implementation "androidx.startup:startup-runtime:1.1.1"
}
class MyInitializer : Initializer<Unit> {
    override fun create(context: Context) {
        SDKManager.init(context) // 延迟初始化 SDK
    }
    override fun dependencies(): List<Class<out Initializer<*>>> = emptyList()
}
-系统自动优化初始化顺序，减少 Application#onCreate() 的压力。

3. 只在主进程初始化
问题：
Application#onCreate() 在 每个进程 都会调用，导致 无用的初始化。
优化方案：
-只在主进程初始化，避免 无关进程 的 Application#onCreate() 被调用：
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        if (!isMainProcess()) return  // 只在主进程初始化

        initMainProcess()
    }

    private fun isMainProcess(): Boolean {
        val pid = Process.myPid()
        val processName = getProcessNameByPid(pid)
        return processName == packageName
    }

    private fun getProcessNameByPid(pid: Int): String? {
        return ActivityManager.RunningAppProcessInfo().apply {
            Process.getProcessNameByPid(pid)
        }?.processName
    }
}
-避免无用的 SDK / 数据库 初始化，提高主线程性能。

4. 使用 WorkManager 延迟后台任务
问题：
部分初始化任务 必须执行，但不影响 UI，可以 后台执行。

优化方案：
-使用 WorkManager 进行后台初始化：
class InitWorker(appContext: Context, workerParams: WorkerParameters) : Worker(appContext, workerParams) {
    override fun doWork(): Result {
        initHeavyTasks()  // 初始化数据库 / SDK
        return Result.success()
    }
}
val request = OneTimeWorkRequestBuilder<InitWorker>().build()
WorkManager.getInstance(context).enqueue(request)
-不影响主线程启动，提高流畅度！

5. 避免主线程 I/O 操作
问题：
在 Application#onCreate() 进行磁盘 I/O（数据库、文件） 会 严重拖慢启动速度。

优化方案：
-异步加载数据库 / 文件，避免阻塞主线程：
GlobalScope.launch(Dispatchers.IO) {
    database = Room.databaseBuilder(
        context,
        MyDatabase::class.java, "database-name"
    ).build()
}
-使用 MMKV 替代 SharedPreferences，提升读取性能：
val mmkv = MMKV.defaultMMKV()
mmkv.putString("key", "value")

6. 预加载 View，减少 Activity#onCreate() 负担
问题：
Activity 创建时需要解析 XML，导致 UI 渲染变慢。

优化方案：
-使用 AsyncLayoutInflater 提前渲染：
AsyncLayoutInflater(this).inflate(R.layout.activity_main, null) { view, _, _ ->
    setContentView(view)
}
-避免过深的 View 层级，优化 ConstraintLayout。

7. 监控 Application 启动时间
-使用 Choreographer 监控主线程耗时
Choreographer.getInstance().postFrameCallback { frameTimeNanos ->
    val elapsedTime = System.nanoTime() - frameTimeNanos
    Log.d("Startup Time", "Main thread blocked: ${elapsedTime / 1_000_000} ms")
}
-分析 Trace 结果，找出耗时函数
adb shell am start -S -W com.example.app
```

### 2.2 Jetpack App Startup 的作用是什么？

```
Jetpack App Startup 是 Android Jetpack 提供的 轻量级初始化管理框架，
用于 优化应用启动性能，解决 Application#onCreate() 过载的问题。
```

1-为什么需要 Jetpack App Startup？

```
问题：Application#onCreate() 初始化太多，导致启动慢
通常在 Application#onCreate() 里，我们会初始化多个 SDK：
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        SDK1.init(this)
        SDK2.init(this)
        SDK3.init(this)
        SDK4.init(this)
    }
}

问题：
-主线程阻塞：所有 SDK 同时初始化，影响应用启动速度。
-初始化顺序难以管理：某些 SDK 依赖另一个 SDK 先初始化，手动管理难度大。
-所有 SDK 在 Application#onCreate() 初始化，导致 冷启动变慢。

解决方案：使用 Jetpack App Startup 统一管理初始化
-替代 Application#onCreate() 初始化
-延迟加载（Lazy Initialization）
-自动管理依赖关系
-支持并行初始化，提高启动速度
```

2-Jetpack App Startup 工作原理

```
App Startup 通过 ContentProvider 机制 让 Android 自动管理初始化，无需手动在 Application#onCreate() 里初始化。

主要概念
-Initializer：自定义初始化器，定义 SDK 的初始化逻辑。
-dependencies()：声明当前 SDK 的 依赖，让 App Startup 按顺序初始化。
-AndroidManifest.xml：系统会自动查找 App Startup 的 ContentProvider 并执行初始化。
```

3-如何使用 Jetpack App Startup？

```
(1) 添加依赖
dependencies {
    implementation "androidx.startup:startup-runtime:1.1.1"
}

(2) 创建 SDK 初始化器：创建 MySDKInitializer 继承 Initializer<T>
class MySDKInitializer : Initializer<MySDK> {
    
    override fun create(context: Context): MySDK {
        Log.d("AppStartup", "MySDK 初始化")
        return MySDK().apply { init(context) }
    }

    override fun dependencies(): List<Class<out Initializer<*>>> {
        return emptyList()  // 没有依赖项
    }
}
说明
-create()：定义初始化逻辑。
-dependencies()：返回 依赖的初始化器（若当前 SDK 依赖另一个 SDK，App Startup 会自动管理顺序）。

(3) 多个 SDK 依赖管理：如果 SDK2 依赖 SDK1 先初始化
class SDK2Initializer : Initializer<SDK2> {
    override fun create(context: Context): SDK2 {
        Log.d("AppStartup", "SDK2 初始化")
        return SDK2().apply { init(context) }
    }

    override fun dependencies(): List<Class<out Initializer<*>>> {
        return listOf(SDK1Initializer::class.java)  // 依赖 SDK1
    }
}
这样，App Startup 会确保 SDK1 先初始化，然后才初始化 SDK2

(4) 关闭某些自动初始化
如果某些 SDK 不需要 App Startup 自动初始化，可以在 AndroidManifest.xml 禁用
<meta-data 
    android:name="com.example.MySDKInitializer"
    android:value="false" />
这样，MySDKInitializer 就不会自动初始化，我们可以手动调用 MySDK.init()。
```

4-Jetpack App Startup 的优势

```
✅ 自动管理 SDK 初始化，减少 Application#onCreate() 负担
✅ 按依赖顺序初始化 SDK，避免手动管理初始化逻辑
✅ 支持并行初始化，提高启动速度
✅ 可以禁用不必要的初始化，提升性能
```

5-Jetpack App Startup 相关面试题

```
Jetpack App Startup 的作用是什么？
如何使用 App Startup 初始化 SDK？
如何管理 SDK 依赖关系？
如何关闭某些 SDK 的自动初始化？
App Startup 如何提高应用启动速度？
```

### 2.3 如何避免多进程重复初始化？

```
1. 问题背景
在 Android 中，每个进程都会调用Application#onCreate()，如果应用使用了多进程（MultiProcess），
例如：
-后台进程（:remote）：用于 后台任务、AIDL 服务。
-WebView 进程（:web）：用于 独立 WebView 进程。
-Push 进程（:push）：用于 推送服务。
-IM 进程（:im）：用于 即时通讯（IM）服务。

问题：
-多个进程重复初始化 SDK、数据库、日志、缓存，导致 内存浪费、CPU 过载、启动变慢！
-可能导致 SDK 初始化冲突（如 第三方推送 SDK 只需在主进程初始化）。

2. 解决方案
-方法一：判断是否为主进程，避免非主进程初始化
-方法二：使用 ContentProvider 延迟进程初始化
-方法三：Jetpack App Startup 自动管理进程初始化
```

### 2.4 为什么多进程会导致 Application#onCreate() 运行多次？

```
-每个进程都是独立的：
即使是同一个应用的不同进程，
它们各自都有独立的内存空间和虚拟机实例，并且彼此之间并不共享Application类的实例。

-每个进程都会初始化自己的 Application 类：
每个进程启动时，系统会创建一个新的 Application 实例并调用其 onCreate() 方法，初始化应用需要的资源。
```

### 2.5 如何判断当前进程是否是主进程？/如何避免非主进程重复初始化SDK？/如何在多进程架构下高效管理组件初始化？

```
方法 1：使用 Application.getProcessName()（API 28+ 推荐）
优点： 
-统方法，性能较优
-适用于 API 28+
缺点： 仅支持 Android 9 及以上（Android 8 及以下不可用）

方法 2：使用 ActivityManager 获取当前进程名
这种方法兼容 所有 Android 版本，通过 ActivityManager 遍历所有进程，找到与当前 PID 匹配的进程名。
优点： 
-兼容所有 Android 版本
无需额外权限
缺点： 
ActivityManager.getRunningAppProcesses() 可能在 Android 10+ 被限制（某些设备会返回 null）

方法 3：读取 /proc/self/cmdline（高效）
Android 系统的 /proc/self/cmdline 文件记录了当前进程的名称，可以直接读取。
优点： 
-兼容所有 Android 版本
-系统级 API，无需 ActivityManager
缺点：需要文件 IO 操作，但开销很小

方法 4：使用 ApplicationInfo.processName（Android 10+）
在 Android 10（API 29）及以上，可以直接通过 ApplicationInfo.processName 获取进程名称。
优点： 
-官方推荐，高效
-适用于 Android 10 及以上
缺点： 低版本 Android 不支持
```

2-综合比较

|             方法             | 适用范围 |         兼容性          | 性能  |      备注      |
| :--------------------------: | :------: | :---------------------: | :---: | :------------: |
| Application.getProcessName() | API 28+  |       Android 9+        | ⭐⭐⭐⭐  | 官方 API，推荐 |
|       ActivityManager        |  全版本  |  Android 10+ 可能失效   |  ⭐⭐⭐  | 可能受系统限制 |
|      /proc/self/cmdline      |  全版本  | 适用于所有 Android 版本 | ⭐⭐⭐⭐  | 轻量级文件读取 |
| ApplicationInfo.processName  | API 29+  |       Android 10+       | ⭐⭐⭐⭐⭐ | 高效，官方 API |

### 2.6 为什么 Application.getProcessName() 比 ActivityManager 更推荐？

```
-Application.getProcessName() 是 系统 API，性能更优，不会涉及 遍历所有进程 和 IPC 调用，更加高效。

-ActivityManager#getRunningAppProcesses() 可能受权限限制，
在 Android 10 之后可能返回 null，且 查询所有进程有性能损耗。
```

### 2.7 如何使用 ContentProvider 避免多进程重复初始化？

```
ContentProvider 在 Application#onCreate() 之前执行，
可以在这里判断进程，仅在主进程初始化组件，避免多进程重复执行 Application#onCreate()。
```

### 2.8 Application#getProcessName() 和 ContentProvider 方案，哪个更好？

```
ContentProvider 方案更好，因为它 自动触发，避免 Application#onCreate() 代码膨胀。Application#getProcessName() 仍然需要手动判断进程。
```

### 2.9 为什么 ContentProvider 只会初始化一次？

```
因为 ContentProvider 只有在 声明的进程 中初始化，
而 Application#onCreate() 在所有进程都会调用，所以 ContentProvider 更适合避免多进程重复初始化
```

### 2.10 ContentProvider 为什么会导致 Application 过早初始化？

```
-ContentProvider 会在 Application#onCreate() 之前执行，导致 Application 过早初始化。
-如果 ContentProvider 在 非主进程 被访问，也会导致 整个 Application 过早初始化。
```

### 2.11 如果一个 SDK 需要在 :push 进程初始化，该怎么做？

```
1.说明
在 Android 多进程架构中，可能会有多个进程，且不同的进程可能会有不同的初始化需求。
假如某个 SDK 需要在特定的进程（例如 :push 进程）中进行初始化，
那么我们可以通过以下步骤确保该 SDK 仅在 :push 进程中初始化，避免在其他进程（如主进程）重复初始化。

2.步骤
2.1  使用 android:process 指定进程
<service
    android:name=".PushService"
    android:process=":push" /> <!-- 指定推送服务运行在 :push 进程 -->
2.2 在 :push 进程中初始化 SDK
class PushService : Service() {
    override fun onCreate() {
        super.onCreate()
        // 判断是否在指定的 :push 进程中
        if (Application.getProcessName() == ":push") {
            initializePushSDK()
        }
    }
    private fun initializePushSDK() {
        // 在 :push 进程中初始化推送 SDK
        PushSDK.initialize(applicationContext)
    }
    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}

2.3  在 :push 进程中初始化 ContentProvider
<provider
    android:name=".PushContentProvider"
    android:authorities="com.example.push.provider"
    android:process=":push" /> <!-- 使 ContentProvider 只在 :push 进程中运行 -->
```

### 2.12 如何使用 WorkManager 延迟任务？

```
1.说明
要使用 WorkManager 实现延迟任务，
可以借助 OneTimeWorkRequest 搭配 setInitialDelay() 方法，来指定任务延迟执行的时间。

2.步骤
2.1 添加依赖（如果尚未添加）
implementation "androidx.work:work-runtime-ktx:2.9.0" // 版本视情况而定

2.2 创建你的任务（Worker）
class MyDelayedWorker(context: Context, params: WorkerParameters) : Worker(context, params) {
    override fun doWork(): Result {
        // 你的延迟任务逻辑
        Log.d("MyDelayedWorker", "延迟任务执行了")
        return Result.success()
    }
}

2.3 构建延迟任务请求
val request = OneTimeWorkRequestBuilder<MyDelayedWorker>()
    .setInitialDelay(15, TimeUnit.MINUTES) // 延迟15分钟执行
    .build()
    
2.4 将任务提交给 WorkManager
WorkManager.getInstance(context).enqueue(request)
```

### 2.13 如何监控 Application#onCreate() 的耗时？/怎么测量应用启动时间？

```
1.方法一：直接在 Application 中打时间戳
class MyApp : Application() {
    override fun onCreate() {
        val start = System.currentTimeMillis()
        super.onCreate()
        // 你自己的初始化逻辑
        initSdkA()
        initLogger()
        initDatabase()

        val end = System.currentTimeMillis()
        Log.d("AppStartTime", "Application#onCreate() cost: ${end - start} ms")
    }
}

2.方法二：拆解每一段初始化逻辑：有时候总耗时不重要，更重要的是“哪个步骤最慢”，可以分段记录
override fun onCreate() {
    val t0 = System.currentTimeMillis()

    initLogger()
    val t1 = System.currentTimeMillis()
    Log.d("AppStart", "initLogger 耗时: ${t1 - t0}ms")

    initSdk()
    val t2 = System.currentTimeMillis()
    Log.d("AppStart", "initSdk 耗时: ${t2 - t1}ms")

    initDatabase()
    val t3 = System.currentTimeMillis()
    Log.d("AppStart", "initDatabase 耗时: ${t3 - t2}ms")

    Log.d("AppStart", "总耗时: ${t3 - t0}ms")
}

3.方法三：使用 AppStartTrace 工具（推荐在调试版使用）
Google 提供了 Jetpack 的 Startup 库，可以结合 StartupTimingLogger 查看初始化耗时。
override fun onCreate() {
    StartUpProfiler.start("onCreate")
    StartUpProfiler.start("initLog")
    initLog()
    StartUpProfiler.start("initSDK")
    initSDK()
    StartUpProfiler.start("initDb")
    initDb()
    StartUpProfiler.dump()
}

4.方法四：结合 Systrace、TraceView 等官方工具
工具	                    用途
Systrace	            记录 App 启动全流程（包括系统调用、Activity 启动）
TraceView / Perfetto	更精细地分析 Java 方法的调用耗时
Android Studio Profiler	实时查看启动耗时、CPU、内存、线程情况
```

2-表格

|             方法             |         适用场景         |
| :--------------------------: | :----------------------: |
|  System.currentTimeMillis()  |  本地开发调试，快速定位  |
|           分段打点           |   精准找出“哪段最耗时”   |
| AppStartTrace / 自定义记录器 | 结构化、可复用的统计方式 |
|  Systrace / Studio Profiler  |   专业分析、可视化调试   |
|     Matrix / BlockCanary     |   线上监控、无侵入埋点   |

### 2.14 如何减少数据库 / 文件 IO 操作对启动的影响？

```
-减少数据库依赖：用 MMKV / DataStore 缓存用户数据。
-数据库 IO 放后台：使用 CoroutineScope(Dispatchers.IO) 处理数据库操作。
-文件 IO 最小化：用 okio + Coroutine 异步加载文件。
-延迟初始化：Lazy + WorkManager 让非必要数据稍后加载
```

### 2.15 如何让冷启动时间小于 1s？

```
1.分析
让 Android 冷启动时间小于 1s，需要从 布局优化、IO 操作、线程管理、初始化策略 等多个方面入手。
冷启动时间通常包括 Application 初始化、Activity 启动、首帧渲染 这几个阶段，因此需要全链路优化。

2.冷启动优化核心思路
-避免主线程阻塞（如 IO、数据库、网络请求）。
-减少 Application 和 Activity 初始化的开销。
-优化布局，减少 View 层级，提高渲染速度。
-使用异步任务、懒加载、按需初始化。
-利用预渲染（Warm Start）、Splash 预加载等技巧。

3.实现
3.1 Application 优化：减少 onCreate() 耗时
问题：Application#onCreate() 里初始化太多内容，会直接拖慢冷启动
解决方案：
-避免在 onCreate() 里执行数据库查询、文件 IO、SDK 初始化。
-使用 WorkManager / 启动框架 (App Startup) 延迟初始化。
-使用懒加载 (lazy) 只在需要时才初始化。
示例：懒加载全局对象
val database by lazy { 
    Room.databaseBuilder(context, MyDatabase::class.java, "app.db").build() 
}
示例：使用 WorkManager 在后台初始化
val workRequest = OneTimeWorkRequestBuilder<InitSdkWorker>().build()
WorkManager.getInstance(context).enqueue(workRequest)

3.2 Activity 启动优化
问题：Activity onCreate() 里执行了太多逻辑，导致 setContentView() 之前的时间过长。
解决方案：
-延迟非必要初始化（如 ViewModel、网络请求）。
-使用 SplashScreen API 预加载数据（Android 12+）。
-避免主线程做 IO 操作（如 SharedPreferences 读取）
示例：使用 SplashScreen 预加载数据
override fun onCreate(savedInstanceState: Bundle?) {
    val splashScreen = installSplashScreen() // 适用于 Android 12+
    super.onCreate(savedInstanceState)

    CoroutineScope(Dispatchers.IO).launch {
        preLoadData()
    }
}

3.3 布局优化
问题：XML 层级过深，导致 setContentView() 耗时过长，影响首帧渲染速度。
解决方案：
-避免过深的 View 层级（使用 ConstraintLayout 代替嵌套 LinearLayout）。
-减少 RelativeLayout 嵌套，减少 wrap_content 导致的多次测量。
-使用 ViewStub / include 进行延迟加载。
示例：用 ViewStub 代替复杂布局
<ViewStub
    android:id="@+id/largeView"
    android:layout="@layout/large_layout"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"/>
findViewById<ViewStub>(R.id.largeView).inflate()
好处：这样 large_layout.xml 只有在需要时才会加载，避免启动时的额外开销。

3.4 资源加载优化
问题：启动时加载大图、解析 JSON、读取数据库，会导致界面卡顿。
解决方案：
-避免 Bitmap 解码阻塞主线程（用 Glide/Picasso）。
-预加载关键数据，减少 onCreate() 的数据查询时间。
-使用 MMKV/DataStore 代替 SharedPreferences，提高读写效率。
示例：使用 Glide 预加载图片
Glide.with(this)
    .load(url)
    .diskCacheStrategy(DiskCacheStrategy.ALL)
    .preload()

3.5 线程优化
问题：太多任务在主线程执行，导致 UI 线程阻塞。
解决方案：
-把 IO 密集型任务放到 Dispatchers.IO 执行。
-使用 HandlerThread 处理后台任务。
-尽量避免 runBlocking {} 在主线程运行。
示例：用 Coroutine 处理数据库 IO
CoroutineScope(Dispatchers.IO).launch {
    val user = database.userDao().getUserById(1)
    withContext(Dispatchers.Main) {
        textView.text = user.name
    }
}

3.6 使用 Jetpack App Startup 进行组件按需初始化
问题：太多 SDK 在 Application#onCreate() 里同步初始化，影响启动时间。
解决方案：
使用 App Startup 让 SDK 只在需要时初始化。
示例：用 App Startup 进行初始化
 class MyInitializer : Initializer<ExampleSDK> {
    override fun create(context: Context): ExampleSDK {
        return ExampleSDK.init(context)
    }

    override fun dependencies(): List<Class<out Initializer<*>>> = emptyList()
}
在 AndroidManifest.xml 里：
<meta-data
    android:name="com.example.MyInitializer"
    android:value="androidx.startup" />
好处：只有在真正需要 ExampleSDK 时才初始化，而不是一启动就加载。

3.7 预加载策略
问题：冷启动时数据未准备好，导致 UI 需要等待加载。
解决方案：
-利用 SplashScreen 预加载，减少 onCreate() 的初始化压力。
-使用 Warm Start 方案，让应用在后台存活更久。
-使用 ShortcutManager 让 App 直接启动目标页面
示例：使用 Warm Start 让 App 在后台存活
override fun onTaskRemoved(rootIntent: Intent?) {
    val restartService = Intent(applicationContext, MyService::class.java)
    startService(restartService)
}
```

2-最终优化策略总结

|     优化点      |                 方案                 |   收益   |
| :-------------: | :----------------------------------: | :------: |
|   Application   | 避免在 `onCreate()` 里执行重 IO 任务 | 50-200ms |
|    Activity     |   延迟初始化 & 使用 `SplashScreen`   | 50-150ms |
|    布局优化     | 使用 `ConstraintLayout`、`ViewStub`  | 30-100ms |
|    资源优化     |    避免大图加载 & 使用 MMKV 缓存     | 30-80ms  |
|    线程优化     |   把 IO 操作放到 `Dispatchers.IO`    | 50-150ms |
| Jetpack Startup |            组件按需初始化            | 50-200ms |
|   预加载策略    |     SplashScreen` + `Warm Start      | 50-100ms |

3-目标：冷启动小于 1s

```
-首帧渲染时间 < 500ms（减少 View 层级，优化 setContentView()）。
-Application onCreate() 耗时 < 200ms（避免主线程 IO，使用 WorkManager）。
-Activity onCreate() 耗时 < 300ms（懒加载、延迟初始化）
```

### 2.16 View 渲染慢的原因？如何优化？

```
View 渲染慢，通常是 Android 页面加载、首帧慢、卡顿、掉帧的根本原因之一。
想搞清楚它为什么慢，就得从 View 的渲染流程 和 影响渲染的关键因素 下手。

一、View 渲染慢的常见原因
Android UI 渲染主要分为 三大阶段：
measure（测量） → layout（布局） → draw（绘制）
渲染慢，通常就是因为以下几点

1.1 布局层级过深 / 嵌套太多
-使用了多个嵌套的 LinearLayout / RelativeLayout。
-wrap_content 滥用，导致多次 measure。
-使用复杂的嵌套 RecyclerView、NestedScrollView。
现象：大量 measure/layout/draw 调用，甚至超过 16ms 导致掉帧。

1.2 布局过度绘制（Overdraw）
-同一像素点被多个 View 多次绘制。
-背景、阴影、圆角、半透明等叠加造成浪费。
现象：手机卡顿、界面变得“粘重”。

1.3 大图加载阻塞主线程
-BitmapFactory.decode...() 在主线程执行。
-不合理使用 ImageView.setImageBitmap()。
-加载无压缩大图、分辨率不合适。

1.4 主线程执行耗时操作（IO/网络/复杂计算）
-布局中执行了 SharedPreferences、数据库查询等操作。
-onCreate() 或 onResume() 做了过重的初始化。

1.5 自定义 View 绘制逻辑复杂
-onDraw() 中频繁调用耗时操作（如文字测量、矩阵运算）。
-不合理地频繁调用 invalidate()，导致不停重绘。

1.6 动画或属性变化频繁触发重新布局
-不合理使用 requestLayout()、invalidate()。
-动画过程中触发复杂布局更新。

二、优化 View 渲染性能的方法
2.1 减少 View 层级
-使用 ConstraintLayout 代替嵌套的 LinearLayout。
-使用 merge 标签合并无必要的 View。
-使用 ViewStub 延迟加载不常用的内容。
示例：
<merge xmlns:android="http://schemas.android.com/apk/res/android">
    <TextView ... />
    <ImageView ... />
</merge>

2.2 避免主线程进行图片解码
-使用 Glide / Picasso 等库进行异步加载、缓存。
-大图显示前先压缩，避免 OOM 和 UI 卡顿。

2.3 避免主线程 IO、计算
数据加载（数据库、SP、文件）使用 Coroutine 或 HandlerThread 异步处理
示例：
CoroutineScope(Dispatchers.IO).launch {
    val result = readFromDisk()
    withContext(Dispatchers.Main) {
        textView.text = result
    }
}
2.4 避免不必要的 invalidate() 和 requestLayout()
-控制刷新频率。
-动画过程尽量只刷新必要区域

2.5 使用过度绘制分析工具
-打开开发者选项 → 启用“显示布局边界”、“显示过度绘制”。
-控制背景、透明度、阴影叠加。

2.6 使用 Profile GPU Rendering 工具
-查看每一帧是否超过 16ms，绿色为健康，红色表示掉帧。
-路径：设置 → 开发者选项 → 启用 GPU 渲染分析。

2.7 使用布局检测工具

工具	               说明
Layout Inspector	查看布局层级、性能问题
Systrace / Perfetto	分析 UI 线程调度
UI Automator Viewer	静态查看界面布局层级
```

2-表格

|         问题         |             优化方式              |
| :------------------: | :-------------------------------: |
|     布局层级过深     | ConstraintLayout、merge、优化嵌套 |
|       大图卡顿       |    Glide 异步加载、压缩、缓存     |
|    主线程耗时操作    |         IO、DB 放后台线程         |
| 自定义 View 重绘频繁 |      减少 invalidate() 调用       |
|      页面加载慢      |     ViewStub、懒加载、骨架屏      |
|     动画导致掉帧     |   降低动画复杂度，减少布局变更    |
|       渲染分析       |  使用 Profile GPU Rendering 工具  |

### 2.17 RecyclerView 如何优化初始化速度？

1-概念

```
RecyclerView 初始化慢，常出现在复杂列表页面，尤其是冷启动或首页列表加载时。
下面从 布局、适配器、ViewHolder、预加载、绘制优化 多个维度帮你总结实战优化方案。
```

2-RecyclerView 初始化慢的常见原因

|      问题类型      |                         描述                          |
| :----------------: | :---------------------------------------------------: |
|      布局复杂      |    每个 item 中嵌套 View 层级多，measure/layout 慢    |
|  Adapter 数据量大  |           一次性塞入大量数据，且未分批刷新            |
|  ItemView 创建慢   | ViewHolder inflate 过程耗时，或 onBindViewHolder 复杂 |
|  未启用 View 缓存  |    未使用 ViewType 缓存、ViewPool 导致频繁 inflate    |
|      动画卡顿      |    默认动画未关闭，或 diff 运算慢导致频繁刷新动画     |
| 主线程做了耗时操作 |       数据加载、图片加载、item 逻辑在主线程执行       |

3-优化 RecyclerView 初始化速度的方法

```
1-减少 item 布局复杂度
-使用 ConstraintLayout 替代嵌套 LinearLayout。
-避免 item 使用 wrap_content 导致多次 measure。
-使用 ViewStub、include 优化可选布局区域。

2.使用 ViewType + ViewHolder 缓存复用
-正确实现 getItemViewType()。
-使用 RecyclerView.setRecycledViewPool() 来共享缓存池（多个 RecyclerView 共享缓存 ViewHolder）。
示例：
val viewPool = RecyclerView.RecycledViewPool()
recyclerView.setRecycledViewPool(viewPool)

3.使用 ListAdapter + DiffUtil 优化刷新
-替代传统 notifyDataSetChanged()，减少不必要的 onBindViewHolder 调用。
-增量刷新避免整列表更新。

4.关闭或优化默认动画
-默认动画会导致首次加载动画播放，影响首帧。
--可以关闭或替换动画，减少 init 时的开销。
示例
recyclerView.itemAnimator = null

5.异步加载数据 + 骨架屏过渡
-冷启动时先显示骨架屏，数据准备完再设置 Adapter。
-大数据分页加载，避免一次性 set 大量数据。

6.图片异步加载 + 占位图优化
使用 Glide/Picasso 加载图片时，设置合适的 placeholder 和尺寸（避免 wrap_content）。

7.设置 setHasFixedSize(true)
如果 item 高度固定，设置该值可跳过部分 layout 计算。
recyclerView.setHasFixedSize(true)

8.预加载优化（Preload）
-RecyclerView.prefetchItemCount 设置提前加载数量。
-搭配 LinearLayoutManager.setInitialPrefetchItemCount() 控制预取数量
（用于嵌套 RecyclerView 场景）。

9.使用 AsyncLayoutInflater 异步加载 item 布局（低频使用）
对超大 item，可以用 AsyncLayoutInflater 异步 inflate 加快首帧速度。
```

4-调试分析推荐工具

|           工具           |                  功能                  |
| :----------------------: | :------------------------------------: |
|     Layout Inspector     |         查看 item 渲染层级结构         |
|  Profile GPU Rendering   |       检测 RecyclerView 是否掉帧       |
| ecyclerView.AdapterTrace | 打印每个生命周期执行耗时（自定义封装） |
|    Perfetto/Systrace     |     帧级别分析 measure/layout/draw     |

5-最佳实践（冷启动优化场景）

```
首页列表加载：骨架屏占位 + 异步加载数据 + 分页加载 + setHasFixedSize。
多类型 item：复用 ViewHolder + ViewType 缓存 + ListAdapter。
嵌套 RecyclerView：共享 ViewPool + setInitialPrefetchItemCount。
```

### 2.18 SharedPreferences 为什么慢？如何优化？

```
SharedPreferences 在 Android 中经常用于存储简单的 key-value 数据（如登录状态、设置项等），
但它 并不适合频繁读写或大量数据 的场景，原因如下

一、为什么 SharedPreferences 会慢？
1.1 数据存储在 XML 文件中
-本质是一个 XML 文件，每次写入都要把整个文件序列化写回磁盘（apply() 是异步，commit() 是同步）。
-当数据量增大时，写入性能严重下降，容易造成卡顿。

1.2 主线程读写可能造成阻塞
-虽然 apply() 是异步写，但序列化过程可能在主线程执行。
-getXXX() 是同步读取，会立即读取磁盘缓存，可能造成 ANR（尤其是首次 cold start）。

1.3 多进程访问不安全
SharedPreferences 默认不能跨进程可靠使用，多进程访问会导致数据丢失或写入失败。

1.4 数据一致性弱
-apply() 是异步写入，无法保证写入成功。
-如果系统崩溃或杀进程，可能数据还没写入成功。

二、优化 SharedPreferences 的方法
2.1 避免主线程频繁读写
-尽量把 SP 读写放在子线程（尤其是 apply() / commit()）。
-冷启动时可以使用 Coroutine、HandlerThread 延迟初始化 SP
示例
CoroutineScope(Dispatchers.IO).launch {
    val sp = context.getSharedPreferences("app_config", MODE_PRIVATE)
    val token = sp.getString("token", "")
}

2.2 减少写入频率、批量写入
减少 editor.putXXX().apply() 的频率，最好一次性写入多个值再提交。
示例
editor.putString("key1", "value1")
editor.putString("key2", "value2")
editor.apply()

2.3 使用 apply() 替代 commit()
-commit() 是阻塞同步写磁盘操作，主线程调用容易造成卡顿。
-apply() 是异步，虽然没有返回值，但性能远优于 commit()。

2.4 使用内存缓存机制
-如果某个 key 使用频繁，可以先缓存到内存中，再定时或延迟写入 SP。
-可用双写策略：内存 Map + SharedPreferences。

2.5 使用 MMKV 替代 SharedPreferences（推荐🔥）
MMKV 是微信开源的高性能 key-value 存储组件，基于 mmap + protobuf，
性能比 SharedPreferences 高几十倍。
```

2-表格

|                 建议                  |            说明             |
| :-----------------------------------: | :-------------------------: |
|          避免主线程频繁读写           |   使用子线程或延迟初始化    |
|          批量写入 + apply()           |     避免多次频繁写磁盘      |
|        使用内存缓存 + 异步刷盘        |        提升响应速度         |
|    避免大数据量或频繁更新场景使用     | 使用 MMKV 或 DataStore 替代 |
| 多进程建议使用 MMKV / ContentProvider |       SP 不适合多进程       |

### 2.19 冷启动、热启动、温启动的区别？

1-概念

```
1-冷启动（Cold Start）
1.1 定义：
-应用 完全没有进程存在，从零开始创建进程、初始化 Application、加载页面。

1.2 特点：
-系统需重新启动进程（Zygote fork → 创建进程）。
-执行 Application#onCreate()、Activity#onCreate()。
-启动时间最长，冷启动耗时指标最关键！

1.3 触发场景：
-第一次打开 App。
-App 被系统杀死后再次打开。
-清理后台后重新打开。

2-热启动（Hot Start）
2.1定义：
App 进程仍在内存中、Activity 也未被销毁，直接 bring to front。

2.2 特点：
-不走 Application#onCreate()。
-Activity#onCreate() 通常也不走（除非页面被销毁）。
-启动最快！只是 UI 重新显示一下。

2.3 触发场景：
-按 Home 键退到桌面后，立刻点击桌面图标返回。
-多任务切换快速返回原 App。

3-温启动（Warm Start）
3.1 定义：
App 进程仍然存在，但原先的 Activity 被系统销毁，需要重建 Activity。

3.2 特点：
-Application#onCreate() 不会走（进程还在）。
-走 Activity#onCreate()，需要重新初始化 UI。
-启动时间居中，介于热启动和冷启动之间。

3.3 触发场景：
-低内存设备，系统回收了部分 Activity，但保留了进程。
-App 在后台停留过久，系统回收了页面，但没杀掉进程。
```

### 2.20 优化布局层级的方法有哪些？

```
1-优化布局层级
优化布局层级（Layout Hierarchy）系 Android 性能优化入门大招之一，布局层级太深会导致：
-Measure / Layout / Draw 阶段耗时增加（即三大流程慢）
-启动慢 / 滑动卡顿 / 内存占用高 / 丢帧

2-为什么布局层级深会影响性能？
-每多一层 View，就会多一次 measure/layout/draw。
-嵌套 ViewGroup（如嵌套 LinearLayout）代价更高。
-高层级可能导致重绘区域增大，影响绘制效率。

3-优化布局层级的常见方法
3.1 使用 ConstraintLayout 替代多层 LinearLayout、RelativeLayout
3.2 避免深层嵌套嵌套嵌套
-布局最多建议 不超过 10 层。
-合理拆分模块 View（重用组合控件，但不能盲目嵌套）
3.3 使用 merge 标签合并布局层级
3.4 避免不必要的 ViewGroup
3.5 使用 include + merge 模块化复用布局（并优化层级）
-include 方便复用，同时用 merge 防止增加层级。
-避免重复 inflate 同样结构。
3.6 使用 ViewStub 延迟加载可选 View
3.7 不要滥用 wrap_content 尤其是用于父布局
-在复杂布局中使用 wrap_content 会引发 多次 measure 流程。
-尤其在 RecyclerView item 中应尽量避免。
```

2-对比图：优化前后层级结构差异

|         优化前         |          优化后           |
| :--------------------: | :-----------------------: |
| LinearLayout 嵌套多层  | ConstraintLayout 一层替代 |
| 多 include + ViewGroup | include + merge 精简层级  |
|    可选控件始终显示    |  使用 ViewStub 延迟加载   |
|                        |                           |

3-快速提升布局性能的 3 步法

```
1. 打开 Layout Inspector 看层级结构
2. 替换掉嵌套的 LinearLayout → ConstraintLayout
3. 把 include 的子布局改成 merge，删掉冗余父布局
```

### 2.21 如何优化 Dex 加载？

1-概念

```
Dex（Dalvik Executable）加载是 Android 冷启动中的大头之一，优
化 Dex 加载可以显著加快冷启动时间，尤其在多 Dex / 大型 App 中尤为关键。

一、Dex 加载的原理简要
1.1 加载流程（冷启动）
APK 解压 → 解压 DEX → ART 虚拟机加载 DEX → OAT 编译 → 执行 Java 代码
Dex 文件通常放在 classes.dex、classes2.dex 等中，随着方法数增长，
采用 MultiDex（多个 dex 文件）策略。

二、Dex 加载慢的原因
-多个 dex 文件，主 dex 和 其他 dex 分离，系统加载耗时。
-冷启动时加载多个 dex，阻塞主线程。
-Dex 合并顺序不合理，导致关键类不在主 dex。
-主 dex 体积过大。
-设备首次运行需执行 oat 优化（dex2oat）。

三、Dex 加载优化方案汇总
3.1 使用 App Startup 延迟初始化
-避免在 Application#onCreate() 中加载 Dex 所属的大 SDK。
-非核心功能可以延迟加载，甚至移到后台线程处理。

3.2 采用 MultiDex + 分 Dex 优化策略
如果方法数 > 64K，必须采用 MultiDex：

然后：
-使用工具（如 multidex-keep.txt）手动维护主 dex 类。
-重要类（Application、SplashActivity、登录逻辑等）放主 dex。
-将不常用类分到其他 dex，提高主 dex加载速度

3.3 优化主 dex 大小（减少方法数）
-拆分业务模块，按需加载。
-减少三方库依赖，去掉 unused 引用。
-使用 R8/ProGuard 混淆压缩（关闭 minifyEnabled 会导致体积暴增）。

3.4 开启 ProGuard/R8 精简无用代码
效果：
-减少 dex 方法数。
-减少 Dex 文件大小。
-加快 dex merge 和加载速度。

3.5 使用 dexopt / dex2oat 预编译优化
-安装时系统会将 dex 转成 oat。
-某些 ROM 会推迟到第一次启动执行 → 冷启动变慢！

3.6 使用 InstantRun / Split APK / Dynamic Feature Module
-将不常用模块拆成 Dynamic Feature Module → 按需加载。
-Google 推荐 Modularization，减小主 APK dex 的体积。

3.7 使用 AndResGuard / 资源混淆（配合 R8）
减少 resources 占用体积间接影响 APK 解压 + dex 加载速度。

 四、检测 Dex 加载时间的方法
 val start = SystemClock.uptimeMillis()
// 放在 Application#onCreate 前
val end = SystemClock.uptimeMillis()
Log.d("DexLoadCost", "Dex load cost = ${end - start}ms")

也可用：
-Traceview 分析 App 启动阶段耗时。
-Profile 工具中查看 Dex Loading 时间段。
-APM 工具如 Firebase Performance、Bugly 等
```

### 2.22 数据库操作如何优化启动时间？

|              优化项              |             说明             | 推荐度 |
| :------------------------------: | :--------------------------: | :----: |
|        异步线程操作数据库        |       Room + Coroutine       | ✅✅✅✅✅  |
|      避免启动期大量数据加载      | 首页不需要的表/字段延迟加载  |  ✅✅✅✅  |
|    数据初始化交给 WorkManager    |       启动流程不被阻塞       |  ✅✅✅✅  |
| 替代方案：使用 MMKV 或 DataStore | 快速、线程安全、无初始化开销 |  ✅✅✅✅  |
|     使用事务处理 / 批量插入      |         提高写入效率         |  ✅✅✅   |
|         懒加载数据库连接         |      降低首次 I/O 成本       |  ✅✅✅   |

### 2.23 如何减少首次启动的白屏时间

1-概念

```
App 冷启动时的“白屏”是指从用户点击应用图标，到第一个界面真正显示前，这段空白无内容的时间。
如果这段时间过长，会给用户“卡住了”或“没有反应”的感觉。

一：常见优化方法
1.1 使用启动页主题（Splash Theme）替代白屏背景
在启动页的 Activity 中使用一个专属主题，在 windowBackground 中设置一张启动图或者背景颜色，
让系统在加载布局之前就能展示 UI，避免白屏。

1.2 减少 Application 中的初始化逻辑
启动期间最容易卡住界面的是 Application 里的初始化。
如果你加载了第三方 SDK、大量 I/O 或网络操作，会延迟进入首屏。

解决方法：
-延迟加载非必要模块（例如推送、广告、统计等）。
-使用 Jetpack App Startup 或 WorkManager 延迟初始化。

1.3 SplashActivity 快速跳转首页
在 SplashActivity 中不要进行耗时操作，尽快跳转到主页面：

1.4 避免在 setContentView() 之前执行复杂逻辑
布局加载应该尽早完成，不要在它之前执行网络请求、数据库操作或其他耗时逻辑。

1.5 使用静态图或轻量布局作为启动背景
windowBackground 中设置的背景建议使用：
-纯色背景；
-居中 Logo；
-渐变色。

不要使用复杂布局、动画或者 WebView。

1.6 Android 12+ 使用官方 SplashScreen API（推荐）

1.7 避免重复初始化（多进程问题）
确保只在主进程初始化 Application，不然可能出现白屏+卡顿并存的问题。
```

2-表格

|              优化策略              |           效果           |
| :--------------------------------: | :----------------------: |
| 设置启动页主题（windowBackground） | 用图片或背景颜色代替白屏 |
|  SplashActivity 中快速跳转主界面   |      不阻塞进入首页      |
|  延迟 Application 中的初始化操作   |      避免主线程卡顿      |
|   使用 App Startup 延迟组件加载    |      减少冷启动压力      |
|   使用 Jetpack SplashScreen API    | 提供系统级的平滑过渡动画 |


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)

