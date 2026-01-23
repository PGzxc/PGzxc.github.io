---
title: 'WinForm开发之——RadioButton(12.10)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 6a19b6f2
date: 2020-07-29 21:54:41
---
## 一 概述

在C#语言中RadioButton是单选按钮控件，多个RadioButton控件可以为一组，这一组内的RadioButton控件只能有一个被选中

<!--more-->

## 二 实例  <font size=5> 完成选择用户权限的操作，并在消息框中显示所选的权限名 </font>

### 2.1 要求

* 根据题目要求，用户权限包括：“普通用户”、“年卡用户”、“VIP用户”，因此需要3个单选按钮

### 2.2 界面布局
![][1]
### 2.3 点击“确认”的代码逻辑

```
public partial class RadioButtonForm : Form
{
    public RadioButtonForm()
    {
        InitializeComponent();
    }
    //单击“确定”按钮的事件
    private void button1_Click(object sender, EventArgs e)
    {
        string msg = "";
        if (radioButton1.Checked)
        {
            msg = radioButton1.Text;
        }
        else if (radioButton2.Checked)
        {
            msg = radioButton2.Text;
        }
        else if (radioButton3.Checked)
        {
            msg = radioButton3.Text;
        }
        MessageBox.Show("您选择的权限是：" + msg, "提示");
    }
}
```

### 2.4 效果图
![][2]

### 2.5 说明

* Checked属性可用于判断单选按钮是否被选中
* 如果该属性的返回值为True，则代表选中；如果返回值为False，则表示未被选中

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-radiobutton-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-radiobutton-view.gif