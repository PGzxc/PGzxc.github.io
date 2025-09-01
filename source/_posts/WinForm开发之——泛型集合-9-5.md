---
title: 'WinForm开发之——泛型集合(9.5)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 2eacaa2
date: 2020-07-22 22:02:07
---
## 一 概述

* C#语言中泛型集合是泛型中最常见的应用，主要用于约束集合中存放的元素
* 由于在集合中能存放任意类型的值，在取值时经常会遇到数据类型转换异常的情况，因此推荐在定义集合时使用泛型集合

<!--more-->

## 二 实例

### 2.1 实例一 <font size=3> 使用泛型集合 List\<T> 实现对学生信息的添加和遍历 </font>

#### 2.1.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        //定义泛型集合
        List<Student> list = new List<Student>();
        //向集合中存入3名学员
        list.Add(new Student(1, "小明", 20));
        list.Add(new Student(2, "小李", 21));
        list.Add(new Student(3, "小赵", 22));
        //遍历集合中的元素
        foreach(Student stu in list)
        {
            Console.WriteLine(stu);
        }
    }
}
class Student
{
    //提供有参构造方法，为属性赋值
    public Student(int id,string name,int age)
    {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    //学号
    public int id { get; set; }
    //姓名
    public string name { get; set; }
    //年龄
    public int age { get; set; }
    //重写ToString 方法
    public override string ToString()
    {
        return id + "：" + name + "：" + age;
    }
}
```

### 2.2 实例二 <font size=4> 使用泛型集合 Dictionary<K,V> 实现学生信息的添加，并能够按照学号查询学生信息 </font>

### 2.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        Dictionary<int, Student> dictionary = new Dictionary<int, Student>();
        Student stu1 = new Student(1, "小明", 20);
        Student stu2 = new Student(2, "小李", 21);
        Student stu3 = new Student(3, "小赵", 22);
        dictionary.Add(stu1.id, stu1);
        dictionary.Add(stu2.id, stu2);
        dictionary.Add(stu3.id, stu3);
        Console.WriteLine("请输入学号：");
        int id = int.Parse(Console.ReadLine());
        if (dictionary.ContainsKey(id))
        {
            Console.WriteLine("学生信息为：{0}", dictionary[id]);
        }
        else
        {
            Console.WriteLine("您查找的学号不存在！");
        }
    }
}
```

