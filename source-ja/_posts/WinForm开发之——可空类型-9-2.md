---
title: 'WinForm开发之——可空类型(9.2)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 19e496a0
date: 2020-07-22 21:58:28
---
## 一  概述

* 对于引用类型的变量来说，如果未对其赋值，在默认情况下是Null值，对于值类型的变量，如果未赋值，整型变量的默认值为0
* 但通过0判断该变量是否赋值了是不太准确的，C#语言中提供了一种泛型类型(即可空类型(System.Nullable\<T>))来解决值类型的变量在未赋值的情况下允许为Null的情况

<!--more-->

## 二 定义可空的语法形式

### 2.1 语法形式

```
System.Nullable<T> 变量名;
```

### 2.2 说明

* Nullable所在的命名空间System在C#类文件中默认是直接引入的，因此可以省略System，直接使用Nullable即可；

* T代表任意类型，例如定义一个存放int类型值的变量，代码如下

  ```
  Nullable<int> a;
  ```

* 将变量a的值设置为Null

  ```
  Nullable<int> a = Null;
  ```

* 除了使用上面的方法定义可空类型变量以外，还可以通过如下语句定义一个int类型的可空类型变量

  ```
  int? a
  ```

* int?等同于Nullable\<int>，此外，在使用可空类型时也可以通过HasValue属性判断变量值是否为Null值

## 三 实例 <font size=3> 分别创建一个 int 的可空类型变量和 double 的可空类型变量，并使用 HasValue 属性判断其值是否为空 </font>

### 3.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        int? i = null;
        double? d = 3.14;
        if (i.HasValue)
        {
            Console.WriteLine("i 的值为{0}", i);
        }
        else
        {
            Console.WriteLine("i 的值为空！");
        }
        if (d.HasValue)
        {
            Console.WriteLine("d 的值为{0}", d);
        }
        else
        {
            Console.WriteLine("d 的值为空！");
        }
    }  
}
```

### 3.2 说明

可空类型允许将值类型变量的值设置为Null，并可以通过HasValue属性判断其是否为Null值