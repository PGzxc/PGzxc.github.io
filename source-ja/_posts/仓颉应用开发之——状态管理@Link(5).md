---
title: 仓颉应用开发之——状态管理@Link(5)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
  - 仓颉  
tags:
  - HarmonyOS
  - 仓颉应用
abbrlink: 632e7cfc
date: 2024-09-05 09:07:44
---
## 一 概述

* @Link的使用场景
* @Link的注意事项
* @Link使用示例

<!--more-->

## 二 @Link的使用场景

* **@Link** 修饰当前组件所拥有的状态，仅可在子组件中定义
* 双向通信：子组件 **@Link** 变量 <=>父组件 **@State** 变量

## 三 @Link的注意事项

### 3.1 注意事项

* **@Link** 属于双向数据绑定。允许组件内部修改 **@Link** 变量，且更改会通知给父组件
* **@Link** 变量定义时不初始化
* 被**@Link** 修饰的成员变量必须指明类型，且只能使用 **var** 来声明

### 3.2 列表说明

|   种类   |                      说明                      |
| :------: | :--------------------------------------------: |
| 支持类型 |          基础数据类型+类类型+数组类型          |
|  修饰符  |             私有，仅在组件内访问；             |
| 实例个数 |        可以定义多个标有 **@Link**的属性        |
| 双向通信 | 子组件 **@Link** 变量 =>父组件 **@State** 变量 |

## 四 @Link使用示例

### 4.1 示例代码

1-SubSubComponent.cj组件

```
package ohos_app_cangjie_entry.pages
internal import ohos.base.*
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*

@Component
class SubSubComponent {
    @Link var count: Int64
    var commonCount: Int64 = 0
    func build() {
        Column {
            Button("This is a case of @Link ${count} _____ SubSubComponent ${commonCount}").onClick({evt =>
                count = count + 1
            })
        }
    }
}
```

2-SubComponent.cj组件

```
package ohos_app_cangjie_entry.pages
internal import ohos.base.*
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*


@Component
class SubComponent {
    @Link var count: Int64
    func build() {
        Column {
            Button("This is a case of @Link ${count} _____ SubComponent")
            .onClick({evt =>
                count = count + 1
            })
            SubSubComponent(count: count, commonCount: count)
        }
    }
}
```

3-ParentComponent.cj组件

```
package ohos_app_cangjie_entry.pages
internal import ohos.base.*
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*

@Entry
@Component
public class ParentComponent {
    @State var count: Int64 = 0
    func build() {
        Column {
            Button("This is a case of @Link ${count} _____ ParentComponent")
            .onClick({evt =>
                count = count + 1
            })
            SubComponent(count: count)
        }
    }
}
```

4-使用组件

```
package ohos_app_cangjie_entry

internal import ohos.base.LengthProp
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*
import ohos_app_cangjie_entry.pages.*

@Entry
@Component
class MyView {
    func build() {
          Column(20) {
            ParentComponent()
        }
    }
}
```

### 4.2 效果图

![][1]



## 五 参考

* [HarmonyOS Beta5 仓颉—状态管理State](https://developer.huawei.com/consumer/cn/doc/cangjie-references-V5/cj-state-management-manual-V5)
* [HarmonyOS Beta5 ArkTS-@State装饰器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/arkts-state-V5)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-hmos/cjapp-5-link-gif.gif


