---
title: 'WinForm开发之——一维数组(5.2)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 12c92365
date: 2020-07-20 21:30:53
---
## 一 概述

一位数组在数组中最常见，即将一组值存放到一个数组中，并为其定义一个名称，通过数组中元素的位置类存取值

<!--more-->

## 二 一维数组的赋值

### 2.1 赋值语法

```
//定义数组
数据类型[]  数组名
```

### 2.2 初始数组中的元素

```
//初始化数组中的元素
数据类型[]  数组名 = new  数据类型[长度];
数据类型[]  数组名 = {值 1, 值 2, ...}
数据类型[]  数组名 = new  数据类型[长度]{值 1，值 2,...}
```

### 2.3 概念

* 在定义数组时定义的数据类型代表了数组中每个元素的数据类型
* 在使用数组前必须初始化数据，即为数组赋初值
* 在初始化数组时指定了数组中的长度，也就是数组中能存放的元素个数
* 在指定数组的长度后，数组中的元素会被系统自动赋予初始值，与类中字段的初始化类似，数值类型的值为0、引用类型的值为null
* 如果在初始化数组中直接对数组赋值了，那么数组中值的个个数就是数组的长度
* 由于在数组中存放了多个元素，在存取数组中的元素时要使用下标来存取，类似于取字符串中的字符

### 2.4 举例<font size=3> 例如有一个 int 类型的数组，输出数组中的第一个元素和最后一个元素 </font>

```
//定义 int 类型的数组
int[] a = {1,2,3};
//输岀数组中的一个元素
Console.WriteLine(a[0]);
//输出数组中的最后一个元素
Console.WriteLine(a[a.Length-1]);
```

## 三 实例

### 3.1 实例一 <font size=3> 在 Main 方法中创建一个字符串类型的数组，并存入 5 个值，然后将数组中下标是偶数的元素输出 </font>

#### 代码

```
class Program
{
    static void Main(string[] args)
    {
        string[] strs = { "aaa", "bbb", "ccc", "ddd", "eee" };
        for(int i = 0; i < strs.Length; i = i + 2)
        {
            Console.WriteLine(strs[i]);
        }
    }
}
```

#### 3.2 实例二 <font size=3> 在 Main 方法中创建 int 类型数组，并从控制台输入 5 个值存入该数组中，最后将数组中的最大数输出 </font>

#### 代码

```
class Program
{
    static void Main(string[] args)
    {
        int[] a = new int[5];
        Console.WriteLine("请输入5个整数：");
        for(int i = 0; i < a.Length; i++)
        {
            a[i] = int.Parse(Console.ReadLine());//将字符串类型转换成整型
        }
        int max = a[0];//这里假设a[0]是最大的
        for(int i = 1; i < a.Length; i++)
        {
            if (a[i] > max)
            {
                max = a[i];
            }
        }
        Console.WriteLine("数组中最大值为：" + max);
    }
}
```
