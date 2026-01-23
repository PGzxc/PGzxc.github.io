---
title: 'WinForm开发之——第一个C#程序(1.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: bed28476
date: 2020-07-07 22:52:37
---
## 一 概述

本文介绍第一个C#程序—控制台应用程序，控制台应用程序类似于DOS的界面中输入与输出的程序，是学习C#程序的基本语法最方便的程序。

<!--more-->

## 二 程序创建过程

* visual studio 2019中依次选择：文件——>新建——>项目，弹出如图所示的新建项目对话框(在语言列表中选择`C#`，并选择C#下的`控制台应用程序`)

  ![][1]
  
* 在配置新项目对话框中设置控制台程序相关信息(名称、位置)

  ![][2]
  
* 项目创建完成后的，项目结构及控制台程序如下

  ![][3]
  
* 点击run运行，结果正确输出

  ![][4]

## 三 程序说明

### 3.1 using System

*  **using** 关键字表明程序使用的是给定命名空间中的名称。例如，我们在程序中使用 **System** 命名空间，其中定义了类 Console。我们可以只写： 

  ```
  Console.WriteLine ("Hello World");
  ```

*  我们可以写完全限定名称，如下： 

  ```
  System.Console.WriteLine("Hello World");
  ```

### 3.2 命名空间namespace

*  命名空间的定义是以关键字 **namespace** 开始，后跟命名空间的名称，如下所示： 

  ```
  namespace namespace_name
  {
     // 代码声明
  }
  ```

*  **命名空间**的设计目的是提供一种让一组名称与其他名称分隔开的方式。在一个命名空间中声明的类的名称与另一个命名空间中声明的相同的类的名称不冲突 

### 3.3 class Program

* C#中使用class定义一个类，class后跟类的名字

### 3.4 Main入口文件

* Main是C#启动的入口文件

### 3.5 WriteLine控制台输出语句

* Console.WriteLIne用于向控制台输出字符串的内容




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio-2019-new-project-dialog.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio2019-project-console.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio2019-console-program.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio2019-first-run.png