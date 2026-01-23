---
title: Android面试题——高级开发面试题2
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 72c409bb
date: 2022-12-03 11:12:19
---
## 一 面试题概述

1. 回答自己理解的java虚拟机、gc机制
2. Java多线程、线程池
3. 集合原理(hashmap,list)
4. java虚引用
5. 封装、继承、多态的理解<!--more-->
6. activity生命周期
7. 安卓activity和fragment数据传递
8. Handler
9. 内存泄漏、内存溢出、内存抖动 原因及解决办法
10. ANR原因以及解决办法
11. 性能优化、卡顿优化
12. 事件分发机制

## 二 面试题解答

### 2.1 回答自己理解的java虚拟机、gc机制

#### 2.1.1 java虚拟机

1-概念

```
Java 虚拟机（JVM，Java Virtual Machine）是Java程序的运行环境，负责执行编译后的字节码文件（.class 文件）。
它的主要功能是跨平台执行Java程序，让Java程序能够在不同平台上运行而不需要修改代码。
JVM 将Java程序从高层的源代码转换为机器能够理解的指令，从而执行
```

2-JVM基本构成

![][1]

JVM主要包括四个部分：

1-类加载器（ClassLoader）:

在 JVM 启动时或者在类运行将需要的 class 加载到 JVM 中(下图表示了从 java 源文件到 JVM 的整个过程，可配合理解)
![][2]

2-执行引擎：负责执行 class 文件中包含的字节码指令

```
解释器：逐行解释执行字节码。
即时编译器（JIT）：将热点代码编译成本地机器代码，提高执行效率
```

3-内存区（也叫运行时数据区）：

是在 JVM 运行的时候操作所分配的内存区。 运行时内存区主要可以划分为 5个区域，如下图：

方法区(MethodArea)、java 堆(Heap)、java 栈(Stack)、程序计数器(PCRegister)、本地方法栈(Native MethodStack)、

```
堆：存储 Java 中的对象，是垃圾回收的主要区域。
栈：存储局部变量、方法调用、返回地址等信息，每个线程都有自己的栈。
方法区：存储类信息、常量、静态变量等数据。
```

![][3]

4-垃圾回收器（Garbage Collector）：负责自动回收不再使用的对象，避免内存泄漏。

#### 2.1.2 gc机制

1-概念

```
垃圾回收（GC）是JVM中自动管理内存的一种机制，旨在清理不再使用的对象并释放内存空间，避免内存泄漏。
垃圾回收器通过检测哪些对象没有任何引用（即无法到达）来回收内存。
```

2-Java 中有四种引用类型

```
强引用、软引用、弱引用、虚引用
```

3-如何判断强引用是 否存在呢？

```
引用计数法，有对这个对象的引用就+1，不再引用就-1， 但是这种方式看起来简单美好，但它却不能解决循环引用计数的问题
```

4-GC Roots 对象通常包括

```
* 虚拟机栈中引用的对象（栈帧中的本地变量表）
* 方法中类的静态属性引用的对象
* 方法区中常量引用的对象
* Native 方法引用的对象
```

5-可达性分析算法整个流程

```
* 第一次标记：对象在经过可达性分析后发现没有与GC Roots有引用链，则进行第一次标记并进行一次筛选，
筛选条件是：该对象是否有必要执行finalize()方法。
* 第二次标记：GC 对 F-Queue 队列里的对象进行第二次标记，
如果在第二次标记时该对象又成功被引用，则会被移除即将回收的集合，否则会被回收
```

6-GC 的工作流程：

```
1.标记阶段：标记所有仍然被引用的对象。
2.清除阶段：回收所有未被标记的对象，释放内存。
3.压缩阶段（可选）：将存活的对象压缩到堆的一侧，避免内存碎片。
```

7-GC 的不同算法：

```
* 标记-清除（Mark-sweep）：首先标记活跃对象，然后清除未被标记的对象。缺点是会产生内存碎片。
* 复制（Copying）：将内存分成两部分，每次回收时将存活的对象复制到另一部分，避免碎片问题。缺点是需要额外的内存空间。
* 标记-整理（Mark-Compact）：标记并清除对象后，整理内存，消除内存碎片。
* 分代收集算法：新生代、老年代、永久代、内存分配和回收策略
```

8-垃圾回收的关键概念

```
年轻代（Young Generation）：新创建的对象一般会分配到年轻代，垃圾回收会频繁地在此进行。
新生代：包括 Eden 区 和 Survivor 区。大多数对象在这里很快变为垃圾并被回收。
老年代（Old Generation）：经过多次 GC 仍然存活的对象会被移到老年代，GC 在这里较为少见，但回收成本较高。
永久代（PermGen）：用于存储类元数据（如类信息），但在 JDK 8 后被 元空间（Metaspace） 取代。
```

9-GC 优化：

```
对象池：通过对象池复用对象，减少 GC 的次数。
内存分配与回收策略：合理调整堆大小和年轻代与老年代的比例，避免频繁的 GC。
及时回收大对象：尽量避免直接分配大对象，减少堆内存压力。
软引用与弱引用：可以通过软引用、弱引用、虚引用等控制对象的回收时机，减少内存泄漏的风险。
```

### 2.2 Java多线程、线程池-见参考

#### 2.2.1 Java多线程

1-java线程创建的方式

```
* 继承Thread类 
* 实现runnable接口 
* 继承callable接口 
* 基于线程池创建线程
```

2-请详细描述一下线程从创建到死亡的几种状态都有哪些？

```
* 新建(new)：新创建了一个线程对象。
* 可运行(runnable)：线程对象创建后，其他线程(比如 main 线程）调用了该对象的start()方法。
该状态的线程位于可运行线程池中，等待被线程调度选中，获 取 cpu 的使用权 。
* 运行(running)：可运行状态( runnable )的线程获得了 cpu 时间片（ timeslice ） ，执行程序代码。
* 阻塞(block)：阻塞状态是指线程因为某种原因放弃了 cpu 使用权，也即让出了 cpu timeslice ，暂时停止运行。
直到线程进入可运行( runnable )状态，才有 机会再次获得 cpu timeslice 转到运行( running )状态。

* 死亡(dead)：线程run()、main()方法执行结束，或者因异常退出了run()方法，则该线程结束生命周期。死亡的线程不可再次复生。
```

3-sleep()和wait()区别

```
* sleep()来自thread,wait()来自object();
* sleep()不释放锁，wait释放锁
* sleep()时间到了会自动恢复，wait（）可以使用notify（）直接唤醒
```

4-在 Java 程序中怎么保证多线程的运行安全？

```
* 方法一：使用安全类，比如 Java. util. concurrent 下的类。
* 方法二：使用自动锁 synchronized。
* 方法三：使用手动锁 Lock。 
```

5-JAVA如何在两个线程之间共享数据

```
Java 里面进行多线程通信的主要方式就是共享内存的方式，共享内存主要的关注点有两个：可见性和有序性原子性。
Java 内存模型（JMM）解决了可见性和有序性的问题，而锁解决了原子性的问题，理想情况下我们希望做到“同步”和“互斥”。
有以下常规实现方法：
-1.将数据抽象成一个类，并将对这个数据的操作作为这个类的方法，这么设计可以很容易做到同步，只要在方法上加“synchronized“。
-2.将 Runnable 对象作为一个类的内部类，共享数据作为这个类的成员变量，每个线程对共享数据的操作方法也封装在外部类，
以便实现对数据的各个操作的同步和互斥，作为内部类的各个 Runnable 对象调用外部类的这些方法。
```

#### 2.2.2 线程池

1-为什么用线程池

```
线程池本质上是一种池化技术，而池化技术是一种资源复用的思想，为了减少线程频繁创建和销毁带来的性能开销，
因为线程创建会涉及到CPU上下文切换、内存分配等工作。
线程池本身会有参数来控制线程创建的数量，这样就可以避免无休止的创建线程带来的资源利用率过高的问题，起到了资源保护的作用。
```

2-解释下线程池参数(线程池参数七大参数)

```
* corePoolsize  核心线程数：正常情况下创建的工作的线程数，这些线程创建后并不会立马消除，一种常驻住线程
* maxinumPoolSize 最大线程数：表示允许创建的最大线程数
* keepAliveTime 表示超出线程数之外的线程数空闲存活时间
* unit     keepAliveTime 的计量单位
* workQueue:用来存放待执行任务的队列
* threadFactory:创建一个线程工厂用来生产线程，可以用来设定线程名
* handler:任务拒绝策略
```

3-Java线程池的工作流程

```
* 线程池判断核心线程池里的核心线程是否都在执行任务。 如果不是，让空闲的核心线程来执行任务。
如果核心线程池里的线程都在执行任务，则进入下个流程。

* 线程池判断阻塞队列是否已满。 如果阻塞队列没有满，则将新提交的任务存储在阻塞队列中。如果阻塞队列已满，则进入下个流程。

* 判断线程池里的线程数量是否小于最大线程数量(看线程池是否满了)。 
如果小于，则创建一个新的工作线程（非核心线程，并给它设置超时时间，
当我们处理完这些任务，无需手动销毁这个非核心线程，超时自动销毁）来执行任务。
如果已满，则交给拒绝策略来处理这个任务。
```

4-线程池都有哪些状态？

```
* RUNNING：这是最正常的状态，接受新的任务，处理等待队列中的任务。
* SHUTDOWN：不接受新的任务提交，但是会继续处理等待队列中的任务。
* STOP：不接受新的任务提交，不再处理等待队列中的任务，中断正在执行任务的线程。
* TIDYING：所有的任务都销毁了，workCount 为 0，线程池的状态在转换为 TIDYING 状态时，会执行钩子方法 terminated()。
* TERMINATED：terminated()方法结束后，线程池的状态就会变成这个
```

5-Java线程池如何合理配置核心线程数？如何去设置呢？

```
* CPU 密集型任务：
比如像加解密，压缩、计算等一系列需要大量耗费 CPU 资源的任务，大部分场景下都是纯 CPU 计算。
因此，对于 CPU 密集型的计算场景，理论上线程的数量 = CPU 核数就是最合适的，
不过通常把线程的数量设置为CPU 核数 +1，会实现最优的利用率。

* IO 密集型任务：
比如像 MySQL 数据库、文件读写、网络通信等任务，这类任务不会特别消耗 CPU 资源，但是 IO 操作比较耗时，会占用比较多时间。
线程数 = CPU 核心数 * (1 + IO 耗时/ CPU 耗时) 或是 IO密集型：核心线程数 = CPU核数 * 2
```

### 2.3 集合原理(hashmap,list)-见参考

集合框架

![][4]

**1-Java List总结**

1）ArrayList
优点: 底层数据结构是数组，查询快，增删慢。
缺点: 线程不安全，效率高

2）Vector
优点: 底层数据结构是数组，查询快，增删慢。
缺点: 线程安全，效率低

3）LinkedList
优点: 底层数据结构是链表，查询慢，增删快。
缺点: 线程不安全，效率高

**2-Java Set总结**

1）HashSet

底层其实是包装了一个HashMap实现的
底层数据结构是数组+链表 + 红黑树
具有比较好的读取和查找性能， 可以有null 值
通过equals和HashCode来判断两个元素是否相等
非线程安全
2）LinkedHashSet

继承HashSet，本质是LinkedHashMap实现
底层数据结构由哈希表(是一个元素为链表的数组)和双向链表组成。
有序的，根据HashCode的值来决定元素的存储位置，同时使用一个链表来维护元素的插入顺序
非线程安全，可以有null 值
3）TreeSet

是一种排序的Set集合，实现了SortedSet接口，底层是用TreeMap实现的，本质上是一个红黑树原理
排序分两种：自然排序（存储元素实现Comparable接口）和定制排序（创建TreeSet时，传递一个自己实现的Comparator对象）
正常情况下不能有null值，可以重写Comparable接口 局可以有null值了。
**3-Map总结**
![][5]

### 2.4 java虚引用-见参考

```
虚引用需要java.lang.ref.PhantomReference类来实现，虚引用顾名思义，就是形同虚设，
与其他几种引用都不同，虚引用并不会觉定对象的生命周期。
如果一个对象仅持有虚引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾回收器回收，
它不能单独使用也不能通过它访问对象，虚引用必须和引用队列（ReferenceQueue）联合使用。

虚引用的主要作用是跟踪对象被垃圾回收的状态，仅仅是提供了一种确保对象被finalize以后，做某些事情的机制
```

### 2.5 封装、继承、多态的理解-见参考

1-封装

* 实例讲解什么是封装
* 封装的意义
* 封装原则
* 封装的访问级别

2-继承

* 继承作用：提高了软件复用的效率，缩短了软件开发的周期
* 继承方式：公有继承、私有继承、保护继承

3-多态

* 多态的三个条件
* 编译时多态
* 多态的实现方式：接口多态性、继承多态性、通过抽象类实现的多态性
* 多态的好处：可替换性、可扩充性、灵活性简化性

### 2.6 activity生命周期

1-activity的生命周期

![][6]

2-ActivityA 跳转 ActivityB 然后 B 按 back 返回 A，各自的生命周期顺序，A 与 B 均不透明

ActivityA 跳转到 ActivityB

```
Activity A：onPause
Activity B：onCreate
Activity B：onStart
Activity B：onResume
Activity A：onSto
```

ActivityB 返回 ActivityA

```
Activity B：onPause
Activity A：onRestart
Activity A：onStart
Activity A：onResume
Activity B：onStop
Activity B：onDestro
```

### 2.7 安卓activity和fragment数据传递-见参考

1-Activity向Fragment传递数据—使用Bundle

```
* Bundle用来存放数据集
* setArguments()方法将数据集绑定到Fragment中。
```

2-Fragment向Activity传送数据

```
* 方法一：使用java接口（观察者模式）
* 方法二：使用第三方组件：eventbus，liveData等
```

3-实现Fragment之间互传数据

```
Fragment之间无法互传数据，所以需要一个Activity作为中间桥梁辅助两个Fragment之间的数据传输
```

### 2.8 Handler-见参考
相关概念
![][7]

### 2.9 内存泄漏、内存溢出、内存抖动 原因及解决办法-见参考

#### 2.9.1 内存溢出

1-原因：

```
1.内存中加载的数据量过于庞大，如一次从数据库取出过多数据；
2.集合类中有对对象的引用，使用完后未清空，使得JVM不能回收；
3.代码中存在死循环或循环产生过多重复的对象实体；
4.使用的第三方软件中的BUG；
5.启动参数内存值设定的过小
```

2-解决方案：

```
第一步，修改JVM启动参数，直接增加内存。(-Xms，-Xmx参数一定不要忘记加。)
第二步，检查错误日志，查看“OutOfMemory”错误前是否有其它异常或错误。
第三步，对代码进行走查和分析，找出可能发生内存溢出的位置。
```

#### 2.9.2 内存泄漏

1-引起内存泄漏的场景：

```
- 资源对象没关闭造成的内存泄漏，如查询数据库后没有关闭游标cursor
- 构造Adapter时，没有使用 convertView 重用
- 对象被生命周期长的对象引用，如activity被静态集合引用导致activity不能释放
- Bitmap对象不再使用时，没有调用recycle()释放内存（？存在疑问）
```

2-如何区分：

```
* 内存泄露, 观察 memory monitor 出现,内存不断增加 然后降低.
* 工具使用:通过 heap viewer 查看
```

3-内存抖动

```
原因：内存抖动出现原因主要是频繁（很重要）在循环里创建对象，导致大量对象在短时间内被创建

如何区分：通过memory monitor 发现 出现内存忽上忽下 形成针尖状的情况
```

### 2.10 ANR原因以及解决办法

1-什么是ANR

```
ANR(Application Not Responding)即应用程序无响应
```

2-ANR一共有四种类型

```
* 输入事件类型ANR
* 广播类型ANR
* ContentProvider类型ANR
* Service类型ANR
```

3-如何避免ANR

```
* 耗时的工作(比如数据库操作，I/O，网络操作)，采用单独的工作线程处理
* 用Handler来处理UIthread和工作thread的交互
* 合理使用 Handler 来处理其他线程请求；
* 合理使用并遵循 Android 生命周期, 避免在 onCreate() 和 onResume() 做过多的事情；
* 使用一些架构形成规范来避免内存等问题,例如：MVP、RxJava；
* 经常使用工具来检查内存问题,例如:MAT、TraceView、AS 自带等工具；
* 避免加载大图片引起内存不足导致ANR；
* 避免内存泄露引起的ANR。
```

### 2.11 性能优化、卡顿优化-见参考

1-为什么会卡顿

```
- 读写文件
- 解析大量图片
- 频繁请求网络
- 复杂的布局
- 频繁创建对象
```

2-如何检测卡顿

```
* Systrace：
Systrace它是轻量级的框架，而且开销小，可以直观反映CPU的利用率而且右侧alter可以针对一些问题给出相关的建议。
比如绘制慢或者GC频繁等

* StrictMode：
Android2.3引入的一个工具类：严苛模式。是一种运行时检测机制。
可以帮助开发人员检测代码当中不规范的问题。StrictMode主要检测线程策略和虚拟机策略。
```

3-如何优化卡顿

```
* 文件读写
* 大量图片解析
* 频繁请求网络
* 复杂布局
```

### 2.12 事件分发机制
![][8]




## 三 参考

* [java中多线程常见面试题_李大寶的博客-CSDN博客_多线程面试题](https://blog.csdn.net/libaowen609/article/details/125159135)
* [继承Thread类、实现Runnable接口、实现Callable接口](https://blog.csdn.net/xixiyuguang/article/details/115161911)
* [Java集合框架最全详解(看这篇就够了)](https://blog.csdn.net/m0_67322837/article/details/124322953)
* [JAVA虚引用介绍](https://blog.csdn.net/baidu_37313657/article/details/104145199)
* [封装、继承、多态 详解](https://blog.csdn.net/qq_49190652/article/details/124596001)
* [Activity与Fragment的通信](https://blog.csdn.net/m0_53881899/article/details/127426866)
* [Android——Handler详解](https://blog.csdn.net/ly0724ok/article/details/117324053/)
* [内存溢出，内存泄漏，内存抖动](https://blog.csdn.net/liujinwei2005/article/details/113683652)
* [Android 内存泄漏、内存抖动和内存溢出](https://blog.csdn.net/mr_hmgo/article/details/118978933)
* [Android ANR分析实践（一）：ANR是什么、产生的原因及如何避免ANR](https://blog.csdn.net/pshiping2014/article/details/81740768)
* [ANR系列之ContentProvider类型原理讲解](https://blog.csdn.net/rzleilei/article/details/128039319)
* [Android性能优化--卡顿优化与布局优化](https://blog.csdn.net/u012216131/article/details/116528022)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-interview-jvm-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-interview-jvm-class-loader.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-interview-jvm-runtimedata-areas.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-interview-collect-struct.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-interview-map-submit.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-interview-activity-life.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-interview-handler-table.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-interview-event-process.png