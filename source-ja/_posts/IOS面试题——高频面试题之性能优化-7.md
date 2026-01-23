---
title: IOS面试题——高频面试题之性能优化(7)
categories:
  - 面试相关
  - IOS面试题
tags:
  - IOS面试题
abbrlink: 25cd48e7
date: 2025-09-25 16:05:24
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二 面试要求和面试题

### 2.1 面试要求(技术点提取)

```
1.内存管理与优化：深入理解对象生命周期、引用计数(ARC)、内存泄漏分析与工具(如Instruments)
2.性能监控与分析：掌握CPU、GPU、网络、电量等方面的性能监控和优化，并能够使用相关工具进行分析
3.应用稳定性：能够进行崩溃日志分析、卡顿检测与优化
```

## 三 面试题解答(仅供参考)

### 3.1 iOS性能优化与稳定性—内存管理与优化

面试考点

```
1.对象生命周期：创建、引用计数管理、释放过程
2.ARC(自动引用计数)：工作原理、优劣势、注意事项
3.内存泄漏：常见原因、检测工具、解决方案
4.强引用循环(Retain Cycle)：识别与避免方法
```

1、iOS 如何管理对象生命周期？

```
1、管理对象生命周期
- 创建：对象通过 alloc/init 等方法创建，初始引用计数为 1。  
- 引用计数：strong 增加引用计数，赋 nil 或超出作用域减少引用计数。  
- 释放：当引用计数为 0 时，ARC 自动调用 dealloc 释放内存。  
- 注意点：ARC 不能自动解决强引用循环，需开发者手动避免；在 MRC 下需手动调用 release/autorelease。

2、追问点及解答
2.1、autorelease pool 的作用和生命周期？
autorelease pool 会在作用域结束时统一释放池中的对象，
常用于临时对象的批量管理，避免过早释放。
主线程 RunLoop 在每次循环结束时会清空一次。

2.2、为什么 weak 指针在对象释放后会自动置 nil？
runtime 中维护了一个 弱引用表，
对象释放时会遍历弱引用表，把所有 weak 指针置 nil，从而避免悬空指针访问已释放内存。
```

2、 ARC（Automatic Reference Counting）是什么？它如何工作？

```
1、定义：ARC 是编译器特性，自动在合适位置插入 retain/release/autorelease，管理引用计数。  
2、原理：对象引用计数归零 → ARC 调用 dealloc → 释放内存。  
3、优势：
 -减少 MRC 下频繁手动管理内存的复杂性。  
 -降低因忘记释放或重复释放导致的泄漏/崩溃。  
 -开发者能专注业务逻辑。  
4、局限：
 -无法自动解决强引用循环。  
 -Core Foundation 对象仍需手动释放 (CFRelease)。  

5、追问点及解答
5.1、ARC 和垃圾回收（GC）的区别？

ARC 是编译期机制，通过插入 retain/release 控制引用计数；
GC 是运行时机制，通过标记清除扫描整个堆。
ARC 更轻量，性能可控；
GC 延迟释放，可能造成卡顿。

5.2、ARC 什么时候插入 autorelease？

当对象需要跨方法返回时（如返回局部变量对象），
编译器会插入 autorelease 确保对象在调用方作用域依然可用。
```

3、什么是内存泄漏？常见原因及如何检测？

```
1、定义：
已分配内存未能在对象生命周期结束后释放，导致内存占用持续增加。  

2、常见原因：
 -强引用循环：如闭包未使用 [weak self]，delegate 未声明为 weak。  
 -观察者未移除：NotificationCenter、KVO、NSTimer 等。  
 -Core Foundation 对象未释放：缺少 CFRelease。  

3.检测工具：
- Instruments：
  * Leaks 模板：定位泄漏对象及调用栈。  
  * Allocations 模板：跟踪对象分配/释放过程。  
- Xcode Debug Memory Graph：可视化引用关系，发现循环引用。  

4.解决方案：
 -闭包中使用 [weak self] 或 [unowned self]。  
 -委托模式中 delegate 定义为 weak。  
 -在 deinit 中移除观察者/定时器。  
 -Core Foundation 对象手动释放。  
```

4、如何避免强引用循环 (Retain Cycle)？

```
1、如何避免强引用循环
-使用弱引用（weak）：常用于闭包、delegate。  
-使用无主引用（unowned）：对象生命周期严格一致时使用。  
-工具检测：Xcode Memory Graph 定期检查。  
-设计规范：明确对象间的强弱引用关系，避免多层相互强引用。  

2、追问点及解答
2.1、weak 和 unowned 的区别及应用场景？
weak：引用对象可能被释放，访问时返回 nil，适合可选引用（delegate、闭包）。

unowned：引用对象生命周期确定不会早于自己，不会置 nil，若提前释放则访问会崩溃。
常用于强生命周期绑定（如 View 与其 Controller）。

2.2、NSTimer 为何常导致循环引用？如何解决？
因为 Timer 会强引用 target，而 target 又强引用 Timer，形成循环。

解决方式：
使用 [weak self] 在闭包里引用。
使用 GCD 定时器替代 NSTimer。
或在 deinit 中调用 timer.invalidate() 手动销毁。
```

### 3.2 iOS性能优化与稳定性—性能监控与分析

面试考点

```
1.性能监控：掌握 CPU、GPU、内存、网络、电量等性能指标的监控方法
2.分析工具：熟练使用 Instruments（Time Profiler、Core Animation、Leaks、Allocations、Energy Log）等工具定位性能瓶颈
3.优化策略：针对 CPU、GPU、内存、电量和网络的常见优化手段
```

1、如何通过 Instruments 分析和优化 CPU/GPU 性能？

```
1、CPU 分析与优化
工具：Time Profiler 分析方法调用栈，定位耗时函数。
优化策略：
-避免主线程阻塞，将网络请求、JSON 解析、图片解码等操作放到子线程（GCD、NSOperation）。
-减少不必要的计算，优化算法复杂度。
-尽量使用系统提供的高性能 API（如 Accelerate、Metal）。

2、GPU 分析与优化
工具：Core Animation 检查 FPS、离屏渲染、视图层级。
优化策略：
-减少离屏渲染（避免过多圆角、阴影、mask，必要时设置 shadowPath）。
-简化视图层级，优先使用不透明视图 (opaque = YES) 避免混合。
-使用异步绘制（drawsAsynchronously）提升渲染效率。

3、常见追问：
为什么离屏渲染会影响性能？
因为 GPU 需要在新的缓冲区单独渲染，再拷贝回屏幕，增加额外开销。
```

2、如何优化 iOS 应用的网络和电量性能？

```
1、网络优化
-合并请求，减少频繁调用。
-使用缓存（URLCache 或本地数据库）存储常用数据。
-压缩传输数据（图片、JSON），优先使用高效协议（HTTP/2、QUIC）。
-延迟加载非关键资源。

2、电量优化
-减少后台任务（位置服务、后台刷新），仅在必要时启用。
-优化推送策略，避免频繁唤醒设备。
-减少轮询，优先使用长连接或系统推送机制。
-工具：Energy Log 监控 CPU、网络、位置服务对电量的影响。
```

3、如何分析和解决 iOS 应用的性能瓶颈？

```
1、收集数据
Time Profiler（CPU）、Core Animation（GPU）、Allocations/Leaks（内存）、Energy Log（电量）。
Xcode Metrics（实时监控 CPU、内存、FPS）。

2、定位问题
CPU：主线程耗时（计算、同步 I/O）。
GPU：低 FPS、复杂视图层级、离屏渲染。
内存：峰值过高、泄漏、大对象未释放。
电量：高频网络请求或后台服务。

3、解决思路
CPU：异步任务 + 算法优化
GPU：减少离屏渲染，简化 UI 层级
内存：按需加载，autoreleasepool 管理临时对象
电量/网络： 请求合并，后台任务最小化

4、验证效果
优化后重新运行 Instruments，确认指标下降。
```

4、如何优化 iOS 应用的 CPU、GPU、内存和电量性能？

```
1、CPU
-避免主线程执行耗时操作（JSON 解析、加密、图片解码）。
-异步任务（GCD/NSOperation），优化算法复杂度。
-工具：Time Profiler。

2、GPU
-减少离屏渲染（圆角、阴影、遮罩）。
-使用不透明视图，降低混合开销。
-启用异步绘制。
-工具：Core Animation。

3、内存
-及时释放对象，管理内存峰值（autoreleasepool）。
-按需加载资源（图片分页、延迟解码）。
-使用缓存池（NSCache）。
-工具：Allocations、Leaks、Memory Graph。

4、电量
-减少后台任务和位置服务，优化推送策略。
-合并请求，使用 HTTP/2/QUIC。
-工具：Energy Log。
```

### 3.3 iOS性能优化与稳定性—应用稳定性

面试考点

```
1.崩溃分析：掌握崩溃日志定位方法，熟练使用工具（Xcode Organizer、Crashlytics、Bugly）。
2.卡顿检测与优化：识别主线程阻塞，提升 UI 流畅度。
3.稳定性测试：设计多维度测试策略，保障应用在真实场景下稳定运行。
```

1、如何分析iOS崩溃日志？

```
1、获取日志
-本地：通过 Xcode Organizer 下载设备/用户崩溃日志，结合 .dSYM 文件进行符号化。
-线上：集成 Firebase Crashlytics / Bugly 收集并聚合崩溃报告。

2、分析步骤
-符号化后检查调用栈，定位崩溃点（方法、类、行号）。
-常见崩溃类型：
 EXC_BAD_ACCESS → 野指针 / 悬空指针访问。
 数组越界 → 非法下标访问。
 KVO/KVC → 观察者未移除 / 访问不存在的键。
 多线程 → 非线程安全操作（如 UIKit 在子线程调用）。

3、优化措施
-防御性编程：空值检查、边界检查。
-使用 NSAssert 或日志提前发现异常。
-保证线程安全（如使用锁、GCD barrier(屏障)）。

4、追问点补充

4.1、为什么需要 dSYM 符号化？ 
因为崩溃日志只有内存地址，必须映射到符号表才能看到方法名和行号。
```

2、什么是卡顿？如何检测和优化？

```
1、定义
卡顿 = 主线程阻塞 → UI 无响应。
iOS 刷新率为 60 FPS（每帧 16.67ms），单帧渲染超过此阈值即掉帧。

2、检测方法
-Instruments → Time Profiler：分析主线程方法耗时。
-FPS 监控：CADisplayLink 统计帧率，实时检测 UI 流畅度。
-RunLoop 监控：监听主线程RunLoop状态(kCFRunLoopBeforeSources → kCFRunLoopAfterWaiting)，统计耗时是否超阈值。

3、优化策略
-将耗时任务（网络请求、JSON 解析、图片解码）移到子线程（GCD、NSOperation）。
-优化 UI 渲染：减少离屏渲染，降低视图层级。
-避免主线程 IO（文件/数据库操作）。

4、追问点补充

4.1、如何判断严重卡顿？ 
FPS < 30 持续一段时间，或 RunLoop 单次耗时 > 400ms。
```

3、如何设计 iOS 应用的稳定性测试策略？

```
1、稳定性测试策略
-压力测试：高频操作、弱网、大数据场景，观察崩溃/卡顿情况。
-异常捕获：接入 Crashlytics / Bugly，收集线上崩溃。
-真实用户监控（RUM）：采集设备型号、系统版本、内存、电量等信息，定位高风险场景。
-自动化测试：XCTest 单元/ UI 测试，覆盖边界情况。
-灰度发布：小范围试运行，降低大规模崩溃风险。

2、追问点补充

2.1、弱网环境如何模拟？ 
使用 Xcode Network Link Conditioner 或 Charles 限速功能。
```

4、如何进行崩溃分析和卡顿优化？

```
1、崩溃分析
-工具：Xcode Organizer（符号化日志）、Crashlytics/Bugly（线上收集）。
-步骤：定位调用栈 → 分析野指针/越界/线程问题。
-优化：增加防御性代码，确保线程安全。

2、卡顿优化
-检测：Time Profiler、RunLoop 监控、FPS 监控。
-优化：异步任务、减少离屏渲染、简化 UI 层级。

3、常用工具
-Instruments：Time Profiler、Core Animation、Energy Log。
-第三方：Crashlytics、Bugly。
```

