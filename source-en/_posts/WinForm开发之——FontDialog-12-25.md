---
title: 'WinForm开发之——FontDialog(12.25)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: f50485fd
date: 2020-07-30 21:25:44
---
## 一 概述

在C# WinForm开发中字体对话框(FontDialog)用于设置界面上显示的字体，与Word中设置字体的效果类似，能够设置字体的大小以及显示的字体样式等

<!--more-->

## 二 实例  <font size=5> 使用字体对话框改变文本框中的字体 </font>

### 2.1 页面布局
![][1]

### 2.2 代码逻辑

```
public partial class FontDialogForm : Form
{
    public FontDialogForm()
    {
        InitializeComponent();
    }
    //“改变文本字体”按钮的单击事件
    private void button1_Click(object sender, EventArgs e)
    {
        //显示字体对话框
        DialogResult dr = fontDialog1.ShowDialog();
        //如果在对话框中单击“确认”按钮，则更改文本框中的字体
        if (dr == DialogResult.OK)
        {
            textBox1.Font = fontDialog1.Font;
        }
    }
}
```

### 2.3 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-fontdialog-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-fontdialog-view.gif