---
title: 'WinForm开发之——StreamWriter(10.9)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: e6d0e568
date: 2020-07-23 20:38:13
---
## 一 概述

咋C#语言中与上一节 StreamReader中介绍的StreamReader类对应的是StreamWriter类，StreamWriter类主要用于向流中写入数据

<!--more-->

## 二 构造方法

|                  **构造方法**                  |                           **说明**                           |
| :--------------------------------------------: | :----------------------------------------------------------: |
|          StreamWriter(Stream stream)           |             为指定的流创建 StreamWriter 类的实例             |
|           StreamWriter(string path)            |          为指定路径的文件创建 StreamWriter 类的实例          |
| StreamWriter(Stream stream, Encoding encoding) | 用指定的字符编码为指定的流初始化 StreamWriter 类的一个新实例 |
|  StreamWriter(string path, Encoding encoding)  | 用指定的字符编码为指定的文件名初始化 StreamWriter 类的一个新实例 |

* 在创建了StreamWriter类的实例后即可调用其类成员，完成向文件中写入信息的操作

## 三 常用属性和方法

|         **属性或方法**          |              **作用**              |
| :-----------------------------: | :--------------------------------: |
|         bool AutoFlush          | 属性，获取或设置是否自动刷新缓冲区 |
|        Encoding Encoding        |  只读属性，获取当前流中的编码方式  |
|          void Close()           |               关闭流               |
|          void Flush()           |             刷新缓冲区             |
|     void Write(char value)      |           将字符写入流中           |
|   void WriteLine(char value)    |         将字符换行写入流中         |
|   Task WriteAsync(char value)   |         将字符异步写入流中         |
| Task WriteLineAsync(char value) |       将字符异步换行写入流中       |

* 在上表中给出的方法，Write、WriteAsync、WriteLineAsync方法还有很多不同类型写入的重载方法，这没有一一列举

## 四 实例 <font size=4> 向 D 盘 code 文件夹的 test.txt 文件中写入姓名和手机号码 </font>

### 4.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        string path = @"D:\\directoryInfo\\test1.txt";
        //创建StreamWriter 类的实例
        StreamWriter streamWriter = new StreamWriter(path);
        //向文件中写入姓名
        streamWriter.WriteLine("小张");
        //向文件中写入手机号
        streamWriter.WriteLine("0123456789");
        //刷新缓存
        streamWriter.Flush();
        //关闭流
        streamWriter.Close();
    }
}
```

### 4.2 说明

* 执行上面的代码，即可将姓名和手机号码写入到test1.txt的文件中