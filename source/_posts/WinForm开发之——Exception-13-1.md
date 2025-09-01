---
title: 'WinForm开发之——Exception(13.1)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 8f328483
date: 2020-08-03 20:44:19
---
## 一 概述

* .NET Framework类库中的所有异常都派生于Exception类，异常包括系统异常和应用异常
* 默认所有系统异常都派生于System.SystemException，所有的应用程序异常派生于System.ApplicationException
* 系统异常包括OutOfMemmoryException、IOException、NullReferenceException

<!--more-->

## 二 异常类图

![][1]

## 三 常用系统异常表

|           **异常类**            |      **说明**       |
| :-----------------------------: | :-----------------: |
|   System.OutOfMemoryException   | 用 new 分配内存失败 |
|  System.StackOverflowException  |   递归过多、过深    |
|  System.NullReferenceException  |      对象为空       |
| Syetem.IndexOutOfRangeException |      数组越界       |
|   System.ArithmaticException    | 算术操作异常的基类  |
|  System.DivideByZeroException   |      除零错误       |





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-exception-struct.png