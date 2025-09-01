---
title: 'WinForm开发之——Split(5.5)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: ce0102f5
date: 2020-07-20 21:41:49
---
## 一 概述

C#中split方法用于按照指定的字符串来拆分原有字符串，并返回拆分后得到的字符串数组

<!--more-->

## 二 实例

### 2.1 实例一 <font size=2> 在 Main 方法中从控制台输入一个字符串，然后计算该字符串中包含的逗号的个数 </font>

#### 2.1.1 代码

```
class Program
{
   static void Main(string[] args)
   {
      Console.WriteLine("请输入一个字符串，并用逗号分隔：");
      string str = Console.ReadLine();
      string[] result = str.Split(",");
      Console.WriteLine("分隔后的字符串为：");
      foreach (string s in result)
      {
            Console.Write(s+" ");
      }
   }
}
```

#### 2.1.2 执行结果

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-split-sample.png