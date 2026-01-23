---
title: 'WinForm开发之——字符串替换(4.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 10489dd6
date: 2020-07-16 23:27:53
---
## 一 概述

* 字符串的替换操作是指将字符串中指定的字符串替换成新字符串
* 在C#中替换字符串的方法是Replace方法

<!--more-->

## 二 实例<font size=4> 在 Main 方法中从控制台输入一个字符串，然后将字符串中所有的‘,’替换成‘_’ </font>

### 2.1 代码

```
 class Program
    {
        static void Main(string[] args)
        {
            string str = Console.ReadLine();
            if (str.IndexOf(",") != -1)
            {
                str = str.Replace(",","_");
            }
            Console.WriteLine("替换后的字符串为："+str);
        }
    }
```

### 2.2 执行结果
![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-string-replace-sample.png