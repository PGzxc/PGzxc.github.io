---
title: 'WinForm开发之——创建Windows窗体应用程序(12.1)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 3ce7005b
date: 2020-07-28 21:38:28
---
## 一 概述

* WinForm是Windows Form的简称，是基于.NET Framework平台的客户端(PC软件)开发技术，一般使用C#编程。C# WinForm编程需要创建Windows窗体应用程序项目
* .NET提供了大量Windows风格的控件和事件，我们可以直接拿来使用，上手简单，开发快速

<!--more-->

## 二 创建WinForm程序

* 依次打开：文件——>新建——>项目，打开项目新建对话框，选择Windows窗体应用

  ![][1]
  
* 在打开的配置新项目对话框中更改项目名称，项目位置，解决方案等信息，确认后点击创建

  ![][2]

* 创建完成后，项目的目录结构如下图

  ![][3]

## 三 项目目录结构介绍

* Properties：项目相关的属性，如窗体名称，应用名称，版本号，修订号等
* 引用：一些系统自带的类库，如System类库
* App.config：设置应用运行时的.NET版本和，sku，该值指定库存单位 (SKU)，库存单位则指定此应用程序支持的 .NET Framework 版本 
* Form1.cs：程序显示的界面
* Program.cs：程序的入口启动文件，含有Main函数

## 四 Program.cs说明

### 4.1 Program.cs代码

```
static class Program
{
    /// <summary>
    /// 应用程序的主入口点。
    /// </summary>
    [STAThread]
    static void Main()
    {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(new Form1());
    }
}
```

### 4.2 代码说明

* 第1行代码：用于启动应用程序中可是的样式，如果控件和操作系统支持，那么控件的绘制就能根据显示不同风格来实现
* 第2行代码：控件支持UseCompatibleTextRenderingproperty属性，该方法将此属性设置为默认值
* 第3行代码：用于设置在当前项目中要启动的窗体，这里new Form1()即为要启动的窗体

## 五 Windows窗体控件

### 5.1 系统视图工具箱

* 系统中默认的控件全部存放到工具箱中，选择：“视图”——>"工具箱"，如下图所示，打开工具箱

  ![][4]
* 工具箱中将控件划分为公共控件、容器、菜单和工具栏、数据、组件、打印、对话框等

### 5.2 向工具箱添加新控件

* 如果工具箱中的控件不能满足开发项目的需求，也可以向工具箱中添加新的控件或者对工具箱中的控件重置或进行分组等操作，这都可以通过右击工具箱，在弹出的右键菜单中选择相应的命令实现(右键菜单如下图)

  ![][5]
  
* 在右键菜单中选择"选择项"命令，弹出如下图所示的对话框

  ![][6]
  
* 在该对话框中列出了不同组件中所带的控件，如果需要在工具箱中添加，直接选中相应组件名称前的复选框即可(添加前)

  ![][7]
* 添加后(UserControl组件)
![][8]

* 如果需要添加外部的控件，则单击“浏览”按钮，找到相应控件的.dll或.exe程序添加即可
* Windows窗体应用程序也称为事件驱动程序，也就是通过鼠标单击界面上的控件、通过键盘输入操作等操作来触发控件的不同事件完成相应的操作(例如：单击按钮、右击界面、向文本框中输入内容等操作)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-project-open-dialog.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-project-setting.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-project-create-done-struct.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-comm-tools.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-tools-right-see.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-tools-right-select-choice.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-tools-add-before.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-tools-add-after.png

