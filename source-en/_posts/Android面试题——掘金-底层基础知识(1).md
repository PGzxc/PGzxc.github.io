---
title: Android面试题——掘金-底层基础知识(1)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
  - 掘金
abbrlink: 670fea1a
date: 2025-04-02 13:55:43
---
## 一 概述

1. JVM相关知识
2. JUC相关知识:并发模型和内存 , 锁，CAS，原子变量, 线程池 ，AQS
3. 注解反射泛型,注解处理器，APT ,KAPT,KSP,KCP,SPI机制
4. 动态代理，Aspect, Javassist, ASM字节码插桩等面向切面编程
5. 基础数据结构和算法<!--more-->
6. IO模型,BaseIO,BIO,NIO,OKIO
7. 理解网络（Http,Https,Http1.0,2.0,3.0,https加密原理，TCP,UDP,Socket及与FD关系)

## 二 面试题解答(仅供参考)

### 2.1 JVM相关知识

运行时数据区、对象怎么分配、GC及调优方法，ART虚拟机和调优和ClassLoader加载器和字节码

#### 2.1.1 运行时数据区（Runtime Data Areas）

JVM 在运行 Java 程序时，会将内存划分为以下几个区域：

|                区域                 |                             作用                             |
| :---------------------------------: | :----------------------------------------------------------: |
|        程序计数器(PC 寄存器)        |        记录当前线程正在执行的字节码指令地址，线程私有        |
|        Java 虚拟机栈(Stack)         | 线程私有, 存储方法调用时的栈帧(局部变量、操作数栈、方法返回信息等), 方法调用时入栈, 执行完出栈 |
|   本地方法栈(Native Method Stack)   |            为 Native 方法(JNI)服务，类似于 JVM 栈            |
|              堆(Heap)               |    线程共享, 存储所有对象实例和数组, 是 GC 主要管理的区域    |
|         方法区(Method Area)         |     线程共享, 存储类元信息(字段、方法、常量池、静态变量)     |
| 运行时常量池(Runtime Constant Pool) |       方法区的一部分，存放类的常量(字面量、符号引用等)       |

#### 2.1.2 对象的分配策略

```
对象分配的策略通常依赖于堆的分代模型，常见分配方式有：

1-优先分配到新生代 Eden 区
对象一般先分配在 Eden 区，Eden 满了触发 Minor GC，将存活对象转移到 Survivor 区。

2-大对象直接进入老年代
大对象（如大数组）直接进入老年代，避免在 Survivor 区频繁复制。

3-长期存活的对象进入老年代
当对象在Survivor区经历 一定次数GC（默认15次，MaxTenuringThreshold可调） 后晋升到老年代。

4-TLAB（Thread Local Allocation Buffer）
为减少多线程分配对象的竞争，每个线程会在 Eden 区预先分配一小块 TLAB 空间，提高对象分配效率

```

#### 2.1.3 GC（垃圾回收）及调优方法

1-常见 GC 算法

|           GC 算法           |                             特点                             |
| :-------------------------: | :----------------------------------------------------------: |
|   标记-清除（Mark-Sweep）   |          标记存活对象，清除未标记对象，容易产生碎片          |
|  标记-整理（Mark-Compact）  |           标记存活对象并整理，消除碎片，适合老年代           |
|       复制（Copying）       | 新生代常用，将存活对象复制到 Survivor 或老年代，适用于对象存活率低的场景 |
| 分代收集（Generational GC） |    结合以上算法，新生代用 Copying，老年代用 Mark-Compact     |

2-常见垃圾回收器

|          GC 收集器           |                 特点                  |
| :--------------------------: | :-----------------------------------: |
|          Serial GC           |        单线程 GC，适用于小内存        |
|         Parallel GC          |   多线程 GC，提高吞吐量（默认 GC）    |
| CMS（Concurrent Mark-Sweep） | 低停顿 GC，适用于响应时间要求高的场景 |
|     G1（Garbage First）      | 低停顿、分区式 GC，适合大内存（推荐） |
|       ZGC / Shenandoah       |    低停顿时间，适用于超大内存应用     |

3-GC 调优参数

|       参数        |            作用            |
| :---------------: | :------------------------: |
|    -Xms` `-Xmx    | 设置堆的初始大小和最大大小 |
|       -Xmn        |       设置新生代大小       |
| -XX:SurvivorRatio | 设置 Eden 和 Survivor 比例 |
|   -XX:+UseG1GC    |     使用 G1 垃圾回收器     |
|    -XX:+UseZGC    |          使用 ZGC          |

#### 2.1.4 ART 虚拟机及调优

```
1-ART（Android Runtime）是 Android 5.0 之后替代 Dalvik 的虚拟机，主要优化点：

1.1 AOT（Ahead of Time 编译）：
-ART 采用 AOT 预编译，直接生成机器码，减少运行时开销，提高应用启动速度。

1.2 优化 GC：
-ART 采用 并发 GC（Concurrent Copying GC），减少 STW（Stop The World）。
-具有 低延迟 GC、增量 GC，适合移动设备。

1.3 JIT + AOT 结合：
-Android 7.0 引入 JIT（Just-In-Time 编译），动态优化代码，提高运行效率。
-Android 9.0 之后，JIT 编译的热点代码会缓存，提升下次启动速度。

2 ART 调优方法：
-适当减少 JNI 调用（跨 VM 边界损耗大）。
-避免过多对象创建，减少 GC 触发频率。
-监控 GC 日志 adb logcat -s art，优化 GC 参数
```

#### 2.1.5 ClassLoader（类加载器）

ClassLoader 负责将 `.class` 文件加载到 JVM 内存。主要有 3 种 ClassLoader：

|       ClassLoader       |                      作用                      |
| :---------------------: | :--------------------------------------------: |
|  Bootstrap ClassLoader  | 加载 `rt.jar`（Java 核心类，如 `java.lang.*`） |
|  Extension ClassLoader  |           加载 `ext` 目录下的扩展类            |
| Application ClassLoader |    加载 `classpath` 下的类（应用程序代码）     |
|   自定义 ClassLoader    |    通过继承 `ClassLoader` 自定义类加载逻辑     |

双亲委派机制（Parent Delegation Model）

```
加载类时，先让 父加载器 处理，只有父加载器找不到时，才由子加载器 加载。
避免了类重复加载，保证了核心类的安全性。
```

#### 2.1.6 字节码（Bytecode）

```
Java 源代码（.java）编译后生成 字节码文件（.class），JVM 通过字节码执行程序。

1-字节码指令：Java 字节码是一种 基于栈 的指令集，例如：
-iconst_1 → 常量 1 入栈
-iload_0 → 加载局部变量 0
-iadd → 栈顶两个整数相加
-ireturn → 返回整数

2-查看字节码：可以用 javap -v 反编译字节码
javac Test.java
javap -v Test.class
```

#### 2.1.7 JVM 面试高频考点

```
-运行时数据区：堆、栈、方法区、程序计数器等。
-对象分配：Eden 优先、大对象进老年代、TLAB 分配等。
-GC 及调优：GC 算法（Mark-Sweep、G1、ZGC）、GC 日志分析、参数调优。
-ART 虚拟机：AOT、JIT、GC 机制优化，Android 相关调优。
-ClassLoader：类加载器、双亲委派模型、自定义类加载。
-字节码：Java 字节码指令、javap 反编译工具
```

### 2.2 JUC相关知识:并发模型和内存 , 锁，CAS，原子变量, 线程池 ，AQS

#### 2.2.1 Java 并发模型和内存模型

```
1-Java 并发模型：Java 并发模型基于线程（Thread），通过共享内存进行通信，核心组件
-volatile 关键字：保证可见性和有序性，不能保证原子性。
-synchronized 关键字：保证原子性和可见性，依赖 Monitor Lock。
-Lock API（ReentrantLock、ReadWriteLock）：更灵活的锁机制，支持公平锁、可重入等。


2-Java 内存模型（JMM）：JMM规定了多线程如何访问共享变量，核心特性：
-可见性：一个线程修改变量后，其他线程能立即看到（volatile、synchronized 保证）。
-原子性：一个操作不可被中断（synchronized、Atomic 变量保证）。
-有序性：禁止指令重排序（happens-before 规则）。

3-Happens-Before 规则：
-volatile 变量写入 先于 读取。
-synchronized 代码块执行 先于 退出。
-Thread.start() 先于 线程 run() 方法执行。
-Thread.join() 先于 线程结束。
```

####  2.2.2 锁（Lock）

Java 提供了多种锁机制来控制并发访问：

|             锁类型              |                          特点                          |
| :-----------------------------: | :----------------------------------------------------: |
|    偏向锁（Biased Locking）     |     线程偏向某个锁，减少同步开销（无竞争时高效）。     |
| 轻量级锁（Lightweight Locking） |    线程 CAS 方式尝试获取锁，适用于 **低竞争** 场景     |
| 重量级锁（Heavyweight Locking） |         线程阻塞等待锁，适用于 **高竞争** 场景         |
|        公平锁 / 非公平锁        | 公平锁按 FIFO 顺序获取，非公平锁可插队（默认非公平）。 |
|    可重入锁（ReentrantLock）    |   允许同一线程多次获取同一把锁（递归调用时不会死锁）   |
|     读写锁（ReadWriteLock）     |           读线程共享、写线程独占，提高读性能           |
|       自旋锁（SpinLock）        |     线程不断尝试获取锁，适用于 **短时间竞争** 场景     |

2-代码

```
1-ReentrantLock
Lock lock = new ReentrantLock();
lock.lock();
try {
    // 临界区代码
} finally {
    lock.unlock();
}

2-ReadWriteLock
ReadWriteLock rwLock = new ReentrantReadWriteLock();
rwLock.readLock().lock();
try {
    // 读操作
} finally {
    rwLock.readLock().unlock();
}
```

#### 2.2.3 CAS（Compare-And-Swap）

```
1-CAS 是一种 无锁并发 机制，保证变量的 原子性更新，核心步骤：
-读取变量的 当前值（V）。
-比较期望值 E 是否与当前值 V 相等。
-如果相等，则将值更新为新值 N，否则重试。

2-CAS 存在的问题
-ABA 问题：变量从 A → B → A，CAS 仍然认为未修改（可用 AtomicStampedReference 解决）。
-循环开销大：CAS 自旋消耗 CPU。
-只能保证单个变量原子操作：多变量可用 AtomicReference 解决

AtomicInteger atomicInteger = new AtomicInteger(0);
atomicInteger.compareAndSet(0, 1);  // 如果当前值是0，则更新为1
```

#### 2.2.4 原子变量（Atomic）

JUC 提供 `java.util.concurrent.atomic` 包，支持 **无锁原子操作**。

|   类别   |                           示例                           |
| :------: | :------------------------------------------------------: |
| 基本类型 |      AtomicInteger` / `AtomicLong` / `AtomicBoolean      |
| 数组类型 |          AtomicIntegerArray` / `AtomicLongArray          |
| 引用类型 | `AtomicReference` / `AtomicStampedReference`（解决 ABA） |

代码

```
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();  // 原子 +1
count.decrementAndGet();  // 原子 -1
```

#### 2.2.5  线程池（ThreadPool）

1-线程池核心参数

```
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    corePoolSize,     // 核心线程数
    maximumPoolSize,  // 最大线程数
    keepAliveTime,    // 线程空闲回收时间
    TimeUnit.SECONDS, // 时间单位
    workQueue,        // 任务队列
    threadFactory,    // 线程工厂
    handler           // 拒绝策略
);
```

2-线程池的拒绝策略

|        策略         |             作用             |
| :-----------------: | :--------------------------: |
|     AbortPolicy     |      直接抛异常（默认）      |
|    DiscardPolicy    |     丢弃新任务，不抛异常     |
| DiscardOldestPolicy | 丢弃最老任务，尝试执行新任务 |
|  CallerRunsPolicy   |  由提交任务的线程执行任务。  |

3-常见线程池

|         线程池         |                特点                |
| :--------------------: | :--------------------------------: |
|   FixedThreadPool(n)   | 固定大小线程池，适用于稳定任务量。 |
|   CachedThreadPool()   |   动态线程池，适用于大量短任务。   |
| ScheduledThreadPool(n) |          定时任务线程池。          |
| SingleThreadExecutor() |     单线程池，适用于串行任务。     |

代码

```
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.execute(() -> System.out.println("任务执行"));
pool.shutdown();
```

#### 2.2.6 AQS（AbstractQueuedSynchronizer）

AQS 是 **锁和同步器的底层框架**，基于 **FIFO 队列 + CAS + 自旋锁** 实现线程同步

1-AQS 两种模式

```
1-独占模式（Exclusive）：
-只有一个线程能获取资源（如 ReentrantLock）。

2-共享模式（Shared）：
-多个线程可共享资源（如 CountDownLatch、Semaphore）
```

2-AQS 相关类

|       类       |                作用                 |
| :------------: | :---------------------------------: |
| ReentrantLock  |    可重入锁，支持公平 / 非公平锁    |
| CountDownLatch |       线程等待多个任务完成。        |
|   Semaphore    |      控制并发线程数（信号量）       |
| CyclicBarrier  | 线程相互等待，类似 `CountDownLatch` |

3-CountDownLatch 示例

```
CountDownLatch latch = new CountDownLatch(3);
new Thread(() -> {
    System.out.println("任务完成");
    latch.countDown();
}).start();
latch.await();  // 等待所有任务完成
```

#### 2.2.7 JUC 面试考点

```
-并发模型 & 内存模型（JMM、Happens-Before）
-锁（synchronized、ReentrantLock、ReadWriteLock）
-CAS（无锁并发、ABA 问题）
-原子变量（AtomicInteger、AtomicReference）
-线程池（ThreadPoolExecutor、拒绝策略）
-AQS（ReentrantLock、CountDownLatch、Semaphore）
```

### 2.3 注解反射泛型,注解处理器，APT ,KAPT,KSP,KCP,SPI机制

```
在 Java 和 Kotlin 开发中，注解（Annotations）、反射（Reflection）、泛型（Generics）、
APT（Annotation Processing Tool）、KAPT（Kotlin APT）、KSP（Kotlin Symbol Processing）、
KCP（Kotlin Compiler Plugin）、SPI（Service Provider Interface） 都是高级技术点，
广泛应用于 框架开发、代码生成、依赖注入（如 Dagger）、JSON 解析（如 Gson/Moshi）、插件开发等。
以下是详细解析
```

#### 2.3.1 注解（Annotations）

1-注解是一种 **元编程** 机制，主要用于 **标记、配置和代码生成**。Java 的注解分类如下：

|  注解类型  |        作用        |           示例           |
| :--------: | :----------------: | :----------------------: |
| 编译时注解 | APT 解析，代码生成 |    @Override、@Entity    |
| 运行时注解 |    反射获取注解    |   @Retention(RUNTIME)    |
|   元注解   |   定义注解的行为   |   @Retention、@Target    |
|  文档注解  |      生成文档      | @Deprecated、@Documented |

2-常见元注解

|               元注解                |     作用     |
| :---------------------------------: | :----------: |
| @Retention(RetentionPolicy.RUNTIME) |  运行时可用  |
|     @Target(ElementType.FIELD)      |  作用于字段  |
|             @Inherited              | 允许子类继承 |
|             @Repeatable             | 允许重复注解 |

3-代码

```
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface MyAnnotation {
    String value();
    int count() default 1;
}
```

#### 2.3.2 反射（Reflection）

1-概念

```
反射用于 运行时动态获取类信息、创建对象、调用方法。适用于：

-框架开发（Spring、Gson、Retrofit）
-插件系统
-动态代理（JDK Proxy、CGLIB）
```

2-反射示例

```
Class<?> clazz = Class.forName("com.example.User");

// 创建对象
Object obj = clazz.getDeclaredConstructor().newInstance();

// 获取字段
Field field = clazz.getDeclaredField("name");
field.setAccessible(true);
field.set(obj, "张三");

// 调用方法
Method method = clazz.getMethod("sayHello");
method.invoke(obj);
```

3-反射的缺点

```
-性能损耗（通过 MethodHandle 优化）
-安全性问题（破坏封装）
-代码可读性差
```

#### 2.3.3 泛型（Generics）

1-概念

```
泛型用于 代码复用和类型安全，主要有：

-类泛型：class Box<T> { }
-方法泛型：public <T> void print(T value) { }
-泛型通配符：<?>、<? extends T>、<? super T>
```

2-泛型示例

```
class Box<T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}
Box<String> box = new Box<>();
box.set("Hello");
System.out.println(box.get()); // Hello
```

3-泛型擦除：Java 泛型采用 **类型擦除（Type Erasure）**，泛型信息在 **编译期检查，运行时擦除**

```
List<String> list1 = new ArrayList<>();
List<Integer> list2 = new ArrayList<>();
System.out.println(list1.getClass() == list2.getClass()); // true
```

#### 2.3.4 APT（Annotation Processing Tool）

1-概念

```
APT 是 Java 注解处理器，在编译期处理注解，常用于 自动代码生成（如 Dagger、ButterKnife、Room）。
```

2-APT关键类

|      类/接口      |       作用       |
| :---------------: | :--------------: |
| AbstractProcessor | 自定义注解处理器 |
|     Messager      |     日志输出     |
|       Filer       |      Filer       |
|      Element      |     解析注解     |

3-APT 代码示例

```
@AutoService(Processor.class)
public class MyProcessor extends AbstractProcessor {
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (Element element : roundEnv.getElementsAnnotatedWith(MyAnnotation.class)) {
            System.out.println("Processing: " + element.getSimpleName());
        }
        return true;
    }
}
```

#### 2.3.5 Kotlin 的 KAPT、KSP、KCP

1-KAPT（Kotlin Annotation Processing Tool）

```
KAPT 是 Kotlin 版 APT，让 Kotlin 能使用 Java APT（如 Dagger、Room）。
kapt 'com.google.dagger:dagger-compiler:2.40'

问题：
-需要额外生成 Java stubs
-运行较慢
```

2-KSP（Kotlin Symbol Processing）

```
KSP 直接解析 Kotlin 代码，无需生成 Java stubs，比 KAPT 快 2~3 倍。

id 'com.google.devtools.ksp'
dependencies {
    ksp 'com.squareup.moshi:moshi-kotlin-codegen:1.13.0'
}

2-KSP 关键 API
API	                  作用
Resolver	        获取 Kotlin AST 结构
KSClassDeclaration	解析类
KSPLogger	        日志

3-代码
class MyKspProcessor : SymbolProcessor {
    override fun process(resolver: Resolver): List<KSAnnotated> {
        val symbols = resolver.getSymbolsWithAnnotation("com.example.MyAnnotation")
        symbols.forEach { println(it) }
        return emptyList()
    }
}
```

3-KCP（Kotlin Compiler Plugin）

```
KCP 允许修改 Kotlin 编译过程，可用于：
-插桩（Transform 代码）
-优化编译
-定制 DSL

示例：Compose、Kotlin Serialization 就是基于 KCP 的
```

#### 2.3.6 SPI（Service Provider Interface）

```
1-概念
SPI 是 Java 的插件机制，用于 动态加载扩展服务，如：
-JDBC Driver
-Dubbo
-SLF4J

2-SPI 机制

2.1 定义接口
public interface ILog {
    void log(String msg);
}
2.2 实现接口
public class FileLogger implements ILog {
    public void log(String msg) { System.out.println("File log: " + msg); }
}

2.3 配置 META-INF/services/com.example.ILog
com.example.FileLogger

2.4 动态加载
ServiceLoader<ILog> loader = ServiceLoader.load(ILog.class);
for (ILog log : loader) {
    log.log("Hello SPI");
}

2.5 优点：
-解耦（符合 OCP 原则）
-动态加载（插件化）
-性能优化（延迟加载）
```

#### 2.3.7 总结

|        概念         |                作用                 |
| :-----------------: | :---------------------------------: |
| 注解（Annotations） |        标记、配置、代码生成         |
| 反射（Reflection）  |          运行时获取类信息           |
|  泛型（Generics）   |         类型安全、代码复用          |
|         APT         |  Java 注解处理器（编译时代码生成）  |
|        KAPT         |        Kotlin 版 APT（较慢）        |
|         KSP         | Kotlin 版 Symbol Processing（更快） |
|         KCP         |  Kotlin 编译插件（可修改编译过程）  |
|         SPI         |      Java 插件机制（动态扩展）      |

### 2.4 动态代理，Aspect, Javassist, ASM字节码插桩等面向切面编程

```
面试中，动态代理（Dynamic Proxy）、AOP（Aspect-Oriented Programming）、
Javassist、ASM 字节码插桩 是高级 Java 技术，主要用于 日志、权限校验、事务管理、性能监控、框架扩展等。
以下是详细解析：
```

#### 2.4.1 动态代理（Dynamic Proxy）

```
动态代理是一种 运行时创建代理对象 的技术，不需要手动编写代理类，主要分为：
-JDK 动态代理（基于接口）
-CGLIB 动态代理（基于子类）
-Javassist、ByteBuddy（基于字节码）


1.1 JDK 动态代理
-只能代理 实现了接口的类（基于 java.lang.reflect.Proxy）。
-通过 InvocationHandler 处理方法调用。

JDK 动态代理的优缺点
优点：
-无需手动编写代理类
-适用于面向接口编程
 
缺点：
只能代理 实现接口的类（不能代理普通类）

1.2 CGLIB 动态代理
-基于 继承 生成子类代理（适用于没有接口的类）。
-依赖 Enhancer 和 MethodInterceptor。

优点：不需要接口，也能代理普通类 

缺点：
-需要额外的 CGLIB 依赖
-不能代理 final 方法
```

#### 2.4.2 Aspect（AOP 面向切面编程）

```
AOP 主要用于 日志、事务、权限控制，基于 动态代理 实现，核心概念：

-切面（Aspect）：增强代码（如日志、权限）。
-切点（Pointcut）：在哪些方法上生效（表达式匹配）。
-通知（Advice）：
 -@Before 方法执行前增强
 -@After 方法执行后增强
 -@Around 环绕增强
 -@AfterReturning 成功返回后增强
 -@AfterThrowing 抛异常后增强
```

#### 2.4.3 Javassist（字节码增强）

```
Javassist 直接 修改字节码，适用于：
-动态代理
-插桩（Instrumentation）
-字节码生成
```

#### 2.4.4 ASM（Java 字节码级别插桩）

```
ASM 是 比 Javassist 更底层 的字节码操作库，直接 解析、修改、生成 class 文件。
```

#### 2.4.5 总结

|     技术      |      作用      |     适用场景     |
| :-----------: | :------------: | :--------------: |
| JDK 动态代理  |  基于接口代理  | Spring AOP、RPC  |
|  CGLIB 代理   |  继承方式代理  |    代理普通类    |
| Aspect（AOP） |  面向切面编程  | 事务、日志、权限 |
|   Javassist   | 高级字节码操作 | 框架开发、热更新 |
|      ASM      | 低级字节码操作 |   插桩、类修改   |

### 2.5 基础数据结构和算法

```
数据结构和算法是编程的基石，在面试中经常涉及 数组、链表、栈、队列、哈希表、树、图 等数据结构，
以及 排序、查找、动态规划、回溯、贪心、分治、位运算 等算法。
```

#### 2.5.1 基础数据结构

1-数组（Array）

```
特点：连续内存，随机访问 O(1)，插入删除 O(n)
应用：
-缓存（CPU Cache）
-二维表（如棋盘、地图）
-双指针、滑动窗口算法

常见考题：
-双指针：两数之和、三数之和、盛水最多的容器
-滑动窗口：最长无重复子串

示例
// 滑动窗口：最长无重复子串（LeetCode 3）
public int lengthOfLongestSubstring(String s) {
    int[] chars = new int[128]; 
    int left = 0, right = 0, max = 0;
    while (right < s.length()) {
        chars[s.charAt(right)]++;
        while (chars[s.charAt(right)] > 1) chars[s.charAt(left++)]--;
        max = Math.max(max, right - left + 1);
        right++;
    }
    return max;
}
```

2-链表（Linked List）

```
特点：动态分配，插入删除 O(1)，访问 O(n)

分类：
-单链表（单向指针）
-双向链表（前后指针）
-环形链表（可用于循环任务调度）

常见考题：
-反转链表（LeetCode 206）
-检测环（快慢指针）
-合并两个有序链表
-LRU 缓存

示例
// 反转链表（LeetCode 206）
public ListNode reverseList(ListNode head) {
    ListNode prev = null, cur = head;
    while (cur != null) {
        ListNode next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
}
```

3-栈（Stack）

```
特点：LIFO（Last In First Out）

应用：
-括号匹配
-表达式求值
-深度优先搜索（DFS）

常见考题：
-有效括号（LeetCode 20）
-逆波兰表达式计算
-单调栈（最大矩形、柱状图中最大矩形）

示例
// 有效括号（LeetCode 20）
public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') stack.push(c);
        else if (stack.isEmpty() || Math.abs(c - stack.pop()) > 2) return false;
    }
    return stack.isEmpty();
}
```

4-队列 & 双端队列（Queue & Deque）

```
特点：
-队列（FIFO）：先进先出
-双端队列（Deque）：两端操作 O(1)

应用：
-BFS（广度优先搜索）
-滑动窗口最大值
-任务调度

常见考题：
-滑动窗口最大值（单调队列）
-最短路径（BFS）

示例
// 滑动窗口最大值（LeetCode 239）
public int[] maxSlidingWindow(int[] nums, int k) {
    Deque<Integer> deque = new LinkedList<>();
    int[] res = new int[nums.length - k + 1];
    for (int i = 0; i < nums.length; i++) {
        if (!deque.isEmpty() && deque.peekFirst() == i - k) deque.pollFirst();
        while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) deque.pollLast();
        deque.offerLast(i);
        if (i >= k - 1) res[i - k + 1] = nums[deque.peekFirst()];
    }
    return res;
}
```

#### 2.5.2 常见算法

1-常见算法

|   排序   | 时间复杂度 |  额外空间  | 是否稳定 |  适用场景  |
| :------: | :--------: | :--------: | :------: | :--------: |
| 冒泡排序 |   O(n²)    |    O(1)    |    ✅     |  小数据量  |
| 选择排序 |   O(n²)    |    O(1)    |    ❌     |  小数据量  |
| 插入排序 |   O(n²)    |    O(1)    |    ✅     |  基本有序  |
| 归并排序 | O(n log n) |    O(n)    |    ✅     | 大规模排序 |
| 快速排序 | O(n log n) | O(n log n) |    ❌     |  高效排序  |
|  堆排序  | O(n log n) |    O(1)    |    ❌     | 优先级队列 |

代码

```
// 快速排序
public void quickSort(int[] nums, int left, int right) {
    if (left >= right) return;
    int pivot = partition(nums, left, right);
    quickSort(nums, left, pivot - 1);
    quickSort(nums, pivot + 1, right);
}
private int partition(int[] nums, int left, int right) {
    int pivot = nums[right], i = left;
    for (int j = left; j < right; j++) {
        if (nums[j] < pivot) swap(nums, i++, j);
    }
    swap(nums, i, right);
    return i;
}
private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}
```

2-搜索算法

```
1-算法
DFS（深度优先搜索）
BFS（广度优先搜索）
二分查找

2-示例
// 二分查找
public int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

3-动态规划（DP）

```
-Fibonacci（记忆化搜索）
-背包问题
-最长递增子序列
-最长公共子序列

示例
// 动态规划：爬楼梯（LeetCode 70）
public int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
```

####  2.5.3  总结

| 数据结构 |      重点考点      |
| :------: | :----------------: |
|   数组   |  双指针、滑动窗口  |
|   链表   |   反转、快慢指针   |
|    栈    |  括号匹配、单调栈  |
|   队列   |   BFS、滑动窗口    |
|   排序   |     快排、归并     |
|   搜索   | 二分查找、DFS、BFS |
|    DP    |  背包问题、子序列  |

### 2.6 IO模型,BaseIO,BIO,NIO,OKIO

```
在 Java 和计算机网络编程中，I/O（Input/Output）模型是至关重要的，
特别是在高并发服务器开发中，了解不同的 I/O 模型能够帮助优化性能。
主要涉及 Base IO（基础 IO）、BIO（阻塞 IO）、NIO（非阻塞 IO）、OKIO（现代 IO 框架）。
```

#### 2.6.1 基础 IO 模型（Base IO）

**I/O 的本质** 是 **CPU 处理数据和设备交互的方式**，主要有以下模型：

|           I/O 模型           |                 描述                  |    适用场景    |
| :--------------------------: | :-----------------------------------: | :------------: |
|       阻塞 I/O（BIO）        |           线程阻塞等待数据            | 传统同步服务器 |
|      非阻塞 I/O（NIO）       |         轮询检查数据是否可读          |  高并发服务器  |
| 多路复用 I/O（NIO Selector） | 使用 `select/poll/epoll` 监听多个通道 |  高性能服务器  |
|         信号驱动 I/O         |       设备准备好数据后通知进程        |   低延迟场景   |
|       异步 I/O（AIO）        |      设备处理完成数据后通知应用       |   高吞吐并发   |

#### 2.6.2 BIO（阻塞 I/O）

```
-每个连接占用一个线程，大量连接会导致线程资源耗尽。
-数据读取/写入都是阻塞的，性能较低。
-适用于小规模连接，如早期 Java Web 服务器（Tomcat 传统模式）

适用于：小型应用（低并发）。
问题：每个连接都占用一个线程，线程资源浪费严重。
```

#### 2.6.3 NIO（非阻塞 I/O）

```
-基于 Channel + Buffer（替代 Stream）。
-Selector 多路复用（一个线程管理多个连接）。
-数据读取/写入是非阻塞的（不会阻塞线程）。
-适用于高并发场景，如 Netty、Tomcat NIO

适用于：高并发场景，如 聊天服务器、HTTP 服务器。
问题：需要手动管理 Selector 和 Buffer，较复杂。
```

#### 2.6.4 AIO（异步 I/O）

```
-I/O 操作完全异步（回调处理）。
-适用于超高并发场景，但 Linux 对 AIO 支持有限

适用于：超高并发，如 消息推送。
问题：回调地狱，维护困难
```

####  2.6.5 OKIO（高性能 I/O 框架）

```
OKIO 是 Square 开发的 I/O 库，更高效、简洁、适合 Android。

-Buffer 替代 ByteBuffer，更灵活。
-链式操作，更符合流式处理。
-自动管理资源，不易出错

适用于：高效 I/O 读写（文件、网络）。
问题：Android 依赖性较强，不适合底层网络编程。
```

#### 2.6.6 选择 I/O 模型

| 模型 |        适用场景        | 线程占用 | 复杂度 |
| :--: | :--------------------: | :------: | :----: |
| BIO  |  小型服务器（低并发）  |    高    |   低   |
| NIO  |   高并发（如 Netty）   |    低    |  中中  |
| AIO  | 超高并发（推送、聊天） |    低    |   高   |
| OKIO |   文件 I/O、Android    |    低    |   低   |

#### 2.6.7 总结

```
-BIO：传统阻塞模式，适用于小规模并发。
-NIO：非阻塞 + Selector，适用于高并发服务器（如 Netty）。
-AIO：异步回调模式，适用于超高并发。
-OKIO：高效 I/O 读写（如 Android）
```

### 2.7 理解网络（Http,Https,Http1.0,2.0,3.0,https加密原理，TCP,UDP,Socket及与FD关系)

```
网络通信是后端开发和分布式系统的基础，涉及 HTTP、HTTPS、TCP、UDP、Socket 等概念，
下面详细解析它们的原理及关键点。
```

#### 2.7.1 HTTP 基础

```
HTTP（HyperText Transfer Protocol）是 无状态、基于请求-响应模式 的协议，
常见版本包括 HTTP/1.0、HTTP/1.1、HTTP/2、HTTP/3。

1.1 HTTP 1.0
-每个请求都建立一次 TCP 连接，响应后关闭连接（无连接复用）。
-无长连接，多次请求性能低下。
-不支持请求流水线（Pipelining）。

1.2 HTTP 1.1
-默认开启长连接（Keep-Alive），减少握手开销。
-支持管道化请求（Pipelining），多个请求可以复用一个 TCP 连接。
-增加 Host 头部，支持 虚拟主机。

1.3 HTTP 2.0
-多路复用（Multiplexing）：一个 TCP 连接 上可并行处理多个请求，无需排队等待（消除队头阻塞）。
-二进制帧：数据以二进制帧传输，而非文本格式。
-头部压缩（HPACK 算法）：减少冗余数据传输，提高性能。

1.4 HTTP 3.0（基于 QUIC）
-基于 UDP，减少 TCP 三次握手 + 慢启动 开销。
-自带 TLS 1.3，提高安全性。
-无队头阻塞（QUIC），连接恢复更快（TCP 断开需要重连，而 QUIC 只需恢复）。
-更快的 HTTP 传输，特别适用于移动网络和高延迟环境。
```

#### 2.7.2 HTTPS 加密原理

```
HTTPS = HTTP + TLS/SSL，用于加密 HTTP 通信，防止 窃听、中间人攻击。

HTTPS 加密流程：
-客户端 发送 HTTPS 请求，包含支持的 TLS 版本、加密算法等。
-服务器 发送 SSL 证书（包含公钥）。
-客户端 校验证书，生成 对称密钥（会话密钥）。
-使用公钥加密对称密钥，并发送给服务器。
-服务器使用私钥解密，获得对称密钥，之后通信 使用对称加密 进行数据传输。

核心加密算法：
-非对称加密（RSA、ECC）：用于 密钥交换。
-对称加密（AES）：用于 数据加密。
-摘要算法（SHA256）：用于 数据完整性校验。
```

#### 2.7.3 TCP 和 UDP

1-对比

| 协议 |         连接         |             可靠性             | 速度 |         典型应用          |
| :--: | :------------------: | :----------------------------: | :--: | :-----------------------: |
| TCP  | 面向连接（三次握手） | **可靠**，有流量控制、丢包重传 |  慢  |   HTTP、HTTPS、FTP、SSH   |
| UDP  |   无连接（不握手）   |     **不可靠**，无重传机制     |  快  | DNS、视频直播、VoIP、游戏 |

2-TCP 三次握手

```
TCP 建立连接需要三次握手：
-客户端 → 服务器（SYN）：请求连接。
-服务器 → 客户端（SYN+ACK）：确认连接。
-客户端 → 服务器（ACK）：连接成功。

⚠ 为什么不是两次握手？ 防止 历史连接 导致服务器误接收数据。
⚠ 为什么不是四次握手？ 三次已经足够保证双方都能确认对方在线。
```

3-TCP 四次挥手

```
TCP 断开连接需要四次挥手：
-客户端 → 服务器（FIN）：请求断开。
-服务器 → 客户端（ACK）：确认关闭接收方向。
-服务器 → 客户端（FIN）：请求关闭发送方向。
-客户端 → 服务器（ACK）：确认关闭。

⚠ 为什么不能三次挥手？ TCP 全双工通信，必须分别关闭 发送和接收 两个方向
```

#### 2.7.4 UDP 传输

```
UDP 没有握手和连接维护，直接发送数据，适用于：
-视频直播
-在线游戏
-IoT 设备
```

#### 2.7.5 Socket 与 FD（文件描述符）

1-什么是 Socket？

```
Socket 是进程间通信的桥梁，用于网络数据传输。
每个 Socket 都有一个文件描述符（FD）。
TCP Socket = IP + 端口。
```

2-FD（文件描述符）

```
在 Unix/Linux 中，所有的 I/O（文件、网络、设备）都是 文件：

0：标准输入（stdin）
1：标准输出（stdout）
2：标准错误（stderr）
3+：新打开的文件或网络连接
```

3-进程如何管理 Socket

```
FD 用于唯一标识 Socket，存储在 内核文件表 中。
select()、poll()、epoll() 都依赖 FD 进行 I/O 复用
```

#### 2.7.6 总结

|   技术   |        特点         |  应用场景   |
| :------: | :-----------------: | :---------: |
| HTTP 1.0 |   短连接，性能低    |  早期 Web   |
| HTTP 1.1 |   长连接 + 管道化   |  普通网站   |
| HTTP 2.0 | 多路复用 + 头部压缩 | 高并发 API  |
| HTTP 3.0 |     QUIC（UDP）     |  移动网络   |
|   TCP    |   可靠，流量控制    | Web、数据库 |
|   UDP    |    快速，不可靠     | 游戏、直播  |
|  Socket  |     进程间通信      |  网络编程   |

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)