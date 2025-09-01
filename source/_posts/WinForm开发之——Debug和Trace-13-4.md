---
title: 'WinForm开发之——Debug和Trace(13.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: fe6e82a2
date: 2020-08-03 20:48:40
---
## 一 概述

* 在C#语言中允许在程序运行时输出程序的调试信息，类似于使用Console.WriteLine的方式向控制台输出信息
* 所谓调试信息是程序员在程序运行时需要获取的程序运行的过程，以便于程序员更好地解决程序中出现的问题，这种调试也被称为非中断调试

<!--more-->

## 二 调试信息格式

输出调试信息的类保存在System.Diagnostics命名空间中，通常用Debug类或Trace类实现调试时输出调试信息，具体的语句如下：

```
Debug.WriteLine();
Trace.WriteLine();
```

其中，Debug.WriteLine()是在调试模式下使用 ;Trace.WriteLine除了可以在调试模式下使用，还可以用于发布的程序中

## 三 实例  <font size=5> 创建一个字符串类型的数组，在数组中存入从控制台输入的值，并输出每次向数组中存入的值 </font>

### 3.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        string[] str = new string[5];
        Debug.WriteLine("开始向数组中存值：");
        for(int i = 0; i < str.Length; i++)
        {
            str[i] = Console.ReadLine();
            Debug.WriteLine("存入的第{0}个值为{1}", i, str[i]);
        }
        Debug.WriteLine("向数组中存值结束！");
    }
}
```

### 3.2  Debug 类输出的信息(即时窗口)
![][1]

### 3.3 说明

* 从输出窗口的内容可以看出，通过Debug类所打印的内容全部显示在该窗口中
* 使用Trace类也能完成同样的效果，只需要将上述代码中的Debug类换成Trace类即可
*  提示：Trace 类的 WriteLine 方法中的参数不支持上述代码中 Debug 类的 WriteLine 方法的参数形式，只能传递字符串 
*  需要注意的是当程序在 Debug 状态下执行时使用 Debug 类打印的信息才会在输出窗口中显示，在 Release 状态下执行时只有 Trace 类输出的内容才会显示在输出窗口中 

## 四 切换Debug和Release

默认情况下，visual studio 2019中的执行方式是Debug， 如果需要更改为其他状态, 可以在其下拉列表框中选择 Release 方式，并且在一个解决方案中不同的项目可以选择不同的执行方法 

 在上图中 Debug 处的下拉列表框中选择“配置管理器”选项，弹出如下图所示的对话框 
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-trace-debug-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-debug-trace-change.png
