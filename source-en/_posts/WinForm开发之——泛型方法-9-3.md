---
title: 'WinForm开发之——泛型方法(9.3)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: cac28f6
date: 2020-07-22 21:59:36
---
## 一 概述

* 在C#语言中泛型方法是指通过泛型来越苏方法中的参数类型，也可以理解为对数据类型设置了参数
* 如果没有泛型，每次方法中的参数类型都是固定的，不能随意更改；在使用泛型后，方法中的数据类型则有指定的泛型来约束，即可以根据提供的泛型来传递不同类型的参数

<!--more-->

## 二 泛型方法定义

* 定义泛型方法需要在方法名和参数列表之间加上`<>`，并在其中使用T来代表参数类型
* 当然，也可以使用其他的标识符来代替参数类型，但通常使用`T`来表示

## 三 实例  创建泛型方法，实现对两个数的求和运算 

### 3.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        //将T设置为double类型
        Add<double>(3.3, 4);
        //将T设置为int类型
        Add<int>(3, 4);
    }
    //加法运算
    private static void Add<T>(T a, T b)
    {
        double sum = double.Parse(a.ToString()) + double.Parse(b.ToString());
        Console.WriteLine(sum);
    }
}
```

### 3.2 说明

*  在调用 Add 方法时能指定不同的参数类型执行加法运算 
*  如果在调用 Add 方法时，没有按照 <T> 中规定的类型传递参数，则会出现编译错误，这样就可以尽量避免程序在运行时出现异常 