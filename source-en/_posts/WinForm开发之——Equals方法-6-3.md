---
title: 'WinForm开发之——Equals方法(6.3)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 250f1dbd
date: 2020-07-21 20:34:55
---
## 一 概述

* C# Equals方法主要用于比较两个对象是否相等，如果相等则返回True，否则返回False
* 如果是引用类型的对象，则用于判断两个对象是否引用了同一个对象

<!--more-->

## 二 Equals方法

### 2.1 Equals方法

```
Equals (object ol, object o2); //静态方法
Equals (object o); //非静态方法
```

### 2.2 说明

* Equals方法提供了两个
* 一个是静态的，一个是非静态的

## 三 实例 <font size=3>使用Equals方法判断两个对象是否引用了Student对象</font>

### 3.1 代码

```
namespace code_1
{
    class Program
    {
        static void Main(string[] args)
        {
            Student stu1 = new Student();
            Student stu2 = new Student();
            bool flag = Equals(stu1,stu2);
            Console.WriteLine("stu1和sut2比较的结果为：{0}",flag);
        }
    }
    class Student { }
}
```

### 3.2 执行结果

![][1]

### 3.2 说明

* 从执行的结果可以看出，stu1和stu2引用的并不是同一个对象
* 如果将代码更改为`Student stu2=stu1`，这样使用Equals方法判断的结果为True



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-equals.png