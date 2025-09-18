---
title: 鸿蒙面试题——ArkTS进阶题ArkTS特性与ArkUI(3)
categories:
  - 面试相关
  - Harmony面试题
tags:
  - Harmony面试题
abbrlink: 65dd346d
date: 2025-09-18 08:56:46
---
## 一 概述

```
本文介绍：
- ArkTS：基础/进阶/高频三部分
- 本小节：进阶题/ArkTS特性与ArkUI
```

<!--more-->

## 二 ArkTS特性与ArkUI(仅供参考)

### 2.1 @Entry 和 @Component 的作用？

```
-@Entry：标记应用入口 UI 组件。
-@Component：标记普通可复用组件
```

### 2.2 @State、@Prop、@Link、@Provide/@Consume 区别？

```
-@State：组件本地状态。
-@Prop：父组件传递给子组件的值。
-@Link：父子组件共享可变状态。
-@Provide/@Consume：跨层级状态传递
```

### 2.3 ArkUI 声明式 UI vs 命令式 UI？

```
声明式：UI = f(state)，UI 随状态变化自动刷新。
命令式：开发者手动操作 DOM 更新。
```

### 2.4 条件渲染和列表渲染？

```
1、条件渲染
if (flag) { Text("Visible") }

2、列表渲染
ForEach(items, item => Text(item.name))
```

### 2.5 自定义组件如何传递状态？

```
-父传子：@Prop
-双向：@Link
-跨层级：@Provide + @Consume
```

### 2.6 ArkUI 动画实现方式？

```
1、说明
内置属性动画：animateTo()

2、示例
animateTo({ duration: 300 }, () => {
  this.offset += 100
})
```

