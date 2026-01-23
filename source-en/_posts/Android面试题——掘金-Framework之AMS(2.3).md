---
title: Android面试题——掘金-Framework之AMS(2.3)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: deb56c6e
date: 2025-04-04 11:44:33
---
## 一 概述

```
AMS（ActivityManagerService）是 Android Framework 中的核心服务，
主要负责 Activity、Task、Process、Broadcast 等管理。
以下是 AMS 相关的高频面试题及解析：
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 AMS（ActivityManagerService）是什么？

```
AMS 是 Android 系统的进程管理核心，负责：

-Activity 生命周期管理（启动、切换、销毁）。
-应用进程管理（进程启动、回收）。
-Task 栈管理（Activity 任务栈）。
-Broadcast 管理（系统/应用广播）。
-应用调度（优先级管理、前后台切换）。
-ANR 监控（无响应检测）。

AMS 运行在 system_server 进程 中，和 WMS（WindowManagerService）等核心服务协同工作。
```

### 2.2 AMS 启动流程？

```
AMS 在 SystemServer 启动时初始化，关键流程：

1.SystemServer 进程启动
入口：com.android.server.SystemServer#main()

2.创建 AMS
ActivityManagerService main()

3.初始化进程、服务
AMS.attachSystemContext()

4.注册 SystemService
SystemServiceManager.startService(ActivityManagerService.class)


AMS 是 Android 进程启动管理的核心，会 启动 Launcher，并等待应用进程连接
```

### 2.3 Activity 启动流程？

```
当 startActivity(Intent) 被调用时，系统如何启动 Activity？

1.Activity 调用 startActivity()
2.Instrumentation 代理 AMS 调用 ActivityTaskManagerService
3.AMS 调用 startProcessLocked():如果目标应用进程不存在，则 fork Zygote 进程 启动应用
4.ApplicationThread 回调 Activity 启动:ActivityThread.handleLaunchActivity()
5.调用 performLaunchActivity():通过 ClassLoader 反射加载目标 Activity
6.执行 onCreate()，启动完成。
```

### 2.4 AMS 如何管理 Activity 的 Task 栈？

```
1.AMS 通过 ActivityTaskManagerService（ATMS） 维护 Task 栈：
-每个 Task 栈（TaskRecord）包含多个 Activity（ActivityRecord）。
-前台栈（Focused Stack）管理当前显示的 Activity。
-AMS 通过 moveTaskToFront() 切换 Task 栈。

2.启动模式影响 Task 栈：
-Standard：每次启动新实例。
-SingleTop：栈顶是该 Activity，则复用。
-SingleTask：栈中已存在，则清空上层 Activity 并复用。
-SingleInstance：独占 Task 栈，其他应用无法进入。
```

### 2.5 AMS 如何管理进程？

```
1.AMS 采用 LruProcessList 维护进程优先级：
-前台进程（Foreground）：优先级最高（Activity、Service、广播）。
-可见进程（Visible）：如 onPause() 的 Activity。
-后台进程（Background）：无 UI 但仍在运行。
-空进程（Empty）：无活跃组件，优先回收。

2.进程回收策略：
-内存不足时，AMS 调用 Process.killProcess() 终止后台进程。
-杀死优先级低的进程，优先保留前台进程。
```

### 2.6 AMS 如何检测 ANR（Application Not Responding）？

```
AMS 采用 WatchDog 机制 监测应用无响应：

1.主线程 Looper 消息阻塞超过 5 秒，触发 Input Dispatch Timeout。
2.AMS 发送 SIGQUIT 信号，Dump 堆栈信息。
3.调用 AppErrors.appNotResponding() 处理：
 -记录日志（data/anr/traces.txt）。
 -杀死进程 or 弹窗（ANR 界面）。
 -通知 ActivityThread 结束当前 Activity。
```

### 2.7 AMS 如何管理 Broadcast？

```
AMS 负责 广播（Broadcast） 的调度：

1.发送广播
sendBroadcast() → AMS.broadcastIntent()

2.广播队列
-普通广播：放入 广播队列（BroadcastQueue） 按优先级执行。
-有序广播：一个个传递，前一个广播可以终止传播。

3.进程调度
前台进程优先执行，后台进程可能被限制。
```

### 2.8 AMS 如何启动应用进程？

```
AMS 通过 Zygote 进程 fork 子进程 启动应用：
1.AMS 调用 startProcessLocked()
2.请求 Zygote 进程 fork 子进程
3.子进程 ActivityThread.main() 启动
4.创建 Application 并执行 onCreate()
5.应用进程就绪，等待 Activity 启动
```

### 2.9 AMS 为什么不能直接 fork 进程，而要通过 Zygote？

```
Android 进程由 Zygote 进程 fork，而非 AMS 直接 fork，原因：

-共享资源：Zygote 预加载 Framework、类库，fork 进程时可以继承，减少内存占用。
-提高启动速度：Zygote 启动 预热 VM，fork 进程时不需要重新初始化。
-安全性：AMS 只负责 进程管理和调度，实际进程创建由 Zygote 负责，AMS 不能直接 fork 进程。
```

### 2.10 AMS 和 WMS（WindowManagerService）的关系？

```
1.AMS 和 WMS 协同管理 Activity 和窗口：
-AMS 负责 Activity 生命周期（启动、销毁）。
-WMS 负责窗口管理（窗口层级、焦点、动画）。
-启动 Activity 时，AMS 通过 Binder 调用 WMS 创建窗口。

2.启动 Activity 的流程：
-AMS 请求 WMS 添加窗口
-WMS 创建窗口 Surface
-通知 SurfaceFlinger 渲染
-窗口显示完成，回调 Activity。
```

### 2.11 总结

```
AMS 是 Android Framework 的核心服务，掌控 Activity 启动、进程管理、Task 栈、ANR 监控、广播调度。  
面试常考点：

1.Activity 启动流程
2.Task 栈管理
3.进程管理 & 杀死机制
4.ANR 监控机制
5.AMS 与 Zygote 关系
6.AMS 和 WMS 协同工作
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)