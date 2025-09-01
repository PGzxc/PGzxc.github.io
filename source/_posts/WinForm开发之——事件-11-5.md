---
title: 'WinForm开发之——事件(11.5)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: ec6f0f41
date: 2020-07-24 21:45:42
---
## 一 概述

* 在C#语言中，windows应用程序、ASP.NET网站程序等类型的程序都离不开事件的应用
* 事件是一种引用类型，实际上也是一种特殊的委托
* 通常，每一个事件的发生都会产生发送方和接收方，发送方是指引发事件的对象，接收方则是指获取、处理事件。事件要与委托一起使用

<!--more-->

## 二 事件定义的语法形式

```
访问修饰符  event  委托名  事件名 ;
```

* 在这里，由于在事件中使用了委托，因此需要在定义事件前先定义委托
* 在定义事件后需要定义事件所使用的方法，并 通过事件来调用委托

## 三 实例

### 3.1 实例一 <font size=4> 通过事件完成在控制台上输岀“Hello Event!”的操作 </font>

```
class Program
{
    //定义委托
    public delegate void SayDelegate();
    //定义事件
    public event SayDelegate SayEvent;
    //定义委托中调用的方法
    public void SayHello()
    {
        Console.WriteLine("Hello Event！");
    }
    //创建触发事件的方法
    public void SayEventTrigger()
    {
        //触发事件，必须与事件是同名方法
        SayEvent();
    }
    static void Main(string[] args)
    {
        //创建Program类的实例
        Program program = new Program();
        //实例化事件，使用委托指向处理方法
        program.SayEvent = new SayDelegate(program.SayHello);
        //调用触发事件的方法
        program.SayEventTrigger();
    }
}
```

### 3.2 实例二 <font size=4> 在事件中使用多播委托完成预定不同商品的操作 </font>

```
class Program
{
    static void Main(string[] args)
    {
        //创建MyEvent类的实例
        MyEvent myEvent = new MyEvent();
        //实例化事件，使用委托指向处理方法
        myEvent.BuyEvent += new MyEvent.BuyDelegate(MyEvent.BuyFood);
        myEvent.BuyEvent += new MyEvent.BuyDelegate(MyEvent.BuyCake);
        myEvent.BuyEvent += new MyEvent.BuyDelegate(MyEvent.BuyFlower);
        //调用触发事件的方法
        myEvent.InvokeEvent();
    }
}
class MyEvent
{
    //定义委托
    public delegate void BuyDelegate();
    //定义事件
    public event BuyDelegate BuyEvent;
    //定义委托中使用的方法
    public static void BuyFood()
    {
        Console.WriteLine("购买快餐！");
    }
    public static void BuyCake()
    {
        Console.WriteLine("购买蛋糕！");
    }
    public static void BuyFlower()
    {
        Console.WriteLine("购买鲜花！");
    }
    //创建触发事件的方法
    public void InvokeEvent()
    {
        //触发事件，必须和事件是同名方法
        BuyEvent();
    }
}
```