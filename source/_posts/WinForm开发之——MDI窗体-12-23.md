---
title: 'WinForm开发之——MDI窗体(12.23)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: b99ad16
date: 2020-07-30 21:23:31
---
## 一 概述

在Windows窗体应用程序中，经常会在一个窗体中打开另一个窗体，通过窗体上的不同菜单选择不同的操作，这种在一个窗体中打开另一个窗体的方式可以通过设置MDI窗体的方式实现

<!--more-->

## 二 MDI介绍

* MDI(Multiple Document Interface)窗体被称为多文档窗体，它是很多Windows应用程序中常用的界面程序
* MDI窗体的设置并不复杂，只需要将窗体的属性IsMdiContainer设置为True即可
* 该属性既可以在Windows窗体的属性窗口中设置，也可以通过代码设置，这里在窗体加载事件Load中设置窗体为MDI窗体，代码`this.IsMdiContainer=True`
* 此外，还可以在窗体类的构造方法中加入上面的代码

## 三 实例  <font size=5> 创建 MDI 窗体，并在该窗体上设置菜单，包括打开文件、保存文件两个菜单项 </font>

### 3.1 分析

 根据题目要求创建名为 MDIForm 的窗体，并设置该界面为 MDI 窗体，然后为该界面添加一个菜单和两个菜单项 ，其中

* 一个菜单为：MenuStrip，两个菜单项为：打开文件和保存文件
* 通过“打开文件”，打开了 OpenFile 窗体
* 通过“保存文件”，打开了 SaveFile  窗体

### 3.2 界面布局

![][1]

### 3.3 代码逻辑

```
public partial class MDIForm : Form
{
    public MDIForm()
    {
        InitializeComponent();
        this.IsMdiContainer = true;
    }
    //打开文件菜单项的单击事件
    private void 打开文件ToolStripMenuItem_Click(object sender, EventArgs e)
    {
        OpenFile f = new OpenFile();
        f.MdiParent = this;
        f.Show();
    }
    //保存文件菜单项单击事件
    private void 保存文件ToolStripMenuItem_Click(object sender, EventArgs e)
    {
        SaveFile f = new SaveFile();
        f.MdiParent = this;
        f.Show();
    }
}
```

### 3.4 效果
![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-mdi-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-mdi-view.gif