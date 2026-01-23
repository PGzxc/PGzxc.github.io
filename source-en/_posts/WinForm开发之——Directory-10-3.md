---
title: 'WinForm开发之——Directory(10.3)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 85af6db8
date: 2020-07-23 20:30:57
---
## 一 概述

* Directory类是一个静态类，不能创建该类的实例，直接通过"类名.类成员"的形式调用其属性和方法
* Directory类省去了创建类实例的步骤，其他操作也与DirectoryInfo类似

<!--more-->

## 二 实例 <font size=4> 使用 Directory 类在 D 盘上操作directoryInfo文件夹，要求先判断是否存在该文件夹，如果存在则删除，否则创建该文件夹 </font>

### 2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        bool flag = Directory.Exists("D:\\directoryInfo");
        if (flag)
        {
            Directory.Delete("D:\\code", true);
        }
        else
        {
            Directory.CreateDirectory("D:\\directoryInfo");
        }
    }
}
```

### 2.2 说明

执行上面的代码，即可完成文件夹directoryInfo的删除或创建操作