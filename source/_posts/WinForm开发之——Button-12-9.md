---
title: 'WinForm开发之——Button(12.9)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: c65c8603
date: 2020-07-29 21:53:22
---
## 一 概述

* 按钮主要用于提交页面的内容，或者是确认某种操作等
* 按钮包括普通的按钮(Button)、单选按钮(RadioButton)，本节主要讲解按钮(Button)
* 按钮常用的属性包括在按钮中显示的文字(Text)以及按钮外观设置的属性，最常用的事件是单击事件

<!--more-->

## 二 实例 <font size=4> 实现一个简单的用户注册功能，并将提交的注册信息显示在新窗体的文本框中 </font>

### 2.1 功能分析

 本例的用户注册界面中仅包括用户名和密码，通过单击“注册”按钮跳转到新窗体中并显示注册的用户名和密码，实现该功能分别使用 RegForm 窗体和 MainForm 窗体 

### 2.2 界面布局及代码逻辑

#### 2.2.1 RegForm 
##### 布局页面
![][1]
##### 代码逻辑
```
public partial class RegForm : Form
{
    public RegForm()
    {
        InitializeComponent();
    }
    //“确定”按钮的单击事件，用于判断注册信息并跳转到新窗口显示注册信息
    private void button1_Click(object sender, EventArgs e)
    {
        string name = textBox1.Text;
        string pwd = textBox2.Text;
        string repwd = textBox3.Text;
        if (string.IsNullOrEmpty(name))
        {
            MessageBox.Show("用户名不能为空！");
            return;
        }
        else if (string.IsNullOrEmpty(textBox2.Text))
        {
            MessageBox.Show("密码不能为空！");
            return;
        }
        else if (!textBox2.Text.Equals(textBox3.Text))
        {
            MessageBox.Show("两次输入的密码不一致！");
            return;
        }
        //将用户名和密码传递到主窗体中
        MainForm mainForm = new MainForm(name, pwd);
        mainForm.Show();
    }
    //“取消”按钮的事件，用于关闭窗体
    private void button2_Click(object sender, EventArgs e)
    {
        //关闭窗体
        this.Close();
    }
}
```
####  2.2.2 MainForm  
##### 布局页面
![][2]
##### 代码逻辑

```
public partial class MainForm : Form
{
    public MainForm(string name,string pwd)
    {
        InitializeComponent();
        label2.Text = "用户名："+ name;
        label3.Text = "密  码："+pwd;
    }
}
```

### 2.3 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-button-regform-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-mainform-layout.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-button-login-view.gif