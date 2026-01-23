---
title: 'WinForm开发之——Mutex(14.8)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 4999b511
date: 2020-08-06 05:59:56
---
## 一 概述

* C#中Mutex类也是用于线程同步操作的类，例如，当多个线程同时访问一个资源时保证一次只能有一个线程访问资源
* 在Mutex类中，WaitOne()方法用于等待资源被释放，ReleaseMutex()方法用于释放资源
* WaitOne()方法在等待ReleaseMutex()方法执行结束后才会结束

<!--more-->

## 二 实例   <font size=5> 使用线程互斥实现每个车位每次只能停一辆车的功能 </font>

### 2.1 代码

```
class Program
{
    private static Mutex mutex = new Mutex();
    public static void PakingSpace(object num)
    {
        if (mutex.WaitOne())
        {
            try
            {
                Console.WriteLine("车牌号{0}的车驶入！", num);
                Thread.Sleep(1000);
            }
            finally
            {
                Console.WriteLine("车牌号{0}的车离开！", num);
                mutex.ReleaseMutex();
            }
        }
    }
    static void Main(string[] args)
    {
        ParameterizedThreadStart ts = new ParameterizedThreadStart(PakingSpace);
        Thread t1 = new Thread(ts);
        t1.Start("冀A12345");
        Thread t2 = new Thread(ts);
        t2.Start("京A00000");
    }
}
```

### 2.2 结果
![][1]

### 2.3 说明

 从上面的运行效果可以看出，每辆车驶入并离开后其他车才能占用停车位，即当一个线程占用资源时，其他线程是不使用该资源的 




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-thread-mutex-console.png