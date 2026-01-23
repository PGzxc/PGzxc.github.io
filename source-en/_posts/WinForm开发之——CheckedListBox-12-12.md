---
title: 'WinForm开发之——CheckedListBox(12.12)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: f60c6b3c
date: 2020-07-29 21:57:31
---
## 一 概述

* 在C#语言中提供了与CheckBox一节中介绍的复选框功能类似的复选列表框(CheckedListBox)，方便用户设置和获取复选列表框中的选项
* 复选列表框显示的效果与复选框类似，但在选择多个选项时操作比一般的复选框更方便

<!--more-->

## 二 实例  <font size=5> 使用复选列表框完成选购水果的操作 </font>

### 2.1 分析

 根据题目要求，创建一个名为 CheckedListBox 窗体，在复选列表框中添加 6 种水果， 单击“购买”按钮，弹出消息框显示购买的水果种类。

## 2.2 界面布局

### 2.1 拖拽布局

向布局中拖放一个CheckedListBox和Button

![][1]

### 2.2 编辑CheckedListBox

* 点击CheckedListBox，点击右上角的`右箭头`，选择编辑项
  ![][2]
  
* 打开编辑项后，向输入框中填入内容，确认后点击OK

  ![][3]

## 三 点击 购买，代码逻辑

```
public partial class CheckedListBox : Form
{
    public CheckedListBox()
    {
        InitializeComponent();
    }
    //“购买”按钮的点击事件，用于在消息框中显示购买的水果种类
    private void button1_Click(object sender, EventArgs e)
    {
        string msg = "";
        for(int i = 0; i < checkedListBox1.CheckedItems.Count; i++)
        {
            msg = msg + " " + checkedListBox1.CheckedItems[i].ToString();
        }
        if (msg != "")
        {
            MessageBox.Show("您购买的水果有：" + msg, "提示");
        }
        else
        {
            MessageBox.Show("您没有选购水果！", "提示");
        }
    }
}
```

## 四 效果图
![][4]

## 五 总结

在使用复选列表框控件时需要注意获取列表中的项使用的是CheckedItems属性，获取当前选中的文本(上图中蓝色的区域)使用的是SelectedItem属性



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-checkedlistbox-create-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-checkedlistbox-eidit.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-checkedlistbox-add-content.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-checkedlistbox-view.png
