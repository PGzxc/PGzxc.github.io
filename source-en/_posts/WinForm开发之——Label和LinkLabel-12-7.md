---
title: 'WinForm开发之——Label和LinkLabel(12.7)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 1a644c42
date: 2020-07-29 21:50:01
---
## 一 概述

* 在Windows窗体应用程序中，每个窗体都比不可少地会用到文本框和标签控件，由于在窗体中无法直接编写文本，通常使用标签控件来显示本文
* 在Windows窗体应用程序中，标签控件主要分为普通的标签(Label)和超链接形式的标签(LinkLabel)

<!--more-->

## 二 Label标签的常用属性
### 2.1 常用属性
|  属性名   |                             作用                             |
| :-------: | :----------------------------------------------------------: |
|   Name    |             标签对象的名称，区别不同标签唯一标志             |
|   Text    |                     标签对象上显示的文本                     |
|   Font    |                     标签中显示文本的样式                     |
| ForeColor |                     标签中显示文本的颜色                     |
| BackColor |                        标签的背景颜色                        |
|   Image   |                       标签中显示的图片                       |
| AutoSize  | 标签的大小是否根据内容自动调整，True为自动调整，False为用户自定义大小 |
|   Size    |                      指定标签控件的大小                      |
|  Visible  |           标签是否可见，True为可见，False为不可见            |

### 2.2 说明

* 普通标签控件(Label)中的事件与窗体的事件类似，主要的事件主要有鼠标单击事件、鼠标双击事件、标签上文本改变的事件等
* 与普通标签控件类似，超链接标签控件(LinkLabel)也具有相同的属性和事件
* 超链接标签主要应用的事件是鼠标单击事件，通过单击标签完成不同的操作，例如在QQ窗体中注册账户和召回密码的操作



## 三 实例   <font size=5> 创建一个窗体，在窗体上放置两个普通标签控件 (Label)，分别显示“早上好！”和“GoodMorning！”   在窗体上通过单击超链接标签 (LinkLabel) 交换这两个标签上显示的信息 </font>

### 3.1 创建项目，并在项目的Form，从控件区拖入Label和LinkLabel

![][1]

### 3.2 为Lable和LinkLabel赋初始值
![][2]
### 3.3 为LinkLabel的单击事件设置交换方法

```
public partial class ChangeTextForm : Form
{
    public ChangeTextForm()
    {
        InitializeComponent();
    }
    //超链接标签控件的单击事件
    private void linkLabel1_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
    {
        //交换标签上的信息。
        string temp = label1.Text;
        label1.Text = label2.Text;
        label2.Text = temp;
    }
}
```

### 3.4 效果
![][3]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-label-link-create.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windows-label-default-value.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-linklabel-view.gif
