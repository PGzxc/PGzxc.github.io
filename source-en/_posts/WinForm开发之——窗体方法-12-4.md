---
title: 'WinForm开发之——窗体方法(12.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: dd22f8ec
date: 2020-07-28 21:43:06
---
## 一 概述

自定义的窗体都继承自System.Windows.Form类，能使用Form类中已有的成员，包括属性、方法、事件等

<!--more-->

## 二 窗体方法

实际上窗体中也有一些从System.Windows.Form类继承的方法，如下所示：

|           方法            |           作用           |
| :-----------------------: | :----------------------: |
|        void Show()        |         显示窗体         |
|        void Hide()        |         隐藏窗体         |
| DialogResult ShowDialog() |   以对话框模式显示窗体   |
|   void CenterToParent()   | 使窗体在父窗体边界内居中 |
|   void CenterToScreen()   |   使窗体在当前屏幕居中   |
|      void Activate()      |  激活窗体并给给予它焦点  |
|       void Close()        |         关闭窗体         |

## 三 实例  <font size=5> 在 MainForm 窗体中单击，弹出一个新窗体 NewForm；在新窗体中单击，将 NewForm 窗体居中，双击，关闭 NewForm 窗体 </font>

### 3.1 新建窗体方法程序，默认窗体为Form1窗体，右键重命名为MainForm

![][1]

### 3.2 添加NewForm 窗体

* 在项目上右键：依次选择：添加——>新建项，打开新建项对话框

  ![][2]
  
* 新建项窗口中，选择新建类型(Windows窗体)，并修改窗体的名称(NewForm)

  ![][3]

### 3.3 设置MainForm窗体中事件

在MainForm窗体中添加鼠标单击窗体事件，并在该事件对应的方法中写入打开NewForm窗体的代码

```
public partial class NewForm : Form
{
    public NewForm()
    {
        InitializeComponent();
    }
    //窗体的鼠标单击事件
    private void NewForm_MouseClick(object sender, MouseEventArgs e)
    {
        //将窗体居中
        this.CenterToScreen();
    }
    //窗体的鼠标双击事件
    private void NewForm_MouseDoubleClick(object sender, MouseEventArgs e)
    {
        //关闭窗体
        this.Close();
    }
}
```

### 3.4 将MainForm窗体设置为启动窗体，查看效果

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
        Application.Run(new MainForm());    //设置启动窗体
    }
}
```

![][4]

* 单击NewForm窗体后，NewForm窗体显示在屏幕中央，双击NewForm窗体即可将该窗体关闭
* 在使用窗体中的方法时需要注意，如果是当前窗体需要调用方法直接使用this关键字代表当前窗体，通过`this.方法名(参数列表)`的方式调用即可
* 如果要操作其他窗体，则需要用窗体的示例来调用方法


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-method-project-modify-form-name.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-method-add-new-project-form.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-method-form-add-newform.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-method-form-view.gif