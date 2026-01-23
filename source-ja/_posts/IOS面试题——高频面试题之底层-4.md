---
title: IOS面试题——高频面试题之底层(4)
categories:
  - 面试相关
  - IOS面试题
tags:
  - IOS面试题
abbrlink: cdc2a188
date: 2025-09-24 17:55:58
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
5、通信机制:Delegate模式、KVO(事件通知应用)、ReactiveCocoa(RAC)信号流及Notification Center
```

## 三 面试题解答(仅供参考)

### 3.1 Runtime动态机制

面试考点

```
消息发送与转发：objc_msgSend 和消息转发流程（动态解析、快速转发、完整转发）。
Method Swizzling：方法实现交换的原理与应用。
Category 与关联对象：扩展类功能和动态添加属性的机制。
```

1、iOS 的消息发送机制是怎样的？

```
1、本质
[obj foo] → objc_msgSend(obj, @selector(foo))，运行时查找方法实现。

2、查找流程
-在类或父类的 method_list 中查找。
-未找到 → 进入消息转发流程。

3、特点
-动态绑定，运行时决定调用，灵活性强。
-性能优化：内联缓存（PIC）、方法缓存（cache_t）。

4、追问点
4.1、动态 vs 静态语言：Objective-C 运行时绑定，C++/Java 等编译期绑定。
4.2、为什么 objc_msgSend 比直接调用快？ → 方法缓存 + 内联优化。
```

2、消息转发过程是怎样的？与 Proxy 的区别？

```
1、三级转发流程
-resolveInstanceMethod:：动态添加方法（class_addMethod）。
-forwardingTargetForSelector:：快速转发，交给其他对象。
-methodSignatureForSelector: + forwardInvocation:：完整转发，封装为 NSInvocation，自定义处理。

2、异常处理
若均未处理 → 抛出 doesNotRecognizeSelector: 崩溃。

3、应用场景
-动态方法解析（延迟加载）。
-消息代理/多播代理。
-容错机制（如日志记录）。

4、Proxy 对比
-消息转发：Runtime 默认兜底机制，开销较大。
-Proxy（NSProxy 子类）：轻量级对象，专门用于消息拦截和转发，常用于多代理实现。

5、追问点：如何实现多播代理？
通过 NSProxy + NSPointerArray，在 forwardInvocation: 遍历代理对象并分发消息。
```

3、什么是 Method Swizzling？原理和应用场景？

```
1、定义
使用 method_exchangeImplementations 交换方法 IMP（函数指针），改变运行时行为。

2、原理
方法由 SEL（选择子）、IMP（函数实现）、类型编码组成，Swizzling 通过交换 IMP 改变执行逻辑。

3、实现方式
一般在 +load 中执行（类加载时调用）。
使用 dispatch_once 保证线程安全。

4、应用场景
AOP：埋点统计（如自动埋点 viewDidLoad）。
Bug 修复：防止 NSArray 插入 nil 崩溃。
功能增强：修改系统 API 行为（如自定义 imageNamed: 缓存策略）。

5、注意事项
避免多次交换造成逻辑混乱。
谨慎使用，影响可读性和维护性。

6、追问点

6.1、Swizzling vs Hook：
Swizzling 仅限 ObjC 方法，Hook（如 fishhook）可作用于 C 函数/系统调用。

6.2、为什么在 +load 而不是 +initialize 中执行？
+load 更早执行且只执行一次，避免竞争条件。
```

4、Category 能否添加属性？什么是关联对象？

```
1、Category
-运行时扩展类方法，无需继承。
-无法直接添加实例变量，方法同名时后编译的覆盖前者。

2、关联对象（Associated Objects）
-objc_setAssociatedObject / objc_getAssociatedObject 实现“伪属性”。
-底层通过全局哈希表维护，支持 strong/weak/copy。

3、应用场景
扩展系统类或三方库类的数据存储（如状态标记）。

4、注意事项
强引用需在 dealloc 手动释放，否则可能内存泄漏。

5、追问点
5.1、Category vs Extension：
Extension：编译期，需源码，可添加实例变量。
Category：运行时，无需源码，不能添加实例变量。

5.2、如何避免内存泄漏？
在合适时机清理关联对象。
```

### 3.2 RunLoop 底层原理

面试考点

```
RunLoop 作用：线程保活和事件管理。
RunLoop 机制：事件循环、模式切换及线程关系。
NSTimer 与 RunLoop：定时器触发机制及优化。
```

1、什么是 RunLoop？它的主要作用是什么？

```
1、定义
RunLoop 是事件处理循环，用于等待并分发事件（UI 事件、定时器、网络回调等）。

2、作用
-线程保活：主线程默认有 RunLoop；子线程需手动启动，否则任务完成后线程销毁。
-事件管理：统一调度输入源（Source）、定时器（Timer）、观察者（Observer）。

3、特点
通过运行模式（如 NSDefaultRunLoopMode、UITrackingRunLoopMode）来区分和调度事件，避免 CPU 空转。
```

2、RunLoop 的事件循环如何工作？

```
1、工作流程
-等待事件（Source/Timer/Observer）。
-事件到来时唤醒线程，处理事件。
-处理完毕进入休眠，直到下一个事件。
-可通过 CFRunLoopStop 或无事件源退出。

2、模式（Mode）
-NSDefaultRunLoopMode：默认模式，处理一般事件。
-UITrackingRunLoopMode：UI 滑动模式，优先处理滚动。
-模式切换时，非当前模式的事件可能暂停。

3、结构
CFRunLoop（Core Foundation 层）内部由 Source、Timer、Observer 组成。
```

3、子线程默认有 RunLoop 吗？如何保活线程？

```
1、默认情况
子线程默认没有 RunLoop，任务执行完会退出。

2、如何保活
-启动方式：[[NSRunLoop currentRunLoop] run] 或 CFRunLoopRun()。
-必须添加输入源（如 NSMachPort、NSTimer），否则立即退出。

3、应用
常用于常驻子线程，处理网络、定时任务或长连接。
```

4、NSTimer 如何与 RunLoop 交互？常见问题是什么？

```
1、交互关系
-NSTimer 必须加入 RunLoop 的某个 Mode 才能触发。
-仅在对应 Mode 下执行，例如：默认模式下的 Timer 在滑动（UITrackingRunLoopMode）时会暂停。

2、常见问题
-滑动 UIScrollView 时 Timer 停止。
-解决办法：将 Timer 加入 NSRunLoopCommonModes，保证多模式下运行。

3、优化
-设置 tolerance（触发容差）降低功耗。
-高精度或后台任务建议使用 GCD 的 DispatchSourceTimer 替代。
```

### 3.3 内存管理

面试考点

```
ARC原理：自动引用计数机制及 dealloc 作用。
引用计数管理：retain、release 和 autorelease 的行为。
循环引用：使用 weak 和 unowned 解决循环引用问题。
AutoreleasePool：临时对象管理及内存优化。
```

1、ARC 的原理是什么？dealloc 的作用？

```
1、ARC 原理
-自动引用计数(Automatic Reference Counting)，
LLVM编译器在编译期自动插入 retain、release 和 autorelease。

-每个对象维护引用计数，强引用增加计数，计数为 0 时释放。

2、dealloc 作用
-当引用计数为 0，系统调用 dealloc 释放对象资源。
-可用于移除通知、KVO 观察者、释放 Core Foundation 对象。
-ARC 下无需手动 [super dealloc]，编译器自动处理。

3、特点
自动管理内存，减少手动 retain/release 错误
```

2、ARC 如何管理引用计数？

```
1、机制：
retain：增加引用计数（+1）。
release：减少引用计数（-1）。
autorelease：将对象加入 AutoreleasePool，在池子销毁时延迟 release。

2、管理：
-强引用（strong）增加计数，释放后计数减 1。
-计数为 0 时触发 dealloc（Swift 中为 deinit）。

3、注意：
ARC 自动插入内存管理代码，开发者只需关注引用关系。
```

3、如何处理 ARC 中的循环引用？

```
1、定义
对象间相互强引用导致无法释放，如 A 持有 B，B 持有 A。

2、解决方案
weak：不增加引用计数，对象释放后自动置 nil，适合可选引用（如 delegate）。
unowned：不增加引用计数，假定引用始终有效，对象释放后不置 nil，访问失效引用会崩溃。

3、典型场景
-委托模式（delegate）通常使用 weak。
-闭包中用 [weak self] 或 [unowned self] 避免循环引用。
```

4、weak 和 unowned 的区别？

```
1、对比
1.1、weak：
引用计数：不增加
对象释放后：自动置 nil
使用场景：可选引用、委托
性能：有轻微置零开销

1.2、unowned：
引用计数：不增加
对象释放后：不置 nil
使用场景：生命周期明确、不可选
性能：略优于 weak

2、选择策略
-优先使用 weak 保证安全
-明确生命周期且无 nil 场景可用 unowned
```

5、AutoreleasePool 的原理及用途？

```
1、原理
-管理临时对象，对象调用 autorelease 后加入池子。
-池子销毁时调用池内对象 release。

2、用途
-循环中批量创建对象，降低内存峰值。
-后台线程或高内存消耗任务中手动管理。

3、实现
-ARC 下使用 @autoreleasepool {} 包裹代码。
-主线程 RunLoop 自动管理，子线程需手动创建。
```

### 3.4 通信机制

面试考点

```
Delegate：一对一解耦通信  
KVO：属性变化监听与事件通知  
Notification Center：一对多广播机制  
ReactiveCocoa/ReactiveSwift：响应式编程与信号流处理  
对比分析：Delegate、KVO、Notification、Block 的适用场景
```

1、什么是 Delegate 模式？何时使用？

```
1、定义
一对一协议，调用方将任务委派给代理对象（如 UITableViewDelegate 处理行选择）。

2、特点
-同步调用
-解耦调用方与实现方
-可返回结果或执行操作

3、适用场景
-UI 交互回调（表格行点击、文本输入）
-需要明确职责分工

4、注意事项
使用 weak 修饰 delegate 避免循环引用
```

2、KVO(Key-Value Observing)在事件通知中的作用是什么？

```
1、定义
监听 @objc dynamic 属性变化，通过 observeValue(forKeyPath:) 回调通知

2、实现原理
-基于 Runtime 的 isa-swizzling
-动态重写 setter 方法

3、适用场景
-数据驱动 UI（MVVM 中模型到视图绑定）
-对象状态变化监听

4、注意事项
-必须手动移除观察者，防止崩溃
-iOS 13+ 可考虑 Combine 替代
```

3、Notification Center 的作用及与 Delegate/KVO 的对比？

```
1、定义：
通过 post(name:object:userInfo:) 实现一对多广播，解耦发送方与接收方。

2、特点：
-全局通知，适合跨模块通信。
-异步调用，松耦合，但调试复杂


3、对比：
3.1、Delegate：
特点：一对一，同步，协议驱动
适用场景：UI 回调

3.2、KVO：
特点：属性监听，需管理观察者
适用场景：数据驱动绑定

3.3、Notification：
特点：一对多，异步，松耦合
适用场景：模块间事件通知

4、注意事项
iOS 13+ 推荐 Combine 或 async/await 替代
```

4、ReactiveCocoa / ReactiveSwift

```
1、定义
响应式编程框架，使用 Signal / SignalProducer 处理异步数据流

2、功能
链式操作：map、filter、combineLatest 等
替代传统 Delegate/KVO/Target-Action，简化异步逻辑

3、示例
button.rac_signalForControlEvents:UIControlEventTouchUpInside

4、适用场景
-网络响应更新 UI
-管理复杂异步逻辑

5、注意事项
-学习曲线陡
-iOS 13+ 可用 Combine
```

5、Delegate、KVO、Notification 和 Block 的区别及适用场景？

5-1、对比

|         机制          |                 特点                 |     典型场景      |      选择建议      |
| :-------------------: | :----------------------------------: | :---------------: | :----------------: |
|       Delegate        |        一对一，同步，协议驱动        |    UI 控件回调    | 优先使用，职责明确 |
|          KVO          | 属性变化监听，数据驱动，需管理观察者 |   模型-视图绑定   |    简单绑定可用    |
|     Notification      |         一对多，异步，松耦合         |    跨模块事件     |   调试复杂，慎用   |
|         Block         |          轻量回调，语法简洁          | 异步操作完成回调  |    单次回调首选    |
| ReactiveSwift/Combine |       链式响应式，复杂异步管理       | 网络数据流/UI更新 |  复杂异步场景使用  |

5-2、总结建议

```
简单回调用 Delegate / Block
属性绑定用 KVO
跨模块通知慎用 Notification
复杂异步逻辑用 ReactiveSwift / Combine
```

