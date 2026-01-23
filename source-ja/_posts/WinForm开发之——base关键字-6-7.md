---
title: 'WinForm开发之——base关键字(6.7)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: bfbf4d62
date: 2020-07-21 20:38:36
---
## 一 概述

* 在C#语言中子类中定义的同名方法相当于在子类中重新定义了一个方法，在子类中的对象时调用不到父类中的同名方法的，调用的是子类中的方法
* 因此也经常说成是将父类中的同名方法隐藏了

<!--more-->

## 二 实例

### 2.1 实例一 <font size=2>在Main方法中分别创建前面编写过的Person、Teacher以及Student类的对象，并调用其中的Print方法</font>

#### 2.1.1 代码

```
namespace code_1
{
    class Program
    {
        static void Main(string[] args)
        {
            Person person = new Person();
            Console.WriteLine("Person类的Print方法打印内容");
            person.Print();
            Student student = new Student();
            Console.WriteLine("Student类的Print方法打印内容");
            student.Print();
            Teacher teacher = new Teacher();
            Console.WriteLine("Teacher类的Print方法打印内容");
            teacher.Print();
        }
    }
    class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Sex { get; set; }
        public string Cardid { get; set; }
        public string Tel { get; set; }
        public void Print()
        {
            Console.WriteLine("编号：" + Id);
            Console.WriteLine("姓名：" + Name);
            Console.WriteLine("性别：" + Sex);
            Console.WriteLine("身份证号：" + Cardid);
            Console.WriteLine("联系方式：" + Tel);
        }
    }
    class Student : Person
    {
        public string Major { get; set; }
        public string Grade { get; set; }
        public void Print()
        {
            Console.WriteLine("专业：" + Major);
            Console.WriteLine("年级：" + Grade);
        }
    }
    class Teacher
    {
        public string Title { get; set; }
        public string WageNo { get; set; }
        public void Print()
        {
            Console.WriteLine("职称：" + Title);
            Console.WriteLine("工资号：" + WageNo);
        }
    }
}
```

#### 2.1.2 执行结果
![][1]

#### 2.1.3 说明

* 从上面的执行结果可以看出，在创建不同类的对象后，调用同名的方法Print效果是不同的
* 创建子类的对象仅能调用子类中的Print方法，而与父类中的Print方法无关
* 在继承的关系中，子类如果需要调用父类中的成员可以借助base关键字来完成，具体的用法为`base.父类成员`
* 如果在同名的方法中使用base关键字调用父类中的方法，则相当于把父类中的方法内容复制到该方法中

### 2.2 实例二 <font size=3>改写实例1中的Student和Teacher类中同名的Print方法，使用base关键字调用父类中的Print方法</font>

#### 2.2.1 代码

```
class Teacher:Person
{
    public string Title { get; set; }
    public string WageNo { get; set; }
    public void Print()
    {
        base.Print();
        Console.WriteLine("职称：" + Title);
        Console.WriteLine("工资号：" + WageNo);
    }
}
class Student:Person
{
    public string Major { get; set; }
    public string Grade { get; set; }
    public void Print()
    {
        base.Print();
        Console.WriteLine("专业：" + Major);
        Console.WriteLine("年级：" + Grade);
    }
}
```
#### 2.2.2 执行结果
![][2]

#### 2.2.3 说明

* 从上面的执行效果可以看出，通过base关键字调用Print方法即可调用在父类中定义的语句
* 用户在程序中会遇到this和base关键字，this关键字代表的是当前类的对象，base关键字代表的是父类中的对象



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-base-print.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-base-apply.png