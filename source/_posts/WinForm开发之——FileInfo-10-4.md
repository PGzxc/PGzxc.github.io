---
title: 'WinForm开发之——FileInfo(10.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: f0ce93de
date: 2020-07-23 20:32:14
---
## 一 概述

* C#语言中File类和FileInfo类都是用来操作文件的，并且作用相似，它们都能完成对文件的创建、更改文件的名称、删除文件、移动文件等操作
* File类是静态类，其成员也是静态的，通过类名即可访问类的成员；FileInfo类不是静态成员，其类的成员需要类的实例来访问

<!--more-->

## 二 FileInfo构造方法

### 2.1 构造方法

```
FileInfo(string fileName)
```

* FileInfo类中提供了一个构造方法
* 这里的fileName参数用于指定新文件的完全限定名或相对文件名

## 三 常用属性和方法

|                        **属性或方法**                        |                           **作用**                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                          Directory                           |                  只读属性，获取父目录的实例                  |
|                        DirectoryName                         |           只读属性，获取表示目录的完整路径的字符串           |
|                            Exists                            | 只读属性，获取指定的文件是否存在，若存在返回True，否则返回False |
|                          IsReadOnly                          |            属性，获取或设置指定的文件是否为只读的            |
|                            Length                            |                   只读属性，获取文件的大小                   |
|                             Name                             |                   只读属性，获取文件的名称                   |
|             FileInfo CopyTo(string destFileName)             |          将现有文件复制到新文件，不允许覆盖现有文件          |
|     FileInfo CopyTo(string destFileName,bool overwrite)      |           将现有文件复制到新文件，允许覆盖现有文件           |
|                     FileStream Create()                      |                           创建文件                           |
|               void MoveTo(string destFileName)               |       将指定文件移动到新位置，提供要指定新文件名的选项       |
| FileInfo Replace(string destinationFileName,string destinationBackupFileName) | 使用当前文件对象替换指定文件的内容，先删除原始文件，再创建被替换文件的备份 |

## 四 实例 <font size=3> 在 D 盘的 code 文件夹下创建名为 test1.txt 的文件，并获取该文件的相关属性，然后将其移动到D盘下的 code-1 文件夹中 </font>

### 4.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        //在D盘下创建code文件夹
        Directory.CreateDirectory("D:\\directoryInfo");
        FileInfo fileInfo = new FileInfo("D:\\directoryInfo\\test1.txt");
        if (!fileInfo.Exists)
        {
            //创建文件
            fileInfo.Create().Close();
        }
        fileInfo.Attributes = FileAttributes.Normal;//设置文件属性
        Console.WriteLine("文件路径："+ fileInfo.Directory);
        Console.WriteLine("文件名称："+ fileInfo.Name);
        Console.WriteLine("文件是否只读："+ fileInfo.IsReadOnly);
        Console.WriteLine("文件大小：" +fileInfo.Length);
        //先创建code-1 文件夹
        //将文件移动到code-1文件夹下
        Directory.CreateDirectory("D:\\directoryInfo-1");
        //判断目标文件夹中是否含有文件test1.txt
        FileInfo newFileInfo = new FileInfo("D:\\directoryInfo-1\\test1.txt");
        if (!newFileInfo.Exists)
        {
            //移动文件到指定路径
            fileInfo.MoveTo("D:\\directoryInfo-1\\test1.txt");
        }
    }
}
```
