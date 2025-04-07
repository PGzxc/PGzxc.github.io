---
title: Android面试题——掘金-JetPack之LifeCycle(3.1)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 61d81fdd
date: 2025-04-06 10:17:05
---
## 一 概述

```
Lifecycle 是 Jetpack 提供的 生命周期感知组件，可以简化 组件生命周期管理，避免内存泄漏，提高代码可维护性。
面试高频考点主要包括 Lifecycle 的作用、核心类、状态管理、最佳实践 等。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1  什么是 Lifecycle？它的作用是什么？

```
1.概念
Lifecycle 是 Jetpack 生命周期管理组件，
用于 监听 Activity / Fragment 的生命周期状态，让组件感知生命周期变化。

2.作用
✅ 避免内存泄漏：组件（如 LiveData、ViewModel）可自动感知生命周期，避免手动管理。
✅ 简化代码：不用手动在 onResume()、onPause() 中注册 & 取消监听。
✅ 提高组件复用性：如 LifecycleObserver 可在多个 LifecycleOwner 之间共享
```

### 2.2 Lifecycle 主要包含哪些核心类？

|           类名           |                   作用                   |
| :----------------------: | :--------------------------------------: |
|      LifecycleOwner      |   生命周期所有者（Activity、Fragment）   |
|    LifecycleObserver     | 监听生命周期变化（如 LiveData、CameraX） |
|        Lifecycle         |             持有生命周期状态             |
| DefaultLifecycleObserver |       **推荐**的 LifecycleObserver       |
|  LifecycleEventObserver  |           监听具体生命周期事件           |

### 2.3 Lifecycle 组件是如何工作的？

```
工作流程
-Activity / Fragment 作为 LifecycleOwner
-LifecycleObserver 监听 Lifecycle 变化
-Lifecycle 触发事件（如 ON_START、ON_RESUME）
```

### 2.4 Lifecycle 的状态有哪些？

|    状态     |                   描述                    |
| :---------: | :---------------------------------------: |
| INITIALIZED |     **初始化**，但未进入 `onCreate()`     |
|   CREATED   |    Activity / Fragment 进入 onCreate()    |
|   STARTED   |          Activity 进入 onStart()          |
|   RESUMED   |   Activity 进入 onResume()（UI 可交互）   |
|  DESTROYED  | Activity 进入 onDestroy()（生命周期结束） |

### 2.5 如何让 Activity/Fragment 变成 LifecycleOwner？

```
在 AndroidX 之后，Activity 和 Fragment 默认实现了 LifecycleOwner，可以直接获取生命周期对象：
Lifecycle lifecycle = getLifecycle(); // 获取 Lifecycle 实例
```

### 2.6 如何创建 LifecycleObserver？

```
1.旧版写法（已废弃）
public class MyObserver implements LifecycleObserver {
    @OnLifecycleEvent(Lifecycle.Event.ON_START)
    public void onStart() {
        Log.d("MyObserver", "Activity 进入 onStart");
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
    public void onStop() {
        Log.d("MyObserver", "Activity 进入 onStop");
    }
}

2.新版写法（推荐使用 DefaultLifecycleObserver）
public class MyObserver implements DefaultLifecycleObserver {
    @Override
    public void onStart(@NonNull LifecycleOwner owner) {
        Log.d("MyObserver", "onStart 被调用");
    }

    @Override
    public void onStop(@NonNull LifecycleOwner owner) {
        Log.d("MyObserver", "onStop 被调用");
    }
}

3.使用 Observer
getLifecycle().addObserver(new MyObserver());
```

### 2.7 LifecycleObserver 和 DefaultLifecycleObserver 的区别？

| 对比项 |              LifecycleObserver              | DefaultLifecycleObserver（推荐） |
| :----: | :-----------------------------------------: | :------------------------------: |
|  写法  |          需要 `@OnLifecycleEvent`           |           直接重写方法           |
|  推荐  |              旧方式（已废弃）               |        AndroidX 推荐使用         |
|  示例  | @OnLifecycleEvent(Lifecycle.Event.ON_START) |  onStart(owner: LifecycleOwner)  |

### 2.8 LifecycleEventObserver 是什么？

```
LifecycleEventObserver 可监听 具体生命周期事件，比 DefaultLifecycleObserver 更灵活。

LifecycleEventObserver observer = (source, event) -> {
    if (event == Lifecycle.Event.ON_START) {
        Log.d("Lifecycle", "Activity 进入 onStart");
    }
};
getLifecycle().addObserver(observer);
```

### 2.9 Lifecycle 组件如何避免内存泄漏？

```
-Lifecycle自动管理组件生命周期，如ViewModel、LiveData绑定LifecycleOwner，Activity销毁时自动清理资源。
-避免手动注册/取消监听，如 onResume() → onPause() 监听 EventBus，使用 Lifecycle 自动管理更安全。
```

### 2.10 Lifecycle 在 Jetpack 组件中的应用？

```
1.ViewModel + Lifecycle
ViewModelProvider viewModelProvider = new ViewModelProvider(this);
MyViewModel viewModel = viewModelProvider.get(MyViewModel.class);

2.LiveData + Lifecycle
myLiveData.observe(this, data -> {
    textView.setText(data);
});

3.LifecycleScope（协程）
lifecycleScope.launch {
    delay(1000);
    Log.d("Lifecycle", "执行协程任务");
}
```

### 2.11  LifecycleScope 和 lifecycleScope.launchWhenStarted() 的区别？

|         方法          |              作用              |
| :-------------------: | :----------------------------: |
| lifecycleScope.launch | **创建协程**，绑定 `Lifecycle` |
|   launchWhenStarted   | 生命周期进入 `STARTED` 时执行  |

### 2.12 如何自定义 LifecycleOwner？

```
1.说明
可以实现 LifecycleOwner 接口，手动控制 Lifecycle

2.示例
public class MyLifecycleOwner implements LifecycleOwner {
    private LifecycleRegistry lifecycleRegistry = new LifecycleRegistry(this);

    public MyLifecycleOwner() {
        lifecycleRegistry.setCurrentState(Lifecycle.State.CREATED);
    }

    @Override
    public Lifecycle getLifecycle() {
        return lifecycleRegistry;
    }
}
```

### 2.13 总结

```
-Lifecycle 让组件感知生命周期，避免手动管理 onResume()、onPause()
-LifecycleObserver 用于监听生命周期事件，推荐使用 DefaultLifecycleObserver
-Lifecycle 在 ViewModel、LiveData、协程中广泛使用
-LifecycleScope 结合协程可自动管理异步任务
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)