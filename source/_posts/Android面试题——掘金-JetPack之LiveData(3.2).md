---
title: Android面试题——掘金-JetPack之LiveData(3.2)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 13af59d
date: 2025-04-06 10:18:27
---
## 一 概述

```
LiveData 是 Jetpack 组件之一，用于 数据存储与观察，具有 生命周期感知 和 线程安全 特性。
在 Android 开发中，LiveData 主要用于 ViewModel 和 UI 组件的数据绑定，避免内存泄漏，提高数据管理效率。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 LiveData？它的作用是什么？

```
1.概念
LiveData 是 生命周期感知的数据存储类，专门用于 UI 组件的数据通信。

2.作用
✅ 生命周期感知：只在 Activity / Fragment 处于 STARTED / RESUMED 时更新数据。
✅ 自动管理数据更新：避免 onSaveInstanceState()，防止 Activity 重新创建后数据丢失。
✅ 线程安全：支持 setValue()（主线程） 和 postValue()（子线程）。
```

### 2.2 LiveData 的工作原理是什么？

```
1.概念
LiveData 通过 Observer 监听数据变化，
并在 LifecycleOwner（Activity/Fragment）处于 活跃状态 时自动推送数据。

2.工作流程：

-ViewModel 持有 LiveData
-Activity / Fragment 观察 LiveData
-LiveData 数据发生变化时，自动通知 UI 更新
```

### 2.3 LiveData 和 MutableLiveData 的区别？

1-对比

|  对比项  |     LiveData      |     MutableLiveData      |
| :------: | :---------------: | :----------------------: |
| 数据修改 |       只读        |        可修改数据        |
| 适用场景 |    UI 观察数据    |       允许修改数据       |
|   示例   | LiveData\<String> | MutableLiveData\<String> |

2-示例

```
// 只读 LiveData
LiveData<String> liveData = new MutableLiveData<>();

// 可修改数据
MutableLiveData<String> mutableLiveData = new MutableLiveData<>();
mutableLiveData.setValue("新数据");
```

### 2.4 LiveData 如何与 ViewModel 结合使用？

```
1.创建 ViewModel，持有 LiveData
public class MyViewModel extends ViewModel {
    private MutableLiveData<String> data = new MutableLiveData<>();

    public LiveData<String> getData() {
        return data;
    }

    public void updateData(String newData) {
        data.setValue(newData);
    }
}

2.在 Activity/Fragment 中观察数据
MyViewModel viewModel = new ViewModelProvider(this).get(MyViewModel.class);

viewModel.getData().observe(this, newData -> {
    textView.setText(newData);
});
```

### 2.5 LiveData 如何进行线程切换？

1-对比

|        方法        |      作用      |   线程   |
| :----------------: | :------------: | :------: |
| setValue(T value)  | 主线程更新数据 | UI 线程  |
| postValue(T value) | 子线程更新数据 | 后台线程 |

2-示例：子线程更新 LiveData

```
new Thread(() -> {
    liveData.postValue("更新数据");
}).start();
```

### 2.6 LiveData 解决了哪些问题？

```
✅ 避免内存泄漏：LiveData 绑定 LifecycleOwner，Activity 销毁时自动解绑。
✅ 防止 UI 更新丢失：Activity 旋转时，LiveData 会自动恢复数据。
✅ 不需要手动管理生命周期：如 EventBus 需要手动注册和注销，而 LiveData 自动管理
```

### 2.7 LiveData 如何实现数据的单次消费？

```
问题： LiveData 默认 会在 Activity 重新创建（如屏幕旋转）后重新发送数据，导致数据重复消费。
解决方案：使用 SingleLiveEvent

1.实现 SingleLiveEvent
public class SingleLiveEvent<T> extends MutableLiveData<T> {
    private AtomicBoolean hasHandled = new AtomicBoolean(false);

    @Override
    public void observe(@NonNull LifecycleOwner owner, @NonNull Observer<? super T> observer) {
        super.observe(owner, value -> {
            if (hasHandled.compareAndSet(false, true)) {
                observer.onChanged(value);
            }
        });
    }
}

2.使用 SingleLiveEvent 发送数据
SingleLiveEvent<String> event = new SingleLiveEvent<>();
event.setValue("仅发送一次");
```

### 2.8 如何让 LiveData 只在 onResume() 之后触发数据更新？

1.如何实现

```
使用 observe() 和 observeForever()
```

2-表格

|           方法           |   生命周期感知   |    适用场景    |
| :----------------------: | :--------------: | :------------: |
| observe(owner, observer) |  受生命周期影响  | 适用于 UI 组件 |
| observeForever(observer) | 不受生命周期影响 | 适用于全局事件 |

3-示例：

```
1.observeForever()
liveData.observeForever(data -> {
    Log.d("LiveData", "无视生命周期，收到数据：" + data);
});

2.示例：observe()（推荐）
liveData.observe(this, data -> {
    textView.setText(data);
});
```

### 2.9 MediatorLiveData 是什么？它有什么作用？

```
1.说明
MediatorLiveData 可以合并多个 LiveData 的数据，实现复杂数据流处理。

2.示例：合并两个 LiveData
MediatorLiveData<String> mediatorLiveData = new MediatorLiveData<>();

mediatorLiveData.addSource(liveData1, value -> {
    mediatorLiveData.setValue("来自 liveData1：" + value);
});

mediatorLiveData.addSource(liveData2, value -> {
    mediatorLiveData.setValue("来自 liveData2：" + value);
});
```

### 2.10 LiveData 与 StateFlow（Kotlin 协程）对比？

|    对比项    |              LiveData               |          StateFlow          |
| :----------: | :---------------------------------: | :-------------------------: |
|   线程支持   | 仅支持 `setValue()` / `postValue()` |        支持挂起函数         |
| 生命周期感知 |                支持                 |           不支持            |
|   粘性事件   |          可能触发粘性事件           |      不会触发粘性事件       |
|   数据存储   |         只存储最后一次数据          | 需要 `stateIn()` 持久化数据 |
|   适用场景   |             UI 数据更新             |      Flow 响应式数据流      |

### 2.11 总结-LiveData 核心知识点

```
-LiveData 适用于 UI 组件的数据存储和绑定
-MutableLiveData 可修改数据，LiveData 只读
-setValue()（UI 线程），postValue()（子线程）
-ViewModel + LiveData 组合实现 UI 数据存储
-SingleLiveEvent 解决数据粘性问题
-MediatorLiveData 可合并多个 LiveData
-LiveData vs StateFlow：LiveData 适合 UI 组件，StateFlow 适合协程数据流
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)