---
title: 'WinForm开发之——TextBox(12.8)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: b458a77d
date: 2020-07-29 21:51:15
---
## 一 概述

* 文本框(TextBox)是在窗体中输入信息时最常用的控件，通过设置文本框属性可以实现多行文本框、密码框等
* 在窗体上输入信息时使用最多的就是文本框

<!--more-->

## 二 常用的属性

|    属性名    |                             作用                             |
| :----------: | :----------------------------------------------------------: |
|     Text     |                    文本框对象中显示的文本                    |
|  MaxLength   |              在文本框中最多输入的文本的字符个数              |
|   WordWrap   | 文本框的文本是否自动换行，如果是True，则自动换行，如果是False，则不能自动换行 |
| PasswordChar |  将文本框中出现的字符使用指定的字符替换，通常会使用"*"字符   |
|  Multiline   | 指定文本框中是否为多行文本框，如果为True，则为多行文本框，如果为False，则为单行文本框 |
|   ReadOnly   | 指定文本框的文本是否可更改，如果为True，则不能更改，即只读文本框，如果是False，则允许更改文本框中的文本 |
|    Lines     |                    指定文本框中文本的行数                    |
|  ScrollBars  | 指定文本框中是否有滚动条，如果为True，则有滚动条，如果为False，则没有滚动条 |

* 文本框控件最常使用的事件是文本改变事件(TextChange)，即在文本框中的内容改变时触发该事件

## 三 实例  
### 3.1 实例一 <font size=4> 创建一个窗体，在文本框中输入一个值，通过文本改变事件将该文本框中的值写到一个标签中 </font>


#### 3.1.1  首先创建一个名为 TextBoxTest 的窗体，然后在窗体上添加文本框和标签，并在文本框的文本改变事件中编写代码 

```
public partial class TextBoxTest : Form
{
    public TextBoxTest()
    {
        InitializeComponent();
    }
    //文本框文本改变事件
    private void textBox1_TextChanged(object sender, EventArgs e)
    {
        //将文本框中的文本值显示在标签中
        label2.Text = textBox1.Text;
    }
}
```

####  3.1.2 运行效果

![][1]

### 3.2 实例二 <font size=4> 实现简单的登录窗体 </font>

### 3.2.1 说明

*  本例中的登录窗体仅包括用户名和密码，将登录窗体命名为 LoginForm 
*  单击“登录”超链接标签，对文本框中输入的用户名和密码进行判断，如果用户名和密码的输入值分别为 xiaoming 和 123456，则弹出消息框提示“登录成功！”，否则提示“登录失败！” 

### 3.2.2 点击登录时

```
public partial class LoginForm : Form
{
    public LoginForm()
    {
        InitializeComponent();
    }
    //判断是否登录成功
    private void linkLabel1_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
    {
        //获取用户名
        string username = textBox1.Text;
        //获取密码
        string password = textBox2.Text;
        //判断用户名密码是否正确
        if ("xiaoming".Equals(username) && "123456".Equals(password))
        {
            MessageBox.Show("登录成功！");
        }
        else
        {
            MessageBox.Show("登录失败！");
        }
    }
}
```

### 3.3 效果
![][2]

* 从上面的运行效果可以看出，输入密码的文本框中由于在PasswordChar属性中设置了`*`，因此在文本框中输入的文本全部使用`*`来替换


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-textbox-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-textbox-login.png
