---
title: 'WinForm开发之——continue语句(2.12)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 4f4f4d9e
date: 2020-07-13 23:03:08
---
## 一 概述

* C#中的continue语句有点像break语句。但它不是强制终止，continue会跳过当前循环中的代码，强制开始下一次循环
* 对于for循环，continue语句会导致执行条件测试和循环增量部分。对于while和do while循环，continue语句会导致程序控制回到条件测试上
* continue语句必须再循环语句中使用

<!--more-->

## 二 示例(<font size=2> 使用 for 循环输出1~10的数，但是不输出 4 </font>)

### 2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        for(int i = 1; i <= 10; i++)
        {
            if (i == 4)
            {
                continue;
            }
            Console.WriteLine(i);
        }
    }  
}
```
### 2.2 结果

![][1]

### 2.3 说明

* 从上面的执行结果可以看出，当for循环中的值迭代到4时，continue语句结束了本次迭代，继续下一次迭代，因此在输出结果中没有4



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-continue-sample.png