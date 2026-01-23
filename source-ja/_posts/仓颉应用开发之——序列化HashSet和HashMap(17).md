---
title: 仓颉应用开发之——序列化HashSet和HashMap(17)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
  - 仓颉  
tags:
  - HarmonyOS
  - 仓颉应用
abbrlink: 3830ffb4
date: 2024-09-20 08:38:52
---
## 一 概述

* 自定义HashSet和HashMap序列化类
* HashSet和HashMap序列化示例

<!--more-->

## 二 自定义HashSet和HashMap序列化类

### 2.1 自定义过程

* 自定义类实现Hashable、Equatable、Serializable
* 实现`==`、`!=`、`serialize`、`deserialize`方法

### 2.2 示例

```
class Values <: Hashable & Equatable<Values> & Serializable<Values> {
    var m_data: Int64

    init(m_data: Int64) {
        this.m_data = m_data
    }

    public func hashCode(): Int64 {
        return this.m_data
    }

    public operator func ==(right: Values): Bool {
        let a = (this.m_data == right.m_data)
        if (a) { return true } else { return false }
    }

    public operator func !=(right: Values): Bool {
        let a = (this.m_data != right.m_data)
        if (a) { return true } else { return false }
    }

    /* 实现 Serializable 接口的序列化方法 */
    public func serialize(): DataModel {
        return DataModelStruct().add(field<Int64>("m_data", m_data))
    }

    /* 实现反序列化方法 */
    public static func deserialize(dm: DataModel): Values {
        let dms: DataModelStruct = match (dm) {
            case data: DataModelStruct => data
            case _ => throw Exception("this data is not DataModelStruct")
        }
        let result = Values(0)
        result.m_data = Int64.deserialize(dms.get("m_data"))
        return result
    }
}
```

## 三 HashSet和HashMap序列化示例

### 3.1 示例

```
protected override func onPageShow() {
        let s: HashSet<Values> = HashSet<Values>([Values(3), Values(5), Values(7)])
        let seris: DataModel = s.serialize()
        Hilog.printInfo("printInfo",seris.toJson().toJsonString())
        Hilog.printInfo("printInfo","===========")
        let m: HashMap<String, Values> = HashMap<String, Values>([("1", Values(3)), ("2", Values(6)), ("3", Values(9))])
        let serim: DataModel = m.serialize()
        Hilog.printInfo("printInfo",serim.toJson().toJsonString())
        
    }
```

### 3.2 打印结果

```
[
  {
    "m_data": 3
  },
  {
    "m_data": 5
  },
  {
    "m_data": 7
  }
]
===========
{
  "1": {
    "m_data": 3
  },
  "2": {
    "m_data": 6
  },
  "3": {
    "m_data": 9
  }
}
```

## 四 参考

* [HarmonyOS NEXT Developer Beta5仓颉—HashSet 和 HashMap 序列化](https://developer.huawei.com/consumer/cn/doc/cangjie-guides-V5/serialize_hashmap_and_hashset-V5)