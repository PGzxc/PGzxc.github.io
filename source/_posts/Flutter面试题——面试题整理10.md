---
title: Flutter面试题——面试题整理10
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: 4d656e39
date: 2024-05-17 17:16:41
---
## 一 面试题整理

* 自我介绍
* 项目中遇到过哪些比较棘手的问题，如何解决
* flutter中用的哪些组件多一些
* flutter防止白屏是如何做的呢？(靠什么机制)
* Handler、Message Queue、Looper是什么关系
* postdelay是什么原理，如何保证postdelay的有序
* volatitle关键字(如何保证可见性，没有用这个变量会出什么问题)

<!--more-->

## 二 自我介绍

```
Flutter 面试中的自我介绍应该简洁明了，重点突出与 Flutter 相关的技能和经验，并展现你的个人特质。
介绍应包含以下几个方面：

1.简短的个人信息: 姓名、工作年限（或学习年限）、专业背景。
2.Flutter 相关技能: 
列举你精通的 Flutter 技能，例如：Widget 使用、状态管理（Provider、BLoC、Riverpod 等）、
网络请求、动画、异步编程、平台通道、性能优化等。 
可以使用具体的项目或技术点来支撑你的描述，
例如："我曾经使用 Provider 完成过一个复杂的电商应用的状态管理，并成功优化了其性能。"
3.项目经验 (可选):
简要介绍 1-2 个你参与过的 Flutter 项目，重点突出你的贡献和从中获得的经验。
避免过于详细的描述，只需要概括性地说明项目类型、你的角色和取得的成果。
4.个人特质: 
展现你的积极主动、学习能力强、团队合作能力好等积极的个人品质。 
可以结合具体的例子来证明你的这些特质

5.求职意向: 简要说明你对这份工作的期待和职业规划

总而言之，自我介绍应该在 1-2 分钟内完成，重点突出与 Flutter 相关的技能和经验，
并展现你的个人魅力，为后续的面试环节打下良好的基础。 
记住要真诚、自信，并保持良好的沟通技巧。
```

## 三 flutter方面

### 3.1 项目中遇到过哪些比较棘手的问题，如何解决

```
在Flutter项目中，一些常见的棘手问题及其解决方法包括：

1.性能问题：卡顿和掉帧：在UI复杂或列表项较多时可能会出现卡顿。

解决方法
- 使用`ListView.builder`或`GridView.builder`来惰性加载列表项。
- 使用`const`构造函数优化不可变的小部件。
- 使用`Profiler`工具找出性能瓶颈。
- 将复杂计算移到后台进行处理（如使用`compute`函数）。

2.状态管理：状态同步问题：在多个组件之间共享状态时，状态可能不同步。

解决方法
- 选择合适的状态管理方案，如`Provider`、`Riverpod`、`Bloc`、`Redux`等。
- 了解并正确使用这些包的特性，确保状态在预期时机更新。

3.依赖包冲突：版本冲突：不同依赖包之间可能有版本冲突，导致构建失败。

解决方法
- 查看`pubspec.yaml`中的依赖版本，手动调整版本号使之兼容。
- 使用`flutter pub outdated`查看过期包，并升级到兼容版本。
- 在可能的情况下，选择使用更广泛兼容的版本号（如使用`^`符号）。

4.平台特定问题：iOS和Android差异：有些功能在iOS和Android上的表现不同，或特定平台上的功能无法正常工作。

解决方法
- 查看官方文档中针对平台的特定指南。
- 使用`Platform`类或`Platform.isIOS`、`Platform.isAndroid`进行平台区分处理。
- 如果需要调用原生代码，使用`MethodChannel`与平台原生代码通信。

5.构建和发布问题：构建失败：在不同环境下（如开发、测试、生产）可能会遇到构建失败的问题。

解决方法
- 确保所有依赖都正确配置，并且没有未解决的依赖冲突。
- 检查并设置正确的签名配置（尤其是Android的`keystore`和iOS的证书配置）。
- 使用`flutter clean`清理构建缓存，再重新构建项目。

6.网络请求和数据处理：API请求失败：处理网络请求时可能会遇到超时或数据格式错误等问题。

解决方法
- 使用`http`包或`dio`包进行网络请求，并处理超时和错误。
- 确保服务器API返回的数据格式正确，并在客户端进行严格的格式校验。
- 使用`FutureBuilder`或`StreamBuilder`处理异步数据加载。
```

### 3.2 flutter中用的哪些组件多一些

```
1.基础组件：
- Container：一个多功能容器，支持布局、装饰、定位等属性。
- Text：用于显示一段文本。
- Image：用于显示图片，可以从网络、文件、内存等加载。
- Icon：用于显示图标。
- Scaffold：应用程序页面的基础结构，包含AppBar、Drawer、Snackbar等常用组件。
- AppBar：顶部应用栏，通常包含标题和操作按钮。

2.布局组件：
- Column：垂直方向布局多个子组件。
- Row：水平方向布局多个子组件。
- Stack：重叠布局，可以让子组件堆叠显示。
- ListView：可滚动列表，用于显示大量子组件。
- GridView：网格布局，用于显示两维的子组件列表。
- Expanded和Flexible：控制子组件在Flex布局（如Row和Column）中的伸缩行为。

3.输入组件：
- TextField：文本输入框。
- Checkbox：复选框。
- Radio：单选按钮。
- Switch：开关按钮。
- Slider：滑块。
- DropdownButton：下拉按钮。

4.按钮组件：
- RaisedButton（已废弃，推荐使用ElevatedButton）：凸起按钮。
- FlatButton（已废弃，推荐使用TextButton）：扁平按钮。
- OutlinedButton：带边框按钮。
- IconButton：带图标按钮。
- FloatingActionButton：悬浮按钮，通常用于突出某个重要操作。

5.导航和路由：
- Navigator：管理应用程序页面的堆栈。
- Drawer：侧边栏菜单。
- BottomNavigationBar：底部导航栏。
- TabBar和TabBarView：标签栏和标签内容视图。

6.高级组件：
- FutureBuilder：基于异步操作的组件，用于处理Future的结果。
- StreamBuilder：基于流数据的组件，用于处理Stream的结果。
- CustomPaint：自定义绘制组件，允许开发者自己绘制图形。
- AnimationController和AnimatedBuilder：动画控制和构建组件。
```

### 3.3 flutter防止白屏是如何做的呢？(靠什么机制)

白屏问题的成因

```
Flutter Android端启动时出现白屏，主要原因是Flutter应用的启动过程相对耗时。
在Android平台上，应用启动需要经历一系列步骤，包括系统初始化、
Java虚拟机启动、应用加载、Flutter初始化、Dart虚拟机启动、Flutter应用加载等。
每一个步骤都会消耗一定的时间，导致白屏现象。
```

优化方案

```
1. 启动过程分析
2. 代码预热
3. 资源预加载
4. 异步初始化
5. 热重载优化
```

## 四 Android方面

### 4.1 Handler、Message Queue、Looper是什么关系

```
- Handler封装了消息的发送，也负责接收消。内部会跟Looper关联。
- Looper 消息封装的载，内部包含了MessageQueue，负责从MessageQueue取出消息，然后交给Handler处理
- MessageQueue 就是一个消息队列，负责存储消息，有消息过来就存储起来，
Looper会循环的从MessageQueue读取消息
```

### 4.2 postdelay是什么原理，如何保证postdelay的有序

1-概念

```
postdelay是一个在并发编程和分布式系统中常见的概念，通常用于描述在一定延迟之后执行某个操作的机制。
为了保证postdelay的有序性，需要考虑几个关键因素，
包括延迟的精确控制、操作执行的顺序控制，以及系统时钟的同步等。
```

2-postdelay的原理

```
1. 延迟队列（Delay Queue）:
   - 延迟队列是一种特殊的优先级队列，其中每个元素都有一个关联的到期时间（即延迟时间）。
   - 元素按到期时间排序，只有到期时间到了的元素才会出队执行。
2. 定时器（Timers）:
   - 系统会设置一个定时器，当定时器到期时触发特定的操作。
   - 定时器可以是单次触发，也可以是周期性触发。
3. 时间轮（Time Wheel）:
   - 一种高效的定时器实现，使用一个循环数组模拟时间的流逝。
   - 每个槽代表一个时间单位，槽中存储将在对应时间单位执行的任务。
```

3- 确保postdelay的有序性

```
为了保证 `postdelay` 操作的有序性，通常需要从以下几个方面进行设计：

1. 系统时钟同步:
   - 在分布式系统中，确保各个节点的时钟同步是至关重要的。可以使用网络时间协议（NTP）来同步各个节点的时钟。
   - 这样可以确保不同节点上的定时器能够按照预期的时间触发。
2. 使用有序的数据结构:
   - 使用优先级队列或者延迟队列，这些数据结构能够按照到期时间顺序处理任务。
   - 在插入任务时，根据其到期时间将其放在合适的位置，确保出队时的有序性。
3. 时间轮实现:
   - 如果系统需要处理大量的定时任务，可以使用时间轮来高效管理这些任务。
   - 时间轮的槽中任务按照到期时间顺序执行，保证了在每个时间单位内任务的有序性。
4. 一致性哈希和分区:
   - 在分布式系统中，可以使用一致性哈希将任务分配到不同的节点处理。
   - 确保同一时间段的任务被分配到相同或相近的节点，可以减少由于网络延迟带来的不确定性。
5. 事务和锁机制:
   - 使用事务来确保任务的原子性和一致性，避免由于并发导致的任务顺序混乱。
   - 使用锁机制来控制对队列的并发访问，确保任务插入和出队的顺序正确。
```

### 4.3 volatitle关键字(如何保证可见性，没有用这个变量会出什么问题)

1.概念

```
`volatile` 关键字是 Java 中的一种用于变量的修饰符，主要用于保证变量在多个线程之间的可见性。
理解 `volatile` 的作用以及它如何确保可见性，对编写正确的并发程序至关重要。
```

2.volatile的原理

```
`volatile` 关键字的主要作用是确保一个变量的可见性和防止指令重排序。具体来说：

- 可见性：
当一个线程修改了一个 `volatile` 变量的值，新的值会立即被刷新到主内存中，
其他线程在读取这个变量时能立即看到最新的值。
- 防止指令重排序：`volatile` 变量的读写操作不会与其他内存操作一起被重排序，确保了读写顺序的可预测性。
```

3.保证可见性

```
在多线程环境中，如果一个变量没有用 `volatile` 修饰，不同线程对这个变量的修改可能不会立即对其他线程可见。
这是因为每个线程都有自己的高速缓存，变量的修改可能首先会被写入线程的本地缓存，而不是主内存中。

使用 `volatile` 关键字后，任何对这个变量的写操作都会立即被刷入主内存，而不是保留在线程的本地缓存中。
任何线程读取这个变量时，都会直接从主内存读取，从而保证了变量的最新值对所有线程可见。
```

4.没有使用 `volatile` 可能出现的问题

```
如果在一个多线程程序中，不使用 `volatile` 来修饰共享变量，可能会导致以下问题：

- 不可见性：
一个线程修改了变量的值，但其他线程看不到这个修改，仍然使用旧值。
这会导致程序的行为不可预测。
例如，一个线程更新了一个标志变量，表示某个任务已经完成，而其他线程可能看不到这个更新，继续等待这个任务完成。

- 重排序问题：
由于没有 `volatile`，编译器和处理器可能会对指令进行重排序，导致程序执行顺序不一致，影响程序的正确性。
例如，在双重检查锁（Double-Checked Locking）中，如果没有使用 `volatile` 修饰 `instance` 变量，
可能会导致 `instance` 变量被重排序，从而导致其他线程看到一个不完整的对象。
```

5.实例说明

以下是一个简单的例子，展示了使用 `volatile` 和不使用 `volatile` 的区别：

```
public class VolatileExample {
    private volatile boolean flag = false;
    // private boolean flag = false; // 不使用 volatile 的情况

    public void writer() {
        flag = true; // 修改 flag 的值
    }

    public void reader() {
        if (flag) { // 读取 flag 的值
            System.out.println("Flag is true");
        }
    }

    public static void main(String[] args) {
        VolatileExample example = new VolatileExample();

        Thread writerThread = new Thread(() -> {
            example.writer();
        });

        Thread readerThread = new Thread(() -> {
            example.reader();
        });

        writerThread.start();
        readerThread.start();
    }
}
```

在这个例子中：

- **使用 `volatile`**：当 `writer` 方法将 `flag` 设置为 `true` 后，`reader` 方法中的读取操作会立即看到这个修改，输出 "Flag is true"。
- **不使用 `volatile`**：`writer` 方法将 `flag` 设置为 `true` 后，`reader` 方法可能看不到这个修改，`flag` 仍然为 `false`，不会输出任何内容。

6.总结

```
`volatile` 关键字在 Java 并发编程中用于保证变量的可见性和防止指令重排序。
使用 `volatile` 能确保多个线程能够正确地看到变量的最新值，避免因可见性问题导致的错误。
未使用 `volatile` 时，可能会导致数据不一致、不可预测的行为和难以调试的并发问题。
因此，在需要确保变量可见性的场景下，应该使用 `volatile` 关键字
```

## 五 参考

* [告别白屏：优化Flutter Android端启动速度，带来顺滑体验](https://www.bytezonex.com/archives/0pGoOocV.html)