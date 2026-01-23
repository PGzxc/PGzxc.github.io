---
title: Android面试题——掘金-三方框架之glide(5.5)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: f22d65fe
date: 2025-04-07 10:34:10
---
## 一 概述

```
Android 三方框架相关面试题：Glide
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 Glide 是什么？优点是什么？

```
1.概念
Glide 是 Google 推荐的 Android 图片加载库，支持图片加载、缓存、变换和解码，
适合加载网络图片、资源文件、GIF、视频帧等。

2.优点：
-内存优化好，基于 LruCache 和 BitmapPool
-加载速度快（解码+缓存处理优化）
-支持多种数据源（网络、Uri、资源、File）
-支持 RecyclerView 滚动优化
-支持 GIF、视频帧等加载
-生命周期感知，自动取消无效请求
```

### 2.2 Glide 的基本使用方式？

```
Glide.with(context)
    .load("https://example.com/image.jpg")
    .placeholder(R.drawable.placeholder)
    .error(R.drawable.error)
    .into(imageView)
```

### 2.3 Glide 的生命周期管理是怎么实现的？

```
Glide 通过监听 Activity/Fragment 的生命周期，自动暂停/恢复图片请求。

-Glide.with(context) 会根据 context 类型绑定生命周期；
-内部使用 LifecycleFragment 或 ActivityFragmentLifecycle 跟踪生命周期；
-当页面 onStop 时，自动 pauseRequests()；onStart 时 resumeRequests()。
```

### 2.4 Glide 的缓存机制是怎样的？

Glide 有三级缓存机制：

|         缓存层级         |       类型        |                说明                 |
| :----------------------: | :---------------: | :---------------------------------: |
| 活动缓存（Active Cache） | 强引用缓存（RAM） |   当前正在使用的图片，优先级最高    |
| 内存缓存（Memory Cache） |     LruCache      |  BitmapPool 回收复用，提高加载速度  |
|  磁盘缓存（Disk Cache）  |   LruDiskCache    | 原图/转换图缓存，持久存储到文件系统 |

### 2.5 如何清除 Glide 缓存？

```
// 清除内存缓存（主线程）
Glide.get(context).clearMemory()

// 清除磁盘缓存（子线程）
Glide.get(context).clearDiskCache()
```

### 2.6 Glide 中如何设置磁盘缓存策略？

```
.diskCacheStrategy(DiskCacheStrategy.ALL)

可选值：
-ALL：缓存原始数据和变换后的图片
-NONE：不缓存
-DATA：只缓存原始图片
-RESOURCE：只缓存转换后的图片
-AUTOMATIC：智能判断（默认）
```

### 2.7 Glide 中如何避免图片加载闪烁？

```
-使用 .dontAnimate() 或 .dontTransform() 禁止默认动画；
-使用 .placeholder() 保持占位图一致；
-在 RecyclerView 中复用 itemView 时，避免图片重置。
```

### 2.8 Glide 与 Picasso/Coil/Fresco 的对比？

|     特性     |       Glide        |   Picasso    |     Fresco      | Coil（Kotlin） |
| :----------: | :----------------: | :----------: | :-------------: | :------------: |
| 图片格式支持 | ✅ 支持 GIF、视频帧 | ❌ 不支持 GIF |    ✅ 强支持     | ✅ 靠 Okio 处理 |
| 生命周期绑定 |         ✅          |      ❌       |        ✅        |       ✅        |
|   缓存机制   |     ✅ 三级缓存     |   ✅ 双缓存   | ✅ 内存/磁盘缓存 |       ✅        |
|     体积     |         中         |      小      |       大        |       小       |
|     性能     |         高         |      中      |  高（多进程）   |       中       |
| Kotlin 支持  |        一般        |     一般     |       弱        | ✅ 原生 Kotlin  |

### 2.9 如何监听 Glide 加载状态？

```
Glide.with(context)
    .load(url)
    .listener(object : RequestListener<Drawable> {
        override fun onLoadFailed(...) = false
        override fun onResourceReady(...) = false
    })
    .into(imageView)
```

### 2.10 Glide 如何加载圆形图片或自定义变换？

```
方法 1：使用 RequestOptions
val options = RequestOptions.circleCropTransform()
Glide.with(context).load(url).apply(options).into(imageView)

方法 2：自定义 BitmapTransformation
class MyTransform : BitmapTransformation() {
    override fun transform(...) = // 裁剪逻辑
    override fun updateDiskCacheKey(...) = // 缓存唯一标识
}
```

### 2.11 Glide 是如何加载图片的？大致原理？

```
-Glide.with() 绑定生命周期；
-load() 获取图片模型（URL、File 等）；
-Engine 查缓存、判断是否需要解码；
-启动线程池加载资源，解码、变换；
-加载完毕后交由 Target（如 ImageViewTarget）显示；
-缓存策略保存数据到内存/磁盘。
```

### 2.12 Glide 如何避免内存泄漏？

```
-使用 Glide.with(fragment)、with(activity) 绑定生命周期；
-避免在 ApplicationContext 中直接加载 UI；
-使用 View.clear() / Glide.clear(target) 主动释放资源；
-图片加载完成后避免 Bitmap 长时间引用。
```

### 2.13 如何配置 Glide Module 做全局配置？

```
@GlideModule
class MyAppGlideModule : AppGlideModule() {
    override fun applyOptions(context: Context, builder: GlideBuilder) {
        builder.setDiskCache(InternalCacheDiskCacheFactory(context, "glide_cache", 50 * 1024 * 1024))
    }

    override fun isManifestParsingEnabled(): Boolean = false
}
```

### 2.14 Glide 在 RecyclerView 中加载图片有哪些优化技巧？

```
1.技巧
‘-使用 placeholder 避免图片闪动；
-使用 .centerCrop() 提前裁剪；
-避免频繁刷新 Adapter（如 DiffUtil）；
-在 onViewRecycled() 中主动 clear：

2.示例
override fun onViewRecycled(holder: ViewHolder) {
    Glide.with(holder.itemView).clear(holder.imageView)
}
```

### 2.15 如何加载视频缩略图？

```
Glide.with(context)
    .load(Uri.fromFile(videoFile))
    .frame(1000000) // 取第1秒帧
    .into(imageView)
```

### 2.16 总结

|      能力      |  是否支持   |
| :------------: | :---------: |
|  生命周期感知  |      ✅      |
| 磁盘/内存缓存  |      ✅      |
| 加载动画/变换  |      ✅      |
|   视频帧/GIF   |      ✅      |
| 自定义缓存目录 |      ✅      |
| 自定义加载引擎 | ✅（可拓展） |
|  Kotlin 支持   |      ✅      |

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)