---
title: WinForm开发之——部分类(3.14)
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 41a8c03f
date: 2020-07-15 22:51:02
---
## 一 概述

* 在C#语言中提供了一个部分类，正如字面上的意思，它用于表示一个类中的一部分
* 一个类可以由多个不分类构成

<!--more-->

## 二 部分类语法形式
### 2.1 语法形式
```
访问修饰符   修饰符   partial class   类名{……}
```

* 在这里，partial即为定义部分类的关键字。
* 部分类主要用于当一个类中的内容较多时将相似于类中的内容拆分到不同的类中，并且部分类的名称必须相同

### 2.2 注意事项

* 部分方法必须是私有的，并且不能使用virtual、abstract、override、new、sealed、extern等修饰符
* 部分方法不能有返回值
* 在部分方法中不能使用out类型的参数

## 三 实例

### 3.1 实例一

 定义名为 Course 的类，分别使用两个部分类实现定义课程属性并输出的操作。在一个部分类中设定课程的属性，在一个部分类中定义方法输出课程的属性 ( 根据题目要求，课程的属性包括课程编号、课程名称、课程学分 )

#### 3.1.1 代码

#####  Course 

```
public partial class Course
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Points { get; set; }
}
public partial class Course
{
    public void PrintCoures()
    {
        Console.WriteLine("课程编号：" + Id);
        Console.WriteLine("课程名称：" + Name);
        Console.WriteLine("课程学分：" + Points);
    }
}
```

#####  Main  

```
static void Main(string[] args)
{
    Course course = new Course();
    course.Id = 1001;
    course.Name = "C#部分类";
    course.Points = 3;
    course.PrintCoures();
}
```

#### 3.1.2 说明

* 从该实例可以看出，在不同的部分类中可以直接相互访问其成员，相当于所有的代码都写到了一个类中
* 此外，在访问类成员时也非诚方便，直接通过类的对象即可访问不同部分类的成员
* 除了定义部分类外，还可以在部分类中定义部分方法，实现的方式是在一个部分类中定义一个没有方法体的方法，在另一个部分类中完成方法体的内容