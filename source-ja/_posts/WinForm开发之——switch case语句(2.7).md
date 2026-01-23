---
title: 'WinForm开发之——switch case语句(2.7)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 30414cff
date: 2020-07-10 22:41:59
---
## 一 概述

* C# switch case语句也是条件语句的一种，与上节介绍的if else语句是类似的
* 但switch case在判断条件的选择上会有一些局限性

<!--more-->

## 二 switch case语法形式

```
switch(表达式)
{
    case 值 1:
        语句块 1;
        break;
    case 值 2:
        语句块 2;
        break;
        ...
    default:
        语句块 n;
        break;
}
```

* 在这里，switch语句中表达式的结果必须是整型、字符串类型、字符型、布尔型等数据类型
* 如果switch语句中表达式的值与case后面的值相同，则执行相应的case后面的语句块
* 如果所有的case语句块与switch语句表达式的值都不同，则执行default语句后面的值
* default语句是可以省略的。需要注意的是，case语句后面的值是不能重复的

## 三 实例(<font size=2> 使用 switch...case 语句根据学生的考试成绩来判断等级，如果成绩在 90 分以上是优秀；如果成绩为 80~90 分是良好；如果成绩为 60~80 分是及格，如果成绩在 60 分以下是不及格。</font>)

```
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("请输入学生考试的成绩（0~100的整数）");
        int points = int.Parse(Console.ReadLine());
        if(points < 0 || points > 100)
        {
            points = 0;
        }
        switch (points / 10)
        {
            case 10:
            case 9:
                Console.WriteLine("优秀");
                break;
            case 8:
                Console.WriteLine("良好");
                break;
            case 7:
            case 6:
                Console.WriteLine("及格");
                break;
            default:
                Console.WriteLine("不及格");
                break;
        }
    }
}
```
