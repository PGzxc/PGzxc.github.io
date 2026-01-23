---
title: 'WinForm开发之——方法重载(3.9)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: e65a7ba3
date: 2020-07-15 22:31:30
---
## 一 概述

* C#构造方法时可以定义带0到多个参数的构造方法，但是构造方法的名称必须是类名。实际上，这是一个典型的方法重载，即方法名称相同、参数列表不同
* 参数列表不同主要体现在参数个数或参数的数据类型不同。在调用重载的方法时系统是根据所传递参数的不同判断调用的是哪个方法

<!--more-->

## 二 实例

### 2.1 实例一

 创建一个名为 SumUtils 的类，在类中分别定义计算两个整数、两个小数、 两个字符串类型的和，以及从 1 到给定整数的和。在 Main 方法中分别调用定义好的方法 

####  2.1.1代码
##### SumUtils 
```
class SumUtils
{
    public int Sum(int a,int b)
    {
        return a + b;
    }
    public double Sum(double a,double b)
    {
        return a + b;
    }
    public string Sum(string a,string b)
    {
        return a + b;
    }
    public int Sum(int a)
    {
        int sum = 0;
        for(int i = 1; i < a; i++)
        {
            sum += i;
        }
        return sum;
    }
}
```
##### Main方法调用

```

class Program
{
    static void Main(string[] args)
    {
        SumUtils s = new SumUtils();
        //调用两个整数求和的方法
        Console.WriteLine("两个整数的和为：" + s.Sum(3, 5));
        //调用两个小数求和的方法
        Console.WriteLine("两个小数的和为：" + s.Sum(3.2, 5.6));
        //调用两个字符串连接的方法
        Console.WriteLine("连个字符串的连接结果为：" + s.Sum("C#", "方法重载"));
        //输出 1 到 10 的和
        Console.WriteLine("1 到 10 的和为：" + s.Sum(10));
    }
}
```

#### 2.1.2 执行结果

![][1]

### 2.2 实例二

 定义一个 SayHello 的类，在类中分别定义 3 个构造方法，一个是不带参数 的构造方法，用于打印“Hello”； 一个是带一个参数的构造方法传递一个用户名，用于打 印“Hello Army”(Army 为传入的用户名)；一个是带两个参数的构造方法传递一个用户名 和年龄，用于打印“Hello Army,20”(Army 为传入的用户名、20 为传入的年龄)。在 Main 方法中使用不同的构造器创建 SayHello 类的对象 

#### 2.2.1 代码

#####  SayHello 

```
class SayHello
{
    public SayHello()
    {
        Console.WriteLine("Hello");
    }
    public SayHello(string name)
    {
        Console.WriteLine("Hello " + name);
    }
    public SayHello(string name, int age)
    {
        Console.WriteLine("Hello " + name + "，" + age);
    }
```

#####  Main 

```
class Program
{
    static void Main(string[] args)
    {
        SayHello say1 = new SayHello();
        SayHello say2 = new SayHello("小明");
        SayHello say3 = new SayHello("张三", 20);
    }
}
```

#### 2.2.2 执行结果

![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-func-overload-sum.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-func-overload-sayhello.png