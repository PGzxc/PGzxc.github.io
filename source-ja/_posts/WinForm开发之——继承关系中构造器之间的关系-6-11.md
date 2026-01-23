---
title: 'WinForm开发之——继承关系中构造器之间的关系(6.11)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: e7db4a0
date: 2020-07-22 21:42:50
---
## 一 概述

在前面C#继承一节中已经介绍了类的继承关系，但一直没有涉及的内容是类中的构造器，在继承关系中构造器之间究竟是什么关系呢？

<!--more-->

## 二 实例

### 2.1 实例一 调用无参构造

#### 2.1.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        B b = new B();
    }
}
class A
{
    public A()
    {
        Console.WriteLine("A类的构造器");
    }
}
class B :A
{
    public B()
    {
        Console.WriteLine("B类的构造器");
    }

```

#### 2.1.2 执行结果
![][1]

#### 2.1.3 说明

* 从上面的执行结果可以看出，在创建子类的实例时，先执行父类A中的无参构造器，再执行子类B中的无参构造器

### 2.2 实例二 调用子类有参构造

#### 2.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        B b = new B("ok");
    }
}
class A
{
    public A()
    {
        Console.WriteLine("A类的构造器");
    }
}
class B :A
{
    public B()
    {
        Console.WriteLine("B类的构造器");
    }
    public B(string name)
    {
        Console.WriteLine("B类中带参数的构造器，传入的值为：" + name);
    }
}
```

#### 2.2.2 执行结果

![][2]

#### 2.2.3 说明

* 从上面的执行效果可以看出，尽管在子类中调用了带参数的构造器，也会先调用其父类中的无参构造器

### 2.3 实例三 调用父类带参构造器

#### 2.3.1 代码

```
class A
{
    public A()
    {
        Console.WriteLine("A类的构造器");
    }
    public A(string name)
    {
        Console.WriteLine("A类的构造器，传入的值为：" + name);
    }
}
class B :A
{
    public B()
    {
        Console.WriteLine("B类的构造器");
    }
    public B(string name):base(name)    //调用父类中带参数的构造器
    {
        Console.WriteLine("B类中带参数的构造器，传入的值为：" + name);
    }
}
```

#### 2.3.2 执行结果

![][3]

#### 2.3.3 说明

* 从上面的执行效果可以看出，通过在子类的构造器中使用"base(参数)"的方式即可调用父类带有参数的构造器
* 实际上这也是子类和父类中构造器的一种继承关系表示
* 如果在父类中没有无参构造器，必须在子类的构造器中继承父类的构造器，否则程序无法成功编译




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-construct-no.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-construct-params.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-construct-params-both.png
