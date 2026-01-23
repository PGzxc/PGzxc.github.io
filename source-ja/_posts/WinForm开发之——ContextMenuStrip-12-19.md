---
title: 'WinForm开发之——ContextMenuStrip(12.19)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 784e8da5
date: 2020-07-30 21:17:49
---
## 一 概述

* 在C# WinForm开发中的右键菜单又叫上下文菜单，即右击某个控件或窗体时出现的菜单，它也是一种常用的菜单控件
* 在Windows菜单应用程序中，上下文菜单在设置时直接与控件的ContextMenuStrip属性绑定即可

<!--more-->

## 二 实例  <font size=5> 创建 Windows 窗体应用程序，并为该窗体创建上下文菜单，菜单项包括打开窗体、关闭窗体 </font>
### 2.1 Windows窗体ContextMenuStrip属性设置
![][1]
* 在Windows窗体的ContextMenuStrip属性中添加上下文菜单
### 2.2 界面布局

* 添加ContextMenuStrip后默认的样式

  ![][2]
  
* 向窗体中添加两个菜单(打开窗体和关闭窗体)

  ![][3]

### 2.3 逻辑代码

```
public partial class ContextMenuStrip : Form
{
    public ContextMenuStrip()
    {
        InitializeComponent();
    }
    //打开新窗体的菜单项单击事件
    private void 打开窗体ToolStripMenuItem_Click(object sender, EventArgs e)
    {
        MessageBox.Show("打开了新窗体","提示");
    }
    //关闭窗体菜单项的单击事件
    private void 关闭窗体ToolStripMenuItem_Click(object sender, EventArgs e)
    {
        this.Close();
    }
}
```

### 2.4 效果图
![][4]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-contextmenustrip-setting.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-contentmenustrip-drag-default.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-contentment-addmenu-view.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-contentment-view.gif