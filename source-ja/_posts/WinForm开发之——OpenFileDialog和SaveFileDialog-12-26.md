---
title: 'WinForm开发之——OpenFileDialog和SaveFileDialog(12.26)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: f9e04460
date: 2020-07-30 21:26:50
---
## 一 概述

在C# WinForm开发中文件对话框(FileDialog)主要包括文件浏览对话框，以及用于查找、打开、保存文件的功能，与Windows中的文件对话框类似

<!--more-->

## 二 实例  <font size=5> 打开一个记事本文件，并更改记事本中的内容，保存到文件中 </font>

### 2.1 界面布局
![][1]

### 2.2 代码逻辑

```
public partial class FileDialogForm : Form
{
    public FileDialogForm()
    {
        InitializeComponent();
    }
    //打开文件
    private void button1_Click(object sender, EventArgs e)
    {
        DialogResult dr = openFileDialog1.ShowDialog();
        //获取所打开文件的文件名
        string filename = openFileDialog1.FileName;
        if(dr==System.Windows.Forms.DialogResult.OK && !string.IsNullOrEmpty(filename))
        {
            StreamReader sr = new StreamReader(filename);
            textBox1.Text = sr.ReadToEnd();
            sr.Close();
        }
    }
    //保存文件
    private void button2_Click(object sender, EventArgs e)
    {
        DialogResult dr = saveFileDialog1.ShowDialog();
        string filename = saveFileDialog1.FileName;
        if(dr==System.Windows.Forms.DialogResult.OK && !string.IsNullOrEmpty(filename))
        {
            StreamWriter sw = new StreamWriter(filename, true, Encoding.UTF8);
            sw.Write(textBox1.Text);
            sw.Close();
        }
    }
}
```

### 2.3 效果图

![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-filedialog-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-filedialog-view.gif
