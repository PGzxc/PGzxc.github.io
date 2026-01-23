---
title: 仓颉应用开发之——状态管理@Observed和@Publish(7)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
  - 仓颉  
tags:
  - HarmonyOS
  - 仓颉应用
abbrlink: 7a95a275
date: 2024-09-07 09:20:24
---
## 一 概述

* @Observed和@Publish的使用场景
* @Observed和@Publish的注意事项
* @Observed和@Publish使用示例

<!--more-->

## 二 @Observed和@Publish的使用场景

* 使用场景：针对类类型的状态变量
* 关键字：**@Observed** 和 **@Publish**

## 三 @Observed和@Publish的注意事项

|          |   @Observed    |        @Publish        |
| :------: | :------------: | :--------------------: |
| 作用对象 |     修饰类     |        修饰属性        |
|   作用   | 类可以被观察到 | 属性变化会自动修改页面 |
|  修饰符  |  一般使用var   |     只能由var声明      |

## 四 @Observed和@Publish使用示例

### 4.1 类型观察对象

```
package ohos_app_cangjie_entry.bean
internal import ohos.state_manage.*
import ohos.state_macro_manage.*

@Observed
public class Book {
    @Publish public var title: String = ""
    @Publish public var price: Int64 = 9
    var id: Int64
}
```

### 4.2 示例代码

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

    @State var book: Book = Book(title: "myBook", id: 3214324)

    func build() {
          Column(20) {
            Text("${book.title}, ${book.price}")
            Button("click").onClick({e =>
                book.title = "noBook"
            })
        }
    }
}

```

### 4.3 效果图

![][1]



## 五 参考

* [HarmonyOS Beta5 仓颉—@Observed and @Publish](https://developer.huawei.com/consumer/cn/doc/cangjie-references-V5/cj-state-management-manual-V5)

  



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-hmos/cjapp-7-publish-gif.gif


