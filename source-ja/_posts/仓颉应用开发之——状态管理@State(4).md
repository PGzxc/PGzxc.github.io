---
title: 仓颉应用开发之——状态管理@State(4)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
  - 仓颉  
tags:
  - HarmonyOS
  - 仓颉应用
abbrlink: 1640577a
date: 2024-09-04 09:16:03
---
## 一 概述

* @State的使用场景
* @State的注意事项
* @State使用示例

<!--more-->

## 二 @State的使用场景

* **@State** 修饰的变量是组件内部的状态数据
* 当这些状态数据被修改时，将会调用所在组件的render刷新

## 三 @State的注意事项

### 3.1 注意事项

* 被 **@State** 修饰的成员变量必须指明类型和初始值
* 由于状态是需要被更改的数据，所以对于被 **@State** 修饰的变量必须通过 var 来声明，不能使用 let

### 3.2 列表说明

|    种类    |                 说明                 |
| :--------: | :----------------------------------: |
|  支持类型  |     基础数据类型+类类型+数组类型     |
|   修饰符   |        私有，仅在组件内访问；        |
|  实例个数  |  可以定义多个标有 **@State**的属性   |
| 是否初始化 | 必须为所有 **@State** 变量分配初始值 |

## 四 @State使用示例

### 4.1 示例代码

1-ParentComponent.cj自定义组件

```
package ohos_app_cangjie_entry.pages
internal import ohos.base.*
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*

@Entry
@Component
public class ParentComponent {
    @State var count = 0;
    func build() {
        Column {
            Button("This is a case of @State ${count}")
            .onClick({evt =>
                this.count++
            })
        }
    }
}
```

2-使用自定义组件

```
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



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-hmos/cjapp-4-state-gif.gif


