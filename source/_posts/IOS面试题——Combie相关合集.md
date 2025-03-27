---
title: IOS面试题——Combie相关合集
categories:
  - 面试相关
  - IOS面试题
tags:
  - Combine
abbrlink: cbfb0cdc
date: 2024-03-28 10:48:45
---
## 一 概述

1. 什么是 Combine？
2. Combine 的核心组件？
3.  如何创建一个 Publisher？
4. 如何订阅数据？
5.  Combine 的常见操作符？<!--more-->
6. Combine 处理网络请求？
7.  Combine 如何避免内存泄漏？
8.  Combine vs RxSwift？

## 二 面试题解答(仅供参考)

### 2.1 什么是 Combine？

```
-Combine 是 Apple 在 iOS 13+ 推出的响应式编程框架，
用于处理 异步数据流（如网络请求、用户输入、通知等）。

-它类似于 RxSwift，但原生支持 Swift
```

### 2.2 Combine 的核心组件？

```
-Publisher（发布者）：提供数据流，例如 URLSession.dataTaskPublisher
-Subscriber（订阅者）：接收数据并处理，例如 .sink {}
-Operator（操作符）：对数据进行转换，例如 .map()、.filter()
-Cancellable（取消订阅）：管理订阅生命周期，防止内存泄漏。
```

### 2.3  如何创建一个 Publisher？

```
import Combine

let publisher = Just("Hello, Combine!")  // 发送单个值
```

### 2.4 如何订阅数据？

```
let cancellable = publisher.sink { value in
    print(value)  // 输出："Hello, Combine!"
}
```

### 2.5  Combine 的常见操作符

|           操作符            |        作用        |
| :-------------------------: | :----------------: |
|           .map {}           |    转换数据类型    |
|         .filter {}          |      过滤数据      |
|         .flatMap {}         |     展平嵌套流     |
|        .merge(with:)        |     合并多个流     |
| .debounce(for:, scheduler:) | 防抖，防止频繁触发 |
| .throttle(for:, scheduler:) | 节流，限制触发频率 |

### 2.6 Combine 处理网络请求？

```
import Combine

let url = URL(string: "https://jsonplaceholder.typicode.com/todos/1")!
let cancellable = URLSession.shared.dataTaskPublisher(for: url)
    .map { $0.data }
    .decode(type: Todo.self, decoder: JSONDecoder())
    .sink(receiveCompletion: { print($0) },
          receiveValue: { print($0) })
```

### 2.7 Combine 如何避免内存泄漏？

```
使用 store(in: &cancellables)，集中管理订阅：

var cancellables = Set<AnyCancellable>()
publisher.sink { print($0) }.store(in: &cancellables)
```

### 2.8 Combine vs RxSwift？

|  对比项  |  Combine   |       RxSwift        |
| :------: | :--------: | :------------------: |
|  开发商  | Apple 官方 |         社区         |
| 学习成本 |     低     |         较高         |
|  依赖性  |  iOS 13+   |    需引入第三方库    |
|   功能   | 基础响应式 | 更丰富（如 `Relay`） |

