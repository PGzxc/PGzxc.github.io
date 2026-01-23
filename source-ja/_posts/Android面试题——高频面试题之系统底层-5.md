---
title: Android面试题——高频面试题之系统底层(5)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 9ad75b05
date: 2025-09-22 16:25:58
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
1.JVM/ART机制
2.hal及Android层间api流程
3.Android系统相关机制：Binder机制、内存管理机制，进程管理机制、任务管理机制
4.Android工作机制：系统启动流程、app/Activity启动流程、Service 启动流程？
5.Android系统打包编译，插件化，热修复等技术
6.理解Android系统框架，对四大组件机制有深刻认识
7.熟悉Android os系统结构,android framework及底层库
8.熟悉Android运行机制,安全机制
9.了解底层so库加载原理，了解native开发
```

## 三 面试题解答(仅供参考)

### 3.1 JVM/ART机制

面试考点

```
面试常比较JVM与ART的演进，尤其在性能和编译策略上
```

1、JVM和ART的区别及ART的优化机制？

```
1、JVM：
-传统 Java 虚拟机，基于 JIT（即时编译）。
-启动慢，每次运行需重新编译热点代码。

2、ART（Android Runtime）：
-Android 5.0 引入，最初采用 AOT（安装时预编译），启动快但安装包更大。
-发展到 混合模式（JIT + AOT + PGO），运行时动态优化，安装时按 profile 热点编译，兼顾性能与空间。
-2025 最新 ART（Android 16）优化：执行速度提升、内存占用降低、并发 GC 改进、采样分析器增强。
```

2、ART 为什么比 Dalvik 性能好？

```
1、Dalvik：
解释执行 + JIT，效率低，冷启动慢。

2、ART：
-结合AOT+JIT +Profile-Guided Compilation(Android N 起)，热点代码优化，冷门代码解释执行。
-提高启动速度和运行性能，同时减少安装体积。
```

3、ART 的垃圾回收（GC）改进

```
并发 GC：大多数过程并发执行，仅需一次短暂停顿。
并发复制：减少内存碎片，提升堆利用率。
暂停优化：暂停时间与堆大小无关，典型场景几乎不会触发 GC_FOR_ALLOC。
体验提升：减少卡顿，保证 UI 流畅度，尤其对短生命周期对象。
```

4、ART 在调试与开发中的优势

```
性能分析：支持采样式 profiler，分析方法调用与执行时间。
调试能力：提供栈跟踪、锁可视化、对象计数、字段监视点、异常追踪。
崩溃报告：同时包含 Java 层和 Native 层堆栈，定位更准确。
```

### 3.2 hal及Android层间api流程

面试知识点

```
较底层题，考察系统架构
```

1、Android系统架构层级？

```
应用层→ Framework(Java API，如 AMS)→ Native(JNI/底层库)→ HAL(硬件抽象) → 内核(驱动) → 硬件。
```

2、什么是HAL？它在Android架构中的作用是什么？

```
1.HAL（Hardware Abstraction Layer）：
硬件抽象层。

2、作用：
隔离硬件差异，为 Framework 提供统一接口
```

3、HAL的作用和实现方式？

```
1、作用：
屏蔽底层硬件细节，支持厂商自定义，增强系统可移植性。

2、实现：
-Legacy HAL：共享库形式。
-Stub HAL：基于 Binder，提供标准接口（如音频 HAL 的 open/close）
```

4、Android层间API流程示例？(Camera 调用流程)

```
1、流程：
App 调用 CameraManager.openCamera()（Framework）。
Framework 通过 JNI 调用 Native 层。
Native 调用 HAL 接口。
HAL 与内核驱动通信，操作硬件。

2、JNI 作用：
桥接 Java Framework 和 C++ HAL/内核。
```

5、JNI在层间通信中的作用？

```
JNI桥接Java框架和C++ HAL/内核。
示例：框架用JNI调用HAL的native函数，实现如传感器访问。
```

### 3.3 Android系统相关机制：Binder机制、内存管理机制，进程管理机制、任务管理机制

面试考点

```
核心机制：Binder（IPC）、内存管理（LMK + GC）、进程管理（AMS）、任务管理（Activity 栈）
考察重点：性能、安全、资源分配与系统调度
```

1、Binder机制的原理及其在IPC中的作用？

```
1、作用：
Android 核心 IPC 机制，系统服务与应用通信的基础。

2、原理：
-基于内核驱动，Client 通过 Proxy 调用 Server 的 Stub。
-一次内存拷贝（内核缓冲区），高效且安全（UID/PID 权限校验）
```

2、Android 内存管理机制

```
1、GC 管理 Java 堆：
ART 垃圾回收，优化短生命周期对象回收。

2、LMK（Low Memory Killer）：
-根据进程优先级（OOM_ADJ 分数）杀死后台进程。
-前台/系统服务优先级最高，缓存/空进程最低。

3、内存优化建议：
-避免内存泄漏（如静态持有 Context）。
-使用内存分析工具（Profiler/LeakCanary）。
-控制大图/缓存，利用 LRUCache
```

3、进程管理机制

```
1、AMS（ActivityManagerService）：调度进程与组件。
2、优先级：Foreground > Visible > Service > Background > Empty。
3、回收：内存压力下优先清理低优先级进程。
```

4、任务管理机制

```
Task 栈：Activity 按栈管理，栈顶可见。
多任务：Recent Tasks 支持多窗口/分屏。
启动模式：Standard、SingleTop、SingleTask、SingleInstance
```

5、AMS、PMS 的作用是什么？

```
AMS (ActivityManagerService)：管理四大组件生命周期、任务栈、进程调度。
PMS (PackageManagerService)：负责 APK 安装、解析、签名校验、权限管理。
```

6、Handler 消息机制与系统调度机制关系？

```
Handler 机制：通过 Looper 和 MessageQueue 实现线程间通信。
与 AMS：AMS 通过 Binder 回调与 Handler 调度 UI/应用逻辑。
```

### 3.4 Android工作机制：系统启动流程、app/Activity启动流程、Service 启动流程？

面试考点

```
核心：系统从硬件到 UI 的完整启动链路、App 启动依赖 Zygote fork、组件生命周期  
补充：2025 年重点在 Verified Boot、OTA 安全更新、启动优化
```

1、Android 系统启动流程

```
1、流程：
Bootloader：初始化硬件，执行 Verified Boot。
Kernel：加载内核和 ramdisk，启动 init。
Init：解析 init.rc，启动守护进程。
Zygote：预加载类和资源，孵化进程。
System Server：启动 AMS、PMS 等服务。
Launcher：显示桌面 UI。

2、2025 新点：
Boot Config（Android 12+）、OTA 防回滚
```

2、Android App 启动流程

```
1、流程：
Launcher 请求 AMS 启动。
AMS 通知 Zygote fork 进程（若无）。
进程加载 Application.onCreate()。
ActivityThread 调度 Activity 生命周期（onCreate → onStart → onResume）。


2、优化：
Zygote 预加载、App Startup 统一初始化
```

3、Service 启动流程

```
1、startService：
onCreate() → onStartCommand()，需手动停止。

2、bindService：
返回 IBinder，随绑定者生命周期变化
```

### 3.5 Android系统打包编译，插件化，热修复等技术

面试考点

```
核心：APK 构建流程、Gradle 构建原理  
热点：插件化框架（ClassLoader + Hook）、热修复技术（Dex 优先加载、Tinker 原理）
```

1、APK 打包流程

```
源码编译：Java/Kotlin → .class。
字节码转换：.class → .dex（D8/R8 优化）。
资源处理：AAPT/AAPT2 编译 XML/图片，生成 R 文件。
打包：.dex + 资源 → APK。
签名：使用 keystore（v1/v2/v3）。
对齐：zipalign 优化资源加载
```
2、Android 构建与编译过程(Gradle 构建)

```
1、流程：
资源编译（AAPT2）→ 代码编译（Javac/Kotlinc）→ 打包（APK/AAB）→ 签名/对齐。

2、Build Variants：
支持多渠道、多环境（debug/release、flavor）。
```

3、插件化原理

```
1、核心思想：
将外部 APK 当作插件加载，而非安装。

2、实现方式：
-ClassLoader：自定义 DexClassLoader 动态加载插件 dex。
-Hook AMS/WMS：拦截系统对 Activity/Service 的校验，伪装成已安装应用。

3、代表框架：
RePlugin、DroidPlugin。
```

4、热修复原理

```
1、核心思想：
运行时加载补丁 dex，覆盖旧实现。

2、实现方式：
-ClassLoader 双亲委派机制 → 优先加载补丁 dex。
-方法替换或插桩（Instrumentation、反射 Hook）。

3、代表框架：
-Tinker：生成差分包，合成完整 dex/so/资源补丁，下次启动生效。
-AndFix：即时替换方法，热修复无需重启。
```

5、插件化 vs 热修复 对比

|   特性   |        插件化         |          热修复           |
| :------: | :-------------------: | :-----------------------: |
|   目标   |  模块解耦、动态扩展   |       线上 bug 修复       |
|  技术点  |  ClassLoader + Hook   |       Dex 优先加载        |
| 代表框架 | RePlugin、DroidPlugin |      Tinker、AndFix       |
| 生效时机 |    运行时加载插件     | 补丁合成后(即时/下次启动) |

### 3.6 理解Android系统框架，对四大组件机制有深刻认识

面试考点

```
四大组件 = Android 应用的核心  
重点：生命周期管理、进程/IPC 机制、系统服务（AMS/PMS/WMS）在背后的调度
```

1、Activity

```
1、作用：
用户交互界面。

2、启动流程：
Launcher → AMS → Zygote fork → ActivityThread 调度生命周期。

3、生命周期：
onCreate → onStart → onResume → onPause → onStop → onDestroy。
```

2、Service

```
1、作用：
执行后台逻辑，无界面。

2、启动方式：
-startService()：一次性启动 → onCreate() → onStartCommand()，独立运行，需手动停止。
-bindService()：客户端与 Service 绑定，通过 Binder 接口通信，生命周期随绑定者变化。

3、应用场景：
播放音乐、长连接、后台任务
```

3、BroadcastReceiver

```
1、作用：
消息发布/订阅机制，跨进程事件通知。

2、注册方式：
-静态注册（Manifest）：开机广播、系统事件，由 AMS 调度，进程可被拉起。
-动态注册（Context）：随组件生命周期，常用于应用内事件监听。

3、执行特点：
运行在主线程，逻辑不宜过重。
```

4、ContentProvider

```
作用：标准化的 进程间数据共享机制（如通讯录、媒体库）。
实现原理：基于 Binder IPC，对外暴露统一的 URI 接口（CRUD）。
应用场景：跨应用共享数据，自定义 Provider。
```

### 3.7 熟悉Android os系统结构,android framework及底层库

面试考点

```
常考系统分层、Framework 核心服务以及底层库
```

1、Android系统架构层级？

```
1. Linux Kernel：驱动、进程/内存管理、安全机制。  
2. HAL：硬件抽象层，屏蔽底层差异，向上提供统一接口。  
3. Native Libraries：如 OpenGL、SQLite、WebKit、Media Framework。  
4. ART：运行时环境，负责字节码执行、GC、JIT/AOT。  
5. Framework：Java API 层，提供系统服务（AMS、PMS、WMS 等）。  
6. Applications：上层应用，调用 Framework API。
```

2、Android Framework运行机制？

```
核心：系统服务 + Binder IPC
App 通过 Binder 与系统服务交互，例如 AMS 管理 Activity 生命周期。
```

3、Framework 核心服务

```
- AMS（ActivityManagerService）：组件生命周期、任务栈管理。  
- PMS（PackageManagerService）：APK 安装、权限管理。  
- WMS（WindowManagerService）：窗口管理、View 显示。  
- IMS（InputMethodService）：输入法框架。  
- NotificationManagerService：通知管理。
```

4、底层库

```
Bionic libc（轻量级 C 库）、
libcutils、
Skia(2D 图形)、
SurfaceFlinger、
SurfaceFlinger(渲染)。
```

### 3.8 熟悉Android运行机制,安全机制

面试考点

```
运行机制（Zygote/ART/Binder）
安全机制（沙箱/权限/签名/SELinux）
```

1、Android Framework运行机制？

```
Zygote：预加载类库，fork App 进程。
ART：Dex 执行，JIT/AOT + GC。
主线程：Looper + Handler 调度 UI/逻辑。
Binder：App 与系统服务通信。
多线程：主线程 + 工作线程，避免 ANR
```

2、安全机制

```
沙箱：UID 隔离，数据目录独立。
权限：Manifest 声明 + 动态申请。
签名：APK 完整性校验。
SELinux：强制访问控制。
Verified Boot：启动链安全验证
```

### 3.9 了解底层so库加载原理，了解native开发

面试考点

```
SO 库加载流程、JNI 调用机制、Native 性能场景
```

1、SO库加载

```
1、流程：
System.loadLibrary("xxx") → dlopen 加载 lib/armeabi-v7a 或 lib/arm64-v8a 的 .so。

2、APK 存储：
.so 存于 APK 的 lib 目录，安装时解压。

3、注意：
多 ABI 支持，系统自动选择匹配库
```

2、Native 开发

```
NDK：编译 C/C++ 为 .so，调用底层 API。
JNI：Java 与 C/C++ 双向调用。
场景：音视频编解码（FFmpeg）、高性能计算、硬件访问
```

