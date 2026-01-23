---
title: Android面试题——依赖注入框架Hilt相关(2)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: baca227c
date: 2025-09-13 09:50:41
---
## 一 概述

```
本文：
 -依赖注入框架 Hilt 
 -涵盖从基础到进阶的常见面试问题
```

<!--more-->

## 二 基础概念

### 2.1 Hilt 是什么？它解决了什么问题？

```
1、Hilt 是 Android 官方推出的依赖注入框架，基于 Dagger2 封装。

2、作用：
简化依赖注入的配置，
提供作用域管理(如 Application、Activity、Fragment、ViewModel 等)，让依赖关系更清晰、模块化。

3、好处：减少样板代码，自动管理依赖的生命周期，支持 Jetpack（尤其是 ViewModel、WorkManager）
```

### 2.2 Hilt 和 Dagger2 有什么区别？

```
1、Hilt 是 Dagger2 的上层封装，提供了 Android 专用注解和自动化集成。

2、Hilt 优势：
 -预定义了标准组件（Application、Activity、Fragment、ViewModel）。
 -自动集成 Android 生命周期。
 -代码更简洁（少写 @Component）。

3、Dagger2 灵活性更高，但需要手动编写 Component、Subcomponent。
```

### 2.3 Hilt 的常用注解有哪些？

```
1、入口注解：
-@HiltAndroidApp：标记 Application，生成 AppComponent。
-@AndroidEntryPoint：标记 Activity/Fragment/Service，用于注入依赖。

2、模块注解：
-@Module：提供依赖的类。
-@InstallIn：指定模块注入到哪个组件作用域。

3、提供依赖注解：
-@Provides：方法返回某个依赖。
-@Binds：接口绑定实现。

4、作用域注解：
-@Singleton、@ActivityScoped、@FragmentScoped、@ViewModelScoped。

5、构造注解：
-@Inject：标记构造函数或字段，告诉 Hilt 如何提供依赖。
```

### 2.4 Hilt 的作用域是怎么设计的？

```
-SingletonComponent：应用全局单例（Application 生命周期）。
-ActivityRetainedComponent：在配置更改（如旋转屏幕）后仍保留（常用于 ViewModel）。
-ViewModelComponent：依赖绑定到 ViewModel 生命周期。
-ActivityComponent：Activity 生命周期。
-FragmentComponent：Fragment 生命周期。
-ViewComponent / ViewWithFragmentComponent：视图级别。
-ServiceComponent：Service 生命周期。
```

## 三 进阶问题

### 3.1 Hilt 如何在 ViewModel 中使用依赖注入？

```
1、说明
-ViewModel 使用 @HiltViewModel 注解。
-构造函数参数通过 @Inject 注入。
-在 Activity/Fragment 中使用 by viewModels() 获取。

2、示例
@HiltViewModel
class MainViewModel @Inject constructor(
    private val repository: UserRepository
) : ViewModel()
```

### 3.2  Hilt 中 `@Provides` 和 `@Binds` 有什么区别？

```
1、说明
-@Provides：返回一个对象实例（可以有方法体，适合工厂/第三方库初始化）。
-@Binds：接口与实现的绑定（只能写抽象方法，性能更好）

2、示例
@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {
    @Binds
    abstract fun bindRepo(
        impl: UserRepositoryImpl
    ): UserRepository
}
```

### 3.3  Hilt 如何处理第三方库（无法修改源码时）？

```
1、说明
使用 @Provides 方法在 Module 里提供依赖，例如 Retrofit、OkHttp、RoomDatabase。

2、示例
@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides
    fun provideRetrofit(): Retrofit = Retrofit.Builder()
        .baseUrl("https://api.xxx.com")
        .build()
}
```

### 3.4  Hilt 和 Jetpack Compose 怎么配合？

```
1、说明
-Compose 无需 @AndroidEntryPoint 的 View。
-ViewModel 使用 hiltViewModel() 获取：

2、示例
@Composable
fun UserScreen(viewModel: UserViewModel = hiltViewModel()) {
    val state by viewModel.state.collectAsState()
    Text(state.username)
}
```

### 3.5  Hilt 是如何在编译期生成代码的？

```
-基于 Dagger2 的 AnnotationProcessor / KSP。
-在编译期生成 Component、Factory、Provider 等类，减少运行时开销。
-依赖关系错误会在编译期报错（比 Koin 这类运行时 DI 更安全）
```

### 3.6 Hilt 在多模块项目中如何使用？

```
-公共依赖（如网络库）放在 base module 的 SingletonComponent。
-feature module 里写自己的 @InstallIn 模块，注入到 Activity/Fragment。
-ViewModel 依赖可以分模块提供，通过 @Binds 绑定接口实现
```

## 四 实战与常见问题

### 4.1 Hilt 常见报错有哪些？

```
-没写 @HiltAndroidApp → 无法生成 AppComponent。
-忘记 @AndroidEntryPoint → 注入时报错。
-循环依赖 → 编译失败。
-ViewModel 不用 @HiltViewModel → hiltViewModel() 注入失败。
```

### 4.2  如果要在 Worker (WorkManager) 中使用 Hilt 怎么做？

```
使用 @HiltWorker 注解，并在构造函数中使用 @AssistedInject 注入依赖。
```

### 4.3 Hilt 是否支持多进程？

```
默认只支持单进程。多进程下需要额外配置（一般建议避免）
```

### 4.4 Hilt 和 Koin 对比？

```
-Hilt：编译期依赖注入，性能更好，错误更早发现，但学习曲线稍高。
-Koin：运行时注入，代码更灵活、简洁，但性能稍差，错误在运行时才发现。
```

### 4.5  Hilt 在实际项目中会遇到哪些挑战？

```
-多模块依赖管理复杂。
-第三方库适配。
-与 Compose 集成时要注意作用域（尤其是导航切换）。
```

