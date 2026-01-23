---
title: 'WinForm开发之——DateTime类(3.18)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 345be22c
date: 2020-07-15 23:02:16
---
## 一 概述

* C# DateTime 类用于表示时间
* 所表示的范围是从 0001 年 1 月 1 日 0 点到 9999 年 12 月 31 日 24 点 
*  在 DateTime 类中提供了静态属性 Now,用于获取当前的日期和时间，如下所示`DateTime.Now`

<!--more-->

## 二 DateTime相关

|         **方法**         |                 **描述**                 |
| :----------------------: | :--------------------------------------: |
|           Date           |            获取实例的日期部分            |
|           Day            |  获取该实例所表示的日期是一个月的第几天  |
|        DayOfWeek         |   获取该实例所表示的日期是一周的星期几   |
|        DayOfYear         |   获取该实例所表示的日期是一年的第几天   |
|   Add(Timespan value)    |  在指定的日期实例上添加时间间隔值 value  |
|  AddDays(double value)   |   在指定的日期实例上添加指定天数 value   |
|  AddHours(double value)  | 在指定的日期实例上添加指定的小时数 value |
| AddMinutes(double value) | 在指定的日期实例上添加指定的分钟数 value |
| AddSeconds(double value) |  在指定的日期实例上添加指定的秒数 value  |
|   AddMonths(int value)   |  在指定的日期实例上添加指定的月份 value  |
|   AddYears (int value)   |  在指定的日期实例上添加指定的年份 value  |

## 三 实例

### 3.1 实例一

 使用 DateTime 类获取当前时间，分别输出该日是当月的第几天、星期几以 及一年中的第几天，并计算 30 天后的日期 

####  代码

```
class Program
{
    static void Main(string[] args)
    {
        DateTime dt = DateTime.Now;
        Console.WriteLine("当前日期为：{0}", dt);
        Console.WriteLine("当前时本月的第{0}天", dt.Day);
        Console.WriteLine("当前是：{0}", dt.DayOfWeek);
        Console.WriteLine("当前是本年度第{0}天", dt.DayOfYear);
        Console.WriteLine("30 天后的日期是{0}", dt.AddDays(30));
    }
}
```

### 3.2 实例二

 假设计算现在距离2018年6月1日儿童节的天数 ( 两个日期的差可由时间间隔类 TimeSpan 的对象来存放 )

#### 代码

```
class Program
{
    static void Main(string[] args)
    {
        DateTime dt1 = DateTime.Now;
        DateTime dt2 = new DateTime(2019, 6, 1);
        TimeSpan ts = dt2 - dt1;
        Console.WriteLine("间隔的天数为{0}天", ts.Days);
    }
}
```
