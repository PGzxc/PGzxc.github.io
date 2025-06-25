---
title: Android面试题——常见面试题2
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 2e6493f5
date: 2025-04-09 16:03:56
---
## 一 概述

* 请描述一次你遇到的最棘手的Bug，比如一个难以复现的ANR、内存泄漏或者多线程问题。你是如何定位、分析和解决它的？在这个过程中你学到了什么新知识或新工具？
* gson、fastjson开发中会有什么问题，有什么替代方案<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 请描述一次你遇到的最棘手的Bug

1、ANR

```
我遇到过一个难以复现的 ANR（应用无响应） 问题，用户反馈偶尔启动应用时卡顿，界面无响应。

1、定位与分析过程：
-收集用户设备的 ANR traces.txt 日志，发现主线程被一个耗时的同步操作阻塞；
-结合代码审查，发现启动时进行大量文件读写和数据库初始化，且操作在主线程执行；
-使用 StrictMode 监测主线程耗时操作，确认问题点。

2、解决方法：
-将启动耗时操作全部迁移到子线程异步执行，避免阻塞 UI 线程；
-使用异步初始化和懒加载优化启动流程；
-增加超时机制和线程间通信，保证主线程流畅。

3、学到的新知识/工具：
-熟练使用 ANR traces 分析工具；
-掌握了 StrictMode、Systrace 等调试工具；
-理解了 Android 主线程调度和异步编程的重要性。

这个经历让我深刻认识到：即使偶发的 ANR 也会极大影响用户体验，必须用系统工具结合代码逻辑彻底排查。
```

2、内存泄漏

```
我曾遇到一个严重的 内存泄漏问题，应用长时间使用后出现卡顿甚至崩溃，内存占用不断上升且无法释放。

1、定位与分析过程：
-使用 Android Profiler 分析内存，发现 Activity 实例未被回收；
-通过 LeakCanary 报告发现：匿名内部类中持有 Activity 的引用，导致 GC 无法回收；
-查看代码，发现某个单例工具类注册了 Context，但未解绑监听器或释放引用。

2、解决方法：
-将匿名内部类改为静态类 + WeakReference<Context>；
-使用 ApplicationContext 替代 ActivityContext；
-所有注册的监听器在合适生命周期中注销，防止泄漏。

3、学到的新知识/工具：
-掌握了 LeakCanary 内存检测流程；
-学会使用 MAT/Android Studio Profiler 分析对象引用链；
-深刻理解了 Context 分类与生命周期管理。

这个问题让我意识到：内存泄漏更多源于细节疏忽，应重视生命周期管理和工具辅助分析。
```

3、多线程问题

```
我曾遇到一个棘手的 多线程并发问题：偶尔出现数据错乱和崩溃，发生在多个线程同时操作同一个集合对象时。

1、定位与分析过程：
-通过崩溃日志发现异常为 ConcurrentModificationException；
-结合代码分析，发现多个线程同时操作一个 ArrayList，而未做任何同步控制；
-使用日志打印和断点调试，确认了线程并发操作时集合被修改。

2、解决方法：
-将 ArrayList 替换为线程安全的 CopyOnWriteArrayList；
-部分场景使用 synchronized 块保护关键代码；
-对写操作集中调度到单线程中执行，避免读写冲突。

3、学到的新知识/工具：
-理解了 Java 集合类的线程安全性；
-熟悉了 ConcurrentHashMap、CopyOnWriteArrayList 等并发工具；
-学会用 Thread dump、日志分析和可复现测试代码 还原并发场景。

这个问题让我深刻认识到：多线程问题难以复现，但影响极大，设计之初就要考虑线程安全。
```

### 2.2 gson、fastjson开发中会有什么问题，有什么替代方案

```
在开发中使用 Gson 和 Fastjson 时，可能会遇到以下问题及相应替代方案：

一、Gson 的常见问题
1.1 性能问题
-Gson 的序列化 / 反序列化速度较慢，尤其在处理大量数据时性能不如其他库。
1.2 复杂泛型支持不足
-处理嵌套泛型类型时需要额外编写TypeToken，代码冗长且易出错。
1.3 字段命名策略限制
-自定义字段命名策略（如蛇形转驼峰）的配置不够灵活。

二、Fastjson 的常见问题
2.1 安全漏洞频发
-Fastjson 历史上存在多个严重的反序列化漏洞（如 RCE），需频繁升级版本且依赖严格的配置。
2.2 兼容性问题
-不同版本的 Fastjson 对某些特殊类型（如java.time包）的处理存在差异，导致兼容性问题。
2.3 序列化行为不可控
-默认序列化策略可能不符合预期（如忽略空字段），需手动配置。

三、替代方案
3.1 Jackson
优势：性能优异，社区活跃，支持多种数据格式（JSON、XML、YAML 等），提供丰富的注解和自定义配置。
适用场景：企业级应用、需要高性能和安全性的场景。
示例代码：

import com.fasterxml.jackson.databind.ObjectMapper;

public class JacksonExample {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        // 序列化
        String json = mapper.writeValueAsString(new User("John", 30));
        // 反序列化
        User user = mapper.readValue(json, User.class);
    }
}

3.2 Moshi
优势：轻量级，Kotlin 友好，支持代码生成（通过@JsonClass注解），减少运行时反射开销。
适用场景：Android 开发、Kotlin 项目。
示例代码：

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory

val moshi = Moshi.Builder()
    .add(KotlinJsonAdapterFactory())
    .build()
val jsonAdapter = moshi.adapter(User::class.java)
val user = jsonAdapter.fromJson(json)

3.3 Kotlinx.serialization
优势：Kotlin 官方库，编译时生成序列化代码，无需反射，性能高且安全。
适用场景：纯 Kotlin 项目，尤其是需要跨平台（如 Kotlin Multiplatform）的场景。
示例代码：
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class User(val name: String, val age: Int)

val user = Json.decodeFromString<User>(json)

3.4 Jsonb (JSR 367)
优势：Java EE 标准库，提供简单 API，与 JPA 等 Java 生态无缝集成。
适用场景：Java EE 项目、需要标准规范的场景。
示例代码：

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

public class JsonbExample {
    public static void main(String[] args) {
        Jsonb jsonb = JsonbBuilder.create();
        User user = jsonb.fromJson(json, User.class);
    }
}

四、总结
-性能优先：Jackson、Moshi。
-安全优先：Jackson、Kotlinx.serialization。
-Kotlin 项目：Moshi、Kotlinx.serialization。
-Java EE 项目：Jsonb。

根据具体场景选择合适的库，并注意版本更新以避免已知漏洞。
```

