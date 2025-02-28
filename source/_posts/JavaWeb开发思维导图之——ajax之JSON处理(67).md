---
title: JavaWeb开发思维导图之——ajax之JSON处理(67)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 960d6ac
date: 2025-02-28 10:30:43
---
## 一 概述

* json基础
* json转换工具
* 转换示例

<!--more-->

## 二 内容详情

### 2.1 json基础

1-概念

* 1-JavaScript Object Notation缩写
* 2-是一种轻量级的数据交换格式
* 3-易于阅读和编写，也易于计算机解析和生成

2-创建格式

* 1-对象类型:{name:value,name:value,..}
* 2-数组/集合类型: [{name:value,},{name,value,..}]
* 3-混合类型: {name:[{name:value,..},{name:value,..}]}

3-常用方法

* 1-stringfy(对象)//将指定对象转换为json字符串
* 2-parse(字符串)//将json格式字符串解析成对象

### 2.2 json转换工具

1-转换工具

* 1-可以将Java对象或集合转换成json格式字符串
* 2-将json格式字符串转成java对象
* 3-转换工具jackson：SpringMVC默认使用jackson

2-jackson使用步骤

* 1-导入jar包
* 2-创建核心对象
* 3-调用方法完成转换

3-常用类

* 1-ObjectMapper：1-jackson工具包核心类、2-实现json字符串和对象转换
* 2-TypeReference：1-对集合泛型的反序列化、2-使用TypeReference明确指定反序列化的对象类型

4-ObjectMapper常用方法

* 1-String writeValueAsString(obj)//将Java对象转JSON字符串
* 2-\<T> T readValue(String json,Class<T> valueType)//将json字符串转Java对象
* 3-\<T> T readValue(String json,TypeReference valueType)//将json字符串转Java对象

### 2.3 转换示例

* 1-对象转JSON，JSON转对象
* 2-Map<String,String>转JON，JSON转Map<String,String>
* 3-Map<String,User>转JSON，JSON转Map<String,User>
* 4-List\<String>转JSON，JSON转List\<String>
* 5-List\<User>转JSON,JSON 转List\<User>

## 三 思维导图

![javaweb-xmind-jquery-basic-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-ajax-json-2.png