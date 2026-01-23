---
title: Flutter开发之——安全区域
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 79b31dd
date: 2025-12-08 08:33:53
---
## 一 安全区域

```
本文介绍：
 - 安全区域(Safe Area)基础概念
 - 安全区域常用用法
```

<!--more-->

## 二 安全区域(Safe Area)基础概念

### 2.1 概念

```
Flutter 中的安全区域是由系统 UI（如状态栏、刘海区、底部手势区）所保留的不可用空间。
```

### 2.2 SafeArea组件

```
为了让内容不被遮挡，Flutter 提供了官方组件：
SafeArea(
  child: ... // 你的内容
)
```

### 2.3 自动适配

```
-iOS 刘海屏顶部状态栏
-Android 状态栏、底部手势导航区
-鸿蒙等系统的系统栏区域
```

## 三 安全区域常用用法

### 3.1  基本使用

```
return SafeArea(
  child: Scaffold(
    body: Center(child: Text("内容不被状态栏遮挡")),
  ),
);
```

### 3.2 忽略部分方向（如顶部）

```
1、代码
SafeArea(
  top: false, // 忽略顶部安全区
  bottom: true, // 适配底部
  child: ...
)

2、说明
常用于沉浸式状态栏布局（如全屏背景图）。
```

### 3.3 Scaffold 自动适配

```
1、Scaffold 自带对安全区的自动处理：
Scaffold(
  appBar: AppBar(title: Text("标题")),
  body: Text("内容区"),
  bottomNavigationBar: BottomNavigationBar(...),
)

2、自动避开：
-状态栏
-AppBar
-BottomNavigationBar
-手势导航栏（如 iPhone 底部）
```

