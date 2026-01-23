---
title: 'WinForm开发之——RichTextBox(12.27)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: ee790ba6
date: 2020-07-30 21:27:54
---
## 一 概述

 在上一节C# OpenFileDialog和SaveFileDialog 中我们介绍了文件的打开和保存，但是实际开发中可能需要在读取文本信息时需要保留原有的文本格式，这时候就不能使用普通的文本控件 (TextBox) 了，而需要使用富文本框控件 (RichTextBox) 来完成   

<!--more-->

 RichTextBox 控件在使用时与 TextBox 控件是非常类似的，但其对于读取多行文本更有优势，它可以处理特殊格式的文本 

 此外，在 RichTextBox 控件中还提供了文件加载和保存的方法，不需要使用文件流即可完成对文件的读写操作 

## 二 实例 <font size=5> 使用 RichTextBox 控件完成文件的打开与保存操作 </font>

### 2.1 分析

 根据题目要求，将上一实例中的 TextBox 控件换成 RichTextBox 控件，并使用 RichTextBox 控件中提供的文件加载和保存方法来操作文件 

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
        //获取打开文件的文件名
        string filename = openFileDialog1.FileName;
        if(dr==System.Windows.Forms.DialogResult.OK && !string.IsNullOrEmpty(filename))
        {
            richTextBox1.LoadFile(filename, RichTextBoxStreamType.PlainText);
        }
    }
    //保存文件
    private void button2_Click(object sender, EventArgs e)
    {
        DialogResult dr = saveFileDialog1.ShowDialog();
        //获取所保存文件的文件名
        string filename = saveFileDialog1.FileName;
        if(dr==System.Windows.Forms.DialogResult.OK && !string.IsNullOrEmpty(filename))
        {
            richTextBox1.SaveFile(filename, RichTextBoxStreamType.PlainText);
        }
    }
}
```