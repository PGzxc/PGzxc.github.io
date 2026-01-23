---
title: Android开发之——nowinAndroid项目lint模块(9)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 35e02f
date: 2025-09-26 16:57:24
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目下lint
 -模块剖析:lint
```

<!--more-->

## 二 项目结构

```
lint/
 ├── build.gradle.kts
 └── src/main/java/com/google/samples/apps/nowinandroid/lint/
     ├── NiaIssueRegistry.kt                // 注册所有 lint Issue
     ├── TestMethodNameDetector.kt          // 检查测试方法命名规范
     └── designsystem/
         └── DesignSystemDetector.kt        // 检查 DesignSystem 相关用法
         
还有 src/test/java 下的单元测试类，用来测试自定义规则是否触发         
```

## 三 核心文件解析

### 3.1 NiaIssueRegistry.kt

```
1、继承 IssueRegistry。
2、是整个 lint 模块的入口。
3、在这里会把 TestMethodNameDetector 和 DesignSystemDetector 中定义的 Issue 注册进来：

override val issues: List<Issue> = listOf(
    TestMethodNameDetector.ISSUE,
    DesignSystemDetector.ISSUE
)


4、构建时 lint 会通过这个类加载规则。
```

### 3.2 TestMethodNameDetector.kt

```
1、定义了一个 Detector，用于扫描测试代码。
2、检查 测试方法命名规范，比如：
 -是否以 test 或 should 开头。
 -是否符合 CamelCase。

3、如果发现不符合规范的命名，会抛出 lint 警告或错误。
```

### 3.3 designsystem/DesignSystemDetector.kt

```
1、定义了一个 Detector，专门检测 Design System 的使用。

2、可能的作用：
-检查项目是否正确使用了 NiaTheme 或 DesignSystem 提供的组件。
-阻止直接使用未经封装的 Material 组件，而强制走统一的 Design System。

3、目的：保持 UI 风格一致性，避免有人绕过 Design System。
```

### 3.4 其它模块如何使用

```
1、在其它模块（如 feature、core、app）的 build.gradle.kts 中会有：

dependencies {
    lintChecks(project(":lint"))
}


2、这样整个项目在执行 ./gradlew lint 或在Android Studio里运行lint时，就会加载并应用这两个自定义规则。
```

## 四 总结

```
-入口：NiaIssueRegistry.kt
-规则 1：TestMethodNameDetector.kt → 保证测试方法命名规范
-规则 2：DesignSystemDetector.kt → 保证统一的 Design System 使用
-调用方式：其它模块通过 lintChecks(project(":lint")) 引入
-效果：全项目范围强制执行代码质量与 UI 风格约束
```

