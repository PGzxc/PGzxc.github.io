---
title: 'WinForm开发之——窗体事件(12.3)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 9d9eaf93
date: 2020-07-28 21:41:56
---
## 一 概述

* 在窗体中除了可以通过设置属性改变外观外，还提供了事件来方便窗体的操作
* 在打开操作系统后，单击鼠标或者 敲击键盘都可以在操作系统中完成不同的任务，例如双击打开"我的电脑"、在桌面上右击会出现右键菜单、单击一个文件夹后按F2键恶意更改文件夹的名称等。实际上这些操作都是Windows操作系统中的事件

<!--more-->

## 二 Windows窗体事件

### 2.1 如何查看窗体事件

在Windows窗体应用中系统已经自定义了一些事件，在窗体属性面板中单击闪电图标即可查看到窗体中的事件

![][1]

### 2.2 窗体常用事件

|       事件       |                   作用                   |
| :--------------: | :--------------------------------------: |
|       Load       | 窗体加载事件，在运行窗体时即可执行该事件 |
|    MouseClick    |               鼠标单击事件               |
| MouseDoubleClick |               鼠标双击事件               |
|    MouseMove     |               鼠标移动事件               |
|     KeyDown      |               键盘按下事件               |
|      KeyUp       |               键盘释放事件               |
|   FormClosing    |       窗体关闭事件，关闭窗体时发生       |
|    FormClosed    |       窗体关闭事件，关闭窗体后发生       |

## 三 实例  <font size=5>通过窗体的不同颜色改变窗体的背景颜色</font>

### 3.1 新建ColorForm窗体程序

  ![][2]
### 3.2 添加事件

* 右击该窗体，在 弹出的右键菜单中选择“属性”命令，然后在弹出的面板中点击闪电图标进入窗体事件设置页面

* 在该界面中依次选中需要创建的事件，并双击该事件右侧的单元格，系统会自动为其生成对应事件的处理方法，设置后的属性面板如下图所示：

  ![][3]
  
* 设置好事件后会在ColorForm窗体对应的代码文件中自动生成与事件对应的4个方法(在执行不同事件时，系统会自动执行事件所所对应方法中的内容)
  
  ```
  public partial class ColorForm : Form
  {
      public ColorForm()
      {
          InitializeComponent();
      }
      private void ColorForm_MouseClick(object sender, MouseEventArgs e)
      {
      }
      private void ColorForm_MouseDoubleClick(object sender, MouseEventArgs e)
      {
      }
      private void ColorForm_Load(object sender, EventArgs e)
      {
      }
  }
  ```

### 3.3 添加事件处理代码

```
public partial class ColorForm : Form
{
    public ColorForm()
    {
        InitializeComponent();
    }
    private void ColorForm_MouseClick(object sender, MouseEventArgs e)
    {
        //设置窗体背景颜色为黑色
        this.BackColor = Color.Black;
    }
    private void ColorForm_MouseDoubleClick(object sender, MouseEventArgs e)
    {
        //设置窗体背景颜色为蓝色
        this.BackColor = Color.Blue;
    }
    private void ColorForm_Load(object sender, EventArgs e)
    {
        //设置窗体颜色为红色
        this.BackColor = Color.Red;
    }
}
```

### 3.4 设置启动窗体

* 在Program.cs类中将ColorForm窗体设置为启动窗体

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
          Application.Run(new ColorForm());    //设置启动窗体
      }
  }
  ```

* 效果图

  ![][4]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-event-function-property.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-color-form-create.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-color-form-property.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-color-form-view.gif

