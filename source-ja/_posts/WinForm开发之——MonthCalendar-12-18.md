---
title: 'WinForm开发之——MonthCalendar(12.18)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 9a655b6a
date: 2020-07-30 21:16:49
---
## 一 概述

在C#中日历控件(MonthCalendar)用于显示日期，通常是与文本框联用，将日期控件中选择的日期添加到文本框中

<!--more-->

## 二 实例  <font size=6> 使用日历控件实现入职日期的选择 </font>

### 2.1 分析

 根据题目要求，通过单击“选择”按钮显示日历控件，并将选择的日期显示在文本框中 

### 2.2 界面布局

![][1]
* 界面中有：一个Label，一个TextBox，一个Button，一个MonthCalendar
### 2.3 功能代码

```
public partial class MonthCalendarForm : Form
{
    public MonthCalendarForm()
    {
        InitializeComponent();
    }
    //窗体加载事件
    private void MonthCalendarForm_Load(object sender, EventArgs e)
    {
        //隐藏日历控件
        monthCalendar1.Hide();
    }
    //“选择”按钮的单击事件
    private void button1_Click(object sender, EventArgs e)
    {
        //显示日历控件
        monthCalendar1.Show();
    }
    //日历控件的日期改变事件
    private void monthCalendar1_DateSelected(object sender, DateRangeEventArgs e)
    {
        //将选择的日期显示在文本框中
        textBox1.Text = monthCalendar1.SelectionStart.ToShortDateString();
        //隐藏日历控件
        monthCalendar1.Hide();
    }
}
```

### 2.4 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-monthcalendar-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-monthcalendar-view.gif