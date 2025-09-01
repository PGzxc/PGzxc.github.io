---
title: 'WinForm开发之——类型转换方法(4.8)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: ed6f3ad8
date: 2020-07-17 22:34:45
---
## 一 概述

本文介绍数据类型转换中常用的方法

* Parse(字符串类型方法)
* Convert(数据类型转换)
* 装箱和拆箱（值类型和引用类型）

<!--more-->

## 二 Parse(字符串类型方法)

### 2.1 概念

* C# Parse方法用于将字符串类型转换成任意类型，具体的语法形式如下

  ```
  数据类型   变量二数据类型.Parse(字符串类型的值);
  ```
* 这里要求等号左、右两边的数据类型兼容

### 2.2 实例<font size=3> 在 Main 方法中从控制台输入 3 个数，并将其中的最大数输出 </font>

```
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("请输入三个数字");
        int num1 = int.Parse(Console.ReadLine());
        int num2 = int.Parse(Console.ReadLine());
        int num3 = int.Parse(Console.ReadLine());
        int maxvalue = num1;
        if (num2 > maxvalue)
        {
            maxvalue = num2;
        }
        if (num3 > maxvalue)
        {
            maxvalue = num3;
        }
        Console.WriteLine("三个数中最大的值是：" + maxvalue);
    }
}
```
### 2.3 总结

在上面的实例中使用Parse方法将字符串类型转换成整数类型int，但输入的字符串必须是数字并且不能超出int类型的取值范围

## 三 Convert(数据类型转换)

### 3.1 概念

* C# Convert方法是数据类型中最灵活的方法，它能够将任意数据类型的值转换成任意数据类型，前提是不要超出指定数据类型的范围，具体的语法形式如下

  ```
  数据类型  变量名 = convert.To数据类型(变量名);
  ```

* 这里Convert.To后面的数据类型要与等号左边的数据类型相匹配

### 3.2 常见的转换方法

|         方法         |            说明            |
| :------------------: | :------------------------: |
|  Convert.ToInt16()   |     转换为整型(short)      |
|  Convert.ToInt32()   |      转换为整型(int)       |
|  Convert.ToInt64()   |      转化为整型(long)      |
|   Convert.ToChar()   |     转换为字符型(char)     |
|  Convert.ToString()  |   转化为字符串型(string)   |
| Convert.ToDateTime() |   转换为日期型(datetime)   |
|  Convert.ToDouble()  | 转化为双精度浮点型(double) |
|  Convert.ToSingle()  | 转换为单精度浮点型(float)  |

* 对于整型和浮点型的强制数据类型操作也可以使用Convert方法代替，但是依然会损失存储范围大的数据类型的精度

### 3.3 实例<font size=3> 使用 Convert 方法将分别将一个浮点型数据转换成整型和字符串型 </font>

```
class Program
{
    static void Main(string[] args)
    {
         float num1 = 82.26f;
         int integer;
         string str;
         integer = Convert.ToInt32(num1);
         str = Convert.ToString(num1);
         Console.WriteLine("转换为整型数据的值{0}", integer);
         Console.WriteLine("转换为字符串{0},",str);
    }
}
```

## 四 装箱和拆箱（值类型和引用类型）

### 4.1 概念

* C# ToString方法用于将任意的数据类型转换成字符串类型，例如将整数类型转换成字符串类型，这样整型变量a即可被转换成字符串类型

  ```
  int a=100;
  string str=a.ToString();
  ```

* 在C#语言中数据类型分为值类型和引用类型，将值类型转换为引用类型的操作称为装箱，相应地将引用类型转换成值类型的称为拆箱

* 在上面的转换中int类型是值类型，而string类型是引用类型，当将值类型变量a的值转换成引用变量str时就是一个装箱的操作，而拆箱操作则是将引用类型变量str的值再转换成整型的过程，转换的代码如下，这样就完成了一个简单的装箱和拆箱操作

  ```
  a=int.Parse(str);
  ```

### 4.2 实例 <font size=2> 利用装箱和拆箱功能，可通过允许值类型的任何值与 Object 类型的值相互转换，将值类型与引用类型链接起来 </font>

```
 int val = 100;
 object obj = val;
 Console.WriteLine("对象的值={0}",obj);
 //这是一个装箱的过程，是将值类型转换为引用类型的过程
 int num = (int)obj;
 Console.WriteLine("num:{0}",num);
 //这是一个拆箱的过程，是将值类型转换为引用类型，再由引用类型转换为值类型的过程
```
