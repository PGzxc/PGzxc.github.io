---
title: 'WinForm开发之——DateTimePicker(12.17)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: cb46a531
date: 2020-07-30 21:15:30
---
## 一 概述

在C#语言中，日期时间控件(DateTimePicker)在时间控件中的应用最多，主要用于在界面上显示当前的时间。  

<!--more-->

## 二 DateTimePicker Format显示格式

日期时间控件中常用的属性是设置其日期显示格式的Format属性。Format属性提供了4个属性值。如下所示：

* Short：短日期格式，例如：2020/7/30
* Long：长日期格式，例如：2020年3月1日
* Time：仅显示时间，例如：13:53:21
* Custom：用户自定义的显示格式

## 三 实例 <font size=5> 在窗体上设置动态的日期时间（使用定时器） </font>

### 3.1 界面布局

![][1]

### 3.2 代码逻辑

```
public partial class DateTimePickerForm : Form
{
    public DateTimePickerForm()
    {
        InitializeComponent();
    }
    //DateTimePickerForm窗体加载事件
    private void DateTimePickerForm_Load(object sender, EventArgs e)
    {
        //设置日期时间控件中仅显示时间
        dateTimePicker1.Format = DateTimePickerFormat.Time;
        //设置每隔一秒调用一次定时器Tick事件
        timer1.Interval = 1000;
        //启动定时器
        timer1.Start();
    }
    private void timer1_Tick(object sender, EventArgs e)
    {
        //重新设置日期时间控件的文本
        dateTimePicker1.ResetText();
    }
}
```

### 3.3 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-datetimepicker-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-datetimerpicker-view.gif
