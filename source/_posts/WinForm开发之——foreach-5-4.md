---
title: 'WinForm开发之——foreach(5.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 191b1627
date: 2020-07-20 21:38:26
---
## 一 概述

* C#中foreach循环用于列举出集合中所有的元素，foreach语句中的表达式由关键字in隔开的两个项组成
* in右边的项是集合名，in左边的项是变量名，用来存放该集合中的每个元素
* 该循环的运行过程如下：每一次循环时，从集合中取出一个新的元素值。放到只读变量中去，如果括号中的整个表达式返回值为true，foreach块中的语句就能够执行
* 一旦集合中的元素都已经被访问到，整个表达式的值为false，控制流程就转入到foreach块后面的执行语句

<!--more-->

## 二 foreach语法形式

### 2.1 语法形式

```
foreach(数据类型  变量名  in  数组名)
{
    //语句块；
}
```

### 2.2 说明

* foreach语句经常与数组一起使用，在C#语言中提供了foreach语句遍历数组中的元素
* 这里变量的数据类型必须与数组的数据类型相兼容
* 在foreach循环中，如果要输出数组中的元素，不需要使用数组中的下标，直接输出变量名即可
* foreach语句仅能用于数组、字符串或集合类型数据类型

## 三 实例<font size=2> 在 Main 方法中创建一个 double 类型的数组，并在该数组中存入 5 名学生的考试成绩，计算总成绩和平均成绩 </font>

### 3.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        double[] points = { 80, 88, 86, 90, 75.5 };
        double sum = 0;
        double avg = 0;
        foreach(double point in points)
        {
            sum = sum + point;
        }
        avg = sum / points.Length;
        Console.WriteLine("总成绩为：" + sum);
        Console.WriteLine("平均成绩为：" + avg);
    }
}
```

### 3.2 执行结果

![][1]

### 3.3 说明

* 从上面的执行结果可以看出，在使用foreach语句时，可以免去使用下标的麻烦，这也给变脸数组中的元素带来很多方便



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-foreach-sample.png