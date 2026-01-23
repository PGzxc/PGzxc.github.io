---
title: 'WinForm开发之——Math类(3.16)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: c9a369f0
date: 2020-07-15 22:54:56
---
## 一 概述

C# Math类主要用于一些与数学相关的计算，并提供了很多静态方法方便访问

<!--more-->

## 二 Math常用的方法

|  方法   |                     描述                     |
| :-----: | :------------------------------------------: |
|   Abs   |                   取绝对值                   |
| Celling | 返回大于或等于指定的双精度浮点数的最小整数值 |
|  Floor  | 返回小于或等于指定的双精度浮点数的最大整数值 |
| Equals  |          返回指定的对象实例是否相等          |
|   Max   |            返回两个数中较大数的值            |
|   Min   |            返回两个数中较小数的值            |
|  Sqrt   |             返回指定数字的平方根             |
|  Round  |              返回四舍五入后的值              |

## 三 实例

### 3.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("请输入第一个数：");
        double num1 = Double.Parse(Console.ReadLine());
        Console.WriteLine("请输入第二个数：");
        double num2 = Double.Parse(Console.ReadLine());
        Console.WriteLine("两个数中较大的数为{0}", Math.Max(num1, num2));
        Console.WriteLine("两个数中较小的数为{0}", Math.Min(num1, num2));
    }
}
```

