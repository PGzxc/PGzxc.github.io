---
title: 'WinForm开发之——Lambda表达式(3.11)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 30ddbad1
date: 2020-07-15 22:37:50
---
## 一 概述

* 在C#语言中提供了Lambda表达式，给编写程序带来了很多的便利
* 在C# 6.0中还提供了表达式体方法(expTession-bodied method)的新功能，方法体直接使用=>的形式来实现

<!--more-->

## 二 Lambda语法形式

```
访问修饰符    修饰符    返回值类型    方法名(参数列表) => 表达式;
```

* 如果在方法定义中定义了返回值类型，在表达式中不必使用return关键字，只需要计算值即可
* 这种形式只能用在方法中只有一条语句的情况下，方便方法的书写

## 三 实例

 创建类 LambdaClass,在类中定义一个整数相加的方法，并在 Main 方法中调用 

### 3.1 代码

####  LambdaClass 

```
class LambdaClass
{
    public static int Add(int a, int b) => a + b;
}
```

#### Main

```
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine(LambdaClass.Add(100, 200));
    }
}
```

