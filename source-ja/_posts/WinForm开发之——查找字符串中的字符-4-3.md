---
title: WinForm开发之——查找字符串中的字符(4.3)
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: c808c368
date: 2020-07-16 23:26:25
---
## 一 概述

* 在字符串中查找是否含有某个字符串是常见的一个应用，例如在输入的字符串中查找特殊字符、获取某个字符串中的位置等
* 在C#中字符串的查找方法有IndexOf、LastIndexOf，IndexOf方法得到的是指定字符串在原字符串中第一次出现的位置，LastIndexOf方法得到的是指定字符串在查找的字符串中最后一次出现的位置
* 需要注意的是字符串中的每个字符的位置是从0开始的，只要指定的字符串在查找的字符串中不存在，结果都为-1

<!--more-->

## 二 示例

### 2.1 示例一 <font size=2> 在 Main 方法中从控制台输入一个字符串，然后判断字符串中是否含有 @, 并输出 @ 的位置 </font>

#### 2.1.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        string str = Console.ReadLine();
        if (str.IndexOf("@") != -1)
        {
            Console.WriteLine("字符串中含有@，其出现的位置是{0}", str.IndexOf("@") + 1);
        }
        else
        {
            Console.WriteLine("字符串中不含有@");
        }
    }
}
```

#### 2.1.2 执行结果
![][1]

### 2.2 示例二 <font size=2> 在 Main 方法中从控制台输入一个字符串，判断该字符串中是否仅含有一个 @ </font>

#### 2.2.1 分析

根据题目要求，使用 IndexOf 方法查找第一个 @ 出现的位置与使用 LastlndexOf 方法查找 @ 在字符串中最后一次出现的位置相同即可，实现的代码如下 

#### 2.2.2 代码

```
class Program
{
    static void Main(string[] args)
    {
        string str = Console.ReadLine();
        int firstIndex = str.IndexOf("@");
        int lastIndex = str.LastIndexOf("@");
        if(firstIndex != -1)
        {
            if (firstIndex == lastIndex)
            {
                Console.WriteLine("在该字符串中仅含有一个@");
            }
            else
            {
                Console.WriteLine("在该字符串中含有多个@");
            }
        }
        else
        {
            Console.WriteLine("在该字符串中不含有@");
        }
    }
}
```

#### 2.2.3 执行结果
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-string-index-position.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-string-index-lastindex-sample.png