---
title: JavaWeb开发思维导图之——SpringMVC之类型转换器(108)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 83c80d5
date: 2025-04-17 09:17:18
---
## 一 概述

* 类型转换器
* 日期类型转换器
* 自定义类型转换器

<!--more-->

## 二 内容详情

### 2.1 类型转换器

1-说明:

```
SpringMVC对接收数据自动类型转换通过Converter接口实现
```

2-类型转换器

```
1-标量转换器
 -StringToBooleanConverter//String->Boolean
 -ObjectToStringConverter//Object->Boolean
 -StringToNumberConverterFactory//String->Number
 -NumberToNumberConverterFactory//Number子类之间
 -StringToCharacteConverter//String->Character
 -NumberToCharacteConverter//Number子类型
 -CharacteToNumberConverterFactory//Characte->Number子类型
 -StringToEnumConverterFactory//String->enum类型
 -EnumToStringConverter//enum类型->String
 
2-集合、数组相关转换器
 -ArrayToCollecionConverter //数组->集合(List、Set)
 -CollectionToArayConverter //集合(List、Set)->数组
 -ArrayToArrayConverter //数组间
 
3-默认转换器
 -ObjectToObjectConverter //object间
 -IdToEntityConverter //Id->Entity
 -FallbackObjectToStringConverter //Object->String
```

### 2.2 日期类型转换器

1-日期转换

```
1-说明:SpringMVC对接收的数据进行自动类型转换，该工作通过Converter接口实现
2-访问URL: http://localhost/requestParam11?date=2020/02/02
3-接收: @RequestMapping("/requestParam11") String requestParam11(Date date){}
4-问题: 无法处理yyyy-MM-dd格式
```

2-声明自定义格式

```
1-设定格式类型为Converter，注册为Bean，受SpringMVC管理
2-自定义Converter格式类型设定，该设定使用的是同类型覆盖的思想
3-使用set保障相同类型转换器保留一个，避免冲突
4-设置具体的格式类型
5-类型规则(yyyy-MM-dd)
```

3-@DateTimeFormat

```
1-名称: @DateTimeFormat
2-类型: 形参注解、成员变量注解
3-位置: 形参前面或成员变量上方
4-作用: 为当前参数或变量指定类型转换规则
5-示例: pulic String requestParam12(@DateTimeFormat(pattern="yyyy-MM-dd") Date  date)
6-注意: 用来注解驱动支持 <mvc:annotation-driven />
```

### 2.3 自定义类型转换器

```
1-定义转换器
 -说明: 实现Convert接口，并制定转换前后类型
 -示例: public class MyDateConverte implement Converter<String,Date>{func convert()}
2-使用自定义转换器: 作为bean 
```

## 三 思维导图

![javaweb-xmind-springmvc-level1-convert-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level1-convert-5.png