---
title: Android面试题——依赖注入框架Dagger2相关(1)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 5b49317c
date: 2025-09-14 08:11:14
---
## 一 概述

```
本文：
 -依赖注入框架 Dagger2 相关专题
 -包含基础、原理、实践和常见问题
```

<!--more-->

## 二 基础概念

### 2.1什么是依赖注入 (DI)？

```
依赖注入是一种设计模式，将对象依赖的创建与使用解耦。

传统写法中对象自己通过 new 创建依赖，
而依赖注入则由外部容器提供依赖，使代码更清晰、可复用、易测试
```

### 2.2 Dagger2 是什么？

```
1、Dagger2
Dagger2 是 Google 推出的 编译期依赖注入框架，基于 JSR-330 标准。
它通过 APT（注解处理器）在编译期生成依赖注入代码，避免了运行时反射，提高性能和安全性。

2、与 Hilt 的关系：
Hilt 是 Google 在 Dagger2 基础上针对 Android 开发场景封装的框架，更易用
```

### 2.3 Dagger2 解决了什么问题？

```
-依赖解耦：对象只声明依赖，不关心如何创建。
-可测试性：可替换依赖，方便单元测试。
-生命周期管理：作用域注解帮助复用对象。
```

## 三 核心注解

### 3.1 @Inject

```
-用途：声明依赖注入点（构造函数、字段、方法）。
-构造函数注入：适合自己可控的类。
-字段注入：常用于 Activity/Fragment 注入成员变量
```

### 3.2 @Module 与 @Provides

```
-Module：告诉 Dagger 如何提供某些依赖。
-@Provides：提供第三方库或无法直接构造的对象。
-取舍：能用 @Inject 构造函数就优先用，否则写在 @Module 里。
```

### 3.3 @Component

```
-作用：连接依赖需求方和依赖提供方。
-生成的代码：Dagger 会自动生成 DaggerXXXComponent 类。
-依赖注入过程：Component 扫描依赖图，把需要的对象注入目标类
```

### 3.4 @Singleton、@Scope

```
-@Scope：定义依赖的生命周期范围。
-@Singleton：全局单例，App 生命周期内共用一份实例。
-自定义 Scope：如 @ActivityScope，保证 Activity 生命周期内对象唯一。
```

### 3.5 @Binds

```
-用于接口绑定实现，避免写 @Provides。
-优点：更简洁，性能更好。
-用法：必须是 abstract 方法，返回接口，参数是实现类
```

## 四 工作原理

### 4.1 Dagger2 编译期生成代码的原理？

```
Dagger2 使用注解处理器 (APT) 扫描 @Inject、@Module、@Component，
在编译期生成工厂类和依赖图代码。

相比 Guice 的反射方式，性能更高且错误能在编译时报出
```

### 4.2 依赖图 (Dependency Graph) 是什么？

```
依赖图是一张描述对象依赖关系的有向图。
Dagger2 会自动解析依赖关系，找到路径并生成代码完成注入。

如果出现循环依赖，Dagger2 会在编译时报错。
```

### 4.3  编译期校验的好处？

```
编译时能发现依赖缺失、作用域冲突等问题，避免运行时崩溃。

示例报错
com.example.Car cannot be provided without an @Inject constructor 
or an @Provides-annotated method.
```

## 五 实践与应用

### 5.1 构造函数注入 vs Module 提供依赖

```
-构造函数注入：适用于可直接创建的类。
-Module：适用于第三方库（如 Retrofit、Room）或不能修改源码的类。
```

### 5.2 多 Module 工程如何组织 Dagger2？

```
-AppComponent：顶级全局依赖。
-Subcomponent：继承父依赖，用于 Activity/Fragment。
-Component dependencies：跨模块依赖共享。
```

### 5.3 Android 中的应用场景

```
-在 Activity/Fragment 中注入 ViewModel、Repository。
-提供 Retrofit、OkHttp、Room 数据库依赖。
-作用域控制 Presenter、UseCase 的生命周期。
```

### 5.4 Dagger Android / Hilt 与 Dagger2 的关系

```
1、Dagger Android：
Google 为简化 Android 注入推出的扩展，但使用复杂。

2、Hilt：
基于 Dagger2 的完整封装，
自动生成 Application/Activity/Fragment 的注入入口，更推荐新项目使用。
```

## 六 常见问题

### 6.1  循环依赖如何解决？

```
-使用 @Lazy<T>：延迟初始化依赖。
-使用 Provider<T>：每次获取新实例，避免强依赖循环。
```

### 6.2 常见报错

```
1、缺少构造函数或 Provides 方法
XXX cannot be provided without an @Inject constructor or an @Provides method

2、作用域冲突
@Singleton scoped cannot depend on @ActivityScope
```

### 6.3 Dagger2 与 Hilt 的区别

```
-Dagger2 灵活、可高度自定义，但模板代码多。
-Hilt 简化了注入流程（默认支持 Application、Activity、Fragment 等）。
-Hilt 适合快速开发，Dagger2 适合复杂灵活场景。
```

### 6.4 性能方面

```
Dagger2 在编译期生成代码，避免运行时反射。
运行时只调用普通 Java 方法，性能几乎无损。
```

## 七  代码示例

```
// 依赖类
class Engine @Inject constructor()

class Car @Inject constructor(val engine: Engine)

// 提供第三方依赖
@Module
class NetworkModule {
    @Provides
    fun provideRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl("https://api.xxx.com")
            .build()
    }
}

// 组件
@Singleton
@Component(modules = [NetworkModule::class])
interface AppComponent {
    fun inject(app: MyApplication)
    fun inject(activity: MainActivity)
}
```

