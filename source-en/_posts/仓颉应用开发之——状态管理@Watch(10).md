---
title: 仓颉应用开发之——状态管理@Watch(10)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
  - 仓颉  
tags:
  - HarmonyOS
  - 仓颉应用
abbrlink: 7afefdf
date: 2024-09-10 08:56:08
---
## 一 概述

* @Watch的作用
* @Watch注意事项
* @Watch代码示例

<!--more-->

## 二 @Watch的作用

* **@Watch** 用于监听状态变量的变化
* 给状态变量增加一个@Watch装饰器，通过@Watch注册一个回调方法onChanged，当状态变量count被改变时，触发onChanged回调。

## 三 @Watch注意事项

* 可以监听 **@State** 、 **@Prop** 、 **@Link** 、 **@Provide** 、 **@Consume** 、 **@StorageLink** 和 **@StorageProp** 装饰的变量的变化。
* 被监听的变量必须声明类型

## 四 @Watch代码示例

### 4.1 示例

1-自定义组件代码

```
package ohos_app_cangjie_entry.pages
import ohos.base.*
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*
import ohos_app_cangjie_entry.bean.*

@Component
public class TotalView {

    @Link @Watch[onCountUpdated] var count:Int64 = 0;
    @State var total: Int64 = 0;

  // @Watch 回调
  func onCountUpdated() {
    this.total += this.count;
  }

  func build() {
    Text("Total: ${this.total}")
  }
}
```

2-调用组件并传递参数

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
    @State var count: Int64 = 0;
    func build() {
          Column(20) {
            Button("add to basket").onClick{ =>
                this.count++
            }
            Text("Count=${this.count}")
            TotalView(count:this.count)
        }
    }
}
```

### 4.2 效果图

![][1]

## 五 参考

* [HarmonyOS Beta5 仓颉—@Watch](https://developer.huawei.com/consumer/cn/doc/cangjie-references-V5/cj-state-management-manual-V5)
* [HarmonyOS Beta5 ArkTS—@Watch装饰器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/arkts-watch-V5)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-hmos/cjapp-10-watch-sample.gif


