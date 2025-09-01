---
title: 'WinForm开发之——Process(14.1)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 75f4f920
date: 2020-08-06 05:49:45
---
## 一 概述

* 在C#语言中进程类是指Process类，该类所在的命名空间是System.Diagnostics
* Process类主要提供对本地和远程进程的访问，并提供对本地进程的启动、停止等操作

<!--more-->

## 二 常用属性和方法

|         属性或方法         |                             说明                             |
| :------------------------: | :----------------------------------------------------------: |
|        MachineName         |         属性，获取关联进程正在其上运行的计算机的名称         |
|             Id             |                属性，获取关联进程的唯一标识符                |
|          ExitTime          |                  属性，获取该进程退出的时间                  |
|        ProcessName         |                    属性，获取该进程的名称                    |
|         StartTime          |                 属性，获取关联进程启动的时间                 |
|          Threads           |             属性，获取在关联进程中运行的一组线程             |
|     TotalProcessorTime     |               属性，获取此进程的总的处理器时间               |
|     UserProcessorTime      |               属性，获取此进程的用户处理器时间               |
|          Close()           |               方法，释放与此组件关联的所有资源               |
|     CloseMainWindow()      | 方法，通过向进程的主窗口发送关闭消息来关闭拥有用户界面的进程 |
|         Dispose()          |             方法，释放由Component使用的所有资源              |
|    GetCurrentProcess()     |    方法，获取新的Process组件，并将其与当前活动的进程关联     |
|        GetProcess()        |    方法，为本地计算机上的每个进程创建一个新的Process组件     |
|     GetProcess(String)     |  方法，为指定计算机上的每个进程资源创建一个新的Process组件   |
| GetProcessesByName(String) | 方法，创建新的Process组件的数组，并将它们与本地计算机上 共享指定的进程名称的所有进程资源关联 |
|           Kill()           |                   方法，立即停止关联的进程                   |
|          Start()           | 方法，启动(或重用)此Process组件的Startinfo属性指定的进程资源，并将其余该组件关联 |
|       Start(String)        | 方法，通过指定文档或应用程序文件的名称来启动进程资源，并将资源与新的Process组件关联 |

## 三 操作进程

* 在实际应用中经常会用到获取本地的进程、启动进程、关闭进程等操作，下面分别以实际形式介绍其具体的操作方法
* 在获取当前操作系统中运行的进程时，如果要获取所有运行的进程的信息，可以使用表中的GetProcess()方法，如果要获取指定名称的进程可以使用GetProcessByName(String)方法

## 四 实例

### 4.1 实例一 <font size=4> 创建 Windows 应用程序，在 RichTextBox 控件中显示所有当前系统中正在运行的进程 </font>

#### 4.1.1 代码

```
public partial class GetProcessesForm : Form
{
    public GetProcessesForm()
    {
        InitializeComponent();
    }
    //“查看所有进程”按钮的单击事件
    private void btnOk_Click(object sender, EventArgs e)
    {
        Process[] processes = Process.GetProcesses();
        foreach(Process p in processes)
        {
            richTextBox1.Text = richTextBox1.Text + p.ProcessName + "\r\n";
        }
    }
}
```

#### 4.1.2 效果

![][1]

#### 4.1.3 说明

从上面的运行效果可以看出，已经将系统中运行的进程名称显示在RichTextBox中，由于在当前系统中运行的进程较多，所以需要滑动RichTextBox控件中的滚动条来查看， 我们可以观察当前任务管理器中的进程是否与下图中的进程相同 

### 4.2 实例二 <font size=5> 创建 Windows 应用程序，并在文本框中输入需要启动的进程名称，单击“启动进程”按钮启动该进程 </font>

#### 4.2.1 代码

```
public partial class ProcessForm : Form
{
    public ProcessForm()
    {
        InitializeComponent();
    }
    //“启动进程”按钮的单击事件
    private void button1_Click(object sender, EventArgs e)
    {
        //获取进程名称
        string ProcessName = textBox1.Text;
        //创建Process 类的对象
        Process p = new Process();
        //设置进程名称
        p.StartInfo.FileName = ProcessName;
        //启动进程
        p.Start();
    }
}
```

#### 4.2.2 效果图

![][2]

#### 4.2.3 说明

 从上面的运行效果可以看出，在文本框中输入“画图”的进程名称，单击“启动进程” 按钮即可显示出画图进程的界面 

### 4.3 <font size=4> 创建 Windows 应用程序，在 ListBox 控件中显示所有的进程名称，并右击选中的进程名称，通过弹出的右键菜单将其关闭 </font>

#### 4.3.1 代码

```
public partial class ListBoxForm : Form
{
    public ListBoxForm()
    {
        InitializeComponent();
    }
    //窗体加载事件
    private void ListBoxForm_Load(object sender, EventArgs e)
    {
        //获取所有进程信息
        Process[] processes = Process.GetProcesses();
        foreach(Process p in processes)
        {
            //将进程添加到ListBox中
            lbProcess.Items.Add(p.ProcessName);
        }
    }
    //"停止进程"命令的单击事件
    private void 停止进程ToolStripMenuItem_Click(object sender, EventArgs e)
    {
        //获取进程名称
        string ProcessName = lbProcess.SelectedItem.ToString();
        //根据进程名称获取进程
        Process[] processes = Process.GetProcessesByName(ProcessName);
        //判断是否存在指定进程名称的进程
        if (processes.Length > 0)
        {
            try
            {
                foreach(Process p in processes)
                {
                    //判断进程是否处于运行状态
                    if (!p.HasExited)
                    {
                        //关闭进程
                        p.Kill();
                        MessageBox.Show(p.ProcessName + "已关闭！");
                        //获取所有进程信息
                        processes = Process.GetProcesses();
                        //清空ListBox中的项
                        lbProcess.Items.Clear();
                        foreach(Process p1 in processes)
                        {
                            //将进程添加到ListBox中
                            lbProcess.Items.Add(p1.ProcessName);
                        }
                    }
                }
            }
            catch
            {
                MessageBox.Show("该进程无法关闭！");
            }
        }
    }
}
```

#### 4.3.2 效果图

![][3]

#### 4.3.3 说明

*  运行该程序，则记事本程序被关闭 
*  需要注意的是，一些进程由于权限不够是无法关闭的，因此在关闭进程的代码中要做异常处理 



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-process-all-process.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-process-start-process-mspaint.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-process-kill-notepad.png
