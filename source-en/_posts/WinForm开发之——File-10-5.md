---
title: 'WinForm开发之——File(10.5)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: e9271b4a
date: 2020-07-23 20:33:23
---
## 一 概述

 C# 语言中 File 类同样可以完成与 FileInfo 类相似的功能，但 File 类中也提供了一些不同的方法 

<!--more-->

## 二 属性或方法

|                       **属性或方法**                        |                **作用**                |
| :---------------------------------------------------------: | :------------------------------------: |
|            DateTime GetCreationTime(string path)            |   返回指定文件或目录的创建日期和时间   |
|           DateTime GetLastAccessTime(string path)           | 返回上次访问指定文件或目录的日期和时间 |
|           DateTime GetLastWriteTime(string path)            | 返回上次写入指定文件或目录的日期和时间 |
|   void SetCreationTime(string path,DateTime creationTime)   |       设置创建该文件的日期和时间       |
| void SetLastAccessTime(string path,DateTIme lastAccessTime) |    设置上次访问指定文件的日期和时间    |
|  void SetLastWriteTIme(string path,DateTime lastWriteTime)  |    设置上次写入指定文件的日期和时间    |

* File类是静态类，所提供的类成员也是静态的，调用其类成员直接使用File类的名称调用即可

## 三 实例 <font size=5> 将上一节FileInfo实例中实现的内容使用 File 类完成 </font>

### 3.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        //在D盘下创建code文件夹
        Directory.CreateDirectory("D:\\directoryInfo");
        Directory.CreateDirectory("D:\\directoryInfo-1");
        string path = "D:\\directoryInfo\\test1.txt";
        //创建文件
        FileStream fs = File.Create(path);
        //获取文件信息
        Console.WriteLine("文件创建时间：" + File.GetCreationTime(path));
        Console.WriteLine("文件最后被写入时间：" + File.GetLastWriteTime(path));
        //关闭文件流
        fs.Close();
        //设置目标路径
        string newPath = "D:\\directoryInfo-1\\test1.txt";
        //判断目标文件是否存在
        bool flag = File.Exists(newPath);
        if (flag)
        {
            //删除文件
            File.Delete(newPath);
        }
        File.Move(path, newPath);
    }
}
```

