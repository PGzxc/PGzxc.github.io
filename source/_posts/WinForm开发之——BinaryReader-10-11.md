---
title: 'WinForm开发之——BinaryReader(10.11)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: be48e015
date: 2020-07-24 21:34:06
---
## 一 概述

 在 C#以二进制形式读取数据时使用的是 BinaryReader 类 

<!--more-->

## 二 构造方法

### 2.1 构造方法

 BinaryReader 类中提供的构造方法有 3 种，具体的语法形式如下 

 第1种形式： 

```
BinaryReader(Stream input)   //其中，input 参数是输入流。
```

 第2种形式： 

```
BinaryReader(Stream input, Encoding encoding)   //其中，input 是指输入流，encoding 是指编码方式。
```

 第3种形式： 

```
BinaryReader(Stream input, Encoding encoding, bool leaveOpen)  //其中，input 是指输入流，encoding 是指编码方式，leaveOpen 是指在流读取后是否包括流的打开状态。
```

### 2.2 构造实例

```
//创建文件流的实例
FileStream fileStream = new FileStream("D:\\code\\test.txt", FileMode.Open);
BinaryReader binaryReader1 = new BinaryReader(fileStream);
BinaryReader binaryReader2 = new BinaryReader(fileStream, Encoding.UTF8);
BinaryReader binaryReader3 = new BinaryReader(fileStream, Encoding.UTF8, true);
```

## 三 常见属性和方法

|                **属性或方法**                 |                           **作用**                           |
| :-------------------------------------------: | :----------------------------------------------------------: |
|                  int Read()                   |                     从指定的流中读取字符                     |
| int Read(byte[] buffer, int index, int count) |    以 index 为字节数组中的起始点，从流中读取 count 个字节    |
| int Read(char[] buffer, int index, int count) |     以 index 为字符数组的起始点，从流中读取 count 个字符     |
|              bool ReadBoolean()               |  从当前流中读取 Boolean 值，并使该流的当前位置提升 1 个字节  |
|                byte ReadByte()                |   从当前流中读取下一个字节，并使流的当前位置提升 1 个字节    |
|          byte[] ReadBytes(int count)          | 从当前流中读取指定的字节数写入字节数组中，并将当前 位置前移相应的字节数 |
|                char ReadChar()                | 从当前流中读取下一个字符，并根据所使用的 Encoding 和从流中读取的特定字符提升流的当前位置 |
|          char[] ReadChars(int count)          | 从当前流中读取指定的字符数，并以字符数组的形式返回 数据，然后根据所使用的 Encoding 和从流中读取的特定字符将当前位置前移 |
|             decimal ReadDecimal()             |  从当前流中读取十进制数值，并将该流的当前位置提升 16 个字节  |
|              double ReadDouble()              |  从当前流中读取 8 字节浮点值，并使流的当前位置提升 8 个字节  |
|               short ReadInt16()               | 从当前流中读取 2 字节有符号整数，并使流的当前位置提升 2 个字节 |
|                int ReadInt32()                | 从当前流中读取 4 字节有符号整数，并使流的当前位置提升 4 个字节 |
|               long ReadInt64()                | 从当前流中读取 8 字节有符号整数，并使流的当前位置提升 8 个字节 |
|               sbyte ReadSByte()               |                                                              |

## 四 实例

### 4.1 实例一 <font size=5> 使用 BinaryReader 类读取记事本文件中的信息 </font>

#### 4.1.1 说明

 根据题目要求，在 D:\\\directoryInfo 目录下创建一个记事本文件，并在其中输入 abc，使用 BinaryReader 类读取文件中的内容 

#### 4.1.2 代码

```
class Program
{
    static void Main(string[] args)
    {
        FileStream fileStream = new FileStream(@"D:\\code\\test1.txt", FileMode.Open);
        BinaryReader binaryReader = new BinaryReader(fileStream);
        //读取文件的一个字符
        int a = binaryReader.Read();
        //判断文件中是否含有字符，若不含字符，a 的值为 -1
        while(a!= -1)
        {
            //输出读取到的字符
            Console.Write((char)a);
            a = binaryReader.Read();
        }
    }
}
```

#### 4.1.3 说明

除了使用Read方法每次读取一个字符以外，也可以使用Read方法的其他重载方法将字符读取到一个字节数组或字符数组中

### 4.2 实例二 <font size=5> 将 test.txt 记事本中的内容读取到字节数组中 </font>

#### 4.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        FileStream fileStream = new FileStream(@"D:\\code\\test.txt", FileMode.Open,FileAccess.Read);
        BinaryReader binaryReader = new BinaryReader(fileStream);
        //获取文件长度
        long length = fileStream.Length;
        byte[] bytes = new byte[length];
        //读取文件中的内容并保存到字节数组中
        binaryReader.Read(bytes, 0, bytes.Length);
        //将字节数组转换为字符串
        string str = Encoding.Default.GetString(bytes);
        Console.WriteLine(str);
    }
}
```

