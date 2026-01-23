---
title: 'WinForm开发之——匿名委托(11.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: fb7fc479
date: 2020-07-24 21:44:52
---
## 一 概述

在C#语言中匿名委托是指使用匿名方法注册在委托上，实际上是在委托中通过代码块来实现委托的作用

<!--more-->

## 二 具体的语法形式

1. 定义委托

   ```
   修饰符  delegate  返回值类型  委托名 ( 参数列表 );
   ```

2. 定义匿名委托

   ```
   委托名  委托对象 = delegate
   {
       //代码块
   };
   ```

3.  调用匿名委托 

   ```
   委托对象名 ( 参数列表 );
   ```

通过上面3个步骤即可完成匿名委托的定义和调用，需要注意的是，在定义匿名委托时代码块结束后要在`{}`后加上分号

## 三 实例 <font size=5> 使用匿名委托计算长方形的面积 </font>

### 3.1 代码

```
class Program
{
    public delegate void AreaDelegate(double length, double width);
    static void Main(string[] args)
    {
        Console.WriteLine("请输入长方形的长：");
        double length = double.Parse(Console.ReadLine());
        Console.WriteLine("请输入长方形的宽：");
        double width = double.Parse(Console.ReadLine());
        AreaDelegate areaDelegate = delegate
        {
            Console.WriteLine("长方形的面积为：" + length * width);
        };
        areaDelegate(length, width);
    }
}
```

### 3.2 执行结果
![][1]

### 3.3 说明

* 从上面的执行结果可以看出，在使用匿名委托时并没有定义方法，而是在实例化时直接实现了具体的操作
* 由于匿名委托并不能很好地实现代码的重用，匿名委托通常适用于一些仅需要使用一次委托中代码的情况，并且代码比较少




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-delegate-niming.png