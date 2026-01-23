---
title: Android开发之——开发中常用的依赖注入框架(1)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 7a41e786
date: 2025-09-12 08:52:43
---
## 一 概述

```
本文介绍：
 -依赖注入(Dependency Injection, DI)是解耦、提高可测试性和可维护性的常用手段
 -常见的依赖注入框架:Hilt、Dagger2、Koin、Kodein-DI、Toothpick、Anvil
```

<!--more-->

## 二 常见的依赖注入框架

### 2.1 Hilt(基于 Dagger 的官方 DI 框架)

```
1、地址
https://developer.android.google.cn/training/dependency-injection/hilt-android

2、介绍
-Google 官方推出，基于 Dagger2 简化封装。
-与 Android 生命周期(Application、Activity、Fragment、ViewModel、WorkManager 等)深度集成
-代码简洁，适合大多数项目。
-官方持续维护，生态完善

3、场景
中大型项目、希望用官方方案、结合 Jetpack 组件
```

### 2.2 Dagger2(基于 Dagger 的传统方案)

```
1、地址
https://developer.android.google.cn/training/dependency-injection/dagger-android

2、介绍
-Google 支持的编译时依赖注入框架。
-无运行时开销，编译时生成代码，性能好。
-学习曲线陡峭，配置复杂。


3、场景
大规模项目，强性能要求，对框架掌控力要求高
```

### 2.3 Koin( Kotlin 优化方案)

```
1、地址
https://github.com/InsertKoinIO/koin

2、介绍
轻量级 Kotlin DSL 编写，无需注解处理器。
配置简单，语法直观，学习成本低。
基于运行时反射，性能略逊于 Hilt/Dagger。

3、场景
Kotlin 项目、快速开发、小中型项目
```

### 2.4 Kodein-DI

```
1、地址
https://github.com/kosi-libs/Kodein

2、介绍
Kotlin 编写的 DI 库，和 Koin 类似，但更灵活。

3、场景
需要跨平台（Kotlin Multiplatform）、模块化项目
```

### 2.4 Toothpick(最近更新：4年前)

```
1、地址
https://github.com/stephanenicolas/toothpick

2、介绍
轻量级，基于 Scope 的依赖注入框架

3、场景
小中型项目、对 Scope 管理有需求
```

### 2.6 Anvil

```
1、地址
https://github.com/anvil-ui/anvil

2、介绍
Square 开源的 Dagger 增强工具，减少模板代码

3、场景
已使用 Dagger/Hilt 项目，想减少模板代码
```

## 三 常用依赖注入框架对比

|    框架    |                         简介                          |                      优点                      |                  缺点                  |                    适用场景                    |
| :--------: | :---------------------------------------------------: | :--------------------------------------------: | :------------------------------------: | :--------------------------------------------: |
| Hilt(官方) | Google 官方基于 Dagger2 的封装，深度集成 Jetpack 组件 | 官方支持、生命周期自动管理、配置简单、生态完善 |    灵活性略逊 Dagger2、编译速度较慢    |       中大型项目、长期维护、官方方案优先       |
|  Dagger2   |              编译时依赖注入框架，性能强               |     无运行时开销、性能高、适合大型复杂项目     |   学习曲线陡峭、样板代码多、配置繁琐   |     大型项目、性能敏感场景、需要细粒度控制     |
|    Koin    |              Kotlin 原生 DSL，运行时注入              |    语法直观、配置简单、无注解处理器、开发快    | 基于运行时反射，性能略逊、缺乏官方支持 |       Kotlin 项目、小中型项目、快速迭代        |
| Kodein-DI  |       Kotlin 编写的灵活 DI 库，比 Koin 更模块化       |  轻量级、无注解处理器、支持多平台、灵活可扩展  |  社区热度不及 Hilt/Koin、学习成本略高  | 需要跨平台（Kotlin Multiplatform）、模块化项目 |
| Toothpick  |            基于 Scope 概念的轻量级 DI 框架            |   学习简单、支持作用域(Scope)控制、代码简洁    |        社区活跃度一般、生态有限        |        小中型项目、对 Scope 管理有需求         |
|   Anvil    |      Square 出品，Dagger 增强工具，减少样板代码       | 简化 Dagger 配置、自动生成绑定代码、兼容 Hilt  |    依赖 Dagger，本身非独立 DI 框架     |    已使用 Dagger/Hilt 项目，想减少模板代码     |

## 四 总结

```
-Hilt：首选官方方案，长期维护 & 新项目推荐。
-Dagger2：性能最佳，适合超大型或高性能项目。
-Koin：开发效率高，适合中小型 Kotlin 项目。
-Kodein-DI：更灵活，适合跨平台或模块化场景。
-Toothpick：想要轻量 + Scope 管理的项目。
-Anvil：增强 Dagger/Hilt 项目，减少样板代码。
```

