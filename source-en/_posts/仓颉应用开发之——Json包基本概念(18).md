---
title: 仓颉应用开发之——Json包基本概念(18)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
  - 仓颉  
tags:
  - HarmonyOS
  - 仓颉应用
abbrlink: fc3a82f2
date: 2024-09-23 08:49:31
---
## 一 概述

* Json包说明
* json包中常用类型

<!--more-->

## 二 Json包说明

* 处理json的包位于`encoding.json`包中
* json包用于处理其他类型(基本类型+数据类)与JsonValue之间的转换

## 三 json包中常用类型

### 3.1 ToJson接口

```
public interface ToJson {
    static func fromJson(jv: JsonValue): DataModel
    func toJson(): JsonValue
}
```

说明：用于实现 [JsonValue](https://developer.huawei.com/consumer/cn/doc/cangjie-guides-V5/encoding_json_package_classes-V5#class-jsonvalue) 和 [DataModel](https://developer.huawei.com/consumer/cn/doc/cangjie-guides-V5/serialization_package_classes-V5#class-datamodel) 的相互转换

### 3.2 常见类及方法

|  No  |    类型    |                           包含方法                           |
| :--: | :--------: | :----------------------------------------------------------: |
|  1   | JsonArray  | add(JsonValue)、get(Int64)、getItems()、kind()、size()、toJsonString() |
|  2   |  JsonBool  |      getValue()、getValue()、toJsonString()、toString()      |
|  3   | JsonFloat  |        getValue()、kind()、toJsonString()、toString()        |
|  4   |  JsonInt   |        getValue()、kind()、toJsonString()、toString()        |
|  5   | JsonString |        getValue()、kind()、toJsonString()、toString()        |
|  6   | JsonObject | containsKey(String)、get(String)、getFields()、kind()、put(String, JsonValue)、size()、toJsonString()、toString() |
|  7   | JsonValue  |             fromStr(String)、asArray()、asXXX()              |

### 3.3 枚举类-

JsonKind：表示 [JsonValue](https://developer.huawei.com/consumer/cn/doc/cangjie-guides-V5/encoding_json_package_classes-V5#class-jsonvalue) 的具体类型。

|  No  |   类型   |        说明         |
| :--: | :------: | :-----------------: |
|  1   | JsArray  |      数组类型       |
|  2   |  JsBool  |      布尔类型       |
|  3   | JsFloat  | 浮点数的number 类型 |
|  4   |  JsInt   | 整数的 number 类型  |
|  5   |  JsNull  |      null 类型      |
|  6   | JsObject |      对象类型       |
|  7   | JsString |     string 类型     |

## 四 参考

* [HarmonyOS NEXT Developer Beta5仓颉—encoding.json包](https://developer.huawei.com/consumer/cn/doc/cangjie-guides-V5/encoding_json_package_interfaces-V5)