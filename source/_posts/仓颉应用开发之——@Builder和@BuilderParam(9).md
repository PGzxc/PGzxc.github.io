---
title: 仓颉应用开发之——@Builder和@BuilderParam(9)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
  - 仓颉
tags:
  - 仓颉
abbrlink: bcb68414
date: 2024-09-09 08:44:13
---
## 一 概述

* @Builder和@BuilderParam用法说明
* @Builder和@BuilderParam代码示例

<!--more-->

## 二 @Builder和@BuilderParam用法说明

|      |   @Builder   | @BuilderParam  |
| :--: | :----------: | :------------: |
| 相同 | 自定义组件UI |  自定义组件UI  |
| 不同 |   无占位符   | 声明slot占位符 |

## 三 @Builder和@BuilderParam代码示例

### 3.1 @Builder示例

1-代码

```
package ohos_app_cangjie_entry

import ohos.base.*
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*
import ohos_app_cangjie_entry.pages.*
import ohos_app_cangjie_entry.bean.*

@Builder
func f(fontSz: Int64, color: Color) {
    Text("hello world").fontSize(fontSz).fontColor(color)
}

@Entry
@Component
class MyView {
    func build() {
          Column(20) {
            f(20, Color.BLUE)
        }
    }
}

```

2-效果图

![][1]

### 4.2 @BuilderParam

1-代码

```
package ohos_app_cangjie_entry.pages
internal import ohos.base.*
internal import ohos.component.*
internal import ohos.state_manage.*
import ohos.state_macro_manage.*

@Entry
@Component
public class MyView {
    @Builder
    func f1(): Unit {
        f<Int64>(100, 30, color: Color.BLACK)
    }

    @Builder
    func f2(): Unit {
        f<String>("hello", 30, color: Color.RED)
    }

    func build() {
        Column(10) {
            FrameView(ab: f1, color: Color.GREEN)
            FrameView(ab: f2, color: Color.GRAY)
        }
    }
}

@Component
class FrameView {
    @BuilderParam let ab: () -> Unit
    let color: Color

    func build() {
        Column(10) {
            ab()
        }.backgroundColor(color)
    }
}

@Builder
func f<T>(label: T, fontSz: Int64, color!: Color = Color.WHITE): Unit where T <: ToString {
    Text("${label}").fontSize(fontSz).fontColor(color)
}
```

2-效果图

![][2]

## 四 参考

* [HarmonyOS Beta5 仓颉—@Builder](https://developer.huawei.com/consumer/cn/doc/cangjie-references-V5/cj-state-management-manual-V5)
* [HarmonyOS Beta5 ArkTS—@BuilderParam装饰器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/arkts-builderparam-V5)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-hmos/cjapp-9-builder-view.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-hmos/cjapp-9-builderparam-view.png

