---
title: 'WinForm开发之——字符串插入(4.6)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: dfe0c20e
date: 2020-07-16 23:30:02
---
## 一 概述

* 在一个字符串中可以再指定位置插入另一个字符串，在C#中插入字符串使用的是Insert方法
* 在Insert方法中需要两个参数，一个是字符串插入的位置，一个是字符串

<!--more-->

## 二 实例 <font size=3> 在 Main 方法中从控制台输入一个字符串，然后将‘@@@’插入到字符串的第 2 个字符的位置 </font>

### 2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        string str = Console.ReadLine();
        str = str.Insert(1, "@@@");
        Console.WriteLine("新字符串为：" + str);
    }
}
```

### 2.2 执行结果
![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-string-insert-sample.png