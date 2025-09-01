---
title: WinForm开发之——.NET Framework是什么(1.2)
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 35f0d1c4
date: 2020-07-07 22:49:41
---
## 一  概述

.NET Framework是一个可以快速开发、部署网站服务及应用程序的开发平台，是Windows中的一个组件，包括公共语言运行时(Commond Language Runtime,CLR)虚拟机执行系统和.NET Framework类库

<!--more-->

## 二 .NET Framework的特点

* 提供标准的面向对象开发环境。用户不仅可以在本地与对象交互，还可以通过Web Service和.NET Remoting技术进行远程交互
* 提供优化的代码执行环境，具有良好的版本兼容性，并允许在同一台计算机上安装不同版本的.NET Framework
* 使用JIT(just In Time)技术，提供代码的运行速度

## 三 体系结构

### 3.1 .NET Framework的体系结构如下图所示：

![][1]
### 3.2 体系结构说明(从外到里)

#### 编程语言

* 在.NET Framework框架中支持的编程语言包括C#、VB、C++、J#等，但目前使用最多的是C#语言
* 正是由于在.NET Framework中支持多种编程语言，因此，.NET Framework也配备了对应的编译器

#### CLS

* CLS(Common Language Specification，公共语言运行规范)定义了一组规则，即可以通过不同的编程语言(C#、VB、J#等)来创建Windows应用程序、ASP.NET网站程序以及在.NET Framework中所支持的程序

#### .NET Framework类库(Framework Class Library,FCL)

* 在FCL中包括Windows Forms(Windows窗体程序)、ASP.NET(网站程序)、WPF(Windows的界面程序的框架)、WCF(Windows平台上的工作流程序)等程序所用到的类库文件

#### CLR

* CLS是.NET Framework的基础。用户可以将CLR看作一个在执行时管理代码的代码，它提供内存管理、线程管理和远程处理等核心服务，并且还强制实施严格类型安全以及可提高安全性和可靠性的管理
* 它与Java虚拟机类似。以公共语言运行库为目标的代码称为托管代码，不以公共语言运行库为目标的代码称为非托管代码

#### OS

* 操作系统(Operating System,OS)在目前的.NET Framework中仅支持在Windows上使用，在后续的版本中将支持Linux和Mac操作系统上使用



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-netframework-struct.png