---
title: 'WinForm开发之——Monitor(14.7)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: a24642fb
date: 2020-08-06 05:58:16
---
## 一 概述

在C#中Monitor类的命名空间是System.Threading，它的用法比lock的用法要复杂一些，但本质是一样的

<!--more-->

## 二 语法形式

```
Monitor.Enter(object);
try
{
    //临界区代码
}
finally
{
    Monitor.Exit(object);
}
```

* 在这里，object的值与lock的值是一样的
* 简而言之，lock的写法是Monitor的一种简写

## 三  实例 <font size=4> 将上一节C# lock实例中的 lock 关键字替换成 Monitor 类 </font>

### 3.1 代码

```
class Program
{
    public void PrintEven()
    {
        Monitor.Enter(this);
        try
        {
            for(int i = 0; i <= 10; i = i + 2)
            {
                Console.WriteLine(Thread.CurrentThread.Name + "--" + i);
            }
        }
        finally
        {
            Monitor.Exit(this);
        }
    }
    public void PrintOdd()
    {
        Monitor.Enter(this);
        try
        {
            for(int i = 1; i <= 10; i = i + 2)
            {
                Console.WriteLine(Thread.CurrentThread.Name + "--" + i);
            }
        }
        finally
        {
            Monitor.Exit(this);
        }
    }
    static void Main(string[] args)
    {
        Program program = new Program();
        ThreadStart ts1 = new ThreadStart(program.PrintOdd);
        Thread t1 = new Thread(ts1);
        t1.Name = "打印奇数的线程";
        t1.Start();
        ThreadStart ts2 = new ThreadStart(program.PrintEven);
        Thread t2 = new Thread(ts2);
        t2.Name = "打印偶数的线程";
        t2.Start();
    }
}
```

### 3.2 效果

![][1]

### 3.3 说明

* Monitor类的用法虽然比lock关键字复杂，但其能添加等待获得锁定的超时值，这样就不会无限期等待获得对象锁
* 使用TryEnter()方法可以给它传送一个超时值，决定等待获得对象锁的最常时间
* 使用TryEnter()方法设置获得对象锁的时间的代码如下， 该方法能在指定的毫秒数内结束线程，这样能避免线程之间的死锁现象 

  ```
  Monitor.TryEnter(object, 毫秒数 );
  ```

*  此外，还能使用 Monitor 类中的 Wait() 方法让线程等待一定的时间，使用 Pulse() 方法通知处于等待状态的线程 





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-thread-monitor-console.png