---
title: Android面试题——掘金-性能优化之bitmap优化(4.10)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: a1430fdf
date: 2025-04-07 10:11:08
---
## 一 概述

```
Bitmap 优化相关面试题及详解
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 为什么 Bitmap 容易造成内存溢出？

```
因为 Bitmap 图像是以像素的方式存在内存中，每个像素默认占用 4 个字节（ARGB_8888），
当加载较大的图片时，容易瞬间分配大量内存。

例如，一张 4000×3000 的图片占用内存为：
4000 × 3000 × 4B = 48MB
如果多个 Bitmap 同时存在，就很容易 OOM（OutOfMemoryError）。
```

### 2.2 如何压缩 Bitmap 减少内存占用？

```
常见的优化方法有：

1.通过采样率压缩（缩小尺寸）： 
使用 BitmapFactory.Options.inSampleSize，按比例缩小图片：

BitmapFactory.Options options = new BitmapFactory.Options();
options.inJustDecodeBounds = true;
BitmapFactory.decodeFile(path, options);
options.inSampleSize = calculateInSampleSize(options, reqWidth, reqHeight);
options.inJustDecodeBounds = false;
Bitmap bitmap = BitmapFactory.decodeFile(path, options);

2.使用更小的颜色格式：
-ARGB_8888：32位，4字节/像素，默认。
-RGB_565：16位，2字节/像素，不支持透明，但内存减少一半。
options.inPreferredConfig = Bitmap.Config.RGB_565;

3.图片压缩编码（质量压缩）： 用于减少文件大小，不影响加载时内存占用：
bitmap.compress(Bitmap.CompressFormat.JPEG, 80, outputStream);
```

### 2.3 如何避免加载过大的图片导致 OOM？

```
-先获取图片尺寸（不加载到内存）：
options.inJustDecodeBounds = true;
BitmapFactory.decodeFile(path, options);

-计算合适的 inSampleSize，再解码。
-使用 Glide/Picasso 等图片加载库，这些库内置了防止 OOM 的机制
```

### 2.4 Bitmap 应该如何回收？

```
1.在 Android 7.0 以下，Bitmap 没有使用 HardwareBitmap，需要手动调用 recycle()：
if (bitmap != null && !bitmap.isRecycled()) {
    bitmap.recycle();
    bitmap = null;
}

2.Android 7.0+ 开始，由于 Bitmap 使用 native 分配 + 软引用回收策略，
一般不需要手动 recycle，但仍需及时释放引用，避免内存泄露。
```

### 2.5 使用 Bitmap 时有哪些加载优化技巧？

```
1.使用 LruCache 做内存缓存，避免重复解码：
LruCache<String, Bitmap> cache = new LruCache<>(maxSize);
2.使用磁盘缓存（如 Glide、Fresco 支持）防止反复下载。
3.不在主线程加载 Bitmap，避免卡顿或 ANR。
4.使用 ImageView.setImageBitmap() 时避免频繁 GC，可以用弱引用保存 Bitmap。
5.避免图片拉伸失真，合理设置 ImageView 的 scaleType。
```

### 2.6 BitmapFactory.decodeXXX 和 Bitmap.createBitmap 的区别？

```
BitmapFactory.decodeXXX() 是从文件、资源、流等解码图片为 Bitmap。
Bitmap.createBitmap() 是在内存中创建新的空 Bitmap，一般用于绘图场景（如 Canvas）。
```

### 2.7 如何使用 Glide 进行 Bitmap 加载优化？

```
Glide 是推荐的图片加载库，它自动帮我们做了很多优化：

-自动计算缩略图尺寸并使用采样压缩；
-使用内存 + 磁盘缓存；
-内部维护线程池，避免主线程阻塞；
-自动回收 Bitmap，防止 OOM；
-支持 placeholder / error 图显示，提升用户体验。

Glide.with(context)
     .load(url)
     .placeholder(R.drawable.loading)
     .error(R.drawable.error)
     .into(imageView);
```

### 2.8 如何查看 Bitmap 内存分配及排查 Bitmap OOM？

```
-使用 Android Studio Profiler 查看 Bitmap 分配；
-使用 MAT (Memory Analyzer Tool) 或 LeakCanary 分析内存泄漏；
-使用 adb shell dumpsys meminfo 查看 Bitmap 分配统计。
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)