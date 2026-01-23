---
title: 'WinForm开发之——ToString方法(6.6)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 360c6b6
date: 2020-07-21 20:37:40
---
## 一 概述

* C#中ToString方法返回一个对象实例的字符串，在默认情况下将返回类类型的限定名
* C#中几乎所有的类型都派生自Object，所以如果当前类型没有重写ToString()方法的情况下，调用ToString()方法，默认返回当前类型的名称
* 任何类型都可以重写ToString方法，返回自定义的字符串
* 对于其他的值类型，则为将值转换为字符串类型的值

<!--more-->

## 二 实例 <font size=2>创建整数类型的变量以及Object类的对象，并分别使用ToString方法获取其字符串的表现形式并输出</font>

### 2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        Int32 a = 1;
        Object b = new Object();
        Console.WriteLine("值类型(Int32类型)的字符串的表现形式:{0}", a.ToString());
        Console.WriteLine("引用类型字符串的表现形式:{0}", b.ToString());
    }
}
```

### 2.2 执行结果

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-tostring.png