---
title: 'WinForm开发之——Timer(12.16)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: c8a4399c
date: 2020-07-30 21:14:19
---
## 一 概述

* 在Windows窗体应用程序中，定时器控件(Timer)与其他的控件略有不同，它并不直接显示在窗体上，而是与其他控件连用，表示每隔一段时间执行一次Tick事件
* 定时器控件中常用的属性是Interval，用于设置时间间隔，以毫秒为单位
* 此外，在使用定时器控件时还会用到启动定时器的方法(Start)、停止定时器的方法(Stop)

<!--more-->

## 二  实例  <font size=5> 实现图片每秒切换一次的功能 </font>

### 2.1 功能分析

 根据题目要求，使用定时器和图片控件完成每秒切换一次图片的功能，这里仅使用两张图片做切换 

### 2.2 界面布局
![][1]

* 界面布局中，有一个PictureBox，两个Button，一个Timer
* Timer拖放到布局页面上时，未显示在布局画布上，显示在画布下方

### 2.3 功能代码

```
public partial class TimerForm : Form
{
    //设置当前图片空间中显示的图片
    //如果是 Timer1.jpg   flag的值为FALSE
    //如果是 Timer2.jpg   flag的值为TRUE
    bool flag = false;
    public TimerForm()
    {
        InitializeComponent();
    }
    //窗体加载事件，在图片空间中设置图片
    private void TimerForm_Load(object sender, EventArgs e)
    {
        pictureBox1.Image = Image.FromFile(@"D:\C#_test\Timer1.jpg");
        pictureBox1.SizeMode = PictureBoxSizeMode.StretchImage;
        //设置每隔1秒调用一次定时器Tick事件
        timer1.Interval = 1000;
        //启动定时器
        timer1.Start();
    }
    //触发定时器的事件，在该事件中切换图片
    private void timer1_Tick(object sender, EventArgs e)
    {
        //当flag的值为TRUE时将图片控件的Image属性切换到Timer1.jpg
        //否则将图片的Image属性切换到Timer2.jpg
        if (flag)
        {
            pictureBox1.Image = Image.FromFile(@"D:\C#_test\Timer1.jpg");
            flag = false;
        }
        else
        {
            pictureBox1.Image = Image.FromFile(@"D:\C#_test\Timer2.jpg");
            flag = true;
        }
    }
    //“启动定时器”按钮的单击事件
    private void button1_Click(object sender, EventArgs e)
    {
        timer1.Start();
    }
    //“停止定时器”按钮的单击事件
    private void button2_Click(object sender, EventArgs e)
    {
        timer1.Stop();
    }
}
```
### 2.4 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-timer-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-timer-view.gif
