---
title: 'WinForm开发之——析构函数(3.8)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 548b2926
date: 2020-07-15 22:23:33
---
## 一 概述

C#构造方法中介绍的构造方法是在创建类的对象时执行的，而析构方法则是在垃圾回收、释放资源时使用的

<!--more-->

## 二 析构函数语法形式

```
~类名()
{
    语句块；
}
```

* 在析构方法中不带任何参数，它实际上是保证在程序中会调用垃圾回收方法Finalize()

## 三 实例

 在 User 类中添加析构方法并验证析构方法的效果 

```
 class User
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Tel { get; set; }
        ~User()
        {
            Console.WriteLine("调用了析构方法");
            Console.ReadKey();
        }
        public User(string name, string password, string tel)
        {
            this.Name = name;
            this.Password = password;
            this.Tel = tel;
            Console.WriteLine("调用了构造方法");
        }
        public void PrintMsg()
        {
            Console.WriteLine("用户名："+this.Name);
            Console.WriteLine("密 码："+this.Password);
            Console.WriteLine("手机号："+this.Tel);
        }
    }
```

