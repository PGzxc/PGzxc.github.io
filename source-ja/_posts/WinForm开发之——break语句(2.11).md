---
title: 'WinForm开发之——break语句(2.11)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 16bc7507
date: 2020-07-13 23:02:22
---
## 一 概述

* C#break语句用于中断循环，使循环不再执行。如果是多个循环语句嵌套使用，则break语句跳出的则是最内层循环
* 上面讲到的C# switch case语句一节中用到的break语句，用于退出switch语句

<!--more-->

## 二 示例(<font size=2> 使用 for 循环输出 1~10 的数，当输出到 4 时结束循环 </font>)

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
                break;
            }
            Console.WriteLine(i);
        }
    }  
}
```
### 2.2 结果
![][1]
### 2.3 说明

从执行结果可以看出，for循环要完成1~10的输出，但是当输出到4时使用了break语句，结束了for循环，因此仅将输出了1~3的数



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-break-sample.png