---
title: IOS面试题——高频面试题之核心机制(5)
categories:
  - 面试相关
  - IOS面试题
tags:
  - IOS面试题
abbrlink: 591d2077
date: 2025-09-25 15:57:51
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
1.事件循环(RunLoop)如：线程管理、事件处理、UI刷新，
2.事件响应链：用户触摸事件、手势事件的传递和响应机制
```

## 三 面试题解答(仅供参考)

### 3.1 事件循环(RunLoop)

面试考点

```
1.线程管理：主线程 RunLoop 自动创建，负责 UI 和事件处理；子线程需手动启动。
2.事件处理：管理输入源（Port、Custom Source）、定时器（NSTimer、CADisplayLink）。
3.UI 刷新：主线程 RunLoop 与 Core Animation 协作，实现每秒 60 帧渲染。
```

1、什么是 RunLoop？它的主要作用是什么？

```
1、定义：
iOS 线程的事件循环，用于监听输入源和定时器，管理线程生命周期。

2、作用：
-保持线程存活，避免频繁创建/销毁
-处理用户交互、网络响应和定时任务
-主线程驱动 UI 刷新，与 Core Animation 协作
-子线程可用于长时间后台任务

3、示例：
主线程自动处理点击事件，子线程 RunLoop 可监听持续网络回调
```

2、主线程和子线程的 RunLoop 有何区别？

```
1、主线程 RunLoop：
创建：系统自动（UIApplicationMain）
输入源：默认包含端口、定时器、UI事件
用途：UI事件处理、定时器触发、动画渲染

2、子线程 RunLoop：
创建：默认不创建，需要手动启动
输入源：需显式添加，否则立即退出
用途：后台任务、网络监听、定时操作

3、注意：
子线程必须至少有一个输入源或定时器，否则 RunLoop 会退出
```

3、RunLoop 的模式是什么？常见模式有哪些？

```
1、作用：控制当前循环处理的事件源和定时器

2、常见模式：
-NSDefaultRunLoopMode：处理常规事件
-UITrackingRunLoopMode：滚动或拖拽时优先触摸事件
-NSRunLoopCommonModes：组合模式，保证定时器在滑动时仍触发
```

4、为什么 NSTimer 在子线程中不工作？如何解决？

```
1、原因
NSTimer 依赖 RunLoop 触发事件，而子线程默认无运行的 RunLoop，导致定时器无效。

2、解决方法：
-在子线程获取当前 RunLoop：[NSRunLoop currentRunLoop]。
-将 NSTimer 添加到 RunLoop 的指定模式（如 NSRunLoopCommonModes）。
-调用 [runLoop run] 或 [runLoop runUntilDate:] 启动 RunLoop。

3、注意：
需确保 RunLoop 有至少一个输入源或定时器，否则会立即退出。
```

5、如何让子线程保持存活并处理事件？

```
1、说明：
子线程执行完任务后会退出，要保持存活需启动 RunLoop：

2、步骤
-获取当前线程的 RunLoop：[NSRunLoop currentRunLoop] 或 CFRunLoopGetCurrent()。
-添加至少一个输入源（如 NSPort）或定时器（如 NSTimer），否则 RunLoop 会退出。
-调用 [runLoop run] 或 CFRunLoopRun() 启动 RunLoop。

3、注意：
可通过 CFRunLoopStop() 停止 RunLoop，或设置退出条件（如定时器失效）。
```

6、RunLoop 如何与 UI 刷新和 Core Animation 协作以保证 60fps 渲染？

```
1、如何保证
-主线程 RunLoop 在循环结束阶段通知 Core Animation 提交图层变更
-保持与屏幕刷新率（60Hz）同步
-自定义动画：可用 CADisplayLink

2、注意：主线程阻塞会导致掉帧
```

7、RunLoop 与 DispatchQueue 在线程管理上有何不同？

```
1、RunLoop：
-机制：事件循环，持续处理输入源和定时器
-线程管理：与线程绑定，需手动管理模式和输入源
-场景：UI刷新、持续事件循环

DispatchQueue(GCD)：
-机制：任务队列，异步执行独立任务
-线程管理：自动管理线程池，抽象线程细节
-场景：一次性后台任务、计算或网络请求

3、结合使用：
RunLoop 处理 UI/事件，DispatchQueue 处理后台任务，可用 dispatch_source_t 集成 GCD 事件源
```

8、RunLoop 如何处理输入源和定时器事件？

```
1、RunLoop 监听两种主要事件源：

1.1、输入源（Sources）：
-Port-Based：如 NSMachPort，用于进程间通信。
-Custom Sources：开发者自定义的事件源，通过 CFRunLoopSource 管理。

1.2、定时器（Timers）：
如 NSTimer 或 CADisplayLink，在指定时间触发回调。

2、工作流程：
-RunLoop 检查输入源和定时器是否有事件。
-事件到达时唤醒线程，调用回调（如 NSTimer 的 selector）。
-处理完事件后通知观察者（如 UI 刷新），然后休眠等待新事件。

3、注意：
事件处理依赖当前 RunLoop 模式，若模式不包含对应源，事件不会触发。
```

### 3.2 事件响应链

面试考点

```
1.由UIResponder对象(UIView、UIViewController、UIWindow、UIApplication)组成层次结构，传递和处理事件（触摸、摇晃等）。
2.事件传递：通过 hitTest:withEvent: 找到第一响应者，事件自下而上传递。
3.手势识别：UIGestureRecognizer 优先于原始触摸事件，简化复杂手势处理。
```

1、什么是 iOS 的事件响应链？

```
1、定义：
由 UIResponder 对象组成的层次结构，用于传递和处理用户事件。

2、工作流程：
-事件从 UIApplication → UIWindow → hitTest:withEvent: 找到第一响应者
-第一响应者处理事件（touchesBegan/TouchesMoved 等）
-若未处理，通过 nextResponder 逐级向上传递（父视图 → 控制器 → UIWindow → UIApplication → AppDelegate）

3、作用：
保证事件有序传递，实现灵活交互处理
```

2、触摸事件(如 touchesBegan、touchesMoved)如何在响应链中传递和处理？

```
1、触摸事件
-系统通过 hitTest:withEvent: 找到最深层视图（第一响应者）
-调用对应方法：touchesBegan、touchesMoved、touchesEnded
-若未处理，沿 nextResponder 向上传递
-多点触控：UIEvent 封装所有触摸点

2、示例：
点击按钮 → 按钮收到 touchesBegan → 若不处理事件传至父视图
```

3、hitTest:withEvent: 和 pointInside:withEvent: 的作用与区别？

```
1、作用
pointInside:withEvent:：判断触摸点是否在视图边界内（包括子视图）。返回 YES 表示可能响应事件。
hitTest:withEvent:：递归遍历视图层级，调用 pointInside:withEvent:，
找到最深层能响应事件的视图。返回 nil 则跳过该视图及其子视图。

2、区别：
pointInside 是局部判断，hitTest 是全局搜索，决定第一响应者。
```

4、手势识别器(如 UIPanGestureRecognizer)如何与响应链和触摸事件整合？

```
1、附加方式：
手势识别器附加到视图上，优先拦截触摸事件

2、机制：
分析触摸序列，识别手势，触发回调

3、冲突处理：
-require(toFail:) 设置优先级
-gestureRecognizer:shouldReceiveTouch: 控制触摸接收

4、事件阻止：
识别成功可通过 cancelTouches 阻止原触摸传递
```

5、如何修改事件响应链？

```
1、默认机制：
nextResponder 决定传递路径

2、修改方法：
-重写 nextResponder 自定义路径
-重写 hitTest:withEvent: 指定第一响应者
-设置 userInteractionEnabled = false / hidden = true / alpha < 0.01 阻止响应
```

6、如何控制事件传递？

```
1、阻止事件：
-userInteractionEnabled = false 或 alpha < 0.01
-重写 pointInside:withEvent: 返回 NO
-重写 hitTest:withEvent: 返回 nil 或指定视图

2、手势优先级：
require(toFail:) 或代理方法控制
```

7、手势识别器与触摸事件的区别？

|   特性   | 触摸事件 |           手势识别器            |
| :------: | :------: | :-----------------------------: |
|   类型   | 原始事件 |            高级封装             |
|   适用   | 简单交互 |      复杂手势(拖拽、捏合)       |
| 状态管理 |    无    | 提供 .began / .changed / .ended |
|  优先级  |    低    |    优先触发，可阻止触摸事件     |

示例：使用 UITapGestureRecognizer 替代 touchesBegan 处理点击

8、为什么 UIGestureRecognizer 比 touchesBegan 更常用？

```
1、原因
简化手势逻辑，无需手动解析触摸点
提供明确状态管理（.began、.ended）
支持多手势协调，易控制优先级
先于触摸方法处理事件，快速响应交互

2、示例：
UIPinchGestureRecognizer 实现缩放比手动解析多点触摸更高效
```

9、如何让视图无法响应或拦截事件？

```
1、无法响应：
userInteractionEnabled = false
hidden = true 或 alpha < 0.01
重写 pointInside:withEvent: 返回 NO

2、拦截事件：
重写 hitTest:withEvent: 返回指定视图
手势识别器拦截并 cancelTouches
```

