---
title: 'WinForm开发之——多态(6.12)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 3ad25317
date: 2020-07-22 21:44:23
---
## 一  概述

* 在C#语言中多态称为运行时多态，也就是在程序运行时自动让父类的实例调用子类中重写的方法，它并不是在程序编译阶段完成的
* 使用继承实现多态，实际上是指子类在继承父类后，重写了父类的虚方法或抽象方法
* 在创建父类的对象指向每一个子类的时候，根据调用的不同子类中重写的方法产生了不同的执行结果

<!--more-->

## 二 多态的条件

总而言之，使用继承实现多态必须满足以下两个条件：

* 子类在继承父类时必须有重写的父类的方法
* 在调用重写的方法时，必须创建父类的对象指向子类(即子类转换而成父类)

## 三 实例 <font size=4> 根据不同层次（本科生、研究生）的学生打印出不同的专业要求 </font>

### 3.1 说明

 根据题目要求，创建专业信息的抽象类 (Major)，并在其中定义学号 (Id)、姓名 (Name)，以及打印专业要求的抽象方法 (Requirenwnt) 

### 3.2 代码

```
class Program
{
    static void Main(string[] args)
    {
        Major major1 = new Undergraduate();
        major1.Id = 1;
        major1.Name = "张晓";
        Console.WriteLine("本科生信息：");
        Console.WriteLine("学号：" + major1.Id + "姓名：" + major1.Name);
        major1.Requirement();
        
        Major major2 = new Graduate();
        major2.Id = 2;
        major2.Name = "李明";
        Console.WriteLine("研究生信息：");
        Console.WriteLine("学号：" + major2.Id + "姓名：" + major2.Name);
        major2.Requirement();
    }
}
abstract class Major
{
    public int Id { get; set; }
    public string Name { get; set; }
    public abstract void Requirement();
}
class Undergraduate :Major
{
    public override void Requirement()
    {
        Console.WriteLine("本科生学制4年，必须修满48学分");
    }
}
class Graduate : Major
{
    public override void Requirement()
    {
        Console.WriteLine("研究生学制3年，必须修满32学分");
    }
}
```

### 3.3 执行结果

![][1]

### 3.4 说明

从上面的执行效果可以看出，创建父类的实例指向了不同的子类，在程序运行时会自动调用子类中重写后的方法内容，显示出本科生和研究生的要求信息



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-duotai.png