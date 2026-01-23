---
title: 'WinForm开发之——Console类(3.15)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 31054d73
date: 2020-07-15 22:52:44
---
## 一 概述

C#中Console类主要用于控制台程序的输入和输出操作

<!--more-->

## 二 Console常用方法

|   方法    |           描述           |
| :-------: | :----------------------: |
|   Write   | 向控制台输出内容后不换行 |
| WriteLine |  向控制台输出内容后换行  |
|   Read    |   从控制台读取一个字符   |
| ReadLine  |   从控制台读取一行字符   |

* 此外，在向控制台输出内容时也可以对输出的内容进行格式化，格式化时使用的是占位符的方法，语法形式如下

  ```
  Console.Write(格式化字符串, 输出项, 输出项2);
  ```

* 其中，在格式化字符串中使用`{索引号}`的形式，索引号从0开始。输出项1填充{0}位置的内容，依次类推

## 三 实例

 从控制台依次输入姓名和所在学校，并在输出时组成一句话“xx 同学在 xx 学习” 

### 3.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("请输入学生姓名：");
        string name = Console.ReadLine();
        Console.WriteLine("请输入所在学校：");
        string school = Console.ReadLine();
        Console.WriteLine("{0}同学在{1}学习", name, school);
    }
}
```

