---
title: 'WinForm开发之——sealed(6.10)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 6a5ebad3
date: 2020-07-21 20:41:47
---
## 一 概述

* C#中seal关键字的含义是密封的，使用该关键字能修饰类或者类中的方法，修饰的类被称为密封类、修饰的方法被称为密封方法
* 但是，密封方法必须出现在子类中，并且是子类重写的父类方法， 即 sealed 关键字必须与 override 关键字一起使用 
*  密封类不能被继承，密封方法不能被重写。在实际应用中，在发布的软件产品里有些类或方法不希望再被继承或重写，可以将其定义为密封类或密封方法 

<!--more-->

## 二 实例 <font size=3> 创建一个计算面积的抽象类 AreaAbstract ,并定义抽象方法计算面积 </font>

### 2.1 代码

```
abstract class AreaAbstract
{
    public abstract void Area();
}
class Rectangle : AreaAbstract
{
    public double Width { get; set; }
    public double Length { get; set; }
    public sealed override void Area()
    {
        Console.WriteLine("矩形的面积是：" + Width * Length);
    }
}
sealed class Circle : AreaAbstract
{
    public double r { get; set; }
    public override void Area()
    {
        Console.WriteLine("圆的面积是：" + r * 3.14 * 3.14);
    }
}
```

### 2.2 说明

*  在上面的实例中，Circle 类不能被继承，Rectangle 类中的 Area 方法不能被重写 