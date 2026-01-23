---
title: 'WinForm开发之——结构体类型(5.8)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 3858ecff
date: 2020-07-21 20:31:22
---

## 一 概述

* 结构体与类比较相似，由于它是值类型，在使用时会比使用类存取的速度更快，但灵活性方面没有类好
* 结构体从字面上来理解是指定义一种结构，实际上结构体是一种与类的定义非常相似的数据类型，但它是值类型
* 结构体的定义位置与枚举类型一样，都是在类中或者命名空间下定义，而不能将其定义到方法中

<!--more-->

## 二 结构体语法形式

### 2.1 语法形式

```
访问修饰符  struct  结构体名称
{
    //结构体成员
}
```

### 2.2 说明

#### 2.2.1 访问修饰符

* 通常使用public或者省略不写，如果省略不写，代表使用private来修饰
* 如果结构体中的内容要被其他类中的成员访问，需要将其访问修饰符设置为public

#### 2.2.2 结构体名称

* 命名规则通常和变量的命名规则相同，即从第二个单词开始每个单词的首字母大写

#### 2.2.3 结构体成员

* 包括字段、属性、方法以及后面要介绍的时间等
* 在结构体中也能编写构造器，但必须带参数，并且必须为结构体中的字段赋初值
* 在调用结构体的成员时，能使用不带参数的构造器，与创建类的对象时类似

## 三 实例
### 3.1 实例一<font size=3>定义名为student的结构体，在该结构体中定义学生姓名(name)和年龄(age)的字段，并分别为字段生成属性，要求年龄必须大于0</font>

#### 3.1.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        student stu = new student();
        stu.Name = "张三";
        stu.Age = -100;
        Console.WriteLine("学生的信息为：");
        Console.WriteLine(stu.Name + "：" + stu.Age);
    }
    struct student
    {
        private string name;
        private int age;
        public string Name
        {
            get
            {
                return name;
            }
            set
            {
                name = value;
            }
        }
        public int Age
        {
            get
            {
                return age;
            }
            set
            {
                if (value < 0)
                {
                    value = 0;
                }
                else
                {
                    age = value;
                }
            }
        }
    }
}
```

#### 3.1.2 执行结果
![][1]

#### 3.1.3 说明

* 从上面的执行结果可以看出，由于结构体中将年龄属性设置为如果小于0，则值为0的条件，因此输出结果中年龄为0
* 此外，从调用结构体的代码可以看出，调用结构体和调用类是类似的，是通过构造器来实现的
* 当然，在调用结构体时也可以不用构造器

### 3.2 实例二 <font size=3>在结构体中定义带参数的构造器，并在结构体中定义方法输出字段的值</font>

#### 3.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        student stu = new student("李四",25);
        stu.PrintStudent();
    }
}
public struct student
{
    public student(string name, int age)
    {
        this.name = name;
        this.age = age;
    }
    private string name;
    private int age;
    public void PrintStudent()
    {
        Console.WriteLine("姓名：" + name);
        Console.WriteLine("年龄：" + age);
    }
}
```

#### 3.2.2 执行结果

![][2]

## 四 结构体与类的区别

| 编号 |                   结构体                    |                    类                     |
| :--: | :-----------------------------------------: | :---------------------------------------: |
|  1   |          允许不使用new对其进实例化          |             必须使用new实例化             |
|  2   |              没有默认构造方法               |              有默认构造方法               |
|  3   |                 不能继承类                  |                 能继承类                  |
|  4   |                没有析构方法                 |                有析构方法                 |
|  5   | 不允许使用abstract、protected以及sealed修饰 | 允许使用abstract、protected以及sealed修饰 |




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-struct-studeng.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-struct-studeng-construct.png
