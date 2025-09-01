---
title: 'WinForm开发之——while循环(2.9)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: '87168817'
date: 2020-07-13 23:00:14
---
## 一 概述

C# while循环与for循环类似，但是while循环一般适用于不固定次数的循环

<!--more-->

## 二 while 循环语法形式

### 2.1 语法形式

```
while(布尔表达式)
{
    语句块;
}
```

* while 语句执行的过程是，当while中布尔表达式的结果为True时，执行语句块中的内容，否则不执行。
* 通常使用for循环可以操作的语句都可以使用while循环完成

## 三 示例(<font size=2> 使用 while 循环输出 1~10 的数并输出 1~10 的和 </font>)
### 3.1 代码
```
class Program
{
    static void Main(string[] args)
    {
        int i = 1;
        int sum = 0;//存放1~10的和
        while (i <= 10)
        {
            sum = sum + i;
            Console.WriteLine(i);
            i++;
        }
        Console.WriteLine("1~10的和为：" + sum);
    }  
}
```

### 3.2 结果

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-while-sample.png