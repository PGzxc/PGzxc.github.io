---
title: Android面试题——掘金-JetPack之dagger2(3.4)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: ea2c8105
date: 2025-04-06 10:20:06
---
## 一 概述

```
Dagger 2 是 Google 官方推荐的 依赖注入框架，可以提高代码的可维护性、模块化和测试性。
在 Android 开发中，Dagger 2 主要用于 管理对象依赖，避免手动创建对象，提高代码的解耦性
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 Dagger 2？它的作用是什么？

```
1.概念
Dagger 2 是 依赖注入（Dependency Injection，简称 DI） 框架，
基于 JSR-330 规范（@Inject、@Singleton等注解）开发。

2.作用
✅ 自动管理依赖对象的创建和注入
✅ 提高代码复用性、解耦性和可测试性
✅ 性能优秀，采用 APT（Annotation Processing Tool）生成代码
```

### 2.2 Dagger 2 的核心组件有哪些？

|    组件    |                  作用                   |
| :--------: | :-------------------------------------: |
|  @Inject   |            标注依赖的注入点             |
|  @Module   |           提供依赖对象的方法            |
| @Provides  |      在 Module 中标注依赖提供方法       |
| @Component | 桥接 `Module` 和 `Inject`，管理依赖注入 |
| @Singleton |         单例模式，全局唯一实例          |
|   @Binds   |          用于绑定接口和实现类           |

### 2.3 Dagger 2 基本使用流程？

```
1.创建依赖类
public class Engine {
    public Engine() {}
}

2.在 Module 中提供依赖
@Module
public class CarModule {
    @Provides
    Engine provideEngine() {
        return new Engine();
    }
}

3.创建 Component，连接 Module 和 Inject
@Component(modules = CarModule.class)
public interface CarComponent {
    void inject(MainActivity activity);
}

4.在 Activity 注入对象
public class MainActivity extends AppCompatActivity {
    @Inject Engine engine;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        DaggerCarComponent.create().inject(this);
        Log.d("Dagger", "引擎已创建：" + engine);
    }
}
```

### 2.4 @Inject 的作用是什么？

```
@Inject 用于声明可以被 Dagger 2 管理的依赖对象，支持两种用法：

1.构造函数注入
public class Engine {
    @Inject
    public Engine() {}
}

2.字段注入
public class Car {
    @Inject Engine engine;
}
```

### 2.5 @Module 和 @Provides 的作用？

1-对比

|   注解    |               作用               |
| :-------: | :------------------------------: |
|  @Module  |         提供依赖对象的类         |
| @Provides | 在 `Module` 中定义创建依赖的方法 |

2-示例：提供 `Engine` 依赖

```
@Module
public class CarModule {
    @Provides
    Engine provideEngine() {
        return new Engine();
    }
}
```

### 2.6 @Component 的作用是什么？

```
1.概念
@Component 用于连接 @Module 和 @Inject，管理依赖注入。

2.示例
@Component(modules = CarModule.class)
public interface CarComponent {
    void inject(MainActivity activity);
}
使用 DaggerCarComponent.create().inject(this); 进行依赖注入。
```

### 2.7 @Singleton 的作用是什么？

```
1.概念
@Singleton 用于创建单例对象，必须在 Module 和 Component 同时使用

2.示例
@Singleton
@Component(modules = CarModule.class)
public interface CarComponent {
    void inject(MainActivity activity);
}
@Module
public class CarModule {
    @Singleton
    @Provides
    Engine provideEngine() {
        return new Engine();
    }
}
```

### 2.8 @Binds 和 @Provides 的区别？

1-对比

|   注解    |       作用       | 适用场景 |
| :-------: | :--------------: | :------: |
| @Provides |   返回具体实例   | 普通方法 |
|  @Binds   | 绑定接口和实现类 | 抽象方法 |

2-示例

```
@Module
public abstract class CarModule {
    @Binds
    abstract Engine bindEngine(PetrolEngine engine);
}
```

### 2.9 Dagger 2 如何在 Android 中全局使用？

```
1.创建 Application 级 Component
@Singleton
@Component(modules = AppModule.class)
public interface AppComponent {
    void inject(MyApplication application);
}

2.在 Application 进行依赖注入
public class MyApplication extends Application {
    public static AppComponent appComponent;

    @Override
    public void onCreate() {
        super.onCreate();
        appComponent = DaggerAppComponent.create();
        appComponent.inject(this);
    }
}

3.在 Activity 直接使用
MyApplication.appComponent.inject(this);
```

### 2.10 Dagger 2 和 Hilt 的区别？

1-对比

|   对比项   |        Dagger 2        |           Hilt           |
| :--------: | :--------------------: | :----------------------: |
| 代码复杂度 | 复杂，需手写 Component | 简单，自动生成 Component |
|  依赖管理  |  需要手动创建 Module   |     自动管理 Module      |
|  适用场景  |     适用于复杂项目     |   适用于 Android 开发    |

2.Hilt示例

```
@HiltAndroidApp
public class MyApplication extends Application {}

@AndroidEntryPoint
public class MainActivity extends AppCompatActivity {
    @Inject Engine engine;
}
```

### 2.11 总结-Dagger 2 核心知识点

```
-Dagger 2 主要用于依赖注入，提高代码解耦
-@Inject：声明依赖对象
-@Module + @Provides：提供依赖
-@Component：管理依赖注入
-@Singleton：单例模式
-@Binds 绑定接口，@Provides 提供实例
-Dagger 2 适用于复杂项目，Hilt 更适用于 Android
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)