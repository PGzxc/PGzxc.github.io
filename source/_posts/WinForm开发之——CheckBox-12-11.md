---
title: 'WinForm开发之——CheckBox(12.11)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 9857e4a7
date: 2020-07-29 21:56:06
---
## 一 概述

在C#语言中复选框(CheckBox)是与上一节RadioButton中介绍的单选按钮相对应的，用于选择多个选项的操作。  

复选框主要的属性是：Name、Text、Checked，其中：

* Name：表示这个组件的名称
* Text：表示这个组件的标题
* Checked：表示这个组件是否已经选中

<!--more-->

## 二 实例  <font size=5> 完成选择用户爱好的操作，并在消息框中显示所选的爱好 </font>

### 2.1 要求

 根据题目要求，用户爱好包括篮球、排球、羽毛球、乒乓球、游泳、阅读、写作，因此需要 7 个复选框 

### 2.2 界面

![][1]

### 2.3 点击"确认"代码逻辑

```
public partial class CheckBoxForm : Form
{
    public CheckBoxForm()
    {
        InitializeComponent();
    }
    //单击“确认”按钮，显示选择的爱好
    private void button1_Click(object sender, EventArgs e)
    {
        string msg = "";
        if (checkBox1.Checked)
        {
            msg = msg + " " + checkBox1.Text;
        }
        if (checkBox2.Checked)
        {
            msg = msg + " " + checkBox2.Text;
        }
        if (checkBox3.Checked)
        {
            msg = msg + " " + checkBox3.Text;
        }
        if (checkBox4.Checked)
        {
            msg = msg + " " + checkBox4.Text;
        }
        if (checkBox5.Checked)
        {
            msg = msg + " " + checkBox5.Text;
        }
        if (checkBox6.Checked)
        {
            msg = msg + " " + checkBox6.Text;
        }
        if (checkBox7.Checked)
        {
            msg = msg + " " + checkBox7.Text;
        }
        if(msg != "")
        {
            MessageBox.Show("您选择的爱好是：" + msg, "提示");
        }
        else
        {
            MessageBox.Show("您没有选择爱好", "提示");
        }
    }
}
```

### 2.4 效果图
![][2]

### 2.5 总结

* 与判断单选按钮是否被选中一样，判断复选框是否已被选中也使用Checked属性

* 试想如果界面上的复选框有几十个或更多，每个复选框都需要判断，则会出现很多的冗余代码

* 由于都要获取复选框是否已被选中了，界面上的每一个控件都继承自Control类，直接判断界面上的控件是否为复选框即可。实现上述功能的代码可以简化为如下：

  ```
  private void button1_Click(object sender, EventArgs e)
  {
      string msg = "";
      foreach(Control c in Controls)
      {
          //判断控件是否为复选框控件
          if(c is CheckBox)
          {
              if (((CheckBox)c).Checked)
              {
                  msg = msg + " " + ((CheckBox)c).Text;
              }
          }
      }
      if(msg != "")
      {
          MessageBox.Show("您选择的爱好是：" + msg, "提示");
      }
      else
      {
          MessageBox.Show("您没有选择爱好", "提示");
      }
  }
  ```

  

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windows-checkbox-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-checkbox-view.gif
