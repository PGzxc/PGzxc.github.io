---
title: 'WinForm开发之——构造函数(3.7)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: c692bc92
date: 2020-07-14 20:51:28
---
## 一 概述

* 创建类的对象是使用"类名 对象名=new 类名()"的方式实现的
* 实际上，"类名()"的形式调用的是类的构造方法，也就是说构造方法的名字是与类的名称相同的

<!--more-->

## 二 构造方法的形式

```
访问修饰符  类名 (参数列表)
{
    语句块；
}
```

* 这里构造方法的访问修饰符通常是`public`类型的，这样在其他类中都可以创建该类的对象
* 如果将访问修饰符设置成private类型的，则无法创建该类的对象。构造方法中的参数与其他方法一样，都是0到多个参数
* 此外，构造方法是在创建类的对象时被调用的。通常会将一些对类中成员初始化的操作放到构造方法中去完成

## 三 实例

 创建用户类 User，并创建构造方法为用户类中的属性赋值。在 Main 方法中 调用输出用户信息的方法，用户属性包括用户名、密码、手机号 

### 3.1 代码

* User

  ```
  class User
  {
      public User(string name, string password, string tel)
      {
          this.Name = name;
          this.Password = password;
          this.Tel = tel;
      }
      public string Name { get; set; }
      public string Password { get; set; }
      public string Tel { get; set; }
      public void PrintMsg()
      {
          Console.WriteLine("用户名：" + this.Name);
          Console.WriteLine("密  码：" + this.Password);
          Console.WriteLine("手机号：" + this.Tel);
      }
  }
  ```

* Main方法中

  ```
     class Program
      {
          static void Main(string[] args)
          {
              User user = new User("小明","123456","0123456789");
              user.PrintMsg();
          }
      }
  ```

### 3.2 执行结果
![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-construct-function-user.png