---
title: Android面试题——依赖注入框架Hilt相关(1)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 91e771bf
date: 2025-09-13 09:49:35
---
## 一 概述

```
本文：
 -依赖注入框架 Hilt 
 -涵盖从基础到进阶的常见面试问题
```

<!--more-->

## 二 基础概念

### 2.1 什么是依赖注入(Dependency Injection, DI)？为什么要用DI？

```
-定义：由外部提供对象依赖，而不是在类内部直接创建。
-好处：解耦、方便测试、模块复用、利于架构清晰。
```

### 2.2 Hilt 是什么？和 Dagger 的关系是什么？

```
-Hilt 是基于 Dagger 的官方依赖注入框架，简化了 Dagger 在 Android 的使用。
-Hilt 自动集成 Android 生命周期组件（Application、Activity、Fragment、ViewModel 等）。
```

### 2.3 为什么 Hilt 推荐替代 Dagger？

```
-简化配置：注解更少。
-官方支持：和 Jetpack 体系深度整合。
-生命周期感知：作用域与 Android 组件生命周期自动绑定
```

## 三 核心注解与作用域

### 3.1 @HiltAndroidApp 有什么作用？

```
-标记 Application，生成基础依赖容器。
-触发 Hilt 代码生成，创建 ApplicationComponent
```

### 3.2 @AndroidEntryPoint 的作用？在哪些类上使用？

```
-作用：为 Android 组件（Activity、Fragment、Service、View 等）提供依赖注入入口。
-使用场景：Activity、Fragment、Service、BroadcastReceiver、View
```

### 3.3 Hilt 提供的作用域有哪些？对应生命周期是什么？

```
-@Singleton → Application 全局单例。
-@ActivityScoped → Activity 生命周期内。
-@FragmentScoped → Fragment 生命周期内。
-@ViewModelScoped → ViewModel 生命周期内。
-@ServiceScoped → Service 生命周期内。
```

### 3.4 @Inject 和 @Provides 有什么区别？

```
-@Inject：用于构造函数或字段，Hilt 自动提供依赖。
-@Provides：在 @Module 中手动提供依赖，适合第三方库或无法修改源码的类。
```

### 3.5 @Binds 和 @Provides 的区别？

```
-Binds：抽象方法，绑定接口到实现（更高效）。
-@Provides：具体方法，适合复杂逻辑创建对象。
```

## 四 进阶问题

### 4.1 Hilt 中 ViewModel 如何注入依赖？

```
-使用 @HiltViewModel 注解。
-在构造函数中使用 @Inject。
-在 UI 层通过 by viewModels() 或 hiltViewModel() 获取。
```

### 4.2 Hilt 如何与 Jetpack Compose 一起使用？

```
-使用 hiltViewModel() 获取注入过依赖的 ViewModel。
-Hilt 自动管理依赖生命周期。
```

### 4.3 Hilt 中如何注入第三方库(如 Retrofit、OkHttp)？

```
-使用 @Module + @Provides 提供 Retrofit/OkHttp 实例。
-作用域通常标记为 @Singleton。
```

### 4.4 Hilt 与传统的 Dagger2 相比，缺点是什么？

```
-灵活性不如 Dagger2（不支持自定义 Component）。
-编译期生成的代码复杂度高，调试难度大。
-与部分旧架构不兼容。
```

### 4.5 多模块工程如何使用 Hilt？

```
-在 base module 中声明 @HiltAndroidApp Application。
-其他 module 提供 @Module 依赖。
-可以使用 @InstallIn(SingletonComponent::class) 来安装到全局作用域
```

## 五 常见报错与解决

### 5.1 出现 “canonicalName()” 报错，原因是什么？

```
1、错误现象
出现 “java.lang.String com.squareup.javapoet.ClassName.canonicalName()” 报错，原因是什么？

2、说明
Hilt 与 javapoet 版本不兼容。
解决：升级 Hilt 版本，保证与 ksp/kapt、agp 版本匹配。
```

### 5.2 运行时报错Default Activity not found，可能是什么原因？

```
-@AndroidEntryPoint 未加在 Activity 上。
-Manifest 未正确声明 Application (@HiltAndroidApp)
```

### 5.3 为什么在 Fragment 使用 ViewModel 时，需要用 by viewModels() 而不是直接 @Inject？

```
-ViewModel 需要 ViewModelProvider 托管，不能直接通过字段注入。
-必须用 Hilt 生成的 HiltViewModelFactory
```

## 六 开放性问题

### 6.1 如何在 Hilt 中实现不同环境的依赖切换(如测试环境/生产环境)？

```
-使用 @Qualifier 自定义注解区分依赖。
-通过不同的 Module 提供不同实现。
```

### 6.2 Hilt 在单元测试/仪器测试中的使用方法？

```
-使用 HiltAndroidRule 初始化依赖。
-通过 @TestInstallIn 替换原始 Module。
-使用 @UninstallModules 移除不需要的依赖。
```

### 6.3 如果一个项目不使用 Hilt，而是用 Koin/Dagger，会有什么区别？

```
Hilt：编译期依赖注入，性能好，官方支持。

Koin：运行时依赖注入，配置简单，灵活度高。

Dagger2：更灵活，但需要大量模板代码。
```

