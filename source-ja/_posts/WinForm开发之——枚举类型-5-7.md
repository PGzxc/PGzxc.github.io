---
title: 'WinForm开发之——枚举类型(5.7)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: dc465777
date: 2020-07-21 20:30:24
---
## 一 概述

* C#枚举类型和结构体类型都是特殊的值类型，应用也比较广泛
* 枚举类型与数组比较接近，它可以将一组值存放到一个变量名下，方便调用
* 枚举类型是一种值类型，定义好的值会存放到栈中
* 枚举类型在定义时使用enum关键字，枚举类型的定义与类成员的定义是一样的，或者直接定义在命名空间中

<!--more-->

## 二 枚举类型语法形式

### 2.1 语法形式

```
访问修饰符  enum  变量名 : 数据类型
{
    值l,
    值2,
}
```

### 2.2 说明

#### 2.2.1 访问修饰符

* 与类成员的访问修饰符一样，省略访问修饰符也是代表使用private修饰符的

#### 2.2.2 数据类型

* 枚举中的数据类型，只能是整数类型，包括byte、short、int、long

#### 2.2.3 值1、值2...

* 值1、值2，是在枚举类型中显示的值，但实际上每个值都被自动赋予了一个整数类型值，并且值是自动增加1的，默认是从0开始的
* 如果不需要系统自动为枚举值指定值，也可以直接为其赋一个整数值
* 每个没有指定值的枚举值，它的初始值都是上一个枚举类型的值加1
* 通常设置的枚举值都是不同的，其整数值也是不同的

## 三 实例

### 3.1 <font size=3> 创建类 EnumTest,在该类中定义一个枚举类型存放教师职称（助教、讲师、副教授、教授）。在 Main 方法中分别打印出每个枚举值对应的整数值 </font>

#### 3.1.1 代码

```
class EnumTest
{
    public enum Title : int
    {
        助教,
        讲师,
        副教授,
        教授
    }
}
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine(EnumTest.Title.助教 + "：" + (int)EnumTest.Title.助教);
        Console.WriteLine(EnumTest.Title.讲师 + "：" + (int)EnumTest.Title.讲师);
        Console.WriteLine(EnumTest.Title.副教授 + "：" + (int)EnumTest.Title.副教授);
        Console.WriteLine(EnumTest.Title.教授 + "：" + (int)EnumTest.Title.教授);
    }
}
```

 #### 3.1.2 输出结果

![][1]

#### 3.1.3 说明

* 从上面的代码可以看出，由于枚举类型定义的类与Main方法所在的类不同，因此如果要使用该枚举值，需要使用"类名.枚举变量名"表示
* 获取枚举类型中设置的值使用的语句是"类名.枚举变量名.枚举值"，在获取枚举类型中的每个枚举值对应的整数值时需要将枚举类型的字符串值强制转换成整型
* 从结果可以看出，由于没有给枚举值设置初始的整数值，初始的整数值是从0开始的，并且一次递增1

#### 3.1.4 为枚举赋值

```
class EnumTest
{
    public enum Title : int
    {
        助教=1,
        讲师,
        副教授=4,
        教授
    }
}
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-enum-teacher.png