---
title: IOS开发之——常见状态管理
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 状态管理
abbrlink: f031f469
date: 2026-02-14 21:07:23
---
## 一 概述

```
现代 iOS 状态管理已经高度收敛到 SwiftUI 体系
核心组合：State/ObservableObject/Combine（或 async/await）
```

<!--more-->

## 二 IOS 状态管理整体演进

### 2.1 早期 UIKit 时代

```
1-状态变量
-属性变量
-Delegate/Notification
-KVO

2-问题
-状态分散
-生命周期难管
-调试困难
```

### 2.2 SwiftUI 时代(主流)

1-@State(视图私有状态)

```
1-代码
@State private var count = 0

2-特点
-仅当前 View
-自动触发刷新

3-类似： RN useState / Flutter setState
```

2-@Binding(父子同步)

```
1-代码
@Binding var count: Int

2-说明
用于组件间状态传递
```

3-@StateObject / @ObservedObject

```
1-代码
class CounterViewModel: ObservableObject {
    @Published var count = 0
}
@StateObject var vm = CounterViewModel()

2-特点
-ViewModel 生命周期稳定
-跨视图共享状态

3-场景：iOS 最常用方案之一
```

4-@EnvironmentObject(全局状态)

```
1-代码
@EnvironmentObject var appState: AppState

2-类似
-RN Context
-Flutter Provider

3-注意：
滥用会导致隐式依赖
```

### 2.3 Combine(响应式状态)

1-Combine + @Published

```
1-代码
@Published var user: User?
$vm.user.sink { user in }

2-优点
-响应式
-可组合

3-缺点
-学习成本略高

SwiftUI 内部已深度使用
```

### 2.4  async/await(现代异步状态)

1-async/await + ViewModel(推荐)

```
1-代码
@MainActor
class UserViewModel: ObservableObject {
    @Published var user: User?

    func load() async {
        user = try? await api.fetchUser()
    }
}

2-说明
已经取代大量 Combine 网络场景
```

### 2.5 Redux/单向数据流(进阶)

1-The Composable Architecture(TCA)

```
1-iOS 最像 Redux 的方案

2-代码
struct State {
    var count = 0
}

enum Action {
    case increment
}

let reducer = Reduce<State, Action> { state, action in
    switch action {
    case .increment:
        state.count += 1
        return .none
    }
}

3-优点
-单向数据流
-可测试性极强

4-缺点
-学习成本高
-样板代码多

5-场景：复杂业务/大型项目常用
```

2-ReSwift(Redux 风格)

```
Redux 直译版
现在较少使用
```

### 2.6 UIKit 项目常见方案(仍在维护)

1-MVC / MVVM + KVO / Combine

```
ViewController 持有 ViewModel
使用 Combine / Delegate 更新 UI

新 UIKit 项目建议直接引入 Combine
```

## 三 IOS 状态管理方案对比

|       方案        |    场景     | 推荐指数 |
| :---------------: | :---------: | :------: |
|      @State       |   View 内   |  5颗星   |
| ObservableObject  | 页面 / 模块 |  5颗星   |
| EnvironmentObject |  全局状态   |  3颗星   |
|      Combine      |   响应式    |  4颗星   |
|    async/await    |    异步     |  5颗星   |
|        TCA        |  大型项目   |  4颗星   |

## 四 和 RN / Flutter / Android / KMP 对照

|   思想   |     RN      |    Flutter    |  Android  |       iOS        |
| :------: | :---------: | :-----------: | :-------: | :--------------: |
| 局部状态 |  useState   |   setState    | remember  |      @State      |
| 全局状态 |   Zustand   |   Riverpod    | StateFlow | ObservableObject |
|  Redux   |     RTK     |     Bloc      |    MVI    |       TCA        |
| 异步数据 | React Query | AsyncProvider |   Flow    |   async/await    |

## 五 实战选型建议(重点)

### 5.1 新 SwiftUI 项目(推荐)

```
@State
 + ObservableObject
 + async/await
```

### 5.2 中大型项目

```
ObservableObject
 + Combine / async
 +（必要时）TCA
```

### 5.3 不推荐

```
Notification 当状态管理
KVO 新项目
纯单例全局变量
```

## 六 一句话总结

```
iOS 状态管理已高度统一到 SwiftUI + ViewModel
```

