---
title: 'WinForm开发之——窗体属性(12.2)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: ca7eef82
date: 2020-07-28 21:40:44
---
## 一 概述

每一个Windows窗体应用程序都是由若各个窗体构成的，窗体中的属性主要用于设置窗体的外观

<!--more-->

## 二 窗体属性

### 2.1 查看窗体属性

* 在Windows窗体应用程序中右击窗体，在弹出的右键菜单中，选择“属性”命令，弹出如下图所示的属性面板
![][1]

### 2.2 窗体属性

在该窗体中列出的属性分为布局、窗口样式等方面，合理地设置好窗体的属性对窗体的展现效果会起到事半功倍的作用，下面列出了窗体的常用属性

|         属性          |                             作用                             |
| :-------------------: | :----------------------------------------------------------: |
|         Name          |                   用来获取或设置窗体的名称                   |
|      WindowState      | 获取或设置窗体的窗口状态，取值有3中，即Normal(正常)、Minimized(最小值)、Maximized(最大值)，默认为Normal，即正常显示 |
|     StartPosition     | 获取或设置窗体运行时的起始位置，取值有5种，即Manual(窗体位置由Location属性决定)、CenterScreen(屏幕居中)、WindowsDefaultLocation(Windows默认位置)、WindowsDefaultBounds(Windows默认位置，边界由Windows决定)、CenterParent(在窗体中居中)，默认为WindowsDefaultLocation |
|         Text          |                 获取或设置窗口标题栏中的文字                 |
|      MaximizeBox      |    获取或设置窗体标题栏右上角是否有最大化按钮，默认为True    |
|      MinmizeBox       |     获取或设置窗体标题栏右上角是否有最小按钮，默认为True     |
|       BackColor       |                    获取或设置窗体的背景色                    |
|    BackgroundImage    |                   设置或获取窗体的背景图像                   |
| BackgroundImageLayout | 获取或设置图像布局，取值有5种，即None(图片居左显示)、Tile(图像重复，默认值)、Stretch(拉伸)、Center(居中)、Zoom(按比例放大到合适大小) |
|        Enabled        |                    获取或设置窗体是否可用                    |
|         Font          |                  获取或设置窗体上文字的字体                  |
|       ForeColor       |                  获取或设置窗体上文字的颜色                  |
|         Icon          |                  获取或设置窗体上显示的图标                  |

## 三 实例  <font size=5> 创建一个名为 TestForm 的窗体，并完成如下设置 </font>

### 3.1 要求

* 窗体的标题栏中显示“第一个窗体”
* 窗体中起始位置居中
* 窗体中设置一个背景图片
* 窗体中不显示最大化和最小化按钮

### 3.2 实例

* 依次点击：文件——>新建——>进行新建项目配置

  ![][2]
  
* 设置TestForm窗体的属性( 除了背景图片 (Backgroundimage) 属性以外，其他属性直接添加上表中对应的属性值即可 )

  |         属性          |    属性值    |
  | :-------------------: | :----------: |
  |         Name          |   TestForm   |
  |     StartPosition     | CenterScreen |
  |         Text          |  第一个窗体  |
  |      MaximizeBox      |    False     |
  |      MinimizeBox      |    False     |
  |    Backgroundimage    |  image.jpg   |
  | BackgroundImageLayout |   Stretch    |

* 设置背景图片设置(BackgroundImage)的方法是单击Backgroundimage属性后的按钮，在 弹出的对话框中单击导入按钮

  ![][3]
  
* 设置TestForm窗体为启动窗体( 每一个 Windows 窗体应用程序在运行时仅能指定一个启动窗体，设置启动窗体的方式是在项目的 Program.cs 文件中指定。具体的代码如下 )

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
          Application.Run(new TestForm());    //设置启动窗体
      }
  }
  ```

* 运行后，效果如下图

  ![][4]
  
  

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-form-property-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-test-form-create.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-form-image-import.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-test-form-run.png