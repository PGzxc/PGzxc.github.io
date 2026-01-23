---
title: 'WinForm开发之——BinaryWriter(10.12)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 11cb0707
date: 2020-07-24 21:35:58
---
## 一 概述

C#中BinaryWriter类用于向流中写入内容，其构造方法与上一节BinaryReader类类似

<!--more-->

## 二 构造方法

 第1种形式：

```
BinaryWriter(Stream output)
```

  第2种形式：

```
BinaryWriter(Stream output, Encoding encoding)
```

  第3种形式： 

```
BinaryWriter(Stream output, Encoding encoding, bool leaveOpen)
```

## 三 常用的属性和方法

|              **属性或方法**              |                        **作用**                        |
| :--------------------------------------: | :----------------------------------------------------: |
|               void Close()               |                         关闭流                         |
|               void Flush()               | 清理当前编写器的所有缓冲区，使所有缓冲数据写入基础设备 |
| long Seek(int offset, SeekOrigin origin) |                 返回查找的当前流的位置                 |
|         void Write(char[] chars)         |                  将字符数组写入当前流                  |
|      Write7BitEncodedInt(int value)      |                以压缩格式写出 32 位整数                |

## 四 实例 <font size=5> 在 D 盘 code 文件夹的 test.txt 文件中写入图书的名称和价格，使用 BinaryReader 类读取写入的内容 </font>

#### 4.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        FileStream fileStream = new FileStream(@"D:\\code\\test.txt", FileMode.Open, FileAccess.Write);
        //创建二进制写入流的实例
        BinaryWriter binaryWriter = new BinaryWriter(fileStream);
        //向文件中写入图书名称
        binaryWriter.Write("C#基础教程");
        //向文件中写入图书价格
        binaryWriter.Write(49.5);
        //清除缓冲区的内容，将缓冲区中的内容写入到文件中
        binaryWriter.Flush();
        //关闭二进制流
        binaryWriter.Close();
        //关闭文件流
        fileStream.Close();
        fileStream = new FileStream(@"D:\\code\\test.txt", FileMode.Open, FileAccess.Read);
        //创建二进制读取流的实例
        BinaryReader binaryReader = new BinaryReader(fileStream);
        //输出图书名称
        Console.WriteLine(binaryReader.ReadString());
        //输出图书价格
        Console.WriteLine(binaryReader.ReadDouble());
        //关闭二进制读取流
        binaryReader.Close();
        //关闭文件流
        fileStream.Close();
    }
}
```