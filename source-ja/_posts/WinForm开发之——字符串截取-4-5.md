---
title: 'WinForm开发之——字符串截取(4.5)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: a566c233
date: 2020-07-16 23:28:56
---
## 一 概述

* 在一个字符串中截取一部分字符串也是经常使用到的，例如从身份证号码中取得出生年月日、截取手机号码的前3位、截取给定邮箱的用户名等

* 在C#语言中截取字符串的方法是Substring方法，在使用该方法时有以下两种方法传递参数

  ```
  Substring(指定位置); //从字符串中的指定位置开始截取到字符串结束
  Substring(指定位置, 截取的字符的个数); //从字符串中的指定位置开始截取指定字符个数的字符
  ```

<!--more-->

## 二 实例<font size=3> 在 Main 方法中从控制台输入邮箱，要求邮箱中仅含有一个 @，然后截取邮箱中的用户名输出 </font>

### 2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        string str = Console.ReadLine();
        int firstIndex = str.IndexOf("@");
        int lastIndex = str.LastIndexOf("@");
        if(firstIndex != -1 && firstIndex == lastIndex)
        {
            str = str.Substring(0, firstIndex);
        }
        Console.WriteLine("邮箱中的用户名是：" + str);
    }
}
```

### 2.2 执行结果
![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-string-substring-sample.png