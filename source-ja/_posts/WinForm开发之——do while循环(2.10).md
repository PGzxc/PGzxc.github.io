---
title: 'WinForm开发之——do while循环(2.10)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: a0e871a5
date: 2020-07-13 23:01:38
---
## 一 概述

C# do while循环可以说时C# while循环的另一个版本，与while循环最大的区别是它至少会执行一次

<!--more-->

## 二 do while 语法形式

### 2.1 语法形式

```
do
{
    语句块；
}while(布尔表达式);
```

* do while语句执行的过程是，先执行do{}中语句块的内容，再判断while()中布尔表达式的值是否为True，如果为True，则继续执行语句块中的内容，否则不执行，因此do while语句中的语句块至少会执行一次

## 三 示例
### 3.1 <font size=2>使用 do while 循环输出 1~10 的数 </font>
#### 代码
```
class Program
{
    static void Main(string[] args)
    {
        int i = 1;
        do
        {
            Console.WriteLine(i);
            i++;
        } while (i <= 10);
    }  
}
```

### 3.2 <font size=2> 从控制台输入一个数，分别使用 while 和 do while 语句完成从 1 到所输入数的输出 </font>

#### 代码

```
//while循环
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("请输入一个整数：");
        int i = int.Parse(Console.ReadLine());
        int j = 1;
        while (j < i)
        {
            Console.WriteLine(j);
        }
    }  
}
//do while循环
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("请输入一个整数：");
        int i = int.Parse(Console.ReadLine());
        int j = 1;
        do
        {
            Console.WriteLine(j);
        } while (j < i);
    }  
}
```