---
title: Android面试题——网友分享(1)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: ad40e643
date: 2025-08-27 08:33:41
---
## 一 概述

```
来源：网页提供的某米——移动开发二面
题目：
 1.retrofit源码分析
 2.LeakCanary核心原理 源码浅析
 3.LruCache使用及原理
 4.ARouter原理
 5.注解框架实现原理
 6.Android如何编写基于编译时注解的项目
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 retrofit源码分析

```
1、原理：
 Retrofit 本质是 动态代理 + 注解解析 + OkHttp 请求。
 使用create(Service.class)时，Retrofit会通过动态代理(Proxy.newProxyInstance)拦截接口方法调用。
 注解如 @GET、@POST 由 ServiceMethod 解析成 请求信息（url、参数、headers 等）。
 最终由 OkHttp Call 执行网络请求，并通过 CallAdapter（如 RxJava、协程适配器）返回不同形式的结果。

2、面试答法：
 Retrofit 核心是通过 动态代理拦截接口方法，
 将方法上的注解解析为网络请求信息，
 然后交给 OkHttp 执行请求，
 再通过 Converter(GsonConverter、Moshi 等)进行数据解析，最终返回对应数据模型
```

### 2.2 LeakCanary核心原理 源码浅析

```
1、LeakCanary 是 内存泄漏检测框架。

2、核心原理是：
 监听 Activity/Fragment 生命周期，在销毁时将对象用 弱引用 WeakReference 保存到 ReferenceQueue。
 触发 GC 后，如果对象仍未被回收，说明有泄漏。
 使用 HeapDump (hprof) + Shark 库进行内存快照分析，找出泄漏链路。

3、面试答法：
 LeakCanary 通过在对象销毁时，利用 弱引用 + ReferenceQueue 检测对象是否被回收；
 若未回收则触发 内存快照分析，结合 GC Root 路径，找出内存泄漏的引用链
```

### 2.3 LruCache使用及原理

```
1、原理：
 LruCache 是 内存缓存工具，采用 最近最少使用 (Least Recently Used, LRU) 策略。
 内部使用 LinkedHashMap（accessOrder = true）维护缓存。
 put/get 会调整访问顺序，超出 maxSize 时自动移除最久未使用的数据。

2、面试答法：
 LruCache 使用 LinkedHashMap 实现，支持 O(1) 插入和查询，缓存淘汰策略是 LRU。
 常用于 图片缓存、数据缓存，避免 OOM。
```

### 2.4 ARouter原理

```
1、原理：
 阿里巴巴出品的 路由框架。

 运行时不再使用 Class.forName()，
 而是通过 APT（注解处理器）在编译期生成路由表（每个路径映射到具体的 Activity/Service）。

 启动时加载路由表到内存，调用 ARouter.navigate("/xxx/xxx") 即可找到对应目标类并执行跳转。

2、面试答法：
 ARouter 的核心是 编译期注解生成路由表，运行时直接查找路由表，避免反射，提高性能。
 支持页面跳转、依赖注入、模块解耦。
```

### 2.5 注解框架实现原理

```
1、原理：( 分为两种：)
 运行时注解：通过 反射（如 ButterKnife 早期版本）实现。
 编译时注解：通过APT+JavaPoet 生成辅助类，避免运行时开销（如 Dagger2、ARouter、ButterKnife 新版本）。

2、面试答法：
 注解框架要么通过 反射扫描注解（运行时注解），要么通过 APT 在编译期生成辅助代码（编译时注解），
 推荐后者性能更优。
```

### 2.6 Android如何编写基于编译时注解的项目

```
1、步骤：
 创建 annotation 模块：定义注解类，如 @BindView、@Route。
 创建 compiler 模块：实现 AbstractProcessor，在 process() 中扫描注解元素。
 使用 JavaPoet/KotlinPoet 动态生成 Java/Kotlin 源文件（如 MainActivity_ViewBinding）。
 在 app 中 引入 annotation + compiler，通过 kapt/annotationProcessor 处理注解。
 在运行时直接调用生成的类（而不是反射）。

2、简答版：
 基于编译时注解的实现步骤是：
 定义注解 → 实现注解处理器 → 使用 APT 生成辅助代码 → 在项目中调用生成类，常见工具是 JavaPoet。
```

## 三 面试官可能会追问

```
1、Retrofit 为何不用反射直接执行网络请求？（答：需要统一解析注解 + 灵活扩展 CallAdapter/Converter）
2、LeakCanary 如何避免误报？（答：多次 GC 检测 + 队列确认）
3、LruCache 和 DiskLruCache 区别？（答：前者内存缓存，后者磁盘缓存）
4、ARouter 如何避免路由表过大？（答：分组加载，懒加载方式）
5、编译时注解和运行时注解性能差异？（答：编译时生成类，避免运行时反射，性能更优）
```

