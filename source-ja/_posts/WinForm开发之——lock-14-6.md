---
title: 'WinForm开发之——lock(14.6)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: ef125cbc
date: 2020-08-06 05:56:30
---
## 一 概述

* 虽然Sleep方法能控制线程的暂停时间，从而改变多个线程之间的先后顺序，但每次调用线程的结果是随机的
* 线程同步的方法是将线程资源共享，允许控制每次执行一个线程，并交替执行每个线程
* 在C#语言中实现线程同步可以使用lock关键字和Monitor类、Mutex类来解决
* 对于线程同步操作最简单的一种方式就是使用lock关键字，通过lock关键字能保证加锁的线程只有在执行完成后才能执行其他线程

<!--more-->

## 二 lock语法形式

### 2.1 语法形式

```
lock(object)
{
    //临界区代码
}
```

### 2.2 说明

* 这里lock后面通常是一个Object类型的值，也可以使用this关键字来表示

* 最好是在lock中使用私有的非静态或负变量或私有的静态成员变量，即使用private或private static修饰的成员

  ```
  private Object obj = new Object();
  lock (obj)
  {
      //临界区代码
  }
  ```

## 三 实例 <font size=5> 创建控制台应用程序，使用 lock 关键字控制打印奇数和偶数的线程，要求先执行奇数线程，再执行偶数线程 </font>

### 3.1 代码

```
class Program
{
    public void PrintEven()
    {
        lock (this)
        {
            for(int i = 0; i <= 10; i = i + 2)
            {
                Console.WriteLine(Thread.CurrentThread.Name + "--" + i);
            }
        }
    }
    public void PrintOdd()
    {
        lock (this)
        {
            for(int i = 1; i <= 10; i = i + 2)
            {
                Console.WriteLine(Thread.CurrentThread.Name + "--" + i);
            }
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



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-thread-print-lock.png