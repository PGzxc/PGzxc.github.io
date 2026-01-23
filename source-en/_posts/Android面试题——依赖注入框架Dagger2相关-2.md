---
title: Android面试题——依赖注入框架Dagger2相关(2)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 706462bf
date: 2025-09-14 08:11:47
---
## 一 概述

```
本文：
 -依赖注入框架 Dagger2 相关专题
 -包含基础、原理、实践和常见问题
 -Dagger2面试题整理为分难度(初级/中级/高级)
```

<!--more-->

## 二 初级(基础使用 & 概念)

### 2.1 什么是依赖注入 (DI)？它解决了什么问题？

```
依赖注入是一种设计模式，外部容器负责创建依赖并注入使用方，
避免类内部直接 new，实现 解耦、可测试性、复用性
```

### 2.2 Dagger2 是什么？为什么要用它？

```
Dagger2 是 Google 推出的编译期依赖注入框架，
基于注解生成代码，避免运行时反射，性能更好，错误能在编译时报出
```

### 2.3 Dagger2 常用注解有哪些？

```
-@Inject：声明依赖注入点
-@Module：模块，提供依赖
-@Provides：在模块中提供对象
-@Component：桥梁，连接需求和依赖
-@Singleton / @Scope：生命周期管理
-@Binds：接口与实现绑定
```

### 2.4 构造函数注入 vs Module 提供依赖？

```
-构造函数注入：适合可控类，直接 @Inject constructor()。
-Module + @Provides：适合第三方库或源码不可修改的类（如 Retrofit）
```

### 2.5 如何在 Activity 中使用 Dagger2 注入？

```
-在 Application 中初始化 AppComponent。
-在 AppComponent 里声明 fun inject(activity: MainActivity)。
-在 Activity 中字段加 @Inject lateinit var userRepository: UserRepository。
-调用 DaggerAppComponent.create().inject(this)。
```

## 三  中级(源码理解 & 工程实践)

### 3.1 Dagger2 是如何实现的？为什么比反射快？

```
Dagger2 通过 APT 注解处理器 在编译期生成工厂类（Factory、Component 实现），
避免运行时扫描类和反射调用，因此性能更好
```

### 3.2 什么是依赖图 (Dependency Graph)？

```
依赖图是一张有向图，描述对象之间的依赖关系。
Dagger2 在编译时生成依赖图，自动解析对象创建顺序。
若出现循环依赖会在编译时报错。
```

### 3.3 @Singleton 和自定义 @Scope 有什么区别？

```
-@Singleton：全局唯一实例，生命周期与 AppComponent 一致。
-自定义 @Scope（如 @ActivityScope）：限制对象在某个生命周期内唯一，避免内存浪费。
```

### 3.4 @Binds 和 @Provides 有什么区别？

```
1、概念
-@Provides：可写任意逻辑，返回实例。
-@Binds：只能用在抽象方法上，直接绑定接口和实现，性能更好。

2、示例
@Module
interface RepositoryModule {
    @Binds
    fun bindRepo(impl: RepoImpl): Repo
}
```

### 3.5 多 Module 工程如何组织 Dagger2？

```
-AppComponent：全局依赖
-Subcomponent：复用父依赖，适合 Activity / Fragment
-Component dependencies：跨模块共享依赖
```

### 3.6 Android 中 Dagger2 的常见应用场景？

```
-ViewModel 注入
-Repository、UseCase 注入
-Retrofit、Room 等第三方库依赖注入
-生命周期作用域管理
```

## 四 高级(问题排查 & 深度对比)

### 4.1 Dagger2 如何解决循环依赖？

```
-使用 Provider<T>：延迟提供依赖，每次获取新实例。
-使用 Lazy<T>：延迟初始化，避免提前创建。
```

### 4.2 常见 Dagger2 报错有哪些？

```
1、缺少依赖：
XXX cannot be provided without an @Inject constructor or @Provides method

2、作用域冲突：
@Singleton scoped cannot depend on @ActivityScope

3、解决：检查依赖图，调整作用域或使用 Provider
```

### 4.3 Dagger2 与 Hilt 的区别？

```
1、Dagger2：
灵活、可高度自定义，模板代码多，适合复杂架构。

2、Hilt：
基于 Dagger2 封装，
支持 Application/Activity/Fragment 默认注入点，省去模板代码，推荐新项目使用。
```

### 4.4 为什么 Google 推出了 Hilt，而不是继续用 Dagger2？

```
因为 Dagger2 在 Android 项目里需要写大量 Component、Module、inject()，
模板代码多，学习曲线陡峭；

Hilt 自动生成常用依赖注入入口，降低使用门槛，同时保持 Dagger2 的性能优势。
```

### 4.5 Dagger2 在性能上相比 Service Locator 有什么优势？

```
-Service Locator：运行时查找依赖，通常基于 Map 存储，效率低。
-Dagger2：编译期生成依赖工厂代码，运行时直接调用 Java 方法，几乎无性能损耗。
```

### 4.6 在大型项目中如何优化 Dagger2 架构？

```
-按功能模块拆分 Component 和 Module。
-使用 @Subcomponent 管理不同生命周期的依赖。
-使用接口隔离，提高可测试性。
-若团队新人多，可逐步迁移到 Hilt。
```

## 五 总结

```
-初级：掌握注解用法，能在项目里完成简单注入。
-中级：理解编译期代码生成原理，能在多 Module 项目中合理组织依赖。
-高级：能解决循环依赖、作用域冲突，熟悉 Hilt 对比，能在面试中举例说明性能优势。
```

