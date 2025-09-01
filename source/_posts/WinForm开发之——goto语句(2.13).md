---
title: 'WinForm开发之——goto语句(2.13)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 8312e66a
date: 2020-07-13 23:03:59
---

## 一 概述

C# goto语句用于直接在一个程序中转到程序中的标签指定的位置，标签实际上由标识符加上冒号构成

<!--more-->

## 二 goto语法形式

### 2.1 语法形式

```
goto Labell;
    语句块 1;
Labell
    语句块 2;
```

* 如果要跳转到某一个标签指定的位置，直接使用goto加标签名即可
* 在上面的语句中使用了goto语句后，语句的执行顺序发生了变化，即先执行语句块2，再执行语句块1
* 此外，需要注意的是goto语句不能跳转到循环语句中，也不能跳出类的范围
* 由于goto语句不便于程序的理解，因此goto语句并不常用

## 三 示例(<font size=2> 使用 goto 语句判断输入的用户名和密码是否正确，如果错误次数超过3次，则输出“用户名或密码错误次数过多！退出！” </font>)

### 3.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        int count = 1;
    login:
        Console.WriteLine("请输入用户名");
        string username = Console.ReadLine();
        Console.WriteLine("请输入密码");
        string userpwd = Console.ReadLine();
        if (username == "aaa" && userpwd == "123")
        {
            Console.WriteLine("登录成功");
        }
        else
        {
            count++;
            if (count > 3)
            {
                Console.WriteLine("用户名或密码错误次数过多！退出！");
            }
            else
            {
                Console.WriteLine("用户名或密码错误");
                goto login;//返回login标签处重新输入用户名密码
            }
        }
    }
}
```

### 2.2 结果

![][1]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-goto-sample.png