---
title: 'WinForm开发之——ThreadStart(14.3)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 426c51be
date: 2020-08-06 05:53:05
---
## 一 概述

* 在C#语言中使用线程时首先要创建线程，在使用Thread类的构造方法创建其实例时，需要用到ThreadStart委托或者ParameterizedThreadStart委托创建Thread类的实例
* ThreadStart委托只能用于无返回值、无参数的方法，ParameterizedThreadStart委托则可以用于带参数的方法

<!--more-->

## 二 创建过程

使用ThreadStart创建线程首先需要创建ThreadStart委托的实例，然后再创建Thread类的实例。具体代码如下：

```
ThreadStart ts = new ThreadStart( 方法名 );
Thread t = new Thread(ts);
```

## 三 实例

### 3.1 实例一 <font size=4> 使用 ThreadStart 委托创建线程，并定义一个方法输出 0〜10 中所有的偶数 </font>

#### 3.1.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        ThreadStart ts = new ThreadStart(PrintEven);
        Thread t = new Thread(ts);
        t.Start();
    }
    //定义打印0~10中的偶数的方法
    private static void PrintEven()
    {
        for(int i = 0; i <= 10; i=i+2)
        {
            Console.WriteLine(i);
        }
    }
}
```
#### 3.1.2 效果
![][1]
#### 3.1.3 说明

从上面的运行效果可以看出，使用ThreadStart委托为PrintEvent方法创建了线程，通过线程的Start方法启动线程并调用了PrintEvent方法

### 3.2 实例二 <font size=5> 在上一实例的基础上添加一个打印 1〜10 中的奇数的方法，再分别使用两个 Thread 类的实例启动打印奇数和偶数的方法 </font>

#### 3.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        ThreadStart ts1 = new ThreadStart(PrintEven);
        Thread t1 = new Thread(ts1);
        ThreadStart ts2 = new ThreadStart(PrintOdd);
        Thread t2 = new Thread(ts2);
        t1.Start();
        t2.Start();
    }
    //定义打印0~10中的偶数的方法
    private static void PrintEven()
    {
        for(int i = 0; i <= 10; i=i+2)
        {
            Console.Write(i+" ");
        }
    }
    //定义打印1~10 中的奇数的方法
    public static void PrintOdd()
    {
        for(int i = 1; i <= 10; i = i + 2)
        {
           Console.Write(i+" ");
        }
    }
}
```

#### 3.2.2 效果
![][2]

#### 3.2.3 说明

*  从上面的运行效果可以看出，两个线程分别打印了 1〜10 中的奇数和 0〜10 中的偶数，但并不是按照线程的调用顺序先打印出所有的偶数再打印奇数 
*  需要注意的是，由于没有对线程的执行顺序和操作做控制，所以运行该程序每次打印的值的顺序是不一样的 




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-thread-start-evenum.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-thread-print-eveandodd.png