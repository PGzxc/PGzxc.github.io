---
title: 'WinForm开发之——递归(3.12)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 131e99f2
date: 2020-07-15 22:44:04
---
## 一 概述

* 递归是一种特殊的执行程序
* 它是用方法调用自身的形式实现的，让程序代码循环执行

<!--more-->

## 二 实例

 使用递归实现计算所输入数的阶乘 ( 例如计算 5 的阶乘，则是 5*4*3*2*1 的结果 )

### 2.1 代码

####  FactorialClass 

```
class FactorialClass
{
    public static int Factorial(int n)
    {
        if(n == 0)
        {
            return 1;
        }
        return n * Factorial(n - 1);
    }
}
```

####  Main  

```
class Program
{
    static void Main(string[] args)
    {
        int rs = FactorialClass.Factorial(5);
        Console.WriteLine("结果是：" + rs);
    }
}
```