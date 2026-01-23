---
title: 'WinForm开发之——Random类(3.17)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 189d8f8f
date: 2020-07-15 22:58:47
---
## 一 概述

C# Random类是一个产生伪随机数字的类，它的构造函数有两种

```
new Random();
new Random(Int32);
```
<!--more-->

## 二 随机数

* 前者是根据触发那刻的系统时间做种子，来产生一个随机数字，后者可以自己设定触发的种子，一般都是用 unchecked((int)DateTime.Now.Ticks) 做为参数种子 
* 因此，如果计算机运行速度很快，如果触发Random函数间隔时间很短，就有可能造成产生一样的随机数，因为伪随机的数字，在Random的内部产生机制中还有一定规律，并非是真正意义上的完全随机
*  Random 类中提供的 Next、NextBytes 以及 NextDouble 方法可以生成整数类型、byte 数组类型以及双精度浮点型的随机数，详细说明如下表所示 

  |             **方法**              |                      **描述**                       |
  | :-------------------------------: | :-------------------------------------------------: |
  |              Next()               |            每次产生一个不同的随机正整数             |
  |        Next(int max Value)        |            产生一个比max Value小的正整数            |
  | Next(int min Value,int max Value) | 产生一个minValue~maxValue的正整数，但不包含maxValue |
  |           NextDouble()            |               产生一个0.0~1.0的浮点数               |
  |     NextBytes(byte[]  buffer)     |            用随机数填充指定字节数的数组             |

## 三 实例

 分别使用 Next、NextDouble 以及 NextBytes 方法生成随机数。 

### 3.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        Random rd = new Random();
        Console.WriteLine("产生一个10以内的数：{0}", rd.Next(0, 10));
        Console.WriteLine("产生一个0到1之间的浮点数：{0}", rd.NextDouble());
        byte[] b = new byte[5];
        rd.NextBytes(b);
        Console.WriteLine("产生的byte类型的值为：");
        foreach(byte i in b)
        {
            Console.Write(i + " ");
        }
        Console.WriteLine();
    }
}
```

### 3.2 执行结果
![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-random-sample.png