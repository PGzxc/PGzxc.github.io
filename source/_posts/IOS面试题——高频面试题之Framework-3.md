---
title: IOS面试题——高频面试题之Framework(3)
categories:
  - 面试相关
  - IOS面试题
tags:
  - IOS面试题
abbrlink: f1ee93de
date: 2025-09-24 15:58:21
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
1、Cocoa Touch框架(又叫Framework/ios SDK) 
-UIKit:自定义控件、事件传递、交互式动画
-Foundation:集合类(NSArray等)、字符串、KVO/KVC等原理
-CoreAnimation:CALayer、渲染、性能优化
-其他:如Core Data、AVFoundation、URLSession，视需求补充

2、Runtime动态机制:消息转发(forwardingTargetForSelector、forwardInvocation)、Method Swizzling、Category、关联对象
3、RunLoop 底层原理:事件循环、线程保活、Timer/NSTimer
4、内存管理:ARC原理、引用计数、循环引用(weak/unowned)优化
5、通信机制:Delegate模式、KVO(事件通知应用)、Reactive Cocoa(RAC)信号流及Notification Center
```

### 2.2 说明

```
由于Cocoa Touch框架内容较多，本文作为Cocoa Touch框架专题
其他内容转移到下一章节：底层
```

## 三 面试题解答(仅供参考)

### 3.1 Cocoa Touch框架—UIKit

面试考点

```
事件传递与响应链（hitTest、pointInside、nextResponder）
自定义控件（UIView/UIControl 的绘制、布局、交互）
交互式动画（UIView.animate、UIViewPropertyAnimator、Core Animation）
```

1、事件传递机制是怎样的？(iOS 事件传递流程是怎样的？)

```
1、流程：
事件由 UIApplication → UIWindow → UIViewController.view，
通过 递归调用 hitTest(_:with:) 定位最合适的响应视图。

2、关键方法：
-hitTest(_:with:)：遍历子视图，返回最终响应的视图。
-point(inside:with:)：判断触摸点是否在当前视图范围内。

3、扩展：
重写 hitTest 或 pointInside 可自定义事件响应区域（如扩大按钮点击范围）。
```

2、什么是 UIKit 的事件响应链？

```
1、定义：事件未被当前视图处理时，沿响应者链上行传递，直至被处理或到达链末端。

2、链条：
UIView → 其 superview。
UIViewController → 其 view 的 superview。
UIWindow → UIApplication → AppDelegate。
或
UIView → superview → UIViewController → UIWindow → UIApplication → AppDelegate

3、机制：
通过 nextResponder 属性传递，类似冒泡机制
```

3、如何创建自定义控件？

```
1、继承方式：
-UIView：适合绘制型控件（需自定义渲染）。
-UIControl：适合交互型控件（内置事件分发）。

2、实现要点：
-绘制：重写 draw(_:) 或使用 CALayer。
-布局：重写 layoutSubviews()，配合 Auto Layout 或手动 frame。
-交互：重写触摸事件方法（touchesBegan 等）或使用 UIGestureRecognizer。
-优化：减少复杂计算，支持 Accessibility。
```

4、如何实现交互式动画？

```
1、工具选择：
-UIView.animate：简单补间动画。
-UIViewPropertyAnimator：支持暂停/恢复，常用于手势驱动（如拖拽退出）。
-Core Animation：复杂、高性能动画（如 3D 效果）。

2、优化：
-使用 UISpringTimingParameters 模拟自然效果。
-动画需在 主线程 执行，耗时计算放在后台，保证流畅度
```

5、必考总结

```
事件传递（hitTest/pointInside）+ 响应链（nextResponder） 是必考。
自定义控件 常考点在绘制、布局和交互分工。
动画部分 要能区分 UIView.animate、UIViewPropertyAnimator、Core Animation 的适用场景。
```

### 3.2 Cocoa Touch框架—Foundation

面试考点

```
集合类：NSArray、NSDictionary、NSSet 的特性和使用场景。
字符串处理：NSString 和 NSMutableString 的操作及本地化支持。
KVC/KVO：键值编码和键值观察的原理及实现机制。
线程安全：集合类的线程安全优化方法。
```

1、Foundation的主要集合类有哪些？区别是什么？

```
1、常见类型：
-NSArray/NSMutableArray：有序数组，适合按索引访问。
-NSDictionary/NSMutableDictionary：键值对集合，适合快速查找。
-NSSet/NSMutableSet：无序且唯一，适合去重和快速判断包含关系。

2、区别：
-不可变类（NSArray等） → 天生线程安全，性能优。
-可变类（NSMutableArray等） → 更灵活，但需手动保证线程安全。

3、Swift 桥接：
Array/Dictionary/Set为值类型，类型安全且多线程更安全。
```

2、Foundation的字符串处理如何实现？

```
1、类：
-NSString：不可变，适合静态文本操作。
-NSMutableString：可变，支持拼接、替换等动态操作。

2、常用操作：
-拼接：stringByAppendingString: / appending
-查找：rangeOfString: / contains
-本地化：NSLocalizedString

3、Swift 桥接：
String 更现代化，值类型设计减少内存安全问题
```

3、KVC(Key-Value Coding：键值编码)原理是什么？

```
1、定义：
通过字符串键间接访问对象属性(valueForKey:/setValue:forKey:)。

2、查找顺序：
-优先查找 getter/setter 方法：set<Key>: → _set<Key>: → setIs<Key>:
-若不存在，且accessInstanceVariablesDirectly = YES，
则访问实例变量：_<key> → _is<key> → <key> → is<key>

3、依赖：基于 Objective-C Runtime，动态反射能力强，常用于 JSON 映射、动态绑定。
```

4、KVO(Key-Value Observing:键值观察)原理是什么？

```
1、定义：
观察对象属性的变化并通知观察者（观察者模式）。

2、实现机制：
-运行时 isa-swizzling：为被观察对象动态生成子类（如 NSKVONotifying_MyObject）。
-重写 setter 方法，在赋值前后调用 willChangeValueForKey:/didChangeValueForKey:。
-通知所有注册观察者。

3、应用：UI 更新、数据同步。
4、注意点：手动移除观察者（iOS 11+ 的 NSKeyValueObservation 自动管理更安全）。
```

5、如何保证集合类的线程安全？

```
1、不可变集合：
如 NSArray、NSDictionary，天生线程安全。

2、可变集合：如 NSMutableArray、NSMutableDictionary，需保护：
-NSLock、@synchronized、或 GCD barrier 队列。
-使用 不可变副本 copy 替代。
-或使用更合适的数据结构（如 NSCache、NSMapTable）。

3、最佳实践：
在多线程环境下，优先使用 不可变集合 + Swift 值类型，避免复杂锁开销。
```

6、必考总结

```
集合类特性 + Swift 值类型桥接 是高频考点。
KVC/KVO 原理（方法查找、isa-swizzling） 是必问底层机制。
线程安全 问题可结合实际项目举例（如多线程读写缓存）。
```

### 3.3 Cocoa Touch框架—CoreAnimation

面试考点

```
CALayer 与 UIView 的关系（职责分工）
Core Animation 渲染过程与动画机制
性能优化手段（离屏渲染、光栅化、工具分析）
```

1、CALayer 与 UIView 的关系

```
1、分工：
-UIView：负责用户交互、事件传递、触摸响应。
-CALayer：负责内容绘制、动画和高效渲染，运行在 GPU 上。

2、绑定关系：
每个 UIView 默认都有一个根 CALayer（view.layer），UIView 通过它来完成显示。

3、特点：
-CALayer 支持复杂的 2D/3D 变换、阴影、圆角、渐变等视觉效果。
-UIView 更偏 UI 逻辑层，CALayer 更偏渲染层。
```

2、Core Animation 的渲染过程是怎样的？

```
1、渲染机制：
-Core Animation 会维护Layer树(渲染树)，在后台线程准备好数据后，提交给 GPU 合成。
-渲染是 异步 的，不会阻塞主线程。

2、动画类型：
-CABasicAnimation：单一属性插值动画。
-CAKeyframeAnimation：关键帧动画。
-CATransaction：批量提交动画事务。

3、特点：
-Core Animation的动画 不会直接修改Layer的实际属性值，而是作用于“显示树”(Presentation Layer)。
-支持 隐式动画(修改部分属性自动产生过渡)和显式动画(通过CAAnimation定义)。
```

3、如何优化Core Animation性能？

```
1、常见优化点：
-光栅化：layer.shouldRasterize = YES 缓存静态内容，减少重复绘制。
-透明度优化：layer.opaque = YES 避免 GPU 透明度混合。
-阴影优化：指定 shadowPath，避免动态计算阴影轮廓。
-减少离屏渲染：避免在 maskToBounds 同时使用阴影、圆角等情况。
-简化层级：减少不必要的嵌套层，降低 GPU 合成开销。

2、工具支持：
-使用 Instruments（Core Animation Profile） 检查掉帧、离屏渲染。
-关注 FPS、CPU、GPU 占用率，避免频繁触发重绘。
```

4、必考总结

```
UIView vs CALayer 职责分工 是必考点。
Core Animation 渲染机制（异步 + GPU 合成 + 不改变真实属性）要记牢。
性能优化 常结合 Instruments 举例，面试时最好能说出实际项目中的优化案例
```

### 3.4 Cocoa Touch框架—其他

面试考点

```
Core Data：对象图管理与持久化
AVFoundation：音视频捕获、播放、编辑
URLSession：网络请求与配置
```

1、什么是 Core Data？如何使用？与 SQLite/Realm 对比？

```
1、定义：
对象图管理框架，负责对象的持久化与关系管理，本质不是数据库。

2、使用流程：
-配置：NSPersistentContainer 初始化，.xcdatamodeld 定义实体与关系。
-操作：NSManagedObjectContext 管理对象；NSFetchRequest 查询；context.save() 持久化。
-功能：关系映射、撤销/重做、数据迁移、iCloud 同步。

3、对比：
-Core Data：高层抽象，适合复杂对象关系，功能全面。
-SQLite：轻量、性能高，但需手写 SQL。
-Realm：跨平台、易用，性能优于 Core Data，学习成本低。

4、面试重点：
强调 Core Data 不是数据库，而是 对象图管理。
```

2、AVFoundation 如何处理音视频？

```
1、定义：
音视频处理框架，覆盖采集、播放、编辑全流程。

2、核心类：
-AVPlayer：音视频播放，支持本地和流媒体。
-AVCaptureSession：采集音视频（摄像头/麦克风）。
-AVAssetExportSession：音视频编辑和导出。
-AVAudioPlayer：简单音频播放。

3、应用场景：录音、视频播放、实时流媒体、剪辑。
4、特点：灵活性强，功能丰富，但需注意性能和资源权限管理。
```

3、URLSession如何进行网络请求？

```
1、定义：
基于 HTTP/HTTPS 的网络请求框架，支持异步任务。

2、任务类型：
-dataTask：获取数据（如 JSON）。
-downloadTask：下载文件，支持断点续传。
-uploadTask：上传数据或文件。

3、配置：
-默认会话：带缓存，常用。
-临时会话：无持久化，适合一次性任务。
-后台会话：支持进程外下载/上传，适合长任务。

3、处理方式：
-回调：完成闭包或代理（URLSessionDelegate）。
-Swift：推荐使用 async/await 简化异步。

4、扩展：支持认证、请求头定制、断点续传。
5、面试重点：异步机制、会话配置（尤其是后台任务）
```

