---
title: 'WinForm开发之——MessageBox(12.5)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: ce2e9e96
date: 2020-07-28 21:44:10
---
## 一 概述

消息框在Windows操作系统经常用到，例如在将某个文件或文件夹移动到回收站中时，系统会自动弹出如下图所示的消息框

![][1]
<!--more-->

## 二 MessageBox介绍

* 在Windows窗体应用程序中向用户提示操作时也是采用消息框弹出的形式
* 消息框是通过MessageBox类实现的，在MessageBox类中仅定义了Show的多个重载方法，该方法的作用是弹出一个消息框
* 由于Show方法时一个静态的方法，因此调用该方法只需要使用MessageBox.Show(参数)的形式即可弹出消息框
* 消息框在显示时有不同的样式，例如标题、图标、按钮等

## 三 MessageBox常用方法

### 3.1 常用方法

|                             方法                             |                             说明                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                DialogResult Show(string text)                |                 指定消息框中显示的文本(Text)                 |
|        DialogResult Show(string text,string caption)         |    指定消息框中显示的文本(text)以及消息框的标题(caption)     |
| DialogResult Show(string text,string caption,MessageBoxBUttons buttons) | 指定消息框中显示的文本(text)、消息框的标题(caption)以及消息框中显示的按钮(buttons) |
| DialogResult Show(string text,string caption,MessageBoxButtons buttons,MessageBoxIcon icon) | 指定消息框中显示的文本(text)、消息框的标题(caption)、消息框中显示的按钮(buttons)以及消息框中显示的图标(icon) |

### 3.2 两个枚举类型

在上面所列出的方法的参数中还涉及两个枚举类型，一个是MessageBoxButtons，一个是MessageBoxIcon。下面介绍这两个枚举类型的具体值：

#### MessageBoxButtons枚举类型主要用于设置消息框中显示的按钮，具体的枚举值如下：

* OK：在消息框中显示“确定”按钮
* OKCancel：在消息框中显示“确定”和“取消”按钮
* AbortRetryIgnore：在消息框中显示"终止"、“重试”和“忽略”按钮
* YesNoCancel：在消息框中显示"是"、“否”和“取消”按钮
* YesNo：在消息框中显示“是”和“否”按钮
*  RetryCancel：在消息框中显示“重试”和“取消”按钮 

####  MessageBoxIcon 枚举类型主要用于设置消息框中显示的图标，具体的枚举值如下。 

* None：在消息框中不显示任何图标。
*  Hand、Stop、Error：在消息框中显示由一个红色背景的圆圈及其中的白色X组成 的图标 
* Question：在消息框中显示由圆圈和其中的一个问号组成的图标。
*  Exclamation、Warning：在消息框中显示由一个黄色背景的三角形及其中的一个感叹号组成的图标 
*  Asterisk、Information：在消息框中显示由一个圆圈及其中的小写字母 i 组成的图标 

####  调用 MessageBox 类中的 Show 方法将返回一个 DialogResult 类型的值。 

 DialogResult 也是一个枚举类型，是消息框的返回值，通过单击消息框中不同的按钮得到不同的消息框返回值 

 DialogResult 枚举类型的具体值如下 

*  None：消息框没有返回值，表明有消息框继续运行 
*  OK：消息框的返回值是 0K （通常从标签为“确定”的按钮发送） 
*  Cancel：消息框的返回值是 Cancel （通常从标签为“取消”的按钮发送） 
*  Abort：消息框的返回值是 Abort （通常从标签为“中止”的按钮发送） 
*  Retry：消息框的返回值是 Retry （通常从标签为“重试”的按钮发送） 
*  Ignore：消息框的返回值是 Ignore （通常从标签为“忽略“的按钮发送） 
*  Yes：消息框的返回值是 Yes （通常从标签为“是“的按钮发送） 
*  No：消息框的返回值是 No （通常从标签为“否“的按钮发送） 

## 四 实例 <font size=4> 创建一个窗体，单击该窗体弹出一个消息框提示“是否打开新窗口”，如果单击“是”按钮，则打开新窗口，如果单击“否”按钮，则关闭当前窗体 </font>

### 4.1 创建所需的窗体

 创建一个名为 Windows_3 的项目，并在该项目中添加两个窗体，分别命名为 MainForm、 MessageForm。

![][2] 

### 4.2 在 MainForm 窗体中添加事件

 在 MainForm 窗体中添加鼠标单击事件，并在相应的事件中添加如下代码 

```
public partial class MainForm : Form
{
    public MainForm()
    {
        InitializeComponent();
    }
    private void MainForm_MouseClick(object sender, MouseEventArgs e)
    {
        //弹出消息框，并获取消息框的返回值
        DialogResult dr = MessageBox.Show("是否打开新窗体？", "提示", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);
        //如果消息框返回值是Yes，显示新窗体
        if (dr == DialogResult.Yes)
        {
            MessageForm messageForm = new MessageForm();
            messageForm.Show();
        }
        //如果消息框返回值是No，关闭当前窗体
        else if (dr == DialogResult.No)
        {
            //关闭当前窗体
            this.Close();
        }
    }
}
```

### 4.3 设置项目的启动窗体

 在 Program.cs 文件中将 MainForm 设置为启动窗体，代码如下 

```
static class Program
{
    /// <summary>
    /// 应用程序的主入口点。
    /// </summary>
    [STAThread]
    static void Main()
    {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(new MainForm());
    }
}
```

![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-messagebox-delete-sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-message-form-create.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-messagebox-show.png