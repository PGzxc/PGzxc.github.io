---
title: 'WinForm开发之——abstract类(6.9)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 57c90e43
date: 2020-07-21 20:40:47
---
## 一 概述

* C#中abstract关键字代表的是抽象的，使用该关键字能修饰类和方法
* 修饰的方法被称为抽象方法
* 修饰的类被称为抽象类

<!--more-->

## 二 抽象类的语法形式

### 2.1 abstract修饰抽象方法

```
访问修饰符  abstract  方法返回值类型  方法名(参数列表);
```
* abstract修饰抽象方法，是一种不带方法体的方法，仅包含方法的定义
* abstract用于修饰方法时，也可以将abstract放到访问修饰符的前面
* 抽象方法定义后面的`;`符号是必须保留的。需要注意的是，抽象方法必须定义在抽象类中
## 2.2 abstract修饰抽象类

```
访问修饰符  abstract class  类名
{
    //类成员
}
```

* 在定义抽象类时，若使用abstract修饰类，将其放到class关键字的前面
* 其中,abstract关键字也可以放到修饰符的前面
* 在抽象类中可以定义抽象方法，也可以定义非抽象方法
* 通常抽象类会被其他类继承，并重写其中的抽象方法或者虚方法

## 三 实例 <font size=3>创建抽象类ExamResult，并在类中定义数学(Math)、英语(English)成绩的属性，定义抽象方法计算总成绩</font>

### 3.1 代码

```
abstract class ExamResult
{
    //学号
    public int Id { get; set; }
    //数学成绩
    public double Math { get; set; }
    //英语成绩
    public double English { get; set; }
    //计算总成绩
    public abstract void Total();
}
class MathMajor : ExamResult
{
    public override void Total()
    {
        double total = Math * 0.6 + English * 0.4;
        Console.WriteLine("学号为" + Id + "数学专业学生的成绩为：" + total);
    }
}
class EnglishMajor : ExamResult
{
    public override void Total()
    {
        double total = Math * 0.4 + English * 0.6;
        Console.WriteLine("学号为" + Id + "英语专业学生的成绩为：" + total);
    }
}
class Program
{
    static void Main(string[] args)
    {
        MathMajor mathMajor = new MathMajor();
        mathMajor.Id = 1;
        mathMajor.English = 80;
        mathMajor.Math = 90;
        mathMajor.Total();
        EnglishMajor englishMajor = new EnglishMajor();
        englishMajor.Id = 2;
        englishMajor.English = 80;
        englishMajor.Math = 90;
        englishMajor.Total();
    }
}
```

### 3.2 执行结果

![][1]

### 3.3 说明

* 在实际应用中，子类仅能重写父类中的虚方法或者抽象方法
* 当不需要使用父类中方法的内容时，将其定义成抽象方法，否则将方法定义成虚方法



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-abstract.png