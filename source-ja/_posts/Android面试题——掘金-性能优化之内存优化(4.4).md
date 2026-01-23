---
title: Android面试题——掘金-性能优化之内存优化(4.4)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 7d6c45bb
date: 2025-04-07 10:06:56
---
## 一 概述

```
Android 内存优化相关常见面试题
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 为什么 Android 应用需要进行内存优化？

```
-Android 系统内存资源有限，容易触发 GC、OOM（内存溢出）。
-内存泄漏会导致应用越来越卡，甚至崩溃。
-大量的对象分配/回收会增加 GC 次数，影响性能。
-系统低内存时，会直接杀进程，影响稳定性。
```

### 2.2  Android 应用内存的主要组成有哪些？

```
-Java Heap（Java 对象）
-Native Heap（C/C++、NDK）
-Graphics（Bitmap、OpenGL）
-Code（DEX、SO 文件）
-Stack（线程栈空间）
```

### 2.3 如何判断应用是否存在内存泄漏？

```
-使用 LeakCanary 自动检测 Activity/Fragment 是否未被回收。
-使用 Android Studio Profiler 查看内存快照。
-观察 Heap 增长趋势，GC 后仍不下降。
-分析 MAT（Memory Analyzer Tool）内存快照，找出 GC Root。
```

### 2.4 常见的内存泄漏场景有哪些？

|          泄漏场景          |             原因              |
| :------------------------: | :---------------------------: |
| 静态引用 Activity、Context | 静态变量生命周期长于 Activity |
|  匿名内部类持有外部类引用  |     编译后隐式引用外部类      |
| Handler / Timer 未移除消息 |  MessageQueue 中引用外部对象  |
|     单例中引用 Context     |      单例生命周期 = App       |
|       Bitmap 未释放        |   大图占用内存且 GC 不可控    |
|      WebView 内存泄漏      | 加载网页未销毁、Context 泄漏  |
|     RxJava 订阅未取消      |     Observable 引用未释放     |

### 2.5 如何避免 Handler 引起的内存泄漏？

```
1.使用静态内部类 + WeakReference 持有外部引用：
class MyHandler(activity: MainActivity) : Handler(Looper.getMainLooper()) {
    private val activityRef = WeakReference(activity)

    override fun handleMessage(msg: Message) {
        val activity = activityRef.get() ?: return
        activity.doSomething()
    }
}

2.或使用 lifecycleScope / ViewModelScope 替代传统 Handler。
```

### 2.6 Bitmap 如何优化内存占用？

```
-使用 BitmapFactory.Options.inSampleSize 进行缩放加载。
-使用 RGB_565 替代默认的 ARGB_8888。
-避免使用透明通道（减少内存占用）。
-加载前先 inJustDecodeBounds = true 计算实际大小。
-使用 LruCache 管理 Bitmap 缓存。
-加载大图推荐使用 Glide / Coil / Fresco。
```

### 2.7 WebView 如何防止内存泄漏？

```
-使用 ApplicationContext 创建 WebView。
-避免 WebView 写在 XML 中，动态创建 → 用完销毁。
-webView.destroy() + webView.removeAllViews()。
-在 Activity 的 onDestroy() 中手动清理 WebView。
```

### 2.8 如何避免内存抖动（Memory Churn）？

```
-内存抖动：频繁创建/销毁大量对象，导致频繁 GC。
-避免 String 拼接 → 用 StringBuilder。
-循环中避免创建对象（例如 new Adapter、Drawable）。
-使用对象池（如 RecyclerView 的 RecycledViewPool）。
-使用 Kotlin lazy, by viewModels, reified 减少中间对象
```

### 2.9 怎么优化内存分配以避免 OOM？

```
-使用 Bitmap 缩放加载。
-避免一次性加载大列表数据。
-设置 RecyclerView 分页加载。
-使用内存缓存（LruCache、DiskLruCache）。
-使用 Profile 分析峰值内存分配、定位问题代码。
```

### 2.10 什么是内存缓存 LruCache？怎么用？

```
LruCache 是 Android 提供的一个 最近最少使用缓存机制，可用于缓存 Bitmap、对象等。
val cache = object : LruCache<String, Bitmap>(maxSize) {
    override fun sizeOf(key: String, value: Bitmap): Int {
        return value.byteCount / 1024 // 单位：KB
    }
}

cache.put("url", bitmap)
val bmp = cache.get("url")
```

### 2.11 内存优化 Checklist

|   优化方向   |                      方法                      |
| :----------: | :--------------------------------------------: |
| 检测内存泄漏 |          LeakCanary / Profiler / MAT           |
|   避免泄漏   | WeakReference、生命周期绑定、Handler静态内部类 |
| Bitmap 优化  |     缩放加载、LruCache、RGB_565、避免大图      |
|   对象复用   |       ViewHolder、StringBuilder、对象池        |
| WebView 优化 |     动态创建、ApplicationContext、及时销毁     |
| RxJava 优化  |        Disposable 解绑、Lifecycle 绑定         |
|  图片库使用  |       Glide/Fresco/Coil 有更好的内存管理       |


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)