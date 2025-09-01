---
title: 'WinForm开发之——StreamReader(10.8)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 5fb270f4
date: 2020-07-23 20:37:20
---
## 一 概述

C#语言中StreamReader类似于从流中读取字符串。它继承自TextReader类

<!--more-->

## 二 构造方法

### 2.1 构造方法

|                  **构造方法**                  |                           **说明**                           |
| :--------------------------------------------: | :----------------------------------------------------------: |
|          StreamReader(Stream stream)           |             为指定的流创建 StreamReader 类的实例             |
|           StreamReader(string path)            |          为指定路径的文件创建 StreamReader 类的实例          |
| StreamReader(Stream stream, Encoding encoding) | 用指定的字符编码为指定的流初始化 StreamReader 类的一个新实例 |
|  StreamReader(string path, Encoding encoding)  | 用指定的字符编码为指定的文件名初始化 StreamReader 类的一个新实例 |

* 使用该表中的构造方法即可创建StreamReader类的实例，通过实例调用其提供的类成员能进行文件的读取操作

## 三 常用属性和方法

|                **属性或方法**                 |                          **作用**                          |
| :-------------------------------------------: | :--------------------------------------------------------: |
|           Encoding CurrentEncoding            |            只读属性，获取当前流中使用的编码方式            |
|               bool EndOfStream                |           只读属性，获取当前的流位置是否在流结尾           |
|                 void Close()                  |                           关闭流                           |
|                  int Peek()                   | 获取流中的下一个字符的整数，如果没有获取到字符， 则返回 -1 |
|                  int Read()                   |                 获取流中的下一个字符的整数                 |
| int Read(char[] buffer, int index, int count) | 从指定的索引位置开始将来自当前流的指定的最多字符读到缓冲区 |
|               string ReadLine()               |        从当前流中读取一行字符并将数据作为字符串返回        |
|              string ReadToEnd()               |            读取来自流的当前位置到结尾的所有字符            |

## 四 实例 <font size=5> 读取 D 盘 directoryInfo文件夹下 test1.txt 文件中的信息 </font>

### 4.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        //定义文件路径
        string path = @"D:\\directoryInfo\\test1.txt";
        //创建 StreamReader 类的实例
        StreamReader streamReader = new StreamReader(path);
        //判断文件中是否有字符
        while (streamReader.Peek() != -1)
        {
            //读取文件中的一行字符
            string str = streamReader.ReadLine();
            Console.WriteLine(str);
        }
        streamReader.Close();
    }
}
```

### 4.2 说明

在读取文件中的信息时，除了可以使用ReadLine方法之外，还可以使用Read、ReadToEnd方法来读取