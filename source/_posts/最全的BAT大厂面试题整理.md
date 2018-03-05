---
title: 最全的BAT大厂面试题整理
date: 2018-03-05 16:53:18
categories: [Android面试知识点]
tags: [BAT大厂面试题]
---
注：本文为转载文章，原文出处： [最全的BAT大厂面试题整理][1] 
![][2]    
# 前言 

临近年关，又到了面试求职高峰期，最近有很多网友都在求大厂面试题。正好我之前电脑里面有这方面的整理，于是就发上来分享给大家。

这些题目是网友去百度、小米、乐视、美团、58、猎豹、360、新浪、搜狐等一线互联网公司面试被问到的题目。熟悉本文中列出的知识点会大大增加通过前两轮技术面试的几率。

<!--more-->


网上的都是按照公司划分的，想找具体某一方面的知识点有点不好找，我这里就根据知识点分门别类的整理了一下，想看哪一块可以快速找到，希望可以帮助大家，祝大家求职顺利。

本文同步发布在github上，想要md文件的，有兴趣的可以去github下载下来研究，同时也欢迎网友提交面试题库，欢迎点赞和留言。

[https://github.com/AweiLoveAndroid/CommonDevKnowledge][3] 

# 主要分为以下几部分

- java面试题
- Android面试题
- 高端技术面试题
- 非技术性问题&HR问题汇总

## java面试题

###  java基础面试知识点

- java中==和equals和hashCode的区别
- int、char、long各占多少字节数
- int与integer的区别
- 探探对java多态的理解
- String、StringBuffer、StringBuilder区别
- 什么是内部类？内部类的作用
- 抽象类和接口区别
- 抽象类的意义
- 抽象类与接口的应用场景
- 抽象类是否可以没有方法和属性？
- 接口的意义
- 泛型中extends和super的区别
- 父类的静态方法能否被子类重写
- 进程和线程的区别
- final，finally，finalize的区别
- 序列化的方式
- Serializable 和Parcelable 的区别
- 静态属性和静态方法是否可以被继承？是否可以被重写？以及原因？
- 静态内部类的设计意图
- 成员内部类、静态内部类、局部内部类和匿名内部类的理解，以及项目中的应用
- 谈谈对kotlin的理解
- 闭包和局部内部类的区别
- string 转换成 integer的方式及原理

###  java深入源码级的面试题（有难度）

- 哪些情况下的对象会被垃圾回收机制处理掉？
- 讲一下常见编码方式？
- utf-8编码中的中文占几个字节；int型几个字节？
- 静态代理和动态代理的区别，什么场景使用？
- Java的异常体系
- 谈谈你对解析与分派的认识。
- 修改对象A的equals方法的签名，那么使用HashMap存放这个对象实例的时候，会调用哪个equals方法？
- Java中实现多态的机制是什么？
- 如何将一个Java对象序列化到文件里？
- 说说你对Java反射的理解
- 说说你对Java注解的理解
- 说说你对依赖注入的理解
- 说一下泛型原理，并举例说明
- Java中String的了解
- String为什么要设计成不可变的？
- Object类的equal和hashCode方法重写，为什么？

###  数据结构

- 常用数据结构简介
- 并发集合了解哪些？
- 列举java的集合以及集合之间的继承关系
- 集合类以及集合框架
- 容器类介绍以及之间的区别（容器类估计很多人没听这个词，Java容器主要可以划分为4个部分：List列表、Set集合、Map映射、工具类（Iterator迭代器、Enumeration枚举类、Arrays和Collections），具体的可以看看这篇博文[Java容器类][4]）
- List,Set,Map的区别
- List和Map的实现方式以及存储方式
- HashMap的实现原理
- HashMap数据结构？
- HashMap源码理解
- HashMap如何put数据（从HashMap源码角度讲解）？
- HashMap怎么手写实现？
- ConcurrentHashMap的实现原理
- ArrayMap和HashMap的对比
- HashTable实现原理
- TreeMap具体实现
- HashMap和HashTable的区别
- HashMap与HashSet的区别
- HashSet与HashMap怎么判断集合元素重复？
- 集合Set实现Hash怎么防止碰撞
- ArrayList和LinkedList的区别，以及应用场景
- 数组和链表的区别
- 二叉树的深度优先遍历和广度优先遍历的具体实现
- 堆的结构
- 堆和树的区别
- 堆和栈在内存中的区别是什么(解答提示：可以从数据结构方面以及实际实现方面两个方面去回答)？
- 什么是深拷贝和浅拷贝
- 手写链表逆序代码
- 讲一下对树，B+树的理解
- 讲一下对图的理解
- 判断单链表成环与否？
- 链表翻转（即：翻转一个单项链表）
- 合并多个单有序链表（假设都是递增的）

### 线程、多线程和线程池

- 开启线程的三种方式？
- 线程和进程的区别？
- 为什么要有线程，而不是仅仅用进程？
- run()和start()方法区别
- 如何控制某个方法允许并发访问线程的个数？
- 在Java中wait和seelp方法的不同；
- 谈谈wait/notify关键字的理解
- 什么导致线程阻塞？
- 线程如何关闭？
- 讲一下java中的同步的方法
- 数据一致性如何保证？
- 如何保证线程安全？
- 如何实现线程同步？
- 两个进程同时要求写或者读，能不能实现？如何防止进程的同步？
- 线程间操作List
- Java中对象的生命周期
- Synchronized用法
- synchronize的原理
- 谈谈对Synchronized关键字，类锁，方法锁，重入锁的理解
- static synchronized 方法的多线程访问和作用
- 同一个类里面两个synchronized方法，两个线程同时访问的问题
- volatile的原理
- 谈谈volatile关键字的用法
- 谈谈volatile关键字的作用
- 谈谈NIO的理解
- synchronized 和volatile 关键字的区别
- synchronized与Lock的区别
- ReentrantLock 、synchronized和volatile比较
- ReentrantLock的内部实现
- lock原理
- 死锁的四个必要条件？
- 怎么避免死锁？
- 对象锁和类锁是否会互相影响？
- 什么是线程池，如何使用?
- Java的并发、多线程、线程模型
- 谈谈对多线程的理解
- 多线程有什么要注意的问题？
- 谈谈你对并发编程的理解并举例说明
- 谈谈你对多线程同步机制的理解？
- 如何保证多线程读写文件的安全？
- 多线程断点续传原理
- 断点续传的实现

### 并发编程有关知识点（这个是一般Android开发用的少的，所以建议多去看看）：
平时Android开发中对并发编程可以做得比较少，Thread这个类经常会用到，但是我们想提升自己的话，一定不能停留在表面，,我们也应该去了解一下java的关于线程相关的源码级别的东西。

学习的参考资料如下：

#### Java 内存模型
[java线程安全总结][5]  
[深入理解java内存模型系列文章][6]
#### 线程状态：
[一张图让你看懂JAVA线程间的状态转换][7]
#### 锁：
[锁机制：synchronized、Lock、Condition][8]  
[Java 中的锁][9]
#### 并发编程：
[Java并发编程：Thread类的使用][10]  
[Java多线程编程总结][11]  
[Java并发编程的总结与思考][12]  
[Java并发编程实战-----synchronized][13] 
[深入分析ConcurrentHashMap][14]

## Android面试题
Android面试题包括Android基础，还有一些源码级别的、原理这些等。所以想去大公司面试，一定要多看看源码和实现方式，常用框架可以试试自己能不能手写实现一下，锻炼一下自己。  

### Android基础知识点

- 四大组件是什么
- 四大组件的生命周期和简单用法
- Activity之间的通信方式
- Activity各种情况下的生命周期
- 横竖屏切换的时候，Activity 各种情况下的生命周期
- Activity与Fragment之间生命周期比较
- Activity上有Dialog的时候按Home键时的生命周期
- 两个Activity 之间跳转时必然会执行的是哪几个方法？
- 前台切换到后台，然后再回到前台，Activity生命周期回调方法。弹出Dialog，生命值周期回调方法。
- Activity的四种启动模式对比
- Activity状态保存于恢复
- fragment各种情况下的生命周期
- Fragment状态保存startActivityForResult是哪个类的方法，在什么情况下使用？
- 如何实现Fragment的滑动？
- fragment之间传递数据的方式？
- Activity 怎么和Service 绑定？
- 怎么在Activity 中启动自己对应的Service？
- service和activity怎么进行数据交互？
- Service的开启方式
- 请描述一下Service 的生命周期
- 谈谈你对ContentProvider的理解
- 说说ContentProvider、ContentResolver、ContentObserver 之间的关系
- 请描述一下广播BroadcastReceiver的理解
- 广播的分类
- 广播使用的方式和场景
- 在manifest 和代码中如何注册和使用BroadcastReceiver?
- 本地广播和全局广播有什么差别？
- BroadcastReceiver，LocalBroadcastReceiver 区别
- AlertDialog,popupWindow,Activity区别
- Application 和 Activity 的 Context 对象的区别
- Android属性动画特性
- 如何导入外部数据库?
- LinearLayout、RelativeLayout、FrameLayout的特性及对比，并介绍使用场景。
- 谈谈对接口与回调的理解
- 回调的原理
- 写一个回调demo
- 介绍下SurfView
- RecycleView的使用
- 序列化的作用，以及Android两种序列化的区别
- 差值器
- 估值器
- Android中数据存储方式

### Android源码相关分析

- Android动画框架实现原理
- Android各个版本API的区别
- Requestlayout，onlayout，onDraw，DrawChild区别与联系
- invalidate和postInvalidate的区别及使用
- Activity-Window-View三者的差别
- 谈谈对Volley的理解
- 如何优化自定义View
- 低版本SDK如何实现高版本api？
- 描述一次网络请求的流程
- HttpUrlConnection 和 okhttp关系
- Bitmap对象的理解
- looper架构
- ActivityThread，AMS，WMS的工作原理
- 自定义View如何考虑机型适配
- 自定义View的事件
- AstncTask+HttpClient 与 AsyncHttpClient有什么区别？
- LaunchMode应用场景
- AsyncTask 如何使用?
- SpareArray原理
- 请介绍下ContentProvider 是如何实现数据共享的？
- AndroidService与Activity之间通信的几种方式
- IntentService原理及作用是什么？
- 说说Activity、Intent、Service 是什么关系
- ApplicationContext和ActivityContext的区别
- SP是进程同步的吗?有什么方法做到同步？
- 谈谈多线程在Android中的使用
- 进程和 Application 的生命周期
- 封装View的时候怎么知道view的大小
- RecycleView原理
- AndroidManifest的作用与理解

### 常见的一些原理性问题

- Handler机制和底层实现
- Handler、Thread和HandlerThread的差别
- handler发消息给子线程，looper怎么启动？
- 关于Handler，在任何地方new Handler 都是什么线程下?
- ThreadLocal原理，实现及如何保证Local属性？
- 请解释下在单线程模型中Message、Handler、Message Queue、Looper之间的关系
- 请描述一下View事件传递分发机制
- Touch事件传递流程
- 事件分发中的onTouch 和onTouchEvent 有什么区别，又该如何使用？
- View和ViewGroup分别有哪些事件分发相关的回调方法
- View刷新机制
- View绘制流程
- 自定义控件原理
- 自定义View如何提供获取View属性的接口？
- Android代码中实现WAP方式联网
- AsyncTask机制
- AsyncTask原理及不足
- 如何取消AsyncTask？
- 为什么不能在子线程更新UI？
- ANR产生的原因是什么？
- ANR定位和修正
- oom是什么？
- 什么情况导致oom？
- 有什么解决方法可以避免OOM？
- Oom 是否可以try catch？为什么？
- 内存泄漏是什么？
- 什么情况导致内存泄漏？
- 如何防止线程的内存泄漏？
- 内存泄露场的解决方法
- 内存泄漏和内存溢出区别？
- LruCache默认缓存大小
- ContentProvider的权限管理(解答：读写分离，权限控制-精确到表级，URL控制)
- 如何通过广播拦截和abort一条短信？
- 广播是否可以请求网络？
- 广播引起anr的时间限制是多少？
- 计算一个view的嵌套层级
- Activity栈
- Android线程有没有上限？
- 线程池有没有上限？
- ListView重用的是什么？
- Android为什么引入Parcelable？
- 有没有尝试简化Parcelable的使用？

### 开发中常见的一些问题

- ListView 中图片错位的问题是如何产生的?
- 混合开发有了解吗？
- 知道哪些混合开发的方式？说出它们的优缺点和各自使用场景？（解答：比如:RN，weex，H5，小程序，WPA等。做Android的了解一些前端js等还是很有好处的)；
- 屏幕适配的处理技巧都有哪些?
- 服务器只提供数据接收接口，在多线程或多进程条件下，如何保证数据的有序到达？
- 动态布局的理解
- 怎么去除重复代码？
- 画出 Android 的大体架构图
- Recycleview和ListView的区别
- ListView图片加载错乱的原理和解决方案
- 动态权限适配方案，权限组的概念
- Android系统为什么会设计ContentProvider？
- 下拉状态栏是不是影响activity的生命周期
- 如果在onStop的时候做了网络请求，onResume的时候怎么恢复？
- Bitmap 使用时候注意什么？
- Bitmap的recycler()
- Android中开启摄像头的主要步骤
- ViewPager使用细节，如何设置成每次只初始化当前的Fragment，其他的不初始化？
- 点击事件被拦截，但是想传到下面的View，如何操作？
- 微信主页面的实现方式
- 微信上消息小红点的原理
- CAS介绍（这是阿里巴巴的面试题，我不是很了解，可以参考博客: CAS简介）

## 高端技术面试题
这里讲的是大公司需要用到的一些高端Android技术，这里专门整理了一个文档，希望大家都可以看看。这些题目有点技术含量，需要好点时间去研究一下的。 

### 图片

- 图片库对比
- 图片库的源码分析
- 图片框架缓存实现
- LRUCache原理
- 图片加载原理
- 自己去实现图片库，怎么做？
- Glide源码解析
- Glide使用什么缓存？
- Glide内存缓存如何控制大小？

### 网络和安全机制

- 网络框架对比和源码分析
- 自己去设计网络请求框架，怎么做？
- okhttp源码
- 网络请求缓存处理，okhttp如何处理网络缓存的
- 从网络加载一个10M的图片，说下注意事项
- TCP的3次握手和四次挥手
- TCP与UDP的区别
- TCP与UDP的应用
- HTTP协议
- HTTP1.0与2.0的区别
- HTTP报文结构
- HTTP与HTTPS的区别以及如何实现安全性
- 如何验证证书的合法性?
- https中哪里用了对称加密，哪里用了非对称加密，对加密算法（如RSA）等是否有了解?
- client如何确定自己发送的消息被server收到?
- 谈谈你对WebSocket的理解
- WebSocket与socket的区别
- 谈谈你对安卓签名的理解。
- 请解释安卓为啥要加签名机制?
- 视频加密传输
- App 是如何沙箱化，为什么要这么做？
- 权限管理系统（底层的权限是如何进行 grant 的）？

###  数据库

- sqlite升级，增加字段的语句
- 数据库框架对比和源码分析
- 数据库的优化
- 数据库数据迁移问题

### 算法

- 排序算法有哪些？
- 最快的排序算法是哪个？
- 手写一个冒泡排序
- 手写快速排序代码
- 快速排序的过程、时间复杂度、空间复杂度
- 手写堆排序
- 堆排序过程、时间复杂度及空间复杂度
- 写出你所知道的排序算法及时空复杂度，稳定性
- 二叉树给出根节点和目标节点，找出从根节点到目标节点的路径
- 给阿里2万多名员工按年龄排序应该选择哪个算法？
- GC算法(各种算法的优缺点以及应用场景)
- 蚁群算法与蒙特卡洛算法
- 子串包含问题(KMP 算法)写代码实现
- 一个无序，不重复数组，输出N个元素，使得N个元素的和相加为M，给出时间复杂度、空间复杂度。手写算法
- 万亿级别的两个URL文件A和B，如何求出A和B的差集C(提示：Bit映射->hash分组->多文件读写效率->磁盘寻址以及应用层面对寻址的优化)
- 百度POI中如何试下查找最近的商家功能(提示：坐标镜像+R树)。
- 两个不重复的数组集合中，求共同的元素。
- 两个不重复的数组集合中，这两个集合都是海量数据，内存中放不下，怎么求共同的元素？
- 一个文件中有100万个整数，由空格分开，在程序中判断用户输入的整数是否在此文件中。说出最优的方法
- 一张Bitmap所占内存以及内存占用的计算
- 2000万个整数，找出第五十大的数字？
- 烧一根不均匀的绳，从头烧到尾总共需要1个小时。现在有若干条材质相同的绳子，问如何用烧绳的方法来计时一个小时十五分钟呢？
- 求1000以内的水仙花数以及40亿以内的水仙花数
- 5枚硬币，2正3反如何划分为两堆然后通过翻转让两堆中正面向上的硬8币和反面向上的硬币个数相同
- 时针走一圈，时针分针重合几次
- N*N的方格纸,里面有多少个正方形
- x个苹果，一天只能吃一个、两个、或者三个，问多少天可以吃完？

### 插件化、模块化、组件化、热修复、增量更新、Gradle

- 对热修复和插件化的理解
- 插件化原理分析
- 模块化实现（好处，原因）
- 热修复,插件化
- 项目组件化的理解
- 描述清点击 Android Studio 的 build 按钮后发生了什么

### 架构设计和设计模式

- 谈谈你对Android设计模式的理解
- MVC MVP MVVM原理和区别
- 你所知道的设计模式有哪些？
- 项目中常用的设计模式
- 手写生产者/消费者模式
- 写出观察者模式的代码
- 适配器模式，装饰者模式，外观模式的异同？
- 用到的一些开源框架，介绍一个看过源码的，内部实现过程。
- 谈谈对RxJava的理解
- RxJava的功能与原理实现
- RxJava的作用，与平时使用的异步操作来比的优缺点
- 说说EventBus作用，实现方式，代替EventBus的方式
- 从0设计一款App整体架构，如何去做？
- 说一款你认为当前比较火的应用并设计(比如：直播APP，P2P金融，小视频等)
- 谈谈对java状态机理解
- Fragment如果在Adapter中使用应该如何解耦？
- Binder机制及底层实现
- 对于应用更新这块是如何做的？(解答：灰度，强制更新，分区域更新)？
- 实现一个Json解析器(可以通过正则提高速度)
- 统计启动时长,标准

### 性能优化

- 如何对Android 应用进行性能分析以及优化?
- ddms 和 traceView
- 性能优化如何分析systrace？
- 用IDE如何分析内存泄漏？
- Java多线程引发的性能问题，怎么解决？
- 启动页白屏及黑屏解决？
- 启动太慢怎么解决？
- 怎么保证应用启动不卡顿？
- App启动崩溃异常捕捉
- 自定义View注意事项
- 现在下载速度很慢,试从网络协议的角度分析原因,并优化(提示：网络的5层都可以涉及)。
- Https请求慢的解决办法（提示：DNS，携带数据，直接访问IP）
- 如何保持应用的稳定性
- RecyclerView和ListView的性能对比
- ListView的优化
- RecycleView优化
- View渲染
- Bitmap如何处理大图，如一张30M的大图，如何预防OOM
- java中的四种引用的区别以及使用场景
- 强引用置为null，会不会被回收？

### NDK、jni、Binder、AIDL、进程通信有关

- 请介绍一下NDK
- 什么是NDK库?
- jni用过吗？
- 如何在jni中注册native函数，有几种注册方式?
- Java如何调用c、c++语言？
- jni如何调用java层代码？
- 进程间通信的方式？
- Binder机制
- 简述IPC？
- 什么是AIDL？
- AIDL解决了什么问题？
- AIDL如何使用？
- Android 上的 Inter-Process-Communication 跨进程通信时如何工作的？
- 多进程场景遇见过么？
- Android进程分类？
- 进程和 Application 的生命周期？
- 进程调度
- 谈谈对进程共享和线程安全的认识
- 谈谈对多进程开发的理解以及多进程应用场景
- 什么是协程？

### framework层、ROM定制、Ubuntu、Linux之类的问题

- java虚拟机的特性
- 谈谈对jvm的理解
- JVM内存区域，开线程影响哪块内存
- 对Dalvik、ART虚拟机有什么了解？
- Art和Dalvik对比
- 虚拟机原理，如何自己设计一个虚拟机(内存管理，类加载，双亲委派)
- 谈谈你对双亲委派模型理解
- JVM内存模型，内存区域
- 类加载机制
- 谈谈对ClassLoader(类加载器)的理解
- 谈谈对动态加载（OSGI）的理
- 内存对象的循环引用及避免
- 内存回收机制、GC回收策略、GC原理时机以及GC对象
- 垃圾回收机制与调用System.gc()区别
- Ubuntu编译安卓系统
- 系统启动流程是什么？（提示：Zygote进程 –> SystemServer进程 –> 各种系统服务 –> 应用进程）
- 大体说清一个应用程序安装到手机上时发生了什么
- 简述Activity启动全部过程
- App启动流程，从点击桌面开始
- 逻辑地址与物理地址，为什么使用逻辑地址？
- Android为每个应用程序分配的内存大小是多少？
- Android中进程内存的分配，能不能自己分配定额内存？
- 进程保活的方式
- 如何保证一个后台服务不被杀死？（相同问题：如何保证service在后台不被kill？）比较省电的方式是什么？
- App中唤醒其他进程的实现方式

## 非技术性问题&HR问题汇总
这里整理的是一些与技术没有直接关系的面试题，但是能够考察你的综合水平，所以不要以为不是技术问题，就不看，往往有时候就是这样一些细节的题目被忽视，而错过了一次次面试机会。

### 非技术问题

- 介绍你做过的哪些项目
- 都使用过哪些框架、平台？
- 都使用过哪些自定义控件？
- 研究比较深入的领域有哪些？
- 对业内信息的关注渠道有哪些
- 最近都读哪些书？
- 有没有什么开源项目？
- 自己最擅长的技术点，最感兴趣的技术领域和技术点
- 项目中用了哪些开源库，如何避免因为引入开源库而导致的安全性和稳定性问题
- 实习过程中做了什么，有什么产出？

### HR提出的面试问题

- 您在前一家公司的离职原因是什么？
- 讲一件你印象最深的一件事情
- 介绍一个你影响最深的项目
- 介绍你最热爱最擅长的专业领域
- 公司实习最大的收获是什么？
- 与上级意见不一致时，你将怎么办？
- 自己的优点和缺点是什么？并举例说明？
- 你的学习方法是什么样的？实习过程中如何学习？实习项目中遇到的最大困难是什么以及如何解决的？
- 说一件最能证明你能力的事情
- 针对你你申请的这个职位，你认为你还欠缺什么
- 如果通过这次面试我们单位录用了你，但工作一段时间却发现你根本不适合这个职位，你怎么办？
- 项目中遇到最大的困难是什么？如何解决的？
- 你的职业规划以及个人目标、未来发展路线及求职定位
- 如果你在这次面试中没有被录用，你怎么打算？
- 评价下自己，评价下自己的技术水平，个人代码量如何？
- 通过哪些渠道了解的招聘信息，其他同学都投了哪些公司？
- 业余都有哪些爱好？
- 你做过的哪件事最令自己感到骄傲？
- 假如你晚上要去送一个出国的同学去机场，可单位临时有事非你办不可，你怎么办？
- 就你申请的这个职位，你认为你还欠缺什么？
- 当前的offer状况；如果BATH都给了offer该如何选？
- 你对一份工作更看重哪些方面？平台，技术，氛围，城市，还是money？
- 理想薪资范围；杭州岗和北京岗选哪个？
- 理想中的工作环境是什么？
- 谈谈你对跳槽的看法
- 说说你对行业、技术发展趋势的看法
- 实习过程中周围同事/同学有哪些值得学习的地方？
- 家人对你的工作期望及自己的工作期望
- 如果你的工作出现失误，给本公司造成经济损失，你认为该怎么办？
- 若上司在公开会议上误会你了，该如何解决？
- 是否可以实习，可以实习多久？
- 在五年的时间内，你的职业规划
- 你看中公司的什么？或者公司的那些方面最吸引你？

# 引用声明：
本文参考相关博文如下：  

[阿里、腾讯、百度、华为、京东、搜狗和滴滴最新面试题汇集][15]  
[2017下半年，一二线互联网公司Android面试题汇总][16]  
[2017 年初、阿里、腾讯、百度、华为、京东、搜狗和滴滴面试题汇集（更新篇）][17]  
[android_interview][18]  
[AndroidInterview-Q-A][19]

# 相关文章：
[面试经验】那些年面试遇到的“坑”][20]  
[老程序员的10条中肯建议][21]  
[一个十几年程序员给所有新老程序员的忠告][22]




[1]: https://www.jianshu.com/p/c70989bd5f29
[2]: http://p540p6o2l.bkt.clouddn.com/interview-bat.png
[3]: https://github.com/AweiLoveAndroid/CommonDevKnowledge
[4]: http://alexyyek.github.io/2015/04/06/Collection/
[5]: http://www.iteye.com/topic/806990
[6]: http://ifeve.com/java-memory-model-0/
[7]: https://www.jianshu.com/p/c70989bd5f29
[8]: http://blog.csdn.net/vking_wang/article/details/9952063
[9]: http://wiki.jikexueyuan.com/project/java-concurrent/locks-in-java.html
[10]: http://www.cnblogs.com/dolphin0520/p/3920357.html
[11]: http://blog.51cto.com/lavasoft/27069
[12]: https://www.jianshu.com/p/053943a425c3#
[13]: http://www.cnblogs.com/chenssy/p/4701027.html
[14]: http://www.infoq.com/cn/articles/ConcurrentHashMap#
[15]: https://mp.weixin.qq.com/s?__biz=MzIyMjQ0MTU0NA==&mid=2247484617&idx=1&sn=3734e643d241ac9615424dd44462ee2d&chksm=e82c3deedf5bb4f82e7be0823739774a0a2cf8372284c8409471c2752fea1f367ca3f6857795&mpshare=1&scene=23&srcid=1128DKotEvTe4dheaTextbqp#rd
[16]: https://zhuanlan.zhihu.com/p/30016683
[17]: https://zhuanlan.zhihu.com/p/26327485
[18]: https://github.com/LRH1993/android_interview  
[19]: https://github.com/JackyAndroid/AndroidInterview-Q-A
[20]: https://www.jianshu.com/p/3ff11bada6a0
[21]: https://www.jianshu.com/p/76daf0ea966c
[22]: https://www.jianshu.com/p/57fd54974d71


