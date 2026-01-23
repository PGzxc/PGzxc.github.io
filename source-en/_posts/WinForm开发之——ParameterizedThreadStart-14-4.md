---
title: 'WinForm开发之——ParameterizedThreadStart(14.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: ffc97c6c
date: 2020-08-06 05:54:59
---
## 一 概述

在C#语言中使用ParameterizedThreadStart创建进程，首先需要创建ParameterizedThreadStart委托的实例，然后再创建Thread类的实例

```
ParameterizedThreadStart pts=new ParameterizedThreadStart( 方法名 );
Thread t=new Thread(pts);
```

<!--more-->

## 二 实例 

### 2.1 实例一 <font size=5> 创建一个方法输出0〜n的所有偶数，使用 ParameterizedThreadStart 委托调用该方法，并启动打印偶数的线程 </font>

#### 2.1.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        ParameterizedThreadStart pts = new ParameterizedThreadStart(PrintEven);
        Thread t = new Thread(pts);
        t.Start(10);
    }
    //打印0~n中的偶数
    private static void PrintEven(Object n)
    {
        for(int i=0;i<=(int)n; i = i + 2)
        {
            Console.WriteLine(i);
        }
    }
}
```

#### 2.1.2 效果图
![][1]

#### 2.1.3 说明

* 在使用ParameterizedThreadStart委托调用带参数的方法时，方法中的参数只能是object类型并且只能含有一个参数
* 在启动线程时要在线程的Start()方法中为委托的方法传递参数
* 如果需要通过ParameterizedThreadStart委托引用多个参数的方法，由于委托方法中的参数是object类型的，传递多个参数可以通过类的实例来实现

### 2.2 实例二 <font size=4> 创建一个方法输出指定范围内数值的偶数，并创建线程调用该方法 </font>

#### 2.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        ParameterizedThreadStart pts = new ParameterizedThreadStart(PrintEven);
        ParameterTest pt = new ParameterTest(1, 10);
        Thread t = new Thread(pts);
        t.Start(pt);
    }
    private static void PrintEven(Object n)
    {
        //判断n是否为ParameterTest 类的对象
        if(n is ParameterTest)
        {
            int beginNum = ((ParameterTest)n).beginNum;
            int endNum = ((ParameterTest)n).endNum;
            for(int i = beginNum; i <= endNum; i++)
            {
                if (i % 2 == 0)
                {
                    Console.WriteLine(i);
                }
            }
        }
    }
}
public class ParameterTest
{
    public int beginNum;
    public int endNum;
    public ParameterTest(int a,int b)
    {
        this.beginNum = a;
        this.endNum = b;
    }
}
```

#### 2.2.2 效果图
![][2]

#### 2.2.3 说明

*  运行该程序，在控制台上将输出 1〜10 的偶数，即2、4、6、8、10 
*  从代码可以看出，通过为 ParameterTest 类中的字段赋值，并将其通过线程的 Start 方法传递给委托引用的方法 PrintEven，即可实现在委托引用的方法中传递多个参数的操作 



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-parameterized-threadstart-even.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-parameterized-threadstart-more-param.png