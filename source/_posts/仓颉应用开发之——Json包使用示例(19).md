---
title: 仓颉应用开发之——Json包使用示例(19)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
  - 仓颉  
tags:
  - HarmonyOS
  - 仓颉应用
abbrlink: 60ccca3f
date: 2024-09-24 04:44:25
---
## 一 概述

* JsonArray示例
* JsonValue和String相互转换
* JsonValue和DataModel转换

<!--more-->

## 二 JsonArray示例

1-示例代码

```
 protected override func onPageShow() {

       var list = ArrayList<JsonValue>();
       list.append(JsonBool(true))
       list.append(JsonInt(7363))
       list.append(JsonString("abc"))
       var jsa= JsonArray(list);
       Hilog.printInfo("printInfo", jsa.toString())

   }
```

2-打印消息

```
[true,7363,"abc"]
```

## 三 JsonValue和String相互转换

1-示例代码

```
protected override func onPageShow() {

      //1-string->JsonValue
      var str:String = ##"{"name": "zs","age": 30}"##;
      var jv: JsonValue = JsonValue.fromStr(str)
      //2-JsonValue->String
      var res = jv.toString()
      var prettyres = jv.toJsonString()
      Hilog.printInfo("printInfo",res)
      Hilog.printInfo("printInfo",prettyres)

  }
```

2-打印消息(一个是toString，一个是toJsonString)

```
{"name":"zs","age":30}
{
  "name": "zs",
   "age": 30
 }
```

## 四 JsonValue和DataModel转换

1-示例代码

```
protected override func onPageShow() {

    //1-string->JsonValue->DataModel->Bean
    var js = ##"{"name": "A","age": 30}"##
    var jv = JsonValue.fromStr(js)
    var dm = DataModel.fromJson(jv)
    var A = Person.deserialize(dm)
    Hilog.printInfo("printInfo","name == ${A.name}")
    Hilog.printInfo("printInfo","age == ${A.age}")
   //2-Bean->DataModel->JsonValue->JsonObject
    dm = A.serialize()
    var jo = dm.toJson().asObject()
    Hilog.printInfo("printInfo",jo.toJsonString())

 }
```

2-打印消息

```
name == A
age == 30
{
   "name": "A",
    "age": 30
 }
```

## 五 参考

* [HarmonyOS NEXT Developer Beta5仓颉—Json相关示例](https://developer.huawei.com/consumer/cn/doc/cangjie-guides-V5/json_array_sample-V5)