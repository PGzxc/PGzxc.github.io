---
title: Android面试题——公司面试题2
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
  - 公司面试题
abbrlink: 6be54bbe
date: 2025-09-05 11:30:51
---
## 一 概述

```
这是一家阅读类应用开发类面试，偏重技术为Android、flutter
题目：
 1.介绍一下工作经历和项目
 2.性能优化：内存、性能、耗电、崩溃等降到最低
 3.应用崩溃及奔溃率(3/1000或5/10000)
 4、网文动画、字体设置(字间距、行间距等)、阅读背景
 5、分页动画及控件，实现方式
 6、推荐一些开源阅读分页项目
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 介绍一下工作经历和项目

```
1、总体经历

如何介绍
-工作年限、主要技术栈、行业背景
-强调 Android 相关经验

示例
我有 X 年 Android 开发经验，主要使用 Kotlin/Java，熟悉 Android Jetpack 组件、协程、Compose 等；
同时在跨平台（Flutter、RN、KMM）和鸿蒙（ArkTS/仓颉）方面也有实践。
过去主要参与过 教育、直播、电商、招聘、媒体活动 等行业的项目开发。


2、重点项目
如何介绍
-选择 2-3 个代表性项目(最好和招聘岗位相关)
-每个项目用 STAR 法则 描述(情景 S，任务 T，行动 A，结果 R)

示例如下：(背景+架构+结果)

项目一：在线教育 App
背景：公司需要一款支持直播课程、点播、题库的移动端产品。
职责：负责客户端架构设计与播放器模块开发。
行动：
 采用 ExoPlayer 封装自研播放器，支持 HLS + DRM；
 引入 MVVM + Jetpack 架构，利用 Room + Flow 做数据流管理。
结果：应用稳定支持 5 万+ 并发，视频卡顿率降低 30%，崩溃率下降到 0.3%。

项目二：电商 App（Flutter + Android 原生混合）
背景：需要多端统一，快速上线。
职责：负责 Flutter 与 Android 原生模块的混合方案。
行动：通过 Platform Channel 封装原生支付/分享/登录模块；实现多端 UI 组件库统一。
结果：上线周期缩短 40%，月活用户增长 15%。


3、技术亮点 & 个人价值
如何介绍
-技术突破、性能优化、安全性、架构设计等。
-最好能量化结果（例如启动时间减少 40%，崩溃率降低到 0.2%）。

示例(优化方面+技术)

在项目中我注重性能优化，
例如启动优化（使用 App Startup + 延迟初始化）、网络优化（OkHttp + HTTP/2 + 缓存策略）、
以及 Compose UI 动画性能调优。
另外我也有 CI/CD 和自动化测试经验，可以提高团队交付效率。
```

### 2.2 性能优化：内存、性能、耗电、崩溃等降到最低

```
1、内存优化
-泄漏检测：使用 LeakCanary、Profiler 分析内存泄漏；
严格遵循生命周期，避免 Context/Activity/Handler 引起的泄漏。
-资源优化：合理使用 LruCache / SparseArray；图片用 Glide/Fresco 并开启内存缓存池。
-对象复用：减少频繁创建大对象，采用对象池或复用机制。
-结果：在实际项目中，优化后 内存占用降低约 20%，OOM 崩溃率显著下降。

2、性能优化(速度 & 流畅度)
-启动优化：分阶段初始化（App Startup / 延迟加载），冷启动白屏时间减少 40%。
-布局优化：减少层级，使用 ConstraintLayout / Compose；开启 R8/ProGuard。
-线程优化：协程 + WorkManager 合理分配后台任务，避免主线程阻塞。
-渲染优化：避免频繁 GC，控制 onDraw() 开销；List 页面用 DiffUtil/RecyclerView 分页加载。
-结果：应用首页加载速度由 2.5s 降至 1.5s，滑动帧率稳定在 60fps。

3、耗电优化
-后台任务控制：使用 WorkManager + JobScheduler，合并定时任务，避免唤醒过多。
-网络优化：HTTP/2 + 缓存策略，减少重复请求；按需降级同步频率。
-传感器与定位：采用低功耗模式（PRIORITY_BALANCED_POWER_ACCURACY），合理设置采样率。
-结果：长时间运行场景下，应用耗电量降低约 15%。

4、崩溃率优化
-稳定性监控：接入 Firebase Crashlytics / Bugly，实时监控崩溃。
-容错处理：关键模块加异常捕获，防止全局崩溃。
-兼容性测试：覆盖 Android 主流版本、厂商定制 ROM；使用 Monkey 测试。
-结果：应用整体崩溃率由 1% 降到 0.2%，达行业优良水平


5、总结(如何说)
-通过 LeakCanary + 对象复用 控制内存，减少 OOM；
-通过 启动延迟初始化、布局优化、线程调度 提升运行速度；
-通过 后台任务合并、低功耗定位 控制耗电；
-通过 崩溃监控 + 容错处理 稳定性显著提升。
-最终结果是：应用启动速度提升 40%，内存占用降低 20%，耗电下降 15%，崩溃率从 1% 降到 0.2%。
```

### 2.3 应用崩溃及奔溃率(3/1000或5/10000)

```
1、基本概念
-应用崩溃（Crash）：
应用运行过程中因 未捕获异常（Java/Kotlin）、Native 层错误（JNI/NDK）、ANR 等 导致程序退出。

-崩溃率（Crash Rate）：衡量应用稳定性的核心指标。

-常见计算公式：
 --按启动次数：崩溃率=崩溃次数/应用启动次数
 --按用户数：用户崩溃率=发生过崩溃的用户数/活跃用户数

2、示例数值
-假设一款 App 日启动 10 万次，发生 30 次崩溃：崩溃率 = frac{30}{100000} = 0.03%
-如果日活 1 万用户，50 人遇到崩溃：用户崩溃率 = frac{50}{10000} = 0.5%

3、行业标准
-优秀水平：崩溃率 ≤ 0.5%
-一线大厂目标：≤ 0.1%（即 1/1000 以下）
-顶尖优化：≤ 0.05%（如 5/10000）

4、降低崩溃率的手段
-异常捕获：全局 Thread.setDefaultUncaughtExceptionHandler；关键模块 try-catch。
-兼容性适配：覆盖不同 Android 版本和厂商定制 ROM。
-线上监控：接入 Crashlytics、Bugly，收集日志。
-测试覆盖：自动化测试（UI/单测/Monkey），提前发现问题。
-灰度发布：逐步放量，减少全量用户同时遇到问题。

5、面试示例回答
在我负责的项目中，我们通过崩溃监控+异常兜底+厂商兼容性适配，将崩溃率从最初的 1% 优化到 0.2% 左右
在某些核心业务版本中甚至达到了 0.05%（≈ 5/10000），整体稳定性达到行业优秀水平。
```

### 2.4 网文动画、字体设置(字间距、行间距等)、阅读背景

```
1、动画效果
1-1、翻页动画
-模拟纸张翻页（Canvas 绘制 + PageCurl 动画）。
-平移滑动（ViewPager2 / RecyclerView + PagerSnapHelper）。
-渐隐渐显（淡入淡出切换章节）。

1-2、动效优化：使用 SurfaceView 或 TextureView 保持流畅，避免掉帧。

2、字体设置
 -字号：通过 TextView.setTextSize() 或 Compose TextStyle(fontSize) 动态调整。
 -字间距：TextView.setLetterSpacing()，Compose 用 letterSpacing。
 -行间距：TextView.setLineSpacing()，Compose 用 lineHeight。
 -字体切换：引入 TTF/OTF，支持本地 & 在线下载字体（比如楷体、黑体、思源宋体）。

3、阅读背景
 -背景色/图片：支持白天/夜间模式 & 多套皮肤（米黄、护眼绿、黑色）。
 -渐变背景：通过 ShapeDrawable 或 Compose Brush.linearGradient() 实现。
 -动态切换：存储用户偏好（DataStore / SharedPreferences），阅读时即时生效。
```

### 2.5 分页动画及控件，实现方式

```
一、常见分页动画类型

1.1、仿真翻页（PageCurl）
-效果：像纸张翻页一样，有卷边、阴影。
-实现：Canvas 绘制贝塞尔曲线 + Shader 阴影模拟。
-优点：沉浸感强，适合小说阅读。
-缺点：实现复杂，性能压力大，低端机可能掉帧。

1.2、平移滑动（Slide/Page Scroll）
-效果：像滑动屏幕一样切换下一页。
-实现：ViewPager2 / RecyclerView + PagerSnapHelper。
-优点：实现简单，性能好。
-缺点：缺乏沉浸式体验。

1.3、覆盖/推拉（Cover/Push）
-效果：新页面从右边推入覆盖旧页面。
-实现：Canvas 绘制两层 Bitmap，控制 X 方向偏移。
-优点：实现中等难度，体验自然。
-缺点：视觉表现不如仿真翻页。

1.4、渐隐渐现（Fade）
-效果：旧页面淡出，新页面淡入。
-实现：ViewPropertyAnimator / Compose AnimatedVisibility。
-优点：性能最好，简单。
-缺点：表现单一。

二、常见控件实现方式
2.1、自定义 View（推荐）
思路：
-使用 SurfaceView 或 TextureView 作为渲染容器；
-每一页预先排版成 Bitmap；
-翻页时在 Canvas 上绘制 当前页 和 下一页，根据手势计算动画进度；
-不同动画模式（仿真/覆盖/平移/渐隐）仅在 onDraw() 渲染逻辑上不同。

优点：高可控、性能好、动画模式可扩展。
缺点：实现复杂，需要自己做手势解析、排版、绘制。

2.2、 ViewPager2 / RecyclerView（快速方案）

思路：
把每一页封装成 Fragment 或 ViewHolder；
配合 PageTransformer 实现翻页效果（如平移、淡入淡出）。

优点：开发快，维护简单。
缺点：仿真翻页等复杂效果难实现，页面预加载占内存。

2.3、 OpenGL / GPU 渲染（高阶）

思路：
使用 OpenGL ES 绘制页面贴图；
通过 GPU Shader 实现卷曲翻页效果。

优点：流畅、视觉酷炫。
缺点：门槛高，适合对性能要求极高的阅读器（如掌阅、Kindle）。

三、优化点

-页面预加载：提前渲染前后页 Bitmap，减少翻页卡顿。
-内存管理：仅缓存前后几页，回收旧页 Bitmap，避免 OOM。
-触摸交互：区分点击翻页、滑动翻页，增加翻页灵敏度控制。
-动画模式切换：提供多种模式，存储用户偏好。

四、面试可直接用的总结回答

在阅读类项目中，分页动画我主要采用 自定义 SurfaceView 控件 来实现：

-每一页提前排版成 Bitmap；
-翻页时根据手势在 Canvas 上绘制当前页和下一页；
-支持 仿真翻页、覆盖、平移、渐隐 四种模式；
-同时通过 页面预加载 + Bitmap 缓存回收 优化了性能，保证在低端机上也能流畅运行。
```

### 2.6 推荐一些开源阅读分页项目

```
1、iReader（简易阅读器 Demo）——3年前更新

1.1、地址：iReader：https://github.com/JustWayward/BookReader
1.2、特点：
-包含完整阅读器功能：章节分页、翻页动画、字体/背景设置。
-内置 Netty + RxJava，功能比较全。
-缺点：有点老，但适合学习分页排版逻辑。

2. PageCurl-Android（增强版）——去年(2024年)有修改
2.1、地址：PageCurl-Android：https://github.com/eschao/android-PageFlip
2.2、特点：
-更完善的仿真翻页控件。
-基于 OpenGL ES 2.0，效果酷炫。
-对标掌阅/Kindle 类的翻页体验。

3.AndroidPageCurl(14年前项目)

3.1 地址：AndroidPageCurl：https://github.com/harism/android-pagecurl
4.2 特点：
经典的 纸张卷曲翻页效果。
基于 OpenGL 实现，性能流畅。
适合研究 GPU 加速翻页。
---------------------------------------------------------

4. BookReader（仿真翻页）——已删除，查找fork
4.1、地址：BookReader：https://github.com/youzhibing/BookReader
4.2、特点：
自定义 View 实现仿真翻页、覆盖、滑动等多种效果。
使用 Canvas 绘制，支持手势操作。
适合学习阅读器底层绘制逻辑。


5.PageTurnView——已删除，查找fork

5.1、地址：PageTurnView：https://github.com/RookieInTraining/PageTurnView
5.2、特点：
-支持覆盖、平移、仿真翻页三种模式。
-使用 SurfaceView 绘制，性能较好。
-可扩展性强，代码易读。
```

