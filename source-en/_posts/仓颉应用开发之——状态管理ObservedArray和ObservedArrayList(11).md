---
title: 仓颉应用开发之——状态管理ObservedArray和ObservedArrayList(11)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
  - 仓颉  
tags:
  - HarmonyOS
  - 仓颉应用
abbrlink: c61d6ade
date: 2024-09-11 08:48:35
---
## 一 概述

* ObservedArray和ObservedArrayList使用说明
* ObservedArray代码示例
* ObservedArrayList代码示例

<!--more-->

## 二 ObservedArray和ObservedArrayList使用说明

* 状态管理的数组类型：ObservedArray和ObservedArrayList
* 当其中数组发生变化时，如修改其中一项的值，删除或添加一项，就会触发UI更新

## 三 ObservedArray代码示例

1-示例代码

```
package ohos_app_cangjie_entry

import ohos.base.*
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*
import ohos_app_cangjie_entry.pages.*
import ohos_app_cangjie_entry.bean.*

@Entry
@Component
class MyView {
 @State var arr: ObservedArray<Int64> = ObservedArray<Int64>([1, 2])

    func build() {
        Column {
            Text("arr[0] is ${arr[0]}")
            Button("click").onClick {
                arr[0] = 0
            }
        }
    }
}
```

2-效果图

![][1]

## 四 ObservedArrayList代码示例

1-示例代码

```
package ohos_app_cangjie_entry

import ohos.base.*
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*
import ohos_app_cangjie_entry.pages.*
import ohos_app_cangjie_entry.bean.*

@Entry
@Component
class MyView {
  @State var arr: ObservedArrayList<Int64> = ObservedArrayList<Int64>([1, 2])

    func build() {
        Column {
            Text("arr[0] is ${arr[0]}")
            Button("click").onClick {
                arr[0] = 0
            }
            Button("append").onClick {
                arr.append(0)
            }
        }
    }
}
```

2-效果图

![][2]

## 五 参考

* [HarmonyOS Beta5 仓颉—ObservedArray和ObservedArrayList](https://developer.huawei.com/consumer/cn/doc/cangjie-references-V5/cj-state-management-manual-V5)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-hmos/cjapp-11-observedarray-sample.gif
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-hmos/cjapp-11-observedarraylist-sample.gif

