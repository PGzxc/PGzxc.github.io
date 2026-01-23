---
title: 'WinForm开发之——获取字符串长度(4.2)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: f151f343
date: 2020-07-16 23:24:53
---
## 一 概述

* 字符串实际上是由多个字符组成的，字符串中的第一个字符使用字符串[0]即可得。[0]中的0称为下标
* 获取字符串中的第一个字符使用的下标是0，则字符串中最后一个字符的下标是字符串的长度减1
* C#语言如果要获取字符串的长度，使用Length属性即可`字符串.Length`

<!--more-->

## 二 实例

### 2.1 实例一<font size=2> 在 Main 方法中从控制台输入一个字符串，输出该字符串的长度，以及字符串中的第一个字符和最后一个字符。</font>

#### 2.1.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        string str = Console.ReadLine();
        Console.WriteLine("字符串的长度为：" + str.Length);
        Console.WriteLine("字符串中第一个字符为：" + str[0]);
        Console.WriteLine("字符串中最后一个字符为：" + str[str.Length - 1]);
    }
}
```

#### 2.1.1 执行结果
![][1]

### 2.2 实例二 <font size=2>在 Main 方法中从控制台输入一个字符串，并将字符串中的字符逆序输出</font> 

#### 2.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        string str = Console.ReadLine();
        for(int i = str.Length - 1; i >= 0; i--)
        {
            Console.WriteLine(str[i]);
        }
    }
}
```

#### 2.2.2 执行结果
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-string-length-sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-string-back-out-sample.png