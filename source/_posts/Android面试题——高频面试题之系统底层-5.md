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

## 二 面试要求和面试题(后续类似不再详述)

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
应用层(App) → Framework 层(Java API，如AMS) → JNI/Native 层 → 
HAL 层(硬件抽象，提供标准接口) →内核层（Kernel 驱动）→ 硬件。

HAL隔离硬件，实现厂商自定义
```

2、什么是HAL？它在Android架构中的作用是什么？

```
1.HAL（Hardware Abstraction Layer）：
硬件抽象层。

2、作用：
HAL是位于Linux内核和Android框架层之间的一个中间层。
它的作用是将硬件驱动的低层实现细节抽象化，为上层的Android框架提供统一的接口。

通过HAL，Android框架层无需关心底层硬件的具体实现，只需调用HAL提供的标准API即可。
这使得Android可以兼容不同厂商的硬件，降低了开发难度，提高了系统的可移植性。
```

3、HAL的作用和实现方式？

```
HAL（Hardware Abstraction Layer）提供统一接口，连接框架和硬件驱动。
作用：硬件无关性，便于移植。
实现：Legacy（共享库）或Stub（Binder式），如音频HAL定义open/close接口。
```

4、Android层间API流程示例？(Camera 调用流程)

```
以相机为例：App调用Camera API（框架层）->框架调用HAL接口->HAL实现调用驱动->内核访问硬件。

App 调用 CameraManager.openCamera。
Framework 通过 JNI 调用 Native 层。
Native 调用 HAL 接口。
HAL 与内核驱动通信，最终操作硬件。
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
-Binder 驱动在内核态，实现进程间高效通信。
-四大角色：Client（调用方）、Server（服务方）、Proxy（代理）、Stub（桩代码）。
-采用一次 拷贝内存（内核缓冲区中转），比传统 Socket/管道更高效。
-支持 权限校验（UID/PID 级别），避免共享内存安全风险。
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
1、AMS（ActivityManagerService）：
统一调度进程与组件。

2、优先级策略：
-Foreground > Visible > Service > Background > Empty。
-系统根据内存压力动态回收低优先级进程。

3、进程状态管理：
保证关键任务（前台/交互进程）存活
```

4、任务管理机制

```
Task 栈：Activity 按栈结构管理，栈顶 Activity 可见。
多任务支持：Recent Tasks 管理最近任务，多窗口/分屏。
调度策略：在 OOM 情况下优先清理后台任务进程。
启动模式：Standard、SingleTop、SingleTask、SingleInstance 控制栈行为。
```

5、AMS、PMS 的作用是什么？

```
AMS (ActivityManagerService)：管理四大组件生命周期、任务栈、进程调度。
PMS (PackageManagerService)：负责 APK 安装、解析、签名校验、权限管理。
```

6、Handler 消息机制与系统调度机制关系？

```
Looper + MessageQueue + Handler 实现线程间消息循环；
AMS 等系统服务通过 Binder 回调与消息机制调度 UI/应用逻辑。
```

### 3.4 Android工作机制：系统启动流程、app/Activity启动流程、Service 启动流程？

面试考点

```
核心：系统从硬件到 UI 的完整启动链路、App 启动依赖 Zygote fork、组件生命周期  
补充：2025 年重点在 Verified Boot、OTA 安全更新、启动优化
```

1、Android 系统启动流程

```
1、步骤链路：
-Bootloader：初始化硬件，加载 boot/dtbo 分区，执行 Verified Boot 验证设备完整性。
-Kernel：加载内核和 ramdisk，启动第一个用户态进程 init。
-Init 进程：解析 init.rc，启动基础守护进程。
-Zygote：孵化进程，预加载类和资源。
-System Server：由 Zygote fork，启动 AMS、PMS 等系统服务。
-Launcher：作为系统应用启动，显示桌面 UI。

2、2025 新点：
-Boot Config（Android 12+）传递启动参数。
-版本绑定与防回滚机制提升 OTA 安全性。
```

2、Android App 启动流程

```
1、完整过程：
-用户点击图标 → Launcher 调用 AMS 请求启动。
-AMS 检查目标进程是否存在 → 若无，通知 Zygote fork 新进程（预加载资源）。
-新进程启动 → 加载 Application 类，执行 onCreate()。
-ActivityThread 建立消息循环，调度 Activity 生命周期（onCreate → onStart → onResume）。

2、优化关注：
-Zygote 预加载 提升 fork 效率。
-App Startup 库统一初始化入口，减少冷启动耗时。
```

3、Service 启动流程

```
1、普通启动（startService）：
-Context.startService() → 发送请求至 AMS。
-AMS 检查/创建目标进程。
-在目标进程中回调 onCreate() → onStartCommand()。

2、绑定启动（bindService）：
-客户端调用 bindService() → AMS 建立连接。
-返回 IBinder 对象，实现客户端与 Service 的双向通信。
```

### 3.5 Android系统打包编译，插件化，热修复等技术

面试考点

```
核心：APK 构建流程、Gradle 构建原理  
热点：插件化框架（ClassLoader + Hook）、热修复技术（Dex 优先加载、Tinker 原理）
```

1、APK 打包流程

```
1.源码编译：Java/Kotlin → class 文件。
2.字节码转换：class → dex（D8/R8）。
3.资源处理：aapt/aapt2 编译 XML、图片，生成 R 文件。
4.打包：dex + 资源文件 → APK。
5.签名：使用 keystore 签名。
6.优化：zipalign 对齐，提高运行时资源加载效率。
```
2、Android 构建与编译过程

```
1、基于 Gradle：
-资源编译：AAPT/AAPT2 生成二进制资源表。
-代码编译：Javac/Kotlinc → class → dex（D8/R8 优化）。
-打包：生成 APK/AAB。
-签名与对齐：v1/v2/v3 签名，保证完整性。

2、Build Variants：
支持多渠道、多环境构建（debug/release、flavor）
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
1、核心角色：
负责单个 UI 界面。

2、启动流程：
-用户操作 → AMS 请求启动。
-Zygote fork 新进程（若不存在）。
-ActivityThread 通过 Handler 分发消息，执行生命周期方法（onCreate → onStart → onResume）。

3、生命周期管理：
与 UI 线程绑定，避免阻塞；配置变化（旋转、暗色模式）会触发重建。
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
核心是“系统服务 + Binder IPC”。
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
Skia 图形库、
SurfaceFlinger、
Media 库等。
```

### 3.8 熟悉Android运行机制,安全机制

面试考点

```
运行机制（Zygote/ART/Binder）
安全机制（沙箱/权限/签名/SELinux）
```

1、Android Framework运行机制？

```
- Zygote：系统启动后预加载类库，App 通过 fork Zygote 创建进程。  
- ART：负责 Dex 执行，支持 JIT/AOT 编译，含 GC 内存回收机制。  
- 主线程（UIThread）：事件循环（Looper/MessageQueue/Handler）负责调度。  
- Binder IPC：跨进程通信，App 与系统服务（AMS、WMS 等）交互。  
- 多线程模型：主线程 + 工作线程，避免 ANR。
```

2、安全机制

```
- 沙箱隔离：每个应用独立 UID，数据目录隔离。  
- 权限管理：Manifest 声明 + 动态申请，系统校验。  
- 应用签名：保证 APK 来源可信，支持升级校验。  
- SELinux：强制访问控制（MAC），限制进程权限。  
- Verified Boot：启动链完整性校验，防止系统被篡改。
```

### 3.9 了解底层so库加载原理，了解native开发

面试考点

```
SO 库加载流程、JNI 调用机制、Native 性能场景
```

1、SO库加载

```
- Java 层调用：System.loadLibrary("xxx")  
- 底层实现：调用 dlopen 加载 lib/armeabi-v7a 或 lib/arm64-v8a 下的 .so 文件  
- APK 打包：SO 文件存放在 APK 的 lib 目录，安装时解压到私有目录
- 注意：多 ABI 支持，系统根据 CPU 架构选择对应库
```

2、Native 开发

```
- 使用 NDK 提供的 C/C++ 接口，可调用底层系统 API  
- 性能优势：CPU 密集型任务（音视频编解码、图像处理、计算密集算法）  
- 与 Java 交互：通过 JNI 调用 Native 方法，实现跨层通信
```

