---
title: 'WinForm开发之——GetHashCode方法(6.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 3bf0db06
date: 2020-07-21 20:35:50
---
## 一 概述

* C# GetHashCode方法返回当前System.Object的哈希代码，每个对象的哈希值都是固定的
* 该方法不含有任何参数，并且 不是静态方法，因此需要使用实例来调用该方法
* 由于该方法是在Object类中定义的，因此任何对象都可以直接调用该方法

<!--more-->

## 二 实例 <font size=4>创建两个Student类的对象，并分别计算其哈希值</font>

### 2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        Student stu1 = new Student();
        Student stu2 = new Student();
        Console.WriteLine(stu1.GetHashCode());
        Console.WriteLine(stu2.GetHashCode());
    }
}
```

### 2.2 说明

* 从执行结果可以看出，不同实例的哈希值是不同的，因此也可以通过该方法比较对象是否相等