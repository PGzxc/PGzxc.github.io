---
title: Android面试题——掘金-JetPack之ViewModel(3.5)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 4974859e
date: 2025-04-06 10:21:28
---
## 一 概述

```
ViewModel是Android Jetpack组件之一，专门用于管理UI相关的数据，可以在配置更改（如屏幕旋转）时保留数据，
避免数据丢失，同时 减少 Activity/Fragment 的代码量，提高代码的可维护性。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 ViewModel？它的作用是什么？

```
1.概念
ViewModel 是 一个存储和管理 UI 相关数据的类，
生命周期比 Activity 或 Fragment 更长，在配置变化（如旋转屏幕）时不会被销毁。

2.作用
✅ 防止 Activity/Fragment 旋转时数据丢失
✅ 分离 UI 逻辑和数据，提高代码解耦性
✅ 便于与 LiveData/Flow 结合，实现数据自动更新
```

### 2.2 如何创建和使用 ViewModel？

```
1.创建 ViewModel
public class MyViewModel extends ViewModel {
    private MutableLiveData<Integer> count = new MutableLiveData<>(0);

    public LiveData<Integer> getCount() {
        return count;
    }

    public void increaseCount() {
        count.setValue(count.getValue() + 1);
    }
}

2.在 Activity / Fragment 使用 ViewModel
public class MainActivity extends AppCompatActivity {
    private MyViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        viewModel = new ViewModelProvider(this).get(MyViewModel.class);

        viewModel.getCount().observe(this, count -> {
            // 更新 UI
            textView.setText(String.valueOf(count));
        });

        button.setOnClickListener(v -> viewModel.increaseCount());
    }
}
```

### 2.3 ViewModel 的生命周期？

1.概念

```
ViewModel 的生命周期 比 Activity/Fragment 更长，它不会因为配置变化（如旋转屏幕）而销毁，
只有 宿主（Activity/Fragment）真正销毁时，ViewModel 才会被清理。
```

2.对比

|   组件    |               销毁时机               |
| :-------: | :----------------------------------: |
| Activity  |         旋转屏幕会销毁并重建         |
| Fragment  | 被 `replace()` 或 `remove()` 时销毁  |
| ViewModel | 只有 `Activity` 彻底销毁时才会被清理 |

### 2.4 为什么 ViewModel 不会因为旋转屏幕而销毁？

```
ViewModel 由 ViewModelProvider 管理，它会将 ViewModel 存储在 特定的 ViewModelStore 中，
即使 Activity/Fragment 重新创建，也会获取相同的 ViewModel 实例。
```

### 2.5 如何在多个 Fragment 之间共享 ViewModel？

```
1.概念
使用 ViewModelProvider(requireActivity()) 让多个 Fragment 共享同一个 ViewModel

2.示例
2.1 创建 SharedViewModel
public class SharedViewModel extends ViewModel {
    private MutableLiveData<String> message = new MutableLiveData<>();

    public void setMessage(String msg) {
        message.setValue(msg);
    }

    public LiveData<String> getMessage() {
        return message;
    }
}

2.2 在多个 Fragment 共享 ViewModel
public class FragmentA extends Fragment {
    private SharedViewModel viewModel;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        viewModel = new ViewModelProvider(requireActivity()).get(SharedViewModel.class);

        button.setOnClickListener(v -> viewModel.setMessage("Hello from Fragment A"));
        return inflater.inflate(R.layout.fragment_a, container, false);
    }
}

public class FragmentB extends Fragment {
    private SharedViewModel viewModel;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        viewModel = new ViewModelProvider(requireActivity()).get(SharedViewModel.class);

        viewModel.getMessage().observe(getViewLifecycleOwner(), message -> {
            textView.setText(message);
        });

        return inflater.inflate(R.layout.fragment_b, container, false);
    }
}
```

### 2.6 ViewModel 如何与 Repository 结合？

```
1.概念
ViewModel 通常与 Repository 结合，用于获取数据，并结合 LiveData 实现数据自动更新：

2.示例
2.1 创建 Repository
public class UserRepository {
    public LiveData<User> getUser() {
        MutableLiveData<User> user = new MutableLiveData<>();
        user.setValue(new User("张三", 25)); // 模拟数据
        return user;
    }
}

2.2 在 ViewModel 中使用 Repository
public class UserViewModel extends ViewModel {
    private UserRepository repository = new UserRepository();
    private LiveData<User> user;

    public UserViewModel() {
        user = repository.getUser();
    }

    public LiveData<User> getUser() {
        return user;
    }
}

2.3 在 Activity/Fragment 中观察数据
viewModel.getUser().observe(this, user -> {
    textView.setText(user.getName());
});
```

### 2.7 ViewModel 如何处理数据持久化？

```
1.概念
ViewModel 本身不会持久化数据，
如果需要在 App 进程被杀死后恢复数据，可以结合 SavedStateHandle 或 Room 数据库。

2.示例
2.1 使用 SavedStateHandle
public class MyViewModel extends ViewModel {
    private SavedStateHandle savedStateHandle;

    public MyViewModel(SavedStateHandle savedStateHandle) {
        this.savedStateHandle = savedStateHandle;
    }

    public void saveCount(int count) {
        savedStateHandle.set("count", count);
    }

    public LiveData<Integer> getCount() {
        return savedStateHandle.getLiveData("count", 0);
    }
}

2.2 使用 Room 持久化
@Dao
public interface UserDao {
    @Query("SELECT * FROM user WHERE id = :userId")
    LiveData<User> getUser(int userId);
}
public class UserRepository {
    private UserDao userDao;

    public LiveData<User> getUser(int userId) {
        return userDao.getUser(userId);
    }
}
```

### 2.8 ViewModel 与 LiveData 的区别？

|         对比项         |    ViewModel     |       LiveData       |
| :--------------------: | :--------------: | :------------------: |
|          作用          | 管理 UI 相关数据 |    存储和监听数据    |
|      生命周期感知      |        否        |          是          |
| 是否会因为旋转屏幕销毁 |       不会       |         不会         |
|   是否适合持久化数据   |        否        | **否**（结合数据库） |

### 2.9  ViewModel 适用于哪些场景？

```
✅ 屏幕旋转时需要保留数据（如计数器、表单数据）
✅ 多个 Fragment 共享数据
✅ 结合 Repository 处理数据获取
✅ 配合 LiveData 自动更新 UI
```

### 2.10 ViewModel 和 SavedInstanceState 的区别？

|         对比项         | ViewModel | SavedInstanceState |
| :--------------------: | :-------: | :----------------: |
|      数据存储位置      |   内存    |       Bundle       |
|      数据大小限制      |    无     |  有限（1MB 内存）  |
| 屏幕旋转后数据是否保留 |    是     |         是         |
|  进程被杀死后是否恢复  |    否     |         是         |

### 2.11 ViewModel 核心知识点

```
-ViewModel 主要用于管理 UI 相关数据，防止屏幕旋转时数据丢失
-结合 LiveData 实现数据自动更新
-多个 Fragment 可以共享 ViewModel
-ViewModel 不能持久化数据，需配合 Room/SavedStateHandle
-ViewModel 适用于 MVVM 架构，与 Repository 结合使用
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)