---
title: JavaWeb开发思维导图之——SpringMVC之请求参数(107)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: d1158fd7
date: 2025-04-16 08:27:00
---
## 一 概述

* 请求参数概念
* 请求参数类型

<!--more-->

## 二 内容详情

### 2.1 请求参数概念

```
1-概念: SpringMVC将传递的参数封装到处理器的形参中，达到快速访问参数的目的
2-访问URL: http://localhost/requestParam?name=zs
3-接收: @RequestMapping("/requestParam") public String requestParam(Stirng name){}
```

### 2.2 请求参数类型

1-普通类型参数

```
1-说明: 参数名与处理器方法形参名保持一致
2-访问URL: http://localhost/requestParam?name=zs&age=18
3-接收: @RequestMapping("/requestParam1") String requestParam(Stirng name,String age){}
4-参数设定@RequestParam
 1-名称: @RequestParam
 2-类型: 形参注解
 3-位置: 处理器类中的方法形参前方
 4-作用: 绑定请求参数与对应处理方法形参间的关系
 5-示例: @RequestParam(name="userName",required=true,defaultValue="zs")
 6-访问路径: /requestRaram2/userName=zs
```

2-POJO类型参数

2-1 参数获取

```
1-POJO简单属性
 -POJ类型：User(name,age)
 -说明: 参数名与POJO类属性名保持一致
 -访问URL: http://localhost/requestParam3?name=zs&age=18
 -接收: @RequestMapping("/requestParam3") String requestParam3(User user){}
 -参数冲突
2-POJO对象属性
 -类型：User(name,age,address)
 -说明: 当POJO中出现对象属性时，参数名称与对象层次结构名称保持一致
 -访问URL: http://localhost/requestParam5?address.provice=beijing
 -接收: @RequestMapping("/requestParam5") String requestParam5(User user){}
 
3-POJO集合属性(存储简单数据) 
 -类型：User(List<String>nick)
 -说明: 当POJO中出现集合，保存简单数据，使用多个相同名称的参数为其赋值
 -访问URL: http://localhost/requestParam6?nick=jockme&nick=jocker
 -接收: @RequestMapping("/requestParam6") String requestParam6(User user){}
 
4-POJO集合属性(存储对象数据)
 -List
 -Map
```

2-2 名称冲突问题

```
示例: @RequestMapping("/requestParam3") String requestParam3(User user,String age){}
问题：当POJO类型属性与其他形参出现同名问题时，将被同时赋值
解决: 建以使用@RequestParam注解进行区分
```

2-3 数组类型参数

```
1-说明:请求参数名与处理器方法形参保持一致，且请求参数数量>1个
2-访问URL: http://localhost/requestParam9?nick=Jockme&nick=zs
3-接收: @RequestMapping("/requestParam9") String requestParam9(String[] nick){}
```

2-4 集合类型参数

```
1-说明:保存简单类型数据，请求参数名与处理器方法形参名保持一致，且请求参数数量>1个
2-访问URL: http://localhost/requestParam10?nick=Jockme&nick=zs
3-接收: @RequestMapping("/requestParam10") String requestParam10(@RequestParam("nick")List<String> nick){}
4-注意事项
```

## 三 思维导图

![javaweb-xmind-springmvc-level1-param-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level1-param-4.png