---
title: 仓颉应用开发之——状态管理@Provide和@Consume(8)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
  - 仓颉  
tags:
  - HarmonyOS
  - 仓颉应用
abbrlink: ea8d02d6
date: 2024-09-08 08:32:25
---
## 一 概述

* @Provide和@Consume的使用场景
* @Provide和@Consume的注意事项
* @Provide和@Consume使用示例

<!--more-->

## 二 @Provide和@Consume的使用场景

* **@Provide** 作为数据的提供方，可以更新其子孙节点的数据，并触发页面渲染
* **@Consume** 在感知到 **@Provide** 数据的更新后，会触发当前view的重新渲染。
* 二者构成双向数据绑定：**@Consume** 发生变化后，也会触发 **@Provide** 所在的页面渲染

## 三 @Provide和@Consume的注意事项

|          |           @Provide           |           @Consume           |
| :------: | :--------------------------: | :--------------------------: |
| 支持类型 | 基础数据类型+类类型+数组类型 | 基础数据类型+类类型+数组类型 |
|  关联性  |     变量名和类型必须相同     |     变量名和类型必须相同     |
|  修饰符  |           var声明            |           var声明            |
|  初始化  |           有初始值           |           无初始值           |

## 四 @Provide和@Consume使用示例

### 4.1 示例

1-SubSubComponent.cj组件(@Consume)

```
package ohos_app_cangjie_entry.pages
internal import ohos.base.*
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*

@Component
class SubSubComponent {
    @Consume var stateContent: Int64

    func build() {
      Column {
        Text("this is SubSubComponent ${this.stateContent}")
        Button("SubSub-${this.stateContent}").onClick({evt => this.stateContent += 1})
      }
    }
}
```

2-SubComponent.js组件

```
package ohos_app_cangjie_entry.pages
internal import ohos.base.*
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*


@Component
class SubComponent {
    func build() {
      Column {
        Text("this is SubComponent")
        SubSubComponent()
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
    @Provide var stateContent: Int64 = 0
    func build() {
      Column {
        SubComponent()
        Button("Parent-${this.stateContent}").onClick({evt => this.stateContent += 1})
      }
    }
}
```

4-Index.cj使用

```
package ohos_app_cangjie_entry

internal import ohos.base.LengthProp
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*
import ohos_app_cangjie_entry.pages.*
import ohos_app_cangjie_entry.bean.*

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

* [HarmonyOS Beta5 仓颉—@Provide和@Consume](https://developer.huawei.com/consumer/cn/doc/cangjie-references-V5/cj-state-management-manual-V5)
* [HarmonyOS Beta5 ArkTS—@Provide和@Consume](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/arkts-provide-and-consume-V5)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-hmos/cjapp-8-consume-gif.gif


