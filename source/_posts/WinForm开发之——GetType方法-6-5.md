---
title: 'WinForm开发之——GetType方法(6.5)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 1f9621a3
date: 2020-07-21 20:36:42
---
## 一 概述

* C#中GetType方法用于获取当前实例的类型，返回值为System.Type类型
* C#中GetType方法不含有任何参数，是非静态方法
* 使用任何对象都能直接调用该方法

<!--more-->

## 二 实例 <font size=3>创建字符串类型的变量、整数类型的变量以及Student类的对象，并分别使用GetType方法获取其类型并输出</font>

### 2.1 代码

```
namespace code_1
{
    class Program
    {
        static void Main(string[] args)
        {
            int i = 100;
            string str = "abc";
            Student stu = new Student();
          
            Console.WriteLine(i.GetType());
            Console.WriteLine(str.GetType());
            Console.WriteLine(stu.GetType());
        }
    }
    class Student { }
}
```

### 2.2 执行结果

![][1]

### 2.3 说明

* 从上面的执行结果可以看出，每个变量都通过GetType方法获取了其类型
* 通常可以通过该方法比较某些对象是否为同一类型的



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-gettype.png