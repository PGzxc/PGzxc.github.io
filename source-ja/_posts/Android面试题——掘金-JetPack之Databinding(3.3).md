---
title: Android面试题——掘金-JetPack之Databinding(3.3)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 1148b7f4
date: 2025-04-06 10:19:19
---
## 一 概述-DataBinding（数据绑定）

```
DataBinding 是 Android Jetpack 提供的 MVVM（Model-View-ViewModel）架构 组件，
允许 在 XML 直接绑定数据，减少 findViewById() 和 setText() 等重复代码，提高开发效率。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 DataBinding？它的作用是什么？

```
1.概念
DataBinding 允许在 XML 直接绑定数据，减少 Java/Kotlin 代码，提高 UI 更新效率。

2.作用
✅ 减少 findViewById()：避免手动查找控件，提高性能。
✅ 双向数据绑定：数据变更 UI 自动更新，反之亦然。
✅ 提高 UI 代码可读性：布局逻辑写在 XML，减少 Activity/Fragment 代码量
```

### 2.2 如何启用 DataBinding？

```
在 build.gradle 中启用：

android {
    buildFeatures {
        dataBinding = true
    }
}
```

### 2.3 如何使用 DataBinding？

```
1.修改 XML，添加 <layout> 标签
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <data>
        <variable name="user" type="com.example.User"/>
    </data>
    <LinearLayout android:orientation="vertical">
        <TextView android:text="@{user.name}"/>
    </LinearLayout>
</layout>

2.在 Activity / Fragment 绑定数据
ActivityMainBinding binding = ActivityMainBinding.inflate(getLayoutInflater());
setContentView(binding.getRoot());

User user = new User("张三");
binding.setUser(user);
```

### 2.4 DataBinding 如何避免 findViewById()？

```
1.DataBinding 生成 ActivityMainBinding 类，直接访问控件：
binding.textView.setText("Hello");

2.对比传统方式
TextView textView = findViewById(R.id.textView);
textView.setText("Hello");
```

### 2.5 DataBinding 如何实现数据双向绑定？

```
1.使用 @={} 语法实现双向绑定：
<EditText android:text="@={user.name}"/>

2.ViewModel 需要使用 ObservableField
public class UserViewModel extends ViewModel {
    public ObservableField<String> name = new ObservableField<>();
}
```

### 2.6 DataBinding 如何绑定事件？

```
1.xml
<Button android:onClick="@{() -> viewModel.onClick()}"/>

2.java
public class MyViewModel {
    public void onClick() {
        Log.d("DataBinding", "按钮点击");
    }
}
```

### 2.7 DataBinding 如何绑定方法调用？

```
1.xml
<TextView android:text="@{String.valueOf(user.age)}"/>
或者使用静态方法
<TextView android:text="@{Utils.formatPrice(user.salary)}"/>

2.java
public class Utils {
    @BindingAdapter("android:text")
    public static void formatPrice(TextView view, double price) {
        view.setText("$" + price);
    }
}
```

### 2.8 如何在 DataBinding 中使用 LiveData？

```
1.xml
<TextView android:text="@{viewModel.liveDataUser.name}"/>
2.java
public class MyViewModel extends ViewModel {
    public MutableLiveData<User> liveDataUser = new MutableLiveData<>();
}
```

### 2.9 DataBinding 如何结合 RecyclerView？

```
1.定义 item XML
<layout>
    <data>
        <variable name="user" type="com.example.User"/>
    </data>
    <TextView android:text="@{user.name}"/>
</layout>

2.在 Adapter 绑定数据
@Override
public void onBindViewHolder(ViewHolder holder, int position) {
    holder.binding.setUser(userList.get(position));
}
```

### 2.10 DataBinding 和 ViewBinding 的区别？

|      对比项       |     DataBinding     |       ViewBinding       |
| :---------------: | :-----------------: | :---------------------: |
|       作用        | 数据绑定 + 事件绑定 |       只绑定 View       |
| 是否支持 LiveData |        支持         |         不支持          |
| 是否支持双向绑定  |        支持         |         不支持          |
|       性能        |        稍慢         |          更快           |
|     推荐场景      |      MVVM 模式      | 仅替代 `findViewById()` |

### 2.11 总结-DataBinding 核心知识点

```
-DataBinding 允许在 XML 绑定数据，减少 Java/Kotlin 代码
-双向绑定 @={} 语法
-支持 LiveData 和 ViewModel
-支持 RecyclerView 绑定数据
-DataBinding vs ViewBinding：DataBinding 适用于 MVVM，ViewBinding 仅替代 findViewById()
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)