---
title: 'WinForm开发之——泛型类(9.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 489931fc
date: 2020-07-22 22:01:10
---
## 一 概述

* C#语言中泛型类的定义与泛型方法类似，是在泛型方法的名称后面加上\<T>\
* 当然，也可以定义多个类型，即"\<T1,T2,...>"

<!--more-->

## 二 泛型类的语法形式

### 2.1 语法形式

```
class 类名<T1,T2,…>
{
    //类的成员
}
```

*  这样，在类的成员中即可使用 T1、T2 等类型来定义 

## 三 实例  <font size=4>定义泛型类，并在泛型类中定义数组，提供添加和显示数组中全部元素的 方法</font> 

### 3.1 代码

```
lass MyTest<T>
{
    private T[] items = new T[3];
    private int index = 0;
    //向数组中添加项
    public void Add(T t)
    {
        if (index < 3)
        {
            items[index] = t;
            index++;
        }
        else
        {
            Console.WriteLine("数组已满！");
        }
    }
    //读取数组中的全部项
    public void Show()
    {
        foreach(T t in items)
        {
            Console.WriteLine(t);
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        MyTest<int> test = new MyTest<int>();
        test.Add(10);
        test.Add(20);
        test.Add(30);
        test.Show();
    }
}
```

