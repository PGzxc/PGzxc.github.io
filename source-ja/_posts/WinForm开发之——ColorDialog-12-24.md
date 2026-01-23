---
title: 'WinForm开发之——ColorDialog(12.24)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: '51271554'
date: 2020-07-30 21:24:36
---
## 一 概述

在C# WinForm开发中颜色对话框控件(ColorDialog)用于对界面中的文字设置颜色，在使用颜色对话框时不会直接显示该控件，需要通过事件调用该控件的ShowDialog方法显示对话框

<!--more-->

## 二 实例  <font size=5> 使用颜色对话框完成文本框中字体颜色的设置 </font>

### 2.1 界面布局
![][1]
### 2.2 代码逻辑

```
public partial class ColorDialogForm : Form
{
    public ColorDialogForm()
    {
        InitializeComponent();
    }
    //“更改文本颜色”按钮的单击事件
    private void button1_Click(object sender, EventArgs e)
    {
        //显示颜色对话框
        DialogResult dr = colorDialog1.ShowDialog();
        //如果选中颜色，单击“确定”按钮则改变文本框的文本颜色
        if (dr == DialogResult.OK)
        {
            textBox1.ForeColor = colorDialog1.Color;
        }
    }
}
```

### 2.3 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-colordialog-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-colordialog-view.gif
