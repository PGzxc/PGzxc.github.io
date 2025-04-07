---
title: Android面试题——掘金-JetPack之Navigation(3.10)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: c40555a
date: 2025-04-07 09:51:23
---
## 一 概述-Navigation(导航组件)

```
Navigation 是 Jetpack 提供的官方导航框架，用于管理 Fragment / Activity 之间的跳转，
简化 Fragment 事务处理，支持 深层链接（Deeplink） 和 Safe Args 传参。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 Navigation？它的作用是什么？

```
1.概念
Navigation 是 Jetpack 提供的官方推荐的导航框架，

2.主要作用： 
✅ 简化 Fragment / Activity 之间的跳转（不用手动管理 FragmentTransaction）
✅ 支持动画过渡、返回栈管理
✅ 支持 Safe Args 传递参数，避免 Bundle Key 错误
✅ 支持 Deep Link（外部链接跳转到 App）
✅ 支持 BottomNavigationView / DrawerLayout / Toolbar 结合使用
```

### 2.2 Navigation 组件有哪些？

|      组件       |                   作用                   |
| :-------------: | :--------------------------------------: |
|  NavController  |  处理导航（跳转到 Fragment / Activity）  |
| NavHostFragment | **Fragment 容器**，用于显示不同 Fragment |
|    NavGraph     | **导航图**，定义 Fragment 之间的跳转关系 |
|    Safe Args    |  **安全传参工具**，避免 Bundle Key 错误  |
|    Deep Link    |         支持 URL / App 内部跳转          |

### 2.3 Navigation 依赖

```
dependencies {
    def nav_version = "2.7.2"
    
    implementation "androidx.navigation:navigation-fragment-ktx:$nav_version"
    implementation "androidx.navigation:navigation-ui-ktx:$nav_version"
}
```

### 2.4 Navigation 的基本使用

```
1.创建 NavGraph（导航图）：在 res/navigation 目录下创建 nav_graph.xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    app:startDestination="@id/homeFragment">

    <fragment
        android:id="@+id/homeFragment"
        android:name="com.example.ui.HomeFragment"
        android:label="Home" >
        <action
            android:id="@+id/action_homeFragment_to_detailFragment"
            app:destination="@id/detailFragment" />
    </fragment>

    <fragment
        android:id="@+id/detailFragment"
        android:name="com.example.ui.DetailFragment"
        android:label="Detail" />
</navigation>

2.在 Activity 中绑定 NavHostFragment
<androidx.fragment.app.FragmentContainerView
    android:id="@+id/nav_host_fragment"
    android:name="androidx.navigation.fragment.NavHostFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:navGraph="@navigation/nav_graph" />

3.跳转 Fragment
NavController navController = Navigation.findNavController(view);
navController.navigate(R.id.action_homeFragment_to_detailFragment);
或者 使用 Safe Args 传参
HomeFragmentDirections.ActionHomeFragmentToDetailFragment action =
    HomeFragmentDirections.actionHomeFragmentToDetailFragment();
navController.navigate(action);
```

### 2.5 传递参数（Safe Args 方式）

```
1.安装 Safe Args：
在 build.gradle（Project 级）添加
id 'androidx.navigation.safeargs.kotlin'
在 build.gradle（Module 级）
dependencies {
    implementation "androidx.navigation:navigation-fragment-ktx:2.7.2"
}

2.在 NavGraph 中定义参数
<fragment
    android:id="@+id/detailFragment"
    android:name="com.example.ui.DetailFragment">
    <argument
        android:name="userId"
        app:argType="string" />
</fragment>

3.在 HomeFragment 传递参数
NavDirections action = HomeFragmentDirections.actionHomeFragmentToDetailFragment("12345");
navController.navigate(action);

4.在 DetailFragment 获取参数
String userId = DetailFragmentArgs.fromBundle(getArguments()).getUserId();
```

### 2.6 使用 BottomNavigationView 结合 Navigation

```
1.在 XML 中添加 BottomNavigationView
<com.google.android.material.bottomnavigation.BottomNavigationView
    android:id="@+id/bottomNavigationView"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:menu="@menu/bottom_nav_menu" />

2.在 MainActivity 绑定 Navigation
NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
NavigationUI.setupWithNavController(bottomNavigationView, navController);
```

### 2.7 Deep Link（支持外部 URL 跳转）

```
1.在 NavGraph 配置 Deep Link
<fragment
    android:id="@+id/detailFragment"
    android:name="com.example.ui.DetailFragment">
    <deepLink app:uri="myapp://detail/{userId}" />
</fragment>

2.在浏览器中测试
在浏览器输入：
myapp://detail/12345
可以直接跳转到 DetailFragment 并传递参数 userId=12345
```

### 2.8 返回栈管理

```
1.返回上一个 Fragment
NavController navController = Navigation.findNavController(view);
navController.navigateUp();

2.清空返回栈
navController.popBackStack(R.id.homeFragment, false);
```

### 2.9 Navigation 与 FragmentTransaction 对比

|   对比项   | Navigation  | FragmentTransaction |
| :--------: | :---------: | :-----------------: |
|   简洁性   | ✅ 简单易用  |    ❌ 需手动管理     |
|  动画支持  |   ✅ 内置    |    ❌ 需手动配置     |
| 返回栈管理 | ✅ 自动处理  |    ❌ 需手动处理     |
|  参数传递  | ✅ Safe Args |    ❌ Bundle 传参    |

### 2.10 Navigation 适用于哪些情况？

```
✅ 多个 Fragment 之间跳转（避免手动管理事务）
✅ 需要底部导航栏 / 侧边菜单（BottomNavigationView / DrawerLayout）
✅ 需要 URL Deep Link 支持
✅ 需要安全参数传递（Safe Args）
```

### 2.11 总结

```
Navigation 是 Android 官方推荐的 Fragment / Activity 导航框架，
适用于 App 内部导航、深层链接、参数传递 等场景：

✅ 简化 Fragment 跳转（不用手动管理 FragmentTransaction）
✅ 支持 Safe Args 传参，避免 Bundle Key 错误
✅ 支持 BottomNavigationView / DrawerLayout 结合
✅ 支持 Deep Link（外部链接跳转）
✅ 返回栈自动管理，减少内存泄
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)